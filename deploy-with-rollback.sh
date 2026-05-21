#!/bin/bash
set -euo pipefail

# ============================================================
# METAN.LV SSR Migration Deploy Script
# С автоматическим rollback при любой ошибке
# ============================================================

REMOTE="metan"
SITE_DIR="/var/www/metan-site"
SOURCE_DIR="/root/metan-site"
BACKUP_DIR="/root/metan-backup-$(date +%Y%m%d-%H%M%S)"
LOCAL_DIR="/home/deploy/projects/metan-ssr-migration"
SERVICE="metan-lv"
KEEP_BACKUPS=5  # сколько последних бэкапов оставлять (чистка в конце успешного деплоя)

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[DEPLOY]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
fail() { echo -e "${RED}[FAIL]${NC} $1"; }

# Rollback function
rollback() {
    fail "ОШИБКА НА ШАГЕ: $CURRENT_STEP"
    fail "Запускаю rollback..."

    ssh $REMOTE "
        set -e
        echo 'Restoring backup from $BACKUP_DIR...'

        # Restore source
        if [ -d '$BACKUP_DIR/source' ]; then
            rm -rf $SOURCE_DIR
            cp -a '$BACKUP_DIR/source' $SOURCE_DIR
            echo 'Source restored'
        fi

        # Restore deploy
        if [ -d '$BACKUP_DIR/deploy' ]; then
            rm -rf $SITE_DIR/.next
            cp -a '$BACKUP_DIR/deploy/.next' $SITE_DIR/.next
            cp -a '$BACKUP_DIR/deploy/public' $SITE_DIR/public 2>/dev/null || true
            echo 'Deploy restored'
        fi

        # Restore nginx
        if [ -f '$BACKUP_DIR/nginx.conf' ]; then
            cp '$BACKUP_DIR/nginx.conf' /etc/nginx/sites-enabled/metan.lv
            nginx -t && systemctl reload nginx
            echo 'Nginx restored'
        fi

        # Restart service
        systemctl restart $SERVICE
        sleep 3

        if systemctl is-active --quiet $SERVICE; then
            echo 'ROLLBACK OK: service is running'
        else
            echo 'ROLLBACK WARNING: service failed to start'
            journalctl -u $SERVICE --no-pager -n 20
        fi
    " 2>&1

    fail "ROLLBACK ЗАВЕРШЁН. Сайт возвращён к предыдущей версии."
    exit 1
}

CURRENT_STEP="init"
trap rollback ERR

# ============================================================
# STEP 1: Бэкап на metan-сервере
# ============================================================
CURRENT_STEP="1-backup"
log "Шаг 1: Создаю бэкап на metan-сервере → $BACKUP_DIR"

ssh $REMOTE "
    mkdir -p $BACKUP_DIR

    # Backup source
    cp -a $SOURCE_DIR $BACKUP_DIR/source
    echo 'Source backed up'

    # Backup deploy (.next + public)
    mkdir -p $BACKUP_DIR/deploy
    cp -a $SITE_DIR/.next $BACKUP_DIR/deploy/.next
    cp -a $SITE_DIR/public $BACKUP_DIR/deploy/public 2>/dev/null || true
    echo 'Deploy backed up'

    # Backup nginx config
    cp /etc/nginx/sites-enabled/metan.lv $BACKUP_DIR/nginx.conf 2>/dev/null || true
    echo 'Nginx config backed up'

    # Backup middleware
    cp $SOURCE_DIR/middleware.ts $BACKUP_DIR/middleware.ts 2>/dev/null || true

    du -sh $BACKUP_DIR
    echo 'BACKUP COMPLETE'
"
log "Бэкап создан"

# ============================================================
# STEP 2: Синхронизация файлов миграции на сервер
# ============================================================
CURRENT_STEP="2-sync"
log "Шаг 2: Синхронизация файлов миграции..."

# Sync key changed files (not node_modules, not .next, not backups)
rsync -az --delete \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='_deployment_backup' \
    --exclude='AinavasNams-metan-site-backup' \
    --exclude='_backup_*' \
    --exclude='*.tar.gz' \
    --exclude='.env.production' \
    --exclude='deploy-with-rollback.sh' \
    --exclude='.git' \
    -e ssh \
    $LOCAL_DIR/ $REMOTE:$SOURCE_DIR/

log "Файлы синхронизированы"

# ============================================================
# STEP 3: Билд на сервере
# ============================================================
CURRENT_STEP="3-build"
log "Шаг 3: Запускаю npm install и build на сервере..."

ssh $REMOTE "
    cd $SOURCE_DIR

    # Install dependencies
    npm install --production=false 2>&1 | tail -3

    # Build
    npm run build 2>&1 | tail -30

    echo 'BUILD COMPLETE'
"
log "Билд завершён"

# ============================================================
# STEP 4: Деплой — копируем билд в /var/www/metan-site/
# ============================================================
CURRENT_STEP="4-deploy"
log "Шаг 4: Деплой билда..."

