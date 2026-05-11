'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Wrench, FileCheck, Shield, ArrowRight, CheckCircle, Phone, Calculator } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SEOStructuredData } from '@/components/SEOHead';
import { servicesStructuredData } from './metadata';
import PriorityContacts from '@/components/PriorityContacts';
import {
  trackPageView,
  trackUserJourney,
  trackServiceInterest,
  trackCTA,
} from '@/components/Analytics';
import { trackContactMethod } from '@/lib/analytics';
import { CustomerTestimonials } from '@/components/CustomerTestimonials';
import { EnhancedCTA } from '@/components/EnhancedCTA';
import { SimpleContactForm } from '@/components/SimpleContactForm';

const serviceIcons = [Truck, Truck, Wrench, FileCheck];
const serviceHrefs = ['/pakalpojumi/savaksana', '/pakalpojumi/savaksana', '/pakalpojumi/apstrade', '/pakalpojumi'];
const serviceKeys = ['s1', 's2', 's3', 's4'] as const;
const benefitKeys = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'] as const;

export default function ServicesPage() {
  const router = useRouter();
  const { t, localePath } = useTranslation();

  useEffect(() => {
    trackPageView('services_page', {
      page_section: 'services',
      page_priority: 'high',
      conversion_potential: 'high',
    });

    trackUserJourney('services_page_visit', {
      page_type: 'service_catalog',
      intent: 'service_research',
      funnel_stage: 'high_intent',
    });
  }, []);

  const handleServiceClick = (serviceName: string, destination: string) => {
    trackServiceInterest(serviceName, 'services_page', {
      service_type: serviceName,
      click_location: 'service_card',
      intent: 'detailed_research',
    });
    trackCTA('service_details', 'services_page', destination);
  };

  const handleCTAClick = (ctaType: string, destination: string) => {
    trackCTA(ctaType, 'services_page', destination);
    if (ctaType === 'contact_now') {
      trackContactMethod('form', 'services_page', 'services_page');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOStructuredData data={servicesStructuredData} />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-metan-light to-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-metan-gray mb-6">
              {t('pakalpojumiPage.heroTitle')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {t('pakalpojumiPage.heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="tel:+37127727724">
                <Button
                  size="lg"
                  className="metan-button-primary"
                  onClick={() => handleCTAClick('phone_call', 'tel:+37127727724')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('pakalpojumiPage.callButton')}
                </Button>
              </a>
              <Link href={localePath("/#calculator")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-metan-primary text-metan-primary hover:bg-metan-primary hover:text-white"
                  onClick={() => handleCTAClick('calculator', '/#calculator')}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  {t('pakalpojumiPage.calcButton')}
                </Button>
              </Link>
              <Link href={localePath("/kontakti")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-metan-primary text-metan-primary hover:bg-metan-primary hover:text-white"
                  onClick={() => handleCTAClick('contact_form', '/kontakti')}
                >
                  <FileCheck className="mr-2 h-5 w-5" />
                  {t('pakalpojumiPage.applyButton')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="metan-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {serviceKeys.map((key, index) => {
              const Icon = serviceIcons[index];
              const href = serviceHrefs[index];
              const isPopular = index === 0;
              const isCertified = index === 3;
              const serviceTitle = t(`pakalpojumiPage.services.${key}.title`);
              const featureKeys = ['f1', 'f2', 'f3', 'f4'] as const;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="metan-card h-full relative bg-white" style={{ backgroundColor: 'white' }}>
                    {isPopular && (
                      <Badge className="absolute -top-2 right-4 bg-metan-accent text-white">
                        {t('pakalpojumiPage.badgePopular')}
                      </Badge>
                    )}
                    {isCertified && (
                      <Badge className="absolute -top-2 right-4 bg-metan-accent text-white">
                        {t('pakalpojumiPage.badgeCertified')}
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="w-12 h-12 bg-metan-gradient rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{serviceTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6" style={{ backgroundColor: 'white' }}>
                      <p className="text-gray-600">{t(`pakalpojumiPage.services.${key}.desc`)}</p>

                      <div className="space-y-2">
                        {featureKeys.map((fk) => (
                          <div key={fk} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-metan-accent flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              {t(`pakalpojumiPage.services.${key}.${fk}`)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                          className="w-full justify-center metan-button-primary group text-sm flex-1"
                          asChild
                        >
                          <Link href={localePath(href)} onClick={() => handleServiceClick(serviceTitle, href)}>
                            {t('pakalpojumiPage.learnMore')}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                        <a href="tel:+37127727724" className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full justify-center border-metan-primary text-metan-primary hover:bg-metan-primary hover:text-white text-sm"
                            onClick={() => handleCTAClick('phone_call', 'tel:+37127727724')}
                          >
                            {t('pakalpojumiPage.callNow')}
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">{t('pakalpojumiPage.whyUs')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <Shield className="h-5 w-5 text-metan-accent flex-shrink-0" />
                <span className="font-medium text-gray-700">{t(`pakalpojumiPage.benefits.${key}`)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <CustomerTestimonials />

      {/* Enhanced CTA Section */}
      <EnhancedCTA variant="services" />

      {/* Simple Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <SimpleContactForm variant="full" title={t('pakalpojumiPage.submitTitle')} />
        </div>
      </section>

      {/* Priority Contacts Section */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <PriorityContacts variant="full" />
        </div>
      </section>

      {/* Hidden SEO content */}
      <div style={{ display: 'none' }}>
        <p>tauku atdalītāju tīrīšana VVD PVD atļaujas legāla utilizācija</p>
        <p>eļļas savākšana HoReCa klienti vakuuma mašīnas biometāna izejvielas</p>
        <p>augstspiediena skalošana kanalizācijas tīrīšana nosprostojumu novēršana</p>
        <p>sertificēti atkritumu apsaimniekošanas pakalpojumi dokumentācija izsekojamība</p>
      </div>
    </div>
  );
}
