import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CtaBand from "@/components/ui/CtaBand";
import { LegalArticle, Clause } from "@/components/ui/LegalDocument";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a KLL Promotora coleta, usa, compartilha e protege os seus dados pessoais, e como exercer os seus direitos de titular conforme a LGPD em Natal/RN.",
  alternates: { canonical: "/politica-privacidade" },
};

/* Legal text preserved from the client's live site. Wording may not be
   changed in meaning — only the typography around it. */
export default function PrivacidadePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              {
                name: "Política de privacidade",
                path: "/politica-privacidade",
              },
            ]),
          ),
        }}
      />

      <PageHeader
        title="Política de Privacidade"
        lead="Transparência e proteção dos seus dados são prioridades para a KLL Promotora."
        trail={[
          { name: "Início", path: "/" },
          { name: "Política de privacidade", path: "/politica-privacidade" },
        ]}
      />

      <LegalArticle updatedAt="2026-08-25">
        <p className="text-xl leading-relaxed">
          A KLL Promotora (CNPJ:{" "}
          <span className="tabular-nums">{site.cnpj}</span>) respeita sua
          privacidade e está comprometida com a proteção dos dados pessoais
          coletados em nosso site e canais de atendimento.
        </p>

        <Clause number={1} title="Coleta de informações">
          <p>
            Coletamos informações fornecidas voluntariamente pelos usuários como
            nome, telefone e dados necessários para simulação de crédito.
          </p>
        </Clause>

        <Clause number={2} title="Uso das informações">
          <p>
            Utilizamos os dados exclusivamente para contato comercial, análise
            de crédito, envio de informações sobre serviços financeiros e
            melhoria da experiência do usuário.
          </p>
        </Clause>

        <Clause number={3} title="Compartilhamento">
          <p>
            Os dados podem ser compartilhados com instituições financeiras
            parceiras somente quando necessário para análise de crédito e
            execução dos serviços solicitados.
          </p>
        </Clause>

        <Clause number={4} title="Segurança">
          <p>
            Adotamos medidas técnicas e administrativas para proteger suas
            informações contra acessos não autorizados.
          </p>
        </Clause>

        <Clause number={5} title="Direitos do titular">
          <p>
            Você pode solicitar atualização, correção ou exclusão dos seus dados
            a qualquer momento através do nosso atendimento, pelo e-mail{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-indigo underline decoration-indigo/40"
            >
              {site.email}
            </a>{" "}
            ou pelos telefones informados na página de contato.
          </p>
        </Clause>
      </LegalArticle>

      <CtaBand
        title="Não encontrou o que procurava?"
        lead="Entre em contato com nossa equipe e tire suas dúvidas diretamente com um consultor."
        message="Olá! Li a política de privacidade e gostaria de tirar uma dúvida sobre meus dados."
        source="politica-privacidade"
        secondary={{
          href: "/aviso-de-correspondente",
          label: "Ler o aviso de correspondente",
        }}
      />
    </>
  );
}
