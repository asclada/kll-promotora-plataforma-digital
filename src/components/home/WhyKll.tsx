import { differentials } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The four differentials, set as ruled columns rather than four identical
 * icon cards. Same content, one less costume.
 */
export default function WhyKll() {
  return (
    <section
      aria-labelledby="diferenciais-titulo"
      className="bg-indigo text-white"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <SectionHeading
          id="diferenciais-titulo"
          tone="paper"
          lead="Mais de 5 mil clientes já passaram por aqui. É o que temos para mostrar, e é verdade."
        >
          Por que escolher a KLL
        </SectionHeading>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item) => (
            <div
              key={item.title}
              className="border-b border-rule-ink py-8 sm:px-6 sm:first:pl-0 sm:last:pr-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:py-10"
            >
              <h3 className="font-display text-xl font-bold text-selo">
                {item.title}
              </h3>
              <p className="mt-3 text-base text-white/85">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
