# CLAUDE.md — KLL Promotora (Redesign do Site Institucional)

Este arquivo define como devo trabalhar neste projeto especificamente.
Ele complementa (e não substitui) as regras globais em `~/.claude/CLAUDE.md`,
que continuam valendo aqui sem precisar ser repetidas.

## 1. Visão geral do projeto

Este projeto constrói o **redesign do site institucional da KLL Promotora**,
correspondente bancário especializado em crédito consignado, composto por:

1. **Website institucional (Next.js)** — site público de captação de leads
   para os quatro públicos atendidos (CLT, servidores públicos/SIAPE,
   aposentados/pensionistas INSS, militares), com estrutura de rotas
   separadas e o card de agente de IA no hero conversando de verdade com
   o agente de triagem via proxy (ver seção 8 e `PRODUCT.md`).

> Nota: o CRM continua sendo um repositório separado
> (`kll-promotora-crm`), mas este repositório **não é mais só frontend**
> — `src/app/api/chat` é uma rota de API real (proxy sem estado para o
> webhook do n8n). Ver seção 8.

## 2. Idioma

- Código, commits, specs e demais artefatos técnicos: **inglês**.
- Explicações e comunicação no chat: **português**.

## 3. Especificações antes de mudanças grandes

Mudanças significativas (nova funcionalidade, alteração de schema, nova
integração) devem ter uma spec formal em `docs/specs/` antes da
implementação — seguindo o mesmo padrão já usado no projeto (ex:
`docs/specs/fase2-nome-da-mudanca.md`).

Ajustes pequenos, correções de bug pontuais e tweaks de estilo não
precisam de spec — ver critério de processo COMPLETO vs LEVE na seção 10.

## 4. Git e GitHub

- Aprovação explícita antes de qualquer commit — sempre, sem exceção.
- Padrão de mensagem: Conventional Commits (`feat:`, `fix:`, `chore:`,
  `docs:`, `style:`) em português.

## 5. Estrutura de fases: Technical Outcome

Toda fase do roadmap, ao ser fechada, deve declarar:

- **Technical Outcome** — o que foi tecnicamente entregue.

## 6. Estilo de explicação técnica

Sempre explicar o porquê por trás de decisões de arquitetura. Definir
termos técnicos novos na primeira vez que aparecem. Evitar jargão sem
contexto.

## 7. Conteúdo para LinkedIn

Quando solicitado explicitamente, posso sinalizar ou ajudar a escrever
sobre um momento, decisão ou aprendizado interessante do projeto. Não
sinalizo nem escrevo proativamente — apenas mediante pedido.

## 8. Stack e Architecture

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
  (classes utilitárias exclusivamente, sem CSS inline/solto).
  Componentização obrigatória (Header, Hero, Sections, Footer — nunca
  página monolítica). Deploy: Vercel. Otimização de imagem via
  `next/image`.
- **Rotas** (obrigatoriamente separadas, nunca âncora numa página só):
  `/`, `/sobre`, `/servicos` (com possíveis sub-rotas por produto),
  `/contato`, `/como-funciona`, `/aviso-de-correspondente`,
  `/politica-privacidade`.
- **Design**: skill **Impeccable** obrigatória durante toda a construção
  (init já rodado nesta sessão, `PRODUCT.md` criado). Rodar `/impeccable
  audit` e `/impeccable polish` antes de qualquer entrega marcada como
  "pronta para avaliação".
- **Conteúdo de referência** (pasta `/referencias/`, não faz parte do
  código de produção): spec estrutural da home (`redesign-home-kll.md`),
  referência de layout/interação (`nomadgroup_io.html` — só estrutura,
  nunca copiar HTML/CSS/classes) e código-fonte do site atual
  (`kll-promotora-main.zip` / `kll-atual-extracted/`) — usado como fonte
  de conteúdo real (textos, NAP, avisos legais), nunca copiado
  diretamente para o novo stack.
