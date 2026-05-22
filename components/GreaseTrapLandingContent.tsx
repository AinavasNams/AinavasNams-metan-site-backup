'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield, FileText, CheckCircle, Phone, Clock,
  Droplets, Calculator, Wrench, AlertTriangle, MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { trackPageView, trackCTA, trackServiceInterest, trackFormSubmission } from '@/components/Analytics';
import { SimpleContactForm } from '@/components/SimpleContactForm';
import PriorityContacts from '@/components/PriorityContacts';
import { pushFormSubmit, trackPhoneCall } from '@/lib/gtm-events';
import FAQSchema from '@/components/FAQSchema';
import { getFAQsForLocale } from '@/lib/faq-data';

export interface GreaseTrapLandingProps {
  locale: 'lv' | 'ru' | 'en' | 'lt';
  faqKey: string;
  trackingLabel: string;
  badge: string;
  h1: string;
  h1Highlight: string;
  intro: string;
  contactLine: string;
  ctaPrimary: string;
  problemsTitle: string;
  problems: { title: string; desc: string }[];
  whyTitle: string;
  whyPoints: string[];
  pricingTitle: string;
  pricingNote: string;
  zones: { zone: string; range: string; cities: string; price: string }[];
  fogTitle: string;
  fogPoints: string[];
  docsTitle: string;
  docs: string[];
  ctaTitle: string;
  ctaDesc: string;
  ctaReply: string;
  ctaFreeAssessment: string;
  ctaNoObligation: string;
}

export default function GreaseTrapLandingContent(props: GreaseTrapLandingProps) {
  const {
    locale, faqKey, trackingLabel,
    badge, h1, h1Highlight, intro, contactLine, ctaPrimary,
    problemsTitle, problems,
    whyTitle, whyPoints,
    pricingTitle, pricingNote, zones,
    fogTitle, fogPoints,
    docsTitle, docs,
    ctaTitle, ctaDesc, ctaReply, ctaFreeAssessment, ctaNoObligation,
  } = props;

  const faqs = getFAQsForLocale(locale, faqKey);

  useEffect(() => {
    trackPageView(trackingLabel, {
      page_section: 'services',
      page_priority: 'high',
      conversion_potential: 'very_high',
      segment: 'grease_trap',
    });
    trackServiceInterest('grease_trap_cleaning', trackingLabel);
  }, [trackingLabel]);

  const problemIcons = [AlertTriangle, Droplets, FileText];
  const ctaItems = [
    { icon: Clock, text: ctaReply },
    { icon: Calculator, text: ctaFreeAssessment },
    { icon: Shield, text: ctaNoObligation },
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
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">{badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-metan-gray mb-6">
              {h1}
              <span className="text-metan-primary">{h1Highlight}</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-6 max-w-3xl">{intro}</p>
            <p className="text-base text-gray-700 mb-8 max-w-3xl font-medium">{contactLine}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-metan-primary hover:bg-metan-accent text-white"
                asChild
              >
                <Link
                  href="#forma"
                  onClick={() => {
                    trackCTA('hero_cta', trackingLabel, '#forma');
                    pushFormSubmit('grease_trap_inquiry_intent', 'hero_cta', 80);
                    trackFormSubmission('grease_trap_inquiry_intent', { source: 'hero_cta' });
                  }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {ctaPrimary}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="tel:+37127727724"
                  onClick={() => {
                    trackCTA('phone_cta', trackingLabel, 'tel');
                    trackPhoneCall('+371 27 727 724', `${trackingLabel}_hero`);
                  }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  +371 27 727 724
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-12 text-center">
            {problemsTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {problems.map((item, i) => {
              const Icon = problemIcons[i] || AlertTriangle;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-red-100 bg-red-50/30">
                    <CardContent className="p-6">
                      <Icon className="h-10 w-10 text-red-500 mb-4" />
                      <h3 className="text-xl font-semibold text-metan-gray mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-metan-light">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-12 text-center">
            {whyTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4"
              >
                <CheckCircle className="h-6 w-6 text-metan-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOG management */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="h-10 w-10 text-metan-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-metan-gray">{fogTitle}</h2>
            </div>
            <ul className="space-y-3">
              {fogPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-metan-primary flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing zones */}
      <section className="py-16 bg-slate-50">
        <div className="metan-container">
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4 text-center">
            {pricingTitle}
          </h2>
          <p className="text-base text-gray-600 mb-10 max-w-3xl mx-auto text-center">
            {pricingNote}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {zones.map((z, i) => (
              <Card key={i} className="border-metan-light">
                <CardContent className="p-5">
                  <div className="text-sm font-semibold text-metan-primary mb-1">{z.zone}</div>
                  <div className="text-2xl font-bold text-metan-gray mb-2">{z.price}</div>
                  <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {z.range}
                  </div>
                  <div className="text-sm text-gray-500">{z.cities}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-10 w-10 text-metan-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-metan-gray">{docsTitle}</h2>
            </div>
            <ul className="space-y-3">
              {docs.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-metan-primary flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA + Form */}
      <section id="forma" className="py-16 bg-gradient-to-br from-metan-light to-green-50">
        <div className="metan-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-6">{ctaTitle}</h2>
              <p className="text-lg text-gray-600 mb-8">{ctaDesc}</p>
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
