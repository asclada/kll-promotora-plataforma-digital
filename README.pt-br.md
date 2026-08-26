🇺🇸 [English](README.md) | 🇧🇷 Português

# KLL Promotora — Plataforma Digital

Site institucional da **KLL Promotora**, correspondente bancário em Natal/RN
especializado em crédito consignado, reconstruído de uma aplicação React/Vite
genérica para uma aplicação Next.js com sistema de design próprio e conteúdo
100% real do cliente.

## O que é este projeto

Hoje a KLL capta leads de um jeito manual: o visitante clica num botão, abre
uma conversa de WhatsApp com uma mensagem pré-formatada, e a partir daí quem
responde e qualifica esse contato é o próprio pai ou o filho que tocam a
empresa — não existe triagem automática nem registro estruturado de quem
entrou em contato. É esse o problema que a plataforma completa existe para
resolver, especialmente considerando que boa parte do público (aposentados e
pensionistas do INSS) é alvo frequente de golpe e precisa de sinais de
confiança antes mesmo de conversar.

A solução completa tem três partes:

1. **Este site** — presença pública redesenhada, mais rápida, com conteúdo
   real e sinais de legitimidade institucional (este repositório). **Concluído.**
2. **Um widget de qualificação de leads por IA** — o card do hero já existe
   nesta interface e se transforma num chat ao ser clicado, mas hoje é um
   **mock de frontend** (roteiro fixo, sem chamada de IA real). A integração
   de verdade (provavelmente via workflow n8n, padrão já usado em outros
   projetos da Vibe Digital) é a próxima fase. **Não iniciada.**
3. **Um CRM** — produto separado para o pai e o filho acompanharem os leads
   qualificados e o histórico de conversas, nos mesmos moldes do CRM já
   construído para outro cliente (repositório próprio, fora deste). **Não
   iniciada.**

**Este repositório é só o site.** Não tem banco de dados, não tem rota de API,
não tem nenhuma integração de IA real — a única "captação" hoje é um link
`https://api.whatsapp.com/send?phone=...` com mensagem pré-preenchida, igual
ao comportamento do site anterior.

## Stack técnica

Confirmado a partir do `package.json` — nada listado aqui é planejado ou não
utilizado.

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript
- **Estilização:** Tailwind CSS v4 — tokens de design declarados via `@theme`
  em `src/app/globals.css`, só classes utilitárias, sem CSS inline
- **Ícones:** `lucide-react` (o carimbo e o glifo do WhatsApp são SVG autorais)
- **Deploy alvo:** Vercel

## Arquitetura

**Atual (o que existe hoje):**

```
Usuário
  │
  ▼
Site (Next.js, este repo) — sem backend
  │
  ▼
api.whatsapp.com/send  — link direto, mensagem pré-formatada, sem triagem
```

**Planejada (próximas fases, fora deste repositório):**

```
Usuário
  │
  ▼
Site (Next.js, este repo)
  │
  │  widget de chat → proxy sem estado
  ▼
Workflow n8n (webhook, externo) — dono da lógica de triagem por IA
  │
  ▼
CRM — banco de dados (repositório separado)
```

## Processo de desenvolvimento

Este projeto segue o padrão de processo da Vibe Digital, definido em
[`CLAUDE.md`](CLAUDE.md): mudanças estruturais (nova integração, novo
produto) recebem uma spec formal em `docs/specs/`; ajustes pontuais de UI e
copy seguem processo leve, direto no código. A construção visual seguiu a
skill de design **Impeccable**: sistema de design documentado em
[`DESIGN.md`](DESIGN.md), com verificação automatizada de contraste,
Lighthouse e ausência de anti-padrões de "cara de IA" antes da entrega —
sem suíte de testes automatizados nesta fase (projeto sem lógica de negócio
no cliente, só apresentação de conteúdo real).

## Estado atual

- **Fase 1 — Redesign do site:** concluída. Next.js + TypeScript + Tailwind
  v4; todas as rotas reconstruídas com conteúdo real extraído do site
  anterior (NAP, CNPJ, serviços, diferenciais, aviso legal de correspondente
  bancário, política de privacidade) mais uma seção nova de perguntas
  frequentes (8 perguntas, aprovadas pelo cliente). Direção visual escolhida
  — "Registro", um sistema inspirado em documento oficial carimbado, com
  paleta extraída do próprio logo da empresa (indigo + amarelo) no lugar do
  azul/dourado genérico de site de consignado. Verificação: Lighthouse mobile
  93/100/100/100 (performance/acessibilidade/boas práticas/SEO) na Home e
  90+ nas demais rotas, contraste mínimo 4.5:1 medido (não estimado) em todo
  texto, zero erros de console, detector automático de anti-padrões da
  Impeccable sem nenhum apontamento. Logos dos bancos parceiros (Dígio,
  Daycoval, Banrisul, C6 Bank, BMG, Safra, VCTex, V8 Fintech) adicionadas
  depois que o cliente confirmou a lista, com fonte no site oficial de cada
  instituição ou no Wikimedia Commons.
- **Fase 2 — Widget de IA (integração real):** não iniciada. O que existe
  hoje é só o mock de frontend descrito acima
  (`src/components/home/AssistantCard.tsx`), com o ponto de integração já
  marcado no código.
- **Fase 3 — CRM:** não iniciada.

## Como rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # build de produção
npm run typecheck   # TypeScript sem emitir arquivos
```

Sem variáveis de ambiente nesta fase — não há integração externa.

## Onde mexer no conteúdo

Todo o texto de negócio está centralizado, sem copy espalhada pelos
componentes:

- **`src/lib/site.ts`** — NAP (nome, endereço, telefones, e-mail, horário,
  CNPJ) e o helper `whatsappLink()`.
- **`src/lib/content.ts`** — segmentos, serviços, diferenciais, FAQ, etapas,
  documentos e a lista de bancos parceiros (`partnerBanks`).
- **`src/lib/seo.ts`** — JSON-LD (`FinancialService`, `FAQPage`,
  `BreadcrumbList`).
- **`DESIGN.md`** — sistema visual completo (paleta, tipografia, formas,
  componentes); `.impeccable/design.json` é o sidecar técnico (sombras,
  motion, breakpoints, snippets).

## Licença / autoria

Construído por Lucas Santana (Vibe Digital) — um projeto freelancer real
para este cliente, e também parte do portfólio público de desenvolvimento
full-stack. Não publicado sob licença open-source.
