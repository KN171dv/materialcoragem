import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5521981691223";
const DEFAULT_MESSAGE = "Olá! Gostaria de fazer um orçamento.";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export const WhatsAppButton = ({ message = DEFAULT_MESSAGE, className = "" }: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:h-16 md:w-16 ${className}`}
      aria-label="Chamar no WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" fill="currentColor" />
    </button>
  );
};
