export const FAQ = [
  {
    pergunta: "O que é cubagem?",
    resposta:
      "Cubagem é o cálculo do espaço (volume) que uma carga ocupa no transporte. Como uma caixa grande e leve ocupa muito espaço no caminhão ou no avião, as transportadoras cobram pelo peso cubado quando ele é maior que o peso real.",
  },
  {
    pergunta: "O que é peso taxável?",
    resposta:
      "É o maior valor entre o peso físico (balança) e o peso cubado. É esse peso que você deve informar ao cotar o frete, pois é o que a transportadora usa para precificar.",
  },
  {
    pergunta: "Como calcular a cubagem dos Correios?",
    resposta:
      "Multiplique comprimento × largura × altura (em centímetros) e divida por 6000. O resultado é o peso cubado em quilos. Esse divisor também é o padrão do modal aéreo.",
  },
  {
    pergunta: "Como funciona a cubagem em transportadoras rodoviárias?",
    resposta:
      "O mercado usa um fator de cubagem de 300 kg por metro cúbico. Converta as medidas para metros, calcule o volume em m³ e multiplique por 300. Algumas transportadoras usam fatores diferentes (250, 333 etc.), por isso o campo é editável.",
  },
  {
    pergunta: "Por que o divisor e o fator são editáveis?",
    resposta:
      "Porque cada transportadora pode adotar valores próprios. Ajuste o divisor (Correios/aéreo) ou o fator kg/m³ (rodoviário) conforme a tabela do seu transportador para um resultado exato.",
  },
];

export default function SeoContent() {
  return (
    <article className="mt-12 space-y-10 text-slate-700">
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-slate-800">Como calcular a cubagem da sua carga</h2>
        <p>
          A cubagem serve para as transportadoras saberem quanto espaço uma encomenda ocupa, mesmo
          quando ela é leve. A regra de ouro da logística é simples: <strong>cobra-se sempre pelo
          maior valor entre o peso físico e o peso cubado</strong>. Esse vencedor é o chamado{" "}
          <strong>peso taxável</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-800">Correios e modal aéreo</h3>
        <p>Geralmente o divisor padrão é 6000 e as medidas ficam em centímetros:</p>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          Peso Cubado = (Comprimento × Largura × Altura) ÷ 6000
        </pre>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-800">Transportadoras rodoviárias</h3>
        <p>
          O mercado usa um fator de cubagem padrão de 300 kg por metro cúbico. As medidas precisam
          estar em metros antes de multiplicar:
        </p>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
          Peso Cubado = (Comprimento × Largura × Altura em metros) × 300
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Perguntas frequentes</h2>
        <dl className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.pergunta} className="rounded-lg border border-slate-200 bg-white p-4">
              <dt className="font-semibold text-slate-800">{item.pergunta}</dt>
              <dd className="mt-1 text-sm text-slate-600">{item.resposta}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
