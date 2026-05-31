import { describe, it, expect } from "vitest";
import {
  calcularPesoCubado,
  calcularPesoTaxavel,
  calcularVolumeM3,
  DIVISOR_PADRAO,
  FATOR_PADRAO,
} from "@/lib/cubage";

describe("calcularPesoCubado", () => {
  it("Correios: caixa 50×40×30 cm com divisor 6000 = 10 kg", () => {
    const peso = calcularPesoCubado({
      comprimento: 50,
      largura: 40,
      altura: 30,
      modo: "correios",
      valor: DIVISOR_PADRAO,
    });
    expect(peso).toBeCloseTo(10, 5);
  });

  it("Rodoviário: caixa 50×40×30 cm com fator 300 = 18 kg", () => {
    const peso = calcularPesoCubado({
      comprimento: 50,
      largura: 40,
      altura: 30,
      modo: "rodoviario",
      valor: FATOR_PADRAO,
    });
    expect(peso).toBeCloseTo(18, 5);
  });

  it("retorna 0 quando alguma medida é inválida", () => {
    expect(
      calcularPesoCubado({ comprimento: 0, largura: 40, altura: 30, modo: "correios", valor: 6000 })
    ).toBe(0);
    expect(
      calcularPesoCubado({ comprimento: NaN, largura: 40, altura: 30, modo: "correios", valor: 6000 })
    ).toBe(0);
  });

  it("retorna 0 quando o divisor/fator é inválido", () => {
    expect(
      calcularPesoCubado({ comprimento: 50, largura: 40, altura: 30, modo: "correios", valor: 0 })
    ).toBe(0);
  });

  it("respeita divisor/fator customizado", () => {
    const peso = calcularPesoCubado({
      comprimento: 50,
      largura: 40,
      altura: 30,
      modo: "correios",
      valor: 5000,
    });
    expect(peso).toBeCloseTo(12, 5);
  });
});

describe("calcularVolumeM3", () => {
  it("converte cm³ para m³", () => {
    expect(calcularVolumeM3(50, 40, 30)).toBeCloseTo(0.06, 5);
  });
});

describe("calcularPesoTaxavel", () => {
  it("usa o peso cubado quando ele é maior", () => {
    expect(calcularPesoTaxavel(2, 5)).toBe(5);
  });

  it("usa o peso físico quando ele é maior", () => {
    expect(calcularPesoTaxavel(8, 5)).toBe(8);
  });

  it("ignora valores inválidos", () => {
    expect(calcularPesoTaxavel(NaN, 5)).toBe(5);
    expect(calcularPesoTaxavel(-3, 0)).toBe(0);
  });
});
