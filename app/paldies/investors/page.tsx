'use client'

import { useEffect } from 'react'
import { Metadata } from 'next'
import { CheckCircle, TrendingUp, FileText, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { trackThankYouPageView } from '@/lib/gtm-events'
import { trackLeadGeneration } from '@/lib/ga4-events'

export default function InvestorThankYouPage() {
  useEffect(() => {
    // Отслеживаем высокоценную конверсию инвестора
    trackThankYouPageView('investor_interest', 'website');
    trackLeadGeneration('investor_interest', 250, 'website');
    
    // Официальная Google Ads конверсия "Регистрация"
    if (typeof window !== 'undefined') {
      // Используем официальную функцию с правильным send_to ID
      if ((window as any).trackRegistrationConversion) {
        (window as any).trackRegistrationConversion();
      }
      
      // Также отслеживаем как thank you page load
      if ((window as any).trackThankYouPageLoad) {
        (window as any).trackThankYouPageLoad('investors');
      }
      
      console.log('🎯 Official Google Ads Registration conversion tracked (Investors)');
    }
    
    console.log('📊 Investor conversion tracked');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50" data-macaly="investor-thank-you">
      <div className="metan-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-purple-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4" data-macaly="investor-title">
              Investīciju pieprasījums nosūtīts! 💼
            </h1>
            
            <p className="text-xl text-gray-600 mb-8" data-macaly="investor-message">
              Paldies par interesi par investīciju iespējām biometāna un atkritumu apsaimniekošanas sektorā. Mūsu investīciju speciālisti sazināsies ar jums <strong>48 stundu laikā</strong>.
            </p>
          </div>

          {/* Investment Process */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Investīciju sadarbības process</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Detalizēta prezentācija</h3>
                  <p className="text-gray-600">Saņemsiet pilnu biznesa plānu un finansiālos prognozes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">ROI aprēķini</h3>
                  <p className="text-gray-600">Detalizēti atdeves rādītāji un projektu ienesīguma analīze.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Personāla tikšanās</h3>
                  <p className="text-gray-600">Plānojam klātienes prezentāciju un objektu apmeklējumu.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Highlights */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Kāpēc investēt biometāna sektorā?</h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-100">~48.3%</div>
                <div className="text-sm text-purple-100">Plānotā ROI</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-purple-100">26,951</div>
                <div className="text-sm text-purple-100">MWh gadā</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-purple-100">12,000+</div>
                <div className="text-sm text-purple-100">Tonnas atkritumu</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/investoriem">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Investoru informācija
              </Button>
            </Link>
            
            <Link href="/projekti">
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-700 hover:bg-purple-50">
                Apskatīt projektus <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-2xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tieša sazināšanās</h3>
            <div className="text-gray-600">
              <p className="mb-2">📧 <strong>E-pasts:</strong> tsv@metan.lv</p>
              <p>📞 <strong>Tālrunis:</strong> +371 27727724</p>
            </div>
          </div>
          
          {/* Additional Note */}
          <p className="text-sm text-gray-500 mt-6">
            🔒 Visa investoru informācija tiek apstrādāta konfidenciāli saskaņā ar datu aizsardzības prasībām.
          </p>
        </div>
      </div>
    </div>
  )
}