ssh $REMOTE "
    # Stop service FIRST to release file locks
    systemctl stop $SERVICE
    sleep 3
    echo 'Service stopped'

    # Remove old .next with force (may have immutable attrs from hardening)
    chattr -R -i $SITE_DIR/.next 2>/dev/null || true
    rm -rf $SITE_DIR/.next
    echo 'Old .next removed'

    # Copy new standalone build
    cp -a $SOURCE_DIR/.next $SITE_DIR/.next

    # Copy static files into standalone
    cp -a $SOURCE_DIR/.next/static $SITE_DIR/.next/standalone/.next/static

    # Copy public
    rsync -a --delete $SOURCE_DIR/public/ $SITE_DIR/public/

    # Fix permissions
    chown -R www-data:www-data $SITE_DIR/.next $SITE_DIR/public

    # ASSERT: static chunks must exist in standalone.
    # Next.js output:'standalone' does NOT include .next/static by design —
    # if the cp above silently failed, hydration will break in the browser
    # with 'Application error: a client-side exception'. Fail deploy here.
    CHUNK_COUNT=\$(ls $SITE_DIR/.next/standalone/.next/static/chunks 2>/dev/null | wc -l)
    if [ \"\$CHUNK_COUNT\" -lt 5 ]; then
        echo \"FAIL: standalone/.next/static/chunks has only \$CHUNK_COUNT files (expected >=5)\"
        exit 1
    fi
    echo \"OK: \$CHUNK_COUNT chunks in standalone/.next/static/chunks\"

    echo 'DEPLOY FILES COPIED'
"
log "Файлы деплоя скопированы"

# ============================================================
# STEP 5: Обновить nginx — убрать sub_filter инъекцию
# ============================================================
CURRENT_STEP="5-nginx"
log "Шаг 5: Обновляю nginx конфиг (убираю sub_filter, SSR теперь делает это)..."

ssh $REMOTE "
    # Remove the sub_filter injection block (Schema.org + hreflang)
    # Replace sub_filter lines with clean proxy
    sed -i '/sub_filter.*<\/head>/,/sub_filter_types/d' /etc/nginx/sites-enabled/metan.lv
    sed -i '/sub_filter_once on;/d' /etc/nginx/sites-enabled/metan.lv
    sed -i 's/proxy_set_header Accept-Encoding \"\";/proxy_set_header Accept-Encoding \$http_accept_encoding;/' /etc/nginx/sites-enabled/metan.lv

    # Also update hreflang references in comments if any
    # The old ?lang=ru hreflang links are now handled by SSR

    # Test nginx config
    nginx -t 2>&1
    echo 'NGINX CONFIG OK'
"
log "Nginx обновлён"

# ============================================================
# STEP 6: Перезапуск сервисов
# ============================================================
CURRENT_STEP="6-restart"
log "Шаг 6: Перезапускаю сервисы..."

ssh $REMOTE "
    # Restart Next.js
    systemctl start $SERVICE
    sleep 3

    # Check if running
    if ! systemctl is-active --quiet $SERVICE; then
        echo 'SERVICE FAILED TO START'
        journalctl -u $SERVICE --no-pager -n 20
        exit 1
    fi
    echo 'Next.js service: RUNNING'

    # Reload nginx
    systemctl reload nginx
    echo 'Nginx: RELOADED'
"
log "Сервисы запущены"

# ============================================================
# STEP 7: Верификация
# ============================================================
CURRENT_STEP="7-verify"
log "Шаг 7: Проверяю что сайт работает..."

ssh $REMOTE "
    sleep 2

    echo '=== Health Check ==='
    HTTP_CODE=\$(curl -s --connect-timeout 3 --max-time 5 -o /dev/null -w '%{http_code}' http://localhost:3000/lv)
    if [ \"\$HTTP_CODE\" != '200' ]; then
        echo \"FAIL: /lv returned \$HTTP_CODE\"
        exit 1
    fi
    echo \"OK: /lv → HTTP \$HTTP_CODE\"

    echo '=== Static chunks check (dynamic, from live HTML) ==='
    # Parse real chunk URLs from the freshly-rendered /lv HTML — no hardcoded
    # hashes (they change every build). If any chunk 404s, hydration breaks.
    HTML=\$(curl -s --connect-timeout 3 --max-time 5 http://localhost:3000/lv)
    CHUNKS=\$(echo \"\$HTML\" | grep -oE '/_next/static/chunks/[^\"]+\\.js' | sort -u | head -3)
    if [ -z \"\$CHUNKS\" ]; then
        echo 'FAIL: no chunk URLs found in /lv HTML'
        exit 1
    fi
    for CHUNK in \$CHUNKS; do
        C_CODE=\$(curl -s --connect-timeout 3 --max-time 5 -o /dev/null -w '%{http_code}' \"http://localhost:3000\$CHUNK\")
        if [ \"\$C_CODE\" != '200' ]; then
            echo \"FAIL: \$CHUNK via next-server → HTTP \$C_CODE (hydration will break)\"
            exit 1
        fi
        echo \"OK: \$CHUNK (next-server) → 200\"
    done

    # Same check via nginx alias — catches path/permission/open_file_cache mismatches
    FIRST_CHUNK=\$(echo \"\$CHUNKS\" | head -1)
    N_CODE=\$(curl -sk --connect-timeout 3 --max-time 5 -o /dev/null -w '%{http_code}' -H 'Host: metan.lv' \"https://127.0.0.1\$FIRST_CHUNK\")
    if [ \"\$N_CODE\" != '200' ]; then
        echo \"FAIL: nginx alias for \$FIRST_CHUNK → HTTP \$N_CODE\"
        exit 1
    fi
    echo \"OK: \$FIRST_CHUNK (nginx alias) → 200\"

    echo '=== RU SSR Check ==='
    TITLE=\$(curl -s http://localhost:3000/ru | grep -oP '<title>[^<]+</title>')
    echo \"Title: \$TITLE\"
    if echo \"\$TITLE\" | grep -q 'биометан\|Сбор'; then
        echo 'OK: Russian title in SSR'
    else
        echo 'WARN: Russian title not found, but page loads'
    fi

    echo '=== Lang attribute ==='
    LANG=\$(curl -s http://localhost:3000/ru | grep -oP 'lang=\"[a-z]+\"' | head -1)
    echo \"Lang: \$LANG\"

    echo '=== Redirect check ==='
    REDIR=\$(curl -s -o /dev/null -w '%{redirect_url}' http://localhost:3000/)
    echo \"/ redirects to: \$REDIR\"

    echo '=== External check ==='
    EXT_CODE=\$(curl -s -o /dev/null -w '%{http_code}' -H 'Host: metan.lv' https://localhost/lv --insecure 2>/dev/null || echo 'skip')
    echo \"External (nginx): \$EXT_CODE\"

    echo '=== SSR exception check (runtime errors in rendered HTML) ==='
    # Catches ReferenceError / runtime crashes that return HTTP 200 but
    # render the Next.js error boundary (\"Application error: a client-side
    # exception has occurred\"). This is what slipped through the plain /lv
    # 200-check during the 2026-04-13 localePath incident.
    SSR_PAGES='/lv /ru /lv/pakalpojumi/savaksana /ru/pakalpojumi/savaksana /lv/pakalpojumi/apstrade /lv/projekti/biometans'
    for P in \$SSR_PAGES; do
        BODY=\$(curl -s --connect-timeout 3 --max-time 8 \"http://localhost:3000\$P\")
        B_CODE=\$(curl -s --connect-timeout 3 --max-time 5 -o /dev/null -w '%{http_code}' \"http://localhost:3000\$P\")
        if [ \"\$B_CODE\" != '200' ]; then
            echo \"FAIL: \$P → HTTP \$B_CODE\"
            exit 1
        fi
        if echo \"\$BODY\" | grep -qF 'Application error'; then
            echo \"FAIL: \$P contains 'Application error' in HTML (SSR crashed at runtime)\"
            echo \"Check: journalctl -u metan-lv --since '5 min ago' | grep -A3 ReferenceError\"
            exit 1
        fi
        echo \"OK: \$P → 200, no SSR error boundary\"
    done

    echo ''
    echo 'ALL CHECKS PASSED'
"

# ============================================================
# STEP: Чистка старых бэкапов (только после успешного деплоя)
# ============================================================
CURRENT_STEP="cleanup-backups"
log "Шаг: чистка старых бэкапов (оставляю последние $KEEP_BACKUPS)"
ssh $REMOTE "
    cd /root
    backups=\$(ls -1d metan-backup-* 2>/dev/null | sort)
    total=\$(echo \"\$backups\" | grep -c . || echo 0)
    if [ \"\$total\" -le $KEEP_BACKUPS ]; then
        echo \"Бэкапов: \$total ≤ $KEEP_BACKUPS, чистка не нужна\"
    else
        to_delete=\$((total - $KEEP_BACKUPS))
        echo \"Бэкапов: \$total, удаляю \$to_delete самых старых:\"
        echo \"\$backups\" | head -n \$to_delete | while read d; do
            size=\$(du -sh \"\$d\" 2>/dev/null | cut -f1)
            echo \"  - \$d (\$size)\"
            find \"\$d\" -depth -delete
        done
    fi
    echo ''
    echo 'Свободно на /:'
    df -h / | tail -1
"
log "Чистка завершена"

log "=========================================="
log "ДЕПЛОЙ ЗАВЕРШЁН УСПЕШНО!"
log "=========================================="
log ""
log "Что изменилось:"
log "  - /lv, /ru, /en, /lt — path-based routing"
log "  - SSR metadata на каждом языке"
log "  - <html lang> динамический"
log "  - Schema.org через SSR (nginx sub_filter убран)"
log "  - Старые ?lang=ru URL → 301 redirect на /ru"
log ""
log "Бэкап: $BACKUP_DIR"
log "Rollback: ssh metan 'cp -a $BACKUP_DIR/source /root/metan-site && cp -a $BACKUP_DIR/deploy/.next /var/www/metan-site/.next && cp $BACKUP_DIR/nginx.conf /etc/nginx/sites-enabled/metan.lv && systemctl restart metan-lv && nginx -t && systemctl reload nginx'"
