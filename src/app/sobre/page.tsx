import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import Stamp from "@/components/ui/Stamp";
import { breadcrumbJsonLd } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre a KLL — Correspondente em Natal RN",
  description:
    "Empresa familiar de Natal/RN, correspondente bancário há mais de 20 anos e mais de 5 mil clientes atendidos. Conheça a KLL Promotora e fale com um consultor.",
  alternates: { canonical: "/sobre" },
};

const reasons = [
  { strong: "20+ anos de experiência", rest: "no mercado financeiro" },
  { strong: "Especialização comprovada", rest: "em crédito consignado" },
  { strong: "Parcerias com os principais bancos", rest: "do país" },
  { strong: "Processo 100% digital", rest: "e transparente" },
  { strong: "Atendimento humanizado", rest: "e personalizado" },
  { strong: "Melhores taxas", rest: "do mercado para cada perfil" },
];

const facts = [
  { label: "Razão social", value: site.legalName },
  { label: "CNPJ", value: site.cnpj },
  { label: "Endereço", value: fullAddress },
  { label: "Atuação", value: "Correspondente bancário" },
  { label: "Tempo de mercado", value: "Mais de 20 anos" },
  { label: "Clientes atendidos", value: "Mais de 5 mil" },
];

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              { name: "Sobre nós", path: "/sobre" },
            ]),
          ),
        }}
      />

      <PageHeader
        title="Uma promotora pequena, que atende do jeito antigo"
        lead="A KLL Promotora é uma empresa familiar de Natal. Somos poucos de propósito: quem começa o seu atendimento é quem termina."
        trail={[
          { name: "Início", path: "/" },
          { name: "Sobre nós", path: "/sobre" },
        ]}
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <div>
            <SectionHeading>Quem somos</SectionHeading>
            <div className="measure mt-6 space-y-5 text-lg text-ink-2">
              <p>
                A KLL Promotora é especializada em soluções financeiras para
                trabalhadores CLT, servidores públicos federais, estaduais e
                municipais (SIAPE), militares das Forças Armadas e beneficiários
                do INSS. Atuamos há mais de 20 anos no mercado, oferecendo
                atendimento transparente, personalizado e com foco nas melhores
                condições de crédito.
              </p>
              <p>
                Trabalhamos com os principais bancos do país para garantir taxas
                reduzidas, processos ágeis e total segurança em cada etapa.
                Nosso compromisso é facilitar o acesso ao crédito de forma
                responsável, clara e sem burocracia.
              </p>
            </div>

            <h3 className="mt-12 border-b border-rule-strong pb-4 font-display text-2xl font-black">
              O que nos diferencia
            </h3>
            <ul className="mt-1">
              {reasons.map((reason) => (
                <li
                  key={reason.strong}
                  className="flex items-start gap-3.5 border-b border-rule py-4 text-lg"
                >
                  <Check
                    className="mt-1 size-5 shrink-0 text-indigo"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold">{reason.strong}</strong>{" "}
                    <span className="text-ink-2">{reason.rest}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
                alt="Duas pessoas sentadas à mesa conferindo papéis e anotações ao lado de notebooks."
                fill
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="border-b border-rule-strong pb-3 font-display text-2xs font-semibold tracking-[0.14em] text-ink-2 uppercase">
                Dados da empresa
              </h3>
              <dl className="text-base">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-rule py-3"
                  >
                    <dt className="text-ink-2">{fact.label}</dt>
                    <dd className="font-semibold tabular-nums">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Stamp className="w-32 -rotate-3" />
          </div>
        </div>
      </section>

      <CtaBand
        title="Quer falar com a gente antes de decidir?"
        lead="Você pode perguntar o que quiser sem contratar nada. É assim que preferimos começar."
        message="Olá! Vim pela página Sobre e gostaria de conhecer melhor a KLL."
        source="sobre"
      />
    </>
  );
}
