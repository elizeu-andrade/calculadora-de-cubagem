import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { getArtigo } from "@/lib/artigos";

const SLUG = "como-calcular-cubagem-correios";
const artigo = getArtigo(SLUG)!;

export const metadata: Metadata = {
  title: `${artigo.titulo} | Calculadora de Cubagem`,
  description: artigo.descricao,
  alternates: { canonical: `/artigos/${SLUG}/` },
};

export default function Page() {
  return (
    <ArticleLayout slug={SLUG}>
      <p>
        Se você envia encomendas pelos Correios, calcular a cubagem corretamente é o que separa um
        frete cotado com precisão de um prejuízo silencioso. Aqui vai o passo a passo do divisor{" "}
        <strong>6000</strong>, com exemplos e os erros mais comuns.
      </p>

      <h2>O que é a cubagem dos Correios</h2>
      <p>
        A cubagem converte o <strong>volume</strong> da sua caixa em um valor de peso, o{" "}
        <Link href="/artigos/peso-cubado-peso-real-peso-taxavel/">peso cubado</Link>. Os Correios (e o
        modal aéreo em geral) usam o divisor padrão <strong>6000</strong> sobre as medidas em
        centímetros.
      </p>

      <h2>A fórmula</h2>
      <p>Com as três medidas da caixa em centímetros:</p>
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        Peso Cubado (kg) = (Comprimento × Largura × Altura) ÷ 6000
      </pre>
      <p>
        O resultado já sai em quilos. Depois é só comparar com o peso da balança: o maior dos dois é o
        <strong> peso taxável</strong>, aquele que você usa para cotar.
      </p>

      <h2>Passo a passo</h2>
      <ol>
        <li>Meça <strong>comprimento, largura e altura</strong> da caixa já embalada, em centímetros.</li>
        <li>Multiplique os três valores para obter o volume em cm³.</li>
        <li>Divida o resultado por <strong>6000</strong>. Esse é o peso cubado em kg.</li>
        <li>Pese a encomenda na balança para obter o peso real.</li>
        <li>Compare: o <strong>maior</strong> entre peso real e peso cubado é o peso taxável.</li>
      </ol>

      <h2>Exemplo numérico</h2>
      <p>
        Caixa de <strong>50 × 40 × 30 cm</strong>, pesando <strong>4 kg</strong> na balança:
      </p>
      <ul>
        <li>Volume: 50 × 40 × 30 = 60.000 cm³.</li>
        <li>Peso cubado: 60.000 ÷ 6000 = <strong>10 kg</strong>.</li>
        <li>Peso real: 4 kg.</li>
        <li>Peso taxável: maior entre 10 e 4 = <strong>10 kg</strong>.</li>
      </ul>
      <p>
        Resultado: mesmo a balança marcando 4 kg, o frete é cobrado como 10 kg, porque a caixa é
        volumosa para o peso que tem.
      </p>

      <h2>Erros comuns que fazem você pagar a mais</h2>
      <ul>
        <li>
          <strong>Misturar unidades:</strong> a fórmula do divisor 6000 é em centímetros. Usar metros
          ou milímetros joga o resultado para qualquer lado.
        </li>
        <li>
          <strong>Medir o produto, não a embalagem:</strong> o que conta é a caixa final, com plástico
          bolha, enchimento e fita. Meça depois de embalar.
        </li>
        <li>
          <strong>Arredondar medidas para baixo:</strong> 41 cm não é 40 cm. Pequenas diferenças
          mudam o volume e podem alterar o peso taxável.
        </li>
        <li>
          <strong>Esquecer de comparar com o peso real:</strong> a cubagem só vence quando é maior que
          o peso da balança. Para cargas densas, o peso real é que vale.
        </li>
      </ul>

      <h2>E o divisor sempre é 6000?</h2>
      <p>
        6000 é o padrão dos Correios e do aéreo, mas <strong>algumas transportadoras usam divisores
        diferentes</strong> (5000, por exemplo, encarece o cubado). Por isso, na nossa{" "}
        <Link href="/">calculadora de cubagem</Link> o divisor é editável: confira na tabela do seu
        contrato qual valor se aplica. Para o modal rodoviário, a conta é outra — veja{" "}
        <Link href="/artigos/fator-de-cubagem-transportadora/">
          o fator de cubagem em transportadora rodoviária
        </Link>
        .
      </p>

      <h2>Calcule sem fazer conta</h2>
      <p>
        Para evitar erros, é só informar as medidas e o peso na{" "}
        <Link href="/">Calculadora de Cubagem</Link>: ela aplica o divisor, compara com o peso real e
        mostra o peso taxável na hora.
      </p>
    </ArticleLayout>
  );
}
