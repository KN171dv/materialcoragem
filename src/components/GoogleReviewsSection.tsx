import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOOGLE_REVIEW_URL = "https://g.page/r/CRYXDoMz4K8HEBM/review";

const reviews = [
  {
    id: 1,
    name: "Carlos Silva",
    rating: 5,
    text: "Excelente atendimento! Produtos de qualidade e entrega rápida. Recomendo muito!",
    date: "2 semanas atrás",
  },
  {
    id: 2,
    name: "Maria Santos",
    rating: 5,
    text: "Ótimos preços e variedade de materiais. A equipe é muito prestativa.",
    date: "1 mês atrás",
  },
  {
    id: 3,
    name: "João Pereira",
    rating: 5,
    text: "Compro aqui há anos. Sempre com os melhores preços da região.",
    date: "1 mês atrás",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-accent text-accent" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

export const GoogleReviewsSection = () => {
  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            Avaliações dos nossos clientes
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              5.0 no Google
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl bg-card p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {review.name.charAt(0)}
                </div>
                <StarRating rating={review.rating} />
              </div>
              <h4 className="mb-1 font-semibold text-foreground">{review.name}</h4>
              <p className="mb-2 text-xs text-muted-foreground">{review.date}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            asChild
            variant="cta"
            size="lg"
            className="gap-2"
          >
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="h-5 w-5" />
              Avaliar no Google
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
