#!/bin/bash
set -e

echo "🚀 Starting deployment of updates..."

cd /root/metan-site

# 1. Остановить сервис
echo "⏸️  Stopping service..."
systemctl stop metan-lv.service

# 2. Снять защиту chattr
echo "🔓 Removing chattr protection..."
chattr -R -i /var/www/metan-site/.next/standalone 2>/dev/null || true

# 3. Установить зависимости (если нужно)
echo "📦 Installing dependencies..."
npm install

# 4. Сборка проекта
echo "🔨 Building project..."
npm run build

# 5. Копирование файлов
echo "📋 Copying files to production..."
rm -rf /var/www/metan-site/.next/standalone && mkdir -p /var/www/metan-site/.next/standalone
cp -r .next/standalone/* /var/www/metan-site/.next/standalone/
cp -r .next/static /var/www/metan-site/.next/
cp -r public /var/www/metan-site/

# 6. Установить права
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/metan-site/.next/standalone
chown -R www-data:www-data /var/www/metan-site/.next/static
chown -R www-data:www-data /var/www/metan-site/public

# 7. Вернуть защиту chattr
echo "🔒 Applying chattr protection..."
chattr -R +i /var/www/metan-site/.next/standalone

# 8. Запустить сервис
echo "▶️  Starting service..."
systemctl start metan-lv.service

# 9. Проверка статуса
echo "✅ Checking service status..."
sleep 2
systemctl status metan-lv.service --no-pager | head -n 10

echo ""
echo "🎉 Deployment completed!"
echo "🌐 Check: https://metan.lv"
