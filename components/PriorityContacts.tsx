'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Globe, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trackPhoneConversion } from '@/components/Analytics';

interface PriorityContactsProps {
  variant?: 'full' | 'short';
  className?: string;
}

export default function PriorityContacts({ variant = 'full', className = '' }: PriorityContactsProps) {
  console.log('PriorityContacts rendered with variant:', variant);

  if (variant === 'short') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`bg-teal-50 border border-teal-200 rounded-lg p-4 ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-900">
              Tehniskais servisa vadītājs – 
              <a 
                href="tel:+37127727724" 
                className="hover:text-teal-700 transition-colors ml-1"
                onClick={() => trackPhoneConversion('+371 27727724', 'tel:+37127727724')}
              >
                +371 27727724
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-teal-600" />
            <a href="mailto:tsv@metan.lv" className="text-sm text-teal-900 hover:text-teal-700 transition-colors">
              tsv@metan.lv
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-teal-50 border border-teal-200 rounded-2xl p-8 ${className}`}
    >
      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-teal-900 mb-2">
              Sazinies ar mūsu tehnisko servisa vadītāju:
            </h3>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <a 
                href="tel:+37127727724"
                className="text-xl font-semibold text-teal-900 hover:text-teal-700 transition-colors"
                onClick={() => trackPhoneConversion('+371 27727724', 'tel:+37127727724')}
              >
                +371 27727724
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <a 
                href="mailto:tsv@metan.lv"
                className="text-xl font-semibold text-teal-900 hover:text-teal-700 transition-colors"
              >
                tsv@metan.lv
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <a 
                href="https://www.metan.lv"
                className="text-xl font-semibold text-teal-900 hover:text-teal-700 transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                www.metan.lv
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 p-4 bg-teal-100 rounded-lg">
            <CheckCircle className="h-5 w-5 text-teal-600" />
            <span className="text-teal-900 font-medium">
              Licencēts partneris ar pieredzi HoReCa sektorā visā Latvijā
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}