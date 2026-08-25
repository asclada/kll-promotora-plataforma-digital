import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";

/**
 * LGPD disclosure. Sits next to every point where the site collects anything,
 * including the WhatsApp hand-off — because opening WhatsApp hands over a
 * phone number whether or not a form was filled in.
 */
export default function LgpdNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex gap-3 border-t border-b border-rule py-5 text-sm text-ink-2 ${className}`}
    >
      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-indigo" aria-hidden="true" />
      <p className="measure">
        Ao enviar sua mensagem, você autoriza a KLL Promotora a usar seus dados
        de contato para retornar o atendimento e simular seu crédito, conforme
        a Lei Geral de Proteção de Dados (Lei 13.709/2018). Não vendemos seus
        dados. Você pode pedir correção ou exclusão a qualquer momento por{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-indigo underline decoration-indigo/40"
        >
          {site.email}
        </a>
        . Leia a{" "}
        <Link
          href="/politica-privacidade"
          className="text-indigo underline decoration-indigo/40"
        >
          política de privacidade
        </Link>
        .
      </p>
    </div>
  );
}
