/**
 * All copy in this file comes from the client's live site or from PRODUCT.md
 * (client-approved on 2026-08-25). Nothing here is invented. Claims that the
 * client has not confirmed — partner bank names above all — are marked
 * `pendente` rather than filled in.
 */

export type Segment = {
  slug: string;
  /** Label on the selectable row. */
  name: string;
  /** The regime, spelled out — the audience uses these words, not "segmento". */
  qualifier: string;
  headline: string;
  body: string;
  /** The single fact that answers this segment's own first objection. */
  proof: string;
  image: { src: string; alt: string };
  whatsapp: string;
};

/** Order is fixed by the client: CLT is the launch segment and leads. */
export const segments: Segment[] = [
  {
    slug: "clt",
    name: "Trabalhador CLT",
    qualifier: "Carteira assinada, iniciativa privada",
    headline: "O consignado de quem tem carteira assinada",
    body: "A modalidade mais nova do mercado. O desconto vai direto na folha de pagamento da empresa, e é isso que derruba a taxa: você paga muito menos do que pagaria no cheque especial ou no cartão de crédito.",
    proof: "Liberação rápida — normalmente entre 24 e 48 horas após a aprovação.",
    image: {
      src: "/images/consignado-clt.jpg",
      alt: "Mulher sorridente usando headset atende clientes em um escritório, com colegas de trabalho ao fundo.",
    },
    whatsapp: "Olá! Sou trabalhador CLT e quero simular um empréstimo consignado.",
  },
  {
    slug: "servidor-publico",
    name: "Servidor público",
    qualifier: "Federal, estadual ou municipal (SIAPE)",
    headline: "Quem conhece a margem do servidor negocia melhor",
    body: "Atendemos servidores federais, estaduais e municipais, ativos e inativos. Cada órgão tem uma regra de margem e um conjunto de bancos conveniados — conhecer essa tabela é o que separa uma proposta boa de uma proposta comum.",
    proof: "Prazos de até 120 meses, conforme o convênio do seu órgão.",
    image: {
      src: "/images/servidor-publico.jpg",
      alt: "Duas profissionais analisando painéis com plantas e anotações em um escritório.",
    },
    whatsapp: "Olá! Sou servidor público e quero simular um empréstimo consignado.",
  },
  {
    slug: "inss",
    name: "Aposentado ou pensionista",
    qualifier: "Beneficiários do INSS",
    headline: "Sem consulta ao SPC/Serasa, sem taxa antecipada",
    body: "O desconto sai direto do benefício, então o banco não precisa consultar seu nome. É a modalidade com as menores taxas do mercado para quem recebe o benefício do INSS.",
    proof: "Nome negativado não impede a contratação do consignado do INSS.",
    image: {
      src: "/images/aposentado-pensionista.jpg",
      alt: "Casal de idosos sorridente, sentados juntos em casa.",
    },
    whatsapp: "Olá! Sou aposentado/pensionista do INSS e quero simular um empréstimo consignado.",
  },
  {
    slug: "militares",
    name: "Militar das Forças Armadas",
    qualifier: "Exército, Marinha e Aeronáutica",
    headline: "Condições próprias do regime militar",
    body: "Militares da ativa, da reserva e reformados têm regras de consignação diferentes das do servidor civil, com prazos mais longos disponíveis em parte dos bancos parceiros. Analisamos a sua ficha antes de indicar qualquer proposta.",
    proof: "Atendimento nacional — o processo é feito online, de onde você estiver.",
    image: {
      src: "/images/militar-forcas-armadas.jpg",
      alt: "Fileira de militares em uniforme de gala perfilados com espadas em um estádio, à noite.",
    },
    whatsapp: "Olá! Sou militar das Forças Armadas e quero simular um empréstimo consignado.",
  },
];

