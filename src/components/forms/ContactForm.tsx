"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import WhatsappGlyph from "@/components/ui/WhatsappGlyph";
import LgpdNotice from "@/components/ui/LgpdNotice";
import { segments } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

/**
 * There is no backend in this phase. The form composes a message and hands the
 * conversation to WhatsApp — the same behaviour the live site has today, which
 * is also what actually converts for this audience.
 */

const field =
  "min-h-12 w-full rounded-mark border border-rule-strong bg-sheet px-4 py-3 text-base text-ink placeholder:text-ink-3 hover:border-ink-3 focus:border-indigo";
const label = "block font-display text-sm font-semibold text-ink";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function ContactForm() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [vinculo, setVinculo] = useState(segments[0].name);
  const [mensagem, setMensagem] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!nome.trim()) next.nome = "Informe seu nome para o consultor te chamar pelo nome.";
    if (telefone.replace(/\D/g, "").length < 10)
      next.telefone = "Informe um telefone com DDD, com 10 ou 11 dígitos.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }

    setSending(true);
    const body = [
      `Olá! Meu nome é ${nome.trim()}.`,
      `Telefone: ${telefone}`,
      `Vínculo: ${vinculo}`,
      mensagem.trim() ? `\n${mensagem.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(body, "formulario-contato"), "_blank", "noopener,noreferrer");
    /* Held long enough for the state to actually render: opening a new tab is
       instantaneous, and a button that flickers through "disabled" in one
       frame reads as a button that did nothing. */
    setTimeout(() => setSending(false), 1500);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="nome" className={label}>
          Nome completo
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          autoComplete="name"
          placeholder="Como podemos te chamar?"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          aria-invalid={Boolean(errors.nome)}
          aria-describedby={errors.nome ? "nome-erro" : undefined}
          className={`mt-2 ${field} ${errors.nome ? "border-alerta" : ""}`}
        />
        {errors.nome && (
          <p
            id="nome-erro"
            className="mt-2 flex items-start gap-2 text-sm font-semibold text-alerta"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errors.nome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="telefone" className={label}>
          Telefone com WhatsApp
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="(84) 90000-0000"
          value={telefone}
          onChange={(e) => setTelefone(formatPhone(e.target.value))}
          aria-invalid={Boolean(errors.telefone)}
          aria-describedby={errors.telefone ? "telefone-erro" : undefined}
          className={`mt-2 tabular-nums ${field} ${errors.telefone ? "border-alerta" : ""}`}
        />
        {errors.telefone && (
          <p
            id="telefone-erro"
            className="mt-2 flex items-start gap-2 text-sm font-semibold text-alerta"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errors.telefone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="vinculo" className={label}>
          Seu vínculo
        </label>
        <select
          id="vinculo"
          name="vinculo"
          value={vinculo}
          onChange={(e) => setVinculo(e.target.value)}
          className={`mt-2 appearance-none bg-sheet ${field}`}
        >
          {segments.map((segment) => (
            <option key={segment.slug} value={segment.name}>
              {segment.name}
            </option>
          ))}
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className={label}>
          Mensagem{" "}
          <span className="font-normal text-ink-2">(opcional)</span>
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          placeholder="Conte o que você precisa. Ex: quero saber quanto consigo de portabilidade."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className={`mt-2 resize-y ${field}`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="flex min-h-14 w-full items-center justify-center gap-3 rounded-mark bg-indigo px-6 font-display text-lg font-bold text-white transition-colors duration-150 hover:bg-indigo-deep disabled:cursor-not-allowed disabled:bg-ink-3"
      >
        <WhatsappGlyph className="size-6 shrink-0" />
        {sending ? "Abrindo o WhatsApp…" : "Enviar pelo WhatsApp"}
      </button>

      <LgpdNotice />
    </form>
  );
}
