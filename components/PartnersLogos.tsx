'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const partners = [
  {
    name: 'Latvijas Pašvaldību Savienība',
    category: 'Pašvaldību partneris',
    logo: '🏛️',
    description: 'Sertificēts pakalpojumu sniedzējs',
  },
  {
    name: 'HoReCa Latvija',
    category: 'Industrijas asociācija',
    logo: '🍽️',
    description: 'Oficiāls atkritumu apsaimniekotājs',
  },
  {
    name: 'Latvijas Vides Fonds',
    category: 'Vides organizācija',
    logo: '🌿',
    description: 'Atbalstīts projekts',
  },
  {
    name: 'ALTUM',
    category: 'Finanšu partneris',
    logo: '💰',
    description: 'Investīciju atbalsts',
  },
  {
    name: 'RED II Sertifikācija',
    category: 'Starptautiskā sertifikācija',
    logo: '✅',
    description: 'Atjaunojamās enerģijas direktīva',
  },
  {
    name: 'ISCC Certification',
    category: 'Kvalitātes standarts',
    logo: '🔒',
    description: 'Ilgtspējības sertifikāts',
  },
  {
    name: 'VVD',
    category: 'Valsts kontrole',
    logo: '🏢',
    description: 'Licencēts pakalpojumu sniedzējs',
  },
  {
    name: 'Zemgales Enerģijas Parks',
    category: 'Tehniskais partneris',
    logo: '⚡',
    description: 'Biogāzes ražošana',
  },
];

const certifications = [
  {
    title: 'VVD Licence Nr. LI-1234',
    description: 'Atkritumu apsaimniekošana',
    icon: '📋',
    status: 'Aktīva',
  },
  {
    title: 'PVD Licence Nr. PV-5678',
    description: 'Ūdens apsaimniekošana',
    icon: '💧',
    status: 'Aktīva',
  },
  {
    title: 'ISO 14001:2015',
    description: 'Vides pārvaldības sistēma',
    icon: '🌍',
    status: 'Sertificēts',
  },
  {
    title: 'HACCP',
    description: 'Pārtikas drošības standarts',
    icon: '🔬',
    status: 'Sertificēts',
  },
];

export function PartnersLogos() {
  console.log('PartnersLogos component rendered');

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
            Mūsu partneri un sertifikācijas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Strādājam ar uzticamiem partneriem un esam sertificēti visās nepieciešamajās jomās
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg p-4 text-center"
            >
              <div className="text-3xl mb-2">{partner.logo}</div>
              <div className="text-sm font-semibold text-metan-gray mb-1">{partner.name}</div>
              <div className="text-xs text-metan-accent font-medium mb-1">{partner.category}</div>
              <div className="text-xs text-gray-600">{partner.description}</div>
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
          <h3 className="text-2xl font-bold text-metan-gray mb-2">Licence un sertifikāti</h3>
          <p className="text-gray-600">Visas nepieciešamās atļaujas un kvalitātes apliecinājumi</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="metan-card text-center relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                    {cert.status}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="text-2xl mb-3">{cert.icon}</div>
                  <div className="font-semibold text-metan-gray mb-1 text-sm">{cert.title}</div>
                  <div className="text-xs text-gray-600">{cert.description}</div>
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
              <span className="font-semibold text-metan-gray">100% LEGĀLI UN SERTIFICĒTI PAKALPOJUMI</span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-metan-text">
              Visi mūsu pakalpojumi atbilst VVD, PVD un starptautiskajiem standartiem. 
              Mēs garantējam pilnu dokumentācijas atbilstību un izsekojamību.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}