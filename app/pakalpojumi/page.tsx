'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Wrench, FileCheck, Shield, ArrowRight, CheckCircle, Phone, Calculator } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SEOStructuredData } from '@/components/SEOHead';
import { servicesStructuredData } from './metadata';
import PriorityContacts from '@/components/PriorityContacts';
import { 
  trackPageView, 
  trackUserJourney, 
  trackServiceInterest,
  trackCTA,
  trackContactMethod,
  trackPhoneConversion 
} from '@/components/Analytics';
import { CustomerTestimonials } from '@/components/CustomerTestimonials';
import { EnhancedCTA } from '@/components/EnhancedCTA';
import { SimpleContactForm } from '@/components/SimpleContactForm';

const services = [
  {
    icon: Truck,
    title: 'Tauku atdalītāju tīrīšana',
    description: 'Veicam tauku atdalītāju apkopi un tīrīšanu saskaņā ar VVD un PVD prasībām. Izmantojam sertificētas metodes un dokumentējam katru savākšanas gadījumu.',
    features: [
      'VVD un PVD prasībām atbilstoša tīrīšana',
      'Profesionāls vakuuma aprīkojums',
      'Pilna dokumentācija',
      'Regulāras apkopes',
    ],
    href: '/pakalpojumi/savaksana',
    badge: 'Populārākais',
  },
  {
    icon: Truck,
    title: 'Eļļas un tauku atkritumu savākšana',
    description: 'Savācam lietotas eļļas, taukus un pārtikas atliekas ar vakuuma mašīnām. Atkritumi tiek nodoti mehāniskai attīrīšanai un pēc tam pārstrādāti biometānā.',
    features: [
      'Vakuuma mašīnu savākšana',
      'HoReCa klientu apkalpošana',
      'Izsekojamība un dokumentācija',
      'Biometāna izejvielu sagatavošana',
    ],
    href: '/pakalpojumi/savaksana',
  },
  {
    icon: Wrench,
    title: 'Augstspiediena kanalizācijas skalošana',
    description: 'Piedāvājam industriālu cauruļvadu tīrīšanu ar augstspiediena iekārtām. Iespējama kombinēta tīrīšana ar vakuuma nosūcējiem.',
    features: [
      'Augstspiediena iekārtas',
      'Kombinēta tīrīšana',
      'Nosprostojumu novēršana',
      'Tauku nosēdumu likvidēšana',
    ],
    href: '/pakalpojumi/apstrade',
  },
  {
    icon: FileCheck,
    title: 'Legāla tauku utilizācija',
    description: 'Nodrošinām dokumentētu, izsekojamu un legālu tauku nodošanu. Pēc savākšanas tiek sastādīts pārskats klientam un dati tiek nodoti sistēmām.',
    features: [
      'Pilna dokumentācija',
      'Izsekojamības sistēma',
      'VVD/PVD atbilstība',
      'Klienta pārskati',
    ],
    href: '/pakalpojumi',
    badge: 'Sertificēts',
  },
];

const benefits = [
  'Legāli un sertificēti pakalpojumi',
  'Profesionāls aprīkojums un komanda',
  'Pilna dokumentācija un izsekojamība',
  'Atbilstība VVD un PVD prasībām',
  'Regulāra apkalpošana pēc grafika',
  'Sadarbība ar HoReCa sektoru',
];