export type Service = {
  slug: string;
  title: string;
  /** SEO title without the brand — the layout template appends it. */
  metaTitle: string;
  /** 150-160 characters, measured. */
  metaDescription: string;
  /** What the person gets, in one line. */
  outcome: string;
  description: string;
  /** Rows in the conditions table. Figures are the client's, verbatim. */
  conditions: { label: string; value: string }[];
  highlights: string[];
  whatsapp: string;
};

export const services: Service[] = [
  {
    slug: "credito-consignado",
    title: "Crédito Consignado",
    metaTitle: "Crédito Consignado em Natal RN",
    metaDescription:
      "O dinheiro mais barato para quem tem folha de pagamento. Taxa a partir de 1,20% a.m., prazo até 120 meses e sem consulta ao SPC. Simule em Natal/RN agora.",
    outcome: "O dinheiro mais barato disponível para quem tem folha de pagamento.",
    description:
      "A modalidade mais barata do mercado. O desconto é feito diretamente na folha de pagamento ou no benefício, o que reduz o risco para o banco — e é o risco menor que derruba a sua taxa.",
    conditions: [
      { label: "Taxa", value: "a partir de 1,20% a.m." },
      { label: "Prazo", value: "até 120 meses" },
      { label: "Consulta SPC/Serasa", value: "não há" },
      { label: "Garantia ou fiador", value: "não é exigido" },
    ],
    highlights: [
      "Taxas a partir de 1,20% a.m.",
      "Prazos de até 120 meses",
      "Sem consulta ao SPC/Serasa",
      "Liberação rápida",
    ],
    whatsapp: "Olá! Gostaria de simular um Crédito Consignado.",
  },
  {
    slug: "portabilidade",
    title: "Portabilidade de Crédito",
    metaTitle: "Portabilidade de Crédito em Natal RN",
    metaDescription:
      "Traga o seu empréstimo para um banco com taxa menor: a parcela cai e ainda sobra troco na operação. Portabilidade de crédito em Natal/RN com a KLL Promotora.",
    outcome: "A mesma dívida, em outro banco, com parcela menor.",
    description:
      "É trazer um empréstimo que você já tem de um banco para outro banco com taxas melhores. Normalmente reduz a parcela mensal e ainda libera um valor extra — o troco — na operação.",
    conditions: [
      { label: "Parcela mensal", value: "reduz" },
      { label: "Troco na operação", value: "sim, quando há margem" },
      { label: "Dívidas em vários bancos", value: "podem ser unificadas" },
      { label: "Processo", value: "100% digital" },
    ],
    highlights: [
      "Redução da parcela mensal",
      "Dinheiro extra (troco)",
      "Unificação de dívidas",
      "Processo 100% digital",
    ],
    whatsapp: "Olá! Gostaria de simular uma Portabilidade de Crédito.",
  },
  {
    slug: "cartao-consignado",
    title: "Cartão Consignado",
    metaTitle: "Cartão Consignado em Natal RN",
    metaDescription:
      "Margem adicional de 5%, sem anuidade e com pagamento mínimo descontado em folha. Cartão consignado para servidores e aposentados com a KLL Promotora.",
    outcome: "Uma margem a mais, além da margem do empréstimo.",
    description:
      "Cartão de crédito exclusivo para servidores e aposentados, com margem adicional de 5% e taxas muito inferiores às dos cartões comuns. O pagamento mínimo é descontado em folha.",
    conditions: [
      { label: "Margem adicional", value: "5%" },
      { label: "Anuidade", value: "não há" },
      { label: "Pagamento mínimo", value: "descontado em folha" },
      { label: "Compras internacionais", value: "aceitas" },
    ],
    highlights: [
      "Sem anuidade",
      "Pagamento mínimo descontado em folha",
      "Compras internacionais",
    ],
    whatsapp: "Olá! Gostaria de simular um Cartão Consignado.",
  },
];

