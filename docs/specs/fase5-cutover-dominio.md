# Fase 5 — Cutover de domínio e checklist final

**Status:** concluído (2026-08-31)
**Repositórios envolvidos:** `kll-promotora-website-redesign` (este) e
`kll-promotora-crm` (privado)

## Por que precisa de spec formal

Esta mudança atende a dois critérios do processo COMPLETO definido no
`CLAUDE.md` deste projeto: mexe em mais de um repositório (site + CRM) e tem
risco real de quebrar algo em produção — o domínio `kllpromotora.com.br`
está no ar e recebendo leads reais hoje. Um DNS mal configurado tira o site
do ar para o cliente.

## Estado atual

**Correção importante (2026-08-31):** a documentação anterior deste projeto
(README, PRODUCT.md) descrevia o site em produção como "hospedado na
Netlify". Isso está **incorreto** — nunca existiu domínio `.netlify.app`
para a KLL (confirmado por Lucas). O que realmente aconteceu: o registro
`A` do domínio raiz na Cloudflare já apontava para `76.76.21.21` (IP da
própria Vercel) desde a era em que o site era feito no Builder.io (que
também roda na Vercel) — a Netlify nunca chegou a ser o destino real do
DNS. Este trecho será corrigido no README/PRODUCT.md ao fechar a fase.

- **Camada de DNS real: Cloudflare, não o Registro.br.** O domínio está
  registrado no Registro.br, mas os nameservers já estão delegados à
  Cloudflare (`clyde.ns.cloudflare.com` / `katelyn.ns.cloudflare.com`).
  Os registros individuais (`A`, `CNAME`, `MX`) se editam no dashboard da
  Cloudflare (`dash.cloudflare.com`), não no editor de zona do Registro.br
  — que só segue dono do registro do domínio (mesmo padrão documentado no
  cutover do projeto Hélio Advocacia).
- **Levantamento da zona DNS em `dash.cloudflare.com` (2026-08-31,
  print em `referencias/dns-cloudflare.png`):**
  | Registro | Tipo | Valor | Proxy |
  |---|---|---|---|
  | `kllpromotora.com.br` (`@`) | `A` | `76.76.21.21` (Vercel) | Proxied |
  | `kllpromotora.com.br` (`@`) | `CAA` | `0 issue "letsencrypt.org"` | DNS only |
  | `*.kllpromotora.com.br` | `CNAME` | `cname.vercel-dns.com` | Proxied |
  | `www.kllpromotora.com.br` | `CNAME` | `da023e8748a12240.vercel-dns-017.com` | DNS only |
  | `kllpromotora.com.br` (`@`) | `MX` ×3 | `route1/2/3.mx.cloudflare.net` | DNS only |
  | `cf2024-1._domainkey`, `_dmarc`, `@` | `TXT` (DKIM/DMARC/SPF) | — | DNS only |

  O `@` já resolve para a Vercel (`A` existente) e existe um **wildcard**
  (`*.kllpromotora.com.br`) que também aponta para a Vercel — cobre
  qualquer subdomínio sem registro próprio. E-mail é servido via
  **Cloudflare Email Routing** (os `MX`/DKIM/DMARC/SPF) — nunca tocar
  nesses registros, o cutover não depende deles.
- Site novo (este repo) está em produção na Vercel, em URL `.vercel.app`,
  projeto `kll-promotora-website-redesign` (`prj_rgGxMXfxumJdolJHDtUY5VNqX7RP`).
- CRM está em produção na Vercel, em `kll-promotora-crm.vercel.app`.
- O código deste repo já assume o domínio final — `site.url` em
  [`src/lib/site.ts`](../../src/lib/site.ts), `metadataBase` em
  [`src/app/layout.tsx`](../../src/app/layout.tsx), sitemap e robots.txt —
  então o cutover não exige nenhuma mudança de código, só configuração de
  infraestrutura.

## Objetivo

1. `kllpromotora.com.br` (+ `www`) passa a servir este site (Next.js/Vercel)
   no lugar do site antigo (Netlify).
