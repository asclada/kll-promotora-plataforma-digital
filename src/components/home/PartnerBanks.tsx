import { partnerBanksPending } from "@/lib/content";

/**
 * PENDING CONTENT — the client has not sent the partner bank list yet.
 * The strip, its motion and its layout are final; only the plates are
 * placeholders, and they are marked as such on screen rather than filled
 * with invented bank names. Replace `partnerBanksPending` in lib/content.ts
 * with the real institutions (name + logo) when the list arrives.
 */
export default function PartnerBanks() {
  const plates = [...partnerBanksPending, ...partnerBanksPending];

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
        <ul
          className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]"
          data-placeholder="partner-bank-logos"
        >
          {plates.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= partnerBanksPending.length}
              className="flex h-16 w-52 shrink-0 items-center justify-center border border-dashed border-rule-strong bg-paper px-4"
            >
              <span className="font-display text-sm font-semibold tracking-wide text-ink-3 tabular-nums">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-6 w-full max-w-6xl px-5 text-xs text-ink-3 sm:px-8">
        Espaço reservado: os nomes e as marcas dos bancos parceiros entram aqui
        assim que a KLL Promotora enviar a lista oficial.
      </p>
    </section>
  );
}
