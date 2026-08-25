"use client";

import { useState } from "react";
import { ExternalLink, Map } from "lucide-react";
import { fullAddress } from "@/lib/site";

const query = encodeURIComponent("Rua Omar Medeiros, 946 - Alecrim, Natal - RN");

/**
 * Click-to-load map. The embed is a third-party frame that costs about eight
 * Lighthouse points and sets Google cookies on arrival, so it waits until the
 * visitor asks for it. The address and the direct link are always available,
 * which is what most people actually want.
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="border border-rule-strong bg-paper">
      {loaded ? (
        <div className="aspect-[4/3] w-full sm:aspect-[21/9]">
          <iframe
            title="Mapa com a localização da KLL Promotora na Rua Omar Medeiros, 946, Alecrim, Natal-RN"
            src={`https://www.google.com/maps?q=${query}&output=embed&hl=pt-BR`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0"
          />
        </div>
      ) : (
        <div className="flex flex-col items-start gap-5 px-6 py-10 sm:px-10 sm:py-14">
          <p className="flex items-start gap-3 text-lg font-semibold">
            <Map className="mt-1 size-5 shrink-0 text-indigo" aria-hidden="true" />
            {fullAddress}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex min-h-12 items-center justify-center rounded-mark bg-indigo px-6 font-display text-base font-semibold text-white transition-colors duration-150 hover:bg-indigo-deep"
            >
              Carregar o mapa aqui
            </button>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-mark border border-rule-strong px-6 font-display text-base font-semibold no-underline transition-colors duration-150 hover:border-indigo hover:bg-indigo-tint hover:text-indigo-deep"
            >
              Abrir no Google Maps
              <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
          <p className="text-sm text-ink-3">
            O mapa é carregado do Google e só entra na página quando você pede.
          </p>
        </div>
      )}
    </div>
  );
}
