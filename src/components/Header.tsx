import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
  { name: "Quem Somos", href: "/quem-somos" },
  { name: "Entrega", href: "/entrega" },
  { name: "Contato", href: "/contato" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="hidden bg-primary py-2 text-primary-foreground md:block">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+5511999999999" className="flex items-center gap-2 hover:opacity-80">
              <Phone className="h-4 w-4" />
              (11) 99999-9999
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Rua Exemplo, 123 - Centro, Cidade/SP
            </span>
          </div>
          <span className="font-medium">Seg a Sex: 7h às 18h | Sáb: 7h às 13h</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary md:h-12 md:w-12">
            <span className="text-xl font-black text-primary-foreground md:text-2xl">C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-foreground md:text-xl">Coragem</span>
            <span className="text-xs text-muted-foreground">Material de Construção</span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href ? "text-primary" : "text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link to="/orcamento">
            <Button variant="cta" size="lg">
              Pedir Orçamento
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container flex flex-col py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href ? "text-primary" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/orcamento" onClick={() => setMobileMenuOpen(false)} className="mt-4">
              <Button variant="cta" size="lg" className="w-full">
                Pedir Orçamento
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
