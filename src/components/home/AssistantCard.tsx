"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Lock, RotateCcw } from "lucide-react";
import Link from "next/link";
import WhatsappGlyph from "@/components/ui/WhatsappGlyph";
import { segments } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";

/**
 * The hero card. It opens in place — no modal, no route change — and only
 * after a deliberate click, because a chat that starts itself is exactly the
 * pushiness this audience is bracing for.
 *
 * SCOPE: frontend only. The transcript below is a fixed script, not a model.
 * The integration seam is `handleAnswer`: replace the local `push` calls with
 * a request to the triage agent and stream its replies into `messages`. The
 * message shape (`Message`) is already what a real transcript would carry.
 */

type Message = {
  id: string;
  from: "agent" | "user";
  text: string;
};

type Phase = "closed" | "asking" | "answered";

const OPENING: Message[] = [
  {
    id: "a1",
    from: "agent",
    text: "Oi! Eu sou o assistente da KLL Promotora. Vou fazer uma pergunta rápida para te encaminhar ao consultor certo.",
  },
  {
    id: "a2",
    from: "agent",
    text: "Qual é o seu vínculo hoje?",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

const bubbleDelays = [
  "[animation-delay:0ms]",
  "[animation-delay:70ms]",
  "[animation-delay:140ms]",
  "[animation-delay:210ms]",
  "[animation-delay:280ms]",
];

export default function AssistantCard() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [chosen, setChosen] = useState<(typeof segments)[number] | null>(null);
  const reduced = usePrefersReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const wait = (ms: number, fn: () => void) => {
    const id = setTimeout(fn, reduced ? 0 : ms);
    timers.current.push(id);
  };

  function open() {
    setPhase("asking");
    setTyping(true);
    /* The card grows in place; on a phone that growth happens below the fold
       unless we bring its top edge back under the sticky header. */
    wait(60, () =>
      root.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      }),
    );
    wait(700, () => {
      setTyping(false);
      setMessages(OPENING);
    });
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("closed");
    setMessages([]);
    setChosen(null);
    setTyping(false);
  }

  /* Integration seam — see the file header. */
  function handleAnswer(segment: (typeof segments)[number]) {
    setChosen(segment);
    setMessages((prev) => [
      ...prev,
      { id: `u-${segment.slug}`, from: "user", text: segment.name },
    ]);
    setTyping(true);
    wait(900, () => {
      setTyping(false);
      setPhase("answered");
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${segment.slug}`,
          from: "agent",
          text: `${segment.proof} Vou te passar para um consultor agora — é gratuito e sem compromisso.`,
        },
      ]);
    });
  }

  const zap = chosen
    ? whatsappLink(chosen.whatsapp, `assistente-${chosen.slug}`)
    : "";

  return (
    <div ref={root} className="scroll-mt-28 bg-sheet text-ink shadow-lift">
      {/* Strip — the sheet's letterhead. */}
      <div className="flex items-center gap-3 border-b border-rule bg-paper-2 px-5 py-2.5 sm:py-3">
        <Image
          src="/kll-selo.webp"
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0"
        />
        <p className="font-display text-2xs font-semibold tracking-[0.14em] uppercase">
          Assistente KLL
        </p>
        {phase !== "closed" && (
          <span className="flex items-center gap-1.5 text-2xs font-semibold tracking-wide text-online uppercase">
            <span className="size-2 rounded-full bg-online" aria-hidden="true" />
            online
          </span>
        )}
        {phase !== "closed" && (
          <button
            type="button"
            onClick={reset}
            className="ml-auto flex min-h-9 items-center gap-1.5 rounded-mark px-2 text-xs font-semibold text-ink-2 hover:text-indigo"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Recomeçar
          </button>
        )}
      </div>

      {phase === "closed" ? (
        <div className="px-4 py-5 sm:px-7 sm:py-8">
          <h2 className="font-display text-xl font-black sm:text-2xl md:text-3xl">
            Descubra quanto você pode pegar
          </h2>
          <p className="mt-2 text-base text-ink-2 sm:mt-3">
            Uma pergunta, e um consultor continua no WhatsApp.
          </p>

          <button
            type="button"
            onClick={open}
            className="group mt-6 flex min-h-14 w-full items-center justify-between gap-3 rounded-mark bg-selo px-4 text-left font-display text-base font-bold text-balance text-ink transition-colors duration-150 hover:bg-selo-deep sm:mt-7 sm:px-5 sm:text-lg"
          >
            Simule seu empréstimo agora
            <ArrowRight
              className="size-6 shrink-0 transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <p className="mt-4 flex items-start gap-2 text-sm text-ink-2">
            <Lock className="mt-0.5 size-4 shrink-0 text-indigo" aria-hidden="true" />
            Converse com nosso assistente. Aqui não pedimos CPF, senha nem
            depósito antecipado.
          </p>

          <dl className="mt-6 border-t border-rule pt-4 text-sm">
            {site.hours.map((hour) => (
              <div
                key={hour.days}
                className="flex flex-wrap justify-between gap-x-6 gap-y-0.5 py-1"
              >
                <dt className="text-ink-2">{hour.days}</dt>
                <dd className="font-semibold tabular-nums">{hour.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className="animate-sheet">
          <div
            role="log"
            aria-live="polite"
            aria-label="Conversa com o assistente da KLL"
            className="flex min-h-64 flex-col gap-3 bg-paper-2 px-5 py-6 sm:px-6"
          >
            {messages.map((message, i) => (
              <p
                key={message.id}
                className={`animate-bubble max-w-[85%] px-4 py-3 text-base ${
                  bubbleDelays[Math.min(i, bubbleDelays.length - 1)]
                } ${
                  message.from === "agent"
                    ? "self-start rounded-mark bg-sheet text-ink shadow-sheet"
                    : "self-end rounded-mark bg-indigo font-semibold text-white"
                }`}
              >
                {message.text}
              </p>
            ))}

            {typing && (
              <p className="flex w-16 items-center justify-center gap-1.5 self-start rounded-mark bg-sheet px-4 py-4 shadow-sheet">
                <span className="sr-only">O assistente está digitando</span>
                <span
                  className="animate-blink size-2 rounded-full bg-ink-3 [animation-delay:0ms]"
                  aria-hidden="true"
                />
                <span
                  className="animate-blink size-2 rounded-full bg-ink-3 [animation-delay:160ms]"
                  aria-hidden="true"
                />
                <span
                  className="animate-blink size-2 rounded-full bg-ink-3 [animation-delay:320ms]"
                  aria-hidden="true"
                />
              </p>
            )}
          </div>

          <div className="border-t border-rule px-5 py-5 sm:px-6">
            {phase === "asking" && messages.length > 0 && (
              <ul className="grid gap-2">
                {segments.map((segment) => (
                  <li key={segment.slug}>
                    <button
                      type="button"
                      onClick={() => handleAnswer(segment)}
                      className="flex min-h-12 w-full items-center justify-between gap-3 rounded-mark border border-rule-strong px-4 text-left text-base font-semibold transition-colors duration-150 hover:border-indigo hover:bg-indigo-tint hover:text-indigo-deep"
                    >
                      {segment.name}
                      <ArrowRight className="size-5 shrink-0 text-indigo" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {phase === "answered" && chosen && (
              <div className="animate-sheet">
                <a
                  href={zap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 w-full items-center justify-center gap-3 rounded-mark bg-selo px-5 font-display text-lg font-bold text-ink no-underline transition-colors duration-150 hover:bg-selo-deep"
                >
                  <WhatsappGlyph className="size-6 shrink-0" />
                  Continuar no WhatsApp
                </a>
                <p className="mt-4 text-xs text-ink-2">
                  Ao continuar, você concorda que a KLL use seu nome e telefone
                  para retornar o contato e simular seu crédito, conforme a
                  LGPD.{" "}
                  <Link
                    href="/politica-privacidade"
                    className="text-indigo underline"
                  >
                    Política de privacidade
                  </Link>
                  .
                </p>
              </div>
            )}

            {phase === "asking" && (
              <p className="mt-4 flex items-start gap-2 text-xs text-ink-2">
                <Lock className="mt-0.5 size-3.5 shrink-0 text-indigo" aria-hidden="true" />
                Nada é contratado aqui. Nenhum dado é enviado até você abrir o
                WhatsApp.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
