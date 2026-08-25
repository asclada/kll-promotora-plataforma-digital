import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Páginas",
    links: [
      { href: "/", label: "Início" },
      { href: "/sobre", label: "Sobre nós" },
      { href: "/como-funciona", label: "Como funciona" },
      { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    title: "Serviços",
    links: [
      { href: "/servicos/credito-consignado", label: "Crédito consignado" },
      { href: "/servicos/portabilidade", label: "Portabilidade de crédito" },
      { href: "/servicos/cartao-consignado", label: "Cartão consignado" },
    ],
  },
  {
    title: "Documentos",
    links: [
      {
        href: "/aviso-de-correspondente",
        label: "Aviso de correspondente bancário",
      },
      { href: "/politica-privacidade", label: "Política de privacidade" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-indigo text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/kll-selo.webp"
                alt="Selo da KLL Promotora"
                width={56}
                height={56}
                loading="lazy"
                className="size-14"
              />
              <span className="font-display text-xl font-black">
                KLL Promotora
              </span>
            </div>

            <address className="mt-8 space-y-5 text-base not-italic">
              <p className="flex gap-3">
                <MapPin
                  className="mt-1 size-5 shrink-0 text-selo"
                  aria-hidden="true"
                />
                <span className="text-white/85">
                  {site.address.street}
                  <br />
                  {site.address.district}
                  <br />
                  {site.address.city} – {site.address.state}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone
                  className="mt-1 size-5 shrink-0 text-selo"
                  aria-hidden="true"
                />
                <span className="flex flex-col gap-1">
                  {site.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="text-white tabular-nums underline decoration-white/30 hover:decoration-selo"
                    >
                      {phone.label}
                    </a>
                  ))}
                </span>
              </p>
              <p className="flex gap-3">
                <Mail
                  className="mt-1 size-5 shrink-0 text-selo"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-white underline decoration-white/30 hover:decoration-selo"
                >
                  {site.email}
                </a>
              </p>
              <p className="flex gap-3">
                <Clock
                  className="mt-1 size-5 shrink-0 text-selo"
                  aria-hidden="true"
                />
                <span className="text-white/85">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: <span className="tabular-nums">{h.time}</span>
                    </span>
                  ))}
                </span>
              </p>
            </address>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:gap-8">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="border-b border-rule-ink pb-2 font-display text-2xs font-semibold tracking-[0.14em] text-selo uppercase">
                  {column.title}
                </h2>
                <ul className="mt-3">
                  {column.links.map((link) => (
                    <li key={link.href} className="border-b border-rule-ink">
                      <Link
                        href={link.href}
                        className="flex min-h-11 items-center text-sm text-white/85 no-underline hover:text-selo"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-rule-ink-strong pt-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-10">
          <Stamp tone="paper" className="w-32 shrink-0 -rotate-3 sm:w-40" />
          <div className="space-y-4 text-sm text-white/75">
            <p className="measure">
              A KLL Promotora atua como correspondente bancário autorizado,
              conforme regulamentação do Banco Central do Brasil.{" "}
              <strong className="font-semibold text-white">
                Não é uma instituição financeira e não realiza operações de
                crédito diretamente
              </strong>{" "}
              — nosso papel é intermediar propostas junto a bancos parceiros,
              responsáveis pela análise e concessão do crédito.{" "}
              <Link
                href="/aviso-de-correspondente"
                className="text-selo underline decoration-selo/50"
              >
                Leia o aviso completo
              </Link>
              .
            </p>
            <p className="tabular-nums">
              © {new Date().getFullYear()} KLL Promotora · CNPJ {site.cnpj} ·
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
