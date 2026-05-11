'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UtensilsCrossed, Fish, Building, Factory } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export function IndustrySpecialization() {
  const { t } = useTranslation();

  const industries = [
    {
      icon: UtensilsCrossed,
      key: 'horeca',
      gradient: 'from-amber-400 to-orange-500',
      bgImage: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      icon: Fish,
      key: 'fish',
      gradient: 'from-blue-400 to-cyan-500',
      bgImage: 'https://images.pexels.com/photos/128408/pexels-photo-128408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      icon: Building,
      key: 'food',
      gradient: 'from-green-400 to-emerald-500',
      bgImage: 'https://images.pexels.com/photos/5605018/pexels-photo-5605018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
    {
      icon: Factory,
      key: 'industrial',
      gradient: 'from-purple-400 to-violet-500',
      bgImage: 'https://images.pexels.com/photos/7512913/pexels-photo-7512913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4">
            {t('industry.title')}
          </h2>
          <p className="text-lg text-metan-text-light max-w-2xl mx-auto">
            {t('industry.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="metan-card h-full group hover:scale-105 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="w-full h-full bg-cover bg-center" 
                       style={{backgroundImage: `url(${industry.bgImage})`}}></div>
                </div>
                
                <CardHeader className="relative z-10">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${industry.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <industry.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-metan-gray mb-1">
                    {t(`industry.${industry.key}.title`)}
                  </CardTitle>
                  <p className="text-sm font-medium text-metan-accent mb-2">
                    {t(`industry.${industry.key}.subtitle`)}
                  </p>
                  <div className="text-xs text-metan-primary font-semibold">
                    {t(`industry.${industry.key}.stats`)}
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  <p className="text-sm text-metan-text mb-4">
                    {t(`industry.${industry.key}.desc`)}
                  </p>
                  <div className="space-y-1">
                    {[1, 2, 3].map((idx) => (
                      <div key={idx} className="flex items-center text-xs text-metan-text-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-metan-accent mr-2"></div>
                        {t(`industry.${industry.key}.service${idx}`)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-metan-text">
              {t('industry.footer')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
