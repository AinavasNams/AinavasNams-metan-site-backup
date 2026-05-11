'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, FileCheck, HelpCircle, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackPhoneConversion, trackCTA } from '@/components/Analytics';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export function FrequentlyAskedQuestions() {
  const router = useRouter();
  const { t } = useTranslation();

  const faqData = [
    { id: 'blocked-separator', icon: AlertTriangle, qKey: 'faq.q1.question', aKey: 'faq.q1.answer', gradient: 'from-red-500 to-red-600', urgent: true },
    { id: 'where-dispose', icon: MapPin, qKey: 'faq.q2.question', aKey: 'faq.q2.answer', gradient: 'from-green-500 to-green-600', urgent: false },
    { id: 'contract-process', icon: FileCheck, qKey: 'faq.q3.question', aKey: 'faq.q3.answer', gradient: 'from-blue-500 to-blue-600', urgent: false },
    { id: 'required-documents', icon: HelpCircle, qKey: 'faq.q4.question', aKey: 'faq.q4.answer', gradient: 'from-purple-500 to-purple-600', urgent: false },
  ];

  const handlePhoneClick = () => {
    trackPhoneConversion('+371 27727724', 'faq_section');
    trackCTA('call', 'faq_phone', 'tel:+37127727724');
    if (typeof window !== 'undefined' && window.trackRegistrationClick) {
      window.trackRegistrationClick('faq_phone_button');
    }
  };

  const handleQuestionSubmit = () => {
    trackCTA('contact_form', 'faq_question', '/kontakti');
    if (typeof window !== 'undefined' && window.trackRegistrationClick) {
      window.trackRegistrationClick('ask_question');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-metan-text-light max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="hover:no-underline px-6 py-4 text-left">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${faq.gradient} flex items-center justify-center mr-4 flex-shrink-0`}>
                        <faq.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-metan-gray">
                          {t(faq.qKey)}
                        </h3>
                        {faq.urgent && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                            {t('faq.urgent')}
                          </span>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100">
                      <div className="prose prose-sm max-w-none text-metan-text">
                        {t(faq.aKey).split('\n\n').map((paragraph: string, idx: number) => (
                          <p key={idx} className="mb-4 last:mb-0 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Additional Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-metan-gray mb-4 text-center">
                {t('faq.additional.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-metan-accent mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-sm text-metan-text-light">{t(`faq.additional.q${idx}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-metan-primary/5 to-metan-accent/5 rounded-2xl p-8 border border-metan-primary/10">
              <h3 className="text-xl font-bold text-metan-gray mb-4">
                {t('faq.contact.title')}
              </h3>
              <p className="text-metan-text mb-6">
                {t('faq.contact.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="tel:+37127727724" onClick={handlePhoneClick}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-metan-primary to-metan-accent hover:from-metan-primary/90 hover:to-metan-accent/90 text-white px-8"
                    data-macaly="faq-phone-cta"
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
                  data-macaly="faq-question-cta"
                >
                  <Link href="/kontakti" onClick={handleQuestionSubmit}>
                    <Mail className="h-5 w-5 mr-2" />
                    {t('faq.contact.askQuestion')}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
