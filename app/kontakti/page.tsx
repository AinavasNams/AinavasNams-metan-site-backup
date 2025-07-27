'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  trackPageView, 
  trackCTA,
  trackContactMethod,
  trackFormSubmission,
  trackFormStart,
  trackPhoneConversion,
  trackUserJourney
} from '@/components/Analytics';
import { submitToCRM, ContactSubmission } from '@/lib/crm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import GoogleMap from '@/components/GoogleMap';
import PriorityContacts from '@/components/PriorityContacts';
import { SimpleContactForm } from '@/components/SimpleContactForm';

const contactPersons = [
  {
    name: "Aleksejs Karalkins",
    position: "Projekta vadītājs", 
    phone: "+371 27727751",
    email: "aleksejs.karalkins@zepenergija.lv"
  },
  {
    name: "Maksims Sjomochkins",
    position: "Tehniskais vadītājs",
    phone: "+371 27727752",
    email: ""
  }
];

export default function ContactsPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: '',
    message: '',
  });
  const [formStarted, setFormStarted] = useState(false);

  // Track contacts page view and user journey
  useEffect(() => {
    // Track contact page view
    trackPageView('contact_page', {
      page_section: 'contacts',
      page_priority: 'critical',
      conversion_potential: 'maximum',
      contact_intent: true,
    });
    
    // Track user journey progression
    trackUserJourney('contact_initiated', {
      page_type: 'contact',
      intent: 'contact_business',
      funnel_stage: 'conversion_ready',
      high_intent: true,
    });
    
    console.log("📞 Contact page tracking initialized");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    
    // Track contact method
    trackContactMethod('form', 'contact_form', 'contact_page');
    
    // Prepare CRM data
    const crmData: ContactSubmission = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      topic: formData.topic,
      message: formData.message,
      sourceUrl: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Submit to CRM
    try {
      const crmResult = await submitToCRM(crmData, 'contacts');
      console.log('CRM submission result:', crmResult);
      
      // Track form submission ONLY after successful CRM submission
      trackFormSubmission('contact_form', {
        user_name: formData.name,
        user_email: formData.email,
        topic: formData.topic,
        contact_method: 'contact_form',
        success: true,
      });
      
      toast({
        title: "Ziņa nosūtīta!",
        description: crmResult.message || "Mēs sazināsimies ar jums tuvākajā laikā.",
      });
    } catch (error) {
      console.error('Error submitting to CRM:', error);
      
      // Track form submission attempt even if CRM fails
      trackFormSubmission('contact_form', {
        user_name: formData.name,
        user_email: formData.email,
        topic: formData.topic,
        contact_method: 'contact_form',
        success: false,
        error: 'CRM submission failed',
      });
      
      toast({
        title: "Ziņa nosūtīta!",
        description: "Mēs sazināsimies ar jums tuvākajā laikā.",
      });
    }
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      topic: '',
      message: '',
    });
    setFormStarted(false);
  };

  const handleInputChange = (field: string, value: string) => {
    console.log('Form field changed:', field, value);
    
    // Track form start on first interaction
    if (!formStarted && value.trim()) {
      setFormStarted(true);
      trackFormStart('contact_form');
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Enhanced contact interaction tracking
  const handleContactClick = (type: string, value: string, location: string) => {
    trackContactMethod(type, value, location);
    
    // Специальное отслеживание для телефонных звонков
    if (type === 'phone') {
      trackPhoneConversion(value, `tel:${value}`);
    }
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
              Sazinieties ar mums, lai saņemtu konsultāciju par mūsu pakalpojumiem vai uzsāktu sadarbību. 
              Mūsu komanda ir gatava atbildēt uz jūsu jautājumiem.
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
            <SimpleContactForm 
              variant="full" 
              title="Sūtīt ziņu" 
            />
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
                    <p className="text-gray-600">Bauskas iela 2, Daugavpils, LV-5417</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-metan-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Stacijas adrese:</p>
                    <p className="text-gray-600">Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-metan-primary" />
                  <div>
                    <a 
                      href="tel:+37127727724" 
                      className="font-medium hover:text-metan-primary transition-colors"
                      onClick={() => handleContactClick('phone', '+371 27727724', 'Main office')}
                    >
                      +371 27727724
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-metan-primary" />
                  <div>
                    <a 
                      href="mailto:tsv@metan.lv" 
                      className="font-medium hover:text-metan-primary transition-colors"
                      onClick={() => handleContactClick('email', 'tsv@metan.lv', 'Main office')}
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
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="font-medium text-gray-900">{person.name}</h4>
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
                              onClick={() => handleContactClick('phone', person.phone, person.name)}
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
                              onClick={() => handleContactClick('email', person.email, person.name)}
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
                center={{ lat: 56.48078918457031, lng: 23.057313919067383 }}
                zoom={15}
                markers={[
                  {
                    lat: 56.48078918457031,
                    lng: 23.057313919067383,
                    title: "SIA Ainavas Nams - Biometāna stacija",
                    info: "🏭 Biometāna ražošanas stacija\n📍 Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711\n📞 +371 27727724 (Tehniskais serviss)\n🌐 Koordinātes: 56.4808°N, 23.0573°E"
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
                      Rūpniecības iela 2D, Bēne, Bēnes pag., Dobeles nov., LV-3711
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