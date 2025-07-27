'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Aija Kalniņa',
    position: 'Virtuves vadītāja',
    company: 'Restorāns "Mazā Parīze"',
    text: 'Strādājam ar Ainavas Nams jau otro gadu. Viņi izdarīja mūsu tauku atdalītāju apkopi ātri un kvalitatīvi. Ļoti svarīgi, ka visi dokumenti tiek nokārtoti kārtībā - nekad nav bijušas problēmas ar VVD pārbaudēm.',
    rating: 5,
    location: 'Rīga',
  },
  {
    name: 'Māris Ozoliņš',
    position: 'Ēdināšanas vadītājs',
    company: 'SIA "Gardēžu pasaule"',
    text: 'Mums ir 4 restorāni Rīgā un Daugavpilī. Ainavas Nams atrisināja mūsu problēmu ar eļļas utilizāciju. Tagad viss notiek pēc grafika, bez kavēšanās. Cenas ir saprātīgas un pakalpojums uzticams.',
    rating: 5,
    location: 'Daugavpils',
  },
  {
    name: 'Sandra Liepiņa',
    position: 'Uzņēmuma direktores asistente',
    company: 'Viesnīca "Jūrmala Resort"',
    text: 'Ļoti patīk, ka viņi paši sazinās un atgādina par nākamo tīrīšanu. Viss tiek dokumentēts, saņemam detalizētus pārskatus. Mūsu grāmatvedība ir ļoti apmierināta ar dokumentu kvalitāti.',
    rating: 5,
    location: 'Jūrmala',
  },
  {
    name: 'Andris Bērziņš',
    position: 'Tehniskais direktors',
    company: 'Pārtikas ražotne "Latgales garša"',
    text: 'Sadarbojamies jau 1,5 gadus. Viņiem ir profesionāla vakuuma tehnika, kas ļauj izvest lielos daudzumus ātri. Nekad nav bijis, ka neierastos vai nokavētu. Rekomendēju citiem ražotājiem.',
    rating: 5,
    location: 'Daugavpils',
  },
  {
    name: 'Ilze Sproģe',
    position: 'Ēdnīcas vadītāja',
    company: 'Bērnudārzs "Saulīte"',
    text: 'Svarīgi bija atrast uzņēmumu, kas saprot mūsu specifiku - bērnudārzā ir īpašas prasības tīrībai. Ainavas Nams strādā ātri, klusām un bez smakas. Bērni pat nepamanīja darbu.',
    rating: 5,
    location: 'Rīga',
  },
  {
    name: 'Ģirts Vilciņš',
    position: 'Saimnieks',
    company: 'Kafejnīca "Pie upes"',
    text: 'Maža kafejnīca, bet problēmas ar taukiem bija lielas. Tagad mums ir regulāra apkope reizi mēnesī. Vairs nav smaku virtuvē un kanalizācijā. Cena ir pieņemama pat mazam biznesam.',
    rating: 5,
    location: 'Jelgava',
  },
];

export function CustomerTestimonials() {
  console.log('CustomerTestimonials component rendered');

  return (
    <section className="py-20 bg-gray-50">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-metan-gray mb-4" data-macaly="testimonials-title">
            Ko saka mūsu klienti
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uzticēšanos nopelnām ar kvalitatīvu darbu, precīzu dokumentāciju un uzticamu servisu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="metan-card h-full relative">
                <Quote className="absolute top-4 right-4 h-6 w-6 text-metan-accent/30" />
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Customer Info */}
                  <div className="border-t pt-4">
                    <div className="font-semibold text-metan-gray">{testimonial.name}</div>
                    <div className="text-sm text-metan-accent font-medium">{testimonial.position}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <div className="w-2 h-2 bg-metan-accent rounded-full"></div>
                      {testimonial.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-metan-primary">200+</div>
                <div className="text-sm text-gray-600">Apmierināti klienti</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-metan-primary">100%</div>
                <div className="text-sm text-gray-600">Dokumentācijas atbilstība</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-metan-primary">24/7</div>
                <div className="text-sm text-gray-600">Ekstrenais serviss</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}