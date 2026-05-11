#!/bin/bash
set -e
echo 'Checking protections...'
lsattr -d /var/www/metan-site/.next/standalone || true
echo 'Removing protections...'
chattr -R -i /var/www/metan-site/.next/standalone || true
echo 'Building...'
cd /root/metan-site && npm run build
echo 'Copying files...'
# Properly clean the target standalone folder first
rm -rf /var/www/metan-site/.next/standalone/* /var/www/metan-site/.next/standalone/.* 2>/dev/null || true
# Use cp -a to include hidden files (like .next and .env)
cp -a .next/standalone/. /var/www/metan-site/.next/standalone/
cp -a .next/static/. /var/www/metan-site/.next/static/
echo 'Restoring permissions...'
chown -R www-data:www-data /var/www/metan-site/.next/standalone
chattr -R +i /var/www/metan-site/.next/standalone
echo 'Restarting service...'
systemctl restart metan-lv.service
echo 'Verifying response...'
curl -s -I http://localhost:3000 | head -n 1
echo 'Done!'
