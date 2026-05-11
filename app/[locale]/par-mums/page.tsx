'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Award, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import PriorityContacts from '@/components/PriorityContacts';
import { useTranslation } from '@/hooks/useTranslation';

const teamNames = [
  'Aleksejs Karalkins',
  'Maksims Sjomochkins',
  'Natalja Geisari',
  'Gennadijs Garičevs',
  'Georgijs Firsovs',
  'Andrejs Kuzņecovs',
  'Nikita Sjomochkins',
  'Viktors Ksenzovs',
];

const valueIcons = [Building, Award, Handshake, Users];

const timelineColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-purple-500',
  'bg-metan-primary',
];

const timelineYears = ['2014', '2020', '2021', '2023', '2025'];
const timelineKeys = ['y2014', 'y2020', 'y2021', 'y2023', 'y2025'] as const;

export default function AboutPage() {
  const { t } = useTranslation();

  const values = [
    { icon: valueIcons[0], title: t('aboutPage.values.v1.title'), desc: t('aboutPage.values.v1.desc') },
    { icon: valueIcons[1], title: t('aboutPage.values.v2.title'), desc: t('aboutPage.values.v2.desc') },
    { icon: valueIcons[2], title: t('aboutPage.values.v3.title'), desc: t('aboutPage.values.v3.desc') },
    { icon: valueIcons[3], title: t('aboutPage.values.v4.title'), desc: t('aboutPage.values.v4.desc') },
  ];

  const teamMemberKeys = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'] as const;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-metan-light to-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-metan-gray mb-6">
              {t('aboutPage.heroTitle')}
            </h1>
            <div className="text-xl text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong>{t('aboutPage.heroSubtitle')}</strong>
              </p>
              <p>{t('aboutPage.heroText1')}</p>
              <p>{t('aboutPage.heroText2')}</p>
              <p>
                {t('aboutPage.heroText3').split('METAN.LV').map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span className="text-metan-primary font-semibold">METAN.LV</span>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">{t('aboutPage.missionTitle')}</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-600">
              <p>{t('aboutPage.missionText1')}</p>
              <p>{t('aboutPage.missionText2')}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto mb-4 bg-metan-gradient rounded-lg flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">{t('aboutPage.timelineTitle')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('aboutPage.timelineSubtitle')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-metan-primary opacity-20"></div>
              <div className="space-y-8">
                {timelineKeys.map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative flex items-start"
                  >
                    <div className={`relative z-10 flex items-center justify-center w-16 h-16 ${timelineColors[index]} rounded-full shadow-lg`}>
                      <span className="text-white font-bold text-sm">{timelineYears[index]}</span>
                    </div>
                    <div className="ml-8 flex-1">
                      <Card className="metan-card">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl text-metan-gray">
                            {t(`aboutPage.timeline.${key}.title`)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{t(`aboutPage.timeline.${key}.desc`)}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">{t('aboutPage.teamTitle')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMemberKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{teamNames[index]}</CardTitle>
                    <Badge variant="secondary" className="w-fit bg-metan-light text-metan-primary">
                      {t(`aboutPage.team.${key}.role`)}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{t(`aboutPage.team.${key}.desc`)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-8">{t('aboutPage.certTitle')}</h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>{t('aboutPage.certText1')}</p>
              <p>{t('aboutPage.certText2')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Priority Contacts Section */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <PriorityContacts variant="full" />
        </div>
      </section>
    </div>
  );
}
