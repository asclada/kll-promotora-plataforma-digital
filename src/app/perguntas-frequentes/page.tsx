import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import FaqList from "@/components/ui/FaqList";
import CtaBand from "@/components/ui/CtaBand";
import { faq } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Perguntas Frequentes sobre Consignado",
  description:
    "Taxas, prazos, documentos, SPC/Serasa e portabilidade: as oito dúvidas que mais chegam por telefone na KLL Promotora, respondidas sem enrolação nenhuma.",
  alternates: { canonical: "/perguntas-frequentes" },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              { name: "Perguntas frequentes", path: "/perguntas-frequentes" },
            ]),
          ),
        }}
      />

      <PageHeader
        title="As dúvidas que mais chegam pelo telefone"
        lead="Estas são, na ordem, as perguntas que a KLL Promotora mais ouve. Se a sua não estiver aqui, é só perguntar no WhatsApp."
        trail={[
          { name: "Início", path: "/" },
          { name: "Perguntas frequentes", path: "/perguntas-frequentes" },
        ]}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="max-w-3xl">
          <FaqList />
        </div>
      </div>

      <CtaBand
        title="Ficou com alguma dúvida que não está aqui?"
        lead="Pergunte direto. Responder dúvida antes de contratar é parte do serviço, não um favor."
        message="Olá! Li as perguntas frequentes e fiquei com uma dúvida:"
        source="faq"
        secondary={{ href: "/como-funciona", label: "Ver como funciona" }}
      />
    </>
  );
}
