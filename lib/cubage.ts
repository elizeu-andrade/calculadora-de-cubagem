// Lógica pura do cálculo de cubagem.
// Mantida separada da UI para ser reutilizável e fácil de testar.

export type Modo = "correios" | "rodoviario";

/** Divisor padrão dos Correios e do modal aéreo (medidas em cm). */
export const DIVISOR_PADRAO = 6000;

/** Fator de cubagem padrão das transportadoras rodoviárias (kg por m³). */
export const FATOR_PADRAO = 300;

export interface EntradaCubagem {
  /** Comprimento em centímetros. */
  comprimento: number;
  /** Largura em centímetros. */
  largura: number;
  /** Altura em centímetros. */
  altura: number;
  modo: Modo;
  /** Divisor (modo "correios") ou fator kg/m³ (modo "rodoviario"). */
  valor: number;
}

/** Valor padrão de divisor/fator para cada modo. */
export function valorPadrao(modo: Modo): number {
  return modo === "correios" ? DIVISOR_PADRAO : FATOR_PADRAO;
}

/** Volume da caixa em metros cúbicos, a partir das medidas em cm. */
export function calcularVolumeM3(comprimento: number, largura: number, altura: number): number {
  return (comprimento * largura * altura) / 1_000_000;
}

/**
 * Calcula o peso cubado (em kg).
 * - Correios/Aéreo: (C × L × A em cm) / divisor.
 * - Rodoviário: volume em m³ × fator.
 * Retorna 0 quando os dados são inválidos (campos vazios, zero ou negativos).
 */
export function calcularPesoCubado({ comprimento, largura, altura, modo, valor }: EntradaCubagem): number {
  const volumeCm3 = comprimento * largura * altura;

  if (!Number.isFinite(volumeCm3) || volumeCm3 <= 0) return 0;
  if (!Number.isFinite(valor) || valor <= 0) return 0;

  if (modo === "correios") {
    return volumeCm3 / valor;
  }
  return calcularVolumeM3(comprimento, largura, altura) * valor;
}

/** Peso taxável = o maior entre peso físico e peso cubado. */
export function calcularPesoTaxavel(pesoFisico: number, pesoCubado: number): number {
  const fisico = Number.isFinite(pesoFisico) && pesoFisico > 0 ? pesoFisico : 0;
  const cubado = Number.isFinite(pesoCubado) && pesoCubado > 0 ? pesoCubado : 0;
  return Math.max(fisico, cubado);
}
