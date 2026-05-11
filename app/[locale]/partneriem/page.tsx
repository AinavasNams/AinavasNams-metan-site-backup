'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import PartneriemZoneBlock from '@/components/v17/PartneriemZoneBlock';

export default function PartneruLanding() {
  const { t, language, localePath } = useTranslation();

  const faqItems: Record<string, { q: string; a: string }[]> = {
    lv: [
      { q: 'Kādi atkritumu veidi tiek pieņemti?', a: 'Mēs strādājam ar tauku ķērāju saturu (EWC 19 08 09) un pārtikas eļļām un taukiem (EWC 20 01 25). Pieņemam atkritumus no restorāniem, viesnīcām, ēdnīcām, pārtikas ražotnēm, veikaliem un citiem HoReCa objektiem.' },
      { q: 'Kur atrodas jūsu stacija?', a: 'Mūsu biogāzes kogenerācijas stacija atrodas Bēnē, Dobeles novadā (Rūpniecības iela 2D, LV-3711). No šīs bāzes mēs apkalpojam objektus 200 km rādiusā, kas ietver visu Latviju un daļu Lietuvas.' },
      { q: 'Vai strādājat ar Lietuvu?', a: 'Jā. Mēs sniedzam pakalpojumus ne tikai Latvijā, bet arī Lietuvā 200 km zonā no Bēnes. Cenas ir vienādas abās valstīs un tiek noteiktas pēc attāluma (zonas).' },
      { q: 'Kas ir Gate Fee?', a: 'Gate Fee ir cena par atkritumu pieņemšanu uz vietas mūsu stacijā Bēnē. Ja jums ir savs transports, varat piegādāt atkritumus paši un maksāt tikai 7-10€ par tonnu.' },
      { q: 'No kā atkarīga Gate Fee cena (7-10€/t)?', a: 'Gate Fee cena ir atkarīga no enerģētiskās vērtības un ūdens satura. Labākajiem produktiem — 7€/t, vidējiem — 8-9€/t, ar lielu ūdens saturu — 10€/t.' },
      { q: 'Vai pakalpojums atbilst PVD un VVD prasībām?', a: 'Jā. Visi pakalpojumi tiek sniegti atbilstoši PVD un VVD prasībām. Katrs pārvadājums tiek reģistrēts APUS sistēmā.' },
      { q: 'Kas ir iekļauts pakalpojuma cenā?', a: 'Cenā ir iekļauts: atkritumu savākšana, transportēšana, utilizācija, APUS reģistrācija, pilna dokumentācija un regulārs apkalpošanas grafiks.' },
      { q: 'Cik ātri notiek izvešana?', a: 'Regulāriem klientiem — pēc fiksēta grafika. Pēc pieprasījuma — 24-48 stundu laikā darba dienās. Ārkārtas situācijās — operatīvi.' },
      { q: 'Vai sniedzat pakalpojumus ārpus 200 km zonas?', a: 'Jā, bet izmaksas tiek aprēķinātas individuāli. Parasti izdevīgi objektiem ar lieliem apjomiem.' },
      { q: 'Vai piedāvājat UCO kompensāciju?', a: 'Jā. Lietotās cepamo eļļas (UCO) mēs izpērkam. Ekonomija var sasniegt līdz 40% no pakalpojuma cenas.' },
    ],
    ru: [
      { q: 'Какие виды отходов принимаются?', a: 'Мы работаем с содержимым жироуловителей (EWC 19 08 09) и пищевыми маслами и жирами (EWC 20 01 25). Принимаем отходы от ресторанов, гостиниц, столовых, пищевых производств, магазинов и других объектов HoReCa.' },
      { q: 'Где находится ваша станция?', a: 'Наша биогазовая когенерационная станция находится в Бене, Добельский край (Rūpniecības iela 2D, LV-3711). С этой базы мы обслуживаем объекты в радиусе 200 км, включая всю Латвию и часть Литвы.' },
      { q: 'Работаете ли вы с Литвой?', a: 'Да. Мы предоставляем услуги не только в Латвии, но и в Литве в зоне 200 км от Бене. Цены одинаковы в обеих странах и определяются по расстоянию (зонам).' },
      { q: 'Что такое Gate Fee?', a: 'Gate Fee — это цена за приёмку отходов на месте нашей станции в Бене. Если у вас есть свой транспорт, вы можете доставить отходы сами и платить только 7-10€ за тонну.' },
      { q: 'От чего зависит цена Gate Fee (7-10€/т)?', a: 'Цена Gate Fee зависит от энергетической ценности и содержания воды. Лучшие продукты — 7€/т, средние — 8-9€/т, с высоким содержанием воды — 10€/т.' },
      { q: 'Соответствует ли услуга требованиям PVD и VVD?', a: 'Да. Все услуги предоставляются в соответствии с требованиями PVD и VVD. Каждая перевозка регистрируется в системе APUS.' },
      { q: 'Что включено в стоимость услуги?', a: 'В стоимость включены: сбор отходов, транспортировка, утилизация, регистрация APUS, полная документация и регулярный график обслуживания.' },
      { q: 'Как быстро происходит вывоз?', a: 'Для постоянных клиентов — по фиксированному графику. По запросу — в течение 24-48 часов в рабочие дни. В экстренных случаях — оперативно.' },
      { q: 'Предоставляете ли услуги за пределами 200 км?', a: 'Да, но стоимость рассчитывается индивидуально. Обычно выгодно для объектов с большими объёмами.' },
      { q: 'Предлагаете ли компенсацию за UCO?', a: 'Да. Использованные растительные масла (UCO) мы выкупаем. Экономия может достигать до 40% от стоимости услуги.' },
    ],
    lt: [
      { q: 'Kokios atliekos priimamos?', a: 'Mes dirbame su riebalų gaudyklių turiniu (EWC 19 08 09) ir maistiniais aliejais ir riebalais (EWC 20 01 25). Priimame atliekas iš restoranų, viešbučių, valgyklų, maisto gamyklų, parduotuvių ir kitų HoReCa objektų.' },
      { q: 'Kur yra jūsų stotis?', a: 'Mūsų biogazo kogeneracinė stotis yra Bēnėje, Dobeles krašte (Rūpniecības iela 2D, LV-3711). Iš šios bazės aptarnaujame objektus 200 km spinduliu, įskaitant visą Latviją ir dalį Lietuvos.' },
      { q: 'Ar dirbate su Lietuva?', a: 'Taip. Mes teikiame paslaugas ne tik Latvijoje, bet ir Lietuvoje 200 km zonoje nuo Bēnės. Kainos vienodos abiejose šalyse ir nustatomos pagal atstumą (zonas).' },
      { q: 'Kas yra Gate Fee?', a: 'Gate Fee — tai kaina už atliekų priėmimą vietoje mūsų stotyje Bēnėje. Jei turite savo transportą, galite pristatyti atliekas patys ir mokėti tik 7-10€ už toną.' },
      { q: 'Nuo ko priklauso Gate Fee kaina (7-10€/t)?', a: 'Gate Fee kaina priklauso nuo energetinės vertės ir vandens kiekio. Geriausiam produktui — 7€/t, vidutiniam — 8-9€/t, su dideliu vandens kiekiu — 10€/t.' },
      { q: 'Ar paslauga atitinka PVD ir VVD reikalavimus?', a: 'Taip. Visos paslaugos teikiamos pagal PVD ir VVD reikalavimus. Kiekvienas pervežimas registruojamas APUS sistemoje.' },
      { q: 'Kas įtraukta į paslaugos kainą?', a: 'Į kainą įtraukta: atliekų surinkimas, transportavimas, utilizavimas, APUS registracija, visa dokumentacija ir reguliarus aptarnavimo grafikas.' },
      { q: 'Kaip greitai vyksta išvežimas?', a: 'Nuolatiniams klientams — pagal fiksuotą grafiką. Pagal užklausą — per 24-48 valandas darbo dienomis. Avariniais atvejais — operatyviai.' },
      { q: 'Ar teikiate paslaugas už 200 km zonos ribų?', a: 'Taip, bet kaštai skaičiuojami individualiai. Paprastai naudinga objektams su dideliais kiekiais.' },
      { q: 'Ar siūlote UCO kompensaciją?', a: 'Taip. Panaudotus augalinius aliejus (UCO) mes superkame. Ekonomija gali siekti iki 40% paslaugos kainos.' },
    ],
    en: [
      { q: 'What types of waste are accepted?', a: 'We work with grease trap contents (EWC 19 08 09) and food oils and fats (EWC 20 01 25). We accept waste from restaurants, hotels, canteens, food factories, shops and other HoReCa establishments.' },
      { q: 'Where is your station located?', a: 'Our biogas cogeneration station is located in Bēne, Dobele municipality (Rūpniecības iela 2D, LV-3711). From this base we service facilities within a 200 km radius, covering all of Latvia and part of Lithuania.' },
      { q: 'Do you work with Lithuania?', a: 'Yes. We provide services not only in Latvia but also in Lithuania within a 200 km zone from Bēne. Prices are the same in both countries and are determined by distance (zones).' },
      { q: 'What is Gate Fee?', a: 'Gate Fee is the price for waste reception at our station in Bēne. If you have your own transport, you can deliver waste yourself and pay only 7-10€ per ton.' },
      { q: 'What determines the Gate Fee price (7-10€/t)?', a: 'The Gate Fee price depends on energy value and water content. Best products — 7€/t, average — 8-9€/t, high water content — 10€/t.' },
      { q: 'Does the service comply with PVD and VVD requirements?', a: 'Yes. All services comply with PVD and VVD requirements. Every transport is registered in the APUS system.' },
      { q: 'What is included in the service price?', a: 'The price includes: waste collection, transportation, disposal, APUS registration, full documentation and a regular service schedule.' },
      { q: 'How quickly does collection happen?', a: 'For regular clients — on a fixed schedule. On request — within 24-48 hours on business days. In emergencies — promptly.' },
      { q: 'Do you provide services beyond the 200 km zone?', a: 'Yes, but costs are calculated individually. It is usually cost-effective for facilities with large volumes.' },
      { q: 'Do you offer UCO compensation?', a: 'Yes. We buy back used cooking oils (UCO). Savings can reach up to 40% of the service price.' },
    ],
  };

  const currentFaq = faqItems[language] || faqItems.lv;

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white pt-10 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-6 relative z-20 mb-10">
          <Link href={localePath("/")} className="inline-flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-2xl font-extrabold tracking-tighter">metan<span className="text-blue-400">.lv</span></span>
          </Link>
        </div>
        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg">{t('partneriemPage.heroTitle')}</h1>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">{t('partneriemPage.heroSubtitle')}</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 border border-white/20"><span>📍 <strong>{t('partneriemPage.heroBadgeBase')}</strong> {t('partneriemPage.heroBadgeBaseLoc')}</span></span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 border border-white/20"><span>📏 <strong>{t('partneriemPage.heroBadgeZone')}</strong> {t('partneriemPage.heroBadgeZoneVal')}</span></span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 border border-white/20"><span>{t('partneriemPage.heroBadgeCountries')}</span></span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#zona-karte" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-bold text-white transition-all shadow-2xl transform hover:scale-105">📊 {t('partneriemPage.heroCtaCalc')}</a>
            <a href="tel:+37127727724" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white transition-all border border-white/30">📞 {t('partneriemPage.heroCtaCall')} +371 27727724</a>
          </div>
          <p className="text-xs text-gray-400 mt-6">{t('partneriemPage.heroCompliance')}</p>
        </div>
      </section>

      <section className="py-16 -mt-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-green-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"><span className="text-3xl">💰</span></div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{t('partneriemPage.gateFeeTitle')}</h2>
                  <p className="text-lg text-gray-700">{t('partneriemPage.gateFeeSubtitle')}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><span className="text-2xl">💰</span></div>
                    <div>
                      <p className="text-sm text-gray-600">{t('partneriemPage.gateFeePrice')}</p>
                      <p className="text-3xl font-black text-green-600">{t('partneriemPage.gateFeePriceVal')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{t('partneriemPage.gateFeeNote')}</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-2xl">📍</span></div>
                    <div>
                      <p className="text-sm text-gray-600">{t('partneriemPage.gateFeeLocation')}</p>
                      <p className="text-xl font-bold text-gray-900">{t('partneriemPage.gateFeeLocationVal')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{t('partneriemPage.gateFeeAddress')}<br />{t('partneriemPage.gateFeeHours')}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3"><span className="text-2xl">✅</span><div><p className="font-semibold text-gray-900">{t('partneriemPage.gateFeeEwc')}</p><p className="text-sm text-gray-600">{t('partneriemPage.gateFeeEwcDesc')}</p></div></div>
                <div className="flex items-start gap-3"><span className="text-2xl">✅</span><div><p className="font-semibold text-gray-900">{t('partneriemPage.gateFeeDocs')}</p><p className="text-sm text-gray-600">{t('partneriemPage.gateFeeDocsDesc')}</p></div></div>
                <div className="flex items-start gap-3"><span className="text-2xl">✅</span><div><p className="font-semibold text-gray-900">{t('partneriemPage.gateFeeApus')}</p><p className="text-sm text-gray-600">{t('partneriemPage.gateFeeApusDesc')}</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" id="zona-karte"><div className="container mx-auto px-6"><PartneriemZoneBlock /></div></section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" id="faq">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">{t('partneriemPage.faqTitle')}</h2>
          <p className="text-gray-600 text-center mb-12">{t('partneriemPage.faqSubtitle')}</p>
          <div className="space-y-3">
            {currentFaq.map((f, idx) => (
              <details key={idx} className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all shadow-md">
                <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-lg text-gray-900">
                  <span className="pr-4">{f.q}</span>
                  <span className="text-blue-600 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed pl-1">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">{t('partneriemPage.faqMore')}</p>
            <a href="tel:+37127727724" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg">📞 {t('partneriemPage.faqCall')} +371 27727724</a>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div><div className="text-white font-bold text-2xl mb-4">metan<span className="text-blue-400">.lv</span></div><p className="text-sm text-gray-400 leading-relaxed">{t('partneriemPage.footerDesc')}</p></div>
            <div><h3 className="text-white font-bold mb-4">{t('partneriemPage.footerContacts')}</h3><ul className="space-y-2 text-sm"><li><a href="tel:+37127727724" className="hover:text-white transition flex items-center gap-2">📞 +371 27727724</a></li><li><a href="mailto:info@metan.lv" className="hover:text-white transition flex items-center gap-2">✉️ info@metan.lv</a></li></ul></div>
            <div><h3 className="text-white font-bold mb-4">{t('partneriemPage.footerAddress')}</h3><p className="text-sm text-gray-400">SIA &quot;Ainavas Nams&quot;<br />Reģ. Nr. 40203328328<br />Rūpniecības iela 2D<br />Bēne, Dobeles novads, LV-3711</p></div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">{t('partneriemPage.footerCopy')}</div>
        </div>
      </footer>
    </main>
  );
}
