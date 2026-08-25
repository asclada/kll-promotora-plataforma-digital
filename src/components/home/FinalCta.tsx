import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import WhatsappGlyph from "@/components/ui/WhatsappGlyph";
import { whatsappLink } from "@/lib/site";

/**
 * The close. Paper ground, one loud action — the page ends anchored on the
 * quietest surface it has, so the yellow plate is the only thing left to look
 * at.
 */
export default function FinalCta() {
  return (
    <section
      aria-labelledby="cta-final-titulo"
      className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-16">
        <div>
          <h2
            id="cta-final-titulo"
            className="font-display text-4xl font-black md:text-5xl"
          >
            Pronto para realizar seus planos?
          </h2>
          <p className="measure mt-5 text-lg text-ink-2 md:text-xl">
            Não perca tempo com burocracia. Fale com um consultor e descubra
            quanto crédito você pode liberar — a simulação é gratuita e não
            compromete nada.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(
                "Olá! Gostaria de solicitar uma simulação de crédito consignado.",
                "cta-final",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-mark bg-selo px-7 font-display text-lg font-bold text-ink no-underline transition-colors duration-150 hover:bg-selo-deep"
            >
              <WhatsappGlyph className="size-6 shrink-0" />
              Falar no WhatsApp
            </a>
            <Link
              href="/contato"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-mark border border-rule-strong px-7 font-display text-lg font-semibold text-ink no-underline transition-colors duration-150 hover:border-indigo hover:bg-indigo-tint hover:text-indigo-deep"
            >
              Solicitar proposta
              <ArrowRight
                className="size-5 shrink-0 transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <Stamp className="w-36 -rotate-6 justify-self-start md:w-48 md:justify-self-end" />
      </div>
    </section>
  );
}
