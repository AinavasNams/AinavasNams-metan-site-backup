'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import { 
  Factory, 
  TrendingUp, 
  Mail, 
  Users, 
  FileText,
  Zap,
  Globe,
  Beaker,
  Recycle,
  Target
} from 'lucide-react';

import { useTranslation } from '@/hooks/useTranslation';
const developmentPhases = [
  {
    phase: 'I',
    title: 'Tehnoloģiskās platformas izveide',
    description: 'CO₂ uztveršanas iekārtas un pamata infrastruktūra',
    budget: '350,000 €',
    status: 'Plānots',
    icon: '🏗️',
    color: 'from-blue-500 to-blue-600'
  },
  {
    phase: 'II', 
    title: 'CO₂ saspiešana un šķidrināšana',
    description: 'Augsto tehnoloģiju iekārtas un kvalitātes kontrole',
    budget: '280,000 €',
    status: 'Plānots',
    icon: '⚙️',
    color: 'from-green-500 to-green-600'
  },
  {
    phase: 'III',
    title: 'Tirdzniecības attīstība',
    description: 'HoReCa, medicīna, lauksaimniecība, dzērienu rūpniecība',
    budget: 'Progresīvs',
    status: 'Perspektīva',
    icon: '🏪',
    color: 'from-purple-500 to-purple-600'
  },
  {
    phase: 'IV',
    title: 'Eksportspējīgas loģistikas izveide',
    description: 'Slēpti valsts pasūtījumi, dzesēšana, uzglabāšana',
    budget: 'Skalējams',
    status: 'Perspektīva',
    icon: '🚚',
    color: 'from-orange-500 to-orange-600'
  }
];

const keyMetrics = [
  {
    value: '~630,000 €',
    label: 'Pilna līnijas izveide',
    icon: Factory,
    color: 'from-blue-500 to-blue-600'
  },
  {
    value: '<1.9 gadi',
    label: 'Atdeves periods',
    icon: TrendingUp,
    color: 'from-green-500 to-green-600'
  },
  {
    value: '24/7',
    label: 'Nepārtraukta ražošana',
    icon: Zap,
    color: 'from-purple-500 to-purple-600'
  },
  {
    value: 'ES tirgus',
    label: 'Eksporta potenciāls',
    icon: Globe,
    color: 'from-orange-500 to-orange-600'
  }
];

const marketApplications = [
  {
    title: 'Pārtikas un dzērienu rūpniecība',
    description: 'CO₂ dzērienu karbonizācijai un konservēšanai',
    icon: '🥤',
    color: 'from-blue-400 to-blue-600'
  },
  {
    title: 'Medicīna un farmācija',
    description: 'Kriogēna dzesēšana un sterila vide',
    icon: '🏥',
    color: 'from-green-400 to-green-600'
  },
  {
    title: 'Lauksaimniecība',
    description: 'Siltumnīcu atmosfēras bagātināšana',
    icon: '🌱',
    color: 'from-emerald-400 to-emerald-600'
  },
  {
    title: 'Specializētie risinājumi',
    description: 'Valsts pasūtījumi un drošības nozares',
    icon: '🔒',
    color: 'from-slate-400 to-slate-600'
  },
  {
    title: 'Skandināvijas un Vācijas tirgi',
    description: 'Augstas kvalitātes CO₂ apstrāde',
    icon: '🌍',
    color: 'from-indigo-400 to-indigo-600'
  },
  {
    title: 'Zaļais kurss',
    description: 'ES atbalsts un fondu iespējas',
    icon: '🌿',
    color: 'from-green-400 to-green-600'
  }
];

const investmentHighlights = [
  'Pilna līnijas izveide: ~630,000 €',
  'ROI: <1.9 gadi',
  'Dalītas īpašumtiesības iespējamas',
  'Ekskluzīvas tiesības pārdošanai',
  'Integrācija ar esošo biometāna infrastruktūru',
  'Valsts pasūtījumi un stabilā piegāžu ķēde',
  'EU zaļās politikas atbalsts',
  'Skandināvijas un Vācijas eksporta potenciāls'
];

