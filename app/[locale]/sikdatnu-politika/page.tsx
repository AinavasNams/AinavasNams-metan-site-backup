'use client';

import { motion } from 'framer-motion';
import { Cookie, Settings, Eye, BarChart3, Shield, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      title: 'Nepieciešamās sīkdatnes',
      description: 'Šīs sīkdatnes ir nepieciešamas, lai mājaslapas pamatfunkcijas darbotos pareizi.',
      icon: Shield,
      color: 'bg-green-100 text-green-800',
      examples: [
        'Sesijas identifikators',
        'Valodas izvēle',
        'Drošības žetoni',
        'Formu dati'
      ]
    },
    {
      title: 'Analītikas sīkdatnes',
      description: 'Palīdz mums saprast, kā apmeklētāji izmanto mūsu mājaslapu.',
      icon: BarChart3,
      color: 'bg-blue-100 text-blue-800',
      examples: [
        'Lapu skatījumu skaitītājs',
        'Apmeklētāju statistika',
        'Populārākās lapas',
        'Ierīces informācija'
      ]
    },
    {
      title: 'Funkcionālās sīkdatnes',
      description: 'Nodrošina papildu funkcionalitāti un personalizētu pieredzi.',
      icon: Settings,
      color: 'bg-purple-100 text-purple-800',
      examples: [
        'Lietotāja preferences',
        'Iepriekšējo darbību atmiņa',
        'Personalizēts saturs',
        'Saglabātie iestatījumi'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-metan-light to-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-metan-gradient rounded-full flex items-center justify-center">
              <Cookie className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-metan-gray mb-6">
              Sīkdatņu politika
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Informācija par to, kā SIA "Ainavas Nams" mājaslapā tiek izmantotas sīkdatnes 
              un līdzīgas tehnoloģijas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What are cookies */}
      <section className="py-20">
        <div className="metan-container">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Info className="h-6 w-6 text-metan-primary" />
                    Kas ir sīkdatnes?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Sīkdatnes ir mazi teksta faili, kas tiek saglabāti jūsu ierīcē, kad apmeklējat mūsu mājaslapu. 
                    Tās palīdz mums nodrošināt labāku lietotāju pieredzi, atcerēties jūsu preferences un 
                    analizēt mājaslapas lietojumu.
                  </p>
                  <div className="bg-metan-light/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Svarīgi:</strong> Sīkdatnes nesatur personīgu informāciju un nevar kaitēt jūsu ierīcei. 
                      Jūs varat jebkurā laikā mainīt sīkdatņu iestatījumus vai dzēst tās.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cookie Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-metan-gray mb-8 text-center">
                Sīkdatņu veidi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cookieTypes.map((type, index) => (
                  <Card key={index} className="metan-card h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-metan-gradient rounded-full flex items-center justify-center">
                          <type.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge className={type.color}>
                          {type.title}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{type.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {type.description}
                      </p>
                      <div>
                        <h4 className="font-semibold text-metan-gray mb-2 text-sm">Piemēri:</h4>
                        <ul className="space-y-1">
                          {type.examples.map((example, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                              <div className="w-1.5 h-1.5 bg-metan-accent rounded-full"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Third Party Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-metan-primary" />
                    Trešo pušu sīkdatnes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Mūsu mājaslapā var tikt izmantotas arī trešo pušu sīkdatnes no šādiem pakalpojumiem:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-metan-gray mb-2">Google Analytics</h4>
                      <p className="text-sm text-gray-600">
                        Apmeklētāju statistika un mājaslapas lietojuma analīze
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-metan-gray mb-2">Google Tag Manager</h4>
                      <p className="text-sm text-gray-600">
                        Konversiju un mārketinga kampaņu izsekošana
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-metan-gray mb-2">Google Maps</h4>
                      <p className="text-sm text-gray-600">
                        Interaktīvās kartes un atrašanās vietas rādīšana
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-metan-gray mb-2">Sociālie tīkli</h4>
                      <p className="text-sm text-gray-600">
                        Facebook, LinkedIn, Instagram integrācija
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cookie Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Settings className="h-6 w-6 text-metan-primary" />
                    Kā pārvaldīt sīkdatnes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-metan-gray mb-2">Pārlūkprogrammās</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        Jūs varat mainīt sīkdatņu iestatījumus savā pārlūkprogrammā:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-gray-50 p-3 rounded text-center">
                          <p className="font-medium text-xs">Chrome</p>
                          <p className="text-xs text-gray-600">Iestatījumi → Konfidencialitāte</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded text-center">
                          <p className="font-medium text-xs">Firefox</p>
                          <p className="text-xs text-gray-600">Opcijas → Konfidencialitāte</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded text-center">
                          <p className="font-medium text-xs">Safari</p>
                          <p className="text-xs text-gray-600">Preferences → Privacy</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded text-center">
                          <p className="font-medium text-xs">Edge</p>
                          <p className="text-xs text-gray-600">Iestatījumi → Sīkdatnes</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-metan-light/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-metan-gray mb-2">Mūsu mājaslapā</h4>
                      <p className="text-sm text-gray-600">
                        Apmeklējot mūsu mājaslapu pirmo reizi, jūs redzēsiet sīkdatņu paziņojumu, 
                        kur varēsiet izvēlēties, kuras sīkdatnes atļaut. Šos iestatījumus var mainīt jebkurā laikā.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact and Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="metan-card bg-metan-light/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-metan-primary" />
                    Kontakti un atjauninājumi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-metan-gray mb-2">Jautājumi?</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        Ja jums ir jautājumi par sīkdatņu izmantošanu, sazinieties ar mums:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                          <a href="mailto:tsv@metan.lv" className="text-metan-primary hover:text-metan-accent transition-colors text-sm">
                            tsv@metan.lv
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                          <a href="tel:+37127727724" className="text-metan-primary hover:text-metan-accent transition-colors text-sm">
                            +371 27727724
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-metan-gray mb-2">Atjauninājumi</h4>
                      <p className="text-gray-600 text-sm">
                        Mēs varam periodiski atjaunināt šo sīkdatņu politiku. Visi būtiski izmaiņu paziņojumi 
                        tiks publicēti mūsu mājaslapā.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <p className="text-gray-500 text-sm">
                Šī sīkdatņu politika ir atjaunināta: 2025. gada 14. jūlijā
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}