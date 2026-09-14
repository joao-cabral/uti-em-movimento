export type Page =
  | "home"
  | "referencial"
  | "quando"
  | "avaliacao"
  | "protocolos"
  | "contraindicacoes"
  | "monitorizacao"
  | "guia"
  | "materiais"
  | "fluxo"
  | "registro"
  | "buscar"
  | "favoritos"
  | "perfil";

export interface NavParams {
  protocolLevel?: number;
  fromAssessment?: boolean;
}

export type Risk = "green" | "yellow" | "red";
export type Flag = "none" | "caution" | "stop";
export type SourceKind = "evidence" | "recommendation" | "consensus";

export interface SourceRef {
  kind: SourceKind;
  refs: string[];
}

export interface StepOption {
  id: string;
  label: string;
  hint?: string;
  flag: Flag;
  special?: string;
}

export type StepId =
  | "geral"
  | "cardio"
  | "respSuporte"
  | "respEstabilidade"
  | "neuro"
  | "dispositivos"
  | "funcional";

export interface AssessmentStep {
  id: StepId | string;
  group: number;
  title: string;
  question: string;
  help?: string;
  notice?: string;
  options: StepOption[];
  multiple?: boolean;
  exclusiveId?: string;
}

export type AnswerValue = string | string[];
export type AnswerMap = Record<string, AnswerValue>;

export interface Classification {
  risk: Risk;
  stops: { step: string; text: string }[];
  cautions: { step: string; text: string }[];
  unknowns: string[];
  specialDevices: string[];
  capacityOptionId?: string;
}

export interface FavoriteItem {
  id: string;
  label: string;
  page: Page;
}

export interface AccordionSection {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  source?: SourceRef;
  favorite?: FavoriteItem;
}

export interface ProtocolDetail {
  label: string;
  text: string;
}

export interface ProtocolLevel {
  id: number;
  name: string;
  short: string;
  imsRange: string;
  objective: string;
  details: ProtocolDetail[];
  source?: SourceRef;
}

export interface MaterialItem {
  id: string;
  category: string;
  title: string;
  description: string;
  url?: string;
  citation?: string;
}

export interface ReferenceItem {
  id: string;
  citation: string;
  kind: string;
  url?: string;
}

export interface SearchEntry {
  id: string;
  title: string;
  text: string;
  category: string;
  page: Page;
}

export interface SessionRecord {
  id: string;
  createdAt: string;
  risk: Risk;
  level: string;
  tolerance: string;
  events: string;
  nextPlan: string;
}
