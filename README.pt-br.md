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
2. **Um CRM** — produto separado
   ([`kll-promotora-crm`](https://github.com/asclada/kll-promotora-crm),
   repositório privado) para o pai e o filho acompanharem os leads
   qualificados, nos mesmos moldes do CRM já construído para outro cliente.
   **Schema e esqueleto do painel autenticado concluídos** (login, lista de
   clientes, arquivados, detalhe read-only da triagem); editar o funil de
   vendas pela UI (status, valor negociado, banco, observações) é um
   refinamento deliberadamente deixado pra depois, ainda não construído.
3. **Um widget de qualificação de leads por IA** — o card do hero conversa
   de verdade com o agente n8n agora (via um proxy sem estado neste
   repositório), que faz a triagem do lead (nome, tipo de vínculo, CPF,
   telefone) e grava direto no banco do CRM. **Concluído.**

**Este repositório é o site mais uma rota de API.** `src/app/api/chat` é um
proxy fino, do lado do servidor, para o webhook do n8n — nunca toca no banco
do CRM diretamente. Todo o resto da captação de leads no site continua sendo
um link `https://api.whatsapp.com/send?phone=...` com mensagem pré-preenchida,
igual ao comportamento do site anterior.

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

**Atual (widget → agente → CRM):**

```
Usuário
  │
  ▼
Site (Next.js, este repo)
  │
  │  POST /api/chat (proxy sem estado, N8N_WEBHOOK_URL só no servidor)
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
- **Fase 2 — CRM (schema + esqueleto do painel):** concluída, em
  [`kll-promotora-crm`](https://github.com/asclada/kll-promotora-crm)
  (repositório privado). Schema Supabase aplicado (`leads`/`profiles`,
  RLS, grants explícitos, constraint de conclusão da triagem) e painel
  Next.js autenticado funcionando ponta a ponta — login, lista de
  clientes, arquivados, detalhe read-only da triagem com ação de arquivar
  — testado com os 2 usuários reais. Editar o funil pela UI (status, valor
  negociado, banco, observações) e qualquer lógica do agente de IA ficam
  deliberadamente fora do escopo desta fase.
- **Fase 3 — Agente de triagem (n8n):** concluída, em
  [`kll-promotora-n8n-agent`](https://github.com/asclada/kll-promotora-n8n-agent)
  (repositório privado). Fluxo n8n adaptado do padrão já usado em outro
  agente de triagem, porém simplificado — coleta 4 dados (nome, tipo de
  vínculo, CPF, telefone) em até 5 turnos de conversa e grava direto na
  tabela `leads` do CRM (Fase 2), com guard estrutural no banco: só marca
  o lead como `aguardando_contato` quando CPF e telefone estão presentes
  e em formato válido. Testado manualmente via chamadas diretas ao
  webhook (duas conversas completas simuladas, incluindo nova tentativa
  após CPF em formato inválido). Ainda não conectado ao site — essa
  ligação é a Fase 4.
- **Fase 4 — Widget + integração:** concluída. O widget de chat
  (`src/components/home/AssistantCard.tsx`) agora conversa de verdade com
  o agente da Fase 3 através de um proxy sem estado (`src/app/api/chat`),
  no lugar do roteiro fixo. O `conversa_id` fica em `sessionStorage`, para
  um reload no meio da conversa retomar em vez de criar um lead duplicado.
  A resposta do webhook do agente ganhou um campo `concluida` (aplicado
  direto no workflow de produção via API REST do n8n) para o widget saber
  quando desabilitar o campo de envio e mostrar uma linha de confirmação
  simples — sem CTA de WhatsApp, já que o próximo passo é um atendente
  humano ligar de volta, não a pessoa continuar sozinha. Verificado ponta
  a ponta contra o agente em produção e o CRM da Fase 2, incluindo um
  timeout real do Gemini tratado sem quebrar a UI. Editar o funil de
  vendas pela UI do CRM continua sendo o fast-follow pendente da Fase 2,
  sem mudança.
- **Fase 5 — Deploy + QA (última fase):** concluída. Os três domínios de
  produção — `kllpromotora.com.br`, `www.kllpromotora.com.br` e
  `painel.kllpromotora.com.br` — apontam para os projetos certos na
  Vercel (site novo e CRM), todos com SSL válido. Descoberta no processo:
  a documentação anterior deste README descrevia o site em produção como
  "hospedado na Netlify" — isso nunca foi verdade; o domínio raiz já
  apontava para a Vercel desde a época em que o site era feito no
  Builder.io (stack anterior a esta). O cutover em si aconteceu majoritariamente
  do lado da Vercel (reatribuição de dono do domínio), mais dois registros
  `CNAME` dedicados na Cloudflare (`www` e `painel`) com o proxy da
  Cloudflare desligado (`DNS only`) nos três domínios — o que também
  corrigiu uma divergência em que a Cloudflare injetava seu próprio
  `robots.txt` só no domínio raiz. QA final rodado contra os domínios
  reais: Lighthouse mobile 91/100/100/100 na Home, as 11 rotas do site
  respondendo 200, widget do hero confirmado conversando com o agente n8n
  de produção, painel do CRM carregando a tela de login. Spec completa em
  [`docs/specs/fase5-cutover-dominio.md`](docs/specs/fase5-cutover-dominio.md).
  Pendência de código encontrada e registrada, não corrigida nesta fase
  (é conteúdo/metadata, não infraestrutura): a rota `/sobre` (e
  possivelmente outras) reaproveita o Open Graph da Home em vez de ter o
  próprio — fica para uma sessão futura de ajuste de SEO.

## Como rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # build de produção
npm run typecheck   # TypeScript sem emitir arquivos
```

Precisa da `N8N_WEBHOOK_URL` (ver `.env.example`) para o widget do
assistente falar com o agente de triagem real — sem ela, `/api/chat`
devolve 503 e o widget mostra uma mensagem de indisponibilidade em vez
de conversar.

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
