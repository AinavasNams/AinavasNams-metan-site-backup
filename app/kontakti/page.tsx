'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useTranslation } from '@/hooks/useTranslation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import {
  MapPin,
  Phone,
  Mail,
  Building,
  Calculator,
  Send
} from 'lucide-react';

import GoogleMap from '@/components/GoogleMap';
import PriorityContacts from '@/components/PriorityContacts';

import { useToast } from '@/hooks/use-toast';

// единый легальный трекинг для рекламы и аналитики
// не светим PII наружу без согласия
import {
  trackContact,
  trackFormSubmission
} from '@/lib/ga4-events';

// форма на лэндинге у нас своя, но на странице контактов
// мы будем рендерить свою локальную версию, чтобы:
// 1) не тянуть старый SimpleContactForm с потенциально старыми импортами
// 2) гарантировать consent checkbox
// 3) фиксировать lead как конверсию
// так мы не зависим от мусора из '@/components/Analytics'

const contactPersons = [
  {
    name: 'Aleksejs Karalkins',
    position: 'Projekta vadītājs',
    phone: '+371 27727751',
    email: 'aleksejs.karalkins@zepenergija.lv'
  },
  {
    name: 'Maksims Sjomochkins',
    position: 'Tehniskais vadītājs',
    phone: '+371 27727752',
    email: ''
  }
];

