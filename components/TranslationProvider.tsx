'use client';

import { TranslationContext, useTranslationState } from '@/hooks/useTranslation';

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const translationState = useTranslationState();

  return (
    <TranslationContext.Provider value={translationState}>
      {children}
    </TranslationContext.Provider>
  );
}