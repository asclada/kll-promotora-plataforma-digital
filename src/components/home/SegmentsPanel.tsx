"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { segments } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { requestAssistantOpen } from "@/lib/assistant-bridge";

/** Matches this component's own `lg:grid-cols-[...]` split below — the
    breakpoint where the panel actually moves from under the tab list to
    beside it, not a generic "phone" cutoff. */
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Four regimes, one panel. Below `lg` the panel sits under the tab list, so
 * nothing starts selected there — a pre-picked row with its content already
 * populated off-screen just reads as "nothing happened" when tapped again.
 * At `lg`+ the panel sits beside the list, always visible, so CLT is
 * pre-selected there like before.
 */
export default function SegmentsPanel() {
  const [active, setActive] = useState<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const segment = active !== null ? segments[active] : null;

  useLayoutEffect(() => {
    if (window.matchMedia(DESKTOP_QUERY).matches) setActive(0);
  }, []);

  useEffect(() => {
    if (active === null) return;
    /* Only nudge the scroll where the selection would otherwise be
       invisible below the fold. At `lg`+ the panel is already beside the
       list — including on the very first, programmatic selection above. */
    if (!window.matchMedia(DESKTOP_QUERY).matches) {
      panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [active]);

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const last = segments.length - 1;
    const current = active ?? -1;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = current === last ? 0 : current + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = current <= 0 ? last : current - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      aria-labelledby="segmentos-titulo"
      className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24"
    >
      <SectionHeading
        id="segmentos-titulo"
        lead="Cada regime tem uma regra de margem e um conjunto de bancos conveniados. Escolha o seu para ver o que muda."
      >
        Para quem trabalhamos
      </SectionHeading>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
        <div>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Segmentos atendidos"
            className="border-t border-rule-strong"
          >
          {segments.map((item, index) => {
            const selected = index === active;
            const focusable = active === null ? index === 0 : selected;
            return (
              <button
                key={item.slug}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`segmento-aba-${item.slug}`}
                aria-selected={selected}
                aria-controls={`segmento-painel-${item.slug}`}
                tabIndex={focusable ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={onKeyDown}
                className={`flex w-full items-center gap-4 border-b border-rule-strong px-4 py-5 text-left transition-colors duration-150 ${
                  selected
                    ? "bg-selo text-ink"
                    : "bg-transparent text-ink hover:bg-paper-2"
                }`}
              >
                <span className="flex-1">
                  <span className="block font-display text-lg font-bold">
                    {item.name}
                  </span>
                  <span
                    className={`mt-0.5 block text-sm ${selected ? "text-ink/75" : "text-ink-2"}`}
                  >
                    {item.qualifier}
                  </span>
                </span>
                {selected ? (
                  <Check className="size-5 shrink-0" aria-hidden="true" />
                ) : (
                  <ArrowRight
                    className="size-5 shrink-0 text-ink-3"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
          </div>
          <p className="px-4 py-5 text-base text-ink-2">
            Não é nenhum destes?{" "}
            <Link
              href="/contato"
              className="font-semibold text-indigo underline decoration-indigo/40"
            >
              Fale com a gente mesmo assim
            </Link>{" "}
            — a gente confere a sua margem antes de dizer qualquer coisa.
          </p>
        </div>

        {segment && (
          <div
            ref={panel}
            role="tabpanel"
            id={`segmento-painel-${segment.slug}`}
            aria-labelledby={`segmento-aba-${segment.slug}`}
            tabIndex={0}
            key={segment.slug}
            className="scroll-mt-28 animate-sheet"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-2 sm:aspect-[2/1] lg:aspect-[16/9]">
              <Image
                src={segment.image.src}
                alt={segment.image.alt}
                fill
                sizes="(min-width: 1024px) 44rem, 100vw"
                className="object-cover"
              />
            </div>

            <h3 className="mt-7 font-display text-2xl font-black md:text-3xl">
              {segment.headline}
            </h3>
            <p className="measure mt-4 text-lg text-ink-2">{segment.body}</p>

            <p className="mt-6 flex items-start gap-3 border-t border-b border-rule-strong py-4 text-base font-semibold">
              <Check className="mt-0.5 size-5 shrink-0 text-indigo" aria-hidden="true" />
              {segment.proof}
            </p>

            <button
              type="button"
              onClick={() => requestAssistantOpen()}
              className="mt-6 inline-flex min-h-12 items-center gap-2.5 rounded-mark bg-indigo px-6 py-3 font-display text-base font-semibold text-white transition-colors duration-150 hover:bg-indigo-deep"
            >
              Simular como {segment.name}
              <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
