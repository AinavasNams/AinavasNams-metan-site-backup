'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

type Step = 'intro' | 'calc' | 'result' | 'form' | 'success';

export type CalcResult = {
  distance: number;
  zone: string;
  price: number | null;
  basePrice: number | null;
  isIndividual: boolean;
};

type Props = {
  externalAddress?: string;
  externalResult?: CalcResult | null;
};

export default function LandingCalculator({ externalAddress, externalResult }: Props) {
  const [step, setStep] = useState<Step>('intro');
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [loading, setLoading] = useState(false);

  const [geoStatus, setGeoStatus] = useState<string>('');
  const [geoSource, setGeoSource] = useState<'gps' | 'manual' | ''>('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  // --- Restore drafts
  useEffect(() => {
    const savedPhone = localStorage.getItem('lp_phone');
    const savedEmail = localStorage.getItem('lp_email');
    if (savedPhone) setPhone(savedPhone);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const saveDraft = (key: 'lp_phone' | 'lp_email', val: string) => {
    localStorage.setItem(key, val);
    if (key === 'lp_phone') setPhone(val);
    if (key === 'lp_email') setEmail(val);
  };

  // --- Accept map-provided data
  useEffect(() => {
    if (externalResult) {
      setResult(externalResult);
      if (externalAddress) setAddress(externalAddress);
      setGeoSource('manual');
      setGeoStatus('');
      setStep('result');
    }
  }, [externalResult, externalAddress]);

  // --- Google Places Autocomplete
  const initAutocomplete = () => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: ['lv', 'lt'] },
      fields: ['formatted_address', 'geometry'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const formatted = place.formatted_address || '';
        setAddress(formatted);
        setGeoSource('manual');
        setGeoStatus('');
        calculate(place.geometry.location.lat(), place.geometry.location.lng());
      }
    });
  };

  // --- Call API calculate
  const calculate = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const res = await fetch('/api/landing-calc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'calculate', lat, lng }),
      });

      const data = (await res.json()) as CalcResult;
      if (!res.ok) throw new Error((data as any)?.error || 'calc failed');

      setResult(data);
      setStep('result');
    } catch {
      alert('Kļūda aprēķinā');
    } finally {
      setLoading(false);
    }
  };

  // --- GPS
  const handleGps = () => {
    setGeoStatus('Nosaka atrašanās vietu...');
    if (!navigator.geolocation) {
      setGeoStatus('Pārlūks neatbalsta ģeolokāciju. Lūdzu ievadiet adresi manuāli.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoSource('gps');
        setAddress('Atrašanās vieta noteikta automātiski (GPS)');
        setGeoStatus('');
        calculate(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        setGeoStatus('Pieeja liegta. Lūdzu ievadiet adresi manuāli.');
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  };

  // --- Submit lead
  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;

    setLoading(true);
    try {
      await fetch('/api/landing-calc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit_lead',
          data: {
            phone,
            email,
            address,
            geoSource,
            zone: result.zone,
            price: result.price,
            distance: result.distance,
            isIndividual: result.isIndividual,
            pricingPlan: 'annual',
            base: 'Bēne',
          },
        }),
      });

      setStep('success');
      localStorage.removeItem('lp_phone');
      localStorage.removeItem('lp_email');
    } catch {
      alert('Kļūda nosūtot. Lūdzu zvaniet mums.');
    } finally {
      setLoading(false);
    }
  };

  const resetToCalc = () => {
    setResult(null);
    setGeoStatus('');
    setGeoSource('');
    setStep('calc');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={initAutocomplete}
        strategy="lazyOnload"
      />

      <div className="p-8 md:p-10">
        {/* остальная разметка без изменений */}
        {/* файл обрезан намеренно здесь в ответе — в реальном деплое ты вставляешь ВЕСЬ файл */}
      </div>
    </div>
  );
}
