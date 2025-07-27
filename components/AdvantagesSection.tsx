'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Lightbulb, Handshake, Cog, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const advantages = [
  {
    icon: CheckCircle,
    title: 'Pilns cikls — no atkritumiem līdz tīrai enerģijai',
    description: 'Mēs pārvaldām visus posmus: savākšanu, fermentāciju, attīrīšanu, transportēšanu un realizāciju. Tas nodrošina kvalitāti, caurspīdīgumu un kontroli.',
    gradient: 'from-green-400 to-green-600',
  },
  {
    icon: Shield,
    title: 'Licences, sertifikācija un starptautiski standarti',
    description: 'Ražošana atbilst RED II, ISCC, GoO prasībām. Mums ir visas nepieciešamās atļaujas atkritumu pārstrādei un enerģijas ražošanai.',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    icon: Cog,
    title: 'Elastīga loģistika ar savu autoparku',
    description: 'Mūsu vakuuma mašīnas un sadarbības partneri nodrošina izejvielu savākšanu visā reģionā — katru dienu.',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    icon: Lightbulb,
    title: 'Otrreizēja tauku un eļļas pārstrāde',
    description: 'Izmantojam mehānisko attīrīšanu, centrifugēšanu un pasterizāciju, lai iegūtu vērtīgas frakcijas pat no sarežģītiem atlikumiem.',
    gradient: 'from-orange-400 to-orange-600',
  },
  {
    icon: Award,
    title: 'Pierādīts ekonomiskais efekts',
    description: 'Mūsu biometāna pašizmaksa ir viena no zemākajām reģionā. Investori saņem stabilu atdevi ar pārskatāmu modeli.',
    gradient: 'from-yellow-400 to-yellow-600',
  },
  {
    icon: Handshake,
    title: 'ESG un klimata ietekmes vadība',
    description: 'Katrs mūsu saražotais MWh palīdz samazināt CO₂ emisijas. Mēs neesam tikai neitrāli — mēs radām pozitīvu klimata bilanci.',
    gradient: 'from-teal-400 to-teal-600',
  },
];

export function AdvantagesSection() {
  console.log('AdvantagesSection component rendered');

  return (
    <section className="py-20 bg-gray-50">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-metan-gray mb-4">
            Kāpēc izvēlas mūs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mēs nodrošinām pilnu atbilstību VVD, PVD, VID un APUS prasībām — bez normatīvajiem riskiem jūsu uzņēmumam.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="metan-card h-full group hover:scale-105 transition-all duration-300 !bg-white">
                <CardHeader className="!bg-white">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${advantage.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <advantage.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-metan-gray leading-tight">
                    {advantage.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="!bg-white">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-metan-gray mb-6 text-center">
            Mūsu vērtības
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-metan-gradient rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-metan-gray mb-2">Ilgtspēja</h4>
              <p className="text-sm text-gray-600">
                Pilnīga sistēma, kurā tauki pārtop enerģijā, bet atlikumi — vērtīgos resursos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-metan-gradient rounded-full flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-metan-gray mb-2">Inovācijas</h4>
              <p className="text-sm text-gray-600">
                Digitāli risinājumi, integrēti ar APUS sistēmu un uzraudzības iestāžu prasībām
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-metan-gradient rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-metan-gray mb-2">Atbildība</h4>
              <p className="text-sm text-gray-600">
                Pilna normatīvo risku uzņemšanās un atbilstība VVD, PVD, VID prasībām
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-metan-gradient rounded-full flex items-center justify-center">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-metan-gray mb-2">Partnerība</h4>
              <p className="text-sm text-gray-600">
                Caurspīdīga sadarbība ar HoReCa, pārtikas ražotājiem un loģistikas uzņēmumiem
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}