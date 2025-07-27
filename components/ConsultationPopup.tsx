'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { trackConsultationRequest, trackPhoneCall } from '@/lib/gtm-events';
import { trackContact, trackFormSubmission } from '@/lib/ga4-events';
import { sendEmailNotification } from '@/lib/email-automation';

export default function ConsultationPopup() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: 'Vēlos saņemt konsultāciju par jūsu pakalpojumiem'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // Показать через 30 секунд

    return () => clearTimeout(timer);
  }, []);

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
          // Contact submission format
          to: 'tsv@metan.lv', // Company email since user doesn't provide email
          name: formData.name,
          type: 'contact_submission',
          data: {
            name: formData.name,
            phone: formData.phone,
            email: '', // No email in popup
            message: formData.message,
            timestamp: new Date().toISOString(),
            sourceUrl: window.location.href,
            userAgent: navigator.userAgent
          }
        }),
      });

      if (response.ok) {
        // Используем новые системы отслеживания
        trackConsultationRequest('popup_form', 'consultation_popup');
        trackFormSubmission('consultation_popup', 'popup_form', 60);
        
        // Don't send email notification since there's no user email in popup
        console.log('📊 Consultation popup conversion tracked');
        
        // Use router.push instead of window.location.href to prevent React conflicts
        router.push('/paldies/konsultacija');
      }
    } catch (error) {
      console.error('Error sending consultation request:', error);
      alert('Kļūda nosūtot pieprasījumu. Lūdzu, mēģiniet vēlreiz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCall = () => {
    // Используем новые системы отслеживания
    trackPhoneCall('popup', '+371 27727724');
    trackContact('phone', 'popup', 90);
    
    console.log('📞 Popup phone call tracked');
    // Use window.location.href for phone calls as it's not causing React conflicts
    window.location.href = 'tel:+37127727724';
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md relative"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-metan-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-metan-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Vajag konsultāciju?
              </h2>
              <p className="text-gray-600">
                Sazinieties ar mūsu ekspertiem bezmaksas konsultācijai
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <Button
                onClick={handleCall}
                className="w-full bg-metan-primary hover:bg-metan-primary/90 text-white"
              >
                <Phone className="mr-2 h-4 w-4" />
                Zvanīt tagad: +371 27727724
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">vai</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="popup-name">Vārds *</Label>
                <Input
                  id="popup-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 bg-white border-gray-300 focus:border-metan-primary"
                  style={{ backgroundColor: 'white' }}
                />
              </div>

              <div>
                <Label htmlFor="popup-phone">Tālrunis *</Label>
                <Input
                  id="popup-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-1 bg-white border-gray-300 focus:border-metan-primary"
                  style={{ backgroundColor: 'white' }}
                />
              </div>

              <div>
                <Label htmlFor="popup-message">Jūsu jautājums</Label>
                <Textarea
                  id="popup-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="mt-1 bg-white border-gray-300 focus:border-metan-primary"
                  style={{ backgroundColor: 'white' }}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-metan-accent hover:bg-metan-accent/90 text-white"
              >
                {isSubmitting ? 'Sūta...' : 'Pieprasīt konsultāciju'}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Atbildēsim 1 stundas laikā darba dienās
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}