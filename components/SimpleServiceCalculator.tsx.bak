'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calculator, Phone, ArrowRight, Send, CheckCircle, MapPin, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackContact, trackFormSubmission, trackOrderStart } from '@/lib/ga4-events';
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
    basePrice: 0.4, // EUR per kg
    transportIncluded: true,
    isSpecial: true
  },
  {
    id: 'sewer_cleaning',
    name: 'Kanalizācijas augstspiediena skalošana',
    basePrice: 400, // 300 + 100 washing
    transportIncluded: false
  },
  {
    id: 'complex_service',
    name: 'Komplekss pakalpojums',
    basePrice: 400, // 300 + 100 washing
    transportIncluded: false
  }
];

const frequencies = [
  { id: 'one_time', name: 'Vienreizējs', multiplier: 1, discount: 0 },
  { id: 'monthly', name: 'Reizi mēnesī', multiplier: 1, discount: 0.05 },
  { id: 'bi_weekly', name: 'Divreiz mēnesī', multiplier: 2, discount: 0.08 },
  { id: 'weekly', name: 'Reizi nedēļā', multiplier: 4, discount: 0.12 }
];

export default function SimpleServiceCalculator() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [distance, setDistance] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCoordinates, setCustomerCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [yearlyContract, setYearlyContract] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    details: '',
    preferredContactTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullYearlyBreakdown, setShowFullYearlyBreakdown] = useState(false);

  const handleAddressChange = (address: string, coordinates?: { lat: number; lng: number }) => {
    console.log(`🏠 Address changed: "${address}"`, coordinates ? 'with coordinates' : 'without coordinates');
    
    setCustomerAddress(address);
    
    // Очищаем расстояние при изменении адреса
    if (!coordinates) {
      setDistance('');
      setCustomerCoordinates(null);
      console.log('🔄 Cleared distance - waiting for coordinates');
    } else {
      setCustomerCoordinates(coordinates);
      calculateDistanceAutomatically(coordinates);
    }
  };

  const calculatePrice = () => {
    const service = services.find(s => s.id === selectedService);
    const frequency = frequencies.find(f => f.id === selectedFrequency);
    
    if (!service || !frequency) return;

    // Special handling for oil collection
    if (service.isSpecial) {
      setShowSpecialMessage(true);
      setResult(null);
      return;
    }

    // Reset special message
    setShowSpecialMessage(false);
    
    // Reset yearly breakdown view
    setShowFullYearlyBreakdown(false);

    // Calculate transport cost
    const distanceNum = distance ? parseInt(distance) : 15; // Default 15km
    const transportCost = service.transportIncluded ? 0 : (1.3 * distanceNum * 2); // 1.3€/km both ways
    
    // Base service cost
    const servicePrice = service.basePrice;
    
    // Monthly cost with frequency
    const monthlyServiceCost = servicePrice * frequency.multiplier;
    const monthlyTransportCost = transportCost * frequency.multiplier;
    
    // Apply frequency discount
    const discountedServiceCost = monthlyServiceCost * (1 - frequency.discount);
    const discountedTransportCost = monthlyTransportCost * (1 - frequency.discount);
    
    const totalMonthly = discountedServiceCost + discountedTransportCost;

    // Calculate yearly contract pricing
    let yearlyContractData: { monthlyPrice: number; yearlyPrice: number; savings: number; } | undefined = undefined;
    if (yearlyContract) {
      const monthlyWithYearlyDiscount = totalMonthly * 0.8; // 20% discount
      const yearlyTotal = monthlyWithYearlyDiscount * 12;
      const yearlyNormalTotal = totalMonthly * 12;
      const savings = yearlyNormalTotal - yearlyTotal;
      
      yearlyContractData = {
        monthlyPrice: Math.round(monthlyWithYearlyDiscount),
        yearlyPrice: Math.round(yearlyTotal),
        savings: Math.round(savings)
      };
    }

    setResult({
      servicePrice: Math.round(discountedServiceCost),
      transportPrice: Math.round(discountedTransportCost),
      totalPrice: Math.round(totalMonthly),
      frequency: frequency.name,
      serviceName: service.name,
      tripsPerMonth: frequency.multiplier,
      pricePerTrip: Math.round(totalMonthly / frequency.multiplier),
      yearlyContract: yearlyContractData
    });

    // Track calculator usage for analytics
    trackOrderStart(
      service.name, 
      yearlyContractData ? yearlyContractData.monthlyPrice : Math.round(totalMonthly), 
      'calculator'
    );

    console.log('Calculator used:', {
      service: service.name,
      frequency: frequency.name,
      total: Math.round(totalMonthly)
    });
  };

  const requestConsultation = () => {
    console.log('Consultation requested from calculator');
    setShowOfferDialog(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the offer data
      const offerData = {
        // Calculator data
        serviceName: result?.serviceName || services.find(s => s.id === selectedService)?.name,
        frequency: result?.frequency || frequencies.find(f => f.id === selectedFrequency)?.name,
        monthlyPrice: result?.yearlyContract ? result.yearlyContract.monthlyPrice : result?.totalPrice,
        yearlyContract: yearlyContract,
        distance: distance || '15',
        customerAddress: customerAddress || 'Nav norādīta',
        
        // Form data
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        details: formData.details,
        preferredContactTime: formData.preferredContactTime,
        
        // Meta data
        requestDate: new Date().toISOString(),
        source: 'website_calculator'
      };

      // Send to API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'precise_offer',
          data: offerData
        }),
      });

      if (response.ok) {
        console.log('📧 Precise offer request sent:', offerData);
        
        // Track form submission for analytics
        trackFormSubmission('precise_offer', 'calculator', 120);
        
        // Redirect to thank you page instead of showing success dialog
        router.push('/paldies/precizu-piedavajums');
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      console.error('Error sending offer request:', error);
      alert('Kļūda nosūtot pieprasījumu. Lūdzu mēģiniet vēlreiz vai zvaniet: +371 27727724');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    // Ensure the phone number always starts with +371
    let cleanValue = value.replace(/[^\d+]/g, '');
    
    if (!cleanValue.startsWith('+371')) {
      if (cleanValue.startsWith('371')) {
        cleanValue = '+' + cleanValue;
      } else if (cleanValue.match(/^\d/)) {
        cleanValue = '+371' + cleanValue;
      } else if (cleanValue === '' || cleanValue === '+') {
        cleanValue = '+371';
      }
    }
    
    setFormData({...formData, phone: cleanValue});
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!formData.phone || formData.phone === '+371') {
      setFormData({...formData, phone: '+371 '});
      // Set cursor position after +371 and space
      setTimeout(() => {
        input.setSelectionRange(5, 5);
      }, 0);
    } else if (formData.phone.length <= 5) {
      // Position cursor at the end if value is short
      setTimeout(() => {
        input.setSelectionRange(input.value.length, input.value.length);
      }, 0);
    }
  };

  const resetForm = () => {
    setShowOfferDialog(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      details: '',
      preferredContactTime: ''
    });
  };

  // Функция для автоматического расчета расстояния
  const calculateDistanceAutomatically = async (customerCoords: { lat: number; lng: number }) => {
    if (!customerCoords) return;

    setIsCalculatingDistance(true);
    console.log('🗺️ Calculating distance automatically from company to customer...');
    console.log('📍 Customer coordinates:', customerCoords);

    try {
      // Координаты компании из env
      const companyLat = parseFloat(process.env.NEXT_PUBLIC_COMPANY_LAT || '56.48078918457031');
      const companyLng = parseFloat(process.env.NEXT_PUBLIC_COMPANY_LNG || '23.057313919067383');
      
      console.log('🏢 Company coordinates:', { lat: companyLat, lng: companyLng });
      
      const response = await fetch('/api/calculate-distance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: `${companyLat},${companyLng}`,
          destination: `${customerCoords.lat},${customerCoords.lng}`
        }),
      });

      const data = await response.json();
      console.log('📊 Distance calculation response:', data);

      if (data.status === 'OK') {
        setDistance(data.distance.toString());
        console.log(`✅ Distance calculated: ${data.distance}km (${data.duration}min)`);
      } else {
        console.log('⚠️ Could not calculate distance:', data.error);
        // Оставляем поле пустым для ручного ввода
        setDistance('');
      }
    } catch (error) {
      console.error('❌ Error calculating distance:', error);
      // Оставляем поле пустым для ручного ввода
      setDistance('');
    } finally {
      setIsCalculatingDistance(false);
    }
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="metan-container">
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
                {/* Service Selection */}
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

                {/* Frequency Selection */}
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

                {/* Distance Input - only for non-transport-included services */}
                {selectedService && !services.find(s => s.id === selectedService)?.transportIncluded && (
                  <div className="space-y-4">
                    {/* Address Autocomplete */}
                    <AddressAutocomplete
                      label="Pilsēta vai objekta atrašanās vieta"
                      placeholder="Ievadiet pilsētu (piemēram: Rīga, Roja, Vilnius, Kauņa)..."
                      value={customerAddress}
                      onChange={handleAddressChange}
                      className="w-full"
                    />
                    
                    {/* Helpful hint for address input */}
                    {customerAddress && !customerCoordinates && !isCalculatingDistance && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-700">
                          💡 <strong>Padoms:</strong> Meklējiet pilsētu nosaukumu jebkurā valodā. Var rakstīt latviski, lietuviski, krieviski vai angliski.
                        </p>
                      </div>
                    )}
                    
                    {/* Success message when city is found */}
                    {customerAddress && customerCoordinates && !isCalculatingDistance && distance && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-700">
                          ✅ <strong>Pilsēta atrasta!</strong> Attālums aprēķināts automātiski: <strong>{distance} km</strong>
                        </p>
                      </div>
                    )}
                    
                    {/* Distance field - auto-filled or manual */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Attālums līdz objektam
                        {isCalculatingDistance && (
                          <span className="ml-2 text-xs text-blue-600">
                            <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                            Aprēķina pēc pilsētas...
                          </span>
                        )}
                        {customerCoordinates && distance && !isCalculatingDistance && (
                          <span className="ml-2 text-xs text-green-600">
                            ✅ Aprēķināts pēc pilsētas
                          </span>
                        )}
                      </Label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={distance.replace(' km', '').replace('km', '')}
                          onChange={(e) => setDistance(e.target.value)}
                          placeholder={
                            customerAddress 
                              ? (customerCoordinates ? "Aprēķina automātiski..." : "Meklē pilsētu...") 
                              : "Ievadiet pilsētu vai attālumu manuāli"
                          }
                          min="1"
                          max="300"
                          className="bg-white border-gray-300 pr-12"
                          disabled={isCalculatingDistance}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500 text-sm">km</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Transporta maksa: 1.3€/km abos virzienos • Mēs apkalpojam Latviju un Lietuvu
                        {customerAddress && distance && customerCoordinates && (
                          <span className="text-green-600 ml-2">
                            ✅ Attālums līdz {customerAddress}: {distance} km
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* Yearly Contract Option */}
                {selectedService && selectedFrequency && selectedFrequency !== 'one_time' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="yearly-contract"
                        checked={yearlyContract}
                        onCheckedChange={(checked) => setYearlyContract(checked === true)}
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

                {/* Calculate Button */}
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

                {/* Special Message for Oil Collection */}
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
                      onClick={requestConsultation}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                      size="sm"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Pieprasīt konsultāciju
                    </Button>
                  </motion.div>
                )}

                {/* Calculation Result */}
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
                            {result.yearlyContract ? 'Mēneša cena (ar atlaidi):' : 'Kopā mēnesī:'}
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            {result.yearlyContract ? result.yearlyContract.monthlyPrice : result.totalPrice}€
                          </span>
                        </div>
                        
                        {/* Show original price with strikethrough if yearly contract */}
                        {result.yearlyContract && (
                          <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                            <span>Bez gada līguma:</span>
                            <span className="line-through">{result.totalPrice}€/mēn</span>
                          </div>
                        )}
                        
                        {/* Breakdown explanation for multiple trips */}
                        {result.tripsPerMonth > 1 && (
                          <div className="mt-2 p-3 bg-green-100 rounded-lg">
                            <p className="text-sm text-green-700 text-center">
                              💡 <strong>Aprēķins:</strong> {result.yearlyContract ? Math.round((result.yearlyContract.monthlyPrice) / result.tripsPerMonth) : result.pricePerTrip}€ par izbraukumu × {result.tripsPerMonth} izbraukumi mēnesī = {result.yearlyContract ? result.yearlyContract.monthlyPrice : result.totalPrice}€
                            </p>
                          </div>
                        )}

                        {/* Yearly contract savings */}
                        {result.yearlyContract && (
                          <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2 text-center">
                              🎉 Jūsu ietaupījums ar gada līgumu
                            </h5>
                            
                            {/* Always show savings amount */}
                            <div className="text-center mb-3">
                              <div className="inline-block">
                                <p className="text-sm text-gray-600">Gada ietaupījums:</p>
                                <p className="text-2xl font-bold text-green-600">-{result.yearlyContract.savings}€</p>
                                <p className="text-xs text-blue-600">
                                  💰 Ekonomija: {Math.round((result.yearlyContract.savings / (result.totalPrice * 12)) * 100)}% gadā!
                                </p>
                              </div>
                            </div>

                            {/* Show detailed breakdown only on request */}
                            {!showFullYearlyBreakdown ? (
                              <div className="text-center">
                                <button
                                  onClick={() => setShowFullYearlyBreakdown(true)}
                                  className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
                                >
                                  📊 Skatīt pilnu gada aprēķinu
                                </button>
                              </div>
                            ) : (
                              <div>
                                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                                  <div className="text-center p-2 bg-white rounded">
                                    <p className="text-gray-600">Bez gada līguma:</p>
                                    <p className="font-bold text-gray-700">{result.totalPrice * 12}€</p>
                                    <p className="text-xs text-gray-500">gadā</p>
                                  </div>
                                  <div className="text-center p-2 bg-white rounded">
                                    <p className="text-gray-600">Ar gada līgumu:</p>
                                    <p className="font-bold text-blue-600">{result.yearlyContract.yearlyPrice}€</p>
                                    <p className="text-xs text-blue-500">gadā</p>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <button
                                    onClick={() => setShowFullYearlyBreakdown(false)}
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
                      onClick={() => setShowOfferDialog(true)}
                      className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Pieprasīt precīzu piedāvājumu
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {/* Info message */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    💡 Aprēķins ir orientējošs. Precīzu cenu saņemsiet pēc objekta apsekošanas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Precise Offer Dialog */}
        <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle className="text-green-800 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Precīzs piedāvājums
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Lai sagatavotu precīzu piedāvājumu, lūdzu aizpildiet šo formu. Mēs sazināsimies 24 stundu laikā.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Summary of calculation */}
              {result && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <h4 className="text-sm font-semibold text-green-800 mb-2">📊 Jūsu aprēķins:</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pakalpojums:</span>
                      <span className="font-medium text-gray-800">{result.serviceName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biežums:</span>
                      <span className="font-medium text-gray-800">{result.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mēneša cena:</span>
                      <span className="font-bold text-green-600">
                        {result.yearlyContract ? result.yearlyContract.monthlyPrice : result.totalPrice}€
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

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Vārds *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Jūsu vārds"
                    required
                    className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefons *</Label>
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
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-pasts *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your@email.com"
                  required
                  className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">Uzņēmums</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="SIA vai AS nosaukums"
                  className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <Label htmlFor="preferred-time" className="text-sm font-medium text-gray-700">Vēlamais zvana laiks</Label>
                <Select 
                  value={formData.preferredContactTime} 
                  onValueChange={(value) => setFormData({...formData, preferredContactTime: value})}
                >
                  <SelectTrigger className="border-gray-300 bg-white text-gray-900 focus:border-green-500">
                    <SelectValue placeholder="Kad jums ērtāk?" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="asap" className="text-gray-900 hover:bg-green-50">Tūlīt pat</SelectItem>
                    <SelectItem value="morning" className="text-gray-900 hover:bg-green-50">Rītos (8:00-12:00)</SelectItem>
                    <SelectItem value="afternoon" className="text-gray-900 hover:bg-green-50">Pēcpusdienā (12:00-17:00)</SelectItem>
                    <SelectItem value="evening" className="text-gray-900 hover:bg-green-50">Vakarā (17:00-20:00)</SelectItem>
                    <SelectItem value="email_only" className="text-gray-900 hover:bg-green-50">Tikai e-pastā</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="details" className="text-sm font-medium text-gray-700">Papildu informācija</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  placeholder="Pastāstiet par jūsu objektu, specifiskajām prasībām vai jautājumiem..."
                  rows={3}
                  className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
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
                Nosūtot formu, jūs piekrītat, ka mēs sazināsimies ar jums par piedāvājumu
              </p>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}