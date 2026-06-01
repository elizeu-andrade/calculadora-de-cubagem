import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Gera /sitemap.xml no build estático.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/sobre/`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contato/`, changeFrequency: "yearly", priority: 0.5 },
    {
      url: `${SITE_URL}/politica-de-privacidade/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
