import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Upload, MessageCircle, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const Orcamento = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [anexo, setAnexo] = useState<File | null>(null);
  const [anexoUrl, setAnexoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    tipoCliente: "",
    tipoEntrega: "",
    mensagem: "",
  });
  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
  });
  const [loadingCep, setLoadingCep] = useState(false);

  const getTipoClienteLabel = (value: string) => {
    const labels: Record<string, string> = {
      "pessoa-fisica": "Pessoa Física",
      "obra-pequena": "Obra Pequena",
      "construtor": "Construtor / Empresa",
    };
    return labels[value] || value;
  };

  const getTipoEntregaLabel = (value: string) => {
    const labels: Record<string, string> = {
      "entrega": "Entrega no endereço",
      "retirada": "Retirada na loja",
    };
    return labels[value] || value;
  };

  const buscarCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (!data.erro && data.logradouro) {
        setEndereco((prev) => ({ ...prev, rua: data.logradouro }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoadingCep(false);
    }
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));

    if (name === "cep" && value.replace(/\D/g, "").length === 8) {
      buscarCep(value);
    }
  };

  const hasEnderecoData = () => {
    return endereco.cep || endereco.rua || endereco.numero || endereco.complemento;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Montar a mensagem
    let mensagem = "Olá, gostaria de solicitar um orçamento.\n\n";

    if (formData.nome) {
      mensagem += `👤 Nome: ${formData.nome}\n`;
    }
    if (formData.telefone) {
      mensagem += `📞 WhatsApp: ${formData.telefone}\n`;
    }
    if (formData.email) {
      mensagem += `📧 E-mail: ${formData.email}\n`;
    }
    if (formData.tipoCliente) {
      mensagem += `🏷️ Tipo de cliente: ${getTipoClienteLabel(formData.tipoCliente)}\n`;
    }
    if (formData.tipoEntrega) {
      mensagem += `🚚 Preferência de entrega: ${getTipoEntregaLabel(formData.tipoEntrega)}\n`;
    }

    // Incluir endereço apenas se tiver dados e for entrega
    if (formData.tipoEntrega === "entrega" && hasEnderecoData()) {
      mensagem += `\n📍 Endereço de entrega:\n`;
      if (endereco.cep) mensagem += `   CEP: ${endereco.cep}\n`;
      if (endereco.rua) mensagem += `   Rua: ${endereco.rua}\n`;
      if (endereco.numero) mensagem += `   Número: ${endereco.numero}\n`;
      if (endereco.complemento) mensagem += `   Complemento: ${endereco.complemento}\n`;
    }

    if (formData.mensagem) {
      mensagem += `\n📦 Lista de materiais / Mensagem:\n${formData.mensagem}\n`;
    }

    if (anexoUrl) {
      mensagem += `\n📎 Arquivo anexado: ${anexoUrl}`;
    } else if (anexo) {
      mensagem += `\n📎 Arquivo anexado: ${anexo.name} (anexo enviado no formulário)`;
    }

    mensagem += "\n\nObrigado!";

    // Gerar link do WhatsApp
    const whatsappNumber = "5521981691223";
    const encodedMessage = encodeURIComponent(mensagem);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp em nova aba
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Redirecionando para WhatsApp!",
      description: "Revise a mensagem e envie para nossa equipe.",
    });

    // Limpar formulário
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      tipoCliente: "",
      tipoEntrega: "",
      mensagem: "",
    });
    setEndereco({
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
    });
    setAnexo(null);
    setAnexoUrl(null);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadFileToStorage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage
      .from("orcamentos")
      .upload(filePath, file);

    if (error) {
      console.error("Erro no upload:", error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar o arquivo. Tente novamente.",
        variant: "destructive",
      });
      return null;
    }

    const { data: publicData } = supabase.storage
      .from("orcamentos")
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  };

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 10MB.",
        variant: "destructive",
      });
      return false;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Tipo de arquivo não permitido",
        description: "Apenas arquivos JPG, PNG, PDF e XLSX são permitidos.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) return;

    setAnexo(file);
    setUploading(true);

    const url = await uploadFileToStorage(file);
    if (url) {
      setAnexoUrl(url);
      toast({
        title: "Arquivo enviado!",
        description: "O arquivo foi anexado com sucesso.",
      });
    } else {
      setAnexo(null);
    }

    setUploading(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!validateFile(file)) return;

    setAnexo(file);
    setUploading(true);

    const url = await uploadFileToStorage(file);
    if (url) {
      setAnexoUrl(url);
      toast({
        title: "Arquivo enviado!",
        description: "O arquivo foi anexado com sucesso.",
      });
    } else {
      setAnexo(null);
    }

    setUploading(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const removeAnexo = () => {
    setAnexo(null);
    setAnexoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
                      <Label htmlFor="email">E-mail (opcional)</Label>
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

                  {/* Campos de endereço - visíveis apenas quando "Entrega no endereço" */}
                  {formData.tipoEntrega === "entrega" && (
                    <div className="space-y-4 rounded-lg border border-border bg-secondary/30 p-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Endereço de entrega (opcional)
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="cep">CEP</Label>
                          <div className="relative">
                            <Input
                              id="cep"
                              name="cep"
                              value={endereco.cep}
                              onChange={handleEnderecoChange}
                              placeholder="00000-000"
                              maxLength={9}
                            />
                            {loadingCep && (
                              <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="numero">Número</Label>
                          <Input
                            id="numero"
                            name="numero"
                            value={endereco.numero}
                            onChange={handleEnderecoChange}
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rua">Rua</Label>
                        <Input
                          id="rua"
                          name="rua"
                          value={endereco.rua}
                          onChange={handleEnderecoChange}
                          placeholder="Nome da rua"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complemento">Complemento</Label>
                        <Input
                          id="complemento"
                          name="complemento"
                          value={endereco.complemento}
                          onChange={handleEnderecoChange}
                          placeholder="Apto, bloco, referência..."
                        />
                      </div>
                    </div>
                  )}

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
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.xlsx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <div className="flex items-center justify-center rounded-lg border border-border bg-secondary/50 p-6">
                        <div className="flex items-center gap-3">
                          <Loader2 className="h-5 w-5 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">Enviando arquivo...</span>
                        </div>
                      </div>
                    ) : anexo ? (
                      <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
                        <div className="flex items-center gap-3">
                          <Upload className="h-5 w-5 text-primary" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{anexo.name}</span>
                            {anexoUrl && (
                              <span className="text-xs text-green-600">✓ Arquivo enviado</span>
                            )}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeAnexo}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="file-upload"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-6 transition-colors hover:border-primary/50"
                      >
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Arraste um arquivo ou clique para enviar
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG, PDF ou XLSX (máx. 10MB)
                          </p>
                        </div>
                      </label>
                    )}
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
