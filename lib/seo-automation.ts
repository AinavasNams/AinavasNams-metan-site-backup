// 🚀 АВТОМАТИЗИРОВАННАЯ SEO СИСТЕМА ДЛЯ МАКСИМАЛЬНОЙ ВИДИМОСТИ

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  locale?: string;
  alternateLanguages?: Array<{
    lang: string;
    url: string;
  }>;
}

// Автоматические SEO фразы для каждой страницы (УСЛУГИ = ПРИОРИТЕТ!)
const SEO_PHRASES = {
  lv: {
    home: [
      'tauku atdalītāju tīrīšana Latvijā',
      'eļļas un tauku savākšana',
      'kanalizācijas skalošana Rīgā',
      'legāla tauku utilizācija',
      'augstspiediena kanalizācijas tīrīšana',
      'grease trap cleaning Latvia',
      'tauku atkritumu savākšana',
      'kanalizācijas apkope uzņēmumiem',
      'restorānu atkritumu apsaimniekošana',
      'profesionāla tauku utilizācija'
    ],
    services: [
      'tauku atdalītāju tīrīšana Rīgā',
      'grease trap cleaning service',
      'kanalizācijas skalošana cena',
      'eļļas savākšana restorāniem',
      'tauku utilizācija Latvijā',
      'augstspiediena skalošana',
      'kanalizācijas apkope',
      'restorānu tauku savākšana',
      'legāla atkritumu utilizācija',
      'profesionāla tīrīšanas pakalpojumi'
    ],
    calculator: [
      'tauku tīrīšanas izmaksas',
      'kanalizācijas skalošanas cena',
      'eļļas savākšanas tarifs',
      'grease trap cleaning cost',
      'pakalpojumu cenu kalkulators',
      'tauku utilizācijas izmaksas',
      'kanalizācijas apkopes cena',
      'restorāna atkritumu izmaksas',
      'tīrīšanas pakalpojumu kalkulators',
      'saimniecības pakalpojumu cenas'
    ],
    investors: [
      'biometāna investīcijas',
      'zaļās enerģijas investīcijas',
      'atjaunojamās enerģijas projekti',
      'ROI biometāns',
      'investīciju iespējas Latvijā',
      'videi draudzīgas investīcijas',
      'ilgtspējīgs bizness',
      'enerģētikas investīcijas',
      'ESG investīcijas',
      'biometāna peļņa'
    ],
    projects: [
      'biometāna projekti Latvijā',
      'atjaunojamās enerģijas projekti',
      'tauku pārstrādes projekti',
      'zaļie projekti',
      'klimata tehnoloģijas',
      'biogāzes stacijas',
      'enerģētiskā neatkarība',
      'vietējā enerģija',
      'videi draudzīga ražošana',
      'organisko atkritumu pārstrāde'
    ]
  },
  ru: {
    home: [
      'очистка жироуловителей Латвия',
      'сбор масла и жиров',
      'промывка канализации Рига',
      'легальная утилизация жиров',
      'очистка канализации высоким давлением',
      'grease trap cleaning Latvia',
      'сбор жировых отходов',
      'обслуживание канализации для предприятий',
      'утилизация отходов ресторанов',
      'профессиональная утилизация жиров'
    ],
    services: [
      'очистка жироуловителей цена',
      'сбор отработанного масла',
      'промывка канализации стоимость',
      'утилизация жиров ресторанов',
      'обслуживание жироуловителей',
      'прочистка канализации',
      'сбор жировых отходов',
      'легальная утилизация отходов',
      'профессиональные услуги очистки',
      'техническое обслуживание канализации'
    ],
    investors: [
      'инвестиции в биометан',
      'зеленые инвестиции Латвия',
      'ROI биометан',
      'возобновляемая энергия инвестиции',
      'устойчивый бизнес',
      'ESG инвестиции',
      'биогаз инвестиции',
      'экологические проекты',
      'энергетические инвестиции',
      'инвестиции в отходы'
    ]
  },
  en: {
    home: [
      'grease trap cleaning Latvia',
      'oil and fat waste collection',
      'drain cleaning Riga',
      'legal fat disposal',
      'high pressure drain cleaning',
      'grease waste management',
      'restaurant waste collection',
      'commercial drain maintenance',
      'professional cleaning services',
      'waste oil collection'
    ],
    services: [
      'grease trap cleaning cost',
      'waste oil collection service',
      'drain cleaning price',
      'restaurant grease disposal',
      'commercial cleaning services',
      'high pressure cleaning',
      'drain maintenance',
      'grease waste collection',
      'legal waste disposal',
      'professional drain cleaning'
    ],
    investors: [
      'biomethane investments',
      'green energy investments Latvia',
      'biomethane ROI',
      'renewable energy investment',
      'sustainable business',
      'ESG investments',
      'biogas investments',
      'environmental projects',
      'energy sector investments',
      'waste to energy investments'
    ]
  }
};

