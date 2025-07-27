'use client';

import { useEffect } from 'react';
import { HeroSection } from "@/components/HeroSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { StatsSection } from "@/components/StatsSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { CTASection } from "@/components/CTASection";
import { IndustrySpecialization } from "@/components/IndustrySpecialization";
import { LegalDocumentation } from "@/components/LegalDocumentation";
import { FrequentlyAskedQuestions } from "@/components/FrequentlyAskedQuestions";
import { HowItWorks } from "@/components/HowItWorks";
import { CustomerTestimonials } from "@/components/CustomerTestimonials";
import { PartnersLogos } from "@/components/PartnersLogos";
import { MissionVision } from "@/components/MissionVision";
import { EnhancedCTA } from "@/components/EnhancedCTA";
import { trackPageView, trackUserJourney, trackUserDemographics } from "@/components/Analytics";

// Fix imports - these components use default export
import SEOHead from "@/components/SEOHead";
import SimpleServiceCalculator from "@/components/SimpleServiceCalculator";
import TrustedPartners from "@/components/TrustedPartners";
import PriorityContacts from "@/components/PriorityContacts";

export default function Home() {
  console.log("Home page rendered - Full site restored and enhanced");
  
  // Track homepage visit and user journey
  useEffect(() => {
    // Track homepage visit
    trackPageView('homepage', {
      page_section: 'main',
      visitor_type: 'new_or_returning',
      page_priority: 'high',
    });
    
    // Track start of user journey
    trackUserJourney('homepage_visit', {
      entry_point: 'homepage',
      session_start: true,
      funnel_entry: true,
    });
    
    // Track user demographics if available
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent;
      const language = navigator.language;
      const referrer = document.referrer;
      
      trackUserDemographics({
        user_language: language,
        user_agent: userAgent,
        referrer: referrer,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
      });
    }
    
    console.log("📊 Homepage tracking initialized - Full site restoration");
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* SEO Enhancement */}
      <SEOHead 
        title="METAN.LV - No organiskajiem atkritumiem līdz tīrai enerģijai"
        description="SIA Ainavas Nams piedāvā sertificētus risinājumus tauku, eļļas un pārtikas atkritumu savākšanai un pārstrādei uz biometānu. Biometāna ražošana Latvijā."
        keywords="biometāns, atkritumu savākšana, tauku utilizācija, eļļas savākšana, organisko atkritumu pārstrāde, videi draudzīga enerģija, Latvija"
      />
      
      {/* Hero Section with stunning visuals */}
      <HeroSection />
      
      {/* Key Statistics */}
      <StatsSection />
      
      {/* How It Works - Process visualization */}
      <HowItWorks />
      
      {/* Services Grid */}
      <ServicesGrid />
      
      {/* Mission & Vision */}
      <MissionVision />
      
      {/* Advantages Section */}
      <AdvantagesSection />
      
      {/* Industry Specialization */}
      <IndustrySpecialization />
      
      {/* Quick Calculator */}
      <SimpleServiceCalculator />
      
      {/* Trusted Partners */}
      <TrustedPartners />
      
      {/* Partners Logos */}
      <PartnersLogos />
      
      {/* Customer Testimonials */}
      <CustomerTestimonials />
      
      {/* Legal Documentation */}
      <LegalDocumentation />
      
      {/* FAQ Section */}
      <FrequentlyAskedQuestions />
      
      {/* Priority Contacts */}
      <PriorityContacts />
      
      {/* Enhanced CTA */}
      <EnhancedCTA />
      
      {/* Final CTA Section */}
      <CTASection />
    </div>
  );
}