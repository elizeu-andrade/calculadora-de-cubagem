import CubageCalculator from "@/components/CubageCalculator";
import SeoContent from "@/components/SeoContent";
import { BoxIcon } from "@/components/icons";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <header className="mb-8 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          100% grátis e sem cadastro
        </span>

        <div className="mb-4 flex justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
            <BoxIcon className="h-7 w-7" />
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Calculadora de Cubagem
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Descubra o <strong className="text-slate-800">peso taxável</strong> da sua encomenda em
          segundos e cote o frete pelo valor certo — Correios, aéreo ou transportadora rodoviária.
        </p>
      </header>

      <CubageCalculator />
      <SeoContent />
    </main>
  );
}
