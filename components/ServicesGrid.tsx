'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Factory, Wrench, FileCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Truck,
    title: 'Tauku un eļļas savākšana',
    description: 'Savācam lietotas eļļas, taukus un pārtikas atliekas ar vakuuma mašīnām. Atkritumi tiek nodoti mehāniskai attīrīšanai un pēc tam pārstrādāti biometānā.',
    href: '/pakalpojumi/savaksana',
    gradient: 'from-green-400 to-green-600',
    bgImage: 'https://images.pexels.com/photos/7512976/pexels-photo-7512976.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: '12,000+ tonnas gadā',
  },
  {
    icon: Factory,
    title: 'Biometāna stacija Bēnē',
    description: 'Moderna biometāna ražošanas stacija ar pilnu ciklu. CH₄ Future projekts ar membrānu attīrīšanas tehnoloģiju un CO₂ uztveršanu.',  
    href: '/projekti/biometans',
    gradient: 'from-blue-400 to-blue-600',
    bgImage: 'https://images.pexels.com/photos/31403876/pexels-photo-31403876.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: '26,951 MWh gadā',
  },
  {
    icon: Wrench,
    title: 'Augstspiediena tīrīšana',
    description: 'Piedāvājam industriālu cauruļvadu tīrīšanu ar augstspiediena iekārtām. Iespējama kombinēta tīrīšana ar vakuuma nosūcējiem.',
    href: '/pakalpojumi/apstrade',
    gradient: 'from-purple-400 to-purple-600',
    bgImage: 'https://images.pexels.com/photos/7512913/pexels-photo-7512913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: '24/7 ekstrenais dienests',
  },
  {
    icon: FileCheck,
    title: 'Legāla utilizācija',
    description: 'Nodrošinām dokumentētu, izsekojamu un legālu tauku nodošanu. Pilna atbilstība VVD, PVD, VID un APUS prasībām.',
    href: '/pakalpojumi',
    gradient: 'from-metan-primary to-metan-accent',
    bgImage: 'https://images.pexels.com/photos/6994743/pexels-photo-6994743.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: '200+ licencēti partneri',
  },
];

export function ServicesGrid() {
  console.log('ServicesGrid component rendered');

  return (
    <section className="py-20 bg-white">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-metan-gray mb-4">
            Mūsu pakalpojumi
          </h2>
        </motion.div>

        <div className="bento-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
            >
              <Card className="metan-card h-full group hover:scale-105 transition-all duration-300 !bg-white overflow-hidden relative">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="w-full h-full bg-cover bg-center" 
                       style={{backgroundImage: `url(${service.bgImage})`}}></div>
                </div>
                
                <CardHeader className="!bg-transparent relative z-10">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-metan-gray">
                    {service.title}
                  </CardTitle>
                  <div className="text-sm font-medium text-metan-accent">
                    {service.stats}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col !bg-transparent relative z-10">
                  <p className="text-metan-text mb-6 flex-1">
                    {service.description}
                  </p>
                  <Link href={service.href}>
                    <Button variant="ghost" className="w-full justify-between text-metan-primary hover:bg-metan-light/80 group border border-metan-primary/20 backdrop-blur-sm">
                      Uzzināt vairāk
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}