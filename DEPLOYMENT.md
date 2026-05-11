# 🚀 DEPLOYMENT GUIDE - METAN.LV Updates

## 📋 Что было изменено (26.01.2026)

### ✅ Добавлено:
1. **lib/i18n.ts** - Система мультиязычности (LV/RU/LT/EN)
2. **middleware.ts** - i18n роутинг
3. **Rate Limiting** в API (app/api/landing-calc/route.ts)
4. **CORS headers** в next.config.js
5. **Улучшенная кнопка GPS** в PartneriemZoneBlock.tsx
6. **deploy-updates.sh** - Скрипт автоматического деплоя

### 🔧 Обновлено:
- `components/v17/PartneriemZoneBlock.tsx` - Кнопка GPS перемещена вверх
- `app/api/landing-calc/route.ts` - Добавлен rate limiting (10 req/min)
- `next.config.js` - Добавлены CORS headers для API

---

## 🎯 Деплой изменений

### Вариант 1: Автоматический (рекомендуется)
```bash
cd /root/metan-site
./deploy-updates.sh
```

Скрипт автоматически:
1. Остановит сервис
2. Снимет защиту chattr
3. Соберёт проект
4. Скопирует файлы
5. Установит права
6. Вернёт защиту chattr
7. Запустит сервис

---

### Вариант 2: Ручной деплой
```bash
cd /root/metan-site

# 1. Остановить сервис
systemctl stop metan-lv.service

# 2. Снять защиту
chattr -R -i /var/www/metan-site/.next/standalone

# 3. Сборка
npm install
npm run build

# 4. Копирование
rm -rf /var/www/metan-site/.next/standalone/*
cp -r .next/standalone/* /var/www/metan-site/.next/standalone/
cp -r .next/static /var/www/metan-site/.next/
cp -r public /var/www/metan-site/

# 5. Права
chown -R www-data:www-data /var/www/metan-site/.next/standalone
chown -R www-data:www-data /var/www/metan-site/.next/static

# 6. Защита
chattr -R +i /var/www/metan-site/.next/standalone

# 7. Запуск
systemctl start metan-lv.service
systemctl status metan-lv.service
```

---

## ✅ Проверка после деплоя
```bash
# 1. Проверить статус сервиса
systemctl status metan-lv.service

# 2. Проверить логи
journalctl -u metan-lv.service -n 50 --no-pager

# 3. Проверить сайт
curl -I https://metan.lv/partneriem

# 4. Проверить API (должен вернуть 400, но не 500)
curl -X POST https://metan.lv/api/landing-calc \
  -H "Content-Type: application/json" \
  -d '{"action":"test"}'
```

---

## 🔄 Откат изменений (если что-то сломалось)
```bash
cd /root/metan-site

# Остановить сервис
systemctl stop metan-lv.service

# Снять защиту
chattr -R -i /var/www/metan-site/.next/standalone

# Восстановить из backup
cp -r _deployment_backup/* /var/www/metan-site/.next/standalone/

# Права
chown -R www-data:www-data /var/www/metan-site/.next/standalone

# Защита
chattr -R +i /var/www/metan-site/.next/standalone

# Запуск
systemctl start metan-lv.service
```

---

## 📊 Следующие шаги (TODO)

### Приоритет 1: КРИТИЧНО
- [ ] Внедрить полную структуру i18n (app/[locale]/)
- [ ] Создать переводы для всех страниц
- [ ] Протестировать rate limiting

### Приоритет 2: ВАЖНО
- [ ] Мобильная адаптация (sticky кнопка GPS)
- [ ] A/B тестирование CTA
- [ ] Добавить аналитику

### Приоритет 3: ЖЕЛАТЕЛЬНО
- [ ] PWA функционал
- [ ] Офлайн режим калькулятора
- [ ] Оптимизация изображений

---

## 🛡️ Security Checklist

✅ Rate limiting на API
✅ CORS headers настроены
✅ chattr +i защита
✅ www-data права
✅ PrivateTmp=true в systemd
⏳ AppArmor профиль (опционально)

---

## 📞 Контакты

- Проект: https://metan.lv
- Репозиторий: https://github.com/AinavasNams/AinavasNams-metan-site-backup
- Дата обновления: 26.01.2026
