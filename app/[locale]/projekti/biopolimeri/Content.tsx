'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Beaker,
  TrendingUp, 
  Recycle, 
  Zap, 
  Factory,
  Globe,
  DollarSign,
  Users,
  FileText,
  ArrowRight,
  Lightbulb,
  Shield,
  Target,
  Leaf
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { useTranslation } from '@/hooks/useTranslation';
const keyMetrics = [
  { label: 'Ražošanas jauda', value: 'līdz 3,000 t/gadā', icon: Factory },
  { label: 'Atdeves periods', value: '<1.7 gadi', icon: TrendingUp },
  { label: 'Tirgus cena', value: '2,000-2,400 €/t', icon: DollarSign },
  { label: 'Pašizmaksa', value: '1,300-1,450 €/t', icon: Target },
];

const developmentPhases = [
  { phase: 'I', title: 'Izejvielu savākšana', description: 'Kopā ar SIA Biomotorai Latvia', status: 'Pabeigts', icon: '✅' },
  { phase: 'II', title: 'Pētījumi un pilotražošana', description: '2025. gads, budžets: 500,000 €', status: 'Aktīvs', icon: '🔬' },
  { phase: 'III', title: 'Ražošanas līnijas izbūve', description: '2027. gads, 1,200,000 €', status: 'Plānots', icon: '🏭' },
  { phase: 'IV', title: 'Loģistikas ķēde', description: 'HoReCa, rūpniecība, valsts iepirkumi', status: 'Perspektīva', icon: '🚚' },
];

const applications = [
  { 
    title: 'Kosmētika & farmācija', 
    description: 'Bioiepakojums, kapsulas, aplikatori',
    icon: '🧼',
    color: 'from-purple-400 to-purple-600'
  },
  { 
    title: 'HoReCa', 
    description: 'Vienreizlietojami trauki, iepakojums',
    icon: '🍽️',
    color: 'from-orange-400 to-orange-600'
  },
  { 
    title: 'Specializētie risinājumi', 
    description: 'Īpašas izmantošanas produkti drošības un aizsardzības nozarēm',
    icon: '🛡️',
    color: 'from-slate-400 to-slate-600'
  },
  { 
    title: 'Maskēšanās risinājumi', 
    description: 'Tīkli, bio pārklājumi, kas noārdās dabā',
    icon: '🎖️',
    color: 'from-green-400 to-green-600'
  },
  { 
    title: 'E-komercija & eksports', 
    description: 'Viegli pielāgojami izstrādājumi',
    icon: '📦',
    color: 'from-blue-400 to-blue-600'
  },
  { 
    title: 'Medicīna', 
    description: 'Sterils, sadalošs materiāls, bez mikroplastmasas',
    icon: '🏥',
    color: 'from-teal-400 to-teal-600'
  },
  { 
    title: 'Pētniecība', 
    description: 'Specifiskas formulas sadarbībā ar LU un RTU',
    icon: '🔬',
    color: 'from-indigo-400 to-indigo-600'
  },
];

const investmentHighlights = [
  'Potenciālie ienākumi: līdz 7,2 miljoniem €/gadā',
  'Publiskie iepirkumi — HORECA un valsts sektors',
  'Valsts aizsardzības kontrakti un specializētie līgumi',
  'Sadarbība ar pētniecības iestādēm',
  'Eksports ES un ārpus tās',
  'Zaļās politikas atbalsts (ES fondu iespējas)',
  'Sadarbība ar specializētajām valsts iestādēm',
  'Iespēja piesaistīt papildu partnerus un līdzfinansējumu',
];

export default function BiopolimeriPage() {
  const { localePath } = useTranslation();
  console.log('BiopolimeriPage component rendered');
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="metan-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <Badge className="mb-6 bg-purple-100 text-purple-800">
                Inovatīvs risinājums
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-metan-gray mb-6">
                Biopolimēru projekts
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Mūsu mērķis — pārstrādāt taukus un eļļas izejvielās biopolimēru granulu ražošanai, 
                kas izmantojamas ilgtspējīgā iepakojumā, HORECA segmentā, medicīnā un pat smalkās tehnoloģijās.
                Nākotnes investīcija aprites ekonomikā.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={localePath("/kontakti")}>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Users className="mr-2 h-5 w-5" />
                    Sazināties ar komandu
                  </Button>
                </Link>
                <Link href={localePath("/dokumenti")}>
                  <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
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
                  src="https://assets.macaly-user-data.dev/f16hjlowsmi23ne4mky35pje/tc39k9q3ljy0bm5smzqtkxor/M9moFQoMkR5HFziTX9QWP/tmp2q32099g.webp"
                  alt="Biopolimēru granulas un ilgtspējīgs iepakojums"
                  className="w-full h-[400px] object-cover"
                  data-macaly="biopolimeri-hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <Beaker className="h-8 w-8 text-purple-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                <Recycle className="h-8 w-8 text-green-600" />
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
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Galvenie ekonomiskie rādītāji</h2>
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
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <metric.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-purple-600">
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
            <p className="text-xl text-gray-600">No izejvielu savākšanas līdz pilnvērtīgai ražošanai</p>
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
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
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
                    <div className="text-2xl">{phase.icon}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Pielietojums un tirgus iespējas</h2>
            <p className="text-xl text-gray-600">Dažādas nozares un produkti biopolimēru granulām</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {applications.map((app, index) => (
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
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Investīciju potenciāls</h2>
            <p className="text-xl text-gray-600">Ilgtspējīga nākotne un augsta atdevi</p>
          </motion.div>

          <Card className="metan-card max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-purple-600 mb-4">Ekonomiskās iespējas</h3>
                  <ul className="space-y-3">
                    {investmentHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
                    <h4 className="text-2xl font-bold mb-2">ROI &lt;1.7 gadi</h4>
                    <p className="text-purple-100">Ātrs investīciju atgūšanas periods</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Investment CTA */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Vai vēlaties ieguldīt ilgtspējīgā nākotnē?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Biopolimēru projekts — inovatīva investīcija ar augstu atdevi un pozitīvu ietekmi uz vidi. 
              Sazinieties ar mūsu komandu, lai uzzinātu vairāk par investīciju iespējām.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">7,2 miljoni €</h3>
                <p className="text-purple-100">Potenciālie ienākumi/gadā</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">&lt;1.7 gadi</h3>
                <p className="text-purple-100">Atdeves periods</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">3,000 t</h3>
                <p className="text-purple-100">Ražošanas jauda/gadā</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath("/kontakti")}>
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  onClick={() => {
                    console.log('Biopolimeri CTA clicked: Contact');
                    // GA4 tracking
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'cta_click', {
                        event_category: 'biopolimeri',
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
              <Link href={localePath("/dokumenti")}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  onClick={() => {
                    console.log('Biopolimeri CTA clicked: Documents');
                    // GA4 tracking
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'cta_click', {
                        event_category: 'biopolimeri',
                        event_label: 'download_documents',
                        page_location: window.location.href
                      });
                    }
                  }}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Projekta dokumenti
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}