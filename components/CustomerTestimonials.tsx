'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function CustomerTestimonials() {
  const { t } = useTranslation();

  const testimonialKeys = ['t1', 't2', 't3', 't4', 't5', 't6'];

  return (
    <section className="py-20 bg-gray-50">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-metan-gray mb-4" data-macaly="testimonials-title">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="metan-card h-full relative">
                <Quote className="absolute top-4 right-4 h-6 w-6 text-metan-accent/30" />
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    &ldquo;{t(`testimonials.items.${key}.text`)}&rdquo;
                  </p>

                  {/* Customer Info */}
                  <div className="border-t pt-4">
                    <div className="font-semibold text-metan-gray">{t(`testimonials.items.${key}.name`)}</div>
                    <div className="text-sm text-metan-accent font-medium">{t(`testimonials.items.${key}.position`)}</div>
                    <div className="text-sm text-gray-600">{t(`testimonials.items.${key}.company`)}</div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      {t(`testimonials.items.${key}.location`)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-metan-primary">{t('testimonials.trust.clients')}</div>
                <div className="text-sm text-gray-600">{t('testimonials.trust.clientsLabel')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-metan-primary">{t('testimonials.trust.compliance')}</div>
                <div className="text-sm text-gray-600">{t('testimonials.trust.complianceLabel')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-metan-primary">{t('testimonials.trust.emergency')}</div>
                <div className="text-sm text-gray-600">{t('testimonials.trust.emergencyLabel')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