2. `painel.kllpromotora.com.br` passa a servir o CRM
   (`kll-promotora-crm.vercel.app`).
3. Checklist final de QA/portfólio rodado contra os domínios reais antes de
   considerar a Fase 5 (e o projeto) concluída.

## Fora de escopo

- Qualquer mudança de código neste repositório ou no CRM.
- Editar o funil de vendas pela UI do CRM (fast-follow já registrado como
  pendente desde a Fase 2 — não faz parte deste cutover).
- Remover o projeto Vercel antigo (Builder.io) ou os registros DNS
  residuais dele — fica de standby, sem tráfego, não atrapalha nada.

## Plano de execução

Ordem escolhida por risco crescente: primeiro o que é novo e não quebra
nada existente, por último o registro que está servindo o site em produção
agora.

### 0. Cuidado antes de editar qualquer registro na Cloudflare

Antes de mexer em `dash.cloudflare.com` → zona `kllpromotora.com.br` → DNS
→ Records, revisar a lista completa de registros existentes:

- **Nunca tocar em registros `MX`** — o e-mail `contato@kllpromotora.com.br`
  provavelmente depende deles.
- Registros residuais do Builder.io (era a stack original do site, antes
  da Netlify) podem existir e não precisam ser removidos nesta fase — só
  não confundir com os registros que de fato precisamos editar (`@`,
  `www`, e o novo `painel`).
- Qualquer registro não reconhecido: confirmar com Lucas antes de editar
  ou apagar.

Cada registro na Cloudflare tem um status de proxy (ícone de nuvem): para
todos os registros que passam a apontar para a Vercel, o status precisa
ficar **DNS only (nuvem cinza)** — se ficar **Proxied (nuvem laranja)**, a
Vercel não consegue verificar o domínio nem emitir o certificado SSL
automaticamente, e o domínio fica preso em "Invalid Configuration".

### 1. `www.kllpromotora.com.br` → site novo — CONCLUÍDO (2026-08-31)

1. Adicionado `kllpromotora.com.br` + `www.kllpromotora.com.br` ao projeto
   `kll-promotora-website-redesign` na Vercel. A Vercel perguntou se devia
   **transferir o domínio** de um projeto Vercel antigo que já o possuía —
   esse projeto antigo era o site em Builder.io (também rodava na Vercel).
   Confirmado que sim.
2. Efeito colateral esperado (registro `A` do `@` já apontava para a
   Vercel, ver "Estado atual"): o **domínio raiz também virou o site novo
   imediatamente**, sem precisar editar o registro `A` — só a
   reatribuição de dono dentro da Vercel foi suficiente. Isto adiantou o
   que seria o passo 3 original desta spec.
3. `www`: precisou de um registro dedicado — o valor genérico
   (`cname.vercel-dns.com`) proxied deu erro **"Proxy Detected"** na
   Vercel (ela não consegue verificar/emitir SSL atrás do proxy da
   Cloudflare). Resolvido criando/editando o `CNAME` de `www` com o valor
   específico que a Vercel forneceu
   (`da023e8748a12240.vercel-dns-017.com`) e proxy status **DNS only**.
4. Verificado: `kllpromotora.com.br` e `www.kllpromotora.com.br` com SSL
   válido, servidos pela Vercel (`Server: Vercel`), e o widget do hero
   conversando de verdade com o agente n8n no domínio real (ver seção
   "Smoke test" abaixo — já parcialmente executado).

### 2. `painel.kllpromotora.com.br` → CRM — CONCLUÍDO (2026-08-31)

O wildcard existente (`*.kllpromotora.com.br` → Vercel, Proxied) não
bastou sozinho — deu "Proxy Detected" ao adicionar o domínio no projeto do
CRM na Vercel, mesmo tentativa. Resolvido com o mesmo padrão do `www`:
criado `CNAME` dedicado `painel` na Cloudflare, valor específico fornecido
pela Vercel (`2bac017a3ce672cb.vercel-dns-017.com`), proxy status **DNS
only**. Verificado: `Valid Configuration` na Vercel, `painel.kllpromotora.com.br`
respondendo 307 → `/login`, servido pela Vercel, SSL válido, console sem
erros.

