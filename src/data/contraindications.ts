import type { AccordionSection } from "../types";

export const CONTRAINDICATIONS: AccordionSection[] = [
  {
    id: "instabilidade",
    title: "Instabilidade clínica aguda",
    body: "Deterioração clínica geral em curso. Nesses cenários, priorize estabilização e reavaliação antes de progredir a mobilização.",
    bullets: [
      "Choque não controlado ou piora hemodinâmica progressiva",
      "Deterioração aguda de qualquer órgão que exija intervenção imediata",
      "Condição que, na avaliação da equipe, exija estabilização neste momento",
    ],
    source: { kind: "recommendation", refs: ["padis2018", "amib2019"] },
  },
  {
    id: "cardio",
    title: "Deterioração cardiovascular",
    body: "Alterações cardiovasculares novas ou não controladas pedem cautela e reavaliação; não são sentença permanente, mas indicam 'não progredir neste momento'.",
    bullets: [
      "Isquemia miocárdica ativa ou síndrome coronariana aguda não estabilizada",
      "Arritmias clinicamente relevantes não controladas",
      "Necessidade crescente de droga vasoativa ou instabilidade à mudança postural",
      "Insuficiência cardíaca descompensada com hipoperfusão",
    ],
    source: { kind: "consensus", refs: ["hodgson2014consensus"] },
  },
  {
    id: "resp",
    title: "Deterioração respiratória",
    body: "A ventilação mecânica isolada não impede a mobilização; a deterioração respiratória recente, sim, deve motivar reavaliação.",
    bullets: [
      "Piora aguda da oxigenação ou ventilação não compensada",
      "Aumento recente e importante do suporte respiratório",
      "Dessaturação persistente em repouso incompatível com atividade (avaliação individual)",
      "Drenos torácicos não funcionais ou pneumotórax não drenado: requer avaliação individual e planejamento",
    ],
    source: { kind: "consensus", refs: ["hodgson2014consensus", "amib2019"] },
  },
  {
    id: "neuro",
    title: "Alteração neurológica aguda",
    body: "Alterações neurológicas novas exigem reavaliação antes de progressão; pacientes sedados responsivos podem realizar atividades adaptadas.",
    bullets: [
      "Rebaixamento agudo do nível de consciência",
      "Hipertensão intracraniana não controlada ou risco iminente de hipertensão intracraniana: requer avaliação individual e cautela",
      "Crises convulsivas recentes não controladas",
      "Delirium hiperativo importante com risco para a segurança",
    ],
    source: { kind: "recommendation", refs: ["schaller2024", "amib2019"] },
  },
  {
    id: "cirurgia",
    title: "Procedimentos e cirurgias recentes",
    body: "Cirurgia recente não é contraindicação automática, mas exige liberação/orientação da equipe cirúrgica e adaptação da atividade.",
    bullets: [
      "Avaliar tipo de cirurgia, vias de acesso e fragilidade tecidual",
      "Respeitar orientações específicas sobre limites de movimento e carga",
      "Planejar proteção de feridas, curativos e drenos",
      "Requer avaliação individual e planejamento conjunto com a equipe",
    ],
    source: { kind: "consensus", refs: ["schaller2024"] },
  },
  {
    id: "ortopedia",
    title: "Restrições ortopédicas",
    body: "Restrições ortopédicas delimitam como mobilizar, não necessariamente se mobilizar.",
    bullets: [
      "Fraturas instáveis, fixações recentes e enxertos: respeitar segmento e posição restritos",
      "Protetores e órteses devem ser verificados antes e durante",
      "Mobilização pode ocorrer em cadeias não afetadas com orientação da equipe cirúrgica",
      "Requer planejamento específico por paciente",
    ],
  },
  {
    id: "dispositivos",
    title: "Dispositivos invasivos",
    body: "A presença de dispositivos invasivos não significa, isoladamente, que o paciente não possa ser mobilizado. Avalie fixação, segurança, equipe disponível e risco de deslocamento.",
    bullets: [
      "Tubo orotraqueal: confirmar fixação e posicionamento; equipe capaz de manejar o circuito",
      "Cateteres venosos centrais e arteriais: verificar fixação e planejar transporte de bolsas/linhas",
      "Sondas e drenos: fixar, drenar antes e monitorar durante",
      "Acesso venoso/arterial femoral: risco aumentado de deslocamento — requer avaliação individual e planejamento",
    ],
    source: { kind: "evidence", refs: ["amib2019", "schaller2024"] },
  },
  {
    id: "trsc",
    title: "Terapia renal substitutiva contínua",
    body: "Pacientes em TRSC podem ser mobilizados quando houver estabilidade hemodinâmica, circuito seguro e equipe que acompanhe.",
    bullets: [
      "Avaliar estabilidade hemodinâmica antes e durante",
      "Proteger cateter de hemodiálise e circuito extracorpóreo",
      "Considerar mobilização no leito quando a transferência não for segura",
      "Requer planejamento com a equipe de nefrologia/enfermagem",
    ],
  },
  {
    id: "ecmo",
    title: "ECMO e suportes avançados",
    body: "ECMO não é contraindicação absoluta à mobilização, mas caracteriza condição especial que exige estrutura e experiência.",
    bullets: [
      "Exige equipe treinada em manejo de cânulas e circuito",
      "Planejamento prévio do posicionamento e proteção das cânulas",
      "Ambiente com experiência em mobilização sob ECMO",
      "Interrupção imediata por qualquer sinal de instabilidade do circuito ou sangramento",
    ],
    source: { kind: "evidence", refs: ["schaller2024"] },
  },
  {
    id: "outros",
    title: "Outros cenários especiais",
    body: "Situações que pedem avaliação individual e comunicação com a equipe antes de progredir.",
    bullets: [
      "Hemorragia ativa ou coagulação gravemente alterada com risco de sangramento: requer avaliação individual",
      "Febre alta e mal-estar importante: reavaliar e considerar adiar a progressão",
      "Glicemia extremamente alterada com sintomas: estabilizar antes",
      "Recusa ou inquietação do paciente: respeitar e reprogramar",
    ],
  },
];

export const ABSOLUTE_NOTE =
  "Nenhum valor isolado deve definir a decisão. Avalie contexto clínico, tendência, resposta e risco-benefício.";
