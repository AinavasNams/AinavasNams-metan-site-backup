'use client';

import { Star, Quote, Building2, Users, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomerReviews() {
  const reviews = [
    {
      name: 'Māris Ozols',
      position: 'Restorāna "Vecpilsēta" vadītājs',
      company: 'SIA "Ēdienu nams"',
      rating: 5,
      text: 'Sadarbojamies ar Ainavas Nams jau otro gadu. Viņi ir ātri, profesionāli un nekad nav bijis problēmu ar dokumentāciju. Tauku atdalītāju tīrīšana notiek regulāri, bez kavēšanās. Īpaši novērtējam to, ka visi dokumenti APUS sistēmā tiek nodoti automātiski.',
      businessType: 'HoReCa',
      icon: ChefHat,
      date: '2024. gada decembris'
    },
    {
      name: 'Līga Bērziņa',
      position: 'Ražošanas vadītāja',
      company: 'SIA "Baltijas Gaļas"',
      rating: 5,
      text: 'Mūsu uzņēmums ražo lielu daudzumu tauku atkritumu. Ainavas Nams nodrošina regulāru savākšanu ar vakuuma mašīnām. Viņu komanda ir profesionāla, darbs tiek veikts ātri un bez traucējumiem ražošanas procesam. Cenas ir saprātīgas un bez slēptām izmaksām.',
      businessType: 'Ražošana',
      icon: Building2,
      date: '2024. gada oktobris'
    },
    {
      name: 'Andris Kalniņš',
      position: 'Tehniskais vadītājs',
      company: 'AS "Viesnīcu grupa"',
      rating: 5,
      text: 'Mūsu viesnīcu grupai ir 8 objekti Rīgā un Daugavpilī. Ainavas Nams apkalpo visus mūsu objektus. Viņi ir elastīgi, var pielāgoties mūsu grafikam un darbojas arī brīvdienās, ja nepieciešams. Īpaši svarīgi ir tas, ka viņi paši nokārto visu dokumentāciju.',
      businessType: 'Viesnīcas',
      icon: Users,
      date: '2024. gada novembris'
    },
    {
      name: 'Signe Lapsa',
      position: 'Kafejnīcas īpašniece',
      company: 'Mazā kafejnīca "Rīts"',
      rating: 5,
      text: 'Esmu mazā uzņēmuma īpašniece, un man ir svarīgi, lai viss būtu kārtībā ar VVD. Ainavas Nams ne tikai savāc taukus, bet arī palīdz saprast visas prasības. Viņi ir ļoti pacietīgi un izskaidro visu soli pa solim. Cena ir pieņemama pat mazam uzņēmumam.',
      businessType: 'Mazais bizness',
      icon: ChefHat,
      date: '2024. gada septembris'
    }
  ];

  const businessTypeColors = {
    'HoReCa': 'bg-orange-100 text-orange-700',
    'Ražošana': 'bg-blue-100 text-blue-700',
    'Viesnīcas': 'bg-purple-100 text-purple-700',
    'Mazais bizness': 'bg-green-100 text-green-700'
  };

  return (
    <div className="py-16 bg-white">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-metan-gray mb-4">
            Ko saka mūsu klienti
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reāli atsauksmes no uzņēmumiem, kas uzticas mūsu pakalpojumiem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-metan-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-metan-primary/20">
                  <review.icon className="h-6 w-6 text-metan-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {review.name}
                    </h3>
                    <div className={`text-xs px-2 py-1 rounded-full ${businessTypeColors[review.businessType] || 'bg-gray-100 text-gray-700'}`}>
                      {review.businessType}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">
                    {review.position}
                  </p>
                  
                  <p className="text-sm font-medium text-metan-primary">
                    {review.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-metan-primary/20" />
                <p className="text-gray-700 leading-relaxed pl-6 mb-4">
                  {review.text}
                </p>
              </div>

              <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
                {review.date}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-50 rounded-full px-6 py-3">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="text-yellow-800 font-semibold">
              4.9/5 vidējais novērtējums no 89 atsauksmēm
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}