interface BoxDiagramProps {
  comprimento: string;
  largura: string;
  altura: string;
}

/** Mostra o valor "50 cm" quando preenchido, senão o nome da dimensão. */
function rotulo(valor: string, nome: string): string {
  const limpo = valor.trim();
  const num = Number(limpo.replace(",", "."));
  return limpo && Number.isFinite(num) && num > 0 ? `${limpo} cm` : nome;
}

/**
 * Caixa em projeção isométrica com linhas de cota para Comprimento, Largura e
 * Altura. Puramente ilustrativa — não muda de tamanho com os valores.
 */
export default function BoxDiagram({ comprimento, largura, altura }: BoxDiagramProps) {
  return (
    <svg
      viewBox="0 0 260 215"
      className="mx-auto h-auto w-full max-w-[280px]"
      role="img"
      aria-label="Diagrama de uma caixa indicando comprimento, largura e altura"
    >
      <defs>
        <marker
          id="seta"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className="fill-slate-400" />
        </marker>
      </defs>

      {/* Faces da caixa */}
      {/* topo */}
      <polygon points="55,80 105,42 215,42 165,80" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.6" strokeLinejoin="round" />
      {/* lado direito */}
      <polygon points="165,80 215,42 215,132 165,170" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.6" strokeLinejoin="round" />
      {/* frente */}
      <polygon points="55,80 165,80 165,170 55,170" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.6" strokeLinejoin="round" />

      {/* Cotas (linhas de medida) */}
      <g stroke="#94a3b8" strokeWidth="1.1">
        {/* Altura — vertical à esquerda */}
        <line x1="55" y1="80" x2="40" y2="80" />
        <line x1="55" y1="170" x2="40" y2="170" />
        <line x1="42" y1="80" x2="42" y2="170" markerStart="url(#seta)" markerEnd="url(#seta)" />

        {/* Largura — horizontal embaixo */}
        <line x1="55" y1="170" x2="55" y2="190" />
        <line x1="165" y1="170" x2="165" y2="190" />
        <line x1="55" y1="188" x2="165" y2="188" markerStart="url(#seta)" markerEnd="url(#seta)" />

        {/* Comprimento — profundidade (diagonal, canto superior direito) */}
        <line x1="165" y1="80" x2="180" y2="71" />
        <line x1="215" y1="42" x2="230" y2="33" />
        <line x1="180" y1="71" x2="230" y2="33" markerStart="url(#seta)" markerEnd="url(#seta)" />
      </g>

      {/* Rótulos */}
      <g className="fill-slate-600" fontSize="11" fontWeight={600}>
        <text x="30" y="125" textAnchor="middle" transform="rotate(-90 30 125)">
          {rotulo(altura, "Altura")}
        </text>
        <text x="110" y="205" textAnchor="middle">
          {rotulo(largura, "Largura")}
        </text>
        <text x="205" y="48" textAnchor="middle" transform="rotate(-37 205 48)">
          {rotulo(comprimento, "Comprimento")}
        </text>
      </g>
    </svg>
  );
}
