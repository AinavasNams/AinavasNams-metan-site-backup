'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export function MissionVision() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="metan-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="metan-card h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-metan-primary to-metan-accent flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-metan-gray">
                  {t('mission.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-lg font-medium">
                  {t('missionVision.mission.text1')}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {t('missionVision.mission.text2')}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {t('missionVision.mission.text3')}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="metan-card h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-metan-accent to-metan-blue flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-metan-gray">
                  {t('missionVision.vision.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-metan-text text-lg font-medium">
                  {t('missionVision.vision.text1')}
                </p>
                <div className="space-y-3">
                  <p className="text-metan-text leading-relaxed">
                    {t('missionVision.vision.text2')}
                  </p>
                  <div className="space-y-2 text-sm text-metan-text">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span>{t('missionVision.vision.bullet1')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span>{t('missionVision.vision.bullet2')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span>{t('missionVision.vision.bullet3')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span>{t('missionVision.vision.bullet4')}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Company Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-metan-primary to-metan-accent flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-metan-gray">
              {t('missionVision.story.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-metan-gray">
                {t('missionVision.story.subtitle')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('missionVision.story.text1')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('missionVision.story.text2')}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-metan-primary rounded-full flex items-center justify-center text-white font-bold">
                    2014
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('missionVision.story.y2014')}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-metan-accent rounded-full flex items-center justify-center text-white font-bold">
                    2021
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('missionVision.story.y2021')}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-metan-blue rounded-full flex items-center justify-center text-white font-bold">
                    2023
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('missionVision.story.y2023')}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-metan-primary to-metan-accent rounded-full flex items-center justify-center text-white font-bold">
                    2025
                  </div>
                  <div className="text-sm text-gray-600">
                    {t('missionVision.story.y2025')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