// Генератор автоматических мета-тегов
export function generateSEOData(
  page: 'home' | 'investors' | 'services' | 'projects' | 'calculator' | 'contacts' | 'about',
  lang: 'lv' | 'ru' | 'en' = 'lv',
  customData?: Partial<SEOData>
): SEOData {
  console.log('Generating SEO data for:', page, lang);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://metan.lv';
  const currentDate = new Date().toISOString();

  // Базовые данные по страницам (УСЛУГИ НА ПЕРВОМ МЕСТЕ!)
  const pageData = {
    home: {
      lv: {
        title: 'METAN.LV - Tauku atdalītāju tīrīšana un eļļas savākšana Latvijā | Profesionāli pakalpojumi',
        description: 'Profesionāla tauku atdalītāju tīrīšana, eļļas savākšana un kanalizācijas skalošana Latvijā. Licencēti speciālisti, moderna aprīkojuma. Restorāniem, viesnīcām, uzņēmumiem. Zvaniet: +371 27727752',
        keywords: SEO_PHRASES.lv.home
      },
      ru: {
        title: 'METAN.LV - Очистка жироуловителей и сбор масла в Латвии | Профессиональные услуги',
        description: 'Профессиональная очистка жироуловителей, сбор отработанного масла и промывка канализации в Латвии. Лицензированные специалисты, современное оборудование.',
        keywords: SEO_PHRASES.ru.home
      },
      en: {
        title: 'METAN.LV - Grease Trap Cleaning and Oil Collection in Latvia | Professional Services',
        description: 'Professional grease trap cleaning, waste oil collection and drain cleaning in Latvia. Licensed specialists, modern equipment. For restaurants, hotels, businesses.',
        keywords: SEO_PHRASES.en.home
      }
    },
    services: {
      lv: {
        title: 'Pakalpojumi - Tauku tīrīšana, Eļļas savākšana, Kanalizācijas skalošana | METAN.LV',
        description: 'Pilns pakalpojumu spektrs: tauku atdalītāju tīrīšana no 120€, eļļas savākšana, augstspiediena kanalizācijas skalošana. Licencēti speciālisti visā Latvijā. Ātra reaģēšana 24/7.',
        keywords: SEO_PHRASES.lv.services
      }
    },
    calculator: {
      lv: {
        title: 'Pakalpojumu Cenu Kalkulators - Tauku tīrīšana, Eļļas savākšana | METAN.LV',
        description: 'Aprēķiniet tauku atdalītāju tīrīšanas, eļļas savākšanas un kanalizācijas skalošanas izmaksas. Interaktīvs kalkulators ar reālām cenām. Saņemiet piedāvājumu 30 minūtēs.',
        keywords: SEO_PHRASES.lv.calculator
      }
    },
    investors: {
      lv: {
        title: 'Investoriem - Biometāna investīciju iespējas | ROI līdz 109% | METAN.LV',
        description: 'Investējiet biometāna ražošanā ar augstu ROI līdz 109%. Atmaksāšanās 0.9 gadi. Ilgtspējīgas investīcijas atjaunojamajā enerģijā Latvijā. Detalizēti finansu modeļi.',
        keywords: SEO_PHRASES.lv.investors
      },
      ru: {
        title: 'Инвесторам - Инвестиции в биометан | ROI до 109% | METAN.LV',
        description: 'Инвестируйте в производство биометана с высоким ROI до 109%. Окупаемость 0.9 года. Устойчивые инвестиции в возобновляемую энергию в Латвии.',
        keywords: SEO_PHRASES.ru.investors
      },
      en: {
        title: 'Investors - Biomethane Investment Opportunities | ROI up to 109% | METAN.LV',
        description: 'Invest in biomethane production with high ROI up to 109%. Payback 0.9 years. Sustainable investments in renewable energy in Latvia.',
        keywords: SEO_PHRASES.en.investors
      }
    },
    projects: {
      lv: {
        title: 'Projekti - Biometāna un Atkritumu Pārstrādes Projekti Latvijā | METAN.LV',
        description: 'Mūsu projekti biometāna ražošanā un atkritumu pārstrādē. Zemgales Enerģijas Parks, tauku utilizācijas stacija, augstspiediena iekārtas. Inovācijas vides aizsardzībā.',
        keywords: SEO_PHRASES.lv.projects
      }
    }
  };

  // Получаем данные для текущей страницы и языка
  const currentPageData = pageData[page]?.[lang] || pageData[page]?.lv || pageData.home.lv;

  // Альтернативные языки
  const alternateLanguages = [
    { lang: 'lv', url: `${baseUrl}/${page === 'home' ? '' : page}?lang=lv` },
    { lang: 'ru', url: `${baseUrl}/${page === 'home' ? '' : page}?lang=ru` },
    { lang: 'en', url: `${baseUrl}/${page === 'home' ? '' : page}?lang=en` }
  ];

  return {
    title: currentPageData.title,
    description: currentPageData.description,
    keywords: currentPageData.keywords,
    canonical: `${baseUrl}/${page === 'home' ? '' : page}`,
    ogImage: `${baseUrl}/og-image-${page}.jpg`,
    ogType: page === 'home' ? 'website' : 'article',
    publishedTime: currentDate,
    modifiedTime: currentDate,
    author: 'SIA Ainavas Nams',
    category: 'Biometāna ražošana',
    locale: lang === 'lv' ? 'lv_LV' : lang === 'ru' ? 'ru_RU' : 'en_US',
    alternateLanguages,
    ...customData
  };
}

