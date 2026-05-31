import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FAQ } from "@/components/SeoContent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const SITE_URL = "https://calcularcubagem.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Calculadora de Cubagem | Peso Taxável de Frete (Correios e Transportadora)",
  description:
    "Calcule o peso cubado e o peso taxável da sua encomenda grátis. Funciona para Correios, modal aéreo (divisor 6000) e transportadoras rodoviárias (fator 300 kg/m³).",
  keywords: [
    "calculadora de cubagem",
    "peso cubado",
    "peso taxável",
    "cubagem correios",
    "cubagem transportadora",
    "cálculo de frete",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Calculadora de Cubagem — Peso Taxável de Frete",
    description:
      "Descubra em segundos o peso taxável da sua carga para cotar o frete pelo valor certo.",
    url: SITE_URL,
    siteName: "Calculadora de Cubagem",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Calculadora de Cubagem",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.pergunta,
        acceptedAnswer: { "@type": "Answer", text: item.resposta },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
