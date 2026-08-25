import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import LgpdNotice from "@/components/ui/LgpdNotice";
import { documents, steps } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Como Funciona o Consignado em Natal RN",
  description:
    "Da solicitação à liberação em quatro etapas: veja quem faz o quê, quais documentos enviar e em quanto tempo o dinheiro cai na conta. Tire dúvidas com a KLL.",
  alternates: { canonical: "/como-funciona" },
};

/** Only the "não" list below is a promise; every item on it is a company
 *  practice the client confirmed, never a claim about the banks. */
const neverDoes = [
  "Não cobramos nenhuma taxa antes da liberação do crédito. Nenhuma, em nenhuma etapa.",
  "Não somos banco e não aprovamos crédito — quem analisa e concede é a instituição financeira parceira.",
  "Não fechamos contrato por você: a proposta só segue depois que você lê as condições e concorda.",
];

export default function ComoFuncionaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              { name: "Como funciona", path: "/como-funciona" },
            ]),
          ),
        }}
      />

      <PageHeader
        title="Quatro etapas, e você decide em duas delas"
        lead="O processo é digital e você pode parar em qualquer ponto. Abaixo está quem faz o quê, para não haver surpresa nenhuma."
        trail={[
          { name: "Início", path: "/" },
          { name: "Como funciona", path: "/como-funciona" },
        ]}
      />

      <section
        aria-labelledby="etapas-titulo"
        className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24"
      >
        <SectionHeading id="etapas-titulo">O passo a passo</SectionHeading>

        <ol className="mt-2">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-x-6 gap-y-2 border-b border-rule-strong py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)_9rem] md:py-9"
            >
              <span
                aria-hidden="true"
                className="font-display text-3xl leading-none font-black text-indigo tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold md:text-2xl">
                  <span className="sr-only">Etapa {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="measure mt-2 text-lg text-ink-2">
                  {step.description}
                </p>
              </div>
              <p className="text-sm sm:text-right">
                <span className="block font-display text-2xs font-semibold tracking-[0.14em] text-ink-3 uppercase">
                  Quem faz
                </span>
                <span className="font-semibold">{step.who}</span>
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="margem-titulo"
        className="border-y border-rule bg-paper-2"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <SectionHeading id="margem-titulo">
            O que é margem consignável
          </SectionHeading>
          <div className="measure mt-6 space-y-5 text-lg text-ink-2">
            <p>
              Margem consignável é a parte do seu salário, provento ou benefício
              que pode ser comprometida com descontos em folha. É ela que define
              o valor máximo da sua parcela — e, por consequência, quanto crédito
              você consegue tomar.
            </p>
            <p>
              O percentual da margem varia conforme o seu órgão, convênio ou tipo
              de benefício, e é isso que conferimos no seu contracheque ou
              extrato de consignações antes de indicar qualquer proposta. O{" "}
              <Link
                href="/servicos/cartao-consignado"
                className="text-indigo underline decoration-indigo/40"
              >
                cartão consignado
              </Link>{" "}
              usa uma margem adicional de{" "}
              <strong className="font-semibold text-ink tabular-nums">5%</strong>
              , separada da margem do empréstimo.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
        <section aria-labelledby="documentos-titulo">
          <h2
            id="documentos-titulo"
            className="flex items-center gap-3 border-b border-rule-strong pb-4 font-display text-2xl font-black"
          >
            <FileText className="size-6 shrink-0 text-indigo" aria-hidden="true" />
            Documentação necessária
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
          <p className="mt-5 text-base text-ink-3">
            Fotografias legíveis pelo celular são suficientes. Você envia no
            mesmo WhatsApp em que estiver falando com o consultor.
          </p>
        </section>

        <section aria-labelledby="nunca-titulo">
          <h2
            id="nunca-titulo"
            className="flex items-center gap-3 border-b border-rule-strong pb-4 font-display text-2xl font-black"
          >
            <ShieldAlert
              className="size-6 shrink-0 text-indigo"
              aria-hidden="true"
            />
            O que a KLL nunca faz
          </h2>
          <ul className="mt-1">
            {neverDoes.map((item) => (
              <li
                key={item}
                className="border-b border-rule py-4 text-lg text-ink-2"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-base text-ink-3">
            Desconfie de qualquer pessoa que peça depósito antecipado em nome da
            KLL. Na dúvida, ligue para os nossos números e confirme.
          </p>
        </section>

        <LgpdNotice className="lg:col-span-2" />
      </div>

      <CtaBand
        title="Pronto para começar?"
        lead="Mande uma mensagem e um consultor conduz você pelas quatro etapas."
        message="Olá! Li o passo a passo no site e quero iniciar minha solicitação."
        source="como-funciona"
        secondary={{
          href: "/perguntas-frequentes",
          label: "Ler as perguntas frequentes",
        }}
      />
    </>
  );
}
