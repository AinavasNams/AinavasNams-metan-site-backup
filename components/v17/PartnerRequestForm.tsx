'use client';

import { useMemo, useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

type Props = {
  prefilledAddress?: string;
  prefilledZone?: string;
  prefilledPrice?: string | number;
  prefilledDistance?: number;
  isIndividual?: boolean;
  countryCode?: string;
};

export default function PartnerRequestForm({
  prefilledAddress,
  prefilledZone,
  prefilledPrice,
  prefilledDistance,
  isIndividual,
  countryCode,
}: Props) {
  const { t } = useTranslation();
  const [phoneCode, setPhoneCode] = useState('+371');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorText, setErrorText] = useState<string>('');

  useEffect(() => {
    if (countryCode === 'lt') {
      setPhoneCode('+370');
    } else {
      setPhoneCode('+371');
    }
  }, [countryCode]);

  const canSubmit = useMemo(() => phone.trim().length >= 7, [phone]);

  async function submit() {
    if (!canSubmit) {
      setErrorText(t('partneriemPage.formPhoneRequired'));
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorText('');

    try {
      const payload = {
        action: 'submit_lead',
        data: {
          phone: `${phoneCode}${phone.trim()}`,
          email: email.trim() || undefined,
          address: prefilledAddress || '-',
          zone: prefilledZone || '-',
          price: prefilledPrice ?? null,
          distance: prefilledDistance ?? null,
          isIndividual: isIndividual ?? false,
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
      
      setTimeout(() => {
        setPhone('');
        setEmail('');
        setNote('');
        setStatus('idle');
      }, 3000);
      
    } catch (e: any) {
      setStatus('error');
      setErrorText(e?.message || t('partneriemPage.formError'));
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {t('partneriemPage.formTitle')}
      </h3>

      <div className="space-y-5">
        {prefilledAddress && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="text-sm font-semibold text-gray-700 mb-2">
              📍 {t('partneriemPage.formSummary')}
            </div>
            <div className="text-sm text-gray-600 mb-3">
              {prefilledAddress}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {prefilledZone && (
                <div className="bg-white rounded p-2 text-center">
                  <div className="text-xs text-gray-500">{t('partneriemPage.formZone')}</div>
                  <div className="text-sm font-semibold">{prefilledZone}</div>
                </div>
              )}
              {prefilledDistance && (
                <div className="bg-white rounded p-2 text-center">
                  <div className="text-xs text-gray-500">{t('partneriemPage.formDistance')}</div>
                  <div className="text-sm font-semibold">~{prefilledDistance} km</div>
                </div>
              )}
              {prefilledPrice && (
                <div className="bg-white rounded p-2 text-center">
                  <div className="text-xs text-gray-500">{t('partneriemPage.formPrice')}</div>
                  <div className="text-sm font-semibold text-green-600">
                    {isIndividual ? t('partneriemPage.formIndividual') : `${prefilledPrice}€`}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t('partneriemPage.formPhone')} <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              id="partner-phone-code"
              name="phoneCode"
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              className="w-24 rounded-lg border border-gray-300 px-3 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="+371">🇱🇻 +371</option>
              <option value="+370">🇱🇹 +370</option>
            </select>
            <input
              type="tel"
              id="partner-phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="20000000"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {t('partneriemPage.formPhoneExample')} {phoneCode === '+371' ? '20000000' : '60000000'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t('partneriemPage.formEmail')} <span className="text-gray-400 font-normal">{t('partneriemPage.formEmailOptional')}</span>
          </label>
          <input
            type="email"
            id="partner-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('partneriemPage.formEmailPlaceholder')}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t('partneriemPage.formNote')} <span className="text-gray-400 font-normal">{t('partneriemPage.formNoteOptional')}</span>
          </label>
          <textarea
            id="partner-note"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t('partneriemPage.formNotePlaceholder')}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {status === 'error' && (
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <div className="flex items-center gap-2">
              ❌ <span>{errorText || t('partneriemPage.formError')}</span>
            </div>
          </div>
        )}

        {status === 'sent' && (
          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <div className="flex items-center gap-2">
              ✅ <span className="font-medium">{t('partneriemPage.formSuccess')}</span>
            </div>
          </div>
        )}

        <button
          type="button"
          disabled={status === 'sending' || !canSubmit}
          onClick={submit}
          className="w-full rounded-lg px-6 py-4 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {status === 'sending' ? t('partneriemPage.formSubmitting') : t('partneriemPage.formSubmit')}
        </button>

        <p className="text-xs text-gray-500 text-center">
          {t('partneriemPage.formConsent')}
        </p>
      </div>
    </div>
  );
}
