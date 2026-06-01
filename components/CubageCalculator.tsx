"use client";

import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import {
  calcularPesoCubado,
  calcularPesoTaxavel,
  valorPadrao,
  type Modo,
} from "@/lib/cubage";
import ResultCard from "@/components/ResultCard";
import BoxDiagram from "@/components/BoxDiagram";
import { PackageIcon, TruckIcon } from "@/components/icons";

/** Converte texto do input para número, aceitando vírgula como separador decimal. */
function paraNumero(texto: string): number {
  if (!texto.trim()) return NaN;
  return Number(texto.replace(",", "."));
}

/**
 * Mantém apenas dígitos e um único separador decimal (vírgula ou ponto).
 * Remove letras, sinais e separadores extras enquanto o usuário digita.
 */
function somenteNumero(texto: string): string {
  let limpo = texto.replace(/[^\d.,]/g, "");
  // Permite no máximo um separador decimal — preserva o primeiro.
  const i = limpo.search(/[.,]/);
  if (i !== -1) {
    limpo = limpo.slice(0, i + 1) + limpo.slice(i + 1).replace(/[.,]/g, "");
  }
  return limpo;
}

const MODOS: {
  id: Modo;
  titulo: string;
  descricao: string;
  rotuloValor: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    id: "correios",
    titulo: "Correios / Aéreo",
    descricao: "Divisor padrão 6000, medidas em cm.",
    rotuloValor: "Divisor",
    Icon: PackageIcon,
  },
  {
    id: "rodoviario",
    titulo: "Transportadora Rodoviária",
    descricao: "Fator padrão 300 kg/m³.",
    rotuloValor: "Fator (kg/m³)",
    Icon: TruckIcon,
  },
];

export default function CubageCalculator() {
  const [comprimento, setComprimento] = useState("");
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [pesoFisico, setPesoFisico] = useState("");
  const [modo, setModo] = useState<Modo>("correios");
  const [valor, setValor] = useState(String(valorPadrao("correios")));

  function trocarModo(novo: Modo) {
    setModo(novo);
    setValor(String(valorPadrao(novo)));
  }

  const resultado = useMemo(() => {
    const c = paraNumero(comprimento);
    const l = paraNumero(largura);
    const a = paraNumero(altura);
    const pf = paraNumero(pesoFisico);
    const v = paraNumero(valor);

    const medidasOk = [c, l, a].every((n) => Number.isFinite(n) && n > 0);
    const preenchido = medidasOk && (Number.isFinite(pf) ? pf >= 0 : true);

    const pesoCubado = calcularPesoCubado({
      comprimento: c,
      largura: l,
      altura: a,
      modo,
      valor: v,
    });
    const pesoFisicoNum = Number.isFinite(pf) ? pf : 0;
    const pesoTaxavel = calcularPesoTaxavel(pesoFisicoNum, pesoCubado);

    return { preenchido: medidasOk && preenchido, pesoCubado, pesoFisico: pesoFisicoNum, pesoTaxavel };
  }, [comprimento, largura, altura, pesoFisico, modo, valor]);

  const modoAtual = MODOS.find((m) => m.id === modo)!;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
      {/* Seleção de modo */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-semibold text-slate-700">Tipo de envio</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODOS.map((m) => {
            const ativo = modo === m.id;
            return (
              <label
                key={m.id}
                className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  ativo
                    ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                    : "border-slate-200 hover:border-brand-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="modo"
                  value={m.id}
                  checked={ativo}
                  onChange={() => trocarModo(m.id)}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                    ativo ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <m.Icon className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="font-medium text-slate-800">{m.titulo}</span>
                  <span className="mt-0.5 text-xs text-slate-500">{m.descricao}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Medidas */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-slate-700">Medidas da caixa</legend>

        <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50/60 py-3">
          <BoxDiagram comprimento={comprimento} largura={largura} altura={altura} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Campo label="Comprimento" valor={comprimento} onChange={setComprimento} unidade="cm" />
          <Campo label="Largura" valor={largura} onChange={setLargura} unidade="cm" />
          <Campo label="Altura" valor={altura} onChange={setAltura} unidade="cm" />
        </div>
      </fieldset>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo label="Peso físico" valor={pesoFisico} onChange={setPesoFisico} unidade="kg" />
        <Campo
          label={modoAtual.rotuloValor}
          valor={valor}
          onChange={setValor}
          ajuda="Ajuste se a sua transportadora usa outro valor."
        />
      </div>

      <div className="mt-6">
        <ResultCard
          modo={modo}
          preenchido={resultado.preenchido}
          pesoFisico={resultado.pesoFisico}
          pesoCubado={resultado.pesoCubado}
          pesoTaxavel={resultado.pesoTaxavel}
        />
      </div>
    </section>
  );
}

interface CampoProps {
  label: string;
  valor: string;
  onChange: (v: string) => void;
  unidade?: string;
  ajuda?: string;
}

function Campo({ label, valor, onChange, unidade, ajuda }: CampoProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <span className="relative block">
        <input
          type="text"
          inputMode="decimal"
          value={valor}
          onChange={(e) => onChange(somenteNumero(e.target.value))}
          placeholder="0"
          className={`w-full rounded-lg border border-slate-300 py-2 pl-3 text-slate-800 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 ${
            unidade ? "pr-10" : "pr-3"
          }`}
        />
        {unidade ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-medium text-slate-400">
            {unidade}
          </span>
        ) : null}
      </span>
      {ajuda ? <span className="mt-1 block text-xs text-slate-400">{ajuda}</span> : null}
    </label>
  );
}
