import { NextRequest, NextResponse } from "next/server";

/**
 * Stateless proxy to the triage agent's n8n webhook. The site never talks to
 * the CRM's database directly — it only relays `{ conversa_id, mensagem }`
 * and passes back `{ respostas, concluida }`. `N8N_WEBHOOK_URL` stays a
 * server-only env var so it never reaches the client bundle.
 */

type AgentResponse = {
  respostas: string[];
  concluida: boolean;
};

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Assistente indisponível no momento." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const conversaId =
    typeof body === "object" && body !== null && "conversa_id" in body
      ? (body as Record<string, unknown>).conversa_id
      : undefined;
  const mensagem =
    typeof body === "object" && body !== null && "mensagem" in body
      ? (body as Record<string, unknown>).mensagem
      : undefined;

  if (typeof conversaId !== "string" || !conversaId || typeof mensagem !== "string" || !mensagem) {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversa_id: conversaId, mensagem }),
      signal: AbortSignal.timeout(45_000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "O assistente não respondeu corretamente." },
        { status: 502 },
      );
    }

    const data = (await response.json().catch(() => null)) as Partial<AgentResponse> | null;
    if (!data || !Array.isArray(data.respostas)) {
      return NextResponse.json(
        { error: "Resposta inesperada do assistente." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      respostas: data.respostas,
      concluida: data.concluida === true,
    } satisfies AgentResponse);
  } catch {
    return NextResponse.json(
      { error: "Não foi possível falar com o assistente agora." },
      { status: 502 },
    );
  }
}
