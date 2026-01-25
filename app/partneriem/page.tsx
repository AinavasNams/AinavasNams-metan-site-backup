import type { Metadata } from 'next';
import Link from 'next/link';

import PartneriemZoneBlock from '@/components/v17/PartneriemZoneBlock';

export const metadata: Metadata = {
  title: 'Profesionāla tauku ķērāju apkope Latvijā | Zonu kalkulators | Metan.lv',
  description:
    'Profesionāla tauku ķērāju apkope (EWC 19 08 09) un pārtikas eļļu un tauku savākšana (EWC 20 01 25) saskaņā ar PVD un VVD prasībām. Katra izvešana tiek reģistrēta APUS sistēmā.',
};

export default function PartneruLanding() {
  // --- Schema.org (LLM-first): Organization + Service + FAQPage ---
  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://metan.lv/#organization',
    name: 'SIA Ainavas Nams',
    legalName: 'SIA Ainavas Nams',
    url: 'https://metan.lv',
    logo: 'https://metan.lv/logo.png',
    telephone: '+37127727724',
    email: 'info@metan.lv',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LV',
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Reģistrācijas Nr.',
      value: '40203328328',
    },
  };

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://metan.lv/partneriem#service',
    name: 'Tauku ķērāju apkope un pārtikas atkritumu apsaimniekošana',
    provider: { '@id': 'https://metan.lv/#organization' },
    areaServed: [
      { '@type': 'Country', name: 'Latvia' },
      { '@type': 'Country', name: 'Lithuania' },
    ],
    description:
      'Profesionāla tauku ķērāju apkope, pārtikas eļļu un tauku savākšana, transportēšana un utilizācija uzņēmumiem HoReCa, noliktavām un pārtikas ražotājiem. Darbs tiek veikts saskaņā ar PVD un VVD prasībām, katrs pārvadājums tiek reģistrēts APUS sistēmā.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Atkritumu apsaimniekošanas pakalpojumi',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tauku ķērāju apkope',
            description: 'Atkritumi ar EWC kodu 19 08 09',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pārtikas eļļu un tauku savākšana',
            description: 'Atkritumi ar EWC kodu 20 01 25',
          },
        },
      ],
    },
  };

  const faqItems = [
    {
      q: 'Kādi atkritumu veidi tiek pieņemti?',
      a: 'Mēs strādājam ar tauku ķērāju saturu un pārtikas eļļām un taukiem. Atkritumi tiek klasificēti saskaņā ar EWC kodiem 19 08 09 un 20 01 25.',
    },
    {
      q: 'Vai pakalpojums atbilst PVD un VVD prasībām?',
      a: 'Jā. Pakalpojums tiek sniegts atbilstoši spēkā esošajām PVD un VVD prasībām. Katrs pārvadājums tiek reģistrēts APUS sistēmā.',
    },
    {
      q: 'Kas ir iekļauts pakalpojuma cenā?',
      a: 'Cenā ir iekļauta atkritumu savākšana, transportēšana, utilizācija vai tālāka pārstrāde, kā arī nepieciešamā dokumentācija.',
    },
    {
      q: 'Vai cena var mainīties?',
      a: 'Kalkulatorā norādītā cena ir informatīva (“no”). Gala cena var tikt precizēta pēc objekta atrašanās vietas, apjoma un pakalpojuma regularitātes izvērtēšanas.',
    },
    {
      q: 'Cik ātri notiek izvešana?',
      a: 'Izvešana tiek veikta saskaņā ar līgumu vai pēc pieprasījuma. Parasti pakalpojums tiek nodrošināts 24–48 stundu laikā darba dienās.',
    },
    {
      q: 'Vai sniedzat pakalpojumus ārpus 200 km rādiusa?',
      a: 'Jā. Ja objekts atrodas ārpus 200 km no mūsu bāzes Bēnē, Dobeles novadā, pakalpojuma izmaksas tiek aprēķinātas individuāli. Aicinām iesniegt pieteikumu, norādot objekta adresi un pakalpojuma apjomu.',
    },
  ];

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://metan.lv/partneriem#faq',
    mainEntity: faqItems.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* HERO */}
      <section className="relative bg-[#111827] text-white pt-10 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 opacity-50" />
        <div className="container mx-auto px-6 relative z-20 mb-10">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-2xl font-extrabold tracking-tighter">
              metan<span className="text-blue-500">.lv</span>
            </span>
          </Link>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* FIX: explicit white for H1 (global h1 base styles were overriding) */}
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 text-white drop-shadow-sm">
              Profesionāla tauku ķērāju apkope un pārtikas atkritumu apsaimniekošana
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Nodrošinām tauku ķērāju apkopi, pārtikas eļļu un tauku savākšanu, transportēšanu un
              utilizāciju uzņēmumiem HoReCa, noliktavām un pārtikas ražotājiem.
              <br />
              <br />
              Darbs tiek veikts saskaņā ar <strong>PVD</strong> un <strong>VVD</strong> prasībām, katrs
              pārvadājums tiek reģistrēts <strong>APUS</strong> sistēmā.
            </p>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                Bāze: <strong className="ml-1">Bēne</strong>
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                Zona: <strong className="ml-1">līdz 200 km</strong>
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                Latvija + pierobeža Lietuvā
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#zona-karte"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Atvērt zonu karti
              </a>
              <a
                href="#pakalpojumi"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
              >
                Pakalpojumi
              </a>
            </div>
          </div>

          {/* Hero right card */}
          <div className="lg:pl-10 relative">
            <div className="bg-white/10 border border-white/15 rounded-2xl p-6 shadow-2xl backdrop-blur">
              <div className="text-sm text-gray-200 mb-2">Ātrs orientieris</div>
              <div className="text-xl font-extrabold text-white mb-3">
                Zonu princips = mazāk jautājumu
              </div>
              <ul className="text-sm text-gray-200 space-y-2">
                <li>• Redzat zonu un cenu uzreiz</li>
                <li>• Ievadiet adresi un apstipriniet precīzu zonu</li>
                <li>• Ārpus 200 km: individuāls aprēķins</li>
              </ul>

              <div className="mt-5">
                <a
                  href="#zona-karte"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white text-gray-900 px-5 py-3 text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Aprēķināt zonu pēc adreses
                </a>
                <div className="mt-3 text-xs text-gray-300">
                  * Kalkulatorā norādītās cenas ir “no”. Gala cena tiek precizēta pēc apjoma un regularitātes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP + CALC (nice) */}
      <section className="py-16 -mt-16 relative z-10" id="zona-karte">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Zonu karte un precīzs piedāvājums</h2>
            <p className="text-gray-600 mt-2">
              Pārbaudiet objektu kartē, ievadiet adresi un uzreiz redziet, kurā zonā tas atrodas.
              Pēc tam iesniedziet pieteikumu, lai saņemtu piedāvājumu.
            </p>
          </div>

          {/* ✅ client-side orchestrator (map <-> form sync, incl. GPS -> map pin) */}
          <PartneriemZoneBlock />
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white" id="pakalpojumi">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Pakalpojumi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-blue-600 font-bold mb-2">EWC 19 08 09</div>
              <h3 className="text-xl font-bold mb-3">Tauku ķērāju apkope</h3>
              <p className="text-gray-700 text-sm">
                Profesionāla tauku ķērāju tīrīšana un apkope atbilstoši objekta specifikai.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-blue-600 font-bold mb-2">EWC 20 01 25</div>
              <h3 className="text-xl font-bold mb-3">Pārtikas eļļu un tauku savākšana</h3>
              <p className="text-gray-700 text-sm">
                Lietoto cepamo eļļu un tauku savākšana ar specializētu taru un maiņas grafiku.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-blue-700 font-bold mb-2">Dokumentācija & atbilstība</div>
              <h3 className="text-xl font-bold mb-3">Dokumentācija un izsekojamība</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                <li>Pakalpojums atbilstoši PVD un VVD prasībām</li>
                <li>Pārvadājumu uzskaite un reģistrācija APUS sistēmā</li>
                <li>Dokumentācija katrai izvešanai</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process + Geography/Pricing text */}
      <section className="py-16 bg-gray-50" id="process">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Pakalpojuma sniegšanas kārtība</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-800">
              <li>Atkritumu savākšana klienta objektā</li>
              <li>Transportēšana ar specializētu transportu</li>
              <li>Reģistrācija APUS sistēmā</li>
              <li>Utilizācija vai tālāka pārstrāde</li>
              <li>Dokumentācijas nodošana klientam</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Apkalpošanas zona un cenu aprēķins</h2>
            <p className="text-gray-800 mb-4">
              Pakalpojumi tiek sniegti <strong>Latvijā un pierobežas reģionos Lietuvā</strong>.
              <br />
              Cena tiek noteikta atkarībā no objekta atrašanās vietas un attāluma līdz mūsu pakalpojuma
              bāzei <strong>Bēnē, Dobeles novadā</strong>, izmantojot zonu principu līdz{' '}
              <strong>200 km rādiusā</strong>.
            </p>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-gray-800">
                Ja objekts atrodas <strong>ārpus 200 km apkalpošanas zonas</strong>, pakalpojuma izmaksas
                tiek <strong>aprēķinātas individuāli pēc pieprasījuma</strong>.
                <br />
                Lūdzu, sazinieties ar mums, izmantojot pieteikuma formu.
              </p>
              <p className="text-xs text-gray-500 mt-3">
                * Pakalpojumiem ārpus 200 km rādiusa cena tiek noteikta individuāli, ņemot vērā attālumu,
                apjomu un pakalpojuma regularitāti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contract */}
      <section className="py-16 bg-white" id="ligums">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Līgums un sadarbības nosacījumi</h2>
          <p className="text-gray-800 leading-relaxed">
            Pakalpojuma sniegšanai tiek noslēgts līgums. Parasti līgums tiek slēgts uz{' '}
            <strong>12 mēnešiem</strong>, lai nodrošinātu nepārtrauktu atbilstību normatīvajām prasībām
            un regulāru atkritumu apsaimniekošanu.
          </p>
        </div>
      </section>

      {/* FAQ (6/6) */}
      <section className="py-16 bg-gray-50" id="faq">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Biežāk uzdotie jautājumi</h2>
          <div className="space-y-4">
            {faqItems.map((f, idx) => (
              <details key={idx} className="group bg-white p-4 rounded-lg border border-gray-200">
                <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                  <span>{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="text-gray-700 mt-2 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer contacts */}
      <footer className="bg-[#111827] text-gray-400 py-12 text-sm border-t border-gray-800" id="kontakti">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-white font-bold text-lg mb-2">SIA “Ainavas Nams”</div>
            <p>Reģ. Nr. 40203328328</p>
            <p>Darba laiks: P.–Pk. 09:00–18:00</p>
          </div>
          <div className="text-center md:text-right">
            <a
              href="tel:+37127727724"
              className="text-white hover:underline font-bold block text-lg mb-1"
            >
              📞 +371 27727724
            </a>
            <a href="mailto:info@metan.lv" className="hover:text-white transition">
              ✉️ info@metan.lv
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
