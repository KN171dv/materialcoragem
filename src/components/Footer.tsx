import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Mail, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/DEn9usKHm4URQd6bA";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo e descrição */}
          <div className="space-y-4">
            <img src={logo} alt="Coragem Material de Construção" className="h-16 w-auto rounded-full" />
            <p className="text-sm leading-relaxed opacity-80">
              Há mais de 20 anos fornecendo materiais de qualidade para sua obra. Sua construção com segurança e confiança.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/produtos" className="opacity-80 transition-opacity hover:opacity-100">
                  Nossos Produtos
                </Link>
              </li>
              <li>
                <Link to="/quem-somos" className="opacity-80 transition-opacity hover:opacity-100">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/entrega" className="opacity-80 transition-opacity hover:opacity-100">
                  Entrega
                </Link>
              </li>
              <li>
                <Link to="/orcamento" className="opacity-80 transition-opacity hover:opacity-100">
                  Pedir Orçamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+5521981691223" className="opacity-80 hover:opacity-100">
                  (21) 98169-1223
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:abr.materialcoragem@gmail.com" className="opacity-80 hover:opacity-100">
                  abr.materialcoragem@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                <a 
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100"
                >
                  Rua do Sulista, 803-805<br />
                  Campo Grande, Rio de Janeiro - RJ<br />
                  CEP 23098-630
                </a>
              </li>
            </ul>
          </div>

          {/* Horário */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="opacity-80">Segunda a Sexta: 7h às 18h</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="opacity-80">Sábado: 7h às 16h</span>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 transition-colors hover:bg-accent/30"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/material_de_construcao_coragem/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 transition-colors hover:bg-accent/30"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-4">
          <p className="text-center text-xs opacity-60">
            © {new Date().getFullYear()} Material de Construção Coragem. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