### 3. Ajuste extra: desproxiar o `@` (raiz) — CONCLUÍDO (2026-08-31)

Achado durante o smoke test: com o `A` do `@` ainda **Proxied**, a
Cloudflare injetava seu próprio `robots.txt` "gerenciado" (recurso de
Content Signals / AI Crawl Control) por cima do que o app realmente serve
— só no domínio raiz, não no `www` (que já estava DNS only). O
`robots.txt` da Cloudflare não referenciava o `sitemap.xml` do site.
Decisão: trocar o `A` do `@` também para **DNS only**, deixando o
comportamento idêntico ao `www`/`painel` — a Vercel já tem proteção
própria contra bot/DDoS, então não há perda real de segurança. Verificado
pós-mudança: `kllpromotora.com.br/robots.txt` agora servido direto pela
Vercel (`Server: Vercel`), conteúdo correto, `Sitemap:` apontando certo.

### 4. Smoke test pós-cutover (ponta a ponta, contra os domínios reais)

- [x] `https://kllpromotora.com.br` carrega o site novo, sem redirect
      indevido, com certificado válido. (308 → `www`, `Server: Vercel`.)
- [x] `https://www.kllpromotora.com.br` redireciona corretamente para o
      apex (ou serve o mesmo conteúdo, conforme configurado). (Serve 200
      direto, é o destino canônico do redirect do apex.)
- [x] Widget do hero (`AssistantCard`) conversa com o agente n8n de
      verdade e grava lead no CRM — testado no domínio real: agente
      respondeu pedindo nome/vínculo/CPF/telefone (não enviamos dado real
      de teste para não sujar o CRM com lead falso).
- [x] `https://painel.kllpromotora.com.br` carrega o login do CRM. Login
      dos 2 usuários reais fica por conta deles (não temos a senha).
- [x] `/sitemap.xml` e `/robots.txt` respondem com o domínio novo (não
      `.vercel.app`), consistente entre apex e `www` após o passo 3.

### 5. Checklist final de QA/portfólio

- [x] Lighthouse mobile na Home contra o domínio real
      (`www.kllpromotora.com.br`): Performance 91, Acessibilidade 100,
      Boas práticas 100, SEO 100 — em linha com o que a Fase 1 já reportava
      contra `.vercel.app`. Não repetido rota a rota (custo/benefício —
      nenhuma mudança de código nesta fase, só infraestrutura).
- [x] Nenhum link quebrado — todas as 11 rotas retornam HTTP 200 no
      domínio real (`/`, `/sobre`, `/servicos` + 3 sub-rotas,
      `/como-funciona`, `/perguntas-frequentes`, `/contato`,
      `/aviso-de-correspondente`, `/politica-privacidade`).
- [x] Metadados sociais (Open Graph/Twitter card) presentes e com o
      domínio final. **Achado, não corrigido (fora de escopo — é código,
      não infra):** `/sobre` (e possivelmente outras rotas internas)
      reaproveita `og:title`/`og:description`/`og:url` da Home em vez de
      metadata própria da página. Registrar como pendência para uma
      sessão futura de ajuste de SEO/metadata.
- [x] Console sem erros — verificado na Home e em `/servicos`.
- [ ] Formulário/CTA de WhatsApp com número e mensagem corretos em todas as
      rotas que o usam — não testado nesta fase (sem mudança de código
      que afetasse isso; já validado em fases anteriores).
- [ ] Aviso de correspondente bancário e política de privacidade acessíveis
      a partir do footer em todas as páginas — não testado nesta fase pelo
      mesmo motivo acima.

## Plano de rollback

Não existe um "site antigo na Netlify" para reverter — essa era uma
suposição errada da documentação anterior (ver "Estado atual"). Se algo
quebrar após a mudança de DNS (site fora do ar, certificado não emitido,
erro 500 generalizado):

