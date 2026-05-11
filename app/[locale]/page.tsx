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
import SimpleServiceCalculator from "@/components/SimpleServiceCalculator";
import TrustedPartners from "@/components/TrustedPartners";
import PriorityContacts from "@/components/PriorityContacts";
import HomeTracking from "@/components/HomeTracking";
import DeferredSection from "@/components/DeferredSection";
import { generatePageMetadata } from "@/lib/page-metadata";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as "lv" | "ru" | "en" | "lt";
  return generatePageMetadata(lang, "");
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <HomeTracking />

      {/* Above fold — mount immediately */}
      <HeroSection />
      <StatsSection />

      {/* Below fold — deferred mount to prevent main thread blocking */}
      <DeferredSection><HowItWorks /></DeferredSection>
      <DeferredSection><ServicesGrid /></DeferredSection>
      <DeferredSection><MissionVision /></DeferredSection>
      <DeferredSection><AdvantagesSection /></DeferredSection>
      <DeferredSection><IndustrySpecialization /></DeferredSection>
      <DeferredSection><SimpleServiceCalculator /></DeferredSection>
      <DeferredSection><TrustedPartners /></DeferredSection>
      <DeferredSection><PartnersLogos /></DeferredSection>
      <DeferredSection><CustomerTestimonials /></DeferredSection>
      <DeferredSection><LegalDocumentation /></DeferredSection>
      <DeferredSection><FrequentlyAskedQuestions /></DeferredSection>
      <DeferredSection><PriorityContacts /></DeferredSection>
      <DeferredSection><EnhancedCTA /></DeferredSection>
      <DeferredSection><CTASection /></DeferredSection>
    </div>
  );
}
