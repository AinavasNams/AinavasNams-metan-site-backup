import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-green-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Lapa nav atrasta
          </h2>
          <p className="text-gray-600 mb-8">
            Atvainojiet, meklētā lapa neeksistē vai ir pārvietota.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Atgriezties uz sākumu
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/pakalpojumi"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Pakalpojumi
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link
              href="/kontakti"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Kontakti
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}