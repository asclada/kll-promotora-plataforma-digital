"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import WhatsappGlyph from "@/components/ui/WhatsappGlyph";
import { primaryPhone, site, whatsappLink } from "@/lib/site";

const nav = [
  { href: "/sobre", label: "Sobre nós" },
  { href: "/servicos", label: "Serviços" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const zap = whatsappLink(
    "Olá! Vim pelo site e gostaria de falar com um consultor da KLL.",
    "header",
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Letterhead line. It is on every route because the objection it
          answers — "isso é golpe?" — arrives on every route. */}
      <p className="bg-indigo-deep px-3 py-1.5 text-center font-display text-3xs leading-snug font-semibold tracking-[0.02em] text-white/90 uppercase sm:px-8 sm:py-2 sm:text-2xs sm:tracking-[0.14em]">
        Correspondente bancário
        <span className="hidden sm:inline"> autorizado pelo Banco Central</span>
        <span className="tabular-nums"> · CNPJ {site.cnpj}</span>
      </p>

      <div className="border-b border-rule bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 no-underline"
            aria-label="KLL Promotora — página inicial"
          >
            <Image
              src="/kll-selo.webp"
              alt=""
              width={44}
              height={44}
              priority
              className="size-11 shrink-0"
            />
            <span className="hidden font-display text-lg leading-none font-black text-indigo sm:inline">
              KLL
              <span className="block text-2xs font-semibold tracking-[0.16em] text-ink-2 uppercase">
                Promotora
              </span>
            </span>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="ml-auto hidden items-center gap-6 lg:flex"
          >
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b-2 pb-0.5 text-sm font-semibold whitespace-nowrap no-underline transition-colors duration-150 ${
                    active
                      ? "border-selo text-indigo"
                      : "border-transparent text-ink-2 hover:border-rule-strong hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-6">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="flex min-h-11 items-center gap-2 rounded-mark px-2 text-sm font-semibold whitespace-nowrap text-ink no-underline tabular-nums hover:text-indigo sm:px-3"
            >
              <Phone className="size-4.5 shrink-0 text-indigo" aria-hidden="true" />
              <span className="hidden sm:inline">{primaryPhone.label}</span>
              <span className="sr-only sm:hidden">
                Ligar para {primaryPhone.label}
              </span>
            </a>

            <a
              href={zap}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 rounded-mark bg-indigo px-3 text-sm font-semibold whitespace-nowrap text-white no-underline transition-colors duration-150 hover:bg-indigo-deep sm:px-4"
            >
              <WhatsappGlyph className="size-5 shrink-0" />
              <span className="hidden md:inline">Falar no WhatsApp</span>
              <span className="md:hidden">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="flex size-11 items-center justify-center rounded-mark border border-rule-strong text-ink lg:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
              <span className="sr-only">
                {open ? "Fechar menu" : "Abrir menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Navegação principal"
          className="border-b border-rule-strong bg-paper shadow-sheet lg:hidden"
        >
          <ul className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule last:border-0">
                <Link
                  href={item.href}
                  className="flex min-h-14 items-center font-display text-lg font-semibold text-ink no-underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
