import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Gera /sitemap.xml no build estático. Site de página única (a calculadora).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
