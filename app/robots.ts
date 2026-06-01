import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Gera /robots.txt no build estático: libera tudo e aponta o sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
