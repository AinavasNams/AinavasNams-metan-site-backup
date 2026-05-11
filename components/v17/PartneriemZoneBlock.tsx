'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import MapCalculator from './MapCalculator';
import PartnerRequestForm from './PartnerRequestForm';

type Pin = { lat: number; lng: number; address?: string };
type CalcResult = {
  zone: string;
  distance: number;
  price: number | null;
  isIndividual: boolean;
  country_code?: string;
};

export default function PartneriemZoneBlock() {
  const { t } = useTranslation();
  const [pin, setPin] = useState<Pin | null>(null);
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [countryCode, setCountryCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasOwnTransport, setHasOwnTransport] = useState(false);

  const locateMe = async () => {
    if (!navigator.geolocation) {
      alert(t('partneriemPage.zoneGeoNotSupported'));
      return;
    }
    
    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        try {
          const geocodeRes = await fetch('/api/geocode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat, lng }),
          });
          
          if (!geocodeRes.ok) throw new Error('Geocoding failed');
          const geocodeData = await geocodeRes.json();
          
          const calcRes = await fetch('/api/landing-calc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'calculate',
              lat,
              lng,
              countryCode: geocodeData.country_code,
            }),
          });
          
          if (!calcRes.ok) throw new Error('Calculation failed');
          const calcData = await calcRes.json();
          
          setPin({ lat, lng, address: geocodeData.display_name || geocodeData.address || '' });
          setAddress(geocodeData.display_name || geocodeData.address || t('partneriemPage.zoneGeoDetected'));
          setCountryCode(geocodeData.country_code || '');
          setResult(calcData);
          
        } catch (error) {
          console.error('GPS calculation error:', error);
          alert(t('partneriemPage.zoneGeoFailed'));
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert(t('partneriemPage.zoneGeoPermission'));
        setLoading(false);
      }
    );
  };

  const onMapResult = (payload: any) => {
    if (payload.address) setAddress(payload.address);
    if (payload.result) setResult(payload.result);
    if (payload.pin) setPin(payload.pin);
    if (payload.countryCode) setCountryCode(payload.countryCode);
  };

  const scrollToForm = () => {
    const formEl = document.getElementById('partner-request-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const firstInput = formEl.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {t('partneriemPage.zoneCalcTitle')}
        </h2>
        <p className="text-lg text-gray-600">
          {t('partneriemPage.zoneCalcSubtitle')}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-6 lg:p-8 mb-8">
        <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              id="has-own-transport"
              name="hasOwnTransport"
              checked={hasOwnTransport}
              onChange={(e) => setHasOwnTransport(e.target.checked)}
              className="mt-1 w-6 h-6 text-blue-600 rounded border-2 border-blue-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-gray-900 text-lg">{t('partneriemPage.zoneOwnTransport')}</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">{t('partneriemPage.zoneOwnTransportEconomy')}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('partneriemPage.zoneOwnTransportDesc')}
              </p>
            </div>
          </label>
          
          {hasOwnTransport && (
            <div className="mt-5 p-5 bg-white rounded-xl border-2 border-green-300 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {t('partneriemPage.zoneGateFeePrice')} <span className="text-3xl text-green-600">7-10€/t</span>
                  </p>
                  <p className="text-sm text-gray-600">{t('partneriemPage.zoneGateFeePriceNote')}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-lg">✅</span>
                  <span><strong>{t('partneriemPage.zoneEwcLabel')}</strong> {t('partneriemPage.zoneEwcValue')}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-lg">✅</span>
                  <span><strong>{t('partneriemPage.zoneReceptionLabel')}</strong> {t('partneriemPage.zoneReceptionValue')}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-lg">✅</span>
                  <span><strong>{t('partneriemPage.zoneDocsLabel')}</strong> {t('partneriemPage.zoneDocsValue')}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  📍 {t('partneriemPage.zoneStationAddress')}
                </p>
                
                <a href="https://maps.google.com/?q=56.4815,23.0618"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md"
                >
                  📍 {t('partneriemPage.zoneOpenMaps')}
                </a>
              </div>
            </div>
          )}
        </div>

        {!hasOwnTransport && (
          <>
            <div className="mb-8">
              <button
                onClick={locateMe}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 px-6 rounded-xl shadow-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                <span className="text-2xl">📍</span>
                {loading ? <span className="flex items-center gap-2">⏳ {t('partneriemPage.zoneGpsLoading')}</span> : t('partneriemPage.zoneGpsButton')}
              </button>
              
              <div className="flex items-center gap-4 my-7">
                <hr className="flex-1 border-gray-300" />
                <span className="text-sm text-gray-500 font-semibold uppercase tracking-wide">{t('partneriemPage.zoneOrAddress')}</span>
                <hr className="flex-1 border-gray-300" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <MapCalculator externalPin={pin} onResult={onMapResult} />
              </div>

              <div>
                {result ? (
                  <div className="h-full p-6 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 rounded-xl border-2 border-green-300 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">✓</span>
                      </div>
                      {t('partneriemPage.zoneResultTitle')}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      {address && (
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500 mb-1 font-medium">{t('partneriemPage.zoneResultAddress')}</p>
                          <p className="text-sm font-semibold text-gray-900">{address}</p>
                        </div>
                      )}
                      
                      {countryCode && (
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500 mb-1 font-medium">{t('partneriemPage.zoneResultCountry')}</p>
                          <p className="text-lg font-bold">
                            {countryCode === 'lv' ? t('partneriemPage.zoneResultCountryLV') : countryCode === 'lt' ? t('partneriemPage.zoneResultCountryLT') : countryCode}
                          </p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500 mb-1 font-medium">{t('partneriemPage.zoneResultZone')}</p>
                          <p className="text-base font-bold text-gray-900">{result.zone}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500 mb-1 font-medium">{t('partneriemPage.zoneResultDistance')}</p>
                          <p className="text-base font-bold text-gray-900">~{result.distance} km</p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-5 rounded-lg shadow-md border-2 border-green-200">
                        <p className="text-xs text-gray-500 mb-2 font-medium">{t('partneriemPage.zoneResultPrice')}</p>
                        <p className="text-4xl font-black text-green-600">
                          {result.isIndividual ? t('partneriemPage.zoneResultIndividual') : `${t('partneriemPage.zoneResultFrom')} ${result.price}€`}
                        </p>
                        {!result.isIndividual && <p className="text-xs text-gray-500 mt-2">{t('partneriemPage.zoneResultMonthVat')}</p>}
                      </div>
                    </div>

                    <button
                      onClick={scrollToForm}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {t('partneriemPage.zoneResultGetOffer')}
                    </button>
                  </div>
                ) : (
                  <div className="h-full min-h-[500px] p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-5">
                      <span className="text-4xl">📍</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">{t('partneriemPage.zoneEmptyTitle')}</p>
                    <p className="text-sm text-gray-500 max-w-xs">
                      {t('partneriemPage.zoneEmptyDesc')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div id="partner-request-form" className="scroll-mt-8">
        <PartnerRequestForm
          prefilledAddress={address}
          prefilledZone={result?.zone}
          prefilledPrice={hasOwnTransport ? '7-10€/t (Gate Fee)' : result?.price?.toString()}
          prefilledDistance={result?.distance}
          isIndividual={result?.isIndividual}
          countryCode={countryCode}
        />
      </div>
    </div>
  );
}
