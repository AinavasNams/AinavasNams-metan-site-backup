'use client';

import { useMemo, useState } from 'react';
import type { CalcResult } from '@/components/v17/MapCalculator';

type Props = {
  address: string;
  countryCode?: string;
  result: CalcResult | null;
  onLocate?: () => void;
};

export default function PartnerRequestForm({ address, countryCode, result, onLocate }: Props) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorText, setErrorText] = useState<string>('');

  const canSubmit = useMemo(() => phone.trim().length >= 6, [phone]);

  async function submit() {
    if (!canSubmit) {
      setErrorText('Lūdzu, ievadiet tālruņa numuru.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorText('');

    try {
      const payload = {
        action: 'submit_lead',
        data: {
          phone: phone.trim(),
          email: email.trim() || undefined,
          address: address || '-',
          zone: (result as any)?.zone || '-',
          price: (result as any)?.price ?? null,
          basePrice: (result as any)?.basePrice ?? null,
          distance: (result as any)?.distance ?? null,
          isIndividual: (result as any)?.isIndividual ?? false,
          countryCode: (countryCode || '').toLowerCase(),
          note: note.trim() || undefined,
        },
      };

      const res = await fetch('/api/landing-calc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || 'Submit failed');
      }

      setStatus('sent');
    } catch (e: any) {
      setStatus('error');
      setErrorText(e?.message || 'Kļūda nosūtot pieprasījumu.');
    }
  }

  return (
    <div className="space-y-4">
      {/* Geo button */}
      <button
        type="button"
        onClick={onLocate}
        className="w-full rounded-xl px-4 py-3 text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-100 transition"
      >
        Es esmu uz objekta (atrast mani)
      </button>

      {/* Summary line */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        <div className="font-semibold text-gray-900 mb-1">Aprēķina kopsavilkums</div>
        <div className="break-words">
          <span className="text-gray-500">Adrese:</span> {address ? address : '—'}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white border border-gray-200 p-3">
            <div className="text-xs text-gray-500">Zona</div>
            <div className="text-sm font-semibold">{(result as any)?.zone ?? '—'}</div>
          </div>
          <div className="rounded-lg bg-white border border-gray-200 p-3">
            <div className="text-xs text-gray-500">Cena</div>
            <div className="text-sm font-semibold">
              {(result as any)?.isIndividual ? 'INDIVIDUĀLI' : ((result as any)?.price != null ? `${Math.round((result as any)?.price)} €` : '—')}
            </div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Telefons <span className="text-red-500">*</span>
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+371 …"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          E-pasts <span className="text-gray-400 font-normal">(pēc izvēles)</span>
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.lv"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Piezīme <span className="text-gray-400 font-normal">(pēc izvēles)</span>
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Apjoms / regularitāte / īpašas prasības…"
          className="w-full min-h-[96px] rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
        />
      </div>

      {status === 'error' && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorText || 'Kļūda.'}
        </div>
      )}

      {status === 'sent' && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          Pieprasījums nosūtīts. Mēs ar Jums sazināsimies!
        </div>
      )}

      <button
        type="button"
        disabled={status === 'sending' || !canSubmit}
        onClick={submit}
        className="w-full rounded-xl px-4 py-3 text-sm font-semibold bg-gray-900 text-white hover:opacity-90 transition disabled:opacity-50"
      >
        {status === 'sending' ? 'Nosūta…' : 'Saņemt precīzu piedāvājumu'}
      </button>

      <div className="text-xs text-gray-500">
        Nosūtot pieprasījumu, Jūs piekrītat, ka metan.lv sazināsies ar Jums par piedāvājumu.
      </div>
    </div>
  );
}
