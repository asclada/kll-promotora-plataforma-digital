import type { ReactNode } from "react";

/**
 * Legal pages are the one place where this world is not a metaphor: they are
 * literally documents. One column at a real measure, numbered clauses on ruled
 * rows, body type one step larger than the rest of the site, and the revision
 * date recorded at the foot the way a document records it.
 */
export function LegalArticle({
  children,
  updatedAt,
}: {
  children: ReactNode;
  /** ISO date, `YYYY-MM-DD`. */
  updatedAt: string;
}) {
  /* Parsed as local time on purpose: `new Date("2026-08-25")` is UTC midnight,
     which renders as the 24th anywhere west of Greenwich, Natal included. */
  const [year, month, day] = updatedAt.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 md:py-20">
      <div className="max-w-3xl space-y-10">
        {children}

        <p className="border-t border-rule-strong pt-4 text-sm text-ink-2">
          Última revisão deste documento:{" "}
          <time dateTime={updatedAt} className="font-semibold text-ink">
            {date.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </time>
        </p>
      </div>
    </article>
  );
}

export function Clause({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-rule-strong pt-6">
      <h2 className="flex gap-4 font-display text-xl font-bold md:text-2xl">
        {/* Clause numbers are citable references, not decoration. */}
        <span className="shrink-0 text-indigo tabular-nums">
          {String(number).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-2">
        {children}
      </div>
    </section>
  );
}
