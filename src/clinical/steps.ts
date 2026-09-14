import type { AssessmentStep } from "../types";

export const TOTAL_STEPS = 6;

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  {
    id: "geral",
    group: 1,
    title: "Condição clínica geral",
    question:
      "O paciente apresenta instabilidade clínica aguda neste momento?",
    help: "Considere deterioração aguda, choque não controlado, alteração importante recente ou outra condição que exija estabilização antes da mobilização.",
    options: [
      {
        id: "estavel",
        label: "Não — condição clínica estável",
        hint: "Sem deterioração aguda identificada pela equipe.",
        flag: "none",
      },
      {
        id: "instavel",
        label: "Sim — há instabilidade aguda",
        hint: "Condição que exige estabilização antes de progredir a atividade.",
        flag: "stop",
      },
      {
        id: "confirmar",
        label: "Não sei / preciso confirmar",
        hint: "Converse com a equipe antes de decidir.",
        flag: "caution",
      },
    ],
  },
  {
    id: "cardio",
    group: 2,
    title: "Avaliação cardiovascular",
    question: "Qual cenário melhor descreve a condição cardiovascular agora?",
    help: "Considere: estabilidade hemodinâmica, tendência da pressão arterial, frequência cardíaca, arritmias clinicamente relevantes, sinais de hipoperfusão, uso e tendência da dose de drogas vasoativas.",
    notice:
      "O uso de vasopressor não representa, isoladamente, contraindicação absoluta. Avalie tendência hemodinâmica, perfusão, estabilidade e resposta ao tratamento.",
    options: [
      {
        id: "estavel",
        label: "Estável, sem droga vasoativa",
        hint: "Boa perfusão, sem arritmia relevante.",
        flag: "none",
      },
      {
        id: "vasoEstavel",
        label: "Vasoativo em dose estável ou em redução",
        hint: "Com boa perfusão e estabilidade hemodinâmica.",
        flag: "caution",
      },
      {
        id: "vasoCrescente",
        label: "Necessidade crescente de vasoativo",
        hint: "Dose em elevação ou piora hemodinâmica recente.",
        flag: "stop",
      },
      {
        id: "instavel",
        label: "Instabilidade atual",
        hint: "Hipoperfusão, arritmias clinicamente relevantes ou choque não controlado.",
        flag: "stop",
      },
      {
        id: "confirmar",
        label: "Preciso confirmar dados/tendências",
        flag: "caution",
      },
    ],
  },
  {
    id: "respSuporte",
    group: 3,
    title: "Avaliação respiratória",
    question: "Qual é o tipo de suporte respiratório utilizado?",
    notice:
      "A ventilação mecânica, isoladamente, não impede mobilização. A decisão depende da estabilidade clínica, suporte utilizado, segurança dos dispositivos e resposta do paciente.",
    options: [
      { id: "arAmbiente", label: "Ar ambiente", flag: "none" },
      { id: "cateter", label: "Cateter nasal / óculos", flag: "none" },
      { id: "mascara", label: "Máscara de oxigênio", flag: "none" },
      { id: "altoFluxo", label: "Oxigenoterapia de alto fluxo", flag: "none" },
      { id: "vni", label: "Ventilação não invasiva", flag: "none" },
      {
        id: "vmi",
        label: "Ventilação mecânica invasiva",
        hint: "Não é contraindicação isolada — avalie estabilidade, sincronia e segurança do tubo/dispositivos.",
        flag: "none",
      },
      {
        id: "ecmo",
        label: "Suporte avançado (ex.: ECMO)",
        hint: "Condição especial: exige equipe treinada, planejamento e ambiente com experiência.",
        flag: "caution",
        special:
          "ECMO: mobilização possível apenas com equipe treinada, planejamento prévio e ambiente com experiência.",
      },
      { id: "confirmar", label: "Não sei / preciso confirmar", flag: "caution" },
    ],
  },
  {
    id: "respEstabilidade",
    group: 3,
    title: "Avaliação respiratória",
    question:
      "Como está a estabilidade respiratória? (piora recente, aumento de suporte, sincronia, oxigenação, desconforto)",
    help: "Considere: estabilidade do suporte, piora recente, aumento importante de parâmetros, tolerância ao esforço, sincronia com ventilador (quando aplicável), oxigenação adequada ao quadro e desconforto respiratório.",
    options: [
      {
        id: "estavel",
        label: "Estável, sem piora recente",
        hint: "Oxigenação adequada ao quadro e boa tolerância.",
        flag: "none",
      },
      {
        id: "piora",
        label: "Piora recente ou aumento importante de suporte",
        hint: "Instabilidade respiratória nova.",
        flag: "stop",
      },
      {
        id: "confirmar",
        label: "Não sei / preciso confirmar",
        flag: "caution",
      },
    ],
  },
  {
    id: "neuro",
    group: 4,
    title: "Estado neurológico",
    question: "Qual descreve melhor o estado neurológico atual?",
    help: "Separe consciência, capacidade de seguir comandos e capacidade motora — sedação ou ventilação mecânica não significam, por si só, incapacidade de participar.",
    options: [
      {
        id: "alerta",
        label: "Alerta, orientado e segue comandos",
        flag: "none",
      },
      {
        id: "sedadoResponsivo",
        label: "Sedado, mas responsivo a estímulos/comandos",
        hint: "Pode participar de atividades adaptadas.",
        flag: "caution",
      },
      {
        id: "agitacao",
        label: "Agitação importante ou delírio",
        hint: "Risco para segurança; considerar triagem de delírio (ex.: CAM-ICU).",
        flag: "caution",
      },
      {
        id: "rebaixamento",
        label: "Rebaixamento neurológico agudo",
        hint: "Alteração nova de consciência ou sinal neurológico novo.",
        flag: "stop",
      },
      { id: "confirmar", label: "Não sei / preciso confirmar", flag: "caution" },
    ],
  },
  {
    id: "dispositivos",
    group: 5,
    title: "Dispositivos e restrições",
    question: "Quais dispositivos ou restrições estão presentes? (marque todos)",
    help: "A presença de dispositivos invasivos não significa, isoladamente, que o paciente não possa ser mobilizado. Avalie fixação, segurança, equipe disponível e risco de deslocamento.",
    multiple: true,
    exclusiveId: "nenhum",
    options: [
      { id: "nenhum", label: "Nenhum dispositivo ou restrição", flag: "none" },
      {
        id: "vm",
        label: "Ventilação mecânica",
        hint: "Verificar fixação do tubo, segurança do circuito e equipe.",
        flag: "none",
      },
      { id: "cvc", label: "Cateter venoso central", flag: "none" },
      { id: "arterial", label: "Cateter arterial", flag: "none" },
      { id: "sondas", label: "Sondas (entérica / vesical)", flag: "none" },
      { id: "drenos", label: "Drenos", flag: "none" },
      {
        id: "drenotoraxico",
        label: "Dreno torácico",
        hint: "Planejar manejo do sistema de drenagem durante a atividade.",
        flag: "caution",
      },
      {
        id: "femoral",
        label: "Acesso venoso arterial femoral",
        hint: "Risco de deslocamento — exige planejamento específico.",
        flag: "caution",
      },
      {
        id: "trsc",
        label: "Terapia renal substitutiva contínua",
        hint: "Avalie estabilidade, cateter e circuito durante a atividade.",
        flag: "caution",
      },
      {
        id: "ecmoDev",
        label: "ECMO",
        hint: "Condição especial: equipe treinada e ambiente com experiência.",
        flag: "caution",
        special:
          "ECMO: mobilização possível apenas com equipe treinada, planejamento prévio e ambiente com experiência.",
      },
      {
        id: "cirurgia",
        label: "Cirurgia ou procedimento recente",
        hint: "Requer liberação/orientação da equipe cirúrgica.",
        flag: "caution",
      },
      {
        id: "ortopedia",
        label: "Restrição ortopédica",
        hint: "Respeitar segmento/posição restritos e orientações específicas.",
        flag: "caution",
      },
      { id: "feridas", label: "Feridas ou curativos especiais", flag: "caution" },
      { id: "outros", label: "Outros dispositivos / situações", flag: "caution" },
      { id: "confirmar", label: "Não sei / preciso confirmar", flag: "caution" },
    ],
  },
  {
    id: "funcional",
    group: 6,
    title: "Capacidade funcional",
    question: "Qual é o nível funcional atual do paciente?",
    help: "Escolha o nível que o paciente REALIZA hoje com segurança — a estrutura abaixo relaciona-se à ICU Mobility Scale (IMS 0–10).",
    options: [
      {
        id: "cap_passiva",
        label: "1 · Mobilização passiva",
        hint: "Paciente sem participação ativa significativa.",
        flag: "none",
      },
      {
        id: "cap_ativoassistida",
        label: "2 · Mobilização ativo-assistida",
        hint: "Paciente participa parcialmente do movimento.",
        flag: "none",
      },
      {
        id: "cap_sedestacao",
        label: "3 · Sedestação",
        hint: "Consegue sentar com suporte ou à beira do leito.",
        flag: "none",
      },
      {
        id: "cap_transferencia",
        label: "4 · Transferência",
        hint: "Participa de transferência leito-poltrona.",
        flag: "none",
      },
      {
        id: "cap_ortostatismo",
        label: "5 · Ortostatismo",
        hint: "Consegue ficar em pé com assistência.",
        flag: "none",
      },
      {
        id: "cap_marcha",
        label: "6 · Marcha",
        hint: "Realiza passos ou deambulação.",
        flag: "none",
      },
    ],
  },
];
