import { Seo } from "@/components/Seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { LocalCoverageSection } from "@/components/LocalCoverageSection";
import { CTASection } from "@/components/CTASection";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo title="Material de Construção em Campo Grande RJ - Coragem" description="Há 25 anos vendendo material de construção em Campo Grande e Mendanha, RJ. Cimento, areia, tintas, hidráulica e mais. Orçamento pelo WhatsApp." />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <LocalCoverageSection />
        <CTASection />
        <GoogleReviewsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
