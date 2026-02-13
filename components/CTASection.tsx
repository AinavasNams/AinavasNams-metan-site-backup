'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Recycle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackCTA, trackServiceInterest, trackInvestorAction } from '@/components/Analytics';
import { sendGoogleAdsConversion } from '@/lib/ga4-events';
import { useRouter } from 'next/navigation';

export function CTASection() {
  console.log('CTASection component rendered');
  const router = useRouter();

  const handleServiceCTAClick = () => {
    // Track service interest from CTA section
    trackServiceInterest('atkritumu_savaksana', 'cta_section', {
      button_type: 'service_cta',
      cta_position: 'bottom_section'
    });
    
    // Track CTA click
    trackCTA('service_waste_collection', 'cta_section', '/pakalpojumi/savaksana');
    
    // Send Google Ads conversion
    sendGoogleAdsConversion('quick_order', 70);
    
    console.log('🎯 Service CTA clicked from CTA section');
    
    // Navigate using Next.js router
    router.push('/pakalpojumi/savaksana');
  };

  const handleInvestorCTAClick = () => {
    // Track investor action from CTA section  
    trackInvestorAction('project_interest', 'biometans', {
      button_type: 'investor_cta',
      cta_position: 'bottom_section'
    });
    
    // Track CTA click
    trackCTA('investor_project_interest', 'cta_section', '/projekti/biometans');
    
    // Send Google Ads conversion
    sendGoogleAdsConversion('investor_interest', 250);
    
    console.log('🎯 Investor CTA clicked from CTA section');
    
    // Navigate using Next.js router
    router.push('/projekti/biometans');
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
            Pievienojies aprites ekonomikai
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Mēs veidojam nākamās paaudzes enerģijas un vides ekosistēmu. 
            Piedalies tajā — kā pakalpojuma saņēmējs, sadarbības partneris vai investors.
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
                  Klientiem (pakalpojumi)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-white/90">
                  Darbojamies ar HoReCa, ražotājiem un pārstrādes sektoru
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Tauku un eļļas savākšana</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Tauku atdalītāju tīrīšana</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Pilna dokumentācija un atbilstība</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-white text-metan-primary hover:bg-gray-100"
                  onClick={handleServiceCTAClick}
                >
                  Pieteikt atkritumu savākšanu
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
                  Investoriem
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-white/90">
                  Biometāns — pirmais solis jūsu ESG stratēģijā
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Rentabilitāte līdz 38,6%</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>RED II un ISCC sertifikācija</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Eksporta potenciāls uz Baltiju</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-white text-metan-primary hover:bg-gray-100"
                  onClick={handleInvestorCTAClick}
                >
                  Uzzināt par investīciju iespējām
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
            <h3 className="text-2xl font-bold mb-4">Par SIA &quot;Ainavas Nams&quot;</h3>
            <p className="text-white/90 leading-relaxed">
              SIA &quot;Ainavas Nams&quot; ir Latvijas uzņēmums, kas dibināts 2020. gadā ar mērķi attīstīt aprites enerģētiku
              un veikt pāreju no elektroenerģijas ražošanas uz biometāna un CO₂ ieguvi. Projekts tiek īstenots uz
              jau esošās fermentācijas stacijas pamata, kuru pārvalda SIA &quot;Zemgales Enerģijas Parks&quot;, nodibināts 2014. gadā.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}