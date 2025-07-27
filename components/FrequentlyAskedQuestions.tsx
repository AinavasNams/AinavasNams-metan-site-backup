'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, FileCheck, HelpCircle, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackPhoneConversion, trackCTA } from '@/components/Analytics';
import { useRouter } from 'next/navigation';

const faqData = [
  {
    id: 'blocked-separator',
    icon: AlertTriangle,
    question: 'Tauku atdalītājs ir aizsērējis - ko darīt?',
    answer: `Vispirms jāaptur iekārtas darbs un jāsazinās ar licencētu servisu vai tauku atkritumu apsaimniekotāju. Aizsērējis tauku atdalītājs var radīt noplūdes un nepatīkamas smakas, tāpēc neatliekot veiciet tīrīšanu ar profesionālu palīdzību.

Mūsu uzņēmums (SIA "Ainavas Nams") piedāvā sertificētu tauku atdalītāju tīrīšanu – izmantojam specializētu vakuuma tehniku un augstspiediena skalošanu, dokumentējot darbu gaitu. Pēc pakalpojuma sniegšanas izsniedzam apliecinājuma aktu par tauku atkritumu izvešanu, ko var uzrādīt VID vai VVD kā pierādījumu, ka atkritumi savākti un utilizēti atbilstoši normatīvo aktu prasībām.

Regulāra profilaktiska tauku atdalītāja tīrīšana palīdzēs novērst šādas situācijas nākotnē.`,
    gradient: 'from-red-500 to-red-600',
    urgent: true,
  },
  {
    id: 'where-dispose',
    icon: MapPin,
    question: 'Kur nodot fritēšanas taukus uzņēmumiem?',
    answer: `Izmantotos fritēšanas (cepamos) taukus un eļļas nedrīkst liet kanalizācijā vai izmest kopējos atkritumos – to nosaka vides aizsardzības prasības. Saskaņā ar MK noteikumiem Nr. 302 lietotie augu eļļas un tauki klasificējami kā atkritumi, kas jānodod licencētam atkritumu apsaimniekotājam.

Uzņēmumiem ieteicams uzkrāt atdzesētus taukus speciālā slēgtā konteinerā. Kad konteiners ir pilns (vai pēc saskaņota grafika), atkritumu apsaimniekotājs taukus savāc utilizācijai.

Mūsu uzņēmums nodrošina lietoto eļļu un tauku savākšanas pakalpojumu: izsniedzam klientam piemērotas tvertnes tauku uzkrāšanai un vienojamies par izvešanas biežumu. Savāktie tauki tiek pārstrādāti videi draudzīgi – piemēram, biometāna ražošanā, tādējādi tie tiek utilizēti likumīgi un uzņēmums izpilda normatīvo aktu prasības.

Lai pieteiktu tauku nodošanu, sazinieties ar SIA "Ainavas Nams" – mēs operatīvi noorganizēsim savākšanu visā Latvijā.`,
    gradient: 'from-green-500 to-green-600',
    urgent: false,
  },
  {
    id: 'contract-process',
    icon: FileCheck,
    question: 'Kā noslēgt līgumu par tauku izvešanu?',
    answer: `Līguma noslēgšana ar atkritumu apsaimniekotāju ir obligāts solis, lai uzņēmums legāli utilizētu tauku atkritumus (Atkritumu apsaimniekošanas likums nosaka, ka atkritumu radītājam jābūt līgumam ar apsaimniekotāju).

Lai noslēgtu līgumu, sazinieties ar mūsu speciālistiem pa tālruni +371 27727724 vai e-pastu. Mēs precizēsim jūsu uzņēmuma vajadzības (tauku daudzumu, savākšanas biežumu utt.) un sagatavosim līgumu, kurā būs atrunāti visi nosacījumi – konteineru nodrošināšana, izvešanas grafiks, pakalpojuma cena u.c.

Līgumu iespējams noslēgt attālināti (piemēram, parakstot ar drošu e-parakstu) vai klātienē, pēc jūsu izvēles. Pēc līguma noslēgšanas mēs nodrošinām nepieciešamo aprīkojumu (tauku savākšanas tvertnes) un uzsākam regulāru tauku izvešanu atbilstoši grafikam.

Jums būs garantija, ka tauku atkritumi tiks apsaimniekoti likumīgi un savlaicīgi, izvairoties no vides pārkāpumiem vai sodām.`,
    gradient: 'from-blue-500 to-blue-600',
    urgent: false,
  },
  {
    id: 'required-documents',
    icon: HelpCircle,
    question: 'Kādi dokumenti nepieciešami utilizācijai?',
    answer: `Lai uzņēmums varētu nodot tauku atkritumus utilizācijai, nepieciešami divi pamatdokumenti.

Pirmkārt, noslēgts līgums ar licencētu atkritumu apsaimniekotāju (piemēram, ar SIA "Ainavas Nams"), kas apliecina vienošanos par tauku savākšanu un pārstrādi.

Otrkārt, atkritumu nodošanas apliecinājums – pēc katras tauku vai eļļas atkritumu izvešanas reizes pakalpojuma sniedzējs izsniedz pavadzīmi (apliecinājuma aktu), kur fiksēts atkritumu daudzums, veids un nodošanas datums. Šis dokuments apliecina legālu utilizāciju un atbilstību normatīvajām prasībām.

Mūsu uzņēmums noformē visu nepieciešamo dokumentāciju – klients saņem līguma eksemplāru un pēc katras izvešanas nodošanas aktu. Uzņēmējam pašam nav jākārto papildu atļaujas, ja sadarbojas ar licencētu apsaimniekotāju.

Glabājiet saņemtos aktus kopā ar uzņēmuma dokumentāciju – nepieciešamības gadījumā tie būs jāuzrāda kontrolējošām iestādēm (piemēram, Valsts vides dienestam vai Valsts ieņēmumu dienestam) kā pierādījums, ka tauku atkritumi ir nodoti un pārstrādāti atbilstoši normatīvajiem aktiem.`,
    gradient: 'from-purple-500 to-purple-600',
    urgent: false,
  },
];

