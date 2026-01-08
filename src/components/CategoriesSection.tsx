import { Link } from "react-router-dom";
import { Hammer, PaintBucket, Pipette, Lightbulb, Layers, Wrench } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Materiais Básicos",
    description: "Cimento, areia, pedra, tijolos e blocos",
    icon: Layers,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    name: "Tintas e Pintura",
    description: "Tintas, vernizes, solventes e acessórios",
    icon: PaintBucket,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 3,
    name: "Hidráulica",
    description: "Tubos, conexões, torneiras e registros",
    icon: Pipette,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    id: 4,
    name: "Elétrica",
    description: "Fios, cabos, tomadas e disjuntores",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 5,
    name: "Ferramentas",
    description: "Ferramentas manuais e elétricas",
    icon: Hammer,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 6,
    name: "Acabamentos",
    description: "Pisos, revestimentos e louças",
    icon: Wrench,
    color: "bg-purple-100 text-purple-600",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Nossos Produtos
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Tudo para sua <span className="text-primary">obra</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Trabalhamos com as melhores marcas do mercado. Confira nossas categorias de produtos e solicite um orçamento personalizado.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to="/produtos"
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Ver todos os produtos
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
