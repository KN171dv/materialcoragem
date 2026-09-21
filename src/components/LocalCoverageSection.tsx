const neighborhoods = [
  "Campo Grande",
  "Mendanha",
  "Carobinha",
  "Bangu",
  "Santíssimo",
  "Cosmos",
  "Inhoaíba",
  "Senador Camará",
];

export const LocalCoverageSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Onde estamos
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Atendemos <span className="text-primary">Campo Grande, Mendanha e Carobinha</span>
          </h2>
        </div>

        {/* Text */}
        <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground md:text-lg">
          A Material de Construção Coragem atende o Mendanha, Campo Grande e a Carobinha há mais
          de 25 anos, com cimento, areia, tintas, material hidráulico e elétrico para obra e
          reforma. Faça seu orçamento pelo WhatsApp e receba em casa ou retire na loja, na Rua do
          Sulista, 803-805.
        </p>

        {/* Neighborhoods */}
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border bg-card p-6 md:p-8">
          <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-foreground">
            Bairros atendidos
          </h3>
          <p className="text-center text-sm leading-relaxed text-muted-foreground md:text-base">
            {neighborhoods.map((name, index) => (
              <span key={name}>
                {name}
                {index < neighborhoods.length - 1 && (
                  <span className="mx-2 text-primary">•</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};
