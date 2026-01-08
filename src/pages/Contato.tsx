import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/DEn9usKHm4URQd6bA";

const Contato = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Mensagem enviada!",
      description: "Retornaremos em breve.",
    });
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16 text-primary-foreground md:py-20">
          <div className="container text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Entre em <span className="text-accent">Contato</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg opacity-90">
              Estamos prontos para atender você. Escolha a melhor forma de contato.
            </p>
          </div>
        </section>

        {/* Contact info + form */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Info */}
              <div>
                <h2 className="mb-6 text-2xl font-bold">Informações de Contato</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">Telefone / WhatsApp</h3>
                      <a href="tel:+5521981691223" className="text-muted-foreground hover:text-primary">
                        (21) 98169-1223
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">E-mail</h3>
                      <a href="mailto:contato@coragem.com.br" className="text-muted-foreground hover:text-primary">
                        contato@coragem.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">Endereço</h3>
                      <a 
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Rua do Sulista QD: 25 LT: 45
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">Horário de Funcionamento</h3>
                      <p className="text-muted-foreground">
                        Segunda a Sexta: 7h às 18h<br />
                        Sábado: 7h às 16h
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-8">
                  <a href="https://wa.me/5521981691223" target="_blank" rel="noopener noreferrer">
                    <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                      <MessageCircle className="h-5 w-5" />
                      Chamar no WhatsApp
                    </Button>
                  </a>
                </div>

                {/* Map button */}
                <div className="mt-8">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 rounded-xl bg-secondary p-6 transition-colors hover:bg-secondary/80"
                  >
                    <MapPin className="h-6 w-6 text-primary" />
                    <span className="font-medium">Abrir no Google Maps</span>
                    <ExternalLink className="h-5 w-5 text-muted-foreground" />
                  </a>
                </div>
              </div>

              {/* Form */}
              <div>
                <h2 className="mb-6 text-2xl font-bold">Envie uma Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome *</Label>
                    <Input id="nome" placeholder="Seu nome" required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" type="tel" placeholder="(11) 99999-9999" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assunto">Assunto *</Label>
                    <Input id="assunto" placeholder="Assunto da mensagem" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem *</Label>
                    <Textarea id="mensagem" placeholder="Sua mensagem..." rows={5} required />
                  </div>
                  <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Enviando..." : (
                      <>
                        <Send className="h-5 w-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contato;
