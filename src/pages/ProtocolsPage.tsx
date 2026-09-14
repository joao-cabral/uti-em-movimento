import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { TopBar, SourceBadge, ReferenceList, FavoriteButton, Disclaimer } from "../components/ui";
import { PROTOCOL_LEVELS, PROGRESSION_PRINCIPLE } from "../data/protocols";
import type { FavoriteItem, Page } from "../types";

export default function ProtocolsPage({
  back,
  initialLevel,
}: {
  navigate: (page: Page) => void;
  back: () => void;
  initialLevel?: number;
}) {
  const [open, setOpen] = useState<number | undefined>(initialLevel);

  return (
    <main className="screen with-bottom">
      <TopBar
        title="Protocolos de Mobilização"
        onBack={back}
        favorite={{ id: "page-protocolos", label: "Protocolos de Mobilização", page: "protocolos" }}
      />
      <section className="content">
        <p className="intro">
          Progressão funcional em 9 níveis. O objetivo nunca é atingir imediatamente o
          maior nível possível, e sim seguir o princípio:
        </p>
        <div className="progression-principle">{PROGRESSION_PRINCIPLE}</div>

        <div className="stack">
          {PROTOCOL_LEVELS.map((level) => {
            const isOpen = open === level.id;
            const fav: FavoriteItem = {
              id: `protocolo-${level.id}`,
              label: `Nível ${level.id} — ${level.name}`,
              page: "protocolos",
            };
            return (
              <article className="accordion" key={level.id}>
                <div className="accordion-head">
                  <button
                    onClick={() => setOpen(isOpen ? undefined : level.id)}
                    aria-expanded={isOpen}
                    aria-controls={`proto-${level.id}`}
                  >
                    <span>
                      <strong className="level-num">Nível {level.id}</strong>{" "}
                      {level.name}
                    </span>
                  </button>
                  <FavoriteButton item={fav} inline />
                </div>
                {isOpen && (
                  <div id={`proto-${level.id}`} className="accordion-body">
                    <p className="muted">{level.short}</p>
                    <p className="ims-chip" role="note">
                      Referência aproximada na ICU Mobility Scale: {level.imsRange}{" "}
                      <a
                        href="https://www.monash.edu/__data/assets/pdf_file/0010/933985/icu_mobility_scale.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Abrir ICU Mobility Scale oficial em nova aba"
                      >
                        escala oficial <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    </p>
                    <p>
                      <strong>Objetivo:</strong> {level.objective}
                    </p>
                    <dl className="protocol-details">
                      {level.details.map((d) => (
                        <div key={d.label}>
                          <dt>{d.label}</dt>
                          <dd>{d.text}</dd>
                        </div>
                      ))}
                    </dl>
                    {level.source && (
                      <p className="accordion-source">
                        <SourceBadge source={level.source} />
                      </p>
                    )}
                    {level.source && level.source.refs.length > 0 && (
                      <details className="accordion-refs">
                        <summary>Fontes</summary>
                        <ReferenceList ids={level.source.refs} />
                      </details>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <Disclaimer text="A seleção de nível deve considerar a capacidade atual do paciente, não um alvo ideal. Progressão real exige tolerância demonstrada e decisão da equipe." />
      </section>
    </main>
  );
}
