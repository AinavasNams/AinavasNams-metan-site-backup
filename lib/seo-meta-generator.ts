import { Language } from './translations';

interface SEOMetaData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  canonicalUrl: string;
  hreflang: Record<Language, string>;
}

interface PageSEOData {
  [key: string]: {
    [K in Language]: SEOMetaData;
  };
}

export const pageSEOData: PageSEOData = {
  'home': {
    lv: {
      title: 'METAN.LV - No organiskajiem atkritumiem līdz tīrai enerģijai',
      description: 'SIA Ainavas Nams piedāvā sertificētus risinājumus tauku, eļļas un pārtikas atkritumu savākšanai un pārstrādei uz biometānu. Biometāna ražošana Latvijā.',
      keywords: 'biometāns, atkritumu savākšana, tauku utilizācija, eļļas savākšana, organisko atkritumu pārstrāde, videi draudzīga enerģija, Latvija',
      ogTitle: 'METAN.LV - Biometāna ražošana Latvijā',
      ogDescription: 'Sertificēti risinājumi organisko atkritumu savākšanai un pārstrādei uz biometānu.',
      canonicalUrl: 'https://metan.lv',
      hreflang: {
        lv: 'https://metan.lv?lang=lv',
        ru: 'https://metan.lv?lang=ru',
        en: 'https://metan.lv?lang=en'
      }
    },
    ru: {
      title: 'METAN.LV - От органических отходов к чистой энергии',
      description: 'SIA Ainavas Nams предлагает сертифицированные решения для сбора и переработки жиров, масел и пищевых отходов в биометан.',
      keywords: 'биометан, сбор отходов, утилизация жиров, сбор масел, переработка органических отходов, экологически чистая энергия, Латвия',
      ogTitle: 'METAN.LV - Производство биометана в Латвии',
      ogDescription: 'Сертифицированные решения для сбора и переработки органических отходов в биометан.',
      canonicalUrl: 'https://metan.lv',
      hreflang: {
        lv: 'https://metan.lv?lang=lv',
        ru: 'https://metan.lv?lang=ru',
        en: 'https://metan.lv?lang=en'
      }
    },
    en: {
      title: 'METAN.LV - From Organic Waste to Clean Energy',
      description: 'SIA Ainavas Nams offers certified solutions for collecting and processing fats, oils, and food waste into biomethane.',
      keywords: 'biomethane, waste collection, grease disposal, oil collection, organic waste processing, clean energy, Latvia',
      ogTitle: 'METAN.LV - Biomethane Production in Latvia',
      ogDescription: 'Certified solutions for collecting and processing organic waste into biomethane.',
      canonicalUrl: 'https://metan.lv',
      hreflang: {
        lv: 'https://metan.lv?lang=lv',
        ru: 'https://metan.lv?lang=ru',
        en: 'https://metan.lv?lang=en'
      }
    }
  },
  'investors': {
    lv: {
      title: 'Investēt CH₄ Future projektā - METAN.LV',
      description: 'Ilgtspējīgas investīcijas biometāna ražošanā ar augstu atdevi. Pievienojieties CH₄ Future projektam un kļūstiet par daļu no zaļās enerģijas revolūcijas.',
      keywords: 'investīcijas, biometāns, CH₄ Future, atdeve, zaļā enerģija, Latvija',
      ogTitle: 'Investēt CH₄ Future projektā',
      ogDescription: 'Ilgtspējīgas investīcijas biometāna ražošanā ar augstu atdevi.',
      canonicalUrl: 'https://metan.lv/investoriem',
      hreflang: {
        lv: 'https://metan.lv/investoriem?lang=lv',
        ru: 'https://metan.lv/investoriem?lang=ru',
        en: 'https://metan.lv/investoriem?lang=en'
      }
    },
    ru: {
      title: 'Инвестировать в проект CH₄ Future - METAN.LV',
      description: 'Устойчивые инвестиции в производство биометана с высокой доходностью. Присоединяйтесь к проекту CH₄ Future.',
      keywords: 'инвестиции, биометан, CH₄ Future, доходность, зеленая энергия, Латвия',
      ogTitle: 'Инвестировать в проект CH₄ Future',
      ogDescription: 'Устойчивые инвестиции в производство биометана с высокой доходностью.',
      canonicalUrl: 'https://metan.lv/investoriem',
      hreflang: {
        lv: 'https://metan.lv/investoriem?lang=lv',
        ru: 'https://metan.lv/investoriem?lang=ru',
        en: 'https://metan.lv/investoriem?lang=en'
      }
    },
    en: {
      title: 'Invest in CH₄ Future Project - METAN.LV',
      description: 'Sustainable investments in biomethane production with high returns. Join the CH₄ Future project.',
      keywords: 'investments, biomethane, CH₄ Future, returns, green energy, Latvia',
      ogTitle: 'Invest in CH₄ Future Project',
      ogDescription: 'Sustainable investments in biomethane production with high returns.',
      canonicalUrl: 'https://metan.lv/investoriem',
      hreflang: {
        lv: 'https://metan.lv/investoriem?lang=lv',
        ru: 'https://metan.lv/investoriem?lang=ru',
        en: 'https://metan.lv/investoriem?lang=en'
      }
    }
  },
  'services': {
    lv: {
      title: 'Pakalpojumi - Tauku savākšana un biometāna ražošana',
      description: 'Pilns pakalpojumu spektrs organisko atkritumu savākšanā un pārstrādē. Tauku un eļļas savākšana, biometāna ražošana, augstspiediena tīrīšana.',
      keywords: 'pakalpojumi, tauku savākšana, eļļas savākšana, biometāna ražošana, augstspiediena tīrīšana, Latvija',
      ogTitle: 'Pakalpojumi - METAN.LV',
      ogDescription: 'Pilns pakalpojumu spektrs organisko atkritumu savākšanā un pārstrādē.',
      canonicalUrl: 'https://metan.lv/pakalpojumi',
      hreflang: {
        lv: 'https://metan.lv/pakalpojumi?lang=lv',
        ru: 'https://metan.lv/pakalpojumi?lang=ru',
        en: 'https://metan.lv/pakalpojumi?lang=en'
      }
    },
    ru: {
      title: 'Услуги - Сбор жиров и производство биометана',
      description: 'Полный спектр услуг по сбору и переработке органических отходов. Сбор жиров и масел, производство биометана, высоконапорная очистка.',
      keywords: 'услуги, сбор жиров, сбор масел, производство биометана, высоконапорная очистка, Латвия',
      ogTitle: 'Услуги - METAN.LV',
      ogDescription: 'Полный спектр услуг по сбору и переработке органических отходов.',
      canonicalUrl: 'https://metan.lv/pakalpojumi',
      hreflang: {
        lv: 'https://metan.lv/pakalpojumi?lang=lv',
        ru: 'https://metan.lv/pakalpojumi?lang=ru',
        en: 'https://metan.lv/pakalpojumi?lang=en'
      }
    },
    en: {
      title: 'Services - Grease Collection and Biomethane Production',
      description: 'Full range of services for organic waste collection and processing. Grease and oil collection, biomethane production, high-pressure cleaning.',
      keywords: 'services, grease collection, oil collection, biomethane production, high-pressure cleaning, Latvia',
      ogTitle: 'Services - METAN.LV',
      ogDescription: 'Full range of services for organic waste collection and processing.',
      canonicalUrl: 'https://metan.lv/pakalpojumi',
      hreflang: {
        lv: 'https://metan.lv/pakalpojumi?lang=lv',
        ru: 'https://metan.lv/pakalpojumi?lang=ru',
        en: 'https://metan.lv/pakalpojumi?lang=en'
      }
    }
  }
};

