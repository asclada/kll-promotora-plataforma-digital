import { ShieldCheck, HandCoins, MapPin } from "lucide-react";
import AssistantCard from "./AssistantCard";
import { fullAddress } from "@/lib/site";

const facts = [
  {
    icon: ShieldCheck,
    text: "A KLL nunca cobra taxa antecipada. Se alguém pedir depósito adiantado em nosso nome, não somos nós.",
  },
  {
    icon: HandCoins,
    text: "Taxas a partir de 1,20% ao mês, conforme o seu perfil e o banco parceiro.",
  },
  {
    icon: MapPin,
    text: `Endereço fixo, o mesmo há anos: ${fullAddress}.`,
  },
];

export default function Hero() {
  return (
    <section className="bg-indigo text-white">
      {/* Mobile order is deliberate: headline, then the action, then the
          reassurance. On a 360×780 screen the button has to be reachable
          without a scroll, so the lead is two lines shorter here than the
          desktop composition would allow. */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 pt-6 pb-14 sm:gap-8 sm:px-8 md:pt-14 md:pb-20 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-x-14 lg:gap-y-12 lg:pt-16 lg:pb-24">
        <div className="lg:col-start-1 lg:row-start-1">
          <h1 className="font-display text-display-xs font-black sm:text-5xl lg:text-6xl">
            Crédito rápido e seguro, com as{" "}
            <span className="text-selo">menores taxas</span>.
          </h1>

          <p className="measure mt-4 text-lg text-white/85 md:mt-6 md:text-xl">
            Correspondente bancário em Natal há mais de 20 anos, com mais de 5
            mil clientes atendidos.
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <AssistantCard />
        </div>

        <ul className="max-w-xl border-t border-rule-ink lg:col-start-1 lg:row-start-2">
          {facts.map((fact) => (
            <li
              key={fact.text}
              className="flex items-start gap-3.5 border-b border-rule-ink py-4"
            >
              <fact.icon
                className="mt-0.5 size-5.5 shrink-0 text-selo"
                aria-hidden="true"
              />
              <span className="text-base text-white/85">{fact.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
