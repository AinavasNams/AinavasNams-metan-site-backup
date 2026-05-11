'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Wrench, 
  Shield, 
  FileText, 
  CheckCircle, 
  Phone, 
  Clock,
  MapPin,
  Droplets,
  Recycle,
  Factory,
  Calculator
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useTranslation } from '@/hooks/useTranslation';
import { trackPageView, trackCTA, trackServiceInterest, trackPhoneConversion } from '@/components/Analytics';

const services = [
  {
    title: 'Mehāniskā attīrīšana (centrifūga)',
    description: 'Efektīva tauku, ūdens un mehānisko piemaisījumu atdalīšana — uz vietas vai pēc līguma. Iekārta ir piegādāta, notiek montāžas un dokumentācijas izstrādes process.',
    icon: Factory,
    features: [
      'Industriāla centrifūga ar jaudu līdz 3,5 t/h',
      'Ūdens un cieto daļiņu atdalīšana',
      'Frakciju nodalīšana tālākai izmantošanai',
      'Laboratorisku kvalitātes apstiprinājumu'
    ],
    badge: 'Ieviešanas stadijā',
    status: 'warning'
  },
  {
    title: 'Biopolimēru attīstība',
    description: 'Tauku frakcijas kā izejviela bioplastmasai. Inovatīvs risinājums aprites ekonomikā sadarbībā ar FKuR Kunststoff GmbH.',
    icon: Recycle,
    features: [
      'Otrreizējo tauku izmantošana biopolimēru sintezēšanai',
      'Testēšana un formulējumu izstrāde ar FKuR',
      'Samazināts atkritumu apjoms',
      'Komerciāla biopolimēru izejvielu ražošana'
    ],
    badge: 'Izstrādes stadijā',
    status: 'info'
  },
  {
    title: 'Augstspiediena kanalizācijas skalošana',
    description: 'Piedāvājam industriālu cauruļvadu tīrīšanu ar augstspiediena iekārtām. Iespējama kombinēta tīrīšana ar vakuuma nosūcējiem.',
    icon: Wrench,
    features: [
      'Augstspiediena iekārtas',
      'Kombinēta tīrīšana ar vakuuma nosūcējiem',
      'Efektīvs risinājums tauku nosēdumu novēršanai',
      'Nosprostojumu likvidēšana'
    ],
    badge: 'Pieejams',
    status: 'success'
  }
];

const processSteps = [
  {
    step: 1,
    title: 'Pieteikuma saņemšana',
    description: 'Sazinieties ar mums pa tālruni vai aizpildiet pieteikuma formu',
    icon: Phone
  },
  {
    step: 2,
    title: 'Pieņemšana objektā',
    description: 'Izejvielu pieņemšana un novērtēšana objektā Bēnē',
    icon: Factory
  },
  {
    step: 3,
    title: 'Mehāniskā apstrāde',
    description: 'Centrifugēšana ar automātisku frakciju atdalīšanu',
    icon: Wrench
  },
  {
    step: 4,
    title: 'Kvalitātes kontrole',
    description: 'Laboratorisku kvalitātes apstiprinājumu (pēc vajadzības)',
    icon: FileText
  },
  {
    step: 5,
    title: 'Produktu nodošana',
    description: 'Attīrītā frakcija tiek nodota atpakaļ klientam vai pārstrādei',
    icon: Recycle
  }
];

const benefits = [
  'Stabilizētu un daļēji atūdeņotu materiālu',
  'Zemākas transporta izmaksas',
  'Pieņemšanas akts ar tilpuma, mitruma un blīvuma rādītājiem',
  'Atbilstību vides normām',
  'Iespēju iekļaut materiālu turpmākā ražošanā',
  'Inovāciju un aprites ekonomikas risinājumu'
];

