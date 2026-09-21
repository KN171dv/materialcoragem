import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
  { name: "Quem Somos", href: "/quem-somos" },
  { name: "Entrega", href: "/entrega" },
  { name: "Contato", href: "/contato" },
];

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/DEn9usKHm4URQd6bA";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="hidden bg-primary py-2 text-primary-foreground md:block">
        <div className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+5521981691223" className="flex items-center gap-2 hover:opacity-80">
              <Phone className="h-4 w-4" />
              (21) 98169-1223
            </a>
            <a 
              href={GOOGLE_MAPS_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80"
            >
              <MapPin className="h-4 w-4 shrink-0" />
              Rua do Sulista, 803-805 - Campo Grande, Rio de Janeiro - RJ, CEP 23098-630
            </a>
          </div>
          <span className="font-medium">Seg a Sex: 7h às 18h | Sáb: 7h às 16h</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Coragem Material de Construção" className="h-12 w-auto rounded-full md:h-14" />
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
