import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Users, Target, Award, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Missão",
    description: "Fornecer materiais de construção de qualidade, com preços justos e atendimento personalizado, contribuindo para a realização do sonho da casa própria.",
  },
  {
    icon: Award,
    title: "Visão",
    description: "Ser referência em material de construção na região, reconhecida pela excelência no atendimento e qualidade dos produtos.",
  },
  {
    icon: Heart,
    title: "Valores",
    description: "Honestidade, comprometimento, respeito ao cliente e parceria duradoura com fornecedores e colaboradores.",
  },
];

const QuemSomos = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16 text-primary-foreground md:py-20">
          <div className="container text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Quem <span className="text-accent">Somos</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg opacity-90">
              Há mais de 20 anos construindo sonhos junto com você
            </p>
          </div>
        </section>

        {/* História */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">Nossa História</h2>
                  <p className="text-muted-foreground">Uma trajetória de confiança</p>
                </div>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fundada em 2004, a <strong className="text-foreground">Material de Construção Coragem</strong> nasceu do sonho de uma família que acreditava em oferecer mais do que produtos: oferecer soluções para quem quer construir ou reformar.
                </p>
                <p>
                  Ao longo de mais de duas décadas, nos tornamos referência na região, atendendo desde o pequeno reformista até grandes construtoras. Nossa história foi construída tijolo a tijolo, com muito trabalho, dedicação e, principalmente, respeito aos nossos clientes.
                </p>
                <p>
                  Hoje, contamos com uma equipe qualificada, pronta para ajudar você a encontrar os melhores materiais para sua obra, sempre com preços justos e condições especiais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="container">
            <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
              Nossos Pilares
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="rounded-xl bg-card p-6 text-center shadow-sm"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Números */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {[
                { number: "20+", label: "Anos de experiência" },
                { number: "5.000+", label: "Clientes atendidos" },
                { number: "1.000+", label: "Produtos disponíveis" },
                { number: "100%", label: "Comprometimento" },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-black text-primary md:text-5xl">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-muted-foreground">{stat.label}</div>
                </div>
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

export default QuemSomos;
