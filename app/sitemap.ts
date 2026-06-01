import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { ARTIGOS } from "@/lib/artigos";

// Gera /sitemap.xml no build estático.
export default function sitemap(): MetadataRoute.Sitemap {
  const artigos: MetadataRoute.Sitemap = ARTIGOS.map((a) => ({
    url: `${SITE_URL}/artigos/${a.slug}/`,
    lastModified: a.dataAtualizacao ?? a.data,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/artigos/`, changeFrequency: "monthly", priority: 0.7 },
    ...artigos,
    { url: `${SITE_URL}/sobre/`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contato/`, changeFrequency: "yearly", priority: 0.5 },
    {
      url: `${SITE_URL}/politica-de-privacidade/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
