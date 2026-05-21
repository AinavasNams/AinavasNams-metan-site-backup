'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Factory,
  TrendingUp, 
  Zap, 
  Shield, 
  Globe, 
  DollarSign,
  FileText,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useTranslation } from '@/hooks/useTranslation';

const keyMetrics = [
  { label: 'Biometāna jauda', value: '26,951 MWh/gadā', icon: Zap },
  { label: 'Projekta rentabilitāte', value: '38,6%', icon: TrendingUp },
  { label: 'CO₂ uztveršana', value: 'līdz 3,880 t/gadā', icon: Globe },
  { label: 'Investīciju nepieciešamība', value: '1,738,000 €', icon: DollarSign },
];

const advantages = [
  {
    title: 'Darbojoša infrastruktūra',
    description: 'Stacija ar licencēm ER0266, AP25AA0011 jau darbojas kopš 2014. gada',
    icon: Factory,
  },
  {
    title: 'Membrānu tehnoloģija',
    description: 'Modernizācija ar membrānu attīrīšanas tehnoloģiju → ≥93% CH₄ biometāns',
    icon: Shield,
  },
  {
    title: 'Sertifikācija',
    description: 'RED II, ISCC, GoO atbilstība eksporta tirgiem',
    icon: FileText,
  },
  {
    title: 'Eksporta potenciāls',
    description: 'Lietuva, Igaunija, Somija - reģionālie tirgi',
    icon: Globe,
  },
];

const partners = [
  { name: 'Biokona (LT)', role: 'Galvenais tehnoloģiju partneris', investment: '2,016,500 €' },
  { name: 'Suomen Biovoima (FI)', role: 'Alternatīvs risinājums', note: 'Ar atpirkuma opciju' },
  { name: 'Zemgales Enerģijas Parks', role: 'Infrastruktūras partneris' },
  { name: 'Horeca Solution', role: 'Izejvielu piegādātājs' },
];

export default function BiomethanePage() {
  const translation = useTranslation();
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
            <Badge className="mb-6 bg-metan-primary text-white">
              CH₄ Future — Galvenais projekts
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-metan-gray mb-6">
              Biogāze un biometāns
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              CH₄ Future projekts balstās uz jau esošo staciju Bēnē, kur plānota membrānu attīrīšanas 
              tehnoloģijas ieviešana. Mērķis — sertificēta biometāna (CNG) ražošana atbilstoši RED II 
              un ISCC prasībām, kā arī CO₂ uztveršana kā vērtīgs blakusprodukts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={translation.localePath("/kontakti")}>
                <Button className="metan-button-primary">
                  <Users className="mr-2 h-5 w-5" />
                  Sazināties ar komandu
                </Button>
              </Link>
              <Link href={translation.localePath("/dokumenti")}>
                <Button variant="outline" className="border-metan-primary text-metan-primary">
                  <FileText className="mr-2 h-5 w-5" />
                  Lejupielādēt dokumentus
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Galvenie rādītāji</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card text-center">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto mb-4 bg-metan-gradient rounded-lg flex items-center justify-center">
                      <metric.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-metan-primary">
                      {metric.value}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Kā darbojas CH₄ Future aprites modelis</h2>
            <p className="text-xl text-gray-600">No taukiem līdz biometānam un CO₂ — pārskatāma un sertificēta sistēma</p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { step: 1, title: 'Tauku savākšana', desc: 'EWC 20 01 25/32, APUS, PVD atskaites', icon: '🛢️' },
                { step: 2, title: 'Mehāniskā attīrīšana', desc: 'Centrifugēšana, frakciju atdalīšana', icon: '🔄' },
                { step: 3, title: 'Biogāzes ražošana', desc: 'Fermentācija, digestāts', icon: '🔬' },
                { step: 4, title: 'Biometāna attīrīšana', desc: 'Membrānas, ≥93% CH₄, RED II', icon: '⚗️' },
                { step: 5, title: 'CO₂ uztveršana', desc: 'Pārtika, tehnika, biopolimēri', icon: '🧊' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  {index < 4 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-metan-primary to-metan-accent transform translate-x-4 z-0"></div>
                  )}
                  
                  <div className="relative z-10 w-12 h-12 mx-auto mb-4 bg-metan-gradient rounded-full flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                  
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-metan-gray mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Kāpēc ieguldīt</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-metan-gradient rounded-lg flex items-center justify-center">
                        <advantage.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{advantage.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{advantage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Tehnoloģiskie partneri</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      {partner.investment && (
                        <Badge className="bg-metan-light text-metan-primary">
                          {partner.investment}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">{partner.role}</p>
                    {partner.note && (
                      <p className="text-sm text-metan-primary font-medium">{partner.note}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment CTA */}
      <section className="py-20 bg-metan-primary text-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Gatavs investēt?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              CH₄ Future projekts — ilgtspējīgas investīcijas ar augstu atdevi un pārbaudītu infrastruktūru. 
              Sazinieties ar mūsu komandu detalizētai investīciju analīzei.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">1,738,000 €</h3>
                <p className="text-white/80">Investora ieguldījums</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">&gt;38,6%</h3>
                <p className="text-white/80">Atdeve uz kapitālu</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">RED II</h3>
                <p className="text-white/80">ISCC sertifikācija</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={translation.localePath("/kontakti")}>
                <Button size="lg" className="bg-white text-metan-primary hover:bg-gray-100">
                  <Users className="mr-2 h-5 w-5" />
                  Aleksejs Karalkins: +371 27727751
                </Button>
              </Link>
              <Link href={translation.localePath("/dokumenti")}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-metan-primary">
                  <FileText className="mr-2 h-5 w-5" />
                  Biznesa plāns un dokumenti
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}