import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";
import MapEmbed from "@/components/ui/MapEmbed";
import WhatsappGlyph from "@/components/ui/WhatsappGlyph";
import { breadcrumbJsonLd } from "@/lib/seo";
import { fullAddress, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato — Consignado em Natal RN",
  description:
    "Fale com a KLL Promotora: (84) 99467-9028, contato@kllpromotora.com.br, Rua Omar Medeiros 946, Alecrim, Natal/RN. Atendimento de segunda-feira a sábado.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              { name: "Contato", path: "/contato" },
            ]),
          ),
        }}
      />

      <PageHeader
        title="Fale com um consultor de verdade"
        lead="Você fala com uma pessoa, não com um robô de call center. Escolha o canal que preferir — respondemos dentro do horário de atendimento."
        trail={[
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ]}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <section aria-labelledby="formulario-titulo">
            <SectionHeading
              id="formulario-titulo"
              lead="Preencha os dados e o WhatsApp abre com a mensagem já escrita. Nada é salvo neste site."
            >
              Envie uma mensagem
            </SectionHeading>
            <div className="mt-8">
              <ContactForm />
            </div>
          </section>

          <aside className="space-y-10">
            <div>
              <h2 className="border-b border-rule-strong pb-3 font-display text-2xs font-semibold tracking-[0.14em] text-ink-2 uppercase">
                Onde estamos
              </h2>
              <address className="space-y-1 border-b border-rule py-5 text-lg not-italic">
                <p className="flex gap-3">
                  <MapPin
                    className="mt-1 size-5 shrink-0 text-indigo"
                    aria-hidden="true"
                  />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.district}
                    <br />
                    {site.address.city} – {site.address.state}
                  </span>
                </p>
              </address>

              <div className="border-b border-rule py-5">
                <p className="flex gap-3">
                  <Phone
                    className="mt-1 size-5 shrink-0 text-indigo"
                    aria-hidden="true"
                  />
                  <span className="flex flex-col gap-1 text-lg">
                    {site.phones.map((phone) => (
                      <a
                        key={phone.tel}
                        href={`tel:${phone.tel}`}
                        className="font-semibold tabular-nums underline decoration-ink/20 hover:text-indigo"
                      >
                        {phone.label}
                      </a>
                    ))}
                  </span>
                </p>
              </div>

              <div className="border-b border-rule py-5">
                <p className="flex gap-3">
                  <Mail
                    className="mt-1 size-5 shrink-0 text-indigo"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lg break-all underline decoration-ink/20 hover:text-indigo"
                  >
                    {site.email}
                  </a>
                </p>
              </div>

              <div className="border-b border-rule py-5">
                <p className="flex gap-3">
                  <Clock
                    className="mt-1 size-5 shrink-0 text-indigo"
                    aria-hidden="true"
                  />
                  <span className="text-lg">
                    {site.hours.map((hour) => (
                      <span key={hour.days} className="block">
                        {hour.days}:{" "}
                        <strong className="font-semibold tabular-nums">
                          {hour.time}
                        </strong>
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            </div>

            <a
              href={whatsappLink(
                "Olá! Vim pela página de Contato do site e gostaria de falar com um consultor.",
                "contato-lateral",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 w-full items-center justify-center gap-3 rounded-mark bg-selo px-6 font-display text-lg font-bold text-ink no-underline transition-colors duration-150 hover:bg-selo-deep"
            >
              <WhatsappGlyph className="size-6 shrink-0" />
              Abrir o WhatsApp
            </a>
          </aside>
        </div>
      </div>

      <section
        aria-labelledby="localizacao-titulo"
        className="border-t border-rule bg-paper-2"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 md:py-16">
          <SectionHeading
            id="localizacao-titulo"
            lead={`Estamos no ${site.address.district}, em ${site.address.city}. ${fullAddress}.`}
          >
            Localização
          </SectionHeading>
          <div className="mt-8">
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
