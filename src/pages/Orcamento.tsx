import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Upload, MessageCircle } from "lucide-react";

const Orcamento = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    tipoCliente: "",
    tipoEntrega: "",
    mensagem: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Orçamento enviado!",
      description: "Em breve entraremos em contato pelo WhatsApp.",
    });

    setFormData({
      nome: "",
      telefone: "",
      email: "",
      tipoCliente: "",
      tipoEntrega: "",
      mensagem: "",
    });
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16 text-primary-foreground md:py-20">
          <div className="container text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Solicite seu <span className="text-accent">Orçamento</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg opacity-90">
              Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas úteis.
            </p>
          </div>
        </section>

        {/* Form section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome */}
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo *</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                    />
                  </div>

                  {/* Telefone e Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="telefone">WhatsApp *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  {/* Tipo de cliente */}
                  <div className="space-y-2">
                    <Label htmlFor="tipoCliente">Tipo de cliente *</Label>
                    <select
                      id="tipoCliente"
                      name="tipoCliente"
                      value={formData.tipoCliente}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="pessoa-fisica">Pessoa Física</option>
                      <option value="obra-pequena">Obra Pequena</option>
                      <option value="construtor">Construtor / Empresa</option>
                    </select>
                  </div>

                  {/* Tipo de entrega */}
                  <div className="space-y-2">
                    <Label htmlFor="tipoEntrega">Preferência de entrega *</Label>
                    <select
                      id="tipoEntrega"
                      name="tipoEntrega"
                      value={formData.tipoEntrega}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="entrega">Entrega no endereço</option>
                      <option value="retirada">Retirada na loja</option>
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Lista de materiais / Mensagem *</Label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Descreva os materiais que você precisa ou envie sua lista..."
                      rows={5}
                      required
                    />
                  </div>

                  {/* Upload */}
                  <div className="space-y-2">
                    <Label>Anexar lista de materiais (opcional)</Label>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-6 transition-colors hover:border-primary/50">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Arraste um arquivo ou clique para enviar
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, imagem ou planilha (máx. 10MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                    <Button type="submit" variant="cta" size="lg" className="flex-1" disabled={loading}>
                      {loading ? (
                        "Enviando..."
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Enviar Orçamento
                        </>
                      )}
                    </Button>
                    <a href="https://wa.me/5521981691223" target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button type="button" variant="whatsapp" size="lg" className="w-full">
                        <MessageCircle className="h-5 w-5" />
                        Chamar no WhatsApp
                      </Button>
                    </a>
                  </div>
                </form>
              </div>

              {/* Info */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Ao enviar, você concorda em receber contato via WhatsApp sobre seu orçamento.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Orcamento;
