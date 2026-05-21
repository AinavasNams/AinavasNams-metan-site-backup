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