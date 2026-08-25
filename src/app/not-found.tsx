import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Stamp from "@/components/ui/Stamp";

const links = [
  { href: "/servicos", label: "Serviços" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/perguntas-frequentes", label: "Perguntas frequentes" },
  { href: "/contato", label: "Contato" },
];

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-32">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-16">
        <div>
          <h1 className="font-display text-4xl font-black md:text-5xl">
            Esta página não existe mais
          </h1>
          <p className="measure mt-5 text-lg text-ink-2">
            O endereço que você abriu não corresponde a nenhuma página do site
            da KLL Promotora (erro <span className="tabular-nums">404</span>).
            Talvez o link esteja desatualizado. As páginas do site são estas:
          </p>

          <ul className="mt-10 max-w-md border-t border-rule-strong">
            {links.map((link) => (
              <li key={link.href} className="border-b border-rule-strong">
                <Link
                  href={link.href}
                  className="group flex min-h-14 items-center justify-between gap-3 font-display text-lg font-bold no-underline hover:text-indigo"
                >
                  {link.label}
                  <ArrowRight
                    className="size-5 shrink-0 text-indigo transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Stamp className="w-32 -rotate-6 md:w-40" />
      </div>
    </div>
  );
}
