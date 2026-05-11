'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Lightbulb, Handshake, Cog, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export function AdvantagesSection() {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: CheckCircle,
      titleKey: 'advantages.items.fullCycle.title',
      descKey: 'advantages.items.fullCycle.desc',
      gradient: 'from-green-400 to-green-600',
    },
    {
      icon: Shield,
      titleKey: 'advantages.items.licenses.title',
      descKey: 'advantages.items.licenses.desc',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: Cog,
      titleKey: 'advantages.items.logistics.title',
      descKey: 'advantages.items.logistics.desc',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      icon: Lightbulb,
      titleKey: 'advantages.items.recycling.title',
      descKey: 'advantages.items.recycling.desc',
      gradient: 'from-orange-400 to-orange-600',
    },
    {
      icon: Award,
      titleKey: 'advantages.items.economic.title',
      descKey: 'advantages.items.economic.desc',
      gradient: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: Handshake,
      titleKey: 'advantages.items.esg.title',
      descKey: 'advantages.items.esg.desc',
      gradient: 'from-teal-400 to-teal-600',
    },
  ];

  const values = [
    { icon: CheckCircle, titleKey: 'advantages.values.sustainability.title', descKey: 'advantages.values.sustainability.desc' },
    { icon: Lightbulb, titleKey: 'advantages.values.innovation.title', descKey: 'advantages.values.innovation.desc' },
    { icon: Shield, titleKey: 'advantages.values.responsibility.title', descKey: 'advantages.values.responsibility.desc' },
    { icon: Handshake, titleKey: 'advantages.values.partnership.title', descKey: 'advantages.values.partnership.desc' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-metan-gray mb-4">
            {t('advantages.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('advantages.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="metan-card h-full group hover:scale-105 transition-all duration-300 !bg-white">
                <CardHeader className="!bg-white">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${advantage.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <advantage.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-metan-gray leading-tight">
                    {t(advantage.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="!bg-white">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(advantage.descKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-metan-gray mb-6 text-center">
            {t('advantages.values.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-metan-gradient rounded-full flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-metan-gray mb-2">{t(value.titleKey)}</h4>
                <p className="text-sm text-gray-600">
                  {t(value.descKey)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