export default function ServicesPage() {
  console.log('Services page loaded');
  const router = useRouter();

  useEffect(() => {
    trackPageView('services_page', {
      page_section: 'services',
      page_priority: 'high',
      conversion_potential: 'high',
    });
    
    trackUserJourney('services_page_visit', {
      page_type: 'service_catalog',
      intent: 'service_research',
      funnel_stage: 'high_intent'
    });
  }, []);

  const handleServiceClick = (serviceName: string, destination: string) => {
    trackServiceInterest(serviceName, 'services_page', {
      service_type: serviceName,
      click_location: 'service_card',
      intent: 'detailed_research'
    });
    
    trackCTA('service_details', 'services_page', destination);
    
    console.log(`🎯 Service interest: ${serviceName} → ${destination}`);
    
    router.push(destination);
  };

  const handleCTAClick = (ctaType: string, destination: string) => {
    trackCTA(ctaType, 'services_page', destination);
    
    if (ctaType === 'contact_now') {
      trackContactMethod('form', 'services_page', 'services_page');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOStructuredData data={servicesStructuredData} />
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
              Mūsu pakalpojumi
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              SIA "Ainavas Nams" nodrošina pilnu organisko atkritumu apsaimniekošanas ciklu. 
              Uzņēmuma piedāvātie pakalpojumi ir sertificēti, legāli un piemēroti pārtikas ražotājiem, 
              HoReCa klientiem un rūpnieciskiem objektiem.
            </p>
            
            {/* Quick contact buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="tel:+37127727724">
                <Button 
                  size="lg" 
                  className="metan-button-primary"
                  onClick={() => handleCTAClick('phone_call', 'tel:+37127727724')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Zvanīt tūlīt: +371 27727724
                </Button>
              </a>
              <Link href="/#calculator">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-metan-primary text-metan-primary hover:bg-metan-primary hover:text-white"
                  onClick={() => handleCTAClick('calculator', '/#calculator')}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Aprēķināt izmaksas
                </Button>
              </Link>
              <Link href="/kontakti">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-metan-primary text-metan-primary hover:bg-metan-primary hover:text-white"
                  onClick={() => handleCTAClick('contact_form', '/kontakti')}
                >
                  <FileCheck className="mr-2 h-5 w-5" />
                  Atstāt pieteikumu
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="metan-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card h-full relative bg-white" style={{ backgroundColor: 'white' }}>
                  {service.badge && (
                    <Badge className="absolute -top-2 right-4 bg-metan-accent text-white">
                      {service.badge}
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="w-12 h-12 bg-metan-gradient rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6" style={{ backgroundColor: 'white' }}>
                    <p className="text-gray-600">{service.description}</p>
                    
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-metan-accent flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced CTA buttons for direct contact */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button 
                        className="w-full justify-center metan-button-primary group text-sm flex-1"
                        onClick={() => handleServiceClick(service.title, service.href)}
                      >
                        Uzzināt vairāk
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <a href="tel:+37127727724" className="flex-1">
                        <Button 
                          variant="outline" 
                          className="w-full justify-center border-metan-primary text-metan-primary hover:bg-metan-primary hover:text-white text-sm"
                          onClick={() => handleCTAClick('phone_call', 'tel:+37127727724')}
                        >
                          Zvanīt tūlīt
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Kāpēc izvēlēties mūs?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <Shield className="h-5 w-5 text-metan-accent flex-shrink-0" />
                <span className="font-medium text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials - социальное доказательство */}
      <CustomerTestimonials />

      {/* Enhanced CTA Section - улучшенные призывы к действию */}
      <EnhancedCTA variant="services" />

      {/* Simple Contact Form - упрощенная форма заявки */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <SimpleContactForm variant="full" title="Pieteikt pakalpojumu" />
        </div>
      </section>

      {/* Priority Contacts Section */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <PriorityContacts variant="full" />
        </div>
      </section>

      {/* Hidden SEO content */}
      <div style={{ display: 'none' }}>
        <p>tauku atdalītāju tīrīšana VVD PVD atļaujas legāla utilizācija</p>
        <p>eļļas savākšana HoReCa klienti vakuuma mašīnas biometāna izejvielas</p>
        <p>augstspiediena skalošana kanalizācijas tīrīšana nosprostojumu novēršana</p>
        <p>sertificēti atkritumu apsaimniekošanas pakalpojumi dokumentācija izsekojamība</p>
      </div>
    </div>
  );
}