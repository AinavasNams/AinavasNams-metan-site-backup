'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

import {
  Calculator,
  Phone,
  ArrowRight,
  Send,
  Loader2
} from 'lucide-react';

import { motion } from 'framer-motion';

// Эти хелперы у тебя уже есть в проекте.
// Они должны пушить события в dataLayer (или GA4 / Ads через GTM)
// Это соответствует политике Google после осени 2025: выстреливаем бизнес-события,
// а не сырые персональные данные.
import {
  trackContact,
  trackFormSubmission,
  trackOrderStart
} from '@/lib/ga4-events';

import AddressAutocomplete from '@/components/AddressAutocomplete';

interface CalculationResult {
  servicePrice: number;
  transportPrice: number;
  totalPrice: number;
  frequency: string;
  serviceName: string;
  tripsPerMonth: number;
  pricePerTrip: number;
  yearlyContract?: {
    monthlyPrice: number;
    yearlyPrice: number;
    savings: number;
  };
}

const services = [
  {
    id: 'grease_trap',
    name: 'Tauku atdalītāju tīrīšana',
    basePrice: 300,
    transportIncluded: false
  },
  {
    id: 'oil_collection',
    name: 'Eļļas un tauku savākšana',
    basePrice: 0.4, // €/kg
    transportIncluded: true,
    isSpecial: true
  },
  {
    id: 'sewer_cleaning',
    name: 'Kanalizācijas augstspiediena skalošana',
    basePrice: 400,
    transportIncluded: false
  },
  {
    id: 'complex_service',
    name: 'Komplekss pakalpojums',
    basePrice: 400,
    transportIncluded: false
  }
];

const frequencies = [
  { id: 'one_time',   name: 'Vienreizējs',            multiplier: 1, discount: 0.0  },
  { id: 'monthly',    name: 'Reizi mēnesī',           multiplier: 1, discount: 0.05 },
  { id: 'bi_weekly',  name: 'Divreiz mēnesī',         multiplier: 2, discount: 0.08 },
  { id: 'weekly',     name: 'Reizi nedēļā',           multiplier: 4, discount: 0.12 }
];