/** "Por que escolher a KLL Promotora" — the four differentials from the live site. */
export const differentials = [
  {
    title: "Melhores taxas",
    description:
      "Negociamos as menores taxas de juros do mercado para o seu perfil, comparando o que cada banco parceiro tem a oferecer.",
  },
  {
    title: "Liberação rápida",
    description:
      "Dinheiro na conta entre 24 e 48 horas após a aprovação do crédito, quando o banco parceiro conclui a análise.",
  },
  {
    title: "Total segurança",
    description:
      "Processo transparente e sem taxas antecipadas. A KLL Promotora não cobra nada de você antes da liberação do crédito.",
  },
  {
    title: "Atendimento VIP",
    description:
      "Consultores especialistas dedicados a encontrar a melhor solução — a mesma pessoa acompanha você do começo ao fim.",
  },
];

/** FAQ approved by the client on 2026-08-25. Do not edit without approval. */
export const faq = [
  {
    q: "Quem pode contratar crédito consignado com a KLL Promotora?",
    a: "Servidores públicos federais, estaduais e municipais (SIAPE), militares das Forças Armadas, aposentados e pensionistas do INSS, e trabalhadores CLT.",
  },
  {
    q: "A KLL Promotora é um banco?",
    a: "Não. A KLL Promotora é correspondente bancário autorizado pelo Banco Central — intermediamos propostas junto a bancos parceiros, que são os responsáveis pela análise e concessão do crédito.",
  },
  {
    q: "Quais as taxas do crédito consignado?",
    a: "A partir de 1,20% ao mês, variando conforme o perfil e o banco parceiro.",
  },
  {
    q: "Em quanto tempo o dinheiro cai na conta?",
    a: "Normalmente, entre 24 e 48 horas após a aprovação do crédito.",
  },
  {
    q: "Preciso de garantia ou fiador?",
    a: "Não. O desconto é feito diretamente na folha de pagamento ou benefício, o que dispensa fiador.",
  },
  {
    q: "A contratação consulta o SPC/Serasa?",
    a: "Não, no crédito consignado.",
  },
  {
    q: "Quais documentos preciso enviar?",
    a: "Último contracheque ou extrato de consignações, documento de identificação (RG ou CNH) e comprovante de residência.",
  },
  {
    q: "O que é portabilidade de crédito e vale a pena?",
    a: "É trazer um empréstimo de um banco para outro banco com taxas melhores — normalmente reduz a parcela mensal e ainda libera um valor extra (troco) na operação.",
  },
];

/** The four steps, from the live site's "Como Funciona". */
export const steps = [
  {
    title: "Solicitação",
    description:
      "Você fala com a gente pelo WhatsApp ou pelo nosso assistente virtual. É rápido e sem compromisso — nesta etapa nada é contratado.",
    who: "Você",
  },
  {
    title: "Análise",
    description:
      "Nossos consultores analisam seu perfil e sua margem, e buscam as melhores ofertas nos bancos parceiros.",
    who: "KLL",
  },
  {
    title: "Simulação",
    description:
      "Apresentamos as propostas com valor, taxa e prazo lado a lado. Você escolhe a que cabe no seu orçamento — ou não escolhe nenhuma.",
    who: "Você decide",
  },
  {
    title: "Aprovação e liberação",
    description:
      "Depois do envio dos documentos e da formalização digital, o banco parceiro aprova e o dinheiro cai na sua conta entre 24 e 48 horas.",
    who: "Banco parceiro",
  },
];

export const documents = [
  "Último contracheque ou extrato de consignações",
  "Documento de identificação (RG ou CNH)",
  "Comprovante de residência",
];

/**
 * PENDING: the client has not sent the list of partner banks yet.
 * These are neutral placeholders, deliberately not real bank names.
 * Replace the array with the real institutions when the list arrives.
 */
export const partnerBanksPending = [
  "Banco parceiro 01",
  "Banco parceiro 02",
  "Banco parceiro 03",
  "Banco parceiro 04",
  "Banco parceiro 05",
  "Banco parceiro 06",
  "Banco parceiro 07",
  "Banco parceiro 08",
];
