'use client';

import { Award, Shield, FileCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CertificatesSection() {
  const certificates = [
    {
      name: 'VVD Atļauja',
      code: 'AP25AA0011',
      description: 'Atkritumu apsaimniekošanas atļauja',
      icon: FileCheck,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'PVD Licence',
      code: 'ER0266',
      description: 'Elektroenerģijas ražošanas licence',
      icon: Award,
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'ISCC Sertifikāts',
      code: 'ISCC-EU-XXX',
      description: 'Ilgtspējīgas enerģijas sertifikācija',
      icon: Shield,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      name: 'RED II Atbilstība',
      code: 'RED2-LV-2024',
      description: 'Atjaunojamo energoresursu direktīva',
      icon: Star,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-metan-gray mb-4">
            Licences un sertifikācija
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mūsu darbība ir pilnībā licencēta un sertificēta atbilstoši Latvijas un ES prasībām
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 rounded-full ${cert.color} flex items-center justify-center mb-4`}>
                <cert.icon className="h-7 w-7" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {cert.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3">
                {cert.description}
              </p>
              
              <div className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-1 rounded">
                {cert.code}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-metan-light rounded-full px-6 py-3">
            <Shield className="h-5 w-5 text-metan-primary" />
            <span className="text-metan-primary font-semibold">
              Pilna atbilstība VVD, PVD, VID un APUS prasībām
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}