export function generateSEOMeta(page: string, language: Language): SEOMetaData {
  const pageData = pageSEOData[page];
  if (!pageData) {
    // Fallback to home page data
    return pageSEOData['home'][language];
  }
  
  return pageData[language];
}

// Dynamic meta tag injection
export function injectSEOMeta(metaData: SEOMetaData) {
  if (typeof window === 'undefined') return;

  // Update title
  document.title = metaData.title;

  // Update or create meta tags
  const metaTags = [
    { name: 'description', content: metaData.description },
    { name: 'keywords', content: metaData.keywords },
    { property: 'og:title', content: metaData.ogTitle },
    { property: 'og:description', content: metaData.ogDescription },
    { property: 'og:url', content: metaData.canonicalUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'lv_LV' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: metaData.ogTitle },
    { name: 'twitter:description', content: metaData.ogDescription },
  ];

  metaTags.forEach(tag => {
    const identifier = tag.name || tag.property;
    const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
    let metaElement = document.querySelector(selector);
    
    if (!metaElement) {
      metaElement = document.createElement('meta');
      if (tag.name) metaElement.setAttribute('name', tag.name);
      if (tag.property) metaElement.setAttribute('property', tag.property);
      document.head.appendChild(metaElement);
    }
    
    metaElement.setAttribute('content', tag.content);
  });

  // Update canonical URL
  let canonicalElement = document.querySelector('link[rel="canonical"]');
  if (!canonicalElement) {
    canonicalElement = document.createElement('link');
    canonicalElement.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalElement);
  }
  canonicalElement.setAttribute('href', metaData.canonicalUrl);

  // Update hreflang tags
  document.querySelectorAll('link[hreflang]').forEach(el => el.remove());
  Object.entries(metaData.hreflang).forEach(([lang, url]) => {
    const hreflangElement = document.createElement('link');
    hreflangElement.setAttribute('rel', 'alternate');
    hreflangElement.setAttribute('hreflang', lang);
    hreflangElement.setAttribute('href', url);
    document.head.appendChild(hreflangElement);
  });

  console.log('SEO meta tags updated for:', metaData.title);
}