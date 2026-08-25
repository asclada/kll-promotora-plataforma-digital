import { site, fullAddress } from "./site";

/**
 * FinancialService is the most specific schema.org type available for a
 * correspondente bancário: it inherits everything LocalBusiness carries and
 * declares the sector without claiming the company is a Bank.
 */
export function financialServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${site.url}/#organizacao`,
    name: site.name,
    legalName: site.legalName,
    description:
      "Correspondente bancário autorizado em Natal/RN, especializado em crédito consignado para trabalhadores CLT, servidores públicos, aposentados e pensionistas do INSS e militares das Forças Armadas.",
    url: site.url,
    telephone: site.phones.map((p) => p.tel),
    email: site.email,
    taxID: site.cnpj,
    image: `${site.url}/kll-selo.png`,
    logo: `${site.url}/kll-selo.png`,
    priceRange: "$",
    currenciesAccepted: "BRL",
    areaServed: { "@type": "Country", name: "Brasil" },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: `${site.address.district}, ${site.address.city}`,
      addressRegion: site.address.state,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Crédito consignado",
      itemListElement: [
        "Crédito Consignado",
        "Portabilidade de Crédito",
        "Cartão Consignado",
      ].map((n) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: n },
      })),
    },
    disambiguatingDescription: `${site.name} atua como correspondente bancário nos termos da regulamentação do Banco Central do Brasil e não é uma instituição financeira. Endereço: ${fullAddress}.`,
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
