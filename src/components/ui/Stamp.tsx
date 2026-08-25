import { site } from "@/lib/site";

/**
 * The one signature graphic of this world: a rubber stamp, drawn from scratch
 * rather than pulled from an icon set. Every word on it is a verifiable fact —
 * it carries no regulator's mark and claims no endorsement, only the company's
 * own registration and city.
 *
 * Geometry: outer ring r=105, inner ring r=74, both text arcs on r=86 so the
 * lettering sits in the band between them instead of crossing a rule.
 */
export default function Stamp({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  const color = tone === "paper" ? "var(--color-selo)" : "var(--color-indigo)";
  const uid = tone === "paper" ? "paper" : "ink";

  return (
    <svg
      viewBox="0 0 220 220"
      role="img"
      aria-label={`Carimbo da KLL Promotora: correspondente bancário, CNPJ ${site.cnpj}, Natal, Rio Grande do Norte`}
      className={`font-display ${className}`}
      style={{ color }}
    >
      <defs>
        <path
          id={`stamp-top-${uid}`}
          d="M 24 110 A 86 86 0 0 1 196 110"
          fill="none"
        />
        <path
          id={`stamp-bottom-${uid}`}
          d="M 24 110 A 86 86 0 0 0 196 110"
          fill="none"
        />
      </defs>

      <g stroke="currentColor" fill="none">
        <circle cx="110" cy="110" r="105" strokeWidth="3.5" />
        <circle cx="110" cy="110" r="97" strokeWidth="1" opacity="0.7" />
        <circle cx="110" cy="110" r="74" strokeWidth="1.5" opacity="0.85" />
        <line x1="52" y1="88" x2="168" y2="88" strokeWidth="1" opacity="0.7" />
        <line x1="52" y1="134" x2="168" y2="134" strokeWidth="1" opacity="0.7" />
      </g>

      <g fill="currentColor">
        <text fontSize="13" fontWeight="700" letterSpacing="1.1">
          <textPath
            href={`#stamp-top-${uid}`}
            startOffset="50%"
            textAnchor="middle"
          >
            CORRESPONDENTE BANCÁRIO
          </textPath>
        </text>
        <text fontSize="11" fontWeight="600" letterSpacing="0.9">
          <textPath
            href={`#stamp-bottom-${uid}`}
            startOffset="50%"
            textAnchor="middle"
          >
            NATAL · RIO GRANDE DO NORTE
          </textPath>
        </text>
        <text
          x="110"
          y="107"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          letterSpacing="3.5"
        >
          CNPJ
        </text>
        <text
          x="110"
          y="127"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {site.cnpj}
        </text>
      </g>
    </svg>
  );
}
