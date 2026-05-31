import type { Modo } from "@/lib/cubage";
import { BoxIcon, CheckIcon, ScaleIcon } from "@/components/icons";

interface ResultCardProps {
  pesoFisico: number;
  pesoCubado: number;
  pesoTaxavel: number;
  modo: Modo;
  preenchido: boolean;
}

function formatarKg(valor: number): string {
  return `${valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} kg`;
}

export default function ResultCard({
  pesoFisico,
  pesoCubado,
  pesoTaxavel,
  preenchido,
}: ResultCardProps) {
  if (!preenchido) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center text-sm text-slate-500">
        <BoxIcon className="h-8 w-8 text-slate-300" />
        Preencha as medidas e o peso da caixa para ver o peso taxável.
      </div>
    );
  }

  const cubadoVenceu = pesoCubado >= pesoFisico;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-2 gap-3">
        <Comparativo
          icone={<ScaleIcon className="h-4 w-4" />}
          rotulo="Peso físico"
          valor={formatarKg(pesoFisico)}
          destacado={!cubadoVenceu}
        />
        <Comparativo
          icone={<BoxIcon className="h-4 w-4" />}
          rotulo="Peso cubado"
          valor={formatarKg(pesoCubado)}
          destacado={cubadoVenceu}
        />
      </div>

      <div className="mt-4 flex items-center gap-4 rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 p-4 text-white shadow-lg shadow-brand-600/20">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/15">
          <CheckIcon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-sm font-medium opacity-90">Peso Taxável para o frete</p>
          <p className="text-3xl font-bold leading-tight">{formatarKg(pesoTaxavel)}</p>
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-slate-600">
        {cubadoVenceu ? (
          <>
            O <strong>peso cubado</strong> é maior que o físico — use{" "}
            <strong>{formatarKg(pesoTaxavel)}</strong> ao cotar o frete.
          </>
        ) : (
          <>
            O <strong>peso físico</strong> é maior que o cubado — use{" "}
            <strong>{formatarKg(pesoTaxavel)}</strong> ao cotar o frete.
          </>
        )}
      </p>
    </div>
  );
}

interface ComparativoProps {
  icone: React.ReactNode;
  rotulo: string;
  valor: string;
  destacado: boolean;
}

function Comparativo({ icone, rotulo, valor, destacado }: ComparativoProps) {
  return (
    <div
      className={`rounded-lg p-3 transition ${
        destacado ? "bg-brand-50 ring-1 ring-brand-500" : "bg-slate-50"
      }`}
    >
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
        <span className={destacado ? "text-brand-600" : "text-slate-400"}>{icone}</span>
        {rotulo}
      </p>
      <p className="mt-1 text-xl font-semibold text-slate-800">{valor}</p>
    </div>
  );
}
