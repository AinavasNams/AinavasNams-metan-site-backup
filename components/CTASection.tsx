'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Recycle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackCTA, trackServiceInterest, trackInvestorAction } from '@/components/Analytics';
import { sendGoogleAdsConversion } from '@/lib/ga4-events';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

export function CTASection() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleServiceCTAClick = () => {
    trackServiceInterest('atkritumu_savaksana', 'cta_section', {
      button_type: 'service_cta',
      cta_position: 'bottom_section'
    });
    trackCTA('service_waste_collection', 'cta_section', '/pakalpojumi/savaksana');
    sendGoogleAdsConversion('quick_order', 70);
  };

  const handleInvestorCTAClick = () => {
    trackInvestorAction('project_interest', 'biometans', {
      button_type: 'investor_cta',
      cta_position: 'bottom_section'
    });
    trackCTA('investor_project_interest', 'cta_section', '/projekti/biometans');
    sendGoogleAdsConversion('investor_interest', 250);
  };

  return (
    <section className="py-20 bg-metan-primary text-white">
      <div className="metan-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {t('cta.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clients Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Recycle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-center text-white">
                  {t('cta.clients.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-white/90">
                  {t('cta.clients.desc')}
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{t('cta.clients.item1')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{t('cta.clients.item2')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{t('cta.clients.item3')}</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-white text-metan-primary hover:bg-gray-100"
                  asChild
                >
                  <Link href="/pakalpojumi/savaksana" onClick={handleServiceCTAClick}>
                    {t('cta.clients.button')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Investors Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-center text-white">
                  {t('cta.investors.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-white/90">
                  {t('cta.investors.desc')}
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{t('cta.investors.item1')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{t('cta.investors.item2')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{t('cta.investors.item3')}</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-white text-metan-primary hover:bg-gray-100"
                  asChild
                >
                  <Link href="/projekti/biometans" onClick={handleInvestorCTAClick}>
                    {t('cta.investors.button')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t('cta.about.title')}</h3>
            <p className="text-white/90 leading-relaxed">
              {t('cta.about.text')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
