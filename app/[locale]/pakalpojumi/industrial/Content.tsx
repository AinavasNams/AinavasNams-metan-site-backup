'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Truck, Shield, FileText, CheckCircle, Phone, Clock,
  Recycle, Calculator, AlertTriangle, Scale, Factory
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { trackPageView, trackCTA, trackServiceInterest, trackFormSubmission } from '@/components/Analytics';
import { SimpleContactForm } from '@/components/SimpleContactForm';
import PriorityContacts from '@/components/PriorityContacts';
import PlainTextContactLine from '@/components/PlainTextContactLine';
import PricingZonesSection from '@/components/PricingZonesSection';
import { useTranslation } from '@/hooks/useTranslation';
import { pushFormSubmit, trackPhoneCall } from '@/lib/gtm-events';
import FAQSchema from '@/components/FAQSchema';
import { getFAQsForLocale } from '@/lib/faq-data';

export default function IndustrialContent() {
  const { t, localePath } = useTranslation();
  const locale = localePath('/').split('/')[1] || 'lv';
  const faqs = getFAQsForLocale(locale, 'pakalpojumi/industrial');

  useEffect(() => {
    trackPageView('industrial_landing', {
      page_section: 'services',
      page_priority: 'high',
      conversion_potential: 'very_high',
      segment: 'industrial',
    });
    trackServiceInterest('industrial', 'pakalpojumi_industrial');
  }, []);

  const risks = [
    {
      icon: Scale,
      title: t('industrialPage.risk1Title'),
      desc: t('industrialPage.risk1Desc'),
      severity: t('industrialPage.risk1Severity'),
    },
    {
      icon: Factory,
      title: t('industrialPage.risk2Title'),
      desc: t('industrialPage.risk2Desc'),
      severity: t('industrialPage.risk2Severity'),
    },
    {
      icon: AlertTriangle,
      title: t('industrialPage.risk3Title'),
      desc: t('industrialPage.risk3Desc'),
      severity: t('industrialPage.risk3Severity'),
    },
  ];

  const certCards = [
    { title: t('industrialPage.cert1Title'), desc: t('industrialPage.cert1Desc'), icon: FileText },
    { title: t('industrialPage.cert2Title'), desc: t('industrialPage.cert2Desc'), icon: Shield },
    { title: t('industrialPage.cert3Title'), desc: t('industrialPage.cert3Desc'), icon: Clock },
    { title: t('industrialPage.cert4Title'), desc: t('industrialPage.cert4Desc'), icon: Recycle },
  ];

  const steps = [
    { step: '01', title: t('industrialPage.step1Title'), desc: t('industrialPage.step1Desc') },
    { step: '02', title: t('industrialPage.step2Title'), desc: t('industrialPage.step2Desc') },
    { step: '03', title: t('industrialPage.step3Title'), desc: t('industrialPage.step3Desc') },
    { step: '04', title: t('industrialPage.step4Title'), desc: t('industrialPage.step4Desc') },
  ];

  const benefits = [
    t('industrialPage.benefit1'),
    t('industrialPage.benefit2'),
    t('industrialPage.benefit3'),
    t('industrialPage.benefit4'),
    t('industrialPage.benefit5'),
    t('industrialPage.benefit6'),
    t('industrialPage.benefit7'),
    t('industrialPage.benefit8'),
  ];

  const ctaItems = [
    { icon: Clock, text: t('industrialPage.ctaReply') },
    { icon: Calculator, text: t('industrialPage.ctaFreeAudit') },
    { icon: Shield, text: t('industrialPage.ctaNoObligation') },
    { icon: FileText, text: t('industrialPage.ctaDocs') },
  ];

  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-metan-light">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              {t('industrialPage.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-metan-gray mb-6">
              {t('industrialPage.heroTitle')}
              <span className="text-metan-primary">{t('industrialPage.heroTitleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
              {t('industrialPage.heroDesc')}
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
                    trackCTA('hero_cta', 'industrial_landing', '#forma');
                    pushFormSubmit('industrial_offer_intent', 'hero_cta', 70);
                    trackFormSubmission('industrial_offer_intent', { source: 'hero_cta' });
                  }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('industrialPage.ctaOffer')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="#forma"
                  onClick={() => {
                    trackCTA('audit_cta', 'industrial_landing', '#forma');
                  }}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  {t('industrialPage.ctaFreeAudit')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance Risks */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-12 text-center">
            {t('industrialPage.risksTitle')}
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

      {/* Solution — Certified Service */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-metan-light">
        <div className="metan-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-6">
              {t('industrialPage.certTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('industrialPage.certDesc')}
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
                <Card className="h-full border-blue-200">
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
            {t('industrialPage.processTitle')}
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
            {t('industrialPage.whyTitle')}
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
      <PricingZonesSection />

      <section id="forma" className="py-16 bg-gradient-to-br from-metan-light to-green-50">
        <div className="metan-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-6">
                {t('industrialPage.ctaTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('industrialPage.ctaDesc')}
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
