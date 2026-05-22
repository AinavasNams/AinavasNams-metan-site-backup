import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/page-metadata';
import GreaseTrapLandingContent, { type GreaseTrapLandingProps } from '@/components/GreaseTrapLandingContent';

const TARGET_LOCALE: 'lv' = 'lv';
const SLUG = '/tauku-uztvereju-tirisana';

const SEO = {
  title: 'Tauku uztvērēju tīrīšana Latvijā (Rīga, Jelgava, Liepāja) | METAN.LV',
  description: 'Sertificēta tauku uztvērēju tīrīšana B2B klientiem visā Latvijā. 200 bar hidrodinamiskā skalošana, APUS dokumentācija, EWC 19 08 09, līgumi no 365 €. Steidzami pirms PVD pārbaudes — 24h. +371 27 727 724.',
};

const PROPS: GreaseTrapLandingProps = {
  locale: TARGET_LOCALE,
  faqKey: 'grease-trap-landing',
  trackingLabel: 'lv_grease_trap_landing',
  badge: 'B2B serviss visā Latvijā',
  h1: 'Tauku uztvērēju tīrīšana Latvijā — ',
  h1Highlight: 'profesionāla apkope ar PVD dokumentāciju',
  intro: 'metan.lv (SIA "Ainavas Nams") veic tauku uztvērēju tīrīšanu restorāniem, HoReCa objektiem, ražošanai un pašvaldību iepirkumiem visā Latvijā. 200 bar hidrodinamiskā skalošana (ne tikai izsūknēšana), pilna APUS / PVD dokumentācija, EWC 19 08 09. Atšķirībā no parastiem asenizatoriem.',
  contactLine: 'Tiešie kontakti: +371 27 727 724 · info@metan.lv · Bāze: Bēne, Dobeles novads · Apkalpošanas zona: visa Latvija (Rīga, Jelgava, Liepāja, Daugavpils, Ventspils, 200 km no Bēnes)',
  ctaPrimary: 'Pieteikt tīrīšanu',
  problemsTitle: 'Tipiskās problēmas ar tauku uztvērējiem',
  problems: [
    { title: 'PVD inspektors uz sliekšņa', desc: 'Ja inspektors atklāj, ka uztvērējs nav apkopts pēc grafika, sods līdz 1000 €. Mēs sniedzam steidzamu tīrīšanu 24h laikā ar visu dokumentāciju.' },
    { title: 'Kvapas un aizsērējumi', desc: 'Asenizatori, kuri tikai izsūknē šķidrumu, atstāj uztvērēja sienas un caurules ar tauku slāni. Rezultāts — pēc nedēļas atkal kvapas. Mūsu 200 bar skalošana to novērš.' },
    { title: 'Trūkstoši APUS dati', desc: 'Atkritumu Pārvadājumu Uzskaites Sistēmā jābūt katra izvešanas faktam ar EWC kodu. Mēs ievadām datus klienta vārdā — bez papildus administrēšanas.' },
  ],
  whyTitle: 'Kāpēc metan.lv',
  whyPoints: [
    '200 bar hidrodinamiskā skalošana — reāli iztīra caurules, ne tikai izsūknē',
    'Vakuuma nosūcējs ar zema profila tehniku (2.2 m) — piemērots restorāniem un termināliem',
    'Pilna APUS datu ievade klienta vārdā — bez administratīvā sloga',
    'EWC 19 08 09 klasifikācija + sertificēts utilizācijas maršruts',
    'Fiksētas cenas 12 mēnešu līgumam — bez slēptām maksām',
    'UCO bartera modelis — izlietota cepšanas eļļa sedz apkopes izmaksas',
    'Steidzams serviss 24h laikā pirms PVD pārbaudēm',
    'Apkalpojam visu Latviju — Rīgu, Jelgavu, Liepāju, Daugavpili, Ventspili',
  ],
  pricingTitle: 'Cenas pa zonām',
  pricingNote: 'Cenas ir 12 mēnešu līgumam. Zona tiek noteikta pēc reālā attāluma no Bēnes (Dobeles novads). Vienreizēja tīrīšana — pēc pieprasījuma.',
  zones: [
    { zone: '1. zona', range: '0–50 km no Bēnes', cities: 'Dobele, Jelgava, Bauska', price: 'no 365 €' },
    { zone: '2. zona', range: '50–100 km', cities: 'Rīga, Jūrmala, Tukums', price: 'no 400 €' },
    { zone: '3. zona', range: '100–150 km', cities: 'Liepāja, Ventspils, Cēsis', price: 'no 460 €' },
    { zone: '4. zona', range: '150–200 km', cities: 'Daugavpils, Rēzekne', price: 'no 500 €' },
  ],
  fogTitle: 'Pilns FOG cikls (tauki, eļļas, nogulsnes)',
  fogPoints: [
    'Tauku slāņa un nogulšņu izsūknēšana ar vakuuma sūkni',
    '200 bar hidrodinamiskā skalošana — caurules un sienas tiek pilnībā iztīrītas',
    'EWC 19 08 09 klasifikācija (tauku un eļļas maisījums no eļļas/ūdens separācijas)',
    'Sertificēts utilizācijas maršruts — apstrāde biogāzē',
    'Iespējams arī UCO (izlietota cepšanas eļļa) savākšana atsevišķi vai kombinēti',
    'Viss process tiek dokumentēts APUS un PVD vajadzībām',
  ],
  docsTitle: 'Dokumentācija un atbilstība',
  docs: [
    'Tīrīšanas akts ar fiksētu apjomu un fakta detaļām',
    'EWC 19 08 09 atkritumu klasifikācija',
    'APUS datu ievade klienta vārdā (Atkritumu Pārvadājumu Uzskaites Sistēma)',
    'Sertificēts utilizācijas maršruts uz biogāzes ražotni',
    'PVD pārbaudei gatava dokumentu pakete',
    'Līgums ar fiksētu grafiku un cenu uz 12 mēnešiem',
  ],
  ctaTitle: 'Pieteikt tauku uztvērēja tīrīšanu',
  ctaDesc: 'Sazinieties — pirmā apsekošana un piedāvājums ir bez maksas. Steidzami iespējams arī 24h laikā ar pilnu dokumentāciju.',
  ctaReply: 'Atbilde 24 stundu laikā',
  ctaFreeAssessment: 'Bezmaksas apsekošana un piedāvājums',
  ctaNoObligation: 'Bez pirmreizējām saistībām',
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