1. Na Vercel, projeto `kll-promotora-website-redesign` → Settings →
   Domains → reatribuir `kllpromotora.com.br`/`www` de volta ao projeto
   antigo (Builder.io), que ainda existe e detinha o domínio antes de hoje
   — reverte o efeito da transferência sem precisar mexer em DNS de novo.
2. Se o problema for específico do registro `www` (o único DNS
   efetivamente editado nesta fase), reverter o `CNAME` de `www` na
   Cloudflare para o valor anterior.
3. O registro `painel` (novo) pode simplesmente ser removido, sem afetar
   nada pré-existente.
4. Investigar a causa raiz antes de tentar o cutover de novo.

## Quem executa o quê

- **DNS (Cloudflare) e domínios (Vercel):** Lucas, manualmente, seguindo o
  passo a passo do Claude Code no chat. Tentativa de usar a extensão
  Claude in Chrome (para o Claude navegar direto no Chrome já logado do
  Lucas) não funcionou nesta sessão — extensão não conectada — então a
  execução ficou manual, com o Claude guiando cada etapa.
- **Smoke test e checklist de QA:** Claude Code auxilia rodando os testes
  automatizáveis (Lighthouse, links, sitemap/robots, cliques reais no
  widget via navegador) contra os domínios reais conforme cada etapa
  propaga.

## Fechamento

**Concluído em 2026-08-31.** Os três domínios (`kllpromotora.com.br`,
`www.kllpromotora.com.br`, `painel.kllpromotora.com.br`) servem os
projetos corretos na Vercel, todos com SSL válido e `DNS only` (sem
proxy da Cloudflare no meio). Smoke test e checklist de QA rodados contra
os domínios reais — ver seções 4 e 5.

### Technical Outcome

Cutover de domínio completo, sem nenhuma mudança de código — o app já
assumia o domínio final desde antes desta fase. Dos 3 domínios, o `@`
(raiz) já resolvia para a Vercel por herança da era Builder.io e virou o
site novo só com a reatribuição de dono do domínio dentro da Vercel; `www`
e `painel` precisaram de registros `CNAME` dedicados na Cloudflare
(valores específicos por domínio, não o genérico `cname.vercel-dns.com`),
com proxy desligado (`DNS only`) para a Vercel conseguir verificar e
emitir SSL. Ajuste adicional: o `A` do `@`, que ainda estava `Proxied`,
foi trocado para `DNS only` também, para eliminar uma divergência que a
Cloudflare introduzia (robots.txt "gerenciado" dela sobrepondo o do app
só no domínio raiz). QA rodado contra os domínios reais: Lighthouse
91/100/100/100 na Home, 11/11 rotas em HTTP 200, widget do hero
confirmado conversando com o agente n8n de produção, CRM com login
carregando. Achado registrado mas não corrigido nesta fase: metadata
Open Graph de `/sobre` (e possivelmente outras rotas) reaproveita a da
Home em vez de ser própria da página — pendência de código para sessão
futura.

### Learning Outcome

Quando um domínio já teve uma stack anterior na mesma plataforma de deploy
(aqui, Builder.io também rodava na Vercel), o registro DNS pode já
apontar para o destino certo há muito tempo — o "cutover" real acontece
inteiramente do lado da Vercel (reatribuir o domínio de um projeto para
outro), sem tocar em DNS algum. Isso inverteu a ordem de risco que a spec
original previa (apex por último) — o apex foi, na prática, o primeiro a
mudar, como efeito colateral de aceitar a transferência de domínio. Outro
aprendizado: um domínio atrás de proxy da Cloudflare (nuvem laranja) pode
quebrar a verificação de domínio da Vercel de duas formas diferentes — um
erro explícito ("Proxy Detected", quando a Vercel enxerga *algum* CNAME
mas não consegue verificá-lo) e um efeito silencioso (a Cloudflare
sobrepondo `robots.txt` mesmo com o domínio já `Valid Configuration`) — o
segundo só apareceu ao testar o conteúdo de verdade, não bastou olhar o
status da Vercel.
