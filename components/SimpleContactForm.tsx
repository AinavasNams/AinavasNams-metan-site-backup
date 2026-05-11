"use client";
"use client";
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { trackCTA } from '@/components/Analytics';
import { trackContactMethod } from '@/lib/analytics';
import { trackContact, trackFormSubmission } from '@/lib/ga4-events';
import { pushFormSubmit, pushPhoneClick, pushEmailClick } from '@/lib/gtm-events';
import { sendEmailNotification } from '@/lib/email-automation';

interface SimpleContactFormProps {
  variant?: 'compact' | 'full';
  title?: string;
  className?: string;
}

export function SimpleContactForm({ 
  variant = 'full', 
  title = 'Pieteikt pakalpojumu',
  className = '' 
}: SimpleContactFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission
    trackContactMethod('form', 'contact_form', variant);
    trackCTA('form_submit', 'contact_form', 'form_submission');
    trackFormSubmission('contact_form', 'website', 50);
    pushFormSubmit('contact_form', 'website', 50);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Contact submission format  
          to: formData.email || 'tsv@metan.lv', // User email if provided, otherwise company email
          name: formData.name,
          type: 'contact_submission',
          data: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            company: formData.company,
            message: formData.message,
            service: formData.service,
            timestamp: new Date().toISOString(),
            sourceUrl: window.location.href,
            userAgent: navigator.userAgent
          }
        }),
      });

      if (response.ok) {
        // Отправляем автоматическое email уведомление только если есть email
        if (formData.email) {
          await sendEmailNotification({
            type: 'contact_form',
            recipient: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone
            },
            content: {
              subject: 'Mēs sazināsimies ar jums tuvākajā laikā',
              templateId: 'contact_confirmation',
              variables: {
                service_type: formData.service,
                message: formData.message
              }
            },
            scheduling: {
              followUpSequence: true
            },
            metadata: {
              source: 'contact_form',
              conversion_value: 50,
              form_data: formData
            }
          });
        }
        
        
        // Use router.push instead of window.location.href to prevent React conflicts
        router.push('/paldies');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      alert('Kļūda nosūtot pieprasījumu. Lūdzu, mēģiniet vēlreiz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone') {
      handlePhoneChange(value);
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handlePhoneChange = (value: string) => {
    // Ensure the phone number always starts with +371
    let cleanValue = value.replace(/[^\d+]/g, '');
    
    if (!cleanValue.startsWith('+371')) {
      if (cleanValue.startsWith('371')) {
        cleanValue = '+' + cleanValue;
      } else if (cleanValue.match(/^\d/)) {
        cleanValue = '+371' + cleanValue;
      } else if (cleanValue === '' || cleanValue === '+') {
        cleanValue = '+371';
      }
    }
    
    setFormData(prev => ({ ...prev, phone: cleanValue }));
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!formData.phone || formData.phone === '+371') {
      setFormData(prev => ({ ...prev, phone: '+371 ' }));
      // Set cursor position after +371 and space
      setTimeout(() => {
        input.setSelectionRange(5, 5);
      }, 0);
    } else if (formData.phone.length <= 5) {
      // Position cursor at the end if value is short
      setTimeout(() => {
        input.setSelectionRange(input.value.length, input.value.length);
      }, 0);
    }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={className}
      >
        <Card className="metan-card">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Jūsu vārds *"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="border-gray-300 focus:border-metan-primary bg-white"
                  style={{ backgroundColor: 'white' }}
                />
                <Input
                  placeholder="Telefons *"
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onFocus={handlePhoneFocus}
                  required
                  className="border-gray-300 focus:border-metan-primary bg-white"
                  style={{ backgroundColor: 'white' }}
                />
              </div>
              
              <Input
                placeholder="E-pasts *"
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="border-gray-300 focus:border-metan-primary bg-white"
                style={{ backgroundColor: 'white' }}
              />

              <Input
                placeholder="Uzņēmums (nav obligāti)"
                id="contact-company"
                name="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="border-gray-300 focus:border-metan-primary bg-white"
                style={{ backgroundColor: 'white' }}
              />

              <Select name="service" onValueChange={(value) => handleInputChange('service', value)}>
                <SelectTrigger id="contact-service" className="border-gray-300 focus:border-metan-primary bg-white" style={{ backgroundColor: 'white' }}>
                  <SelectValue placeholder="Izvēlieties pakalpojumu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grease-trap">Tauku atdalītāju tīrīšana</SelectItem>
                  <SelectItem value="waste-collection">Eļļas un tauku savākšana</SelectItem>
                  <SelectItem value="pressure-washing">Augstspiediena skalošana</SelectItem>
                  <SelectItem value="consultation">Konsultācija</SelectItem>
                  <SelectItem value="other">Cits pakalpojums</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                type="submit" 
                className="w-full metan-button-primary bg-metan-primary hover:bg-metan-primary/90 text-white"
                disabled={isSubmitting}
                data-macaly="contact-form-submit"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sūta...
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Pieteikt pakalpojumu
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Card className="metan-card max-w-2xl mx-auto mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">{title}</CardTitle>
          <p className="text-gray-600">
            Aizpildiet formu un mēs sazināsimies ar jums 24 stundu laikā
          </p>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jūsu vārds *
                </label>
                <Input
                  placeholder="Ievadiet savu vārdu"
                  id="full-contact-name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="border-gray-300 focus:border-metan-primary bg-white"
                  style={{ backgroundColor: 'white' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefons *
                </label>
                <Input
                  placeholder="+371 20000000"
                  type="tel"
                  id="full-contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onFocus={handlePhoneFocus}
                  required
                  className="border-gray-300 focus:border-metan-primary bg-white"
                  style={{ backgroundColor: 'white' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-pasta adrese *
                </label>
                <Input
                  placeholder="jusu.epasts@email.lv"
                  type="email"
                  id="full-contact-email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="border-gray-300 focus:border-metan-primary bg-white"
                  style={{ backgroundColor: 'white' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Uzņēmums
                </label>
                <Input
                  placeholder="SIA / juridiskais nosaukums (nav obligāti)"
                  id="full-contact-company"
                  name="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="border-gray-300 focus:border-metan-primary bg-white"
                  style={{ backgroundColor: 'white' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nepieciešamais pakalpojums
              </label>
              <Select name="service" onValueChange={(value) => handleInputChange('service', value)}>
                <SelectTrigger id="full-contact-service" className="border-gray-300 focus:border-metan-primary bg-white" style={{ backgroundColor: 'white' }}>
                  <SelectValue placeholder="Izvēlieties pakalpojumu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grease-trap">Tauku atdalītāju tīrīšana</SelectItem>
                  <SelectItem value="waste-collection">Eļļas un tauku savākšana</SelectItem>
                  <SelectItem value="pressure-washing">Augstspiediena skalošana</SelectItem>
                  <SelectItem value="consultation">Bezmaksas konsultācija</SelectItem>
                  <SelectItem value="other">Cits pakalpojums</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Papildu informācija
              </label>
              <Textarea
                placeholder="Pastāstiet par savām vajadzībām..."
                id="full-contact-message"
                name="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="border-gray-300 focus:border-metan-primary min-h-[100px] bg-white"
                style={{ backgroundColor: 'white' }}
              />
            </div>

            <div className="mt-6 space-y-4">
              <Button 
                type="submit" 
                className="w-full text-lg py-6 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg border-2 border-green-600"
                disabled={isSubmitting}
                data-macaly="contact-form-full-submit"
                style={{ 
                  backgroundColor: '#16a34a', 
                  minHeight: '56px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 10
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sūta pieteikumu...
                  </div>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Nosūtīt pieteikumu
                  </>
                )}
              </Button>
            </div>

            {/* Alternative contact methods */}
            <div className="border-t pt-6 mt-8 text-center">
              <p className="text-gray-600 mb-4">Vai dodiet mums ziņu tieši:</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="tel:+37127727724" onClick={() => pushPhoneClick('contact_form', '+37127727724')}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +371 27727724
                </a>
                <a 
                  href="mailto:tsv@metan.lv" onClick={() => pushEmailClick('contact_form', 'tsv@metan.lv')}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  tsv@metan.lv
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
