import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | Calculadora de Cubagem",
  description:
    "Como a Calculadora de Cubagem trata seus dados: cálculo feito no navegador, uso de cookies, publicidade do Google e seus direitos sob a LGPD.",
  alternates: { canonical: "/politica-de-privacidade/" },
};

export default function PoliticaDePrivacidade() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <Link href="/" className="text-sm text-brand-600 hover:underline">
        ← Voltar para a calculadora
      </Link>

      <article className="mt-6 space-y-8 text-slate-700">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Política de Privacidade</h1>
          <p className="text-sm text-slate-500">Última atualização: 1 de junho de 2026.</p>
        </header>

        <section className="space-y-3">
          <p>
            Esta Política de Privacidade explica como o site{" "}
            <strong>Calculadora de Cubagem</strong> (
            <a href="https://www.calculadoradecubagem.com.br" className="text-brand-600 hover:underline">
              calculadoradecubagem.com.br
            </a>
            ) trata as informações dos visitantes. Ao usar o site, você concorda com as práticas
            descritas abaixo.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800">1. Dados que você digita na calculadora</h2>
          <p>
            As medidas e os pesos que você informa (comprimento, largura, altura, peso e divisor/fator)
            são processados <strong>inteiramente no seu navegador</strong>. Esses valores{" "}
            <strong>não são enviados, coletados nem armazenados</strong> em nossos servidores — o
            cálculo é feito localmente, no seu dispositivo.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800">2. Dados de navegação e cookies</h2>
          <p>
            Como a maioria dos sites, podemos coletar informações técnicas automaticamente (endereço
            IP, tipo de navegador, páginas visitadas) por meio de cookies e tecnologias semelhantes,
            inclusive de serviços de terceiros descritos abaixo. Esses dados são usados de forma
            agregada para entender o uso do site e melhorá-lo.
          </p>
          <p>
            Você pode bloquear ou apagar cookies nas configurações do seu navegador. Note que isso
            pode afetar o funcionamento de algumas partes do site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800">3. Publicidade — Google AdSense</h2>
          <p>
            Este site pode exibir anúncios fornecidos pelo <strong>Google AdSense</strong>. O Google e
            seus parceiros utilizam cookies para veicular anúncios com base em visitas anteriores a
            este e a outros sites.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              O uso de cookies de publicidade permite ao Google e parceiros exibir anúncios mais
              relevantes para você.
            </li>
            <li>
              Você pode desativar a publicidade personalizada nas{" "}
              <a
                href="https://www.google.com/settings/ads"
                className="text-brand-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Configurações de anúncios do Google
              </a>
              .
            </li>
            <li>
              Saiba mais sobre como o Google usa dados em sites e aplicativos parceiros na página{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                className="text-brand-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Como o Google usa informações de sites que utilizam seus serviços
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800">4. Links para outros sites</h2>
          <p>
            O site pode conter links para páginas externas. Não nos responsabilizamos pelas práticas
            de privacidade desses sites — recomendamos ler as políticas de cada um.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800">5. Seus direitos (LGPD)</h2>
          <p>
            De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem o direito de
            solicitar acesso, correção ou exclusão dos seus dados pessoais eventualmente tratados.
            Para exercer esses direitos ou tirar dúvidas, entre em contato pelo e-mail{" "}
            <a href="mailto:contato@calculadoradecubagem.com.br" className="text-brand-600 hover:underline">
              contato@calculadoradecubagem.com.br
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-800">6. Alterações nesta política</h2>
          <p>
            Esta política pode ser atualizada a qualquer momento. Sempre que houver mudanças
            relevantes, a data de “última atualização” no topo será revisada.
          </p>
        </section>
      </article>
    </main>
  );
}
