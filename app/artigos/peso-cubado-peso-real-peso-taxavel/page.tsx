import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { getArtigo } from "@/lib/artigos";

const SLUG = "peso-cubado-peso-real-peso-taxavel";
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
        Toda cotação de frete envolve três pesos diferentes — e confundi-los é o motivo número um de
        gente pagar mais caro do que precisava. Neste guia você vai entender, com exemplos, o que são
        o <strong>peso real</strong>, o <strong>peso cubado</strong> e o <strong>peso taxável</strong>,
        e por que é sempre o maior deles que entra na conta.
      </p>

      <h2>Peso real (ou peso físico)</h2>
      <p>
        É o mais intuitivo: é o que a <strong>balança marca</strong>. Se você coloca a encomenda
        embalada sobre a balança e ela acusa 4 kg, esse é o peso real. Simples assim.
      </p>
      <p>
        O problema é que o peso real, sozinho, não diz quanto espaço a encomenda ocupa. E espaço é
        exatamente o que falta em um caminhão ou na cabine de carga de um avião.
      </p>

      <h2>Peso cubado (ou peso volumétrico)</h2>
      <p>
        O peso cubado traduz o <strong>volume</strong> da encomenda em um valor de peso. A lógica das
        transportadoras é: uma caixa enorme e leve (pense em um travesseiro ou um abajur) ocupa o
        lugar de várias caixas pequenas e pesadas. Cobrar só pelo peso real seria prejuízo.
      </p>
      <p>
        Por isso elas calculam quanto aquele volume “pesaria” se fosse uma carga de densidade padrão.
        A fórmula muda conforme o modal:
      </p>
      <ul>
        <li>
          <strong>Correios e aéreo:</strong> (Comprimento × Largura × Altura em cm) ÷ 6000.
        </li>
        <li>
          <strong>Transportadora rodoviária:</strong> volume em m³ × fator (em geral 300 kg/m³).
        </li>
      </ul>
      <p>
        Veja os detalhes em{" "}
        <Link href="/artigos/como-calcular-cubagem-correios/">
          como calcular a cubagem dos Correios
        </Link>{" "}
        e em{" "}
        <Link href="/artigos/fator-de-cubagem-transportadora/">
          fator de cubagem em transportadora rodoviária
        </Link>
        .
      </p>

      <h2>Peso taxável: o que realmente importa</h2>
      <p>
        O <strong>peso taxável</strong> é o número que a transportadora usa para precificar o frete. A
        regra de ouro da logística é simples:
      </p>
      <p>
        <strong>Peso taxável = o maior valor entre o peso real e o peso cubado.</strong>
      </p>
      <p>
        Ou seja: se a sua carga é pesada e compacta, o peso real vence e é ele que você paga. Se é
        volumosa e leve, o peso cubado vence. Você nunca paga pelos dois somados — paga pelo maior.
      </p>

      <h3>Exemplo prático</h3>
      <p>
        Imagine uma caixa de <strong>50 × 40 × 30 cm</strong> com <strong>4 kg</strong> na balança,
        enviada pelos Correios:
      </p>
      <ul>
        <li>Peso real: 4 kg.</li>
        <li>Peso cubado: (50 × 40 × 30) ÷ 6000 = 60.000 ÷ 6000 = <strong>10 kg</strong>.</li>
        <li>Peso taxável: o maior entre 4 e 10 → <strong>10 kg</strong>.</li>
      </ul>
      <p>
        Mesmo a balança marcando 4 kg, você cota o frete como se fossem 10 kg. Se aumentar o peso real
        para, digamos, 12 kg sem mudar a caixa, aí o peso real passa a vencer e o taxável vira 12 kg.
      </p>

      <h2>Por que isso importa para você</h2>
      <p>
        Cotar o frete pelo peso errado gera dois problemas: ou você <strong>subestima o custo</strong>{" "}
        e tem prejuízo na venda, ou <strong>superestima</strong> e perde competitividade no preço
        final. Saber o peso taxável de antemão é o que permite precificar com segurança.
      </p>

      <h2>Resumo</h2>
      <ul>
        <li><strong>Peso real:</strong> o que a balança marca.</li>
        <li><strong>Peso cubado:</strong> o volume convertido em peso.</li>
        <li><strong>Peso taxável:</strong> o maior entre os dois — é o que você paga.</li>
      </ul>
      <p>
        Não quer fazer a conta na mão? A nossa{" "}
        <Link href="/">calculadora de cubagem</Link> mostra os três pesos de uma vez e destaca o
        taxável automaticamente.
      </p>
    </ArticleLayout>
  );
}
