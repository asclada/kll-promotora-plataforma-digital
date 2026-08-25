import Link from "next/link";
import { ArrowRight, Clock, Phone } from "lucide-react";
import WhatsappGlyph from "@/components/ui/WhatsappGlyph";
import { site, whatsappLink } from "@/lib/site";

/**
 * The closing band every inner route ends on: one loud action, one quiet, and
 * the two phone numbers — a visitor who does not trust a chat button still
 * has something to dial.
 */
export default function CtaBand({
  title,
  lead,
  message,
  source,
  secondary = { href: "/contato", label: "Ver todas as formas de contato" },
}: {
  title: string;
  lead: string;
  message: string;
  source: string;
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="bg-indigo text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-black md:text-4xl">
            {title}
          </h2>
          <p className="measure mt-5 text-lg text-white/85">{lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(message, source)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-mark bg-selo px-7 font-display text-lg font-bold text-ink no-underline transition-colors duration-150 hover:bg-selo-deep"
            >
              <WhatsappGlyph className="size-6 shrink-0" />
              Falar com um consultor
            </a>
            {secondary && (
              <Link
                href={secondary.href}
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-mark border border-rule-ink-strong px-7 font-display text-lg font-semibold text-white no-underline transition-colors duration-150 hover:bg-white hover:text-indigo-deep"
              >
                {secondary.label}
                <ArrowRight
                  className="size-5 shrink-0 transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </div>

        <div className="border-t border-rule-ink pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <p className="flex gap-3">
            <Phone className="mt-1 size-5 shrink-0 text-selo" aria-hidden="true" />
            <span className="flex flex-col gap-1">
              {site.phones.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="font-display text-lg font-bold text-white tabular-nums underline decoration-white/30 hover:decoration-selo"
                >
                  {phone.label}
                </a>
              ))}
            </span>
          </p>
          <p className="mt-5 flex gap-3 text-base text-white/85">
            <Clock className="mt-1 size-5 shrink-0 text-selo" aria-hidden="true" />
            <span>
              {site.hours.map((hour) => (
                <span key={hour.days} className="block">
                  {hour.days}:{" "}
                  <span className="tabular-nums">{hour.time}</span>
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
