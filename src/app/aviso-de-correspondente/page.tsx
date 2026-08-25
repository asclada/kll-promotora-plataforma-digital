import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CtaBand from "@/components/ui/CtaBand";
import Stamp from "@/components/ui/Stamp";
import { LegalArticle, Clause } from "@/components/ui/LegalDocument";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de Correspondente Bancário",
  description:
    "A KLL Promotora atua como correspondente bancário autorizado, não é instituição financeira e intermedia propostas junto a bancos parceiros. Leia o aviso.",
  alternates: { canonical: "/aviso-de-correspondente" },
};

/* Legal text preserved from the client's live site. Wording may not be
   changed in meaning — only the typography around it. */
export default function AvisoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              {
                name: "Aviso de correspondente bancário",
                path: "/aviso-de-correspondente",
              },
            ]),
          ),
        }}
      />

      <PageHeader
        title="Aviso de Correspondente Bancário"
        lead="Informações importantes sobre a nossa atuação como correspondente. Leia antes de contratar qualquer operação."
        trail={[
          { name: "Início", path: "/" },
          {
            name: "Aviso de correspondente",
            path: "/aviso-de-correspondente",
          },
        ]}
      />

      <LegalArticle updatedAt="2026-08-25">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <Stamp className="w-28 shrink-0 -rotate-3" />
          <p className="text-xl leading-relaxed">
            A KLL Promotora, inscrita no CNPJ sob nº{" "}
            <span className="tabular-nums">{site.cnpj}</span>, atua como
            correspondente bancário autorizado, conforme regulamentação do Banco
            Central do Brasil.
          </p>
        </div>

        <Clause number={1} title="Natureza da atuação">
          <p>
            A empresa não é instituição financeira e não realiza operações de
            crédito diretamente. Nosso papel é intermediar propostas junto às
            instituições parceiras.
          </p>
        </Clause>

        <Clause number={2} title="Instituições parceiras">
          <p>
            Trabalhamos com bancos autorizados pelo Banco Central, que são os
            responsáveis finais pela análise e concessão de crédito.
          </p>
        </Clause>

        <Clause number={3} title="Transparência">
          <p>
            Todas as condições financeiras, taxas e encargos são informados
            antes da contratação e constam nos contratos emitidos pelas
            instituições financeiras.
          </p>
        </Clause>

        <Clause number={4} title="Atendimento">
          <p>
            Em caso de dúvidas ou solicitações, nossa equipe está disponível
            para prestar suporte completo durante todo o processo, pelos
            telefones{" "}
            {site.phones.map((phone, index) => (
              <span key={phone.tel}>
                {index > 0 && " e "}
                <a
                  href={`tel:${phone.tel}`}
                  className="text-indigo underline decoration-indigo/40 tabular-nums"
                >
                  {phone.label}
                </a>
              </span>
            ))}{" "}
            ou pelo e-mail{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-indigo underline decoration-indigo/40"
            >
              {site.email}
            </a>
            .
          </p>
        </Clause>
      </LegalArticle>

      <CtaBand
        title="Não encontrou o que procurava?"
        lead="Fale diretamente com um consultor e receba atendimento rápido e transparente."
        message="Olá! Li o aviso de correspondente bancário e gostaria de tirar uma dúvida."
        source="aviso-correspondente"
        secondary={{
          href: "/politica-privacidade",
          label: "Ler a política de privacidade",
        }}
      />
    </>
  );
}
