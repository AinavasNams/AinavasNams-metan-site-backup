'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Truck, 
  Shield, 
  FileText, 
  CheckCircle, 
  Phone, 
  Clock,
  MapPin,
  Wrench,
  Droplets,
  Recycle,
  Calculator
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useTranslation } from '@/hooks/useTranslation';
import { trackPageView, trackCTA, trackServiceInterest, trackPhoneConversion } from '@/components/Analytics';
import { EnhancedCTA } from '@/components/EnhancedCTA';
import { SimpleContactForm } from '@/components/SimpleContactForm';
import QuickOrderForm from '@/components/QuickOrderForm';
import PriorityContacts from '@/components/PriorityContacts';

const services = [
  {
    title: 'Tauku atdalītāju tīrīšana',
    description: 'Veicam tauku atdalītāju apkopi un tīrīšanu saskaņā ar VVD un PVD prasībām. Izmantojam sertificētas metodes un dokumentējam katru savākšanas gadījumu.',
    icon: Wrench,
    features: [
      'VVD un PVD prasībām atbilstoša tīrīšana',
      'Profesionāls vakuuma aprīkojums',
      'Pilna dokumentācija',
      'Regulāras apkopes'
    ],
    badge: 'Populārākais'
  },
  {
    title: 'Eļļas un tauku atkritumu savākšana',
    description: 'Savācam lietotas eļļas, taukus un pārtikas atliekas ar vakuuma mašīnām. Atkritumi tiek nodoti mehāniskai attīrīšanai un pēc tam pārstrādāti biometānā.',
    icon: Droplets,
    features: [
      'Vakuuma mašīnu savākšana',
      'HoReCa klientu apkalpošana',
      'Izsekojamība un dokumentācija',
      'Biometāna izejvielu sagatavošana'
    ]
  },
  {
    title: 'Augstspiediena kanalizācijas skalošana',
    description: 'Piedāvājam industriālu cauruļvadu tīrīšanu ar augstspiediena iekārtām. Iespējama kombinēta tīrīšana ar vakuuma nosūcējiem.',
    icon: Truck,
    features: [
      'Augstspiediena iekārtas',
      'Kombinēta tīrīšana',
      'Nosprostojumu novēršana',
      'Tauku nosēdumu likvidēšana'
    ]
  },
  {
    title: 'Legāla tauku utilizācija',
    description: 'Nodrošinām dokumentētu, izsekojamu un legālu tauku nodošanu. Pēc savākšanas tiek sastādīts pārskats klientam un dati tiek nodoti sistēmām.',
    icon: Shield,
    features: [
      'Pilna dokumentācija',
      'Izsekojamības sistēma',
      'VVD/PVD atbilstība',
      'Klienta pārskati'
    ],
    badge: 'Sertificēts'
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
    title: 'Vakuuma mašīnas izbraukšana',
    description: 'Mūsu sertificētā tehnika ierodas objektā noteiktajā laikā',
    icon: Truck
  },
  {
    step: 3,
    title: 'Savākšana un tīrīšana',
    description: 'Veicam tauku savākšanu un augstspiediena skalošanu',
    icon: Wrench
  },
  {
    step: 4,
    title: 'Dokumentācija',
    description: 'Sastādām oficiālos dokumentus un atskaites',
    icon: FileText
  },
  {
    step: 5,
    title: 'Utilizācija un atskaite',
    description: 'Legāla pārstrāde un automātiska atskaite APUS sistēmā',
    icon: Recycle
  }
];

const benefits = [
  'Aizsardzība pret soda naudām un pārkāpumiem',
  'Pilna normatīvā atbildība uz mūsu pusi',
  'Ilgtspējiga atkritumu pārvaldība',
  'Mazāka administratīvā slodze uzņēmuma darbiniekiem',
  'Caurspīdīga un juridiski korekta sadarbība',
  'Integrācija ar METAN.LV biometāna ražošanu'
];

export default function WasteCollectionPage() {
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
              Tauku un eļļas atkritumu savākšana
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Mēs atrisinām tauku atkritumu jautājumu jūsu vietā — legāli, droši un pārskatāmi. 
              SIA "Ainavas Nams" nodrošina pilnu pakalpojumu klāstu FOG (tauki, eļļas, smērvielas) 
              atkritumu savākšanā un tauku atdalītāju tīrīšanā.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#calculator">
                <Button className="metan-button-primary">
                  <Calculator className="mr-2 h-5 w-5" />
                  Aprēķināt izmaksas
                </Button>
              </Link>
              <Link href="/kontakti">
                <Button 
                  variant="outline" 
                  className="border-metan-primary text-metan-primary hover:bg-metan-primary/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Pieteikt pakalpojumu
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
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Pakalpojumā iekļauts</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card h-full relative">
                  {service.badge && (
                    <Badge className="absolute -top-2 right-4 bg-metan-accent text-white">
                      {service.badge}
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-metan-gradient rounded-lg flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{service.description}</p>
                    
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-metan-accent flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
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
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Kā notiek process</h2>
            <p className="text-xl text-gray-600">No pieteikuma līdz legālai utilizācijai — 5 vienkārši soļi</p>
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
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Jūsu ieguvumi</h2>
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
                <Shield className="h-5 w-5 text-metan-accent flex-shrink-0" />
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
                  <Truck className="h-8 w-8 text-metan-primary" />
                  Izmantotā tehnika
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-lg">
                  Sertificēta vakuuma tehnika ar integrētu augstspiediena skalošanas funkciju. 
                  Vienā ciklā — attīrīšana un savākšana bez manuālas darbības.
                </p>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-metan-gray mb-2">Atkritumu kodi:</h4>
                    <div className="space-y-1">
                      <Badge variant="outline">EWC 20 01 25</Badge>
                      <Badge variant="outline">EWC 20 01 32</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-metan-gray mb-2">Apkalpojamie objekti:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>• HoReCa (restorāni, viesnīcas, ēdinātāji)</div>
                      <div>• Pārtikas ražotāji un izplatītāji</div>
                      <div>• Ražošanas uzņēmumi ar taukainiem atlikumiem</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Simple Contact Form */}
      <section className="py-20 bg-white">
        <div className="metan-container">
          <SimpleContactForm 
            variant="compact" 
            title="Pieteikt tauku savākšanu" 
          />
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <EnhancedCTA variant="services" />
      
      {/* Quick Order Form */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <div className="max-w-4xl mx-auto">
            <QuickOrderForm />
          </div>
        </div>
      </section>
      
      {/* Priority Contacts */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <PriorityContacts variant="full" />
        </div>
      </section>

      {/* Hidden SEO content */}
      <div style={{ display: 'none' }}>
        <p>tauku atdalītāju tīrīšana VVD PVD atļaujas legāla utilizācija METAN.LV</p>
        <p>eļļas savākšana HoReCa klienti vakuuma mašīnas biometāna izejvielas FOG waste</p>
        <p>augstspiediena skalošana kanalizācijas tīrīšana nosprostojumu novēršana Ainavas Nams</p>
        <p>sertificēti atkritumu apsaimniekošanas pakalpojumi dokumentācija izsekojamība APUS</p>
        <p>EWC 20 01 25 EWC 20 01 32 tauku atkritumi pārtikas atkritumi utilizācija</p>
      </div>
    </div>
  );
}