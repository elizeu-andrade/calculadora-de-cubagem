import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { getArtigo } from "@/lib/artigos";

const SLUG = "fator-de-cubagem-transportadora";
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
        No transporte rodoviário, a cubagem não usa o divisor 6000 dos Correios. Em vez disso, entra o
        chamado <strong>fator de cubagem</strong>, medido em <strong>kg/m³</strong>. Entender esse
        número é essencial para cotar frete de transportadora sem surpresas.
      </p>

      <h2>O que é o fator de cubagem</h2>
      <p>
        O fator de cubagem diz <strong>quantos quilos a transportadora considera para cada metro
        cúbico</strong> ocupado pela carga. O valor mais usado no mercado brasileiro é{" "}
        <strong>300 kg/m³</strong>, mas ele não é fixo: depende da política de cada empresa e do tipo
        de operação.
      </p>

      <h2>A fórmula do peso cubado rodoviário</h2>
      <p>
        Diferente dos Correios, aqui as medidas precisam estar em <strong>metros</strong>. O cálculo
        tem duas etapas:
      </p>
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
        Volume (m³) = Comprimento × Largura × Altura (em metros){"\n"}
        Peso Cubado (kg) = Volume (m³) × Fator (ex.: 300)
      </pre>
      <p>
        Se você só tem as medidas em centímetros, divida o volume em cm³ por 1.000.000 para chegar ao
        volume em m³.
      </p>

      <h2>Exemplo numérico</h2>
      <p>
        Caixa de <strong>50 × 40 × 30 cm</strong> (ou 0,5 × 0,4 × 0,3 m), com fator de 300 kg/m³:
      </p>
      <ul>
        <li>Volume: 0,5 × 0,4 × 0,3 = 0,06 m³.</li>
        <li>Peso cubado: 0,06 × 300 = <strong>18 kg</strong>.</li>
      </ul>
      <p>
        Repare que a mesma caixa que dava 10 kg pelos Correios (divisor 6000) dá{" "}
        <strong>18 kg</strong> no rodoviário com fator 300. Não é erro: são regras diferentes para
        modais diferentes.
      </p>

      <h2>Tabela de fatores mais comuns</h2>
      <ul>
        <li><strong>250 kg/m³:</strong> usado por algumas transportadoras; resulta em peso cubado menor.</li>
        <li><strong>300 kg/m³:</strong> o valor mais difundido no rodoviário nacional.</li>
        <li><strong>333 kg/m³:</strong> equivalente aproximado ao divisor 3 (1.000.000 ÷ 3.000); mais comum em cargas densas.</li>
      </ul>
      <p>
        Quanto <strong>maior</strong> o fator, maior o peso cubado e, portanto, mais caro tende a ser
        o frete da mesma caixa. Por isso vale sempre confirmar o valor na tabela do seu contrato.
      </p>

      <h2>Por que o fator varia entre transportadoras</h2>
      <p>
        Cada empresa define o fator de acordo com o perfil da frota, as rotas e o tipo de carga que
        costuma transportar. Não existe um número “oficial” único — 300 kg/m³ é apenas o mais comum.
        É por isso que, na nossa <Link href="/">calculadora de cubagem</Link>, o fator é{" "}
        <strong>editável</strong>: você ajusta para o valor exato do seu transportador.
      </p>

      <h2>Não esqueça do peso taxável</h2>
      <p>
        Calcular o peso cubado é só metade do caminho. O que você paga é o{" "}
        <Link href="/artigos/peso-cubado-peso-real-peso-taxavel/">peso taxável</Link>: o maior valor
        entre o peso cubado e o peso real da balança. Para uma carga densa, o peso real pode vencer
        mesmo no rodoviário.
      </p>

      <h2>Faça o cálculo automaticamente</h2>
      <p>
        Informe as medidas, o peso e o fator da sua transportadora na{" "}
        <Link href="/">Calculadora de Cubagem</Link> e veja o peso cubado e o taxável na hora — sem
        precisar converter unidades na mão.
      </p>
    </ArticleLayout>
  );
}
