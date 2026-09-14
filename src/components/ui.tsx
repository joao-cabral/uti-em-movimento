import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import type { AccordionSection, FavoriteItem, SourceRef } from "../types";
import { REF_MAP } from "../data/references";
import { useFavorites } from "../hooks/useFavorites";

export function TopBar({
  title,
  onBack,
  favorite,
}: {
  title: string;
  onBack?: () => void;
  favorite?: FavoriteItem;
}) {
  return (
    <header className="topbar">
      {onBack ? (
        <button className="icon-btn" onClick={onBack} aria-label="Voltar">
          <ArrowLeft size={22} />
        </button>
      ) : (
        <span aria-hidden="true" />
      )}
      <strong>{title}</strong>
      {favorite ? (
        <FavoriteButton item={favorite} />
      ) : (
        <span aria-hidden="true" />
      )}
    </header>
  );
}

export function FavoriteButton({
  item,
  inline,
}: {
  item: FavoriteItem;
  inline?: boolean;
}) {
  const { isFavorite, toggle } = useFavorites();
  const state = isFavorite(item.id);

  return (
    <button
      className={inline ? "fav-inline" : "icon-btn"}
      onClick={(e) => {
        e.stopPropagation();
        toggle(item);
      }}
      aria-pressed={state}
      aria-label={state ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      title={state ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Star
        size={inline ? 18 : 22}
        fill={state ? "#ffd166" : "none"}
        color={state ? "#e0a800" : "currentColor"}
      />
    </button>
  );
}

export function SourceBadge({ source }: { source: SourceRef }) {
  const map: Record<SourceRef["kind"], string> = {
    evidence: "EVIDÊNCIA",
    recommendation: "RECOMENDAÇÃO",
    consensus: "CONSENSO",
  };
  return (
    <span className={`source-badge ${source.kind}`}>
      {map[source.kind]}
      {source.refs.length > 0 && (
        <span className="sr-only">
          {" "}
          — fontes: {source.refs.map((r) => REF_MAP[r]?.citation ?? r).join(" | ")}
        </span>
      )}
    </span>
  );
}

export function ReferenceList({ ids }: { ids: string[] }) {
  return (
    <ul className="ref-list">
      {ids.map((id) => {
        const ref = REF_MAP[id];
        if (!ref) return null;
        return (
          <li key={id}>
            {ref.url ? (
              <a href={ref.url} target="_blank" rel="noopener noreferrer">
                {ref.citation}
              </a>
            ) : (
              <span>{ref.citation}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Accordion({
  sections,
  idPrefix,
  allowMultiple = false,
}: {
  sections: AccordionSection[];
  idPrefix: string;
  allowMultiple?: boolean;
}) {
  const [open, setOpen] = useState<string[]>(
    sections.length > 0 ? [sections[0].id] : []
  );

  const toggle = (id: string) => {
    setOpen((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div>
      {sections.map((section) => {
        const isOpen = open.includes(section.id);
        return (
          <article className="accordion" key={section.id}>
            <div className="accordion-head">
              <button
                onClick={() => toggle(section.id)}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-${section.id}`}
              >
                <span>{section.title}</span>
                {isOpen ? (
                  <ChevronUp aria-hidden="true" />
                ) : (
                  <ChevronDown aria-hidden="true" />
                )}
              </button>
              {section.favorite && <FavoriteButton item={section.favorite} inline />}
            </div>
            {isOpen && (
              <div id={`${idPrefix}-${section.id}`} className="accordion-body">
                <p>{section.body}</p>
                {section.bullets && (
                  <ul>
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {section.source && (
                  <p className="accordion-source">
                    <SourceBadge source={section.source} />
                  </p>
                )}
                {section.source && section.source.refs.length > 0 && (
                  <details className="accordion-refs">
                    <summary>Fontes</summary>
                    <ReferenceList ids={section.source.refs} />
                  </details>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

export function Disclaimer({ text }: { text?: string }) {
  return (
    <div className="disclaimer" role="note">
      <strong>Apoio educacional.</strong>{" "}
      {text ??
        "Esta ferramenta possui finalidade educacional e não substitui a avaliação clínica individual nem a decisão da equipe assistencial."}
    </div>
  );
}

export function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.min(100, (step / total) * 100);
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Etapa ${step} de ${total}`}
    >
      <div style={{ width: `${pct}%` }} />
    </div>
  );
}

export function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <span className={checked ? "box checked" : "box"} aria-hidden="true">
      {checked && <Check size={14} strokeWidth={3} />}
    </span>
  );
}
