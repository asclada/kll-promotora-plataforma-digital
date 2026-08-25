# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, deploy na Vercel — stack obrigatória do padrão Vibe Digital para sites de cliente (prompt master de sites institucionais), não é escolha específica deste cliente. Sem backend nesta fase: o card do agente de IA de triagem no hero (ver seção Capabilities) é apenas frontend (mock/placeholder de integração); a lógica real do agente fica fora deste repositório.

## Users

Quatro públicos, todos buscando crédito consignado:

- **Trabalhadores CLT** — segmento de lançamento, deve aparecer primeiro na apresentação dos segmentos.
- **Servidores públicos (SIAPE)** — federais, estaduais e municipais.
- **Aposentados e pensionistas do INSS** — público mais sensível/receoso de golpes; maior necessidade de sinais de confiança cedo na página.
- **Militares das Forças Armadas.**

Job comum: conseguir crédito consignado com as menores taxas, processo rápido e sem burocracia, com segurança percebida contra fraude.

## Product Purpose

Redesign completo do site institucional da KLL Promotora — correspondente bancário — para gerar leads qualificados de crédito consignado via WhatsApp/formulário. Nova estrutura de seções baseada no layout/interação do site de referência (Nomad Group), preservando o conteúdo real e a identidade textual já existente da KLL.

## Positioning

Correspondente bancário autorizado (não é instituição financeira, não concede crédito diretamente — intermedia propostas junto a bancos parceiros autorizados pelo Banco Central), especializado nos 4 públicos acima, com 20+ anos de mercado e atendimento humano/personalizado — em vez do atendimento genérico de banco.

## Operating Context

- Site atual em produção: kllpromotora.com.br (stack atual: React + Vite + Tailwind, hospedado via Netlify — **não é a stack alvo do redesign**, serve só como fonte de conteúdo real).
- Empresa pequena/familiar — operada por pai e filho.
- Captação de lead primária: clique que abre WhatsApp com mensagem pré-formatada (não há chat/backend real ainda) e formulário de contato.
- Horário de atendimento: segunda a sexta 08:30–18h, sábado 09h–14h.
- Regulação: atuação como correspondente bancário sujeita a regras do Banco Central do Brasil.

## Capabilities and Constraints

- Como correspondente bancário, a empresa **não realiza operação de crédito diretamente** — apenas intermedia propostas com bancos parceiros. O site não pode dar a entender que a KLL é uma instituição financeira.
- **Card do agente de IA no hero:** conforme spec estrutural (`/referencias/redesign-home-kll.md`), o hero tem um card que, ao clique em "Simule seu empréstimo agora", se transforma no mesmo espaço num widget de chat estilo WhatsApp. **Escopo deste projeto: só frontend/UI** (card fechado → transição → interface de chat). A lógica de triagem por IA em si já existe ou será construída em outro projeto — aqui não há integração real de backend/IA.
- Barra de logos de bancos parceiros com scroll automático contínuo — bancos específicos ainda não informados (pendente).
- Site atual não tem seção de FAQ nem depoimentos — ver Evidence on Hand.

## Brand Commitments

- Nome: **KLL Promotora**. CNPJ: **07.814.164/0001-00**.
- Logo já existe (em uso no header/footer do site atual).
- **Decisão explícita do cliente:** não usar fotos reais da equipe — a empresa é só pai e filho e eles preferem manter uso de banco de imagens (stock) em vez de aparecer. Isso é uma exceção deliberada à regra padrão de "nunca substituir foto de pessoa real por imagem genérica" — aqui não existe pessoa real a fotografar por escolha do cliente, não por falta de acesso.
- Tom de marca: sério porém acolhedor — não tão formal quanto um site jurídico (definido em `/referencias/redesign-home-kll.md`).

## Evidence on Hand

Extraído do código-fonte do site atual (`/referencias/kll-promotora-main.zip`, extraído em `/referencias/kll-atual-extracted/`) — conteúdo real, não inventado:

