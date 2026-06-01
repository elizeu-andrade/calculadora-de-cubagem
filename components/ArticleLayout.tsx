import Link from "next/link";
import { ARTIGOS, getArtigo } from "@/lib/artigos";
import { SITE_URL } from "@/lib/seo";

function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ];
  return `${dia} de ${meses[mes - 1]} de ${ano}`;
}

export default function ArticleLayout({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const artigo = getArtigo(slug);
  if (!artigo) return null;

  const outros = ARTIGOS.filter((a) => a.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.titulo,
    description: artigo.descricao,
    datePublished: artigo.data,
    dateModified: artigo.dataAtualizacao ?? artigo.data,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: "Calculadora de Cubagem", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Calculadora de Cubagem", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/artigos/${artigo.slug}/`,
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-slate-500">
        <Link href="/" className="text-brand-600 hover:underline">
          Início
        </Link>{" "}
        <span className="text-slate-300">/</span>{" "}
        <Link href="/artigos/" className="text-brand-600 hover:underline">
          Artigos
        </Link>
      </nav>

      <header className="mt-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {artigo.titulo}
        </h1>
        <p className="text-sm text-slate-500">
          Publicado em {formatarData(artigo.data)}
          {artigo.dataAtualizacao ? ` · atualizado em ${formatarData(artigo.dataAtualizacao)}` : ""}
        </p>
      </header>

      <article className="mt-8 space-y-5 text-slate-700 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-800 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-800 [&_a]:text-brand-600 [&_a:hover]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:text-slate-800">
        {children}
      </article>

      <aside className="mt-10 rounded-xl border border-brand-100 bg-brand-50 p-5 text-center">
        <p className="font-semibold text-slate-800">Calcule agora o peso taxável da sua carga</p>
        <p className="mt-1 text-sm text-slate-600">
          Grátis, sem cadastro e direto no seu navegador.
        </p>
        <Link
          href="/"
          className="mt-3 inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Abrir a calculadora
        </Link>
      </aside>

      <section className="mt-10 border-t border-slate-200 pt-6">
        <h2 className="text-lg font-semibold text-slate-800">Outros artigos</h2>
        <ul className="mt-3 space-y-2">
          {outros.map((a) => (
            <li key={a.slug}>
              <Link href={`/artigos/${a.slug}/`} className="text-brand-600 hover:underline">
                {a.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
