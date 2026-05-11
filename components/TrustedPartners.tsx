'use client';

import { motion } from 'framer-motion';
import { Building2, Truck, Factory, Handshake } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function TrustedPartners() {
  const { t } = useTranslation();

  const partnerIcons = [Building2, Factory, Handshake, Truck];
  const partnerKeys = ['p1', 'p2', 'p3', 'p4'];

  const clientLogos = [
    'SIA "NS ESTATE"',
    'SIA "Unda"',
    'SIA "Zvejnieku saimniecība Irbe"',
    'SIA "Banga LTD"',
    'SIA "Caverion Latvija"',
    'SIA "Liedags"',
    'SIA Puratos Latvia',
    'UAB "Baltijos delikatesai"',
    'AS "Ventspils zivju konservu kombināts"',
    'SIA "Latvian Fish Factory"',
    'SIA "Bio-Venta"',
    'DG TERMINALS'
  ];

  return (
    <div className="py-16 bg-white">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-metan-gray mb-4">
            {t('trustedPartners.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('trustedPartners.subtitle')}
          </p>
        </motion.div>

        {/* Tehnoloģiskie partneri */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-center text-gray-900 mb-8">
            {t('trustedPartners.techTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerKeys.map((key, index) => {
              const Icon = partnerIcons[index];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-metan-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-metan-primary" />
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {t(`trustedPartners.partners.${key}.name`)}
                  </h4>
                  
                  <p className="text-sm text-metan-primary font-medium mb-2">
                    {t(`trustedPartners.partners.${key}.type`)}
                  </p>
                  
                  <p className="text-xs text-gray-600">
                    {t(`trustedPartners.partners.${key}.desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Klienti */}
        <div>
          <h3 className="text-xl font-semibold text-center text-gray-900 mb-8">
            {t('trustedPartners.clientsTitle')}
          </h3>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {clientLogos.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-center bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {client}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-metan-primary/10 rounded-full px-6 py-3">
            <Handshake className="h-5 w-5 text-metan-primary" />
            <span className="text-metan-primary font-semibold">
              {t('trustedPartners.activeClients')}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
