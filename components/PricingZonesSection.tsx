'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

type Locale = 'lv' | 'ru' | 'en' | 'lt';

interface Zone {
  zone: string;
  range: string;
  cities: string;
  price: string;
}

interface LocaleContent {
  title: string;
  note: string;
  zones: Zone[];
}

const CONTENT: Record<Locale, LocaleContent> = {
  lv: {
    title: 'Cenas pa zonām',
    note: '12 mēnešu līgumam. Zona tiek noteikta pēc reālā autoceļu attāluma no Bēnes (Dobeles novads). Vienreizēja apkope — pēc pieprasījuma.',
    zones: [
      { zone: '1. zona', range: '0–50 km no Bēnes', cities: 'Dobele, Jelgava, Bauska', price: 'no 365 €' },
      { zone: '2. zona', range: '50–100 km', cities: 'Rīga, Jūrmala, Tukums', price: 'no 400 €' },
      { zone: '3. zona', range: '100–150 km', cities: 'Liepāja, Ventspils, Cēsis', price: 'no 460 €' },
      { zone: '4. zona', range: '150–200 km', cities: 'Daugavpils, Rēzekne', price: 'no 500 €' },
    ],
  },
  ru: {
    title: 'Цены по зонам',
    note: 'Для договора на 12 месяцев. Зона определяется по реальному расстоянию по дорогам от Бене (Добельский край). Разовая чистка — по запросу.',
    zones: [
      { zone: 'Зона 1', range: '0–50 км от Бене', cities: 'Добеле, Елгава, Бауска', price: 'от 365 €' },
      { zone: 'Зона 2', range: '50–100 км', cities: 'Рига, Юрмала, Тукумс', price: 'от 400 €' },
      { zone: 'Зона 3', range: '100–150 км', cities: 'Лиепая, Вентспилс, Цесис', price: 'от 460 €' },
      { zone: 'Зона 4', range: '150–200 км', cities: 'Даугавпилс, Резекне', price: 'от 500 €' },
    ],
  },
  en: {
    title: 'Pricing by zone',
    note: '12-month contract. Zone is determined by real road distance from Bēne (Dobele region). One-off cleaning — by request.',
    zones: [
      { zone: 'Zone 1', range: '0–50 km from Bēne', cities: 'Dobele, Jelgava, Bauska', price: 'from €365' },
      { zone: 'Zone 2', range: '50–100 km', cities: 'Riga, Jūrmala, Tukums', price: 'from €400' },
      { zone: 'Zone 3', range: '100–150 km', cities: 'Liepāja, Ventspils, Cēsis', price: 'from €460' },
      { zone: 'Zone 4', range: '150–200 km', cities: 'Daugavpils, Rēzekne', price: 'from €500' },
    ],
  },
  lt: {
    title: 'Kainos pagal zonas',
    note: '12 mėn. sutarčiai. Zona nustatoma pagal realų atstumą keliais nuo Bēnės (Dobelės rajonas). Vienkartinis valymas — pagal užklausą.',
    zones: [
      { zone: '1 zona', range: '0–50 km nuo Bēnės', cities: 'Dobelė, Jelgava, Bauskė', price: 'nuo 365 €' },
      { zone: '2 zona', range: '50–100 km', cities: 'Ryga, Jūrmala, Tukumas', price: 'nuo 400 €' },
      { zone: '3 zona', range: '100–150 km', cities: 'Liepāja, Ventspilis, Cēsis', price: 'nuo 460 €' },
      { zone: '4 zona', range: '150–200 km', cities: 'Daugpilis, Rēzeknė', price: 'nuo 500 €' },
    ],
  },
};

export default function PricingZonesSection() {
  const { localePath } = useTranslation();
  const rawLocale = localePath('/').split('/')[1] || 'lv';
  const locale: Locale = (['lv', 'ru', 'en', 'lt'].includes(rawLocale) ? rawLocale : 'lv') as Locale;
  const c = CONTENT[locale];

  return (
    <section className="py-16 bg-slate-50">
      <div className="metan-container">
        <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4 text-center">
          {c.title}
        </h2>
        <p className="text-base text-gray-600 mb-10 max-w-3xl mx-auto text-center">
          {c.note}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {c.zones.map((z, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="border-metan-light h-full">
                <CardContent className="p-5">
                  <div className="text-sm font-semibold text-metan-primary mb-1">{z.zone}</div>
                  <div className="text-2xl font-bold text-metan-gray mb-2">{z.price}</div>
                  <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {z.range}
                  </div>
                  <div className="text-sm text-gray-500">{z.cities}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
