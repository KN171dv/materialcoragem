import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { CTASection } from "@/components/CTASection";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Material de Construção em Campo Grande RJ - Coragem</title>
        <meta
          name="description"
          content="Há 25 anos vendendo material de construção em Campo Grande e Mendanha, RJ. Cimento, areia, tintas, hidráulica e mais. Orçamento pelo WhatsApp."
        />
      </Helmet>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <CTASection />
        <GoogleReviewsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
