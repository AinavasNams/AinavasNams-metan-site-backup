'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

export function PartnersLogos() {
  const { t } = useTranslation();

  const partnerKeys = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'];
  const certKeys = ['c1', 'c2', 'c3', 'c4', 'c5'];

  const partnerEmojis = ['🏛️', '🍽️', '🌿', '💰', '✅', '🔒', '🏢', '⚡'];
  const certEmojis = ['📋', '💧', '🌍', '🔬'];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="metan-container">
        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4" data-macaly="partners-title">
            {t('partnersLogos.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('partnersLogos.subtitle')}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-16">
          {partnerKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg p-4 text-center"
            >
              <div className="text-3xl mb-2">{partnerEmojis[index]}</div>
              <div className="text-sm font-semibold text-metan-gray mb-1">{t(`partnersLogos.partners.${key}.name`)}</div>
              <div className="text-xs text-metan-accent font-medium mb-1">{t(`partnersLogos.partners.${key}.category`)}</div>
              <div className="text-xs text-gray-600">{t(`partnersLogos.partners.${key}.desc`)}</div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold text-metan-gray mb-2">{t('partnersLogos.certTitle')}</h3>
          <p className="text-gray-600">{t('partnersLogos.certSubtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="metan-card text-center relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                    {t(`partnersLogos.certs.${key}.status`)}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="text-2xl mb-3">{certEmojis[index]}</div>
                  <div className="font-semibold text-metan-gray mb-1 text-sm">{t(`partnersLogos.certs.${key}.title`)}</div>
                  <div className="text-xs text-gray-600">{t(`partnersLogos.certs.${key}.desc`)}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-metan-light rounded-xl p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-metan-gray">{t('partnersLogos.trustStatement')}</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-metan-text">
              {t('partnersLogos.trustDesc')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
