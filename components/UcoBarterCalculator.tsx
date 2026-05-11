'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Calculator, Recycle, ArrowRight, CheckCircle, TrendingUp, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { trackCTA } from '@/components/Analytics';
import { trackCalculatorUse } from '@/lib/gtm-events';

// Zone-based pricing for 9m³ vacuum truck visit
const ZONES = [
  { id: 'zone1', km: '0–50',  price: 365 },
  { id: 'zone2', km: '50–100', price: 400 },
  { id: 'zone3', km: '100–150', price: 460 },
  { id: 'zone4', km: '150–200', price: 500 },
] as const;

// UCO buyback price range
const UCO_PRICE_MIN = 0.40;
const UCO_PRICE_MAX = 0.55;
const UCO_PRICE_DEFAULT = 0.45;

// Competitor average price (for comparison)
const COMPETITOR_MARKUP = 1.35; // competitors charge ~35% more on average

interface CalculationResult {
  zonePrice: number;
  ucoLiters: number;
  ucoPrice: number;
  ucoValue: number;
  finalPrice: number;   // can be negative (surplus = payout to client)
  savingsPercent: number;
  scenario: 'deficit' | 'exact' | 'surplus';
  competitorPrice: number;
}

export default function UcoBarterCalculator() {
  const { t, localePath } = useTranslation();

  const [zone, setZone] = useState('');
  const [ucoLiters, setUcoLiters] = useState('');
  const [ucoPrice, setUcoPrice] = useState(UCO_PRICE_DEFAULT);
  const [showResult, setShowResult] = useState(false);

  const result = useMemo<CalculationResult | null>(() => {
    const selectedZone = ZONES.find(z => z.id === zone);
    const liters = parseFloat(ucoLiters) || 0;
    if (!selectedZone || liters <= 0) return null;

    const ucoValue = liters * ucoPrice;
    const finalPrice = selectedZone.price - ucoValue;
    const savingsPercent = selectedZone.price > 0
      ? Math.round((Math.min(ucoValue, selectedZone.price) / selectedZone.price) * 100)
      : 0;

    let scenario: 'deficit' | 'exact' | 'surplus';
    if (Math.abs(finalPrice) < 1) scenario = 'exact';
    else if (finalPrice > 0) scenario = 'deficit';
    else scenario = 'surplus';

    return {
      zonePrice: selectedZone.price,
      ucoLiters: liters,
      ucoPrice,
      ucoValue: Math.round(ucoValue * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      savingsPercent: Math.min(savingsPercent, 100),
      scenario,
      competitorPrice: Math.round(selectedZone.price * COMPETITOR_MARKUP),
    };
  }, [zone, ucoLiters, ucoPrice]);

  // Progress bar: how close to free service
  const progressPercent = useMemo(() => {
    const selectedZone = ZONES.find(z => z.id === zone);
    const liters = parseFloat(ucoLiters) || 0;
    if (!selectedZone || liters <= 0) return 0;
    const ucoValue = liters * ucoPrice;
    return Math.min(100, Math.round((ucoValue / selectedZone.price) * 100));
  }, [zone, ucoLiters, ucoPrice]);

  // Liters needed for free service
  const litersForFree = useMemo(() => {
    const selectedZone = ZONES.find(z => z.id === zone);
    if (!selectedZone) return 0;
    return Math.ceil(selectedZone.price / ucoPrice);
  }, [zone, ucoPrice]);

  const handleCalculate = () => {
    if (!result) return;
    setShowResult(true);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'uco_barter_calculator_complete', {
        event_category: 'microconversion',
        event_label: 'uco_barter_horeca',
        value: 40,
        currency: 'EUR',
      });
    }
    trackCalculatorUse('uco_barter_horeca', Math.round(result.ucoValue));
  };

  const handleContactRequest = () => {
    trackCTA('uco_barter_contact', 'horeca_landing', '#forma');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'uco_barter_contact_request', {
        event_category: 'conversion',
        event_label: 'uco_barter_to_contact_horeca',
        value: 60,
        currency: 'EUR',
      });
    }
    const formEl = document.getElementById('forma');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = localePath('/kontakti');
    }
  };

  const reset = () => {
    setZone('');
    setUcoLiters('');
    setUcoPrice(UCO_PRICE_DEFAULT);
    setShowResult(false);
  };

  const selectedZone = ZONES.find(z => z.id === zone);

  return (
    <div id="uco-calculator" className="bg-white rounded-xl shadow-lg border border-green-200 p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Recycle className="h-8 w-8 text-metan-primary" />
          <Calculator className="h-6 w-6 text-metan-accent" />
        </div>
        <h2 className="text-2xl font-bold text-metan-gray mb-2">
          {t('ucoCalc.title')}
        </h2>
        <p className="text-gray-600">
          {t('ucoCalc.subtitle')}
        </p>
      </div>

      {/* Input Block */}
      <div className="space-y-6 mb-8">

        {/* Zone selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            {t('ucoCalc.zoneLabel')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ZONES.map(z => (
              <button
                key={z.id}
                onClick={() => { setZone(z.id); setShowResult(false); }}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  zone === z.id
                    ? 'border-metan-primary bg-green-50 text-metan-primary'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="block text-sm font-medium">{z.km} km</span>
                <span className="block text-lg font-bold">{z.price} €</span>
              </button>
            ))}
          </div>
        </div>

        {/* UCO volume */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            {t('ucoCalc.volumeLabel')}
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              id="uco-liters"
              name="ucoLiters"
              placeholder={t('ucoCalc.volumePlaceholder')}
              value={ucoLiters}
              onChange={(e) => { setUcoLiters(e.target.value); setShowResult(false); }}
              className="h-12 flex-1"
              min="0"
            />
            <span className="flex items-center text-sm text-gray-500 px-2">{t('ucoCalc.liters')}</span>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[100, 200, 500, 1000].map(val => (
              <Button
                key={val}
                variant="outline"
                size="sm"
                onClick={() => { setUcoLiters(String(val)); setShowResult(false); }}
                className={`text-xs ${ucoLiters === String(val) ? 'border-metan-primary text-metan-primary' : 'text-gray-600 border-gray-300'}`}
              >
                {val} L
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">{t('ucoCalc.volumeHint')}</p>
        </div>

        {/* UCO price */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            {t('ucoCalc.priceLabel')}: <span className="text-metan-primary">{ucoPrice.toFixed(2)} €/L</span>
          </label>
          <Slider
            value={[ucoPrice * 100]}
            onValueChange={(val) => { setUcoPrice(val[0] / 100); setShowResult(false); }}
            min={UCO_PRICE_MIN * 100}
            max={UCO_PRICE_MAX * 100}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{UCO_PRICE_MIN.toFixed(2)} €/L</span>
            <span>{UCO_PRICE_MAX.toFixed(2)} €/L</span>
          </div>
        </div>
      </div>

      {/* Progress bar: how close to free */}
      {selectedZone && parseFloat(ucoLiters) > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">{t('ucoCalc.progressToFree')}</span>
            <span className={`text-xs font-bold ${progressPercent >= 100 ? 'text-green-600' : 'text-metan-primary'}`}>
              {progressPercent}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className={`h-3 rounded-full transition-colors ${
                progressPercent >= 100 ? 'bg-green-500' : progressPercent >= 70 ? 'bg-metan-primary' : 'bg-yellow-400'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressPercent, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {progressPercent < 100 && (
            <p className="text-xs text-gray-500 mt-1">
              {t('ucoCalc.needMore')}: {Math.max(0, litersForFree - Math.floor(parseFloat(ucoLiters) || 0))} L
            </p>
          )}
        </div>
      )}

      {/* Calculate button */}
      {!showResult && (
        <Button
          onClick={handleCalculate}
          disabled={!zone || !ucoLiters || parseFloat(ucoLiters) <= 0}
          className="w-full h-12 bg-metan-primary hover:bg-metan-primary/90 text-white text-lg"
        >
          {t('ucoCalc.calculate')}
          <Calculator className="ml-2 h-5 w-5" />
        </Button>
      )}

      {/* Results Block */}
      {showResult && result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {/* Calculation breakdown */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t('ucoCalc.serviceBase')} ({selectedZone?.km} km)</span>
              <span className="text-sm font-semibold text-gray-800">{result.zonePrice} €</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {t('ucoCalc.yourCompensation')} ({result.ucoLiters} L × {result.ucoPrice.toFixed(2)} €)
              </span>
              <span className="text-sm font-semibold text-green-600">-{result.ucoValue.toFixed(2)} €</span>
            </div>
            <div className="border-t border-gray-300 pt-2 mt-2" />

            {/* Scenario A: Deficit */}
            {result.scenario === 'deficit' && (
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">{t('ucoCalc.toPay')}</span>
                <span className="text-2xl font-bold text-metan-primary">{result.finalPrice.toFixed(2)} €</span>
              </div>
            )}

            {/* Scenario B: Exact */}
            {result.scenario === 'exact' && (
              <div className="text-center py-2">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <span className="text-2xl font-bold text-green-600">0.00 €</span>
                <p className="text-sm text-green-700 mt-1">{t('ucoCalc.exactMatch')}</p>
              </div>
            )}

            {/* Scenario C: Surplus — payout to client */}
            {result.scenario === 'surplus' && (
              <div className="text-center py-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Banknote className="h-8 w-8 text-green-600" />
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-sm text-gray-600 mb-1">{t('ucoCalc.serviceCostLabel')}: <span className="line-through">{ result.zonePrice } €</span> → <span className="font-bold text-green-600">0 €</span></p>
                <div className="bg-green-100 rounded-lg p-3 mt-2">
                  <span className="text-lg font-bold text-green-700">
                    + {Math.abs(result.finalPrice).toFixed(2)} € {t('ucoCalc.payoutToYou')}
                  </span>
                  <p className="text-xs text-green-600 mt-1">{t('ucoCalc.payoutNote')}</p>
                </div>
              </div>
            )}
          </div>

          {/* Savings badge */}
          {result.scenario === 'deficit' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <span className="text-sm font-semibold text-green-700">
                {t('ucoCalc.yourSavings')}: {result.savingsPercent}% ({result.ucoValue.toFixed(2)} €)
              </span>
            </div>
          )}

          {/* Competitor comparison */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              {t('ucoCalc.competitorNote')}: ~{result.competitorPrice} € | {t('ucoCalc.yourPriceWith')} METAN.LV: <strong>{Math.max(0, result.finalPrice).toFixed(2)} €</strong>
              {result.scenario === 'surplus' && <span> + {t('ucoCalc.payout')} {Math.abs(result.finalPrice).toFixed(2)} €</span>}
            </p>
          </div>

          {/* Legal disclaimer */}
          <p className="text-[10px] text-gray-400 leading-tight">
            {t('ucoCalc.disclaimer')}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleContactRequest}
              className="flex-1 h-12 bg-metan-primary hover:bg-metan-primary/90 text-white"
            >
              {t('ucoCalc.ctaContact')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              {t('ucoCalc.ctaReset')}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
