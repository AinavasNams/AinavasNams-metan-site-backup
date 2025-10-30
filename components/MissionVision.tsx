'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export function MissionVision() {
  console.log('MissionVision component rendered');

  return (
    <section className="py-20 bg-white">
      <div className="metan-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="metan-card h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-metan-primary to-metan-accent flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-metan-gray">
                  Mūsu misija
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-lg font-medium">
                  Mēs veidojam tīru enerģiju no tā, ko agrāk sauca par atkritumiem.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  SIA &quot;Ainavas Nams&quot; pārveido taukus, pārtikas un lauksaimniecības atkritumus ilgtspējīgā enerģijā, 
                  videi draudzīgos materiālos un tehnoloģiskajā CO₂.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Mūsu misija ir padarīt atkritumu pārstrādi nevis par pienākumu, bet par attīstības dzinējspēku. 
                  Mēs ticam, ka katrs litrs tauku un katrs kilograms organisko vielu var kļūt par vērtību: 
                  enerģiju, degvielu, materiāliem un klimata ieguvumu.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="metan-card h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-metan-accent to-metan-blue flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-metan-gray">
                  Mūsu vīzija līdz 2030. gadam
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-metan-text text-lg font-medium">
                  Kļūt par Baltijas līderi biometāna ražošanā un aprites ekonomikas inovācijās
                </p>
                <div className="space-y-3">
                  <p className="text-metan-text leading-relaxed">
                    Mūsu ilgtermiņa mērķis ir izveidot Latvijā mērogojamu, efektīvu un ilgtspējīgu infrastruktūru, 
                    kas pārvērš organiskos atkritumus enerģijā, resursos un klimatiskajā vērtībā.
                  </p>
                  <div className="space-y-2 text-sm text-metan-text">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span>Modernizēt un attīstīt 5 biometāna stacijas dažādos reģionos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span>Pārstrādāt vairāk nekā 50 000 tonnas atkritumu gadā</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span>Eksportēt biometānu un CO₂ uz Lietuvu, Igauniju un Skandināviju</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span>Attīstīt biopolimēru ražošanu no otrreizējiem taukiem</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Company Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-metan-primary to-metan-accent flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-metan-gray">
              Mūsu stāsts
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-metan-gray">
                No biogāzes stacijas 2014. gadā — līdz biometāna ekosistēmai 2025. gadā
              </h3>
              <p className="text-gray-600 leading-relaxed">
                SIA &quot;Ainavas Nams&quot; stāsts sākas vēl pirms uzņēmuma juridiskās reģistrācijas. Tā pamatā ir komanda, 
                pieredze un infrastruktūra no SIA &quot;Zemgales Enerģijas Parks&quot;, kas kopš 2014. gada darbojas biogāzes jomā Zemgales reģionā.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Kopš 2021. gada zem &quot;Zemgales Enerģijas Parks&quot; zīmola darbojas rūpnieciska biogāzes stacija, 
                kas ietver fermentācijas reaktorus, izejvielu pieņemšanas sistēmu, gāzes attīrīšanas līniju 
                un elektroenerģijas ražošanas licenci.
              </p>
            </div>
            
            <div className="space-y-4">
              {/* Timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-metan-primary rounded-full flex items-center justify-center text-white font-bold">
                    2014
                  </div>
                  <div className="text-sm text-gray-600">
                    SIA &quot;Zemgales Enerģijas Parks&quot; dibināšana, stacijas uzsākšana
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-metan-accent rounded-full flex items-center justify-center text-white font-bold">
                    2021
                  </div>
                  <div className="text-sm text-gray-600">
                    Fermentācijas palaišana, siltumenerģijas līgumi
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-metan-blue rounded-full flex items-center justify-center text-white font-bold">
                    2023
                  </div>
                  <div className="text-sm text-gray-600">
                    SIA &quot;Ainavas Nams&quot; reģistrācija, biometāna projektēšana
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-metan-primary to-metan-accent rounded-full flex items-center justify-center text-white font-bold">
                    2025
                  </div>
                  <div className="text-sm text-gray-600">
                    METAN.LV palaišana: tauki → polimēri → biogāze → biometāns → CO₂
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}