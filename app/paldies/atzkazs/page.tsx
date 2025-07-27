'use client'

import { useEffect } from 'react'
import { Metadata } from 'next'
import { CheckCircle, Truck, Clock, Phone, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { trackThankYouPageView } from '@/lib/gtm-events'
import { trackLeadGeneration } from '@/lib/ga4-events'

export default function QuickOrderThankYouPage() {
  useEffect(() => {
    // Отслеживаем конверсию быстрого заказа
    trackThankYouPageView('quick_order', 'website');
    trackLeadGeneration('quick_order', 70, 'website');
    
    console.log('📊 Quick order conversion tracked');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50" data-macaly="quick-order-thank-you">
      <div className="metan-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-orange-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4" data-macaly="quick-order-title">
              Ātrs pasūtījums nosūtīts! 🚚
            </h1>
            
            <p className="text-xl text-gray-600 mb-8" data-macaly="quick-order-message">
              Paldies par ātro pasūtījumu! Mūsu operators sazināsies ar jums <strong>2 stundu laikā</strong> darbdienās, lai apstiprinatu detaļas un ierunu pakalpojuma laiku.
            </p>
          </div>

          {/* Quick Response Promise */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mūsu ātras reaģēšanas solījums</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ātrs zvans 2 stundu laikā</h3>
                  <p className="text-gray-600">Darbdienās 8:00-18:00 laikā sazināsimies ar jums maksimāli ātri.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Truck className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pakalpojuma organizēšana</h3>
                  <p className="text-gray-600">Vienošanās par laiku, adresi un specifiskajām vajadzībām.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Operatīva izpilde</h3>
                  <p className="text-gray-600">Pakalpojumu nodrošinām saskaņā ar vienoto grafiku.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-600 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">🚨 Ārkārtas situācija?</h2>
            <p className="text-red-100 mb-6">Ja jums ir nepieciešama tūlītēja palīdzība vai ārkārtas pakalpojums</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+37127727724" className="flex items-center gap-3 justify-center bg-red-700 hover:bg-red-800 transition-colors rounded-lg px-6 py-3">
                <Phone className="w-5 h-5" />
                <span className="font-medium text-lg">Zvanīt TŪLĪT</span>
              </a>
            </div>
          </div>

          {/* Standard Contact */}
          <div className="bg-orange-600 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Parastā sazināšanās</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <div>
                  <div className="font-medium">Tālrunis</div>
                  <div className="text-orange-100">+371 27727724</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <div>
                  <div className="font-medium">E-pasts</div>
                  <div className="text-orange-100">tsv@metan.lv</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pakalpojumi">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                <Truck className="w-4 h-4 mr-2" />
                Citi pakalpojumi
              </Button>
            </Link>
            
            <Link href="/pakalpojumi/kalkulators">
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-700 hover:bg-orange-50">
                Aprēķināt izmaksas
              </Button>
            </Link>
          </div>
          
          {/* Service Hours */}
          <div className="bg-gray-50 rounded-2xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Darba laiks</h3>
            <div className="text-gray-600">
              <p className="mb-2">🕐 <strong>Darba dienās:</strong> 8:00 - 18:00</p>
              <p className="mb-2">🕐 <strong>Sestdienās:</strong> 9:00 - 15:00</p>
              <p>🕐 <strong>Svētdienās:</strong> Tikai ārkārtas gadījumos</p>
            </div>
          </div>
          
          {/* Additional Note */}
          <p className="text-sm text-gray-500 mt-6">
            ⏰ Ja neesat saņēmis zvanu 2 stundu laikā darba dienās, lūdzu, zvaniet tieši uz +371 27727724
          </p>
        </div>
      </div>
    </div>
  )
}