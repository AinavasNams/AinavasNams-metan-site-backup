export type Language = 'lv' | 'ru' | 'en';

export const translations = {
  lv: {
    // Navigation
    'nav.home': 'Sākums',
    'nav.about': 'Par mums',
    'nav.services': 'Pakalpojumi',
    'nav.projects': 'Projekti',
    'nav.investors': 'Investoriem',
    'nav.documents': 'Dokumenti',
    'nav.contacts': 'Kontakti',
    'nav.calculator': 'ROI kalkulators',
    
    // Hero Section - Updated content
    'hero.slogan': 'Biomasa → Biometāns',
    'hero.title': 'Mēs radām tīru enerģiju no organiskajiem atkritumiem',
    'hero.subtitle': 'SIA "Ainavas Nams" ir Latvijas aprites ekonomikas projekts, kas pārvērš taukus, pārtikas un lauksaimniecības atkritumus par biogāzi, biometānu, biopolimēriem un tehnoloģisko CO₂. Mēs apvienojam modernas tehnoloģijas, loģistiku un investīcijas, lai radītu reālu vērtību no atkritumiem.',
    'hero.cta.collection': 'Pieteikt atkritumu savākšanu',
    'hero.cta.investment': 'Uzzināt par investīciju iespējām',
    
    // How it works
    'how.title': 'Kā tas strādā',
    'how.step1': 'Zvans vai pieteikums vietnē',
    'how.step2': 'Savākšana ar vakuuma mašīnu',
    'how.step3': 'Dokumentācija un sertificēta nodošana',
    'how.step4': 'Mehāniskā attīrīšana un sadalīšana',
    'how.step5': 'Pārstrāde biometānā un CO₂ atdalīšana',
    
    // Mission & Vision
    'mission.title': 'Mūsu misija',
    'mission.text': 'Radīt slēgtu un ilgtspējīgu aprites ciklu, kurā organiskie atkritumi kļūst par vērtīgu resursu.',
    'vision.title': 'Redzējums līdz 2030. gadam',
    'vision.text': 'Kļūt par vadošo neatkarīgo biometāna ražotāju Baltijā.',
    
    // Services
    'services.title': 'Mūsu pakalpojumi',
    'services.grease.title': 'Tauku un eļļas savākšana',
    'services.grease.desc': 'Savācam lietotas eļļas, taukus un pārtikas atliekas ar vakuuma mašīnām.',
    'services.biomethane.title': 'Biometāna stacija Bēnē',
    'services.biomethane.desc': 'Moderna biometāna ražošanas stacija ar pilnu ciklu.',
    'services.cleaning.title': 'Augstspiediena tīrīšana',
    'services.cleaning.desc': 'Industriāla cauruļvadu tīrīšana ar augstspiediena iekārtām.',
    'services.legal.title': 'Legāla utilizācija',
    'services.legal.desc': 'Dokumentēta, izsekojama un legāla tauku nodošana.',
    
    // Statistics
    'stats.investment': 'investīciju piesaistīts',
    'stats.roi': 'vidējais ROI investoriem',
    'stats.processed': 'tonnas pārstrādātas izejvielas gadā',
    
    // Investors Page
    'investors.hero.title': 'Investēt CH₄ Future projektā',
    'investors.hero.subtitle': 'SIA "Ainavas Nams" aicina stratēģiskos investorus piedalīties mūsdienīgas biometāna ražošanas stacijas izveidē. Ilgtspējīgas investīcijas ar augstu atdevi un pārbaudītu infrastruktūru.',
    'investors.hero.download': 'Lejupielādēt biznesa plānu',
    'investors.hero.contact': 'Sazināties ar projekta vadītāju',
    'investors.metrics.title': 'Galvenie finansiālie rādītāji',
    'investors.metrics.subtitle': 'Projekta CH₄ Future ekonomiskā efektivitāte',
    'investors.advantages.title': 'Kāpēc ieguldīt šajā projektā?',
    'investors.timeline.title': 'Projekta īstenošanas plāns',
    'investors.timeline.subtitle': 'Galvenie posmi līdz pilnai ražošanas jaudai',
    'investors.docs.title': 'Dokumentācija investoriem',
    'investors.docs.subtitle': 'Detalizēta projekta informācija un aprēķini',
    'investors.partners.title': 'Tehnoloģiskie partneri',
    'investors.cta.title': 'Gatavs investēt nākotnē?',
    'investors.cta.subtitle': 'Pievienojieties CH₄ Future projektam un kļūstiet par daļu no Latvijas zaļās enerģijas revolūcijas. Sazinieties ar mūsu komandu detalizētai konsultācijai.',

    // Breadcrumbs
    'breadcrumb.services': 'Pakalpojumi',
    'breadcrumb.projects': 'Projekti',
    'breadcrumb.processing': 'Mehāniskā apstrāde',
    'breadcrumb.collection': 'Tauku savākšana',
    'breadcrumb.biomethane': 'Biometāns',
    'breadcrumb.calculator': 'ROI kalkulators',

    // Processing Page
    'processing.title': 'Mehāniskā apstrāde',
    'processing.subtitle': 'SIA "Ainavas Nams" attīsta inovatīvus risinājumus organisko atkritumu mehāniskai apstrādei, ietverot centrifugēšanu, biopolimēru izstrādi un augstspiediena tīrīšanas pakalpojumus.',
    'processing.contact': 'Sazināties par pakalpojumiem',
    'processing.solutions.title': 'Mūsu tehnoloģiskie risinājumi',
    'processing.process.title': 'Mehāniskās apstrādes process',
    'processing.benefits.title': 'Ko jūs iegūstat',
    'processing.partner.title': 'Tehnoloģiskais partneris',
    'processing.cta.title': 'Nepieciešama mehāniskā apstrāde?',

    // Collection Page
    'collection.title': 'Tauku un eļļas atkritumu savākšana',
    'collection.subtitle': 'Mēs atrisinām tauku atkritumu jautājumu jūsu vietā — legāli, droši un pārskatāmi. SIA "Ainavas Nams" nodrošina pilnu pakalpojumu klāstu FOG (tauki, eļļas, smērvielas) atkritumu savākšanā un tauku atdalītāju tīrīšanā.',
    'collection.services.title': 'Pakalpojumā iekļauts',
    'collection.process.title': 'Kā notiek process',
    'collection.benefits.title': 'Jūsu ieguvumi',
    'collection.equipment.title': 'Izmantotā tehnika',
    'collection.cta.title': 'Nepieciešams savākšanas pakalpojums?',

    // Biomethane Page
    'biomethane.title': 'Biogāze un biometāns',
    'biomethane.subtitle': 'CH₄ Future projekts balstās uz jau esošo staciju Bēnē, kur plānota membrānu attīrīšanas tehnoloģijas ieviešana.',
    'biomethane.metrics.title': 'Galvenie rādītāji',
    'biomethane.process.title': 'Kā darbojas CH₄ Future aprites modelis',
    'biomethane.invest.title': 'Kāpēc ieguldīt',
    'biomethane.partners.title': 'Tehnoloģiskie partneri',
    'biomethane.cta.title': 'Gatavs investēt?',

    // ROI Calculator Page
    'calculator.title': 'ROI kalkulators',
    'calculator.subtitle': 'Aprēķiniet sava ieguldījuma atdevi CH₄ Future projektā. Interaktīvs kalkulators ar detalizētiem finanšu rādītājiem un scenāriju analīzi.',
    'calculator.parameters.title': 'Projekta parametri',
    'calculator.results.title': 'Aprēķina rezultāti',
    'calculator.scenarios.title': 'Scenāriju analīze',

    // Footer
    'footer.description': 'SIA "Ainavas Nams" – a trusted partner in waste management and biomethane production in Latvia.',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    
    // Cookie Consent
    'cookies.title': 'Cookie Settings',
    'cookies.description': 'We use cookies to enhance your experience on our website. Choose the cookie categories you want to allow.',
    'cookies.acceptAll': 'Accept All',
    'cookies.rejectAll': 'Reject All',
    'cookies.settings': 'Settings',
    'cookies.necessary': 'Necessary Cookies',
    'cookies.necessaryDesc': 'These cookies are essential for the website to function and cannot be disabled.',
    'cookies.analytics': 'Analytics Cookies',
    'cookies.analyticsDesc': 'Help us understand how visitors use the website.',
    'cookies.marketing': 'Marketing Cookies',
    'cookies.marketingDesc': 'Used to show relevant advertising.',
    'cookies.personalization': 'Personalization',
    'cookies.personalizationDesc': 'Allow us to remember your preferences.',
    'cookies.save': 'Save Settings',
    'cookies.back': 'Back',
  },
  
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О компании',
    'nav.services': 'Услуги',
    'nav.projects': 'Проекты',
    'nav.investors': 'Инвесторам',
    'nav.documents': 'Документы',
    'nav.contacts': 'Контакты',
    'nav.calculator': 'ROI калькулятор',
    
    // Hero Section
    'hero.title': 'От органических отходов к чистой энергии',
    'hero.subtitle': 'Предлагаем сертифицированные решения для сбора и переработки жиров, масел и пищевых отходов в биометан.',
    'hero.cta.contact': 'Связаться',
    'hero.cta.order': 'Заказать услугу',
    'hero.cta.projects': 'Смотреть проекты',
    
    // How it works
    'how.title': 'Как это работает',
    'how.step1': 'Звонок или заявка на сайте',
    'how.step2': 'Сбор вакуумной машиной',
    'how.step3': 'Документация и сертифицированная сдача',
    'how.step4': 'Механическая очистка и разделение',
    'how.step5': 'Переработка в биометан и выделение CO₂',
    
    // Mission & Vision
    'mission.title': 'Наша миссия',
    'mission.text': 'Создать замкнутый и устойчивый цикл, в котором органические отходы становятся ценным ресурсом.',
    'vision.title': 'Видение до 2030 года',
    'vision.text': 'Стать ведущим независимым производителем биометана в Балтии.',
    
    // Services
    'services.title': 'Наши услуги',
    'services.grease.title': 'Сбор жиров и масел',
    'services.grease.desc': 'Собираем отработанные масла, жиры и пищевые остатки вакуумными машинами.',
    'services.biomethane.title': 'Биометановая станция в Бене',
    'services.biomethane.desc': 'Современная станция производства биометана с полным циклом.',
    'services.cleaning.title': 'Высоконапорная очистка',
    'services.cleaning.desc': 'Промышленная очистка трубопроводов высоконапорным оборудованием.',
    'services.legal.title': 'Легальная утилизация',
    'services.legal.desc': 'Документированная, отслеживаемая и легальная сдача жиров.',
    
    // Statistics
    'stats.investment': 'привлечено инвестиций',
    'stats.roi': 'средняя доходность для инвесторов',
    'stats.processed': 'тонн переработано сырья в год',
    
    // Investors Page
    'investors.hero.title': 'Инвестировать в проект CH₄ Future',
    'investors.hero.subtitle': 'SIA "Ainavas Nams" приглашает стратегических инвесторов участвовать в создании современной станции производства биометана. Устойчивые инвестиции с высокой доходностью и проверенной инфраструктурой.',
    'investors.hero.download': 'Скачать бизнес-план',
    'investors.hero.contact': 'Связаться с руководителем проекта',
    'investors.metrics.title': 'Основные финансовые показатели',
    'investors.metrics.subtitle': 'Экономическая эффективность проекта CH₄ Future',
    'investors.advantages.title': 'Почему инвестировать в этот проект?',
    'investors.timeline.title': 'План реализации проекта',
    'investors.timeline.subtitle': 'Основные этапы до полной производственной мощности',
    'investors.docs.title': 'Документация для инвесторов',
    'investors.docs.subtitle': 'Подробная информация о проекте и расчеты',
    'investors.partners.title': 'Технологические партнеры',
    'investors.cta.title': 'Готовы инвестировать в будущее?',
    'investors.cta.subtitle': 'Присоединяйтесь к проекту CH₄ Future и станьте частью революции зеленой энергии в Латвии. Свяжитесь с нашей командой для подробной консультации.',

    // Breadcrumbs
    'breadcrumb.services': 'Услуги',
    'breadcrumb.projects': 'Проекты',
    'breadcrumb.processing': 'Механическая переработка',
    'breadcrumb.collection': 'Сбор жиров',
    'breadcrumb.biomethane': 'Биометан',
    'breadcrumb.calculator': 'ROI калькулятор',

    // Processing Page
    'processing.title': 'Механическая переработка',
    'processing.subtitle': 'SIA "Ainavas Nams" разрабатывает инновационные решения для механической переработки органических отходов, включая центрифугирование, разработку биополимеров и высоконапорную очистку.',
    'processing.contact': 'Связаться по поводу услуг',
    'processing.solutions.title': 'Наши технологические решения',
    'processing.process.title': 'Процесс механической переработки',
    'processing.benefits.title': 'Что вы получаете',
    'processing.partner.title': 'Технологический партнер',
    'processing.cta.title': 'Нужна механическая переработка?',

    // Collection Page
    'collection.title': 'Сбор жиров и масел',
    'collection.subtitle': 'Мы решаем вопрос жировых отходов за вас — законно, безопасно и прозрачно. SIA "Ainavas Nams" предоставляет полный спектр услуг по сбору отходов FOG (жиры, масла, смазки) и очистке жироуловителей.',
    'collection.services.title': 'Включено в услугу',
    'collection.process.title': 'Как происходит процесс',
    'collection.benefits.title': 'Ваши преимущества',
    'collection.equipment.title': 'Используемая техника',
    'collection.cta.title': 'Нужна услуга сбора?',

    // Biomethane Page
    'biomethane.title': 'Биогаз и биометан',
    'biomethane.subtitle': 'Проект CH₄ Future основан на существующей станции в Бене, где планируется внедрение мембранной технологии очистки.',
    'biomethane.metrics.title': 'Ключевые показатели',
    'biomethane.process.title': 'Как работает модель циркулярной экономики CH₄ Future',
    'biomethane.invest.title': 'Почему инвестировать',
    'biomethane.partners.title': 'Технологические партнеры',
    'biomethane.cta.title': 'Готовы инвестировать?',

    // ROI Calculator Page
    'calculator.title': 'ROI калькулятор',
    'calculator.subtitle': 'Рассчитайте доходность ваших инвестиций в проект CH₄ Future. Интерактивный калькулятор с детальными финансовыми показателями и анализом сценариев.',
    'calculator.parameters.title': 'Параметры проекта',
    'calculator.results.title': 'Результаты расчета',
    'calculator.scenarios.title': 'Анализ сценариев',

    // Footer
    'footer.description': 'SIA "Ainavas Nams" – a trusted partner in waste management and biomethane production in Latvia.',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.investors': 'Investors',
    'nav.documents': 'Documents',
    'nav.contacts': 'Contacts',
    'nav.calculator': 'ROI Calculator',
    
    // Hero Section
    'hero.title': 'From Organic Waste to Clean Energy',
    'hero.subtitle': 'We offer certified solutions for collecting and processing fats, oils, and food waste into biomethane.',
    'hero.cta.contact': 'Contact Us',
    'hero.cta.order': 'Order Service',
    'hero.cta.projects': 'View Projects',
    
    // How it works
    'how.title': 'How It Works',
    'how.step1': 'Call or online application',
    'how.step2': 'Collection with vacuum machine',
    'how.step3': 'Documentation and certified delivery',
    'how.step4': 'Mechanical cleaning and separation',
    'how.step5': 'Processing to biomethane and CO₂ separation',
    
    // Mission & Vision
    'mission.title': 'Our Mission',
    'mission.text': 'Create a closed and sustainable circular economy where organic waste becomes a valuable resource.',
    'vision.title': 'Vision by 2030',
    'vision.text': 'Become the leading independent biomethane producer in the Baltics.',
    
    // Services
    'services.title': 'Our Services',
    'services.grease.title': 'Grease & Oil Collection',
    'services.grease.desc': 'We collect used oils, fats, and food waste with vacuum trucks.',
    'services.biomethane.title': 'Biomethane Station in Bēne',
    'services.biomethane.desc': 'Modern biomethane production facility with full cycle processing.',
    'services.cleaning.title': 'High-Pressure Cleaning',
    'services.cleaning.desc': 'Industrial pipeline cleaning with high-pressure equipment.',
    'services.legal.title': 'Legal Disposal',
    'services.legal.desc': 'Documented, traceable, and legal fat disposal service.',
    
    // Statistics
    'stats.investment': 'investment attracted',
    'stats.roi': 'average ROI for investors',
    'stats.processed': 'tons of raw materials processed annually',
    
    // Investors Page
    'investors.hero.title': 'Invest in CH₄ Future Project',
    'investors.hero.subtitle': 'SIA "Ainavas Nams" invites strategic investors to participate in creating a modern biomethane production facility. Sustainable investments with high returns and proven infrastructure.',
    'investors.hero.download': 'Download Business Plan',
    'investors.hero.contact': 'Contact Project Manager',
    'investors.metrics.title': 'Key Financial Metrics',
    'investors.metrics.subtitle': 'Economic effectiveness of CH₄ Future project',
    'investors.advantages.title': 'Why invest in this project?',
    'investors.timeline.title': 'Project Implementation Plan',
    'investors.timeline.subtitle': 'Key stages to full production capacity',
    'investors.docs.title': 'Documentation for Investors',
    'investors.docs.subtitle': 'Detailed project information and calculations',
    'investors.partners.title': 'Technology Partners',
    'investors.cta.title': 'Ready to invest in the future?',
    'investors.cta.subtitle': 'Join the CH₄ Future project and become part of Latvia\'s green energy revolution. Contact our team for detailed consultation.',

    // Breadcrumbs
    'breadcrumb.services': 'Services',
    'breadcrumb.projects': 'Projects',
    'breadcrumb.processing': 'Mechanical Processing',
    'breadcrumb.collection': 'Grease Collection',
    'breadcrumb.biomethane': 'Biomethane',
    'breadcrumb.calculator': 'ROI Calculator',

    // Processing Page
    'processing.title': 'Mechanical Processing',
    'processing.subtitle': 'SIA "Ainavas Nams" develops innovative solutions for mechanical processing of organic waste, including centrifugation, biopolymer development, and high-pressure cleaning services.',
    'processing.contact': 'Contact about services',
    'processing.solutions.title': 'Our technological solutions',
    'processing.process.title': 'Mechanical processing process',
    'processing.benefits.title': 'What you get',
    'processing.partner.title': 'Technology partner',
    'processing.cta.title': 'Need mechanical processing?',

    // Collection Page
    'collection.title': 'Grease and oil waste collection',
    'collection.subtitle': 'We solve the grease waste issue for you — legally, safely, and transparently. SIA "Ainavas Nams" provides a full range of services for FOG (fats, oils, grease) waste collection and grease trap cleaning.',
    'collection.services.title': 'Included in service',
    'collection.process.title': 'How the process works',
    'collection.benefits.title': 'Your benefits',
    'collection.equipment.title': 'Equipment used',
    'collection.cta.title': 'Need collection service?',

    // Biomethane Page
    'biomethane.title': 'Biogas and biomethane',
    'biomethane.subtitle': 'The CH₄ Future project is based on the existing station in Bēne, where membrane cleaning technology implementation is planned.',
    'biomethane.metrics.title': 'Key indicators',
    'biomethane.process.title': 'How the CH₄ Future circular economy model works',
    'biomethane.invest.title': 'Why invest',
    'biomethane.partners.title': 'Technology partners',
    'biomethane.cta.title': 'Ready to invest?',

    // ROI Calculator Page
    'calculator.title': 'ROI Calculator',
    'calculator.subtitle': 'Calculate the return on your investment in the CH₄ Future project. Interactive calculator with detailed financial metrics and scenario analysis.',
    'calculator.parameters.title': 'Project parameters',
    'calculator.results.title': 'Calculation results',
    'calculator.scenarios.title': 'Scenario analysis',

    // Footer
    'footer.description': 'SIA "Ainavas Nams" – a trusted partner in waste management and biomethane production in Latvia.',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
  }
};

export function getTranslation(key: string, lang: Language = 'lv'): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to Latvian if translation not found
      value = translations.lv;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if no translation found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
}