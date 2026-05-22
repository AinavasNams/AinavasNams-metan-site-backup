'use client';

import { useTranslation } from '@/hooks/useTranslation';

type Locale = 'lv' | 'ru' | 'en' | 'lt';

const LINES: Record<Locale, string> = {
  lv: 'Tiešie kontakti: +371 27 727 724 · info@metan.lv · Bāze: Bēne, Dobeles novads · Apkalpojam visu Latviju (Rīga, Jelgava, Liepāja, Daugavpils, Ventspils, 200 km no Bēnes) · Cenas no 365 €',
  ru: 'Прямые контакты: +371 27 727 724 · info@metan.lv · База: Бене, Добельский край · Обслуживаем всю Латвию (Рига, Юрмала, Лиепая, Даугавпилс, Вентспилс, 200 км от Бене) · Цены от 365 €',
  en: 'Direct contact: +371 27 727 724 · info@metan.lv · Base: Bēne, Dobele region · Service area: all of Latvia (Riga, Jūrmala, Jelgava, Liepāja, Daugavpils, 200 km from Bēne) · Pricing from €365',
  lt: 'Tiesioginiai kontaktai: +371 27 727 724 · info@metan.lv · Bazė: Bēnė, Dobelės rajonas · Aptarnaujame visą Latviją (Ryga, Jūrmala, Liepāja, Daugpilis, Ventspilis, 200 km nuo Bēnės) · Kainos nuo 365 €',
};

export default function PlainTextContactLine() {
  const { localePath } = useTranslation();
  const rawLocale = localePath('/').split('/')[1] || 'lv';
  const locale: Locale = (['lv', 'ru', 'en', 'lt'].includes(rawLocale) ? rawLocale : 'lv') as Locale;

  return (
    <p className="text-base text-gray-700 mb-8 max-w-3xl font-medium">
      {LINES[locale]}
    </p>
  );
}
