'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Truck, Shield, FileText, CheckCircle, Phone, Clock,
  Wrench, Droplets, Calculator, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { trackPageView, trackCTA, trackServiceInterest, trackFormSubmission } from '@/components/Analytics';
import { SimpleContactForm } from '@/components/SimpleContactForm';
import PriorityContacts from '@/components/PriorityContacts';
import PlainTextContactLine from '@/components/PlainTextContactLine';
import PricingZonesSection from '@/components/PricingZonesSection';
import UcoBarterCalculator from '@/components/UcoBarterCalculator';
import { useTranslation } from '@/hooks/useTranslation';
import { pushFormSubmit, trackPhoneCall, trackCalculatorUse } from '@/lib/gtm-events';
import FAQSchema from '@/components/FAQSchema';
import { getFAQsForLocale } from '@/lib/faq-data';

export default function HorecaContent() {
  const { t, localePath } = useTranslation();
  const locale = localePath('/').split('/')[1] || 'lv';
  const faqs = getFAQsForLocale(locale, 'pakalpojumi/horeca');

  useEffect(() => {
    trackPageView('horeca_landing', {
      page_section: 'services',
      page_priority: 'high',
      conversion_potential: 'very_high',
      segment: 'horeca',
    });
    trackServiceInterest('horeca', 'pakalpojumi_horeca');
  }, []);

  const problems = [
    {
      icon: AlertTriangle,
      title: t('horecaPage.problem1Title'),
      desc: t('horecaPage.problem1Desc'),
    },
    {
      icon: Droplets,
      title: t('horecaPage.problem2Title'),
      desc: t('horecaPage.problem2Desc'),
    },
    {
      icon: FileText,
      title: t('horecaPage.problem3Title'),
      desc: t('horecaPage.problem3Desc'),
    },
  ];

  const steps = [
    { step: '01', title: t('horecaPage.step1Title'), desc: t('horecaPage.step1Desc'), icon: Phone },
    { step: '02', title: t('horecaPage.step2Title'), desc: t('horecaPage.step2Desc'), icon: Truck },
    { step: '03', title: t('horecaPage.step3Title'), desc: t('horecaPage.step3Desc'), icon: Wrench },
    { step: '04', title: t('horecaPage.step4Title'), desc: t('horecaPage.step4Desc'), icon: Shield },
  ];

  const benefits = [
    t('horecaPage.benefit1'),
    t('horecaPage.benefit2'),
    t('horecaPage.benefit3'),
    t('horecaPage.benefit4'),
    t('horecaPage.benefit5'),
    t('horecaPage.benefit6'),
    t('horecaPage.benefit7'),
    t('horecaPage.benefit8'),
  ];

  const ctaItems = [
    { icon: Clock, text: t('horecaPage.ctaReply') },
    { icon: Calculator, text: t('horecaPage.ctaFreeAssessment') },
    { icon: Shield, text: t('horecaPage.ctaNoObligation') },
  ];

  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-metan-light to-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
              {t('horecaPage.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-metan-gray mb-6">
              {t('horecaPage.heroTitle')}
              <span className="text-metan-primary">{t('horecaPage.heroTitleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
              {t('horecaPage.heroDesc')}
            </p>
            <PlainTextContactLine />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-metan-primary hover:bg-metan-accent text-white"
                asChild
              >
                <Link
                  href="#forma"
                  onClick={() => {
                    trackCTA('hero_cta', 'horeca_landing', '#forma');
                    pushFormSubmit('horeca_consultation_intent', 'hero_cta', 60);
                    trackFormSubmission('horeca_consultation_intent', { source: 'hero_cta' });
                  }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('horecaPage.ctaConsultation')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="#uco-calculator"
                  onClick={() => {
                    trackCTA('calculator_cta', 'horeca_landing', '#uco-calculator');
                    trackCalculatorUse('horeca_uco_barter', 0);
                  }}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  {t('horecaPage.ctaCalculator')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-12 text-center">
            {t('horecaPage.problemTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-red-100 bg-red-50/30">
                  <CardContent className="p-6">
                    <item.icon className="h-10 w-10 text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold text-metan-gray mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution — UCO Barter */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-metan-light">
        <div className="metan-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-6">
              {t('horecaPage.solutionTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('horecaPage.solutionDesc')}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-green-200">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-metan-primary text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                      {item.step}
                    </div>
                    <item.icon className="h-8 w-8 text-metan-primary mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-metan-gray mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-12 text-center">
            {t('horecaPage.benefitsTitle')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4"
              >
                <CheckCircle className="h-6 w-6 text-metan-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UCO Barter Calculator */}
      <section className="py-16 bg-slate-50">
        <div className="metan-container">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4">
              {t('ucoCalc.sectionTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('ucoCalc.sectionDesc')}
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <UcoBarterCalculator />
          </div>
        </div>
      </section>

      {/* CTA + Form */}
      <PricingZonesSection />

      <section id="forma" className="py-16 bg-gradient-to-br from-metan-light to-green-50">
        <div className="metan-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-6">
                {t('horecaPage.ctaTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('horecaPage.ctaDesc')}
              </p>
              <div className="space-y-4 mb-8">
                {ctaItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-metan-primary" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
              <PriorityContacts />
            </div>
            <div>
              <SimpleContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
