'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, Shield, Award, Scale, Phone, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackPhoneConversion, trackCTA } from '@/components/Analytics';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export function LegalDocumentation() {
  const router = useRouter();
  const { t } = useTranslation();

  const legalFeatures = [
    { icon: FileCheck, key: 'contracts', gradient: 'from-blue-500 to-blue-600' },
    { icon: Shield, key: 'licensed', gradient: 'from-green-500 to-green-600' },
    { icon: Award, key: 'quality', gradient: 'from-purple-500 to-purple-600' },
    { icon: Scale, key: 'compliance', gradient: 'from-red-500 to-red-600' },
  ];

  const handlePhoneClick = () => {
    trackPhoneConversion('+371 27727724', 'legal_documentation_section');
    trackCTA('call', 'legal_documentation_phone', 'tel:+37127727724');
    if (typeof window !== 'undefined' && window.trackRegistrationClick) {
      window.trackRegistrationClick('phone_button');
    }
  };

  const handleContractRequest = () => {
    trackCTA('contact_form', 'legal_documentation_contract', '/kontakti');
    if (typeof window !== 'undefined' && window.trackRegistrationClick) {
      window.trackRegistrationClick('contract_request');
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4">
            {t('legal.title')}
          </h2>
          <p className="text-lg text-metan-text-light max-w-3xl mx-auto">
            {t('legal.subtitle')}
          </p>
        </motion.div>

        {/* Legal Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {legalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="metan-card h-full group hover:scale-105 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-lg text-metan-gray">
                    {t(`legal.features.${feature.key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-metan-text mb-4">
                    {t(`legal.features.${feature.key}.desc`)}
                  </p>
                  <div className="space-y-2">
                    {[1, 2, 3].map((idx) => (
                      <div key={idx} className="flex items-start text-xs text-metan-text-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-metan-accent mr-2 mt-1.5 flex-shrink-0"></div>
                        {t(`legal.features.${feature.key}.item${idx}`)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Documentation Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-metan-light/50 to-white rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-metan-gray text-center mb-8">
            {t('legal.process.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-metan-primary to-metan-accent flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                  {step}
                </div>
                <h4 className="font-semibold text-metan-gray mb-2">
                  {t(`legal.process.step${step}.title`)}
                </h4>
                <p className="text-sm text-metan-text-light">
                  {t(`legal.process.step${step}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-metan-primary/5 to-metan-accent/5 rounded-2xl p-8 border border-metan-primary/10">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-metan-primary mr-3" />
              <h3 className="text-xl font-bold text-metan-gray">
                {t('legal.cta.title')}
              </h3>
            </div>
            <p className="text-metan-text mb-6 max-w-2xl mx-auto">
              {t('legal.cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+37127727724" onClick={handlePhoneClick}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-metan-primary to-metan-accent hover:from-metan-primary/90 hover:to-metan-accent/90 text-white px-8"
                  data-macaly="legal-docs-phone-cta"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  +371 27727724
                </Button>
              </a>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-metan-primary text-metan-primary hover:bg-metan-light"
                asChild
                data-macaly="legal-docs-contract-cta"
              >
                <Link href="/kontakti" onClick={handleContractRequest}>
                  <FileCheck className="h-5 w-5 mr-2" />
                  {t('legal.cta.requestContract')}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