export default function MechanicalProcessingPage() {
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
            <h1 className="text-4xl md:text-6xl font-bold text-metan-gray mb-6">
              Mehāniskā apstrāde
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              SIA "Ainavas Nams" attīsta inovatīvus risinājumus organisko atkritumu mehāniskai apstrādei, 
              ietverot centrifugēšanu, biopolimēru izstrādi un augstspiediena tīrīšanas pakalpojumus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={translation.localePath("/kontakti")}>
                <Button className="metan-button-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  Sazināties par pakalpojumiem
                </Button>
              </Link>
              <a href="tel:+37127727724">
                <Button 
                  variant="outline" 
                  className="border-metan-primary text-metan-primary hover:bg-metan-primary/10"
                  onClick={() => trackPhoneConversion('+371 27727724', 'tel:+37127727724')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  +371 27727724
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Mūsu tehnoloģiskie risinājumi</h2>
          </motion.div>

          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card relative overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Icon and Title */}
                    <div className={`lg:col-span-1 ${
                      service.status === 'success' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                      service.status === 'warning' ? 'bg-gradient-to-br from-teal-400 to-teal-600' :
                      'bg-gradient-to-br from-purple-400 to-purple-600'
                    } p-8 text-white`}>
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <service.icon className="h-12 w-12 mb-4" />
                          <Badge className={`mb-4 ${
                            service.status === 'success' ? 'bg-green-100 text-green-800' :
                            service.status === 'warning' ? 'bg-teal-100 text-teal-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {service.badge}
                          </Badge>
                          <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                          <p className="text-white/90 text-lg">{service.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="lg:col-span-2 p-8">
                      <h4 className="text-lg font-semibold text-metan-gray mb-4">Galvenās iezīmes:</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-metan-accent flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
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

      {/* Process Steps */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Mehāniskās apstrādes process</h2>
            <p className="text-xl text-gray-600">No izejvielu pieņemšanas līdz gala produkta nodošanai</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-metan-primary to-metan-accent transform translate-x-4 z-0"></div>
                )}
                
                <div className="relative z-10 w-12 h-12 mx-auto mb-4 bg-metan-gradient rounded-full flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
                  <step.icon className="h-8 w-8 text-metan-primary" />
                </div>
                
                <h3 className="font-semibold text-metan-gray mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 px-2">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Ko jūs iegūstat</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <CheckCircle className="h-5 w-5 text-metan-accent flex-shrink-0" />
                <span className="font-medium text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Info */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="metan-card">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Factory className="h-8 w-8 text-metan-primary" />
                  Tehnoloģiskais partneris
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-lg">
                  Industriāla centrifūga ar jaudu līdz 3,5 t/h. Nodrošina: SIA "Biomotorai Latvia". 
                  Pašlaik — uzstādīšanas un dokumentālās saskaņošanas procesā.
                </p>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-metan-gray mb-2">Apkalpojamie objekti:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>• Pārtikas ražotāji ar taukainiem atlikumiem</div>
                      <div>• HoReCa sektors (liela apjoma apstrāde)</div>
                      <div>• Ražošanas uzņēmumi ar FOG atkritumiem</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-metan-gray mb-2">Statuss:</h4>
                    <div className="space-y-2">
                      <Badge variant="outline" className="border-teal-500 text-teal-700">Centrifūga: Uzstādīšana</Badge>
                      <Badge variant="outline" className="border-purple-500 text-purple-700">Biopolimēri: Izstrāde</Badge>
                      <Badge variant="outline" className="border-green-500 text-green-700">Skalošana: Pieejams</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-metan-primary text-white">
        <div className="metan-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Nepieciešama mehāniskā apstrāde?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Sazinieties ar mums konsultācijai par iespējamiem risinājumiem jūsu uzņēmumam. 
              Mēs izvērtēsim jūsu vajadzības un piedāvāsim optimālu risinājumu.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Factory className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-bold mb-1">Objekta adrese</h3>
                <p className="text-white/80 text-sm">Rūpniecības iela 2D, Bēne</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-bold mb-1">Darba laiks</h3>
                <p className="text-white/80 text-sm">P-Pk: 8:00-18:00</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-bold mb-1">Apkalpošana</h3>
                <p className="text-white/80 text-sm">Zemgales reģions</p>
              </div>
            </div>

            <Link href={translation.localePath("/kontakti")}>
              <Button size="lg" className="bg-white text-metan-primary hover:bg-gray-100">
                <Phone className="mr-2 h-5 w-5" />
                Sazināties par pakalpojumiem
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hidden SEO content */}
      <div style={{ display: 'none' }}>
        <p>mehāniskā attīrīšana centrifūga FOG waste biopolimēri METAN.LV Ainavas Nams</p>
        <p>augstspiediena skalošana kanalizācijas tīrīšana tauku atdalīšana frakciju nodalīšana</p>
        <p>FKuR Kunststoff bioplastmasa otrreizējo tauku izmantošana aprites ekonomika</p>
        <p>Biomotorai Latvia industriāla centrifūga ūdens un cieto daļiņu atdalīšana</p>
        <p>kvalitātes kontrole laboratoriski apstiprinājumi vides normas Zemgales reģions</p>
      </div>
    </div>
  );
}