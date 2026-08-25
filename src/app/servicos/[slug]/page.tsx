import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import CtaBand from "@/components/ui/CtaBand";
import LgpdNotice from "@/components/ui/LgpdNotice";
import WhatsappGlyph from "@/components/ui/WhatsappGlyph";
import { documents, services, segments } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/servicos/${service.slug}` },
  };
}

export default async function ServicoPage({ params }: Params) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            serviceType: service.title,
            areaServed: { "@type": "Country", name: "Brasil" },
            provider: { "@id": `${site.url}/#organizacao` },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              { name: "Serviços", path: "/servicos" },
              { name: service.title, path: `/servicos/${service.slug}` },
            ]),
          ),
        }}
      />

      <PageHeader
        title={service.title}
        lead={service.outcome}
        trail={[
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: service.title, path: `/servicos/${service.slug}` },
        ]}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
          <div>
            <p className="measure text-xl leading-relaxed">
              {service.description}
            </p>

            <h2 className="mt-12 border-b border-rule-strong pb-4 font-display text-2xl font-black">
              O que você leva
            </h2>
            <ul className="mt-1">
              {service.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3.5 border-b border-rule py-4 text-lg"
                >
                  <Check
                    className="mt-1 size-5 shrink-0 text-indigo"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 border-b border-rule-strong pb-4 font-display text-2xl font-black">
              Quem pode contratar
            </h2>
            <ul className="mt-1">
              {segments.map((segment) => (
                <li
                  key={segment.slug}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4"
                >
                  <span className="text-lg font-semibold">{segment.name}</span>
                  <span className="text-base text-ink-2">
                    {segment.qualifier}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 border-b border-rule-strong pb-4 font-display text-2xl font-black">
              Documentos necessários
            </h2>
            <ul className="mt-1">
              {documents.map((document) => (
                <li
                  key={document}
                  className="border-b border-rule py-4 text-lg text-ink-2"
                >
                  {document}
                </li>
              ))}
            </ul>

            <LgpdNotice className="mt-12" />
          </div>

          <aside className="space-y-10 lg:sticky lg:top-40 lg:self-start">
            <div>
              <h2 className="border-b border-rule-strong pb-3 font-display text-2xs font-semibold tracking-[0.14em] text-ink-2 uppercase">
                Condições
              </h2>
              <dl className="bg-paper-2 px-5 py-2">
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
              <p className="mt-3 text-sm text-ink-3">
                Condições sujeitas à análise do banco parceiro e ao seu perfil.
                Os valores finais constam no contrato emitido pela instituição
                financeira.
              </p>
            </div>

            <a
              href={whatsappLink(service.whatsapp, `servico-${service.slug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 w-full items-center justify-center gap-3 rounded-mark bg-selo px-6 font-display text-lg font-bold text-ink no-underline transition-colors duration-150 hover:bg-selo-deep"
            >
              <WhatsappGlyph className="size-6 shrink-0" />
              Simular agora
            </a>

            <div>
              <h2 className="border-b border-rule-strong pb-3 font-display text-2xs font-semibold tracking-[0.14em] text-ink-2 uppercase">
                Outras modalidades
              </h2>
              <ul>
                {others.map((other) => (
                  <li key={other.slug} className="border-b border-rule">
                    <Link
                      href={`/servicos/${other.slug}`}
                      className="group flex min-h-14 items-center justify-between gap-3 text-base font-semibold no-underline hover:text-indigo"
                    >
                      {other.title}
                      <ArrowRight
                        className="size-5 shrink-0 text-indigo transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <CtaBand
        title={`Quer saber quanto sai o seu ${service.title.toLowerCase()}?`}
        lead="A simulação é gratuita, leva poucos minutos e não compromete nada."
        message={service.whatsapp}
        source={`servico-${service.slug}-rodape`}
        secondary={{ href: "/como-funciona", label: "Ver como funciona" }}
      />
    </>
  );
}
