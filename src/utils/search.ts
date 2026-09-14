import type { Page, SearchEntry } from "../types";
import { THEORETICAL } from "../data/theoretical";
import { CONTRAINDICATIONS } from "../data/contraindications";
import { PROTOCOL_LEVELS } from "../data/protocols";
import { GUIDE_STEPS } from "../data/guide";
import { MATERIALS } from "../data/materials";
import { REFERENCES } from "../data/references";
import { MONITOR_PHASES, STOP_SIGNS } from "../data/monitoring";

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

let index: SearchEntry[] | null = null;

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const push = (
    id: string,
    title: string,
    text: string,
    category: string,
    page: Page
  ) => entries.push({ id, title, text, category, page });

  THEORETICAL.forEach((s) =>
    push(`ref-${s.id}`, s.title, s.body, "Referencial Teórico", "referencial")
  );
  CONTRAINDICATIONS.forEach((s) =>
    push(
      `contra-${s.id}`,
      s.title,
      `${s.body} ${s.bullets?.join(" ") ?? ""}`,
      "Contraindicações e Precauções",
      "contraindicacoes"
    )
  );
  PROTOCOL_LEVELS.forEach((l) =>
    push(
      `prot-${l.id}`,
      `Nível ${l.id} — ${l.name}`,
      `${l.short} ${l.objective} ${l.details.map((d) => `${d.label}: ${d.text}`).join(" ")}`,
      "Protocolos de Mobilização",
      "protocolos"
    )
  );
  GUIDE_STEPS.forEach((g) =>
    push(`guia-${g.id}`, g.title, `${g.short} ${g.body}`, "Guia Prático", "guia")
  );
  MONITOR_PHASES.forEach((p) =>
    push(`monit-${p.id}`, `Monitorização — ${p.title}`, `${p.intro} ${p.items.join(" ")}`, "Monitorização e Segurança", "monitorizacao")
  );
  push(
    `monit-${STOP_SIGNS.id}`,
    STOP_SIGNS.title,
    `${STOP_SIGNS.body} ${STOP_SIGNS.bullets?.join(" ") ?? ""}`,
    "Monitorização e Segurança",
    "monitorizacao"
  );
  MATERIALS.forEach((m) =>
    push(m.id, m.title, m.description, "Materiais de Apoio", "materiais")
  );
  REFERENCES.forEach((r) =>
    push(r.id, r.citation.slice(0, 120), `${r.kind} ${r.citation}`, "Referências", "materiais")
  );

  return entries;
}

export function searchAll(term: string): SearchEntry[] {
  if (!index) index = buildIndex();
  const needle = normalize(term.trim());
  if (needle.length < 2) return [];
  const words = needle.split(/\s+/);
  return index
    .filter((entry) => {
      const hay = normalize(`${entry.title} ${entry.text} ${entry.category}`);
      return words.every((w) => hay.includes(w));
    })
    .slice(0, 40);
}
