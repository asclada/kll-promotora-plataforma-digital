import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import CtaBand from "@/components/ui/CtaBand";
import WhatsappGlyph from "@/components/ui/WhatsappGlyph";
import { services } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Serviços de Crédito Consignado em Natal",
  description:
    "Crédito consignado, portabilidade e cartão consignado em Natal/RN. Veja taxas, prazos e condições de cada modalidade e simule a sua pelo WhatsApp, de graça.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              { name: "Serviços", path: "/servicos" },
            ]),
          ),
        }}
      />

      <PageHeader
        title="Três formas de usar a sua margem"
        lead="Margem consignável é a parte do seu salário ou benefício que pode ser comprometida com desconto em folha. Estas são as três maneiras de usá-la."
        trail={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ]}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        {services.map((service) => (
          <section
            key={service.slug}
            aria-labelledby={`servico-${service.slug}`}
            className="grid gap-8 border-t border-rule-strong py-12 first:pt-0 first:border-t-0 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:gap-14 md:py-16"
          >
            <div>
              <h2
                id={`servico-${service.slug}`}
                className="font-display text-3xl font-black md:text-4xl"
              >
                {service.title}
              </h2>
              <p className="measure mt-4 text-xl font-semibold text-indigo">
                {service.outcome}
              </p>
              <p className="measure mt-4 text-lg text-ink-2">
                {service.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink(service.whatsapp, `servicos-${service.slug}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-mark bg-indigo px-6 font-display text-base font-semibold text-white no-underline transition-colors duration-150 hover:bg-indigo-deep"
                >
                  <WhatsappGlyph className="size-5 shrink-0" />
                  Simular {service.title.toLowerCase()}
                </a>
                <Link
                  href={`/servicos/${service.slug}`}
                  className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-mark border border-rule-strong px-6 font-display text-base font-semibold no-underline transition-colors duration-150 hover:border-indigo hover:bg-indigo-tint hover:text-indigo-deep"
                >
                  Ver detalhes
                  <ArrowRight
                    className="size-5 shrink-0 transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <dl className="self-start bg-paper-2 px-5 py-2 md:px-6">
              {service.conditions.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4 last:border-0"
                >
                  <dt className="text-base text-ink-2">{row.label}</dt>
                  <dd className="font-display text-base font-bold tabular-nums">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <CtaBand
        title="Não encontrou o que procurava?"
        lead="Temos outras soluções financeiras personalizadas. Conte sua necessidade e um consultor responde."
        message="Olá! Vim pela página de Serviços e gostaria de falar sobre uma necessidade específica."
        source="servicos"
      />
    </>
  );
}
