'use client';

import { TranslationContext, useTranslationState } from '@/hooks/useTranslation';
import type { Locale } from '@/lib/i18n';

export function TranslationProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const translationState = useTranslationState(initialLocale);

  return (
    <TranslationContext.Provider value={translationState}>
      {children}
    </TranslationContext.Provider>
  );
}
