'use client'

import { useEffect } from 'react'
import { Metadata } from 'next'
import { CheckCircle, Phone, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { trackThankYouPageView } from '@/lib/gtm-events'
import { trackLeadGeneration } from '@/lib/ga4-events'

export default function ThankYouPage() {
  useEffect(() => {
    // Отслеживаем конверсию на странице благодарности
    trackThankYouPageView('contact_form', 'website');
    trackLeadGeneration('contact_form', 50, 'website');
    
    console.log('📊 Thank you page conversion tracked');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50" data-macaly="thank-you-page">
      <div className="metan-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4" data-macaly="success-title">
              Paldies par jūsu pieprasījumu! 🎉
            </h1>
            
            <p className="text-xl text-gray-600 mb-8" data-macaly="success-message">
              Jūsu pieprasījums ir veiksmīgi nosūtīts un saņemts. Mūsu speciālisti sazināsies ar jums <strong>24 stundu laikā</strong>.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ko darīsim tālāk?</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pieprasījuma apstrāde</h3>
                  <p className="text-gray-600">Mūsu speciālisti izskatīs jūsu pieprasījumu un sagatavos individuālu piedāvājumu.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Personalizēta konsultācija</h3>
                  <p className="text-gray-600">Sazināsimies ar jums, lai pārrunātu jūsu vajadzības un iespējamos risinājumus.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Piedāvājuma prezentācija</h3>
                  <p className="text-gray-600">Prezentēsim detalizētu piedāvājumu ar cenām un pakalpojumu apjomu.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-green-600 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Nepieciešama tūlītēja palīdzība?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <div>
                  <div className="font-medium">Zvaniet tūlīt</div>
                  <div className="text-green-100">+371 27727724</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <div>
                  <div className="font-medium">Rakstiet e-pastu</div>
                  <div className="text-green-100">tsv@metan.lv</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Atgriezties uz sākumu
              </Button>
            </Link>
            
            <Link href="/pakalpojumi">
              <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                Apskatīt pakalpojumus <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          {/* Additional Note */}
          <p className="text-sm text-gray-500 mt-8">
            Ja neesat saņēmis atbildi 24 stundu laikā, lūdzu, pārbaudiet spam/nevēlamo e-pastu mapi vai zvaniet tieši.
          </p>
        </div>
      </div>
    </div>
  )
}