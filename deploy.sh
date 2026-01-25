#!/bin/bash
# deploy.sh — Безопасный деплой METAN.LV (Final v3)

echo "🛑 Stopping service..."
systemctl stop metan-lv.service

echo "🔨 Building project..."
cd /root/metan-site
git pull
rm -rf .next
export NODE_ENV=production
npm run build

echo "💉 VACCINE: Neutralizing RCE vulnerabilities..."

# Путь внутри сборки
OVERLAY_PATH=".next/standalone/node_modules/next/dist/client/components/react-dev-overlay"

# 1. Удаляем вирус
rm -rf "$OVERLAY_PATH"

# 2. Воссоздаем структуру
mkdir -p "$OVERLAY_PATH/server"
mkdir -p "$OVERLAY_PATH/utils"

# 3. Создаем ПРАВИЛЬНЫЕ ЗАГЛУШКИ (Mock functions)

# launch-editor.js: ЗАЩИТА ОТ ВЗЛОМА
echo "module.exports = { launchEditor: function() { return false; } };" > "$OVERLAY_PATH/utils/launch-editor.js"

# middleware-webpack.js: Имитация функционала
echo "module.exports = { 
  parseStack: function() { return []; }, 
  middleware: function() { return { handler: (req, res, next) => next() }; } 
};" > "$OVERLAY_PATH/server/middleware-webpack.js"

# shared.js: Пустой объект
echo "module.exports = {};" > "$OVERLAY_PATH/server/shared.js"

echo "✅ Vulnerabilities replaced with placebos."

echo "📦 Deploying to Production..."
# Удаляем старую папку целиком
rm -rf /var/www/metan-site/.next

# Копируем новую папку .next ЦЕЛИКОМ
cp -r .next /var/www/metan-site/
# Копируем public
cp -r public /var/www/metan-site/

echo "👤 Fixing permissions..."
chown -R www-data:www-data /var/www/metan-site

echo "🚀 Starting service..."
systemctl start metan-lv.service
sleep 5
systemctl status metan-lv.service --no-pager
