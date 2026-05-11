'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Calculator, FileText, Clock, Shield } from 'lucide-react';
import { trackCTA, trackPhoneConversion } from '@/components/Analytics';
import { trackContactMethod } from '@/lib/analytics';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface EnhancedCTAProps {
  variant?: 'homepage' | 'services' | 'calculator';
  className?: string;
}

export function EnhancedCTA({ variant = 'homepage', className = '' }: EnhancedCTAProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleCTAClick = (ctaType: string, destination: string) => {
    trackCTA(ctaType, `${variant}_page`, destination);
  };

  const handlePhoneClick = () => {
    trackPhoneConversion('+371 27727724', 'tel:+37127727724');
    trackContactMethod('phone', `${variant}_page`, 'enhanced_cta');
  };

  const handleEmailClick = () => {
    trackContactMethod('email', `${variant}_page`, 'enhanced_cta');
  };

  if (variant === 'calculator') {
    return (
      <section className={`py-16 bg-metan-primary text-white ${className}`}>
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('enhancedCta.calculator.title')}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {t('enhancedCta.calculator.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <a href="tel:+37127727724" onClick={handlePhoneClick}>
                <Button size="lg" className="w-full sm:w-auto bg-white text-metan-primary hover:bg-gray-100">
                  <Phone className="h-5 w-5 mr-2" />
                  {t('enhancedCta.phone.callNow')}
                </Button>
              </a>
              
              <a href="mailto:tsv@metan.lv" onClick={handleEmailClick}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-metan-primary"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  {t('enhancedCta.email.writeEmail')}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 bg-gradient-to-br from-metan-primary to-metan-accent text-white ${className}`}>
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-macaly="enhanced-cta-title">
            {t(`enhancedCta.${variant}.title`)}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            {t(`enhancedCta.${variant}.subtitle`)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Phone CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('enhancedCta.phone.title')}</h3>
                <p className="text-white/80 mb-6 text-sm">
                  {t('enhancedCta.phone.desc')}
                </p>
                <a href="tel:+37127727724" onClick={handlePhoneClick}>
                  <Button className="w-full bg-white text-metan-primary hover:bg-gray-100 font-semibold">
                    +371 27727724
                  </Button>
                </a>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-white/70">
                  <Clock className="h-3 w-3" />
                  {t('enhancedCta.phone.hours')}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('enhancedCta.email.title')}</h3>
                <p className="text-white/80 mb-6 text-sm">
                  {t('enhancedCta.email.desc')}
                </p>
                <a href="mailto:tsv@metan.lv" onClick={handleEmailClick}>
                  <Button className="w-full bg-white text-metan-primary hover:bg-gray-100 font-semibold">
                    tsv@metan.lv
                  </Button>
                </a>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-white/70">
                  <FileText className="h-3 w-3" />
                  {t('enhancedCta.email.response')}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Calculator CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t('enhancedCta.calc.title')}</h3>
                <p className="text-white/80 mb-6 text-sm">
                  {t('enhancedCta.calc.desc')}
                </p>
                <Button 
                  className="w-full bg-white text-metan-primary hover:bg-gray-100 font-semibold"
                  asChild
                >
                  <Link href="/#calculator" onClick={() => handleCTAClick('services_calculator', '/#calculator')}>
                    {t('enhancedCta.calc.calculate')}
                  </Link>
                </Button>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-white/70">
                  <Calculator className="h-3 w-3" />
                  {t('enhancedCta.calc.free')}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <Shield className="h-6 w-6 text-green-300" />
                <div className="text-left">
                  <div className="font-semibold">{t('enhancedCta.trust.licensed')}</div>
                  <div className="text-sm opacity-80">{t('enhancedCta.trust.licensedDesc')}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="h-6 w-6 text-blue-300" />
                <div className="text-left">
                  <div className="font-semibold">{t('enhancedCta.trust.emergency')}</div>
                  <div className="text-sm opacity-80">{t('enhancedCta.trust.emergencyDesc')}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <FileText className="h-6 w-6 text-white" />
                <div className="text-left">
                  <div className="font-semibold">{t('enhancedCta.trust.docs')}</div>
                  <div className="text-sm opacity-80">{t('enhancedCta.trust.docsDesc')}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
