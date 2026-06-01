// Metadados dos artigos — fonte única usada pelo índice (/artigos),
// pelo layout de cada artigo (JSON-LD, "outros artigos") e pelo sitemap.
// O conteúdo (corpo) de cada artigo fica em app/artigos/<slug>/page.tsx.

export type Artigo = {
  slug: string;
  titulo: string;
  /** Meta description (<= ~155 caracteres). */
  descricao: string;
  /** Resumo exibido no card do índice. */
  resumo: string;
  /** Data de publicação no formato ISO (YYYY-MM-DD). */
  data: string;
  /** Data da última atualização (opcional). */
  dataAtualizacao?: string;
};

export const ARTIGOS: Artigo[] = [
  {
    slug: "peso-cubado-peso-real-peso-taxavel",
    titulo: "Peso cubado, peso real e peso taxável: qual é a diferença?",
    descricao:
      "Entenda de uma vez a diferença entre peso real, peso cubado e peso taxável — e por que o frete quase sempre é cobrado pelo maior deles.",
    resumo:
      "Os três pesos que aparecem em qualquer cotação de frete, explicados com exemplos práticos para você nunca mais pagar a mais.",
    data: "2026-06-01",
  },
  {
    slug: "como-calcular-cubagem-correios",
    titulo: "Como calcular a cubagem dos Correios (passo a passo)",
    descricao:
      "Aprenda a calcular o peso cubado dos Correios com o divisor 6000, com exemplos reais e os erros mais comuns que fazem você pagar frete a mais.",
    resumo:
      "O passo a passo do divisor 6000, com exemplos numéricos e as pegadinhas que mais confundem quem envia pelos Correios.",
    data: "2026-06-01",
  },
  {
    slug: "fator-de-cubagem-transportadora",
    titulo: "Fator de cubagem em transportadora rodoviária: tabela e como usar",
    descricao:
      "O que é o fator de cubagem (kg/m³), por que ele varia entre transportadoras (250, 300, 333) e como calcular o peso cubado rodoviário corretamente.",
    resumo:
      "Por que cada transportadora usa um fator diferente, a tabela dos valores mais comuns e como aplicar no cálculo rodoviário.",
    data: "2026-06-01",
  },
];

export function getArtigo(slug: string): Artigo | undefined {
  return ARTIGOS.find((a) => a.slug === slug);
}
