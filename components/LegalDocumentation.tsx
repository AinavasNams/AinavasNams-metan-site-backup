'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, Shield, Award, Scale, Phone, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackPhoneConversion, trackCTA } from '@/components/Analytics';
import { useRouter } from 'next/navigation';

const legalFeatures = [
  {
    icon: FileCheck,
    title: 'Līgumi par regulāru apkalpošanu',
    description: 'Noslēdzam līgumus par tauku izvešanu, tauku utilizāciju un tauku atdalītāju apkopi ar pilnu juridisko aizsardzību.',
    items: ['Līgums par pārtikas tauku izvešanu', 'Līgums par tauku utilizāciju', 'Līgums par tauku atdalītāja apkopi'],
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Shield,
    title: 'Licencēta tauku utilizācija',
    description: 'Visi mūsu pakalpojumi ir licencēti un atbilst vides aizsardzības prasībām. Garantējam legālu atkritumu apsaimniekošanu.',
    items: ['VVD licences un atļaujas', 'PVD atbilstības sertifikāti', 'APUS reģistrācija'],
    gradient: 'from-green-500 to-green-600',
  },
  {
    icon: Award,
    title: 'Kvalitātes sertifikācija',
    description: 'Mūsu uzņēmums ir sertificēts un atbilst visiem kvalitātes standartiem atkritumu apsaimniekošanas jomā.',
    items: ['ISO 14001 vides pārvaldība', 'Kvalitātes kontroles sistēma', 'Regulāri kvalitātes auditi'],
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    icon: Scale,
    title: 'Normatīvā atbilstība',
    description: 'Nodrošinām pilnu atbilstību Latvijas un ES normatīvajiem aktiem atkritumu apsaimniekošanas jomā.',
    items: ['MK noteikumi Nr. 302 par atkritumiem', 'Atkritumu apsaimniekošanas likums', 'ES direktīvas par atkritumiem'],
    gradient: 'from-red-500 to-red-600',
  },
];

const documentationProcess = [
  {
    step: '1',
    title: 'Līguma noslēgšana',
    description: 'Sazinieties ar mums pa tālruni vai e-pastu, lai noslēgtu līgumu par taiku izvešanu un utilizāciju.',
  },
  {
    step: '2',
    title: 'Dokumentu sagatavošana',
    description: 'Mēs sagatavosim visus nepieciešamos dokumentus un līgumus atbilstoši jūsu uzņēmuma vajadzībām.',
  },
  {
    step: '3',
    title: 'Pakalpojuma sniegšana',
    description: 'Pēc katras tauku izvešanas izsniedzam apliecinājuma aktu par legālu utilizāciju.',
  },
  {
    step: '4',
    title: 'Dokumentācijas glabāšana',
    description: 'Glabājiet saņemtos aktus - tie būs jāuzrāda VVD, PVD vai VID kontrolējošām iestādēm.',
  },
];

export function LegalDocumentation() {
  console.log('LegalDocumentation component rendered');
  const router = useRouter();

  const handlePhoneClick = () => {
    console.log('📞 Phone button clicked: +371 27727724');
    trackPhoneConversion('+371 27727724', 'legal_documentation_section');
    trackCTA('call', 'legal_documentation_phone', 'tel:+37127727724');
    
    // Track Google Ads conversion
    if (typeof window !== 'undefined' && window.trackRegistrationClick) {
      window.trackRegistrationClick('phone_button');
    }
    
    // Open phone dialer
    window.location.href = 'tel:+37127727724';
  };

  const handleContractRequest = () => {
    console.log('📄 Contract request button clicked');
    trackCTA('contact_form', 'legal_documentation_contract', '/kontakti');
    
    // Track Google Ads conversion
    if (typeof window !== 'undefined' && window.trackRegistrationClick) {
      window.trackRegistrationClick('contract_request');
    }
    
    // Navigate to contact page using Next.js router
    router.push('/kontakti');
  };

  return (
    <section className="py-20 bg-white">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4">
            Juridiskais nodrošinājums
          </h2>
          <p className="text-lg text-metan-text-light max-w-3xl mx-auto">
            Pilna dokumentācija un atbilstība normatīvajiem aktiem • 
            Licencēti pakalpojumi uzņēmumiem visā Latvijā
          </p>
        </motion.div>

        {/* Legal Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {legalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="metan-card h-full group hover:scale-105 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-lg text-metan-gray">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-metan-text mb-4">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <div key={idx} className="flex items-start text-xs text-metan-text-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-metan-accent mr-2 mt-1.5 flex-shrink-0"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Documentation Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-metan-light/50 to-white rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-metan-gray text-center mb-8">
            Dokumentācijas process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentationProcess.map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-metan-primary to-metan-accent flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                  {process.step}
                </div>
                <h4 className="font-semibold text-metan-gray mb-2">
                  {process.title}
                </h4>
                <p className="text-sm text-metan-text-light">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-metan-primary/5 to-metan-accent/5 rounded-2xl p-8 border border-metan-primary/10">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-metan-primary mr-3" />
              <h3 className="text-xl font-bold text-metan-gray">
                Nepieciešami dokumenti utilizācijai?
              </h3>
            </div>
            <p className="text-metan-text mb-6 max-w-2xl mx-auto">
              Sazinieties ar mums, lai noslēgtu līgumu par tauku izvešanu un saņemtu pilnu dokumentāciju par legālu utilizāciju
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-metan-primary to-metan-accent hover:from-metan-primary/90 hover:to-metan-accent/90 text-white px-8"
                onClick={handlePhoneClick}
                data-macaly="legal-docs-phone-cta"
              >
                <Phone className="h-5 w-5 mr-2" />
                +371 27727724
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-metan-primary text-metan-primary hover:bg-metan-light"
                onClick={handleContractRequest}
                data-macaly="legal-docs-contract-cta"
              >
                <FileCheck className="h-5 w-5 mr-2" />
                Pieprasīt līgumu
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}