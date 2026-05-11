export const metadata = {
  title: 'Biopolimeru projekts | METAN.LV',
  description: 'Nr. 1.2.1.1/3/25/A/014',
}
export default function BiopolymersPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
          <img src="/logos/eu-flag.png" alt="Eiropas Savienība" className="h-10 sm:h-12 w-auto" />
          <img src="/logos/eraf.png?v=2" alt="ERAF" className="h-10 sm:h-12 w-auto" />
          <img src="/logos/cfla.svg" alt="CFLA" className="h-8 sm:h-10 w-auto" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-snug">
          Bioplastmasas (biopolimēru) izejvielu ražošanas tehnoļoģijas izstrāde no otrreizējām taukvielām un eļļām
        </h1>
        <p className="text-sm text-gray-400 mb-6 sm:mb-8">Nr. 1.2.1.1/3/25/A/014 &nbsp;&middot;&nbsp; Atbildīgais par publicēšanu &mdash; SIA &ldquo;Ainavas Nams&rdquo;</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-5 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Projekta Mērķi</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Projekts izstrādā bioplastmasas izejvielu ražošanas tehnoloģiju no otrreizējām taukvielām un eļļām ar pielietojumu iepakojuma, medicīnas un militārajā sektorā. Tiks veikti rūpnieciski pētījumi un izstrādāts validēts prototips (TRL8), veicinot aprites ekonomiku, CO₂ samazinājumu un bioekonomikas attīstību.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Projekta Detaļas</h2>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-200"><td className="py-2 text-gray-500 font-medium pr-4">Projekta Nr.:</td><td className="py-2 text-gray-900 font-semibold">1.2.1.1/3/25/A/014</td></tr>
                <tr className="border-b border-gray-200"><td className="py-2 text-gray-500 font-medium pr-4">Kopējais budžets:</td><td className="py-2 text-gray-900 font-semibold">288 590,00 EUR</td></tr>
                <tr className="border-b border-gray-200"><td className="py-2 text-gray-500 font-medium pr-4">ES finansējums:</td><td className="py-2 text-gray-900 font-semibold">187 601,86 EUR</td></tr>
                <tr className="border-b border-gray-200"><td className="py-2 text-gray-500 font-medium pr-4">Ilgums:</td><td className="py-2 text-gray-900">09/2025 – 08/2027</td></tr>
                <tr><td className="py-2 text-gray-500 font-medium pr-4">Atbildīgais:</td><td className="py-2 text-gray-900">SIA &ldquo;Ainavas Nams&rdquo;</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-xl px-4 sm:px-6 py-4 mb-10 text-sm text-gray-700 leading-relaxed">
          <p className="mb-1">Projekts tiek īstenots Eiropas Savienības Kohēzijas politikas programmas 2021.–2027. gadam 1.2.1.1. specifiskā atbalsta mērķa &ldquo;Atbalsts zinātnei un pētniecībai&rdquo; ietvaros.</p>
          <p>Projekts tiek īstenots ar CFLA (Centrālā finanšu un līgumu aģentūra) atbalstu.</p>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Informātīvais Plakāts</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-6 bg-gray-50 p-4 sm:p-8 text-center">
          <p className="text-gray-600 mb-4">Informātīvais plakāts ir pieejams lejupielādei:</p>
          <a
            href="/cfla-poster.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-colors text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Lejupielādēt plakātu (PDF)
          </a>
          <p className="text-xs text-gray-400 mt-3">Bioplastmasas (biopolimēru) izejvielu ražošanas tehnoloģijas izstrāde &mdash; ERAF projekts Nr. 1.2.1.1/3/25/A/014</p>
        </div>
      </div>
    </main>
  )
}
