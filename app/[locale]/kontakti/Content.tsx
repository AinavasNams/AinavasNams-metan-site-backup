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

import {
  trackContact,
  trackFormSubmission
} from '@/lib/ga4-events';
import { pushFormSubmit, pushPhoneClick, pushEmailClick } from '@/lib/gtm-events';

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

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+371 ');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    trackContact('page_view_contact', 'contacts_page');
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      alert(t('contacts.consentAlert'));
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

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to submit contact request');
      }

      trackFormSubmission('contact_form', 'contacts_page', 120);
      pushFormSubmit('contact_form', 'contacts_page', 120);

      toast({
        title: t('contacts.successTitle'),
        description: t('contacts.successDesc')
      });

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
        title: t('contacts.successTitle'),
        description: t('contacts.successDesc')
      });

      trackFormSubmission('contact_form_error', 'contacts_page', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactClick = (type: 'phone' | 'email', value: string, context: string) => {
    trackContact(
      type === 'phone' ? 'phone_click' : 'email_click',
      context
    );
    if (type === 'phone') {
      pushPhoneClick(context, value);
    } else {
      pushEmailClick(context, value);
    }
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
              {t('contacts.heroTitle')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('contacts.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="metan-container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
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
                  {t('contacts.sendMessage')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        {t('contacts.nameLabel')} *
                      </Label>
                      <Input
                        id="name" name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('contacts.namePlaceholder')}
                        required
                        className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        {t('contacts.phoneLabel')} *
                      </Label>
                      <Input
                        id="phone" name="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onFocus={handlePhoneFocus}
                        placeholder={t('contacts.phonePlaceholder')}
                        required
                        className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      {t('contacts.emailLabel')} *
                    </Label>
                    <Input
                      id="email" name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('contacts.emailPlaceholder')}
                      required
                      className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="topic" className="text-sm font-medium text-gray-700">
                      {t('contacts.topicLabel')}
                    </Label>
                    <Input
                      id="topic" name="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder={t('contacts.topicPlaceholder')}
                      className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="preferred-time"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t('contacts.preferredTimeLabel')}
                    </Label>
                    <Select
                      value={preferredTime}
                      onValueChange={setPreferredTime}
                    >
                      <SelectTrigger className="border-gray-300 bg-white text-gray-900 focus:border-green-500">
                        <SelectValue placeholder={t('contacts.preferredTimePlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="asap" className="text-gray-900 hover:bg-green-50">
                          {t('contacts.timeAsap')}
                        </SelectItem>
                        <SelectItem value="morning" className="text-gray-900 hover:bg-green-50">
                          {t('contacts.timeMorning')}
                        </SelectItem>
                        <SelectItem value="afternoon" className="text-gray-900 hover:bg-green-50">
                          {t('contacts.timeAfternoon')}
                        </SelectItem>
                        <SelectItem value="evening" className="text-gray-900 hover:bg-green-50">
                          {t('contacts.timeEvening')}
                        </SelectItem>
                        <SelectItem value="email_only" className="text-gray-900 hover:bg-green-50">
                          {t('contacts.timeEmailOnly')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t('contacts.messageLabel')}
                    </Label>
                    <Textarea
                      id="message" name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('contacts.messagePlaceholder')}
                      rows={4}
                      className="border-gray-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Consent */}
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
                      {t('contacts.consentText')}
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
                        {t('contacts.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t('contacts.submitButton')}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    {t('contacts.submitNote')}
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
                  {t('contacts.companyInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-metan-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contacts.legalAddress')}</p>
                    <p className="text-gray-600">
                      {t('contacts.legalAddressValue')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-metan-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{t('contacts.stationAddress')}</p>
                    <p className="text-gray-600">
                      {t('contacts.stationAddressValue')}
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
                <CardTitle>{t('contacts.contactPersons')}</CardTitle>
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
                {t('contacts.location')}
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
                        {t('contacts.bioStation')}
                      </span>
                    </div>
                    <p className="text-sm text-teal-800 mb-1">
                      {t('contacts.bioStationAddress')}
                    </p>
                    <p className="text-xs text-teal-600">
                      {t('contacts.coordinates')}
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-900">
                        {t('contacts.techService')}
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
                      {t('contacts.techServiceHours')}
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
