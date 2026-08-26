"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { segments } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { requestAssistantOpen } from "@/lib/assistant-bridge";

/**
 * Four regimes, one panel. Every row stays visible at all times — the reader
 * must be able to see that their own case is on the list before they click
 * anything. Selecting a row stamps it and swaps the panel; nothing navigates.
 */
export default function SegmentsPanel() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const segment = segments[active];

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const last = segments.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = active === last ? 0 : active + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = active === 0 ? last : active - 1;
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
                tabIndex={selected ? 0 : -1}
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

        <div
          role="tabpanel"
          id={`segmento-painel-${segment.slug}`}
          aria-labelledby={`segmento-aba-${segment.slug}`}
          tabIndex={0}
          key={segment.slug}
          className="animate-sheet"
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
      </div>
    </section>
  );
}