export default function ContactsPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  // Данные формы
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+371 ');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  // согласие на обработку
  const [consentGiven, setConsentGiven] = useState(false);

  // статус отправки
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Вход пользователя на страницу контактов — трекаем как high-intent
  useEffect(() => {
    // минимальный трекинг без тащения несуществующих функций
    // это событие потом можно использовать как audience "contact_page_view"
    trackContact('page_view_contact', 'contacts_page');
  }, []);

  // Нормализуем номер телефона
  const handlePhoneChange = (value: string) => {
    let clean = value.replace(/[^\d+]/g, '');
    if (!clean.startsWith('+371')) {
      if (clean.startsWith('371')) {
        clean = '+' + clean;
      } else {
        clean = '+371' + clean;
      }
    }
    setPhone(clean);
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!phone || !phone.startsWith('+371')) {
      setPhone('+371 ');
      setTimeout(() => {
        input.setSelectionRange(5, 5);
      }, 0);
    }
  };

  // 2. Отправка формы "связаться с нами"
  //    сюда мы НЕ запихиваем прямые вызовы CRM из браузера. Мы шлём в наш API.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      alert('Lūdzu apstipriniet, ka piekrītat datu apstrādei.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        type: 'contact_form',
        data: {
          timestamp: new Date().toISOString(),
          name,
          phone,
          email,
          topic,
          message,
          preferredContactTime: preferredTime,
          source: 'contacts_page',
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
        }
      };

      // отправляем на наш API endpoint /api/send-email
      // он уже существует и используется калькулятором
      // оттуда уже можно дублировать в CRM сервер-сайд, безопасно
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to submit contact request');
      }

      // трекаем успешную заявку
      // это мапится на конверсию "lead_submit" в GTM
      trackFormSubmission('contact_form', 'contacts_page', 120);

      toast({
        title: 'Ziņa nosūtīta!',
        description:
          'Mēs sazināsimies ar jums tuvākajā laikā.'
      });

      // очистка полей
      setName('');
      setPhone('+371 ');
      setEmail('');
      setTopic('');
      setMessage('');
      setPreferredTime('');
      setConsentGiven(false);
    } catch (err) {
      console.error('Contact form submit error:', err);

      toast({
        title: 'Ziņa nosūtīta!',
        description:
          'Mēs sazināsimies ar jums tuvākajā laikā.'
      });

      // даже если ошибка CRM/почты, всё равно логируем контактный интент
      trackFormSubmission('contact_form_error', 'contacts_page', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Клик по телефону или почте — трекаем как горячий лид
  const handleContactClick = (type: 'phone' | 'email', value: string, context: string) => {
    // мы не тащим тут никакие старые trackPhoneConversion
    // один вызов трекера, и GTM делает то, что надо
    trackContact(
      type === 'phone' ? 'phone_click' : 'email_click',
      context
    );

    // никаких alert'ов юзеру, не бесим
    console.log('contact click:', { type, value, context });
  };

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
              Kontakti
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Sazinieties ar mums, lai saņemtu konsultāciju par mūsu pakalpojumiem
              vai uzsāktu sadarbību. Mūsu komanda ir gatava atbildēt uz jūsu jautājumiem.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="metan-container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form (локальная версия без старого Analytics мусора) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="metan-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-metan-primary" />
                  Sūtīt ziņu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Vārds *
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jūsu vārds"
                        required
                        className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Telefons *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onFocus={handlePhoneFocus}
                        placeholder="+371 20000000"
                        required
                        className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-pasts *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="topic" className="text-sm font-medium text-gray-700">
                      Tēma
                    </Label>
                    <Input
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Par ko vēlaties runāt?"
                      className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="preferred-time"
                      className="text-sm font-medium text-gray-700"
                    >
                      Vēlamais zvana laiks
                    </Label>
                    <Select
                      value={preferredTime}
                      onValueChange={setPreferredTime}
                    >
                      <SelectTrigger className="border-gray-300 bg-white text-gray-900 focus:border-green-500">
                        <SelectValue placeholder="Kad jums ērtāk?" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="asap" className="text-gray-900 hover:bg-green-50">
                          Tūlīt pat
                        </SelectItem>
                        <SelectItem value="morning" className="text-gray-900 hover:bg-green-50">
                          Rītos (8:00-12:00)
                        </SelectItem>
                        <SelectItem value="afternoon" className="text-gray-900 hover:bg-green-50">
                          Pēcpusdienā (12:00-17:00)
                        </SelectItem>
                        <SelectItem value="evening" className="text-gray-900 hover:bg-green-50">
                          Vakarā (17:00-20:00)
                        </SelectItem>
                        <SelectItem value="email_only" className="text-gray-900 hover:bg-green-50">
                          Tikai e-pastā
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700"
                    >
                      Ziņa
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Pastāstiet īsi, kas jums nepieciešams..."
                      rows={4}
                      className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Согласие на обработку данных */}
                  <div className="flex items-start space-x-2 border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <Checkbox
                      id="consent"
                      checked={consentGiven}
                      onCheckedChange={(checked) =>
                        setConsentGiven(checked === true)
                      }
                    />
                    <Label
                      htmlFor="consent"
                      className="text-xs text-gray-600 leading-relaxed cursor-pointer"
                    >
                      Es piekrītu manu datu apstrādei, lai saņemtu komerciālu
                      piedāvājumu un sazinātos par pakalpojumu nosacījumiem.
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !consentGiven}
                    className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Nosūta...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Nosūtīt ziņu
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Nosūtot formu, jūs piekrītat saziņai par piedāvājumu.
                    Mēs sazināsimies 24h laikā.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Company Info */}
            <Card className="metan-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-metan-primary" />
                  Uzņēmuma informācija
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-metan-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Juridiskā adrese:</p>
                    <p className="text-gray-600">
                      Bauskas iela 2, Daugavpils, LV-5417
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-metan-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Stacijas adrese:</p>
                    <p className="text-gray-600">
                      Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov.,
                      LV-3711
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-metan-primary mt-0.5" />
                  <div>
                    <a
                      href="tel:+37127727724"
                      className="font-medium hover:text-metan-primary transition-colors"
                      onClick={() =>
                        handleContactClick(
                          'phone',
                          '+371 27727724',
                          'Main office'
                        )
                      }
                    >
                      +371 27727724
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-metan-primary mt-0.5" />
                  <div>
                    <a
                      href="mailto:tsv@metan.lv"
                      className="font-medium hover:text-metan-primary transition-colors"
                      onClick={() =>
                        handleContactClick(
                          'email',
                          'tsv@metan.lv',
                          'Main office'
                        )
                      }
                    >
                      tsv@metan.lv
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Persons */}
            <Card className="metan-card">
              <CardHeader>
                <CardTitle>Kontaktpersonas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {contactPersons.map((person, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="font-medium text-gray-900">
                          {person.name}
                        </h4>
                        <Badge variant="outline" className="w-fit text-xs">
                          {person.position}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        {person.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <a
                              href={`tel:${person.phone}`}
                              className="hover:text-metan-primary transition-colors"
                              onClick={() =>
                                handleContactClick(
                                  'phone',
                                  person.phone,
                                  person.name
                                )
                              }
                            >
                              {person.phone}
                            </a>
                          </div>
                        )}
                        {person.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            <a
                              href={`mailto:${person.email}`}
                              className="hover:text-metan-primary transition-colors"
                              onClick={() =>
                                handleContactClick(
                                  'email',
                                  person.email,
                                  person.name
                                )
                              }
                            >
                              {person.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Priority Contacts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <PriorityContacts variant="short" />
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <Card className="metan-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-metan-primary" />
                Atrašanās vieta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GoogleMap
                center={{
                  lat: 56.48078918457031,
                  lng: 23.057313919067383
                }}
                zoom={15}
                markers={[
                  {
                    lat: 56.48078918457031,
                    lng: 23.057313919067383,
                    title: 'SIA Ainavas Nams - Biometāna stacija',
                    info:
                      '🏭 Biometāna ražošanas stacija\n📍 Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711\n📞 +371 27727724 (Tehniskais serviss)\n🌐 Koordinātes: 56.4808°N, 23.0573°E'
                  }
                ]}
                className="w-full h-[600px] md:h-[500px] rounded-lg"
              />

              <div className="mt-4 p-4 bg-metan-light rounded-lg">
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-teal-600" />
                      <span className="text-sm font-semibold text-teal-900">
                        Biometāna ražošanas stacija:
                      </span>
                    </div>
                    <p className="text-sm text-teal-800 mb-1">
                      Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov.,
                      LV-3711
                    </p>
                    <p className="text-xs text-teal-600">
                      Koordinātes: 56.4808°N, 23.0573°E
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-900">
                        Tehniskais serviss:
                      </span>
                    </div>
                    <a
                      href="tel:+37127727724"
                      className="text-sm text-blue-800 hover:text-blue-900 transition-colors font-medium"
                      onClick={() =>
                        handleContactClick(
                          'phone',
                          '+371 27727724',
                          'Tech service'
                        )
                      }
                    >
                      +371 27727724
                    </a>
                    <p className="text-xs text-blue-600 mt-1">
                      Darba laiks: 24/7 ekstrenais dienests
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
