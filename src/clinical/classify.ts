import { ASSESSMENT_STEPS } from "./steps";
import type { AnswerMap, Classification, Risk } from "../types";

const optionById = new Map(
  ASSESSMENT_STEPS.flatMap((step) =>
    step.options.map((opt) => [`${step.id}:${opt.id}`, { step, opt }] as const)
  )
);

function labelsFor(stepId: string, value: string | string[] | undefined) {
  if (value === undefined) return [];
  const ids = Array.isArray(value) ? value : [value];
  return ids
    .map((id) => optionById.get(`${stepId}:${id}`))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
}

export const CAPACITY_TO_LEVEL: Record<string, { level: number; label: string }> = {
  cap_passiva: { level: 1, label: "Mobilização passiva" },
  cap_ativoassistida: { level: 2, label: "Exercícios ativo-assistidos" },
  cap_sedestacao: { level: 4, label: "Sedestação" },
  cap_transferencia: { level: 6, label: "Transferência para poltrona" },
  cap_ortostatismo: { level: 7, label: "Ortostatismo" },
  cap_marcha: { level: 8, label: "Marcha estacionária / deambulação" },
};

export function isAnswerComplete(stepId: string, answers: AnswerMap): boolean {
  const step = ASSESSMENT_STEPS.find((s) => s.id === stepId);
  if (!step) return false;
  const value = answers[stepId];
  if (step.multiple) return Array.isArray(value) && value.length > 0;
  return typeof value === "string" && value.length > 0;
}

export function classify(answers: AnswerMap): Classification {
  const stops: Classification["stops"] = [];
  const cautions: Classification["cautions"] = [];
  const unknowns: string[] = [];
  const specialDevices: string[] = [];

  for (const step of ASSESSMENT_STEPS) {
    for (const { step: s, opt } of labelsFor(step.id, answers[step.id])) {
      const text = opt.id === "confirmar" ? `${s.title}: informação ainda não confirmada.` : opt.label;
      if (opt.flag === "stop") stops.push({ step: s.title, text });
      else if (opt.flag === "caution") cautions.push({ step: s.title, text });
      if (opt.id === "confirmar") unknowns.push(s.title);
      if (opt.special) specialDevices.push(opt.special);
    }
  }

  const capacity = typeof answers.funcional === "string" ? answers.funcional : undefined;
  const risk: Risk = stops.length > 0 ? "red" : cautions.length > 0 ? "yellow" : "green";

  return { risk, stops, cautions, unknowns, specialDevices, capacityOptionId: capacity };
}

export const RESULT_META: Record<
  Risk,
  { label: string; title: string; description: string }
> = {
  green: {
    label: "VERDE",
    title: "Condições compatíveis com mobilização progressiva",
    description:
      "Não foram identificados fatores relevantes de instabilidade nos critérios avaliados. Isso não é uma 'liberação' automática: confirme com a equipe, inicie pela capacidade atual do paciente e progrida conforme tolerância, com monitorização.",
  },
  yellow: {
    label: "AMARELO",
    title: "Mobilização requer precauções ou avaliação individual",
    description:
      "Foram identificados fatores que exigem adaptação, confirmação ou monitorização intensificada. A atividade pode ser possível com planejamento e equipe adequados — a decisão deve ser individualizada com a equipe multiprofissional.",
  },
  red: {
    label: "VERMELHO",
    title: "Reavaliar antes de progredir",
    description:
      "Foram identificados fatores que indicam necessidade de estabilização/reavaliação antes de progredir neste momento. Não significa contraindicação permanente: reavalie após estabilização e discussão com a equipe assistencial.",
  },
};
