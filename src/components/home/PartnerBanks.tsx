import Image from "next/image";
import { partnerBanks } from "@/lib/content";

/**
 * The trust strip. Every plate carries a real, named partner bank — see
 * `partnerBanks` in lib/content.ts for sourcing notes. The list is
 * duplicated once so the marquee loops seamlessly; the second copy is
 * `aria-hidden` since it's a visual repeat, not new information.
 */
export default function PartnerBanks() {
  const plates = [...partnerBanks, ...partnerBanks];

  return (
    <section
      aria-labelledby="parceiros-titulo"
      className="border-b border-rule bg-paper-2 py-10 md:py-12"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2
          id="parceiros-titulo"
          className="measure font-sans text-base font-normal text-ink-2"
        >
          A proposta é analisada e concedida por{" "}
          <strong className="font-semibold text-ink">
            bancos autorizados pelo Banco Central
          </strong>
          . A KLL Promotora leva o seu caso a todos eles e traz de volta a
          melhor condição.
        </h2>
      </div>

      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
        <ul className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
          {plates.map((bank, i) => (
            <li
              key={`${bank.name}-${i}`}
              aria-hidden={i >= partnerBanks.length}
              className="flex h-16 w-52 shrink-0 items-center justify-center border border-rule-strong bg-paper px-6"
            >
              {bank.logo ? (
                /* The inset has to live on a normal-flow wrapper, not on the
                   `relative` element itself: an absolutely-positioned `fill`
                   image fills its parent's padding box regardless of that
                   parent's own padding, so padding put directly on the
                   `relative` div is a no-op. */
                <div className={`h-full w-full ${bank.pad ?? ""}`}>
                  <div
                    className="relative h-full w-full"
                    style={
                      bank.scale ? { transform: `scale(${bank.scale})` } : undefined
                    }
                  >
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      fill
                      sizes="208px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Image
                    src={bank.icon!}
                    alt=""
                    width={36}
                    height={36}
                    className="shrink-0"
                  />
                  <span className="font-display text-base font-semibold text-ink-3">
                    {bank.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
