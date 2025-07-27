'use client'

import { useEffect } from 'react'
import { CheckCircle, Phone, Mail, Calculator, ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { trackThankYouPageView } from '@/lib/gtm-events'
import { trackLeadGeneration } from '@/lib/ga4-events'

export default function PreciseOfferThankYouPage() {
  useEffect(() => {
    // Отслеживаем конверсию точного предложения
    trackThankYouPageView('precise_offer', 'website');
    trackLeadGeneration('precise_offer', 75, 'website');
    
    console.log('📊 Precise offer conversion tracked - highest value conversion');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50" data-macaly="precise-offer-thank-you">
      <div className="metan-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4" data-macaly="offer-title">
              Precīzs piedāvājums pieprasīts! 🎯
            </h1>
            
            <p className="text-xl text-gray-600 mb-8" data-macaly="offer-message">
              Paldies par detalizēto pieprasījumu! Jūsu kalkulatora dati ir saņemti, un mēs sagatavosim <strong>personalizētu piedāvājumu 24 stundu laikā</strong>.
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ko darīsim ar jūsu aprēķinu?</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calculator className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Analīze jūsu aprēķinam</h3>
                  <p className="text-gray-600">Pārskatīsim jūsu pakalpojuma izvēli, biežumu un gada līguma iespējas optimāla piedāvājuma sagatavošanai.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 font-semibold text-sm">💰</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Individuāla cena ar atlaidēm</h3>
                  <p className="text-gray-600">Sagatavosim precīzu piedāvājumu ar visām iespējamām atlaidēm un gada līguma priekšrocībām.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Grafika plānošana</h3>
                  <p className="text-gray-600">Saskaņosim optimālu pakalpojumu grafiku atbilstoši jūsu vajadzībām un objekta specifikai.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Benefit */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">🎉 Jums ir priekšrocības!</h2>
            <p className="text-blue-700 mb-6">
              Izmantojot mūsu kalkulatoru, jūs jau esat aprēķinājis optimālo risinājumu. 
              Tas nozīmē, ka piedāvājumā būs <strong>precīzas cenas bez pārsteigumiem</strong>.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">✅</div>
                <div className="font-medium text-gray-900">Garantētas cenas</div>
                <div className="text-gray-600">Piedāvājums atbilst aprēķinam</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-medium text-gray-900">Ātrāka apstrāde</div>
                <div className="text-gray-600">Tehniskā analīze jau veikta</div>
              </div>
            </div>
          </div>

          {/* Urgent Contact */}
          <div className="bg-green-600 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Steidzams jautājums par aprēķinu?</h2>
            <p className="text-green-100 mb-6">Zvaniet mūsu tehniskajam servisa vadītājam - atbildēsim tūlīt!</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+37127727724" className="flex items-center gap-3 justify-center bg-green-700 hover:bg-green-800 rounded-lg px-6 py-3 transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-medium text-lg">+371 27727724</span>
              </a>
              
              <a href="mailto:tsv@metan.lv" className="flex items-center gap-3 justify-center bg-green-700 hover:bg-green-800 rounded-lg px-6 py-3 transition-colors">
                <Mail className="w-5 h-5" />
                <span className="font-medium">tsv@metan.lv</span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#calculator">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Calculator className="w-4 h-4 mr-2" />
                Izmantot kalkulatoru vēlreiz
              </Button>
            </Link>
            
            <Link href="/pakalpojumi">
              <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                Apskatīt visus pakalpojumus <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          {/* Additional Note */}
          <p className="text-sm text-gray-500 mt-8">
            📧 Pārbaudiet arī nevēlamo e-pastu (spam) mapi. Sūtām no tsv@metan.lv domēna.<br />
            Ja neesat saņēmis piedāvājumu 24 stundu laikā, zvaniet: +371 27727724
          </p>
        </div>
      </div>
    </div>
  )
}