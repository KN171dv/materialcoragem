import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, Clock, Package, ArrowRight } from "lucide-react";

const deliveryInfo = [
  {
    icon: Truck,
    title: "Entrega em Campo Grande e Bangu",
    description: "Atendemos toda a região de Campo Grande e Bangu - RJ com frota própria.",
  },
  {
    icon: Clock,
    title: "Prazo rápido",
    description: "Entregas em até 48 horas para pedidos confirmados até 12h.",
  },
  {
    icon: Package,
    title: "Materiais organizados",
    description: "Produtos conferidos e embalados com cuidado para evitar danos.",
  },
  {
    icon: MapPin,
    title: "Retirada na loja",
    description: "Opção de retirar na loja com estacionamento gratuito.",
  },
];

const regions = [
  "Campo Grande",
  "Bangu",
  "Santíssimo",
  "Cosmos",
  "Inhoaíba",
  "Senador Camará",
];

const Entrega = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Entrega de Material de Construção em Campo Grande e Bangu</title>
        <meta
          name="description"
          content="Entregamos em Campo Grande, Bangu, Santíssimo, Cosmos, Inhoaíba e Senador Camará em até 48h. Frota própria, preço justo."
        />
      </Helmet>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16 text-primary-foreground md:py-20">
          <div className="container text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              <span className="text-accent">Entrega</span> e Retirada
            </h1>
            <p className="mx-auto max-w-2xl text-lg opacity-90">
              Levamos os materiais até você com agilidade e segurança
            </p>
          </div>
        </section>

        {/* Info cards */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {deliveryInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-card p-6 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 font-bold">{info.title}</h3>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Regions */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-8 text-2xl font-bold md:text-3xl">
                Regiões Atendidas
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {regions.map((region, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
                  >
                    {region}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-muted-foreground">
                Não encontrou sua região? Entre em contato que verificamos a disponibilidade!
              </p>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
              Como Funciona
            </h2>
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { step: "1", title: "Faça seu pedido", description: "Envie sua lista de materiais pelo formulário ou WhatsApp" },
                  { step: "2", title: "Receba o orçamento", description: "Nossa equipe prepara o orçamento em até 24h úteis" },
                  { step: "3", title: "Agende a entrega", description: "Confirme o pedido e escolha a melhor data para receber" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-xl">
                      {item.step}
                    </div>
                    <h3 className="mb-2 font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link to="/orcamento">
                <Button variant="cta" size="lg">
                  Solicitar Orçamento com Entrega
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Entrega;