export default function CO2ProjectPage() {
  const { localePath } = useTranslation();
  console.log('CO2ProjectPage component rendered');
  
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="CO₂ projekts - Nākotnes potenciāls oglekļa uztveršanā | METAN.LV"
        description="Integrēts risinājums CO₂ uztveršanai un pārstrādei, kas papildina biometāna ražošanas ciklu. ROI <1.9 gadi, 630,000 € investīcijas."
        keywords="CO2 uztveršana, oglekļa pārstrāde, biometāns, investīcijas, ESG, zaļā enerģija, Latvija"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="metan-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <Badge className="mb-6 bg-blue-100 text-blue-800">
                Inovatīvs CO₂ projekts
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-metan-gray mb-6">
                CO₂ projekts
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Nākotnes potenciāls oglekļa uztveršanā un pārstrādē. Integrēts risinājums CO₂ uztveršanai 
                un pārstrādei, kas papildina biometāna ražošanas ciklu un veido jaunu ieņēmumu plūsmu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={localePath("/kontakti")}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Users className="mr-2 h-5 w-5" />
                    Sazināties ar komandu
                  </Button>
                </Link>
                <Link href={localePath("/dokumenti")}>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <FileText className="mr-2 h-5 w-5" />
                    Projekta dokumenti
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="CO₂ uztveršanas un pārstrādes tehnoloģijas"
                  className="w-full h-[400px] object-cover"
                  data-macaly="co2-hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <Recycle className="h-8 w-8 text-blue-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                <Beaker className="h-8 w-8 text-green-600" />
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Galvenie projekta rādītāji</h2>
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
                    <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center`}>
                      <metric.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-600">
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

      {/* Development Phases */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Attīstības posmi</h2>
            <p className="text-xl text-gray-600">No tehnoloģiskās platformas līdz eksporta potenciālam</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {developmentPhases.map((phase, index) => (
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
                      <div className={`w-12 h-12 bg-gradient-to-br ${phase.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                        {phase.phase}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{phase.title}</CardTitle>
                        <Badge className={`mt-2 ${
                          phase.status === 'Pabeigts' ? 'bg-green-100 text-green-800' :
                          phase.status === 'Aktīvs' ? 'bg-blue-100 text-blue-800' :
                          phase.status === 'Plānots' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {phase.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">{phase.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{phase.icon}</span>
                      <span className="text-lg font-semibold text-blue-600">{phase.budget}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Applications */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Tirgus potenciāls un pielietojums</h2>
            <p className="text-xl text-gray-600">Plašas iespējas dažādās nozarēs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketApplications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 mb-4 bg-gradient-to-br ${app.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-2xl">{app.icon}</span>
                    </div>
                    <CardTitle className="text-xl">{app.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{app.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Potential */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Investīciju potenciāls</h2>
            <p className="text-xl text-gray-600">Augsta atdeve un stratēģiskas priekšrocības</p>
          </motion.div>

          <Card className="metan-card max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">Investīciju iespējas</h3>
                  <ul className="space-y-3">
                    {investmentHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
                    <h4 className="text-2xl font-bold mb-2">ROI &lt;1.9 gadi</h4>
                    <p className="text-blue-100">Ātrs investīciju atgūšanas periods</p>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="text-xl font-semibold text-green-800 mb-2">Tehnoloģiskā bāze</h4>
                      <p className="text-green-700 text-sm">
                        CO₂ uztveršana caur absorbentiem vai membrānām. Glabāšana augstspiediena balonos. 
                        Pilna integrācija ar esošo biometāna infrastruktūru.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Investment CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Interesē investīciju sadarbība?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              CO₂ projekts — stratēģiska investīcija ar augstu atdevi un stabilu tirgu. 
              Rakstiet mums – nosūtīsim detalizētu prospektu un biznesa modeli.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">~630,000 €</h3>
                <p className="text-blue-100">Pilna līnijas izveide</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">&lt;1.9 gadi</h3>
                <p className="text-blue-100">Atdeves periods</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">24/7</h3>
                <p className="text-blue-100">Nepārtraukta ražošana</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath("/kontakti")}>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => {
                    console.log('CO2 CTA clicked: Contact');
                    // GA4 tracking
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'cta_click', {
                        event_category: 'co2_project',
                        event_label: 'contact_team',
                        page_location: window.location.href
                      });
                    }
                  }}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Sazināties ar komandu
                </Button>
              </Link>
              <Link href="mailto:ainavasnams@gmail.com">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={() => {
                    console.log('CO2 CTA clicked: Email');
                    // GA4 tracking
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'cta_click', {
                        event_category: 'co2_project',
                        event_label: 'direct_email',
                        page_location: window.location.href
                      });
                    }
                  }}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Tiešā saziņa
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}