- **Agente de IA do hero**: real desde a Fase 4. O card
  (`src/components/home/AssistantCard.tsx`) conversa com o agente de
  triagem n8n através de `src/app/api/chat` — um proxy sem estado do lado
  do servidor (`N8N_WEBHOOK_URL` só no servidor, nunca exposto ao
  cliente). A lógica de triagem em si (fluxo n8n) mora no repositório
  separado `kll-promotora-n8n-agent`, e a gravação de leads acontece
  direto no banco do CRM (`kll-promotora-crm`) — este repositório nunca
  toca no banco do CRM diretamente.
- **Integração entre camadas**: site → proxy (`/api/chat`, este repo) →
  workflow n8n (repo externo) → banco do CRM (repo externo). Ver
  diagrama em `README.pt-br.md` → "Arquitetura".
- **Domínio de produção**: `kllpromotora.com.br` / `www` (este site) e
  `painel.kllpromotora.com.br` (CRM) — cutover feito na Fase 5, DNS na
  Cloudflare, domínios na Vercel. Detalhes em
  `docs/specs/fase5-cutover-dominio.md`.

## 9. Última atualização

2026-08-31

## 10. Processo de desenvolvimento — COMPLETO vs LEVE

Use o processo **COMPLETO** (spec formal em `docs/specs/` + implementação
revisada) quando a mudança se encaixar em pelo menos um destes critérios:

- Mexe em mais de um repositório (ex: site + CRM, ou CRM + banco).
- Altera o contrato entre componentes (ex: payload de webhook, schema de
  tabela, contrato de autenticação).
- Tem risco real de quebrar algo em produção se der errado (ex: mudança em
  RLS, em fluxo de pagamento, em auth).
- Envolve uma decisão de arquitetura ou trade-off que vale a pena
  documentar para o futuro.

Para tudo mais — ajustes de UI, correções de bug pontuais, pequenos ajustes
de copy, mudanças isoladas em um componente, tweaks de estilo — use o
processo **LEVE**:

- Descreva o problema/ajuste desejado direto no chat, sem necessidade de
  spec formal.
- Implemente diretamente.
- Teste manualmente (visual ou funcional) — não é obrigatório escrever
  teste automatizado novo para ajustes triviais.
- Commit seguindo Conventional Commits, sem handoff formal — a aprovação
  explícita antes do commit continua valendo sempre.

Se ficar em dúvida sobre qual processo usar, pergunte antes de começar em
vez de assumir.

## 11. Relatório semanal para KLL Promotora

Toda sexta-feira, envie ao cliente um relatório curto do que foi entregue
na semana (segunda a sexta).

**Onde:** pasta local de relatórios semanais, fora deste repositório —
material comercial/administrativo, não faz parte do código-fonte. Um
arquivo por semana, nomeado pela data da segunda-feira daquela semana —
ex: `2026-08-24-relatorio-semanal.md`. Se o arquivo da semana corrente
ainda não existir, crie a partir do modelo de seções definido abaixo.

**Estrutura de seções (adaptar nomes/quantidade por projeto, mantendo a
lógica):**

- Seções de entrega técnica (ex: Sistemas, IA e Automação, Manutenção) —
  preenchidas a partir do que foi feito na sessão ou relatado pelo
  desenvolvedor.
- Seções de dados de negócio (ex: Resultados, Tráfego) — **sempre ficam em
  branco no modelo**, propositalmente, para preenchimento manual antes do
  envio. Não são dados que nascem de uma sessão de código.

**Quando adicionar uma linha:** ao concluir, nesta sessão, uma entrega que
se enquadraria no processo COMPLETO ou LEVE da seção 10 (qualquer mudança
real — não cada pequeno passo intermediário). Também vale para trabalho
feito fora da sessão (ex: configuração manual em dashboard, ajuste direto
em workflow de automação) — registre com base no que for relatado na
conversa.

**Como escrever:** frase curta, direta, em português simples, sem jargão
técnico — o destinatário é o cliente, não necessariamente um
desenvolvedor. Descreva o que mudou e por que importa, não como foi
implementado.

**Multi-repo:** se o projeto tiver mais de um repositório (ex: site +
CRM), a mesma regra deve existir no `CLAUDE.md` de cada repositório
envolvido, e todos alimentam o mesmo arquivo semanal. (Não aplicável no
momento — projeto single-repo.)

**Fora do escopo desta regra:** consolidação de relatório mensal (feita
manualmente, juntando as semanas).
