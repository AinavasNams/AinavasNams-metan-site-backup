'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Truck, Shield, FileText, CheckCircle, Phone, Clock,
  Droplets, Calculator, Recycle, Euro
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { trackPageView, trackCTA, trackServiceInterest, trackFormSubmission } from '@/components/Analytics';
import { SimpleContactForm } from '@/components/SimpleContactForm';
import PriorityContacts from '@/components/PriorityContacts';
import { useTranslation } from '@/hooks/useTranslation';
import { pushFormSubmit, trackPhoneCall } from '@/lib/gtm-events';
import FAQSchema from '@/components/FAQSchema';
import { getFAQsForLocale } from '@/lib/faq-data';

type Locale = 'lv' | 'ru' | 'en' | 'lt';

const CONTENT: Record<Locale, {
  badge: string;
  h1: string;
  h1Highlight: string;
  intro: string;
  contactLine: string;
  ctaCall: string;
  ctaForm: string;
  benefitsTitle: string;
  benefits: string[];
  howTitle: string;
  howSteps: { title: string; desc: string }[];
  pricingTitle: string;
  pricingNote: string;
  zones: { zone: string; range: string; cities: string; price: string }[];
  barterTitle: string;
  barterIntro: string;
  barterPoints: string[];
  documentsTitle: string;
  documents: string[];
  ctaTitle: string;
  ctaDesc: string;
  ctaReply: string;
  ctaFreeAssessment: string;
  ctaNoObligation: string;
}> = {
  lv: {
    badge: 'B2B serviss visā Latvijā',
    h1: 'Izlietotās cepšanas eļļas savākšana — ',
    h1Highlight: 'UCO collection Latvija',
    intro: 'metan.lv (SIA "Ainavas Nams") savāc izlietotu cepšanas eļļu (UCO) no restorāniem, viesnīcām, ēdināšanas tīkliem un pārtikas ražošanas objektiem visā Latvijā. Tirgus likme 0,40–0,55 €/L vai bartera modelis pret tauku uztvērēju apkopi. Pilna APUS / PVD dokumentācija, EWC 19 08 09.',
    contactLine: 'Tiešie kontakti: +371 27 727 724 · info@metan.lv · Bāze: Bēne, Dobeles novads · Apkalpošanas zona: visa Latvija (200 km no Bēnes), Lietuva pēc vienošanās',
    ctaCall: 'Pieteikt UCO savākšanu',
    ctaForm: 'Saņemt piedāvājumu',
    benefitsTitle: 'Kāpēc izvēlēties metan.lv UCO savākšanai',
    benefits: [
      'Tirgus cena 0,40–0,55 € par litru — pārskatāmi, bez slēptām maksām',
      'Bartera iespēja: UCO sedz tauku uztvērēja apkopes izmaksas (līdz 100%)',
      'Sertificēts utilizācijas / pārstrādes maršruts uz biodegvielu',
      'Pilna APUS datu ievade klienta vārdā',
      'EWC 19 08 09 klasifikācija + PVD pārbaudei gatava dokumentācija',
      'Plānots savākšanas grafiks — bez avārijas zvaniem',
      'Konteineri un loģistika no mūsu puses',
      'Pilna komplekta serviss: UCO + tauku uztvērējs + FOG vienā līgumā',
    ],
    howTitle: 'Kā darbojas UCO savākšana',
    howSteps: [
      { title: 'Pieteikums', desc: 'Sazinieties pa tālruni vai veidlapā. Norādiet objekta tipu un aptuvenu UCO apjomu mēnesī.' },
      { title: 'Konteineri', desc: 'Piegādājam tīrus konteinerus jūsu virtuvē. Bez maksas, bez depozīta.' },
      { title: 'Plānots paņemšanas grafiks', desc: 'Vienojamies par regulāru savākšanu (1–4 reizes mēnesī). Iekrāvēji un loģistika — no mūsu puses.' },
      { title: 'Norēķini / barters', desc: 'Maksājam tirgus cenu par litru VAI ieskaitām vērtību tauku uztvērēja apkopē. Pilna dokumentācija APUS un PVD.' },
    ],
    pricingTitle: 'Cenas un zonas',
    pricingNote: 'UCO savākšanai pati par sevi nav zonu maksas — savāktais aliejs tiek pirkts pēc tirgus likmes. Zonas attiecas, ja kopā ar UCO pasūtāt tauku uztvērēju apkopi (12 mēnešu līgums).',
    zones: [
      { zone: '1. zona', range: '0–50 km no Bēnes', cities: 'Dobele, Jelgava, Bauska', price: 'no 365 €' },
      { zone: '2. zona', range: '50–100 km', cities: 'Rīga, Jūrmala, Tukums', price: 'no 400 €' },
      { zone: '3. zona', range: '100–150 km', cities: 'Liepāja, Ventspils, Cēsis', price: 'no 460 €' },
      { zone: '4. zona', range: '150–200 km', cities: 'Daugavpils, Rēzekne', price: 'no 500 €' },
    ],
    barterTitle: 'UCO bartera modelis — unikāls Latvijā',
    barterIntro: 'Ja jūs ģenerējat 100+ L UCO mēnesī, šī eļļa var pilnībā segt tauku uztvērēja apkopes izmaksas. Tas ir vienīgais šāda veida modelis Latvijā.',
    barterPoints: [
      'UCO tiek pieņemts pēc tirgus likmes (0,40–0,55 €/L),',
      'Vērtība tiek ieskaitīta tauku uztvērēja un FOG pakalpojuma rēķinā,',
      'Restorāns ar 200+ L UCO mēnesī var saņemt apkopi bez papildus maksas,',
      'Viss process tiek dokumentēts APUS un PVD vajadzībām.',
    ],
    documentsTitle: 'Dokumentācija',
    documents: [
      'Savākšanas akts ar litru fiksāciju',
      'EWC 19 08 09 — izmantotas eļļas un tauku maisījums (atkritumu klase)',
      'APUS datu ievade (Atkritumu Pārvadājumu Uzskaites Sistēma) klienta vārdā',
      'Sertificēts utilizācijas maršruts — gala pārstrāde biodīzelī / biogāzē',
      'PVD pārbaudei gatava dokumentu pakete',
    ],
    ctaTitle: 'Pieteikt UCO savākšanu šodien',
    ctaDesc: 'Sazinieties — pirmā tikšanās un audits ir bez maksas. Pārskatām, cik UCO ģenerējat, un piedāvājam labāko modeli: tirgus cena vai barters.',
    ctaReply: 'Atbilde 24 stundu laikā',
    ctaFreeAssessment: 'Bezmaksas audits un piedāvājums',
    ctaNoObligation: 'Bez pirmreizējām saistībām',
  },
  ru: {
    badge: 'B2B сервис по всей Латвии',
    h1: 'Сбор отработанного кулинарного масла — ',
    h1Highlight: 'UCO в Латвии',
    intro: 'metan.lv (SIA "Ainavas Nams") собирает отработанное кулинарное масло (UCO) у ресторанов, отелей, сетей общественного питания и пищевых производств по всей Латвии. Рыночная ставка 0,40–0,55 €/л или бартер на обслуживание жироуловителей. Полная документация APUS / PVD, EWC 19 08 09.',
    contactLine: 'Прямые контакты: +371 27 727 724 · info@metan.lv · База: Бене, Добельский край · Зона обслуживания: вся Латвия (200 км от Бене), Литва по согласованию',
    ctaCall: 'Заказать сбор UCO',
    ctaForm: 'Получить предложение',
    benefitsTitle: 'Почему выбирают metan.lv для сбора UCO',
    benefits: [
      'Рыночная цена 0,40–0,55 € за литр — прозрачно, без скрытых платежей',
      'Бартерная опция: UCO покрывает обслуживание жироуловителя (до 100%)',
      'Сертифицированный маршрут утилизации / переработки в биотопливо',
      'Полная подача данных в APUS от имени клиента',
      'EWC 19 08 09 + готовая документация для проверок PVD',
      'Плановый график сбора — без аварийных звонков',
      'Контейнеры и логистика — с нашей стороны',
      'Полный сервис: UCO + жироуловитель + FOG в одном договоре',
    ],
    howTitle: 'Как работает сбор UCO',
    howSteps: [
      { title: 'Заявка', desc: 'Свяжитесь по телефону или через форму. Укажите тип объекта и примерный объём UCO в месяц.' },
      { title: 'Контейнеры', desc: 'Доставляем чистые контейнеры на вашу кухню. Бесплатно, без залога.' },
      { title: 'График сбора', desc: 'Согласовываем регулярный сбор (1–4 раза в месяц). Грузчики и логистика — с нашей стороны.' },
      { title: 'Расчёт / бартер', desc: 'Платим рыночную цену за литр ИЛИ зачитываем стоимость в обслуживание жироуловителя. Полная документация APUS и PVD.' },
    ],
    pricingTitle: 'Цены и зоны',
    pricingNote: 'Сам сбор UCO не имеет зональной платы — собранное масло выкупается по рыночной ставке. Зоны применяются, если вместе с UCO вы заказываете обслуживание жироуловителя (договор на 12 мес).',
    zones: [
      { zone: 'Зона 1', range: '0–50 км от Бене', cities: 'Добеле, Елгава, Бауска', price: 'от 365 €' },
      { zone: 'Зона 2', range: '50–100 км', cities: 'Рига, Юрмала, Тукумс', price: 'от 400 €' },
      { zone: 'Зона 3', range: '100–150 км', cities: 'Лиепая, Вентспилс, Цесис', price: 'от 460 €' },
      { zone: 'Зона 4', range: '150–200 км', cities: 'Даугавпилс, Резекне', price: 'от 500 €' },
    ],
    barterTitle: 'Бартерная модель UCO — уникальна в Латвии',
    barterIntro: 'Если вы генерируете 100+ литров UCO в месяц, это масло может полностью покрыть стоимость обслуживания жироуловителя. Единственная такая модель в Латвии.',
    barterPoints: [
      'UCO принимается по рыночной ставке (0,40–0,55 €/л),',
      'Стоимость зачитывается в счёт обслуживания жироуловителя и FOG,',
      'Ресторан с 200+ л UCO в месяц может получить обслуживание бесплатно,',
      'Весь процесс документируется для APUS и PVD.',
    ],
    documentsTitle: 'Документация',
    documents: [
      'Акт сбора с фиксацией литража',
      'EWC 19 08 09 — смесь использованных масел и жиров (класс отходов)',
      'Подача в APUS (Atkritumu Pārvadājumu Uzskaites Sistēma) от имени клиента',
      'Сертифицированный маршрут утилизации — переработка в биодизель / биогаз',
      'Готовый пакет документов для проверок PVD',
    ],
    ctaTitle: 'Закажите сбор UCO сегодня',
    ctaDesc: 'Свяжитесь — первая встреча и аудит бесплатно. Считаем сколько UCO вы генерируете и предлагаем лучшую модель: рыночная цена или бартер.',
    ctaReply: 'Ответ в течение 24 часов',
    ctaFreeAssessment: 'Бесплатный аудит и предложение',
    ctaNoObligation: 'Без первоначальных обязательств',
  },
  en: {
    badge: 'B2B service across Latvia',
    h1: 'Used cooking oil collection — ',
    h1Highlight: 'UCO collection Latvia',
    intro: 'metan.lv (SIA "Ainavas Nams") collects used cooking oil (UCO) from restaurants, hotels, catering chains and food production sites across Latvia. Market rate €0.40–0.55/L or barter offset against grease trap service. Full APUS / PVD documentation, EWC 19 08 09.',
    contactLine: 'Direct contact: +371 27 727 724 · info@metan.lv · Base: Bēne, Dobele region · Service area: all of Latvia (200 km from Bēne), Lithuania by agreement',
    ctaCall: 'Schedule UCO pickup',
    ctaForm: 'Get a quote',
    benefitsTitle: 'Why choose metan.lv for UCO collection',
    benefits: [
      'Market rate €0.40–0.55 per liter — transparent, no hidden fees',
      'Barter option: UCO offsets grease trap service cost (up to 100%)',
      'Certified disposal / processing route into biofuel',
      'Full APUS data entry on the client’s behalf',
      'EWC 19 08 09 classification + PVD-ready documentation',
      'Scheduled pickup — no emergency calls',
      'Containers and logistics on us',
      'Bundled service: UCO + grease trap + FOG under one contract',
    ],
    howTitle: 'How UCO collection works',
    howSteps: [
      { title: 'Inquiry', desc: 'Reach out by phone or form. Tell us the venue type and approximate UCO volume per month.' },
      { title: 'Containers', desc: 'We deliver clean containers to your kitchen. Free, no deposit required.' },
      { title: 'Scheduled pickup', desc: 'We agree on a regular pickup (1–4 times per month). Loaders and logistics — on us.' },
      { title: 'Payment / barter', desc: 'We pay market rate per liter OR offset the value against your grease trap service. Full APUS / PVD documentation.' },
    ],
    pricingTitle: 'Pricing and zones',
    pricingNote: 'UCO collection itself has no zone fee — collected oil is purchased at market rate. Zones apply if you bundle UCO collection with grease trap service (12-month contract).',
    zones: [
      { zone: 'Zone 1', range: '0–50 km from Bēne', cities: 'Dobele, Jelgava, Bauska', price: 'from €365' },
      { zone: 'Zone 2', range: '50–100 km', cities: 'Riga, Jūrmala, Tukums', price: 'from €400' },
      { zone: 'Zone 3', range: '100–150 km', cities: 'Liepāja, Ventspils, Cēsis', price: 'from €460' },
      { zone: 'Zone 4', range: '150–200 km', cities: 'Daugavpils, Rēzekne', price: 'from €500' },
    ],
    barterTitle: 'UCO barter model — unique in Latvia',
    barterIntro: 'If you generate 100+ L of UCO per month, that oil can fully cover the cost of grease trap maintenance. The only such model in Latvia.',
    barterPoints: [
      'UCO is accepted at market rate (€0.40–0.55 per liter),',
      'Its value is offset against grease trap and FOG service cost,',
      'A restaurant with 200+ L/month can receive maintenance at no extra cost,',
      'The whole process is fully documented for APUS and PVD.',
    ],
    documentsTitle: 'Documentation',
    documents: [
      'Pickup record with liter count',
      'EWC 19 08 09 — used oil and fat mixture (waste classification)',
      'APUS data entry (Latvian waste transport registry) on your behalf',
      'Certified disposal route — biodiesel / biogas processing',
      'PVD-inspection-ready document pack',
    ],
    ctaTitle: 'Schedule UCO collection today',
    ctaDesc: 'Get in touch — first meeting and audit are free. We calculate your UCO output and recommend the best model: market rate or barter.',
    ctaReply: 'Reply within 24 hours',
    ctaFreeAssessment: 'Free audit and proposal',
    ctaNoObligation: 'No upfront commitments',
  },
  lt: {
    badge: 'B2B paslauga visoje Latvijoje',
    h1: 'Naudoto kepimo aliejaus surinkimas — ',
    h1Highlight: 'UCO Latvijoje',
    intro: 'metan.lv (SIA "Ainavas Nams") surenka naudotą kepimo aliejų (UCO) iš restoranų, viešbučių, maitinimo tinklų ir maisto gamybos objektų visoje Latvijoje. Rinkos kaina 0,40–0,55 €/l arba barteris su riebalų gaudyklės valymu. Pilna APUS / PVD dokumentacija, EWC 19 08 09.',
    contactLine: 'Tiesioginiai kontaktai: +371 27 727 724 · info@metan.lv · Bazė: Bēnė, Dobelės rajonas · Aptarnavimo zona: visa Latvija (200 km nuo Bēnės), Lietuva pagal susitarimą',
    ctaCall: 'Užsakyti UCO paėmimą',
    ctaForm: 'Gauti pasiūlymą',
    benefitsTitle: 'Kodėl rinktis metan.lv UCO surinkimui',
    benefits: [
      'Rinkos kaina 0,40–0,55 € už litrą — skaidru, be paslėptų mokesčių',
      'Barterio galimybė: UCO padengia riebalų gaudyklės paslaugą (iki 100%)',
      'Sertifikuotas utilizavimo / perdirbimo į biokurą maršrutas',
      'Pilna APUS duomenų įvedimas kliento vardu',
      'EWC 19 08 09 klasifikacija + PVD-pasiruošę dokumentai',
      'Planinis paėmimo grafikas — be avarinių skambučių',
      'Konteineriai ir logistika iš mūsų pusės',
      'Apjungta paslauga: UCO + riebalų gaudyklė + FOG vienoje sutartyje',
    ],
    howTitle: 'Kaip vyksta UCO surinkimas',
    howSteps: [
      { title: 'Užklausa', desc: 'Susisiekite telefonu ar per formą. Nurodykite objekto tipą ir apytikslį UCO kiekį per mėnesį.' },
      { title: 'Konteineriai', desc: 'Pristatome švarius konteinerius į jūsų virtuvę. Nemokamai, be užstato.' },
      { title: 'Planinis paėmimas', desc: 'Sutariame reguliarų paėmimą (1–4 kartus per mėnesį). Krovikai ir logistika — mūsų pusėje.' },
      { title: 'Atsiskaitymas / barteris', desc: 'Mokame rinkos kainą už litrą ARBA įskaitome vertę į riebalų gaudyklės paslaugą. Pilna APUS / PVD dokumentacija.' },
    ],
    pricingTitle: 'Kainos ir zonos',
    pricingNote: 'Pati UCO surinkimo paslauga neturi zonos mokesčio — surinktas aliejus superkamas rinkos kaina. Zonos taikomos, kai kartu su UCO užsakote riebalų gaudyklės valymą (12 mėn. sutartis).',
    zones: [
      { zone: '1 zona', range: '0–50 km nuo Bēnės', cities: 'Dobelė, Jelgava, Bauskė', price: 'nuo 365 €' },
      { zone: '2 zona', range: '50–100 km', cities: 'Ryga, Jūrmala, Tukumas', price: 'nuo 400 €' },
      { zone: '3 zona', range: '100–150 km', cities: 'Liepāja, Ventspilis, Cēsis', price: 'nuo 460 €' },
      { zone: '4 zona', range: '150–200 km', cities: 'Daugpilis, Rēzeknė', price: 'nuo 500 €' },
    ],
    barterTitle: 'UCO barterio modelis — unikalus Latvijoje',
    barterIntro: 'Jei generuojate 100+ l UCO per mėnesį, šis aliejus gali visiškai padengti riebalų gaudyklės priežiūros kainą. Vienintelis toks modelis Latvijoje.',
    barterPoints: [
      'UCO priimamas rinkos kaina (0,40–0,55 € už litrą),',
      'Jo vertė įskaitoma į riebalų gaudyklės ir FOG paslaugos kainą,',
      'Restoranas su 200+ l/mėn. gali gauti priežiūrą be papildomo mokėjimo,',
      'Visas procesas pilnai dokumentuojamas APUS ir PVD reikmėms.',
    ],
    documentsTitle: 'Dokumentacija',
    documents: [
      'Surinkimo aktas su litrų fiksavimu',
      'EWC 19 08 09 — naudoto aliejaus ir riebalų mišinys (atliekų klasė)',
      'APUS duomenų įvedimas (Latvijos atliekų transportavimo registras) kliento vardu',
      'Sertifikuotas utilizavimo maršrutas — biodyzelio / biodujų perdirbimas',
      'PVD-pasiruošęs dokumentų paketas',
    ],
    ctaTitle: 'Užsakykite UCO surinkimą šiandien',
    ctaDesc: 'Susisiekite — pirmas susitikimas ir auditas nemokami. Apskaičiuojame jūsų UCO srautą ir rekomenduojame geriausią modelį: rinkos kaina ar barteris.',
    ctaReply: 'Atsakymas per 24 valandas',
    ctaFreeAssessment: 'Nemokamas auditas ir pasiūlymas',
    ctaNoObligation: 'Be išankstinių įsipareigojimų',
  },
};

