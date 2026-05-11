import { generateSEOMetadata } from '@/components/SEOHead';

export const metadata = generateSEOMetadata({
  title: 'Investoriem - CH₄ Future biometāna projekts | METAN.LV',
  description: 'Investēt CH₄ Future projektā - biometāna ražošanas stacija ar 38,6% rentabilitāti un 2,6 gadu atdevi. Stratēģiskās investīcijas ar ISCC sertifikāciju un ESG atbilstību.',
  canonical: 'https://metan.lv/lv/investoriem',
  keywords: 'CH4 Future, biometāna investīcijas, zaļā enerģija, ESG investīcijas, bioekonomika, ISCC sertifikācija, rentabilitāte 38.6%, ilgtspējīgas investīcijas, Latvija'
});

export const investorStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Investoriem - CH₄ Future biometāna projekts',
  description: 'Investīciju iespējas biometāna ražošanas projektā',
  url: 'https://metan.lv/lv/investoriem',
  mainEntity: {
    '@type': 'InvestmentOrSecurities',
    name: 'CH₄ Future biometāna projekts',
    description: 'Biometāna ražošanas stacijas modernizācija ar 38,6% rentabilitāti',
    investmentAmount: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: '1738000'
    },
    returnOnInvestment: '38.6%',
    paybackPeriod: 'P2Y6M',
    provider: {
      '@type': 'Organization',
      name: 'SIA Ainavas Nams',
      url: 'https://metan.lv',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'LV',
        addressRegion: 'Dobeles novads',
        addressLocality: 'Bēne'
      }
    },
    additionalType: 'Green Investment',
    category: 'Renewable Energy',
    sameAs: 'https://metan.lv/investoriem'
  },
  about: {
    '@type': 'Thing',
    name: 'Biometāna ražošana',
    description: 'Zaļās enerģijas projekts ar ESG atbilstību'
  }
};