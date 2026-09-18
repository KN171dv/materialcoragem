import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/gFBnswycrDKVBB3N8";

const RATING = 4.6;
const REVIEW_COUNT = 49;

const RatingStars = ({ className = "h-5 w-5" }: { className?: string }) => {
  const percent = (RATING / 5) * 100;
  return (
    <div className="relative inline-flex">
      <div className="flex gap-0.5 text-muted">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={className} />
        ))}
      </div>
      <div
        className="absolute inset-0 flex gap-0.5 overflow-hidden text-accent"
        style={{ width: `${percent}%` }}
      >
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`${className} fill-accent`} />
        ))}
      </div>
    </div>
  );
};

export const GoogleReviewsSection = () => {
  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl rounded-2xl bg-card p-8 text-center shadow-md md:p-10">
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            Avaliações dos nossos clientes
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Veja o que quem compra na Coragem está dizendo no Google
          </p>

          <div className="mb-8 flex flex-col items-center gap-2">
            <span className="text-5xl font-black text-foreground md:text-6xl">
              4,6
            </span>
            <RatingStars className="h-6 w-6" />
            <span className="text-sm font-medium text-muted-foreground">
              4,6 de 5 · {REVIEW_COUNT} avaliações no Google
            </span>
          </div>

          <Button asChild variant="cta" size="lg" className="gap-2">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="h-5 w-5" />
              Ver avaliações no Google
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
