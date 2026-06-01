import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre | Calculadora de Cubagem",
  description:
    "Conheça a Calculadora de Cubagem: uma ferramenta gratuita para calcular o peso taxável de fretes dos Correios, aéreo e transportadoras rodoviárias.",
  alternates: { canonical: "/sobre/" },
};

export default function Sobre() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <Link href="/" className="text-sm text-brand-600 hover:underline">
        ← Voltar para a calculadora
      </Link>

      <article className="mt-6 space-y-6 text-slate-700">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sobre a Calculadora de Cubagem</h1>

        <p>
          A <strong>Calculadora de Cubagem</strong> é uma ferramenta online, gratuita e sem cadastro,
          criada para ajudar quem envia encomendas a descobrir o <strong>peso taxável</strong> de uma
          carga — o valor que realmente importa na hora de cotar o frete.
        </p>

        <p>
          No transporte, cobra-se sempre pelo maior valor entre o <strong>peso físico</strong> (o que
          a balança marca) e o <strong>peso cubado</strong> (o espaço que a encomenda ocupa). Caixas
          grandes e leves costumam pagar pelo peso cubado, o que pega muita gente de surpresa. Nossa
          calculadora deixa esse número claro em segundos.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800">O que ela faz</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Calcula o peso cubado para <strong>Correios e modal aéreo</strong> (divisor padrão 6000).</li>
            <li>Calcula o peso cubado para <strong>transportadoras rodoviárias</strong> (fator padrão 300 kg/m³).</li>
            <li>Mostra o <strong>peso taxável</strong>, destacando se vence o peso físico ou o cubado.</li>
            <li>Permite editar o divisor e o fator, já que cada transportadora usa valores próprios.</li>
          </ul>
        </section>

        <p>
          Todo o cálculo acontece <strong>no seu próprio navegador</strong>: nenhuma medida ou peso é
          enviado a servidores. É uma ferramenta independente, feita para ser simples, rápida e
          confiável.
        </p>

        <p>
          Tem alguma sugestão ou encontrou um problema?{" "}
          <Link href="/contato/" className="text-brand-600 hover:underline">
            Fale com a gente
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