export default function SimpleServiceCalculator() {
  const router = useRouter();

  // выбор услуги и частоты
  const [selectedService, setSelectedService] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');

  // география и логистика
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCoordinates, setCustomerCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);

  // коммерческие условия
  const [yearlyContract, setYearlyContract] = useState(false);

  // результат калькуляции
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);

  // модалка с заявкой
  const [showOfferDialog, setShowOfferDialog] = useState(false);

  // форма в модалке
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    details: '',
    preferredContactTime: ''
  });

  // чекбокс согласия на обработку персональных данных
  const [consentGiven, setConsentGiven] = useState(false);

  // состояние отправки формы
  const [isSubmitting, setIsSubmitting] = useState(false);

  // раскрытие подробного годового расчёта
  const [showFullYearlyBreakdown, setShowFullYearlyBreakdown] = useState(false);

  //
  // 1. Обработка адреса: выбор из подсказок
  //
  const handleAddressSelect = (
    address: string,
    coordinates?: { lat: number; lng: number }
  ) => {
    console.log('🏙️ Selected address:', address, coordinates);
    setCustomerAddress(address);

    if (coordinates) {
      setCustomerCoordinates(coordinates);
      calculateDistanceAutomatically(coordinates);
    } else {
      // нет координат — не можем посчитать, оставим ручной ввод
      setCustomerCoordinates(null);
      setDistance(null);
      setIsCalculatingDistance(false);
    }
  };

  //
  // 2. Обработка адреса: ручной ввод по мере печати
  //
  const handleAddressChange = (
    address: string,
    coordinates?: { lat: number; lng: number }
  ) => {
    console.log('🏠 Address changed:', address, coordinates ? '(coords)' : '(no coords yet)');
    setCustomerAddress(address);

    if (coordinates) {
      setCustomerCoordinates(coordinates);
      calculateDistanceAutomatically(coordinates);
    } else {
      // адрес есть, координат нет
      setCustomerCoordinates(null);
      setDistance(null);
    }
  };

  //
  // 3. Автоматический расчёт расстояния через наш API
  //
  const calculateDistanceAutomatically = async (coords: { lat: number; lng: number }) => {
    if (!coords) return;

    setIsCalculatingDistance(true);
    console.log('🗺️ Calculating distance automatically...');

    try {
      // координаты нашей базы (они должны быть объявлены в .env.*)
      const companyLat = parseFloat(process.env.NEXT_PUBLIC_COMPANY_LAT || '56.48078918457031');
      const companyLng = parseFloat(process.env.NEXT_PUBLIC_COMPANY_LNG || '23.057313919067383');

      const res = await fetch('/api/calculate-distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: `${companyLat},${companyLng}`,
          destination: `${coords.lat},${coords.lng}`
        }),
      });

      const data = await res.json();
      console.log('📊 Distance API (POST) response:', data);

      if (data.status === 'OK' && typeof data.distance === 'number') {
        setDistance(data.distance);
      } else {
        console.warn('⚠️ Distance calc fallback, no numeric distance in response');
        setDistance(null);
      }
    } catch (err) {
      console.error('❌ Error calculating distance:', err);
      setDistance(null);
    } finally {
      setIsCalculatingDistance(false);
    }
  };

  //
  // 4. Расчёт стоимости услуги
  //
  const calculatePrice = () => {
    const service = services.find(s => s.id === selectedService);
    const frequency = frequencies.find(f => f.id === selectedFrequency);
    if (!service || !frequency) return;

    // если это сбор масла/жира, у нас другой сценарий
    if (service.isSpecial) {
      setShowSpecialMessage(true);
      setResult(null);
      return;
    }

    setShowSpecialMessage(false);
    setShowFullYearlyBreakdown(false);

    const distanceKm = distance ?? 15; // если не посчитали расстояние, ставим дефолт 15 км
    const transportCost = service.transportIncluded
      ? 0
      : 1.3 * distanceKm * 2; // €1.3/km обе стороны

    const servicePrice = service.basePrice;

    // Считаем помесячно
    const monthlyServiceCost = servicePrice * frequency.multiplier;
    const monthlyTransportCost = transportCost * frequency.multiplier;

    // Скидка за частоту
    const discountedServiceCost = monthlyServiceCost * (1 - frequency.discount);
    const discountedTransportCost = monthlyTransportCost * (1 - frequency.discount);

    const totalMonthly = discountedServiceCost + discountedTransportCost;

    // Если клиент хочет годовой контракт (20% скидка от всего)
    let yearlyContractData:
      | {
          monthlyPrice: number;
          yearlyPrice: number;
          savings: number;
        }
      | undefined;

    if (yearlyContract) {
      const monthlyWithDiscount = totalMonthly * 0.8; // 20% скидка
      const yearlyTotal = monthlyWithDiscount * 12;
      const yearlyNormalTotal = totalMonthly * 12;
      const savings = yearlyNormalTotal - yearlyTotal;

      yearlyContractData = {
        monthlyPrice: Math.round(monthlyWithDiscount),
        yearlyPrice: Math.round(yearlyTotal),
        savings: Math.round(savings)
      };
    }

    const calcResult: CalculationResult = {
      servicePrice: Math.round(discountedServiceCost),
      transportPrice: Math.round(discountedTransportCost),
      totalPrice: Math.round(totalMonthly),
      frequency: frequency.name,
      serviceName: service.name,
      tripsPerMonth: frequency.multiplier,
      pricePerTrip: Math.round(totalMonthly / frequency.multiplier),
      yearlyContract: yearlyContractData
    };

    setResult(calcResult);

    // Событие для маркетинга: пользователь дошёл до цены
    // Это событие надо использовать в GTM как конверсию типа "calc_complete"
    // и маппить в Google Ads как engagement-based conversion (Q4'25 политика).
    trackOrderStart(
      service.name,
      yearlyContractData ? yearlyContractData.monthlyPrice : Math.round(totalMonthly),
      'calculator'
    );

    console.log('Calculator used:', {
      service: service.name,
      frequency: frequency.name,
      totalMonthly: Math.round(totalMonthly),
      distanceKm
    });
  };

  //
  // 5. Отправка формы после "Pieprasīt precīzu piedāvājumu"
  //
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      alert('Lūdzu apstipriniet, ka piekrītat datu apstrādei.');
      return;
    }

    setIsSubmitting(true);

    try {
      const offerData = {
        // данные из калькулятора
        serviceName: result?.serviceName || services.find(s => s.id === selectedService)?.name,
        frequency: result?.frequency || frequencies.find(f => f.id === selectedFrequency)?.name,
        monthlyPrice: result?.yearlyContract
          ? result.yearlyContract.monthlyPrice
          : result?.totalPrice,
        yearlyContract: yearlyContract,
        distance: distance !== null ? distance.toString() : '15',
        customerAddress: customerAddress || 'Nav norādīta',

        // контактные данные
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        details: formData.details,
        preferredContactTime: formData.preferredContactTime,

        // мета
        requestDate: new Date().toISOString(),
        source: 'website_calculator'
      };

      // Отправляем письмо через наш API-роут
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'precise_offer',
          data: offerData
        })
      });

      if (!response.ok) throw new Error('Failed to send request');

      // Отслеживаем лид: это основная конверсия
      // GA4 / Ads (через GTM): lead_submit
      trackFormSubmission('precise_offer', 'calculator', 120);

      // редирект на страницу "paldies/precizu-piedavajums"
      router.push('/paldies/precizu-piedavajums');
    } catch (err) {
      console.error('Error sending offer request:', err);
      alert('Kļūda nosūtot pieprasījumu. Lūdzu mēģiniet vēlreiz vai zvaniet: +371 27727724');
    } finally {
      setIsSubmitting(false);
    }
  };

  //
  // 6. Автозаполнение и формат номера телефона
  //
  const handlePhoneChange = (value: string) => {
    let clean = value.replace(/[^\d+]/g, '');
    if (!clean.startsWith('+371')) {
      if (clean.startsWith('371')) {
        clean = '+' + clean;
      } else {
        clean = '+371' + clean;
      }
    }
    setFormData({ ...formData, phone: clean });
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!formData.phone || !formData.phone.startsWith('+371')) {
      setFormData({ ...formData, phone: '+371 ' });
      setTimeout(() => {
        input.setSelectionRange(5, 5);
      }, 0);
    }
  };

  return (
    <section
      id="calculator"
      className="py-20 bg-gradient-to-br from-green-50 to-blue-50"
    >
      <div className="metan-container">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pakalpojumu kalkulators
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprēķiniet pakalpojumu izmaksas un saņemiet individuālu piedāvājumu
          </p>
        </motion.div>

        {/* Карточка калькулятора */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white rounded-xl shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center justify-center">
                  <Calculator className="h-6 w-6 text-green-600" />
                  Aprēķiniet izmaksas
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Рейтинг адреса и локации */}
                <div className="space-y-4">
                  <AddressAutocomplete
                    id="customerCity"
                    name="city"
                    label="Pilsēta vai objekta atrašanās vieta"
                    placeholder="Ievadiet pilsētu (piemēram: Rīga, Roja, Vilnius, Kauņa)..."
                    value={customerAddress}
                    onSelect={handleAddressSelect}
                    onChange={handleAddressChange}
                    className="w-full"
                  />

                  {/* Подсказки по адресу */}
                  {customerAddress && !customerCoordinates && !isCalculatingDistance && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-700">
                        💡 <strong>Padoms:</strong> Meklējiet pilsētu nosaukumu jebkurā valodā. Var rakstīt latviski, lietuviski, krieviski vai angliski.
                      </p>
                    </div>
                  )}

                  {/* Успешный автоподсчет дистанции */}
                  {customerAddress && customerCoordinates && !isCalculatingDistance && distance !== null && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-700">
                        ✅ <strong>Pilsēta atrasta!</strong> Attālums aprēķināts automātiski: <strong>{distance} km</strong>
                      </p>
                    </div>
                  )}

                  {/* Поле расстояния (всегда доступно для ручной корректировки) */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Attālums līdz objektam
                      {isCalculatingDistance && (
                        <span className="ml-2 text-xs text-blue-600">
                          <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                          Aprēķina pēc pilsētas...
                        </span>
                      )}
                      {customerCoordinates && distance !== null && !isCalculatingDistance && (
                        <span className="ml-2 text-xs text-green-600">
                          ✅ Aprēķināts pēc pilsētas
                        </span>
                      )}
                    </Label>

                    <div className="relative">
                      <Input
                        type="number"
                        min="1"
                        max="300"
                        className="bg-white border-gray-300 pr-12"
                        value={distance !== null ? distance : ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDistance(val === '' ? null : Number(val));
                        }}
                        disabled={isCalculatingDistance}
                        placeholder={
                          customerAddress
                            ? (customerCoordinates
                                ? 'Aprēķina automātiski...'
                                : 'Meklē pilsētu...')
                            : 'Ievadiet attālumu manuāli'
                        }
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 text-sm">km</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      Transporta maksa: 1.3€/km abos virzienos • Mēs apkalpojam Latviju un Lietuvu
                      {customerAddress && distance !== null && customerCoordinates && (
                        <span className="text-green-600 ml-2">
                          ✅ Attālums līdz {customerAddress}: {distance} km
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Выбор услуги */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Izvēlieties pakalpojumu *
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                      <SelectValue placeholder="Kāds pakalpojums jums nepieciešams?" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {services.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id}
                          className="text-gray-900 hover:bg-green-50"
                        >
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Выбор частоты только после выбора услуги */}
                {selectedService && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Pakalpojuma biežums *
                    </Label>
                    <Select value={selectedFrequency} onValueChange={setSelectedFrequency}>
                      <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                        <SelectValue placeholder="Cik bieži nepieciešams?" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {frequencies.map((freq) => (
                          <SelectItem
                            key={freq.id}
                            value={freq.id}
                            className="text-gray-900 hover:bg-green-50"
                          >
                            {freq.name}
                            {freq.discount > 0 && (
                              <span className="ml-2 text-xs text-green-600">
                                (-{Math.round(freq.discount * 100)}%)
                              </span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Опция годового контракта */}
                {selectedService && selectedFrequency && selectedFrequency !== 'one_time' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="yearly-contract"
                        checked={yearlyContract}
                        onCheckedChange={(checked) =>
                          setYearlyContract(checked === true)
                        }
                        className="border-blue-300"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="yearly-contract"
                          className="text-sm font-medium text-blue-800 cursor-pointer"
                        >
                          🎯 Gada līgums ar 20% atlaidi
                        </Label>
                        <p className="text-xs text-blue-600 mt-1">
                          Noslēdzot līgumu uz gadu, saņemiet 20% atlaidi no visām izmaksām!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Кнопка расчёта */}
                {selectedService && selectedFrequency && (
                  <Button
                    onClick={calculatePrice}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Aprēķināt izmaksas
                  </Button>
                )}

                {/* Сообщение для спец-услуги (жир/eļļa) */}
                {showSpecialMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      🛢️ Eļļas un tauku savākšana
                    </h4>
                    <p className="text-yellow-700 text-sm mb-3">
                      <strong>Cena: 0,40€ par kilogramu</strong> savākto materiālu
                    </p>
                    <p className="text-xs text-yellow-600 mb-4">
                      Precīzu cenu aprēķināsim pēc objekta apsekošanas, jo daudzums var būt atšķirīgs.
                    </p>
                    <Button
                      onClick={() => {
                        setShowOfferDialog(true);
                        trackContact('oil_collection_consult', 'calculator');
                      }}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                      size="sm"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Pieprasīt konsultāciju
                    </Button>
                  </motion.div>
                )}

                {/* Результат расчёта */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-6"
                  >
                    <h4 className="font-semibold text-green-800 mb-4 text-center">
                      📊 Jūsu pakalpojuma izmaksas
                    </h4>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pakalpojums:</span>
                        <span className="font-medium">{result.serviceName}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Biežums:</span>
                        <span className="font-medium">{result.frequency}</span>
                      </div>

                      <div className="border-t border-green-200 pt-3">
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-semibold text-green-800">
                            {result.yearlyContract
                              ? 'Mēneša cena (ar atlaidi):'
                              : 'Kopā mēnesī:'}
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            {result.yearlyContract
                              ? result.yearlyContract.monthlyPrice
                              : result.totalPrice}
                            €
                          </span>
                        </div>

                        {result.yearlyContract && (
                          <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                            <span>Bez gada līguma:</span>
                            <span className="line-through">
                              {result.totalPrice}€/mēn
                            </span>
                          </div>
                        )}

                        {result.tripsPerMonth > 1 && (
                          <div className="mt-2 p-3 bg-green-100 rounded-lg">
                            <p className="text-sm text-green-700 text-center">
                              💡 <strong>Aprēķins:</strong>{' '}
                              {result.yearlyContract
                                ? Math.round(
                                    result.yearlyContract.monthlyPrice /
                                      result.tripsPerMonth
                                  )
                                : result.pricePerTrip}
                              € par izbraukumu × {result.tripsPerMonth} izbraukumi
                              mēnesī ={' '}
                              {result.yearlyContract
                                ? result.yearlyContract.monthlyPrice
                                : result.totalPrice}
                              €
                            </p>
                          </div>
                        )}

                        {result.yearlyContract && (
                          <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2 text-center">
                              🎉 Jūsu ietaupījums ar gada līgumu
                            </h5>

                            <div className="text-center mb-3">
                              <div className="inline-block">
                                <p className="text-sm text-gray-600">
                                  Gada ietaupījums:
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                  -{result.yearlyContract.savings}€
                                </p>
                                <p className="text-xs text-blue-600">
                                  💰 Ekonomija:{' '}
                                  {Math.round(
                                    (result.yearlyContract.savings /
                                      (result.totalPrice * 12)) *
                                      100
                                  )}
                                  % gadā!
                                </p>
                              </div>
                            </div>

                            {!showFullYearlyBreakdown ? (
                              <div className="text-center">
                                <button
                                  onClick={() =>
                                    setShowFullYearlyBreakdown(true)
                                  }
                                  className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
                                >
                                  📊 Skatīt pilnu gada aprēķinu
                                </button>
                              </div>
                            ) : (
                              <div>
                                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                                  <div className="text-center p-2 bg-white rounded">
                                    <p className="text-gray-600">
                                      Bez gada līguma:
                                    </p>
                                    <p className="font-bold text-gray-700">
                                      {result.totalPrice * 12}€
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      gadā
                                    </p>
                                  </div>
                                  <div className="text-center p-2 bg-white rounded">
                                    <p className="text-gray-600">
                                      Ar gada līgumu:
                                    </p>
                                    <p className="font-bold text-blue-600">
                                      {result.yearlyContract.yearlyPrice}€
                                    </p>
                                    <p className="text-xs text-blue-500">
                                      gadā
                                    </p>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <button
                                    onClick={() =>
                                      setShowFullYearlyBreakdown(false)
                                    }
                                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                                  >
                                    Paslēpt detaļas
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setShowOfferDialog(true);
                        trackContact('offer_request', 'calculator');
                      }}
                      className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Pieprasīt precīzu piedāvājumu
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {/* предупреждение снизу */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    💡 Aprēķins ir orientējošs. Precīzu cenu saņemsiet pēc objekta apsekošanas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Модалка получения коммерческого предложения */}
        <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-green-800 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Precīzs piedāvājums
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Lai sagatavotu precīzu piedāvājumu, lūdzu aizpildiet šo formu.
                Mēs sazināsimies 24 stundu laikā.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* краткое резюме расчёта */}
              {result && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <h4 className="text-sm font-semibold text-green-800 mb-2">
                    📊 Jūsu aprēķins:
                  </h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pakalpojums:</span>
                      <span className="font-medium text-gray-800">
                        {result.serviceName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biežums:</span>
                      <span className="font-medium text-gray-800">
                        {result.frequency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mēneša cena:</span>
                      <span className="font-bold text-green-600">
                        {result.yearlyContract
                          ? result.yearlyContract.monthlyPrice
                          : result.totalPrice}
                        €
                      </span>
                    </div>
                    {result.yearlyContract && (
                      <div className="text-xs text-blue-600 mt-1">
                        ✅ Ar gada līguma atlaidi 20%
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* контактные данные */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Vārds *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Jūsu vārds"
                    required
                    className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Telefons *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onFocus={handlePhoneFocus}
                    placeholder="+371 20000000"
                    required
                    className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-pasts *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  required
                  className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Uzņēmums
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="SIA vai AS nosaukums"
                  className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <Label
                  htmlFor="preferred-time"
                  className="text-sm font-medium text-gray-700"
                >
                  Vēlamais zvana laiks
                </Label>
                <Select
                  value={formData.preferredContactTime}
                  onValueChange={(value) =>
                    setFormData({ ...formData, preferredContactTime: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 bg-white text-gray-900 focus:border-green-500">
                    <SelectValue placeholder="Kad jums ērtāk?" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem
                      value="asap"
                      className="text-gray-900 hover:bg-green-50"
                    >
                      Tūlīt pat
                    </SelectItem>
                    <SelectItem
                      value="morning"
                      className="text-gray-900 hover:bg-green-50"
                    >
                      Rītos (8:00-12:00)
                    </SelectItem>
                    <SelectItem
                      value="afternoon"
                      className="text-gray-900 hover:bg-green-50"
                    >
                      Pēcpusdienā (12:00-17:00)
                    </SelectItem>
                    <SelectItem
                      value="evening"
                      className="text-gray-900 hover:bg-green-50"
                    >
                      Vakarā (17:00-20:00)
                    </SelectItem>
                    <SelectItem
                      value="email_only"
                      className="text-gray-900 hover:bg-green-50"
                    >
                      Tikai e-pastā
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="details"
                  className="text-sm font-medium text-gray-700"
                >
                  Papildu informācija
                </Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  placeholder="Pastāstiet par jūsu objektu, specifiskajām prasībām vai jautājumiem..."
                  rows={3}
                  className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* согласие на обработку персональных данных */}
              <div className="flex items-start space-x-2 border border-gray-200 rounded-lg p-3 bg-gray-50">
                <Checkbox
                  id="consent"
                  checked={consentGiven}
                  onCheckedChange={(checked) =>
                    setConsentGiven(checked === true)
                  }
                />
                <Label
                  htmlFor="consent"
                  className="text-xs text-gray-600 leading-relaxed cursor-pointer"
                >
                  Es piekrītu manu datu apstrādei, lai saņemtu komerciālu
                  piedāvājumu un sazinātos par pakalpojumu nosacījumiem.
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !consentGiven}
                className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Nosūta...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Nosūtīt pieprasījumu
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Nosūtot formu, jūs piekrītat saziņai par piedāvājumu.
                Mēs sazināsimies 24h laikā.
              </p>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
