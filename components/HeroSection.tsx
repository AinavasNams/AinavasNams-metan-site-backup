'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Recycle, TrendingUp, Truck, Factory, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { trackCTA, trackServiceInterest, trackInvestorAction } from '@/components/Analytics';
import { sendGoogleAdsConversion } from '@/lib/ga4-events';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  console.log('HeroSection rendered');
  const router = useRouter();

  const handleServiceClick = () => {
    // Track service interest
    trackServiceInterest('atkritumu_savaksana', 'hero_section', {
      button_type: 'primary_cta',
      hero_position: 'main_cta'
    });
    
    // Track CTA click
    trackCTA('service_request', 'hero_section', '/pakalpojumi/savaksana');
    
    // Send Google Ads conversion
    sendGoogleAdsConversion('quick_order', 70);
    
    console.log('🎯 Service CTA clicked from hero section');
    
    // Navigate using Next.js router
    router.push('/pakalpojumi/savaksana');
  };

  const handleInvestorClick = () => {
    // Track investor action
    trackInvestorAction('project_interest', 'biometans', {
      button_type: 'secondary_cta',
      hero_position: 'investment_cta'
    });
    
    // Track CTA click
    trackCTA('investor_interest', 'hero_section', '/projekti/biometans');
    
    // Send Google Ads conversion
    sendGoogleAdsConversion('investor_interest', 250);
    
    console.log('🎯 Investment CTA clicked from hero section');
    
    // Navigate using Next.js router
    router.push('/projekti/biometans');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-metan-light via-white to-metan-light/50 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center" 
             style={{backgroundImage: 'url(https://images.pexels.com/photos/31403876/pexels-photo-31403876.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)'}}></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-cover bg-center rounded-tr-3xl" 
             style={{backgroundImage: 'url(https://images.pexels.com/photos/7512976/pexels-photo-7512976.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)'}}></div>
      </div>
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-hero-gradient opacity-5"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-metan-accent/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-metan-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Enhanced animated process flow */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Truck className="h-8 w-8 text-metan-primary animate-pulse" />
            <span className="text-xs font-medium text-metan-primary">Savākšana</span>
          </div>
          <ArrowRight className="h-6 w-6 text-metan-accent rotate-90 animate-bounce" />
          <div className="flex items-center gap-2">
            <Factory className="h-8 w-8 text-metan-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span className="text-xs font-medium text-metan-accent">Pārstrāde</span>
          </div>
          <ArrowRight className="h-6 w-6 text-metan-accent rotate-90 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-green-500 animate-pulse" style={{ animationDelay: '1s' }} />
            <span className="text-xs font-medium text-green-500">Biometāns</span>
          </div>
        </div>
      </div>
      
      <div className="metan-container relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Slogan Badge */}
            <Badge variant="outline" className="mb-6 px-4 py-2 text-base bg-white/80 backdrop-blur-sm border-metan-primary text-metan-primary">
              <Recycle className="mr-2 h-4 w-4" />
              Biomasa → Biometāns
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-metan-gray mb-6 leading-tight">
              Mēs radām tīru enerģiju no organiskajiem atkritumiem
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl leading-relaxed">
              SIA "Ainavas Nams" ir Latvijas aprites ekonomikas projekts, kas pārvērš taukus, pārtikas un lauksaimniecības atkritumus par biogāzi, biometānu, biopolimēriem un tehnoloģisko CO₂. Mēs apvienojam modernas tehnoloģijas, loģistiku un investīcijas, lai radītu reālu vērtību no atkritumiem.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button 
              className="metan-button-primary text-lg px-8 py-4 h-auto group bg-metan-primary hover:bg-metan-primary/90 text-white"
              data-macaly="hero-cta-primary"
              onClick={handleServiceClick}
            >
              <Recycle className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Pieteikt atkritumu savākšanu
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 py-4 h-auto border-metan-primary text-metan-primary hover:bg-metan-primary hover:text-white bg-white group"
              onClick={handleInvestorClick}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Uzzināt par investīciju iespējām
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Dynamic metrics placeholders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
              <div className="text-2xl font-bold text-metan-primary">12,000+</div>
              <div className="text-sm text-gray-600">Tonnas savākto atkritumu</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
              <div className="text-2xl font-bold text-metan-accent">200+</div>
              <div className="text-sm text-gray-600">Aktīvie partneri</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
              <div className="text-2xl font-bold text-metan-primary">26,951</div>
              <div className="text-sm text-gray-600">MWh biometāna gadā</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
              <div className="text-2xl font-bold text-green-600">3,880t</div>
              <div className="text-sm text-gray-600">CO₂ samazinājums</div>
            </div>
          </motion.div>

          {/* Hidden SEO phrases */}
          <div className="hidden">
            videi draudzīga atkritumu savākšana, likumīga tauku savākšana, biometāna ražošana Latvijā, 
            organisko atkritumu pārstrāde, tauku atdalītāju tīrīšana, eļļas utilizācija, 
            sertificēti atkritumu apsaimniekošanas pakalpojumi, METAN.LV, CH4 Future, 
            Ainavas Nams, biopolimēri, aprites ekonomika, ESG investīcijas, RED II, ISCC sertifikācija,
            HoReCa atkritumi, vakuuma mašīnas, Zemgales Enerģijas Parks, biogāzes stacija Bēnē
          </div>
        </div>
      </div>
    </section>
  );
}