'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calculator, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SERVICE_PRICES = {
  tauku_atdalitaju_tirisana: { 
    name: 'Tauku atdalītāju tīrīšana', 
    basePrice: 300, // EUR за выезд (поднято с 220)
    requiresTransport: true,
    hasWashing: false 
  },
  ellas_savaksana: { 
    name: 'Eļļas un tauku savākšana', 
    basePrice: 0.4, // EUR за кг
    requiresTransport: false,
    hasWashing: false,
    isSpecialPricing: true 
  },
  kanalizacijas_skalosana: { 
    name: 'Augstspiediena kanalizācijas skalošana', 
    basePrice: 300, // EUR за выезд (поднято с 220)
    washingPrice: 100, // EUR за час промывки
    requiresTransport: true,
    hasWashing: true 
  },
  complex_service: { 
    name: 'Komplekss pakalpojums', 
    basePrice: 300, // EUR за выезд (поднято с 220)
    washingPrice: 100, // EUR за час промывки
    requiresTransport: true,
    hasWashing: true 
  }
};

const TRANSPORT_RATE = 1.3; // EUR за километр в обе стороны (поднято с 1.1)

export default function FastCalculator() {
  const [step, setStep] = useState(1);
  const [calculation, setCalculation] = useState({
    service: '',
    businessType: '',
    frequency: '',
    volume: '',
    result: null as any
  });

  const services = [
    { value: 'tauku-savaksana', label: 'Tauku un eļļas savākšana', basePrice: 0.4, isSpecial: true },
    { value: 'atdalitaju-tirisana', label: 'Tauku atdalītāju tīrīšana', basePrice: 300, isSpecial: false },
    { value: 'augstspiediena-skalosana', label: 'Augstspiediena skalošana', basePrice: 400, isSpecial: false, hasWashing: true }, // 300 + 100 промывка
    { value: 'komplekss', label: 'Komplekss pakalpojums', basePrice: 400, isSpecial: false, hasWashing: true } // 300 + 100 промывка
  ];

  const businessTypes = [
    { value: 'restaurant', label: 'Restorāns/kafejnīca', multiplier: 1.0, discount: 0.03 },
    { value: 'hotel', label: 'Viesnīca', multiplier: 1.0, discount: 0.05 },
    { value: 'production', label: 'Pārtikas ražotājs', multiplier: 1.0, discount: 0.08 },
    { value: 'canteen', label: 'Ēdināšanas uzņēmums', multiplier: 1.0, discount: 0.03 },
    { value: 'other', label: 'Cits', multiplier: 1.0, discount: 0.0 }
  ];

  const frequencies = [
    { value: 'weekly', label: 'Reizi nedēļā', multiplier: 4.0, discount: 0.12 },
    { value: 'biweekly', label: 'Reizi 2 nedēļās', multiplier: 2.0, discount: 0.08 },
    { value: 'monthly', label: 'Reizi mēnesī', multiplier: 1.0, discount: 0.05 },
    { value: 'ondemand', label: 'Pēc nepieciešamības', multiplier: 1.0, discount: 0.0 }
  ];

  const calculatePrice = () => {
    const service = services.find(s => s.value === calculation.service);
    const businessType = businessTypes.find(b => b.value === calculation.businessType);
    const frequency = frequencies.find(f => f.value === calculation.frequency);
    
    if (!service || !businessType || !frequency) return null;

    // Специальная обработка для eļļas savākšana
    if (service.isSpecial) {
      return {
        perVisit: 0,
        monthly: 0,
        yearly: 0,
        yearlyDiscount: 0,
        savings: 0,
        isSpecial: true,
        specialMessage: `Cena: ${service.basePrice}€/kg savākto eļļu`
      };
    }

    // Обычная логика для остальных услуг
    let basePrice = service.basePrice;
    
    // Если у услуги есть промывка, она уже включена в basePrice
    // Например: kanalizacijas_skalosana = 300 (выезд) + 100 (промывка) = 400
    
    const tonnage = calculation.volume ? Math.max(1, parseInt(calculation.volume)) : 2;
    const distance = 15; // Средний километраж для быстрого расчета
    const transportCost = 1.3 * distance * 2; // В обе стороны (обновлено до 1.3)
    const tripsNeeded = Math.ceil(tonnage / 10);
    
    const pricePerVisit = (basePrice + transportCost) * tripsNeeded;
    const monthlyPrice = pricePerVisit * frequency.multiplier;
    const discountedPrice = monthlyPrice * (1 - frequency.discount);
    const businessDiscountedPrice = discountedPrice * (1 - businessType.discount);
    const yearlyPrice = businessDiscountedPrice * 12;
    const yearlyDiscount = yearlyPrice * 0.80; // 20% скидка при годовом контракте
    
    return {
      perVisit: Math.round(pricePerVisit),
      monthly: Math.round(businessDiscountedPrice),
      yearly: Math.round(yearlyPrice),
      yearlyDiscount: Math.round(yearlyDiscount),
      savings: Math.round(yearlyPrice - yearlyDiscount),
      isSpecial: false
    };
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      const result = calculatePrice();
      setCalculation({...calculation, result});
      setStep(5);
      
      // GTM tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'fast_calculator_complete', {
          'event_category': 'microconversion',
          'event_label': 'calculator_30_seconds',
          'value': 35,
          'currency': 'EUR'
        });
      }
      
      console.log('Fast calculator conversion tracked:', result);
    }
  };

  const handleContactRequest = () => {
    // GTM tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'calculator_contact_request', {
        'event_category': 'conversion',
        'event_label': 'calculator_to_contact',
        'value': 60,
        'currency': 'EUR'
      });
    }
    
    console.log('Calculator contact request conversion tracked');
    window.location.href = '/kontakti';
  };

  const resetCalculator = () => {
    setStep(1);
    setCalculation({
      service: '',
      businessType: '',
      frequency: '',
      volume: '',
      result: null
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Calculator className="h-8 w-8 text-metan-primary" />
          <Clock className="h-6 w-6 text-metan-accent" />
        </div>
        <h2 className="text-2xl font-bold text-metan-gray mb-2">
          Ātrs aprēķins - 30 sekundes
        </h2>
        <p className="text-gray-600">
          Uzziniet pakalpojuma izmaksas bez saistībām
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{step}/5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-metan-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Izvēlieties pakalpojumu</h3>
            <Select value={calculation.service} onValueChange={(value) => setCalculation({...calculation, service: value})}>
              <SelectTrigger className="h-12 bg-white text-gray-900 border-gray-300">
                <SelectValue placeholder="Kāds pakalpojums jums nepieciešams?" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border-gray-300">
                {services.map((service) => (
                  <SelectItem key={service.value} value={service.value} className="bg-white text-gray-900 hover:bg-green-50 hover:text-green-800">
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Jūsu uzņēmuma veids</h3>
            <Select value={calculation.businessType} onValueChange={(value) => setCalculation({...calculation, businessType: value})}>
              <SelectTrigger className="h-12 bg-white text-gray-900 border-gray-300">
                <SelectValue placeholder="Izvēlieties uzņēmuma veidu" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border-gray-300">
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="bg-white text-gray-900 hover:bg-green-50 hover:text-green-800">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Pakalpojuma biežums</h3>
            <Select value={calculation.frequency} onValueChange={(value) => setCalculation({...calculation, frequency: value})}>
              <SelectTrigger className="h-12 bg-white text-gray-900 border-gray-300">
                <SelectValue placeholder="Cik bieži nepieciešams pakalpojums?" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border-gray-300">
                {frequencies.map((freq) => (
                  <SelectItem key={freq.value} value={freq.value} className="bg-white text-gray-900 hover:bg-green-50 hover:text-green-800">
                    {freq.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Aptuvenais apjoms</h3>
            <Input
              type="number"
              placeholder="Apjoms tonnās (ja zināms)"
              value={calculation.volume}
              onChange={(e) => setCalculation({...calculation, volume: e.target.value})}
              className="h-12"
            />
            <p className="text-sm text-gray-500">
              Atstājiet tukšu, ja nezināt precīzu apjomu. Noklusējuma: 2 tonnas
            </p>
          </div>
        )}

        {step === 5 && calculation.result && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-metan-gray mb-2">Jūsu aprēķins</h3>
              <p className="text-gray-600">Aptuvenas izmaksas bāzotas uz norādītajiem parametriem</p>
            </div>

            {calculation.result.isSpecial ? (
              /* Специальное отображение для eļļas savākšana */
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-2">🛢️ Eļļas un tauku savākšana</h4>
                  <p className="text-yellow-700 mb-4">{calculation.result.specialMessage}</p>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      Precīzu cenu saņemsiet pēc objekta apsekošanas
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Обычное отображение */
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {(() => {
                        const freq = calculation.frequency;
                        if (freq === 'monthly') return 'Mēnesī (1 reizi)';
                        if (freq === 'weekly') return 'Mēnesī (4 reizes)';
                        if (freq === 'bi_weekly') return 'Mēnesī (2 reizes)';
                        if (freq === 'quarterly') return 'Ceturksnī (1 reizi)';
                        if (freq === 'bi_annual') return 'Pusgadā (1 reizi)';
                        if (freq === 'annual') return 'Gadā (1 reizi)';
                        return 'Mēnesī';
                      })()}
                    </h4>
                    <p className="text-2xl font-bold text-metan-primary">
                      €{(() => {
                        const freq = calculation.frequency;
                        if (freq === 'quarterly') return Math.round(calculation.result.monthly * 3);
                        if (freq === 'bi_annual') return Math.round(calculation.result.monthly * 6);
                        if (freq === 'annual') return Math.round(calculation.result.monthly * 12);
                        return calculation.result.monthly;
                      })()}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {(() => {
                        const freq = calculation.frequency;
                        if (freq === 'quarterly') return 'Ceturksnī (1 reizi)';
                        if (freq === 'bi_annual') return 'Pusgadā (1 reizi)';
                        if (freq === 'annual') return 'Gadā (1 reizi)';
                        return 'Mēnesī';
                      })()}
                    </h4>
                    <p className="text-2xl font-bold text-metan-primary">
                      €{(() => {
                        const freq = calculation.frequency;
                        if (freq === 'quarterly') return Math.round(calculation.result.monthly * 3);
                        if (freq === 'bi_annual') return Math.round(calculation.result.monthly * 6);
                        if (freq === 'annual') return Math.round(calculation.result.monthly * 12);
                        return calculation.result.monthly;
                      })()}
                    </p>
                  </div>
                </div>

                <div className="bg-metan-light rounded-lg p-4">
                  {/* Детальная разбивка месячной цены */}
                  <div className="bg-green-50 p-3 rounded-lg mb-3">
                    <p className="text-xs text-green-700 mb-1">
                      📊 Mēneša izmaksu detalizācija:
                    </p>
                    <p className="text-xs text-green-700">
                      {(() => {
                        const freq = calculation.frequency;
                        const frequency = frequencies.find(f => f.value === freq);
                        const multiplier = frequency?.multiplier || 1;
                        
                        const pricePerTrip = Math.round(calculation.result.monthly / multiplier);
                        const tripsText = multiplier === 1 ? '1 izbrauciens' : `${multiplier} izbraucieni`;
                        return `${pricePerTrip}€ par izbraucienu × ${tripsText} = ${calculation.result.monthly}€ mēnesī`;
                      })()}
                    </p>
                  </div>
                  
                  {/* Годовая цена - показываем по-разному в зависимости от частоты */}
                  {(() => {
                    const freq = calculation.frequency;
                    const frequency = frequencies.find(f => f.value === freq);
                    const multiplier = frequency?.multiplier || 1;
                    
                    // Для частых услуг (weekly, bi_weekly) показываем годовую цену менее заметно
                    if (multiplier >= 2) {
                      return (
                        <div className="text-center border-t border-gray-200 pt-2 mb-2">
                          <p className="text-xs text-gray-500">
                            Gada izmaksas: {calculation.result.yearly}€
                          </p>
                          <p className="text-xs text-gray-500">
                            Ar gada līgumu: {calculation.result.yearlyDiscount}€
                          </p>
                        </div>
                      );
                    } else {
                      // Для редких услуг показываем годовую цену нормально
                      return (
                        <>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-900">Gada izmaksas:</span>
                            <span className="text-lg line-through text-gray-500">€{calculation.result.yearly}</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-metan-primary">Ar gada līgumu:</span>
                            <span className="text-2xl font-bold text-metan-primary">€{calculation.result.yearlyDiscount}</span>
                          </div>
                          {/* Пояснение для годовых расходов - только для редких услуг */}
                          <div className="bg-blue-50 p-2 rounded-lg mb-2">
                            <p className="text-xs text-blue-700 mb-1">
                              💡 Gada izmaksas aprēķins:
                            </p>
                            <p className="text-xs text-blue-700">
                              {(() => {
                                const realPricePerTrip = Math.round(calculation.result.monthly / multiplier);
                                const tripsPerYear = multiplier * 12;
                                
                                return `${realPricePerTrip}€ par izbraucienu × ${tripsPerYear} izbraucieni gadā = ${calculation.result.yearly}€`;
                              })()}
                            </p>
                          </div>
                        </>
                      );
                    }
                  })()}
                  
                  {calculation.result.savings > 0 && (
                    <div className="text-center">
                      <span className="text-sm text-green-600 font-medium">
                        Ietaupījums: €{calculation.result.savings} gadā! 🎉
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleContactRequest}
                className="flex-1 bg-metan-primary hover:bg-metan-primary/90 text-white"
              >
                Pieprasīt precīzu cenu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                Jauns aprēķins
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {step < 5 && (
        <div className="mt-6 flex justify-between">
          <Button
            onClick={() => setStep(Math.max(1, step - 1))}
            variant="outline"
            disabled={step === 1}
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            Atpakaļ
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              (step === 1 && !calculation.service) ||
              (step === 2 && !calculation.businessType) ||
              (step === 3 && !calculation.frequency)
            }
            className="bg-metan-primary hover:bg-metan-primary/90 text-white"
          >
            {step === 4 ? 'Aprēķināt' : 'Tālāk'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}