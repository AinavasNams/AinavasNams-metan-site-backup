'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, ArrowRight, DollarSign, BarChart3, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export function CalculatorBlocks() {
  const { localePath } = useTranslation();
  console.log('CalculatorBlocks component rendered');

  // Show only the services calculator on homepage for better conversion
  const calculator = {
    id: 'services',
    title: 'Pakalpojumu kalkulators',
    subtitle: 'Aprēķiniet tauku savākšanas izmaksas',
    description: 'Uzziniet precīzu pakalpojumu cenu atkarībā no jūsu vajadzībām. Iekļauj visus nepieciešamos darbus un materiālus.',
    icon: BarChart3,
    href: '/#calculator',
    gradient: 'from-metan-primary to-metan-accent',
    features: [
      'Tauku atdalītāju tīrīšana',
      'Eļļas savākšana un utilizācija', 
      'Kanalizācijas skalošana',
      'Regulārie pakalpojumi'
    ]
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-metan-light/30">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-6">
            Sāciet ietaupīt jau šodien!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Izmantojiet mūsu kalkulatoru, lai precīzi aprēķinātu pakalpojumu izmaksas 
            un saņemtu individuālu piedāvājumu
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="metan-card overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className={`h-3 bg-gradient-to-r ${calculator.gradient}`} />
              
              <CardHeader className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-4 rounded-lg bg-gradient-to-r ${calculator.gradient} text-white`}>
                    <calculator.icon className="h-10 w-10" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-metan-gray mb-1">
                      {calculator.title}
                    </CardTitle>
                    <p className="text-gray-600">{calculator.subtitle}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {calculator.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-metan-gray">Iekļauj:</h4>
                  <ul className="space-y-3">
                    {calculator.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-600">
                        <CheckCircle className="h-5 w-5 text-metan-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={localePath(calculator.href)} className="block">
                  <Button className={`w-full text-white bg-gradient-to-r ${calculator.gradient} hover:opacity-90 transition-all duration-300 group-hover:scale-105 py-6 text-lg`}>
                    <Calculator className="mr-2 h-6 w-6" />
                    Sākt aprēķinu
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 inline-block">
            <DollarSign className="h-8 w-8 text-metan-primary mx-auto mb-3" />
            <p className="text-gray-600 max-w-md">
              <strong>Bez maksas:</strong> Aprēķins ir bez maksas. 
              Saņemiet precīzus aprēķinus un piedāvājumu bez saistībām.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}