'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield, FileText, CheckCircle, Phone, Clock,
  Calculator, AlertTriangle, Warehouse, MoonStar, Droplets
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

export default function LogisticsContent() {
  const { t, localePath } = useTranslation();
  const locale = localePath('/').split('/')[1] || 'lv';
  const faqs = getFAQsForLocale(locale, 'pakalpojumi/logistics');

  useEffect(() => {
    trackPageView('logistics_landing', {
      page_section: 'services',
      page_priority: 'high',
      conversion_potential: 'very_high',
      segment: 'logistics',
    });
    trackServiceInterest('logistics', 'pakalpojumi_logistics');
  }, []);

  const risks = [
    {
      icon: Droplets,
      title: t('logisticsPage.risk1Title'),
      desc: t('logisticsPage.risk1Desc'),
      severity: t('logisticsPage.risk1Severity'),
    },
    {
      icon: Warehouse,
      title: t('logisticsPage.risk2Title'),
      desc: t('logisticsPage.risk2Desc'),
      severity: t('logisticsPage.risk2Severity'),
    },
    {
      icon: AlertTriangle,
      title: t('logisticsPage.risk3Title'),
      desc: t('logisticsPage.risk3Desc'),
      severity: t('logisticsPage.risk3Severity'),
    },
  ];

  const certCards = [
    { title: t('logisticsPage.cert1Title'), desc: t('logisticsPage.cert1Desc'), icon: Warehouse },
    { title: t('logisticsPage.cert2Title'), desc: t('logisticsPage.cert2Desc'), icon: MoonStar },
    { title: t('logisticsPage.cert3Title'), desc: t('logisticsPage.cert3Desc'), icon: Droplets },
    { title: t('logisticsPage.cert4Title'), desc: t('logisticsPage.cert4Desc'), icon: Shield },
  ];

  const steps = [
    { step: '01', title: t('logisticsPage.step1Title'), desc: t('logisticsPage.step1Desc') },
    { step: '02', title: t('logisticsPage.step2Title'), desc: t('logisticsPage.step2Desc') },
    { step: '03', title: t('logisticsPage.step3Title'), desc: t('logisticsPage.step3Desc') },
    { step: '04', title: t('logisticsPage.step4Title'), desc: t('logisticsPage.step4Desc') },
  ];

  const benefits = [
    t('logisticsPage.benefit1'),
    t('logisticsPage.benefit2'),
    t('logisticsPage.benefit3'),
    t('logisticsPage.benefit4'),
    t('logisticsPage.benefit5'),
    t('logisticsPage.benefit6'),
    t('logisticsPage.benefit7'),
    t('logisticsPage.benefit8'),
  ];

  const ctaItems = [
    { icon: Clock, text: t('logisticsPage.ctaReply') },
    { icon: Calculator, text: t('logisticsPage.ctaFreeAudit') },
    { icon: Shield, text: t('logisticsPage.ctaNoObligation') },
    { icon: FileText, text: t('logisticsPage.ctaDocs') },
  ];

  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-metan-light">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-100">
              {t('logisticsPage.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-metan-gray mb-6">
              {t('logisticsPage.heroTitle')}
              <span className="text-metan-primary">{t('logisticsPage.heroTitleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
              {t('logisticsPage.heroDesc')}
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
                    trackCTA('hero_cta', 'logistics_landing', '#forma');
                    pushFormSubmit('logistics_offer_intent', 'hero_cta', 70);
                    trackFormSubmission('logistics_offer_intent', { source: 'hero_cta' });
                  }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('logisticsPage.ctaOffer')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="#forma"
                  onClick={() => {
                    trackCTA('audit_cta', 'logistics_landing', '#forma');
                  }}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  {t('logisticsPage.ctaFreeAudit')}
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
            {t('logisticsPage.risksTitle')}
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
              {t('logisticsPage.certTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('logisticsPage.certDesc')}
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
                <Card className="h-full border-orange-200">
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
            {t('logisticsPage.processTitle')}
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
            {t('logisticsPage.whyTitle')}
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
                {t('logisticsPage.ctaTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('logisticsPage.ctaDesc')}
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
