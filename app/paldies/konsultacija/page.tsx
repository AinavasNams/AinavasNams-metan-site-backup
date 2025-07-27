'use client'

import { useEffect } from 'react'
import { Metadata } from 'next'
import { CheckCircle, Phone, Mail, Calculator, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { trackThankYouPageView } from '@/lib/gtm-events'
import { trackLeadGeneration } from '@/lib/ga4-events'

export default function ConsultationThankYouPage() {
  useEffect(() => {
    // Отслеживаем конверсию консультации
    trackThankYouPageView('consultation_request', 'website');
    trackLeadGeneration('consultation_request', 60, 'website');
    
    // Официальная Google Ads конверсия "Регистрация"
    if (typeof window !== 'undefined') {
      // Используем официальную функцию с правильным send_to ID
      if (window.trackRegistrationConversion) {
        window.trackRegistrationConversion();
      }
      
      // Также отслеживаем как thank you page load
      if (window.trackThankYouPageLoad) {
        window.trackThankYouPageLoad('konsultacija');
      }
      
      console.log('🎯 Official Google Ads Registration conversion tracked on thank you page');
    }
    
    console.log('📊 Consultation conversion tracked');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50" data-macaly="consultation-thank-you">
      <div className="metan-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4" data-macaly="consultation-title">
              Konsultācija pieprasīta! 📞
            </h1>
            
            <p className="text-xl text-gray-600 mb-8" data-macaly="consultation-message">
              Paldies par konsultācijas pieprasījumu! Mūsu atkritumu apsaimniekošanas eksperts sazināsies ar jums <strong>24 stundu laikā</strong>.
            </p>
          </div>

          {/* Consultation Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kas jūs sagaida konsultācijā?</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calculator className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Individuāla izmaksu aprēķināšana</h3>
                  <p className="text-gray-600">Precīzs piedāvājums jūsu uzņēmuma vajadzībām un apjomiem.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Profesionāla konsultācija</h3>
                  <p className="text-gray-600">Ekspertu ieteikumi optimālam atkritumu apsaimniekošanas risinājumam.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Tūlītēja rīcības plāna</h3>
                  <p className="text-gray-600">Konkrēti soļi, kā sākt atkritumu apsaimniekošanu jūsu uzņēmumā.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Urgent Contact */}
          <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nevar gaidīt? Zvaniet tūlīt!</h2>
            <p className="text-blue-100 mb-6">Mūsu speciālisti ir pieejami darba dienās no 8:00 līdz 18:00</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+37127727724" className="flex items-center gap-3 justify-center">
                <Phone className="w-5 h-5" />
                <span className="font-medium text-lg">+371 27727724</span>
              </a>
              
              <a href="mailto:tsv@metan.lv" className="flex items-center gap-3 justify-center">
                <Mail className="w-5 h-5" />
                <span className="font-medium">tsv@metan.lv</span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pakalpojumi/kalkulators">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Calculator className="w-4 h-4 mr-2" />
                Aprēķināt izmaksas
              </Button>
            </Link>
            
            <Link href="/pakalpojumi">
              <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                Apskatīt pakalpojumus
              </Button>
            </Link>
          </div>
          
          {/* Additional Note */}
          <p className="text-sm text-gray-500 mt-8">
            📧 Pārbaudiet arī nevēlamo e-pastu (spam) mapi. Sūtām no tsv@metan.lv domēna.
          </p>
        </div>
      </div>
    </div>
  )
}