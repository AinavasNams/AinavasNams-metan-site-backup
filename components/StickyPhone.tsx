'use client';

import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { trackPhoneCall, trackEmailClick } from '@/lib/gtm-events';
import { trackContact } from '@/lib/ga4-events';

export default function StickyPhone() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Показать через 3 секунды

    return () => clearTimeout(timer);
  }, []);

  const handleCall = () => {
    // Используем новые системы отслеживания
    trackPhoneCall('sticky_phone', '+371 27727724');
    trackContact('phone', 'sticky_phone', 90);
    
    console.log('📞 Sticky phone call tracked with new system');
    window.location.href = 'tel:+37127727724';
  };

  const handleEmailClick = () => {
    // Отслеживаем клик по email
    trackEmailClick('sticky_phone', 'tsv@metan.lv');
    trackContact('email', 'sticky_phone', 50);
    
    console.log('📧 Sticky email click tracked');
    window.location.href = 'mailto:tsv@metan.lv';
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64 mb-2"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">Nepieciešama konsultācija?</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Sazinieties ar mūsu tehnisko servisa vadītāju
            </p>
            <div className="space-y-2">
              <Button
                onClick={handleCall}
                className="w-full bg-metan-primary hover:bg-metan-primary/90 text-white"
              >
                <Phone className="mr-2 h-4 w-4" />
                +371 27727724
              </Button>
              <Button
                variant="outline"
                className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
                onClick={handleEmailClick}
              >
                tsv@metan.lv
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-14 w-14 rounded-full bg-metan-primary hover:bg-metan-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        data-macaly="sticky-phone-button"
      >
        <Phone className="h-6 w-6" />
      </Button>
    </motion.div>
  );
}