import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/page-metadata';
import GreaseTrapLandingContent, { type GreaseTrapLandingProps } from '@/components/GreaseTrapLandingContent';

const TARGET_LOCALE: 'en' = 'en';
const SLUG = '/grease-trap-cleaning-latvia';

const SEO = {
  title: 'Grease Trap Cleaning in Latvia (Riga, Jūrmala, Liepāja) | METAN.LV',
  description: 'Certified grease trap cleaning for B2B clients across Latvia. 200-bar hydrodynamic flushing, APUS documentation, EWC 19 08 09, contracts from €365. Urgent before PVD inspection — 24h. +371 27 727 724.',
};

const PROPS: GreaseTrapLandingProps = {
  locale: TARGET_LOCALE,
  faqKey: 'grease-trap-landing',
  trackingLabel: 'en_grease_trap_landing',
  badge: 'B2B service across Latvia',
  h1: 'Grease trap cleaning in Latvia — ',
  h1Highlight: 'engineering-grade service with PVD documentation',
  intro: 'metan.lv (SIA "Ainavas Nams") delivers grease trap cleaning for restaurants, HoReCa venues, food production and municipal contracts across Latvia. 200-bar hydrodynamic flushing (not just vacuum pumping), full APUS / PVD documentation, EWC 19 08 09. Unlike standard vacuum operators.',
  contactLine: 'Direct contact: +371 27 727 724 · info@metan.lv · Base: Bēne, Dobele region · Service area: all of Latvia (Riga, Jūrmala, Jelgava, Liepāja, Daugavpils, 200 km from Bēne)',
  ctaPrimary: 'Request a cleaning',
  problemsTitle: 'Typical grease trap pain points',
  problems: [
    { title: 'PVD inspector at the door', desc: 'If an inspector finds your trap is not maintained on schedule, fines reach €1,000. We run emergency cleanings within 24 hours with full documentation.' },
    { title: 'Smells and blockages', desc: 'Vacuum-only operators leave the trap walls and downstream pipes coated with grease. Smells return within a week. Our 200-bar flushing eliminates this.' },
    { title: 'Missing APUS records', desc: 'The Latvian waste transport registry (APUS) requires every collection to be logged with an EWC code. We file APUS data on the client’s behalf — no admin overhead on your side.' },
  ],
  whyTitle: 'Why choose metan.lv',
  whyPoints: [
    '200-bar hydrodynamic flushing — actually cleans the pipes, not just pumps',
    'Vacuum trucks with low-profile equipment (2.2 m) — fits restaurants and terminals',
    'Full APUS data entry on the client’s behalf — no administrative burden',
    'EWC 19 08 09 classification + certified disposal route',
    'Fixed pricing under a 12-month contract — no hidden fees',
    'UCO barter option — used cooking oil offsets service cost',
    'Emergency service within 24 hours before PVD inspections',
    'All-Latvia coverage — Riga, Jūrmala, Jelgava, Liepāja, Daugavpils',
  ],
  pricingTitle: 'Pricing by zone',
  pricingNote: 'Prices are indicative for a 12-month contract. Zone is determined by real driving distance from Bēne (Dobele region). One-off cleaning available on request.',
  zones: [
    { zone: 'Zone 1', range: '0–50 km from Bēne', cities: 'Dobele, Jelgava, Bauska', price: 'from €365' },
    { zone: 'Zone 2', range: '50–100 km', cities: 'Riga, Jūrmala, Tukums', price: 'from €400' },
    { zone: 'Zone 3', range: '100–150 km', cities: 'Liepāja, Ventspils, Cēsis', price: 'from €460' },
    { zone: 'Zone 4', range: '150–200 km', cities: 'Daugavpils, Rēzekne', price: 'from €500' },
  ],
  fogTitle: 'End-to-end FOG cycle (fats, oils, grease)',
  fogPoints: [
    'Vacuum extraction of grease layer and sludge',
    '200-bar hydrodynamic flushing — pipes and walls fully cleaned',
    'EWC 19 08 09 classification (fat and oil mixture from oil/water separation)',
    'Certified disposal route — processing into biogas',
    'UCO (used cooking oil) collection also available, separately or bundled',
    'Every step documented for APUS and PVD',
  ],
  docsTitle: 'Documentation and compliance',
  docs: [
    'Cleaning record with documented volume and site details',
    'EWC 19 08 09 waste classification',
    'APUS data entry on the client’s behalf (Latvian waste transport registry)',
    'Certified disposal route to biogas processing facility',
    'PVD-inspection-ready document package',
    'Contract with fixed schedule and pricing for 12 months',
  ],
  ctaTitle: 'Request grease trap cleaning',
  ctaDesc: 'Get in touch — first site assessment and proposal are free. Urgent service available within 24 hours with full documentation.',
  ctaReply: 'Reply within 24 hours',
  ctaFreeAssessment: 'Free assessment and proposal',
  ctaNoObligation: 'No upfront commitments',
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
