export const locales = ['lv', 'ru', 'lt', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'lv';

export const translations = {
  lv: {
    nav: {
      home: 'Sākums',
      partners: 'Partneriem',
      services: 'Pakalpojumi',
      about: 'Par mums',
      contacts: 'Kontakti',
    },
    partneriem: {
      hero: {
        ctaPrimary: 'Aprēķināt cenu pēc adreses',
      },
      calculator: {
        locateButton: 'Noteikt objekta koordinātes (GPS)',
        addressPlaceholder: 'Ievadiet objekta adresi',
        country: 'Valsts',
        zone: 'Zona',
        distance: 'Attālums',
        price: 'Cena',
      },
      form: {
        phone: 'Telefons',
        email: 'E-pasts',
        note: 'Piezīme',
        submit: 'Saņemt cenu piedāvājumu',
      },
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      partners: 'Партнёрам',
      services: 'Услуги',
      about: 'О нас',
      contacts: 'Контакты',
    },
    partneriem: {
      hero: {
        ctaPrimary: 'Рассчитать стоимость по адресу',
      },
      calculator: {
        locateButton: 'Определить координаты объекта (GPS)',
        addressPlaceholder: 'Введите адрес объекта',
        country: 'Страна',
        zone: 'Зона',
        distance: 'Расстояние',
        price: 'Цена',
      },
      form: {
        phone: 'Телефон',
        email: 'Эл. почта',
        note: 'Примечание',
        submit: 'Получить ценовое предложение',
      },
    },
  },
  lt: {
    nav: {
      home: 'Pradžia',
      partners: 'Partneriams',
      services: 'Paslaugos',
      about: 'Apie mus',
      contacts: 'Kontaktai',
    },
    partneriem: {
      hero: {
        ctaPrimary: 'Apskaičiuoti kainą pagal adresą',
      },
      calculator: {
        locateButton: 'Nustatyti objekto koordinates (GPS)',
        addressPlaceholder: 'Įveskite objekto adresą',
        country: 'Šalis',
        zone: 'Zona',
        distance: 'Atstumas',
        price: 'Kaina',
      },
      form: {
        phone: 'Telefonas',
        email: 'El. paštas',
        note: 'Pastaba',
        submit: 'Gauti kainų pasiūlymą',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      partners: 'Partners',
      services: 'Services',
      about: 'About',
      contacts: 'Contacts',
    },
    partneriem: {
      hero: {
        ctaPrimary: 'Calculate price by address',
      },
      calculator: {
        locateButton: 'Determine object coordinates (GPS)',
        addressPlaceholder: 'Enter object address',
        country: 'Country',
        zone: 'Zone',
        distance: 'Distance',
        price: 'Price',
      },
      form: {
        phone: 'Phone',
        email: 'Email',
        note: 'Note',
        submit: 'Get price quote',
      },
    },
  },
};

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}
