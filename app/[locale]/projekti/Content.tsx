'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Zap, 
  Beaker, 
  Recycle, 
  ArrowRight, 
  TrendingUp,
  Snowflake,
  Leaf
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriorityContacts from '@/components/PriorityContacts';

import { useTranslation } from '@/hooks/useTranslation';
const projects = [
  {
    id: 'biometans',
    title: 'Biogāze un biometāns',
    subtitle: 'CH₄ Future - galvenais projekts',
    description: 'Organisko atkritumu fermentācija un attīrīšana līdz tīram biometānam — eksporta potenciāls un zaļā enerģija.',
    icon: Factory,
    status: 'Aktīvs',
    statusColor: 'bg-green-100 text-green-800',
    metrics: [
      '26,951 MWh/gadā',
      '38,6% rentabilitāte',
      'RED II sertifikācija',
      'Eksports uz Baltiju'
    ],
    href: '/projekti/biometans',
    gradient: 'from-green-400 to-green-600',
  },
  {
    id: 'co2',
    title: 'CO₂ pārstrāde',
    subtitle: 'Perspektīvais virziens',
    description: 'No blakusprodukta līdz pievienotās vērtības resursam - CO₂ uztveršana un izmantošana pārtikas un tehniskajiem mērķiem.',
    icon: Snowflake,
    status: 'Plānots',
    statusColor: 'bg-blue-100 text-blue-800',
    metrics: [
      'Līdz 3,880 t CO₂/gadā',
      'Pārtikas kvalitāte E290',
      'Tehniska izmantošana',
      'ESG atbilstība'
    ],
    href: '/projekti/co2',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    id: 'biopolimeri',
    title: 'Biopolimēri',
    subtitle: 'Inovatīvs risinājums',
    description: 'Tauku frakcijas kā izejviela bioplastmasai. Sadarbībā ar FKuR Kunststoff GmbH attīstām aprites ekonomikas risinājumu.',
    icon: Beaker,
    status: 'Izstrāde',
    statusColor: 'bg-purple-100 text-purple-800',
    metrics: [
      'FKuR partnerība',
      'Otrreizējo tauku izmantošana',
      'Biobāzēti polimēri',
      'Pilot testēšana'
    ],
    href: '/projekti/biopolimeri',
    gradient: 'from-purple-400 to-purple-600',
  },
];

const timeline = [
  { year: '2014', title: 'ZEP dibināšana', description: 'Fermentācijas stacija Bēnē, licences ER0266 un JE15IB0030' },
  { year: '2020', title: 'Ainavas Nams', description: 'Reģistrēts SIA "Ainavas Nams"' },
  { year: '2024', title: 'Modernizācija', description: 'CH₄ Future projekta sākums, METAN.LV palaišana' },
  { year: '2025', title: 'Pilns cikls', description: 'Eksports un CO₂ uztveršanas modulis' },
];

export default function ProjectsPage() {
  const { localePath } = useTranslation();
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
              Mūsu projekti
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              CH₄ Future ekosistēma apvieno biometāna ražošanu, CO₂ uztveršanu un biopolimēru attīstību. 
              Mēs veidojam pilnīgu aprites modeli: tauki → biopolimēri → biogāze → biometāns → CO₂.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="metan-container">
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={index === 0 ? 'lg:col-span-2' : ''}
              >
                <Card className="metan-card overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Icon and Title */}
                    <div className={`lg:col-span-1 bg-gradient-to-br ${project.gradient} p-8 text-white`}>
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <project.icon className="h-12 w-12 mb-4" />
                          <Badge className={`mb-4 ${project.statusColor}`}>
                            {project.status}
                          </Badge>
                          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                          <p className="text-white/90 text-lg">{project.subtitle}</p>
                        </div>
                        <Link href={project.href}>
                          <Button className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white border-white/20">
                            Uzzināt vairāk
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="lg:col-span-2 p-8">
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                            <span className="text-sm text-gray-600">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Attīstības ceļš</h2>
            <p className="text-xl text-gray-600">No biogāzes stacijas 2014. gadā — līdz biometāna ekosistēmai 2025. gadā</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-metan-primary to-metan-accent transform translate-x-4 z-0"></div>
                )}
                
                <div className="relative z-10 w-12 h-12 mx-auto mb-4 bg-metan-gradient rounded-full flex items-center justify-center text-white font-bold">
                  {item.year}
                </div>
                
                <h3 className="font-semibold text-metan-gray mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Contacts Section */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <PriorityContacts variant="short" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-metan-primary text-white">
        <div className="metan-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Gatavs investēt nākotnē?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Pievienojies CH₄ Future projektam un ieguldi ilgtspējīgā enerģētikā ar pierādītu atdevi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath("/projekti/biometans")}>
                <Button size="lg" className="bg-white text-metan-primary hover:bg-gray-100">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Investīciju iespējas
                </Button>
              </Link>
              <Link href={localePath("/kontakti")}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-metan-primary">
                  Sazināties ar komandu
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}