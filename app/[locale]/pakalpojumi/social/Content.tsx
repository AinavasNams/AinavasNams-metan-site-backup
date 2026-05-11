'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield, FileText, CheckCircle, Phone, Clock,
  Calculator, AlertTriangle, Heart, Volume2, CalendarClock
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { trackPageView, trackCTA, trackServiceInterest, trackFormSubmission } from '@/components/Analytics';
import { SimpleContactForm } from '@/components/SimpleContactForm';
import PriorityContacts from '@/components/PriorityContacts';
import { useTranslation } from '@/hooks/useTranslation';
import { pushFormSubmit, trackPhoneCall } from '@/lib/gtm-events';
import FAQSchema from '@/components/FAQSchema';
import { getFAQsForLocale } from '@/lib/faq-data';

export default function SocialContent() {
  const { t, localePath } = useTranslation();
  const locale = localePath('/').split('/')[1] || 'lv';
  const faqs = getFAQsForLocale(locale, 'pakalpojumi/social');

  useEffect(() => {
    trackPageView('social_landing', {
      page_section: 'services',
      page_priority: 'high',
      conversion_potential: 'very_high',
      segment: 'social',
    });
    trackServiceInterest('social', 'pakalpojumi_social');
  }, []);

  const risks = [
    {
      icon: AlertTriangle,
      title: t('socialPage.risk1Title'),
      desc: t('socialPage.risk1Desc'),
      severity: t('socialPage.risk1Severity'),
    },
    {
      icon: Heart,
      title: t('socialPage.risk2Title'),
      desc: t('socialPage.risk2Desc'),
      severity: t('socialPage.risk2Severity'),
    },
    {
      icon: Calculator,
      title: t('socialPage.risk3Title'),
      desc: t('socialPage.risk3Desc'),
      severity: t('socialPage.risk3Severity'),
    },
  ];

  const certCards = [
    { title: t('socialPage.cert1Title'), desc: t('socialPage.cert1Desc'), icon: Volume2 },
    { title: t('socialPage.cert2Title'), desc: t('socialPage.cert2Desc'), icon: CalendarClock },
    { title: t('socialPage.cert3Title'), desc: t('socialPage.cert3Desc'), icon: FileText },
    { title: t('socialPage.cert4Title'), desc: t('socialPage.cert4Desc'), icon: Shield },
  ];

  const steps = [
    { step: '01', title: t('socialPage.step1Title'), desc: t('socialPage.step1Desc') },
    { step: '02', title: t('socialPage.step2Title'), desc: t('socialPage.step2Desc') },
    { step: '03', title: t('socialPage.step3Title'), desc: t('socialPage.step3Desc') },
    { step: '04', title: t('socialPage.step4Title'), desc: t('socialPage.step4Desc') },
  ];

  const benefits = [
    t('socialPage.benefit1'),
    t('socialPage.benefit2'),
    t('socialPage.benefit3'),
    t('socialPage.benefit4'),
    t('socialPage.benefit5'),
    t('socialPage.benefit6'),
    t('socialPage.benefit7'),
    t('socialPage.benefit8'),
  ];

  const ctaItems = [
    { icon: Clock, text: t('socialPage.ctaReply') },
    { icon: Calculator, text: t('socialPage.ctaFreeAudit') },
    { icon: Shield, text: t('socialPage.ctaNoObligation') },
    { icon: FileText, text: t('socialPage.ctaDocs') },
  ];

  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-metan-light">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100">
              {t('socialPage.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-metan-gray mb-6">
              {t('socialPage.heroTitle')}
              <span className="text-metan-primary">{t('socialPage.heroTitleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
              {t('socialPage.heroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-metan-primary hover:bg-metan-accent text-white"
                asChild
              >
                <Link
                  href="#forma"
                  onClick={() => {
                    trackCTA('hero_cta', 'social_landing', '#forma');
                    pushFormSubmit('social_offer_intent', 'hero_cta', 70);
                    trackFormSubmission('social_offer_intent', { source: 'hero_cta' });
                  }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('socialPage.ctaOffer')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="#forma"
                  onClick={() => {
                    trackCTA('audit_cta', 'social_landing', '#forma');
                  }}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  {t('socialPage.ctaFreeAudit')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Risks */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-12 text-center">
            {t('socialPage.risksTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {risks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-red-100 bg-red-50/30">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <item.icon className="h-10 w-10 text-red-500" />
                      <Badge variant="destructive" className="text-xs">{item.severity}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-metan-gray mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-metan-light">
        <div className="metan-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-6">
              {t('socialPage.certTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('socialPage.certDesc')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certCards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-purple-200">
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-10 w-10 text-metan-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-metan-gray mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-12 text-center">
            {t('socialPage.processTitle')}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-metan-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-metan-gray mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-slate-50">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-12 text-center">
            {t('socialPage.whyTitle')}
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

      {/* CTA + Form */}
      <section id="forma" className="py-16 bg-gradient-to-br from-metan-light to-green-50">
        <div className="metan-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-6">
                {t('socialPage.ctaTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('socialPage.ctaDesc')}
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
