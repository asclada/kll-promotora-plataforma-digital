/**
 * Single source of truth for the NAP (name, address, phone) and every
 * outbound contact link. These values are confirmed by the client and must
 * stay byte-identical to the Google Business Profile.
 */

export const site = {
  name: "KLL Promotora",
  legalName: "KLL Promotora de Vendas",
  cnpj: "07.814.164/0001-00",
  url: "https://kllpromotora.com.br",
  tagline: "Correspondente bancário autorizado em Natal/RN",
  address: {
    street: "Rua Omar Medeiros, 946",
    district: "Alecrim",
    city: "Natal",
    state: "RN",
    country: "BR",
  },
  phones: [
    { label: "(84) 99467-9028", tel: "+5584994679028", whatsapp: "5584994679028" },
    { label: "(84) 99183-4548", tel: "+5584991834548", whatsapp: "5584991834548" },
  ],
  email: "contato@kllpromotora.com.br",
  hours: [
    { days: "Atendimento no WhatsApp", time: "Segunda a sexta, 09h às 17h" },
    {
      days: "Atendimento com nosso assistente virtual",
      time: "24 horas por dia, 7 dias por semana",
    },
  ],
  geo: { lat: -5.7835737, lng: -35.2059489 },
} as const;

export const primaryPhone = site.phones[0];

/**
 * Every lead in this project is a WhatsApp click — there is no backend.
 * `source` is carried as a UTM so the client can tell which surface
 * produced the conversation.
 */
export function whatsappLink(message: string, source: string): string {
  const text = `${message}\n\n— enviado pelo site kllpromotora.com.br`;
  const params = new URLSearchParams({
    phone: primaryPhone.whatsapp,
    text,
  });
  const utm = new URLSearchParams({
    utm_source: "site",
    utm_medium: "whatsapp",
    utm_campaign: source,
  });
  return `https://api.whatsapp.com/send?${params.toString()}&${utm.toString()}`;
}

export const fullAddress = `${site.address.street}, ${site.address.district}, ${site.address.city} – ${site.address.state}`;
