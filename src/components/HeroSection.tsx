import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-primary md:min-h-[700px]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative z-10 flex min-h-[600px] items-center py-16 md:min-h-[700px]">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Content */}
          <div className="flex flex-col justify-center space-y-6 text-primary-foreground">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              Há mais de 20 anos no mercado
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Materiais de{" "}
              <span className="text-accent">qualidade</span>{" "}
              para sua obra
            </h1>

            <p className="max-w-lg text-lg leading-relaxed opacity-90 md:text-xl">
              Tudo o que você precisa para construir ou reformar com segurança e economia. Faça seu orçamento sem compromisso!
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/orcamento">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Pedir Orçamento
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:+5521981691223">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  <Phone className="h-5 w-5" />
                  (21) 98169-1223
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4 opacity-80">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Entrega rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Preços competitivos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Atendimento personalizado</span>
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="hidden items-center justify-center md:flex">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-accent/20 blur-2xl" />
              <div className="relative flex h-80 w-80 items-center justify-center rounded-2xl bg-primary-dark/50 lg:h-96 lg:w-96">
                <div className="text-center text-primary-foreground/60">
                  <div className="text-6xl">🏗️</div>
                  <p className="mt-4 text-sm">Imagem ilustrativa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};