const additionalQuestions = [
  'Cik bieži jātīra tauku atdalītājs horeca uzņēmumiem?',
  'Kāda ir regulāras tauku savākšanas priekšrocības?',
  'Kas jādara, ja aizsērējis tauku atdalītājs Rīgā steidzami?',
  'Kā legāli utilizēt taukus un eļļas pēc zivju pārstrādes?',
];

export function FrequentlyAskedQuestions() {
  console.log('FrequentlyAskedQuestions component rendered');
  const router = useRouter();

  const handlePhoneClick = () => {
    console.log('📞 FAQ Phone button clicked: +371 27727724');
    trackPhoneConversion('+371 27727724', 'faq_section');
    trackCTA('call', 'faq_phone', 'tel:+37127727724');
    
    // Track Google Ads conversion
    if (typeof window !== 'undefined' && window.trackRegistrationClick) {
      window.trackRegistrationClick('faq_phone_button');
    }
    
    // Open phone dialer
    window.location.href = 'tel:+37127727724';
  };

  const handleQuestionSubmit = () => {
    console.log('❓ Ask question button clicked');
    trackCTA('contact_form', 'faq_question', '/kontakti');
    
    // Track Google Ads conversion
    if (typeof window !== 'undefined' && window.trackRegistrationClick) {
      window.trackRegistrationClick('ask_question');
    }
    
    // Navigate to contact page using Next.js router  
    router.push('/kontakti');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-metan-gray mb-4">
            Biežāk uzdotie jautājumi
          </h2>
          <p className="text-lg text-metan-text-light max-w-3xl mx-auto">
            Atbildes uz svarīgākajiem jautājumiem par tauku utilizāciju un legālu apsaimniekošanu uzņēmumiem
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="hover:no-underline px-6 py-4 text-left">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${faq.gradient} flex items-center justify-center mr-4 flex-shrink-0`}>
                        <faq.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-metan-gray">
                          {faq.question}
                        </h3>
                        {faq.urgent && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                            Steidzami
                          </span>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100">
                      <div className="prose prose-sm max-w-none text-metan-text">
                        {faq.answer.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className="mb-4 last:mb-0 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Additional Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-metan-gray mb-4 text-center">
                Citi populāri jautājumi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {additionalQuestions.map((question, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-metan-accent mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-sm text-metan-text-light">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-metan-primary/5 to-metan-accent/5 rounded-2xl p-8 border border-metan-primary/10">
              <h3 className="text-xl font-bold text-metan-gray mb-4">
                Nav atbildes uz jūsu jautājumu?
              </h3>
              <p className="text-metan-text mb-6">
                Sazinieties ar mūsu ekspertiem - atbildēsim uz jebkuru jautājumu par tauku utilizāciju un dokumentāciju
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-metan-primary to-metan-accent hover:from-metan-primary/90 hover:to-metan-accent/90 text-white px-8"
                  onClick={handlePhoneClick}
                  data-macaly="faq-phone-cta"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  +371 27727724
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-metan-primary text-metan-primary hover:bg-metan-light"
                  onClick={handleQuestionSubmit}
                  data-macaly="faq-question-cta"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Uzdot jautājumu
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}