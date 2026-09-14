import type { AccordionSection } from "../types";

export interface PhaseCard {
  id: string;
  title: string;
  icon: "before" | "during" | "after";
  intro: string;
  items: string[];
}

export const MONITOR_PHASES: PhaseCard[] = [
  {
    id: "antes",
    title: "Antes",
    icon: "before",
    intro: "Preparar é decidir com segurança. Reúna informação e recursos antes de iniciar.",
    items: [
      "Estado clínico geral e tendência das últimas horas",
      "Nível de consciência e capacidade de seguir comandos",
      "Suporte respiratório utilizado e sua estabilidade",
      "Estabilidade cardiovascular, perfusão e tendência de drogas vasoativas",
      "Dispositivos invasivos: fixação, segurança e risco de deslocamento",
      "Objetivo da sessão definido e registrado",
      "Nível funcional atual (base para escolher a atividade)",
      "Equipe necessária disponível e material preparado",
    ],
  },
  {
    id: "durante",
    title: "Durante",
    icon: "during",
    intro: "A vigilância contínua permite interromper cedo, antes de um evento maior.",
    items: [
      "Resposta clínica global e sintomas referidos (dispneia, dor, tontura, fraqueza)",
      "Tolerância ao esforço e fadiga muscular",
      "Padrão respiratório, sincronia com o ventilador e oxigenação",
      "Estabilidade cardiovascular: tendência de PA, FC e perfusão",
      "Nível de consciência e comportamento durante a atividade",
      "Segurança e posicionamento dos dispositivos e linhas",
      "Progressão apenas após estabilidade sustentada",
    ],
  },
  {
    id: "apos",
    title: "Após",
    icon: "after",
    intro: "O registro fecha o ciclo e alimenta a próxima decisão.",
    items: [
      "Atividade realizada e tempo/duração",
      "Nível de assistência fornecido",
      "Tolerância e sinais vitais na recuperação",
      "Intercorrências, mesmo as leves",
      "Nível funcional atingido (ex.: referência à ICU Mobility Scale)",
      "Resposta clínica completa após o fim da atividade",
      "Planejamento documentado da próxima sessão",
    ],
  },
];

export const KEY_ALERT =
  "Se ocorrer deterioração clínica nova durante a atividade, reduza ou interrompa a progressão e reavalie.";

export const STOP_SIGNS: AccordionSection = {
  id: "sinais-interrupcao",
  title: "Sinais para reduzir ou interromper imediatamente",
  body: "São sinais gerais aceitos em protocolos e no consenso internacional; os parâmetros numéricos de cada instituição devem ser seguidos com prioridade.",
  bullets: [
    "Queda da saturação de O2 progressiva ou dessaturação importante mantida",
    "Aumento importante do desconforto respiratório ou perda de sincronia",
    "Alteração nova da frequência cardíaca, arritmia nova ou instabilidade circulatória",
    "Alteração aguda do nível de consciência, tontura intensa ou lipotimia",
    "Dor torácica, sudorese fria ou palidez importante",
    "Deslocamento de dispositivos críticos (tubo orotraqueal, cânulas, acessos)",
  ],
  source: { kind: "consensus", refs: ["hodgson2014consensus"] },
};
