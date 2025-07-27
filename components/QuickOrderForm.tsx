'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackQuickOrder, trackPhoneCall } from '@/lib/gtm-events';
import { trackContact, trackOrderStart, trackFormSubmission } from '@/lib/ga4-events';
import { sendEmailNotification } from '@/lib/email-automation';

export default function QuickOrderForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    company: ''
  });

  const services = [
    { value: 'tauku-savaksana', label: 'Tauku un eļļas savākšana' },
    { value: 'atdalitaju-tirisana', label: 'Tauku atdalītāju tīrīšana' },
    { value: 'augstspiediena-skalosana', label: 'Augstspiediena skalošana' },
    { value: 'konsultacija', label: 'Konsultācija par pakalpojumiem' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: '',
          message: `Pakalpojuma pieprasījums: ${formData.service}${formData.company ? ` | Uzņēmums: ${formData.company}` : ''}`,
          type: 'Ātrs pakalpojuma pieprasījums'
        }),
      });

      if (response.ok) {
        // Используем новые системы отслеживания
        trackQuickOrder(formData.service, 'quick_order_form');
        trackOrderStart(formData.service, 70, 'quick_order_form');
        trackFormSubmission('quick_order', 'quick_order_form', 85);
        
        // Don't send email notification since there's no user email in quick order
        console.log('📊 Quick order conversion tracked');
        
        // Use router.push instead of window.location.href to prevent React conflicts
        router.push('/paldies/atzkazs');
      }
    } catch (error) {
      console.error('Error sending quick order:', error);
      alert('Kļūda nosūtot pieprasījumu. Lūdzu, mēģiniet vēlreiz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCall = () => {
    // Используем новые системы отслеживания
    trackPhoneCall('quick_form', '+371 27727724');
    trackContact('phone', 'quick_form', 90);
    
    console.log('📞 Quick form phone call tracked');
    window.location.href = 'tel:+37127727724';
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
    
    setFormData({...formData, phone: cleanValue});
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!formData.phone || formData.phone === '+371') {
      setFormData({...formData, phone: '+371 '});
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

  return (
    <div className="bg-gradient-to-br from-metan-light to-white rounded-xl p-6 border border-metan-primary/20">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-metan-gray mb-2">
          Ātrs pakalpojuma pieprasījums
        </h3>
        <p className="text-gray-600">
          Aizpildiet formu un mēs sazināsimies ar jums 1 stundas laikā
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              placeholder="Jūsu vārds *"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="h-12 bg-white border-gray-300 focus:border-metan-primary"
              style={{ backgroundColor: 'white' }}
            />
          </div>
          <div>
            <Input
              type="tel"
              placeholder="+371 20000000"
              required
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onFocus={handlePhoneFocus}
              className="h-12 bg-white border-gray-300 focus:border-metan-primary"
              style={{ backgroundColor: 'white' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
            <SelectTrigger className="h-12 bg-white border-gray-300 focus:border-metan-primary" style={{ backgroundColor: 'white' }}>
              <SelectValue placeholder="Izvēlieties pakalpojumu *" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="text"
            placeholder="Uzņēmuma nosaukums (nav obligāts)"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="h-12 bg-white border-gray-300 focus:border-metan-primary"
            style={{ backgroundColor: 'white' }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.phone || !formData.service}
            className="flex-1 h-12 bg-metan-primary hover:bg-metan-primary/90 text-white"
          >
            <Mail className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Sūta...' : 'Pieprasīt pakalpojumu'}
          </Button>
          
          <Button
            type="button"
            onClick={handleCall}
            variant="outline"
            className="h-12 border-metan-primary text-metan-primary hover:bg-metan-primary/10"
          >
            <Phone className="mr-2 h-4 w-4" />
            Zvanīt: +371 27727724
          </Button>
        </div>
      </form>

      <p className="text-sm text-gray-500 text-center mt-4">
        ⚡ Darba dienas: atbilde līdz 1 stundai | Brīvdienas: atbilde līdz 4 stundām
      </p>
    </div>
  );
}