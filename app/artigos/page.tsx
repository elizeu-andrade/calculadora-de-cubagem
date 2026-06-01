import type { Metadata } from "next";
import Link from "next/link";
import { ARTIGOS } from "@/lib/artigos";

export const metadata: Metadata = {
  title: "Artigos sobre cubagem e frete | Calculadora de Cubagem",
  description:
    "Guias práticos sobre cubagem, peso taxável e cálculo de frete para Correios e transportadoras. Aprenda a não pagar frete a mais.",
  alternates: { canonical: "/artigos/" },
};

export default function Artigos() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <Link href="/" className="text-sm text-brand-600 hover:underline">
        ← Voltar para a calculadora
      </Link>

      <header className="mt-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Artigos sobre cubagem e frete
        </h1>
        <p className="text-slate-600">
          Guias diretos ao ponto para você entender como o frete é calculado e parar de pagar a mais.
        </p>
      </header>

      <ul className="mt-8 space-y-4">
        {ARTIGOS.map((artigo) => (
          <li key={artigo.slug}>
            <Link
              href={`/artigos/${artigo.slug}/`}
              className="block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-200 hover:shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-800">{artigo.titulo}</h2>
              <p className="mt-1 text-sm text-slate-600">{artigo.resumo}</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand-600">
                Ler artigo →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
