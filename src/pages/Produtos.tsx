import { Seo } from "@/components/Seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hammer, PaintBucket, Pipette, Lightbulb, Layers, Wrench, ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Materiais Básicos",
    description: "Cimento, areia, pedra, tijolos, blocos, argamassa e mais",
    icon: Layers,
    color: "bg-blue-100 text-blue-600",
    items: ["Cimento CP II e CP III", "Areia fina e grossa", "Pedra brita", "Tijolos e blocos", "Argamassa", "Cal"],
  },
  {
    id: 2,
    name: "Tintas e Pintura",
    description: "Tintas latex, acrílica, esmalte, vernizes e acessórios",
    icon: PaintBucket,
    color: "bg-orange-100 text-orange-600",
    items: ["Tinta látex", "Tinta acrílica", "Esmalte sintético", "Vernizes", "Massa corrida", "Rolos e pincéis"],
  },
  {
    id: 3,
    name: "Hidráulica",
    description: "Tubos, conexões, registros, torneiras e acessórios",
    icon: Pipette,
    color: "bg-cyan-100 text-cyan-600",
    items: ["Tubos PVC", "Conexões", "Registros", "Torneiras", "Sifões", "Caixas d'água"],
  },
  {
    id: 4,
    name: "Elétrica",
    description: "Fios, cabos, tomadas, interruptores e disjuntores",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-600",
    items: ["Fios e cabos", "Tomadas", "Interruptores", "Disjuntores", "Quadros de luz", "Lâmpadas"],
  },
  {
    id: 5,
    name: "Ferramentas",
    description: "Ferramentas manuais e elétricas para sua obra",
    icon: Hammer,
    color: "bg-red-100 text-red-600",
    items: ["Martelos", "Chaves", "Serras", "Furadeiras", "Trenas", "Níveis"],
  },
  {
    id: 6,
    name: "Acabamentos",
    description: "Pisos, revestimentos, louças sanitárias e metais",
    icon: Wrench,
    color: "bg-purple-100 text-purple-600",
    items: ["Pisos cerâmicos", "Porcelanatos", "Louças sanitárias", "Metais", "Rejuntes", "Rodapés"],
  },
];

const Produtos = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo title="Cimento, Tintas, Hidráulica e Ferramentas - Coragem Campo Grande" description="Catálogo completo de materiais de construção em Campo Grande RJ: cimento, areia, brita, tintas, hidráulica, elétrica, ferramentas e acabamento." />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16 text-primary-foreground md:py-20">
          <div className="container text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Nossos <span className="text-accent">Produtos</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg opacity-90">
              Trabalhamos com as melhores marcas do mercado. Todos os produtos sob consulta - solicite seu orçamento personalizado.
            </p>
          </div>
        </section>

        {/* Products grid */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
                  >
                    <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${category.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                      {category.name}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    <ul className="mb-6 space-y-2">
                      {category.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link to="/orcamento">
                      <Button variant="outline" size="sm" className="w-full">
                        Solicitar Orçamento
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-2xl bg-secondary p-8 text-center md:p-12">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                Não encontrou o que procura?
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                Trabalhamos com centenas de produtos. Entre em contato e informe o que você precisa - faremos um orçamento personalizado.
              </p>
              <Link to="/orcamento">
                <Button variant="cta" size="lg">
                  Pedir Orçamento Personalizado
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="border-t border-border py-12">
          <div className="container">
            <h2 className="mb-8 text-center text-xl font-bold text-muted-foreground">
              Trabalhamos com as melhores marcas
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {["Votoran", "Quartzolit", "Tigre", "Amanco", "Suvinil", "Coral", "Vonder", "Tramontina"].map((brand) => (
                <span key={brand} className="text-lg font-semibold text-muted-foreground">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Produtos;
