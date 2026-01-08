import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Entregamos em toda a região com agilidade e segurança.",
  },
  {
    icon: Shield,
    title: "Qualidade Garantida",
    description: "Trabalhamos apenas com as melhores marcas do mercado.",
  },
  {
    icon: Clock,
    title: "Orçamento Rápido",
    description: "Respondemos seu orçamento em até 24 horas úteis.",
  },
  {
    icon: Users,
    title: "Atendimento Personalizado",
    description: "Equipe especializada para ajudar em sua obra.",
  },
];

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-secondary py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative z-10">
        {/* Features grid */}
        <div className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
            Pronto para começar sua obra?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Solicite seu orçamento agora mesmo. Nossa equipe está pronta para atender você com os melhores preços e condições.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/orcamento">
              <Button variant="hero" size="xl">
                Pedir Orçamento Agora
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
