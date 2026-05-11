'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function BiopolymersPage() {
  const { t, localePath } = useTranslation();

  return (
    <main className="flex-grow pt-24 pb-16">
      <div className="metan-container max-w-4xl mx-auto">
        {/* Logos Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          <img
            src="/logos/eu-flag.png?v=2"
            alt="Eiropas Savienības karogs"
            width={120}
            height={80}
            className="h-16 w-auto object-contain"
          />
          <img
            src="/logos/eraf.svg?v=2"
            alt="ERAF logo"
            width={180}
            height={80}
            className="h-16 w-auto object-contain"
          />
          <img
            src="/logos/cfla.svg?v=2"
            alt="CFLA logo"
            width={160}
            height={64}
            className="h-14 w-auto object-contain"
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-metan-blue">
          Projekta Informācija
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-12">
          <div className="mb-8 pb-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bioplastmasas (biopolimēru) izejvielu ražošanas tehnoloģijas izstrāde no otrreizējām taukvielām un eļļām
            </h2>
            <p className="text-gray-600 mt-2">
              Nr.&nbsp;1.2.1.1/3/25/A/014
            </p>
            <p className="text-gray-600 mt-1">
              Atbildīgais par publicēšanu — SIA &ldquo;Ainavas Nams&rdquo;
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Projekta Mērķi</h3>
              <p className="text-gray-700 leading-relaxed">
                Projekts izstrādā bioplastmasas izejvielu ražošanas tehnoloģiju no otrreizējām taukvielām un eļļām ar pielietojumu iepakojuma, medicīnas un militārajā sektorā. Tiks veikti rūpnieciski pētījumi un izstrādāts validēts prototips (TRL8), veicinot aprites ekonomiku, CO₂ samazinājumu un bioekonomikas attīstību.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Projekta Detaļas</h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Projekta Nr.:</span>
                  <span className="font-medium text-gray-900">1.2.1.1/3/25/A/014</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Kopējais budžets:</span>
                  <span className="font-medium text-gray-900">288 590,00 EUR</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">ES finansējums:</span>
                  <span className="font-medium text-gray-900">187 601,86 EUR</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Ilgums:</span>
                  <span className="font-medium text-gray-900">09/2025 – 08/2027</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span className="text-gray-500">Atbildīgais:</span>
                  <span className="font-medium text-gray-900">SIA &ldquo;Ainavas Nams&rdquo;</span>
                </li>
              </ul>
            </div>
          </div>

          {/* EU Cohesion Policy text */}
          <div className="bg-blue-50 border-l-4 border-metan-blue p-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed">
              Projekts tiek īstenots Eiropas Savienības Kohēzijas politikas programmas 2021.–2027.&nbsp;gadam 1.2.1.1. specifiskā atbalsta mērķa &ldquo;Atbalsts zinātnei un pētniecībai&rdquo; ietvaros.
            </p>
            <p className="text-gray-600 mt-2">
              Projekts tiek īstenots ar CFLA (Centrālā finanšu un līgumu aģentūra) atbalstu.
            </p>
          </div>
        </div>

        {/* Poster Section */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Informatīvais Plakāts</h2>
        <div className="w-full bg-gray-100 rounded-xl overflow-hidden shadow-md border border-gray-200">
          <iframe
            src="/cfla-poster.pdf"
            width="100%"
            className="h-[400px] sm:h-[600px] md:h-[800px] w-full"
            style={{ border: 'none' }}
            title="CFLA Projekta Plakāts"
          />
          <div className="p-4 text-center w-full bg-white">
            <p className="text-gray-600 mb-2">Ja plakāts neielādējas, varat to lejupielādēt:</p>
            <a
              href="/cfla-poster.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-metan-blue text-white px-6 py-2 rounded hover:bg-metan-blue/90 transition-colors"
            >
              Lejupielādēt PDF
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
