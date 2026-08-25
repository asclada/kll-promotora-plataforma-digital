import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/servicos", priority: 0.9 },
    ...services.map((service) => ({
      path: `/servicos/${service.slug}`,
      priority: 0.8,
    })),
    { path: "/como-funciona", priority: 0.8 },
    { path: "/perguntas-frequentes", priority: 0.8 },
    { path: "/sobre", priority: 0.7 },
    { path: "/contato", priority: 0.7 },
    { path: "/aviso-de-correspondente", priority: 0.4 },
    { path: "/politica-privacidade", priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
