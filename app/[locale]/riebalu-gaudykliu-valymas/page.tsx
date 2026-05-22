import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/page-metadata';
import GreaseTrapLandingContent, { type GreaseTrapLandingProps } from '@/components/GreaseTrapLandingContent';

const TARGET_LOCALE: 'lt' = 'lt';
const SLUG = '/riebalu-gaudykliu-valymas';

const SEO = {
  title: 'Riebalų gaudyklių valymas Latvijoje (Ryga, Jūrmala, Liepāja) | METAN.LV',
  description: 'Sertifikuotas riebalų gaudyklių valymas B2B klientams visoje Latvijoje. 200 barų hidrodinaminis plovimas, APUS dokumentacija, EWC 19 08 09, sutartys nuo 365 €. Skubiai prieš PVD patikrinimą — 24 val. +371 27 727 724.',
};

const PROPS: GreaseTrapLandingProps = {
  locale: TARGET_LOCALE,
  faqKey: 'grease-trap-landing',
  trackingLabel: 'lt_grease_trap_landing',
  badge: 'B2B paslauga visoje Latvijoje',
  h1: 'Riebalų gaudyklių valymas Latvijoje — ',
  h1Highlight: 'profesionali paslauga su PVD dokumentacija',
  intro: 'metan.lv (SIA "Ainavas Nams") teikia riebalų gaudyklių valymo paslaugas restoranams, HoReCa objektams, maisto gamybai ir savivaldybių užsakovams visoje Latvijoje. 200 barų hidrodinaminis plovimas (ne tik siurbimas), pilna APUS / PVD dokumentacija, EWC 19 08 09. Skirtingai nuo paprastų vakuuminių operatorių.',
  contactLine: 'Tiesioginiai kontaktai: +371 27 727 724 · info@metan.lv · Bazė: Bēnė, Dobelės rajonas · Aptarnavimo zona: visa Latvija (Ryga, Jūrmala, Jelgava, Liepāja, Daugpilis, 200 km nuo Bēnės)',
  ctaPrimary: 'Užsakyti valymą',
  problemsTitle: 'Tipinės riebalų gaudyklių problemos',
  problems: [
    { title: 'PVD inspektorius prie durų', desc: 'Jei inspektorius nustato, kad gaudyklė neprižiūrima pagal grafiką — bauda iki 1000 €. Atliekame skubų valymą per 24 valandas su pilna dokumentacija.' },
    { title: 'Kvapai ir užsikimšimai', desc: 'Operatoriai, kurie tik siurbia, palieka gaudyklės sieneles ir vamzdžius su riebalų sluoksniu. Po savaitės kvapai grįžta. Mūsų 200 barų plovimas tai sprendžia.' },
    { title: 'Trūksta APUS įrašų', desc: 'Latvijos atliekų transportavimo registre (APUS) reikalingas kiekvieno surinkimo įrašas su EWC kodu. Mes įvedame duomenis kliento vardu — be papildomos administracinės naštos.' },
  ],
  whyTitle: 'Kodėl metan.lv',
  whyPoints: [
    '200 barų hidrodinaminis plovimas — realiai išvalo vamzdžius, ne tik siurbia',
    'Vakuuminė technika žemo profilio (2.2 m) — tinka restoranams ir terminalams',
    'Pilna APUS duomenų įvedimas kliento vardu — be administracinės naštos',
    'EWC 19 08 09 klasifikacija + sertifikuotas utilizavimo maršrutas',
    'Fiksuotos kainos 12 mėn. sutarčiai — be paslėptų mokesčių',
    'UCO barterio galimybė — naudotas kepimo aliejus padengia paslaugos kainą',
    'Skubus aptarnavimas per 24 valandas prieš PVD patikrinimus',
    'Aptarnaujame visą Latviją — Rygą, Jūrmalą, Jelgavą, Liepāją, Daugpilį',
  ],
  pricingTitle: 'Kainos pagal zonas',
  pricingNote: 'Kainos nurodytos 12 mėn. sutarčiai. Zona nustatoma pagal realų atstumą nuo Bēnės (Dobelės rajonas). Vienkartinis valymas — pagal užklausą.',
  zones: [
    { zone: '1 zona', range: '0–50 km nuo Bēnės', cities: 'Dobelė, Jelgava, Bauskė', price: 'nuo 365 €' },
    { zone: '2 zona', range: '50–100 km', cities: 'Ryga, Jūrmala, Tukumas', price: 'nuo 400 €' },
    { zone: '3 zona', range: '100–150 km', cities: 'Liepāja, Ventspilis, Cēsis', price: 'nuo 460 €' },
    { zone: '4 zona', range: '150–200 km', cities: 'Daugpilis, Rēzeknė', price: 'nuo 500 €' },
  ],
  fogTitle: 'Pilnas FOG ciklas (riebalai, aliejus, nuosėdos)',
  fogPoints: [
    'Riebalų sluoksnio ir nuosėdų siurbimas vakuuminiu siurbliu',
    '200 barų hidrodinaminis plovimas — vamzdžiai ir sienelės pilnai išvalyti',
    'EWC 19 08 09 klasifikacija (riebalų ir aliejaus mišinys iš aliejaus/vandens separavimo)',
    'Sertifikuotas utilizavimo maršrutas — perdirbimas į biodujas',
    'Galimas ir UCO (naudoto kepimo aliejaus) surinkimas atskirai ar kartu',
    'Visas procesas dokumentuojamas APUS ir PVD reikmėms',
  ],
  docsTitle: 'Dokumentacija ir atitiktis',
  docs: [
    'Valymo aktas su fiksuotu kiekiu ir objekto detalėmis',
    'EWC 19 08 09 atliekų klasifikacija',
    'APUS duomenų įvedimas kliento vardu (Latvijos atliekų transportavimo registras)',
    'Sertifikuotas utilizavimo maršrutas į biodujų gamybą',
    'PVD-pasiruošęs dokumentų paketas',
    'Sutartis su fiksuotu grafiku ir kaina 12 mėnesių',
  ],
  ctaTitle: 'Užsakyti riebalų gaudyklės valymą',
  ctaDesc: 'Susisiekite — pirmoji apžiūra ir pasiūlymas nemokami. Skubus aptarnavimas galimas per 24 valandas su pilna dokumentacija.',
  ctaReply: 'Atsakymas per 24 valandas',
  ctaFreeAssessment: 'Nemokama apžiūra ir pasiūlymas',
  ctaNoObligation: 'Be išankstinių įsipareigojimų',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== TARGET_LOCALE) return {};
  return generatePageMetadata(TARGET_LOCALE, SLUG, { title: SEO.title, description: SEO.description });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== TARGET_LOCALE) notFound();
  return <GreaseTrapLandingContent {...PROPS} />;
}
