'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { trackPageView, trackCTA } from '@/components/Analytics';
import { pushFormSubmit, trackPhoneCall, trackCalculatorUse } from '@/lib/gtm-events';

export default function HorecaContent() {
  const { t, localePath } = useTranslation();

  useEffect(() => {
    trackPageView('horeca_root_landing', {
      page_section: 'services',
      segment: 'horeca',
    });
  }, []);

  const steps = [
    { title: t('horecaPage.rootStep1Title'), desc: t('horecaPage.rootStep1Desc') },
    { title: t('horecaPage.rootStep2Title'), desc: t('horecaPage.rootStep2Desc') },
    { title: t('horecaPage.rootStep3Title'), desc: t('horecaPage.rootStep3Desc') },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-[#F0F7F4] text-[#1A1A1A] font-sans">
      <section className="bg-[#1B4332] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Montserrat']">
            {t('horecaPage.rootHeroTitle')}
          </h1>
          <p className="text-xl mb-8">
            {t('horecaPage.rootHeroDesc')}
          </p>
          <Link
            href={localePath("/roi_kalkulators")}
            className="bg-[#40916C] hover:bg-[#2D6A4F] text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg inline-block"
            onClick={() => {
              trackCTA('hero_cta', 'horeca_root', '/roi_kalkulators');
              trackCalculatorUse('horeca_roi', 0);
            }}
          >
            {t('horecaPage.rootCtaCalc')}
          </Link>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#2D6A4F] font-['Montserrat']">
            {t('horecaPage.rootProblemTitle')}
          </h2>
          <p className="text-lg mb-6">
            {t('horecaPage.rootProblemDesc')}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#2D6A4F] font-['Montserrat']">
            {t('horecaPage.rootSolutionTitle')}
          </h2>
          <p className="text-lg text-center">
            {t('horecaPage.rootSolutionDesc')}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#2D6A4F] font-['Montserrat']">
            {t('horecaPage.rootHowTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-[#40916C]">
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2D6A4F] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-['Montserrat']">
            {t('horecaPage.rootCtaTitle')}
          </h2>
          <Link
            href={localePath("/roi_kalkulators")}
            className="bg-white text-[#2D6A4F] hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors text-lg inline-block mb-6"
            onClick={() => {
              trackCTA('bottom_cta', 'horeca_root', '/roi_kalkulators');
              trackCalculatorUse('horeca_roi_bottom', 0);
              pushFormSubmit('horeca_calc_intent', 'bottom_cta', 40);
            }}
          >
            {t('horecaPage.rootCtaCalc')}
          </Link>
        </div>
      </section>
    </main>
  );
}
