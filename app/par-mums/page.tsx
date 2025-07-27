'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Award, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import PriorityContacts from '@/components/PriorityContacts';

const teamMembers = [
  {
    name: 'Aleksejs Karalkins',
    role: 'Projekta vadītājs',
    description: 'Atbild par vispārējo projekta vadību, komunikāciju ar investoriem un biznesa stratēģijas ieviešanu.',
  },
  {
    name: 'Maksims Sjomochkins',
    role: 'Tehniskais vadītājs',
    description: 'Vada tehnisko ieviešanu, iekārtu izvēli un projektu integrāciju stacijā Bēnē.',
  },
  {
    name: 'Natalja Geisari',
    role: 'Biotehnoloģe',
    description: 'Pārrauga bioloģisko un ķīmisko procesu kvalitāti, sadarbojas ar laboratorijām un sertifikācijas iestādēm.',
  },
  {
    name: 'Gennadijs Garičevs',
    role: 'Galvenais inženieris',
    description: 'Nodrošina ražošanas procesu inženiertehnisko uzraudzību un tehnoloģiju ieviešanu.',
  },
  {
    name: 'Georgijs Firsovs',
    role: 'Sistēmu regulētājs',
    description: 'Atbild par automatizētu procesu regulēšanu un kontroles sistēmu uzturēšanu.',
  },
  {
    name: 'Andrejs Kuzņecovs',
    role: 'Enerģētikas inženieris',
    description: 'Plāno enerģijas padeves efektivitāti un palīdz projektēt energosistēmas sadarbībai ar biometāna ražošanu.',
  },
  {
    name: 'Nikita Sjomochkins',
    role: 'Automatizācijas speciālists',
    description: 'Programmē automatizācijas vadības sistēmas un nodrošina to sinhronizāciju ar ražošanas ciklu.',
  },
  {
    name: 'Viktors Ksenzovs',
    role: 'Valdes loceklis',
    description: 'Uzrauga juridiskos, finanšu un organizatoriskos aspektus, pārstāv uzņēmumu sadarbībā ar valsts iestādēm.',
  },
];

const values = [
  {
    icon: Building,
    title: 'Profesionalitāte',
    description: 'Augsti kvalificēta komanda ar pieredzi atkritumu apsaimniekošanā',
  },
  {
    icon: Award,
    title: 'Likumība',
    description: 'Visi pakalpojumi atbilst VVD un PVD prasībām',
  },
  {
    icon: Handshake,
    title: 'Partnerība',
    description: 'Ilgtermiņa sadarbība ar klientiem un uzticamiem partneriem',
  },
  {
    icon: Users,
    title: 'Vides apziņa',
    description: 'Ilgtspējīgi risinājumi aprites ekonomikas attīstībai',
  },
];

export default function AboutPage() {
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
              Mūsu stāsts
            </h1>
            <div className="text-xl text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong>No biogāzes stacijas 2014. gadā — līdz biometāna ekosistēmai 2025. gadā</strong>
              </p>
              <p>
                <strong>SIA "Ainavas Nams"</strong> stāsts sākas vēl pirms uzņēmuma juridiskās reģistrācijas. 
                Tā pamatā ir komanda, pieredze un infrastruktūra no <strong>SIA "Zemgales Enerģijas Parks"</strong>, 
                kas kopš 2014. gada darbojas biogāzes jomā Zemgales reģionā.
              </p>
              <p>
                Kopš 2021. gada zem <strong>SIA "Ainavas Nams"</strong> zīmola darbojas <strong>rūpnieciska biogāzes stacija</strong>, 
                kas ietver fermentācijas reaktorus, izejvielu pieņemšanas sistēmu, gāzes attīrīšanas līniju un 
                elektroenerģijas ražošanas licenci.
              </p>
              <p>
                2025. gadā uzsākam jaunu posmu – <span className="text-metan-primary font-semibold">METAN.LV</span> 
                ekosistēmu: <strong>tauki → polimēri → biogāze → biometāns → CO₂</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Misija, vērtības, vīzija</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-600">
              <p>
                Mēs ticam <strong>aprites ekonomikai</strong> – mūsu mērķis ir radīt ilgtspējīgu sistēmu, kur atkritumi kļūst par resursu.
              </p>
              <p>
                Līdz <strong>2030. gadam</strong> – kļūt par neatkarīgu biometāna risinājumu līderi Baltijā.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto mb-4 bg-metan-gradient rounded-lg flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Uzņēmuma attīstības hronoloģija</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No biogāzes stacijas infrastruktūras līdz pilnīgai biometāna ekosistēmas realizācijai
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-metan-primary opacity-20"></div>
              
              {/* Timeline items */}
              <div className="space-y-8">
                {[
                  {
                    year: "2014",
                    title: "Pamatu likšana",
                    description: "SIA \"Zemgales Enerģijas Parks\" dibināšana un biogāzes stacijas infrastruktūras uzsākšana Zemgales reģionā. Komandas un pieredzes veidošana.",
                    color: "bg-blue-500"
                  },
                  {
                    year: "2020", 
                    title: "Juridiskā reģistrācija",
                    description: "SIA \"Ainavas Nams\" oficiālā reģistrācija ar mērķi attīstīt biometāna un aprites ekonomikas projektus.",
                    color: "bg-green-500"
                  },
                  {
                    year: "2021",
                    title: "Rūpnieciskā darbība",
                    description: "Fermentācijas reaktoru palaišana, siltumenerģijas piegādes līgumi. Pilnīga biogāzes stacijas infrastruktūra ar elektroenerģijas ražošanas licenci.",
                    color: "bg-orange-500"
                  },
                  {
                    year: "2023",
                    title: "Biometāna attīstība",
                    description: "SIA \"Ainavas Nams\" biometāna projekta detalizēta projektēšana un tehnoloģijas plānošana.",
                    color: "bg-purple-500"
                  },
                  {
                    year: "2025",
                    title: "METAN.LV ekosistēma",
                    description: "Pilnīgas biometāna ražošanas ķēdes palaišana: tauki → polimēri → biogāze → biometāns → CO₂. Kompleksa risinājuma ieviešana.",
                    color: "bg-metan-primary"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative flex items-start"
                  >
                    {/* Year circle */}
                    <div className={`relative z-10 flex items-center justify-center w-16 h-16 ${item.color} rounded-full shadow-lg`}>
                      <span className="text-white font-bold text-sm">{item.year}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="ml-8 flex-1">
                      <Card className="metan-card">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl text-metan-gray">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Komanda</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit bg-metan-light text-metan-primary">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-8">Sertifikācija un sadarbība</h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Uzņēmums darbojas saskaņā ar <strong>VVD</strong> un <strong>PVD</strong> izsniegtām atļaujām. 
                Mēs sadarbojamies ar pārstrādes un enerģētikas uzraugošām iestādēm, kā arī ar HoReCa klientiem Latvijā.
              </p>
              <p>
                Visi mūsu pakalpojumi ir <strong>legāli un reģistrēti</strong> atbilstoši spēkā esošajiem normatīvajiem aktiem.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Priority Contacts Section */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <PriorityContacts variant="full" />
        </div>
      </section>
    </div>
  );
}