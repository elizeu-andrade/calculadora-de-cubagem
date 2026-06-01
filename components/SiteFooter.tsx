import Link from "next/link";
import { BoxIcon } from "@/components/icons";

const links = [
  { href: "/", label: "Calculadora" },
  { href: "/artigos/", label: "Artigos" },
  { href: "/sobre/", label: "Sobre" },
  { href: "/contato/", label: "Contato" },
  { href: "/politica-de-privacidade/", label: "Política de Privacidade" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/60">
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <p className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <BoxIcon className="h-4 w-4" />O cálculo é feito 100% no seu navegador — os dados da sua
          encomenda não são enviados nem armazenados.
        </p>

        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-slate-500 hover:text-brand-600">
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="mt-4 text-xs text-slate-400">
          © 2026 Calculadora de Cubagem. Ferramenta gratuita e independente.
        </p>
      </div>
    </footer>
  );
}