// Генератор структурированных данных Schema.org
export function generateSchemaData(page: string, seoData: SEOData) {
  console.log('Generating schema data for page:', page);

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SIA Ainavas Nams",
    "alternateName": "METAN.LV",
    "url": "https://metan.lv",
    "logo": "https://metan.lv/logo.png",
    "description": "Biometāna ražošana un organisko atkritumu pārstrāde Latvijā",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rūpniecības iela 2D, Bēne, Bēnes pag.",
      "addressLocality": "Dobeles nov.",
      "postalCode": "LV-3711",
      "addressCountry": "LV"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+371 27727752",
      "email": "ainavasnams@gmail.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/metan.lv",
      "https://www.linkedin.com/company/metan-lv",
      "https://www.instagram.com/metan.lv"
    ]
  };

  // Специальная схема для инвесторов
  if (page === 'investors') {
    return [
      baseSchema,
      {
        "@context": "https://schema.org",
        "@type": "InvestmentOrSavingsProduct",
        "name": "Биометана инвестиции",
        "description": "Инвестиционные возможности в производство биометана с высоким ROI",
        "provider": {
          "@type": "Organization",
          "name": "SIA Ainavas Nams"
        },
        "offers": {
          "@type": "Offer",
          "description": "ROI до 109%, окупаемость 0.9 года"
        }
      }
    ];
  }

  // Специальная схема для калькулятора
  if (page === 'calculator') {
    return [
      baseSchema,
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ROI Kalkulators biometānam",
        "description": "Interaktīvs ROI kalkulators biometāna investīciju aprēķināšanai",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "provider": {
          "@type": "Organization",
          "name": "SIA Ainavas Nams"
        }
      }
    ];
  }

  return baseSchema;
}

// Генератор Open Graph тегов для социальных сетей
export function generateOpenGraphTags(seoData: SEOData) {
  console.log('Generating Open Graph tags');

  return {
    'og:title': seoData.title,
    'og:description': seoData.description,
    'og:type': seoData.ogType || 'website',
    'og:url': seoData.canonical,
    'og:image': seoData.ogImage || 'https://metan.lv/og-image-default.jpg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:site_name': 'METAN.LV',
    'og:locale': seoData.locale || 'lv_LV',
    'twitter:card': 'summary_large_image',
    'twitter:title': seoData.title,
    'twitter:description': seoData.description,
    'twitter:image': seoData.ogImage || 'https://metan.lv/og-image-default.jpg'
  };
}

// Автоматизированный анализ конкурентов
export async function analyzeCompetitorSEO(keywords: string[]) {
  console.log('Analyzing competitor SEO for keywords:', keywords);
  
  // Здесь можно интегрировать API для анализа конкурентов
  // Например, через n8n webhook или другой сервис
  try {
    const response = await fetch('/api/competitor-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords })
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Competitor analysis not available:', error);
  }
  
  return null;
}

// Автоматическая оптимизация контента
export function optimizeContentForSEO(content: string, keywords: string[], lang: 'lv' | 'ru' | 'en' = 'lv') {
  console.log('Optimizing content for SEO with keywords:', keywords);

  let optimizedContent = content;
  
  // Добавляем ключевые слова естественным образом
  keywords.forEach((keyword, index) => {
    if (index < 3 && !optimizedContent.toLowerCase().includes(keyword.toLowerCase())) {
      // Добавляем первые 3 ключевых слова в контент
      optimizedContent += ` ${keyword}.`;
    }
  });

  return optimizedContent;
}