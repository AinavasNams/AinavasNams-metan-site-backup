'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Users, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
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
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-metan-gray mb-6">
              Privātuma politika
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              SIA "Ainavas Nams" apņemas aizsargāt jūsu privātumu un personas datus 
              saskaņā ar GDPR un Latvijas normatīvajiem aktiem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="metan-container">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Data Controller */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Database className="h-6 w-6 text-metan-primary" />
                    Datu pārzinis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-metan-light/30 p-4 rounded-lg">
                    <p className="font-semibold text-metan-gray">SIA "Ainavas Nams"</p>
                    <p className="text-gray-600">Reģ. Nr.: 40203328328</p>
                    <p className="text-gray-600">Adrese: Rūpniecības iela 2D, Bēne, Zemgales novads, LV-3017</p>
                    <p className="text-gray-600">E-pasts: tsv@metan.lv</p>
                    <p className="text-gray-600">Tālrunis: +371 27727724</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Collection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-metan-primary" />
                    Kādus datus mēs vācam
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-metan-accent rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-gray-700">Kontaktinformācija</p>
                        <p className="text-gray-600">Vārds, uzvārds, e-pasta adrese, tālruņa numurs, uzņēmuma nosaukums</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-metan-accent rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-gray-700">Tehniskā informācija</p>
                        <p className="text-gray-600">IP adrese, pārlūkprogrammas tips, ierīces informācija, apmeklējuma laiks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-metan-accent rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold text-gray-700">Pakalpojumu informācija</p>
                        <p className="text-gray-600">Informācija par jūsu interesi par mūsu pakalpojumiem un kalkulāciju rezultāti</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Purpose of Processing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-metan-primary" />
                    Datu apstrādes mērķi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-metan-gray mb-2">Pakalpojumu sniegšana</h4>
                      <p className="text-sm text-gray-600">Konsultāciju sniegšana, piedāvājumu sagatavošana, līgumu izpilde</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-metan-gray mb-2">Komunikācija</h4>
                      <p className="text-sm text-gray-600">Atbildes uz jautājumiem, informēšana par pakalpojumiem</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-metan-gray mb-2">Mājaslapas uzlabošana</h4>
                      <p className="text-sm text-gray-600">Analītika, lietotāju pieredzes uzlabošana</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-metan-gray mb-2">Juridiskās saistības</h4>
                      <p className="text-sm text-gray-600">Likumdošanas prasību izpilde, dokumentācijas uzturēšana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lock className="h-6 w-6 text-metan-primary" />
                    Datu aizsardzība
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Mēs izmantojam mūsdienīgas tehniskās un organizatoriskās datu aizsardzības metodes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span className="text-gray-600">SSL sertifikāti datu šifrēšanai</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span className="text-gray-600">Regulāras sistēmas drošības pārbaudes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span className="text-gray-600">Ierobežota piekļuve personas datiem</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      <span className="text-gray-600">Regulāras darbinieku apmācības</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-metan-primary" />
                    Jūsu tiesības
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-metan-accent rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold text-gray-700">Piekļuves tiesības</p>
                          <p className="text-sm text-gray-600">Uzzināt, kādus jūsu datus mēs apstrādājam</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-metan-accent rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold text-gray-700">Labošanas tiesības</p>
                          <p className="text-sm text-gray-600">Labot nepareizus vai novecojušus datus</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-metan-accent rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold text-gray-700">Dzēšanas tiesības</p>
                          <p className="text-sm text-gray-600">Pieprasīt savu datu dzēšanu</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-metan-accent rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold text-gray-700">Ierobežošanas tiesības</p>
                          <p className="text-sm text-gray-600">Ierobežot datu apstrādi</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-metan-accent rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold text-gray-700">Pārnesamības tiesības</p>
                          <p className="text-sm text-gray-600">Saņemt savus datus strukturētā formātā</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-metan-accent rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold text-gray-700">Iebildumu tiesības</p>
                          <p className="text-sm text-gray-600">Iebilst pret datu apstrādi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="metan-card bg-metan-light/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-metan-primary" />
                    Kontaktinformācija
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Ja jums ir jautājumi par šo privātuma politiku vai vēlaties izmantot savas tiesības, 
                    lūdzu, sazinieties ar mums:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-metan-gray">E-pasts:</p>
                      <a href="mailto:tsv@metan.lv" className="text-metan-primary hover:text-metan-accent transition-colors">
                        tsv@metan.lv
                      </a>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-metan-gray">Tālrunis:</p>
                      <a href="tel:+37127727724" className="text-metan-primary hover:text-metan-accent transition-colors">
                        +371 27727724
                      </a>
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
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <p className="text-gray-500 text-sm">
                Šī privātuma politika ir atjaunināta: 2025. gada 14. jūlijā
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}