- **NAP confirmado pelo cliente:** CNPJ 07.814.164/0001-00; endereço Rua Omar Medeiros, 946, Alecrim, Natal–RN; telefones (84) 99467-9028 e (84) 99183-4548; e-mail contato@kllpromotora.com.br.
- **Prova social real (únicos dados confirmados):** "mais de 5 mil clientes atendidos" e "20+ anos de experiência no mercado". Não há depoimentos nominais nem outras credenciais — não inventar.
- **Serviços reais:**
  - Crédito Consignado — taxas a partir de 1,20% a.m., prazos até 96 meses, sem consulta SPC/Serasa, liberação rápida.
  - Portabilidade de Crédito — redução de parcela, troco na operação, unificação de dívidas.
  - Cartão Consignado — margem adicional de 5%, sem anuidade, pagamento mínimo descontado em folha.
- **Diferenciais ("Por que escolher a KLL"):** melhores taxas, liberação em até 24h, total segurança (sem taxa antecipada), atendimento VIP.
- **Texto legal real já existente**, reaproveitar/adaptar no redesign:
  - Página "Aviso de Correspondente Bancário": atuação como correspondente autorizado conforme regulamentação do Banco Central; não é instituição financeira; intermedia propostas com bancos parceiros autorizados pelo BC; condições/taxas informadas antes da contratação, constam nos contratos emitidos pelas instituições financeiras.
  - Página "Política de Privacidade" já existe no código atual.
- **FAQ (aprovado pelo cliente em 2026-08-25):** não existia no site atual; abaixo o texto final aprovado, mín. 6 perguntas cobrindo os 4 públicos.
  1. Quem pode contratar crédito consignado com a KLL? Servidores públicos federais, estaduais e municipais (SIAPE), militares das Forças Armadas, aposentados e pensionistas do INSS, e trabalhadores CLT.
  2. A KLL é um banco? Não. A KLL Promotora é correspondente bancário autorizado pelo Banco Central — intermediamos propostas junto a bancos parceiros, que são os responsáveis pela análise e concessão do crédito.
  3. Quais as taxas do crédito consignado? A partir de 1,20% ao mês, variando conforme o perfil e o banco parceiro.
  4. Em quanto tempo o dinheiro cai na conta? Normalmente, entre 24 e 48 horas após a aprovação do crédito.
  5. Preciso de garantia ou fiador? Não. O desconto é feito diretamente na folha de pagamento ou benefício, o que dispensa fiador.
  6. A contratação consulta o SPC/Serasa? Não, no crédito consignado.
  7. Quais documentos preciso enviar? Último contracheque ou extrato de consignações, documento de identificação (RG ou CNH) e comprovante de residência.
  8. O que é portabilidade de crédito e vale a pena? É trazer um empréstimo de um banco para outro banco com taxas melhores — normalmente reduz a parcela mensal e ainda libera um valor extra (troco) na operação.
- **Fotos reais:** não haverá nesta fase — decisão explícita do cliente (ver Brand Commitments).
- **Documentação necessária pro processo de crédito (usar em página "Como Funciona" se mantida):** último contracheque e extrato de consignações, RG ou CNH, comprovante de residência.
- **Referências para este redesign:**
  - Estrutura/interação: `/referencias/nomadgroup_io.html` (nomadgroup.io) — usar só como referência de layout/hierarquia, nunca copiar HTML/CSS/classes.
  - Spec estrutural da home: `/referencias/redesign-home-kll.md`.
  - Conteúdo/copy real: `/referencias/kll-atual-extracted/kll-promotora-main/` (código do site atual).

## Product Principles

1. Confiança institucional antes de conversão — o público mais sensível (aposentados INSS, receosos de golpe) precisa de sinais de legitimidade cedo na página (logos de bancos parceiros, CNPJ, avisos legais visíveis).
2. Transparência regulatória sempre visível — nunca dar a entender que a KLL é banco; deixar clara a natureza de correspondente bancário.
3. Reduzir fricção sem parecer invasivo — captação por clique intencional do usuário (o chat do hero não abre sozinho, não é modal), não formulário longo por padrão.
4. CLT é o segmento de lançamento — priorizar esse público na ordem de apresentação dos segmentos, sem excluir os demais três.
5. Conteúdo real acima de polimento visual — nunca inventar prova social, depoimento, número ou credencial que não conste em Evidence on Hand.

## Accessibility & Inclusion

Público inclui pessoas idosas (aposentados/pensionistas do INSS) — atenção redobrada a tamanho de fonte, contraste (mín. 4.5:1) e clareza de linguagem, evitando jargão financeiro sem explicação.