export default function UcoContent() {
  const { localePath } = useTranslation();
  const rawLocale = localePath('/').split('/')[1] || 'lv';
  const locale: Locale = (['lv', 'ru', 'en', 'lt'].includes(rawLocale) ? rawLocale : 'lv') as Locale;
  const c = CONTENT[locale];
  const faqs = getFAQsForLocale(locale, 'uco');

  useEffect(() => {
    trackPageView('uco_landing', {
      page_section: 'services',
      page_priority: 'high',
      conversion_potential: 'very_high',
      segment: 'uco',
    });
    trackServiceInterest('uco_collection', 'uco_landing');
  }, []);

  const stepIcons = [Phone, Truck, Clock, Euro];
  const ctaItems = [
    { icon: Clock, text: c.ctaReply },
    { icon: Calculator, text: c.ctaFreeAssessment },
    { icon: Shield, text: c.ctaNoObligation },
  ];

  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-metan-light to-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
              {c.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-metan-gray mb-6">
              {c.h1}
              <span className="text-metan-primary">{c.h1Highlight}</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-6 max-w-3xl">
              {c.intro}
            </p>
            <p className="text-base text-gray-700 mb-8 max-w-3xl font-medium">
              {c.contactLine}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-metan-primary hover:bg-metan-accent text-white"
                asChild
              >
                <Link
                  href="#forma"
                  onClick={() => {
                    trackCTA('hero_cta', 'uco_landing', '#forma');
                    pushFormSubmit('uco_inquiry_intent', 'hero_cta', 80);
                    trackFormSubmission('uco_inquiry_intent', { source: 'hero_cta' });
                  }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {c.ctaCall}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="tel:+37127727724"
                  onClick={() => {
                    trackCTA('phone_cta', 'uco_landing', 'tel');
                    trackPhoneCall('+371 27 727 724', 'uco_hero');
                  }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  +371 27 727 724
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-metan-light">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-12 text-center">
            {c.howTitle}
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {c.howSteps.map((item, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center border-green-200">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-metan-primary text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <Icon className="h-8 w-8 text-metan-primary mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-metan-gray mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-12 text-center">
            {c.benefitsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {c.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4"
              >
                <CheckCircle className="h-6 w-6 text-metan-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Barter model */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-white">
        <div className="metan-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Recycle className="h-10 w-10 text-amber-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-metan-gray">{c.barterTitle}</h2>
            </div>
            <p className="text-lg text-gray-700 mb-8">{c.barterIntro}</p>
            <ul className="space-y-3">
              {c.barterPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-metan-primary flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing zones */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4 text-center">
            {c.pricingTitle}
          </h2>
          <p className="text-base text-gray-600 mb-10 max-w-3xl mx-auto text-center">
            {c.pricingNote}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {c.zones.map((z, i) => (
              <Card key={i} className="border-metan-light">
                <CardContent className="p-5">
                  <div className="text-sm font-semibold text-metan-primary mb-1">{z.zone}</div>
                  <div className="text-2xl font-bold text-metan-gray mb-2">{z.price}</div>
                  <div className="text-sm text-gray-600 mb-2">{z.range}</div>
                  <div className="text-sm text-gray-500">{z.cities}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-slate-50">
        <div className="metan-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-10 w-10 text-metan-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-metan-gray">
                {c.documentsTitle}
              </h2>
            </div>
            <ul className="space-y-3">
              {c.documents.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-metan-primary flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA + Form */}
      <section id="forma" className="py-16 bg-gradient-to-br from-metan-light to-green-50">
        <div className="metan-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-6">
                {c.ctaTitle}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {c.ctaDesc}
              </p>
              <div className="space-y-4 mb-8">
                {ctaItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-metan-primary" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
              <PriorityContacts />
            </div>
            <div>
              <SimpleContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
