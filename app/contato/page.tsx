import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato | Calculadora de Cubagem",
  description:
    "Fale com a Calculadora de Cubagem: envie dúvidas, sugestões ou relate problemas pelo nosso e-mail de contato.",
  alternates: { canonical: "/contato/" },
};

export default function Contato() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <Link href="/" className="text-sm text-brand-600 hover:underline">
        ← Voltar para a calculadora
      </Link>

      <article className="mt-6 space-y-6 text-slate-700">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Contato</h1>

        <p>
          Tem uma dúvida, sugestão de melhoria ou encontrou algum erro no cálculo? Vamos adorar ouvir
          você. É só enviar uma mensagem para o nosso e-mail:
        </p>

        <div className="rounded-lg border border-slate-200 bg-white p-5 text-center">
          <a
            href="mailto:contato@calculadoradecubagem.com.br"
            className="text-lg font-semibold text-brand-600 hover:underline"
          >
            contato@calculadoradecubagem.com.br
          </a>
        </div>

        <p className="text-sm text-slate-500">
          Respondemos sempre que possível. Como é um projeto independente, pode levar alguns dias —
          agradecemos a paciência.
        </p>
      </article>
    </main>
  );
}
