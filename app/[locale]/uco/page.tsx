import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/page-metadata';
import { locales, type Locale } from '@/lib/i18n';
import UcoContent from './Content';

type Props = { params: Promise<{ locale: string }> };

const SEO: Record<Locale, { title: string; description: string }> = {
  lv: {
    title: 'Izlietotās cepšanas eļļas (UCO) savākšana Latvijā | METAN.LV',
    description: 'Sertificēta izlietotās cepšanas eļļas (UCO) savākšana HoReCa un pārtikas ražošanai Latvijā. Tirgus cena 0,40–0,55 €/l vai bartera modelis pret tauku uztvērēju apkopi. APUS dokumentācija, +371 27 727 724.',
  },
  ru: {
    title: 'Сбор отработанного кулинарного масла (UCO) в Латвии | METAN.LV',
    description: 'Сертифицированный сбор отработанного масла (UCO) для HoReCa и пищевого производства в Латвии. Рыночная цена 0,40–0,55 €/л или бартер на обслуживание жироуловителей. Документы APUS, +371 27 727 724.',
  },
  en: {
    title: 'Used Cooking Oil (UCO) Collection in Latvia | METAN.LV',
    description: 'Certified used cooking oil (UCO) collection for HoReCa and food production in Latvia. Market rates €0.40–0.55/L or barter offset against grease trap service. APUS documentation, +371 27 727 724.',
  },
  lt: {
    title: 'Naudoto kepimo aliejaus (UCO) surinkimas Latvijoje | METAN.LV',
    description: 'Sertifikuotas naudoto kepimo aliejaus (UCO) surinkimas HoReCa ir maisto gamybai Latvijoje. Rinkos kaina 0,40–0,55 €/l arba barteris su riebalų gaudyklių valymu. APUS dokumentai, +371 27 727 724.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locales.includes(locale as Locale) ? locale : 'lv') as Locale;
  return generatePageMetadata(lang, '/uco', {
    title: SEO[lang].title,
    description: SEO[lang].description,
  });
}

export default function Page() {
  return <UcoContent />;
}
