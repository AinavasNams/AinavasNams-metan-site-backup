'use client';

import { useMemo, useRef, useState } from 'react';
import MapCalculator, { ExternalPin, CalcResult, MapCalcPayload } from '@/components/v17/MapCalculator';
import PartnerRequestForm from '@/components/v17/PartnerRequestForm';

function formatKm(v: any) {
  const n = typeof v === 'number' ? v : Number(v);
  if (!Number.isFinite(n)) return '—';
  return `${n.toFixed(1)} km`;
}

function formatEur(v: any) {
  const n = typeof v === 'number' ? v : Number(v);
  if (!Number.isFinite(n)) return '—';
  return `${Math.round(n)} €`;
}

export default function PartneriemZoneBlock() {
  const [pin, setPin] = useState<ExternalPin | null>(null);
  const [addr, setAddr] = useState<string>('');
  const [res, setRes] = useState<CalcResult | null>(null);

  const [countryCode, setCountryCode] = useState<string>('');

  const formRef = useRef<HTMLDivElement | null>(null);
  const [flashForm, setFlashForm] = useState(false);

  const onMapResult = (p: MapCalcPayload) => {
    setPin({ lat: p.lat, lng: p.lng, address: p.address });
    setAddr(p.address);
    setRes(p.result);

    const cc = String((p as any)?.country_code || (p as any)?.countryCode || '').toLowerCase();
    if (cc) setCountryCode(cc);
  };

  const mailtoHref = useMemo(() => {
    const a = (addr || '').trim();
    const z = (res as any)?.zone ?? '—';
    const d = (res as any)?.distance;
    const pr = (res as any)?.price;
    const base = (res as any)?.basePrice;

    const subject = `metan.lv — Aprēķins / partneriem`;
    const bodyLines = [
      `Aprēķins no metan.lv (partneriem)`,
      ``,
      `Adrese: ${a || '—'}`,
      `Valsts: ${countryCode ? countryCode.toUpperCase() : '—'}`,
      `Zona: ${z}`,
      `Attālums: ${formatKm(d)}`,
      `Cena (ar līgumu 12 mēn.): ${formatEur(pr)}`,
      base != null ? `Bāzes cena: ${formatEur(base)}` : null,
      ``,
      `Saite: https://metan.lv/partneriem`,
    ].filter(Boolean);

    const body = bodyLines.join('\n');
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [addr, res, countryCode]);

  const scrollToForm = () => {
    const el = formRef.current;
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setFlashForm(true);
    window.setTimeout(() => setFlashForm(false), 1200);

    window.setTimeout(() => {
      const firstField = el.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        'input, textarea, select'
      );
      firstField?.focus();
    }, 250);
  };

  // ✅ Реальная геолокация по кнопке “я на объекте”
  const locateMe = () => {
    if (typeof window === 'undefined') return;

    if (!('geolocation' in navigator)) {
      alert('Geolokācija nav pieejama šajā pārlūkprogrammā.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // адрес пока неизвестен (reverse geocode можно добавить позже)
        const label = 'Jūsu atrašanās vieta';

        // Передаём координаты в MapCalculator через externalPin → он сам посчитает
        setPin({ lat, lng, address: label });
        setAddr(label);

        // UX: подсветим блок и проскроллим
        scrollToForm();
      },
      (err) => {
        alert('Neizdevās iegūt geolokāciju. Lūdzu, atļaujiet piekļuvi atrašanās vietai.');
        console.warn('geolocation error', err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <MapCalculator onResult={onMapResult} externalPin={pin} />
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
        {/* INFO BLOCK */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">Aprēķins</div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-xs text-gray-500 mb-2">Adrese</div>
            <div className="text-sm font-medium text-gray-900 break-words">
              {addr ? addr : 'Izvēlieties adresi kartē vai ievadiet to formā'}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-lg bg-white border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Valsts</div>
                <div className="text-sm font-semibold">
                  {countryCode ? countryCode.toUpperCase() : '—'}
                </div>
              </div>

              <div className="rounded-lg bg-white border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Zona</div>
                <div className="text-sm font-semibold">
                  {(res as any)?.zone ?? '—'}
                </div>
              </div>

              <div className="rounded-lg bg-white border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Attālums</div>
                <div className="text-sm font-semibold">
                  {formatKm((res as any)?.distance)}
                </div>
              </div>

              <div className="rounded-lg bg-white border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Cena</div>
                <div className="text-sm font-semibold">
                  {formatEur((res as any)?.price)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <a
                href={mailtoHref}
                className="w-full text-center rounded-xl px-4 py-3 text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-100 transition"
              >
                Nosūtīt aprēķinu sev uz e-pastu
              </a>

              <button
                type="button"
                onClick={scrollToForm}
                className="w-full rounded-xl px-4 py-3 text-sm font-semibold bg-gray-900 text-white hover:opacity-90 transition"
              >
                Saņemt piedāvājumu
              </button>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div
          ref={formRef}
          className={
            'scroll-mt-24 rounded-2xl transition ' +
            (flashForm ? 'ring-2 ring-gray-900/30 bg-gray-50/40' : '')
          }
        >
          <div className="text-sm text-gray-500 mb-2">Pieteikums</div>
          <h3 className="text-xl font-bold mb-4">Saņemt precīzu piedāvājumu</h3>
          <p className="text-sm text-gray-600 mb-6">
            Aizpildiet informāciju, un mēs sagatavosim piedāvājumu atbilstoši zonai, apjomam un regularitātei.
          </p>

          <PartnerRequestForm
            address={addr}
            countryCode={countryCode}
            result={res}
            onLocate={locateMe}
          />
        </div>
      </div>
    </div>
  );
}
