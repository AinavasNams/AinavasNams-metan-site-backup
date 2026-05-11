import { generateSEOMetadata } from '@/components/SEOHead';

export const metadata = generateSEOMetadata({
  title: 'Pakalpojumi - Tauku atdalītāju tīrīšana un eļļas savākšana | METAN.LV',
  description: 'SIA Ainavas Nams piedāvā sertificētus organisko atkritumu apsaimniekošanas pakalpojumus: tauku atdalītāju tīrīšana, eļļas savākšana, augstspiediena skalošana. VVD un PVD atbilstoši risinājumi.',
  canonical: 'https://metan.lv/lv/pakalpojumi',
  keywords: 'tauku atdalītāju tīrīšana, eļļas savākšana, augstspiediena skalošana, VVD atļaujas, PVD prasības, vakuuma mašīnas, grease trap cleaning, HoReCa pakalpojumi, legāla utilizācija'
});

export const servicesStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Pakalpojumi - Organisko atkritumu apsaimniekošana',
  description: 'Sertificēti organisko atkritumu apsaimniekošanas pakalpojumi',
  url: 'https://metan.lv/lv/pakalpojumi',
  mainEntity: {
    '@type': 'Service',
    name: 'Organisko atkritumu apsaimniekošana',
    serviceType: 'Environmental Services',
    provider: {
      '@type': 'Organization',
      name: 'SIA Ainavas Nams',
      url: 'https://metan.lv'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Atkritumu apsaimniekošanas pakalpojumi',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tauku atdalītāju tīrīšana',
            description: 'VVD un PVD prasībām atbilstoša tauku atdalītāju apkope un tīrīšana'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Eļļas un tauku atkritumu savākšana',
            description: 'Vakuuma mašīnu savākšana HoReCa klientiem'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Augstspiediena kanalizācijas skalošana',
            description: 'Industriālu cauruļvadu tīrīšana ar augstspiediena iekārtām'
          }
        }
      ]
    }
  }
};