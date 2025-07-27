'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UtensilsCrossed, Fish, Building, Factory } from 'lucide-react';
import { motion } from 'framer-motion';

const industries = [
  {
    icon: UtensilsCrossed,
    title: 'HoReCa uzņēmumi',
    subtitle: 'Restorāni • Kafejnīcas • Viesnīcas',
    description: 'Specializējamies pārtikas tauku un eļļas savākšanā no restorāniem, kafejnīcām un viesnīcām. Regulāra tauku atdalītāju tīrīšana un apkope.',
    services: ['Tauku atdalītāju tīrīšana', 'Fritēšanas eļļas savākšana', 'Regulārs apkalpošanas grafiks'],
    gradient: 'from-amber-400 to-orange-500',
    bgImage: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: '500+ restorāni',
  },
  {
    icon: Fish,
    title: 'Zivju pārstrādes uzņēmumi',
    subtitle: 'Rūpnieciski • Augstas kvalitātes',
    description: 'Specializēts serviss zivju pārstrādes uzņēmumiem - zivju tauku utilizācija, atkritumu savākšana un cauruļu tīrīšana.',
    services: ['Zivju tauku utilizācija', 'Rūpniecisko cauruļu tīrīšana', 'Atkritumu pārstrādes atbilstība'],
    gradient: 'from-blue-400 to-cyan-500',
    bgImage: 'https://images.pexels.com/photos/128408/pexels-photo-128408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: '50+ rūpnīcas',
  },
  {
    icon: Building,
    title: 'Pārtikas ražošanas uzņēmumi',
    subtitle: 'Ražotnes • Kooperatīvi • Fabrikas',
    description: 'Piedāvājam pilnu spektru pakalpojumu pārtikas ražošanas uzņēmumiem - no tauku savākšanas līdz sanitārai tīrīšanai.',
    services: ['Pārtikas tauku savākšana', 'Sanitārā kanalizācijas tīrīšana', 'Ražošanas atkritumu utilizācija'],
    gradient: 'from-green-400 to-emerald-500',
    bgImage: 'https://images.pexels.com/photos/5605018/pexels-photo-5605018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: '200+ ražotāji',
  },
  {
    icon: Factory,
    title: 'Rūpnieciskie objekti',
    subtitle: 'Tehniski • Komerciāli • Loģistikas',
    description: 'Nodrošinām rūpniecisko cauruļu tīrīšanu, tauku novadīšanas sistēmu apkopi un taukaino notekūdeņu atsūknēšanu.',
    services: ['Cauruļvadu tīrīšana no taukiem', 'Sistēmu apkalpošana', 'Taukaino notekūdeņu novadīšana'],
    gradient: 'from-purple-400 to-violet-500',
    bgImage: 'https://images.pexels.com/photos/7512913/pexels-photo-7512913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    stats: '100+ objekti',
  },
];

export function IndustrySpecialization() {
  console.log('IndustrySpecialization component rendered');

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4">
            Mūsu specializācija
          </h2>
          <p className="text-lg text-metan-text-light max-w-2xl mx-auto">
            Profesionāls serviss uzņēmumiem visā Latvijā • Rīgā, Jūrmalā un 300km rādiusā
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="metan-card h-full group hover:scale-105 transition-all duration-300 overflow-hidden relative">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="w-full h-full bg-cover bg-center" 
                       style={{backgroundImage: `url(${industry.bgImage})`}}></div>
                </div>
                
                <CardHeader className="relative z-10">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${industry.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <industry.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-metan-gray mb-1">
                    {industry.title}
                  </CardTitle>
                  <p className="text-sm font-medium text-metan-accent mb-2">
                    {industry.subtitle}
                  </p>
                  <div className="text-xs text-metan-primary font-semibold">
                    {industry.stats}
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  <p className="text-sm text-metan-text mb-4">
                    {industry.description}
                  </p>
                  <div className="space-y-1">
                    {industry.services.map((service, idx) => (
                      <div key={idx} className="flex items-center text-xs text-metan-text-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-metan-accent mr-2"></div>
                        {service}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-metan-text">
              <span className="font-semibold text-metan-primary">Licencēti pakalpojumi</span> • 
              Pilna dokumentācijas nodrošināšana • 
              <span className="font-semibold text-metan-primary">VVD, PVD, VID atbilstība</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}