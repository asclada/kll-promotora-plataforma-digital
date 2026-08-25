import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * The banner every inner route opens with: an indigo field, a breadcrumb rule,
 * one h1, one lead. No label above the heading — the heading carries itself.
 */
export default function PageHeader({
  title,
  lead,
  trail = [],
}: {
  title: string;
  lead: string;
  trail?: { name: string; path: string }[];
}) {
  return (
    <section className="bg-indigo text-white">
      <div className="mx-auto w-full max-w-6xl px-5 pt-8 pb-14 sm:px-8 md:pt-10 md:pb-20">
        {trail.length > 0 && (
          <nav aria-label="Trilha de navegação" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 border-b border-rule-ink pb-3 font-display text-2xs font-semibold text-white/80 uppercase">
              {trail.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight
                      className="size-3.5 text-white/50"
                      aria-hidden="true"
                    />
                  )}
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-selo">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="underline decoration-white/40 hover:decoration-selo"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="max-w-4xl font-display text-display-xs font-black sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="measure mt-6 text-lg text-white/85 md:text-xl">{lead}</p>
      </div>
    </section>
  );
}
