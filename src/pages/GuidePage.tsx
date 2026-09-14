import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, TriangleAlert } from "lucide-react";
import { TopBar, FavoriteButton } from "../components/ui";
import { GUIDE_STEPS, GUIDE_ATTENTION, GUIDE_RULE, GUIDE_SEAL } from "../data/guide";
import type { Page } from "../types";

export default function GuidePage({
  navigate,
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <main className="screen with-bottom">
      <TopBar
        title="Guia Prático"
        onBack={back}
        favorite={{ id: "page-guia", label: "Guia Prático para Mobilização", page: "guia" }}
      />
      <section className="content">
        <p className="guide-seal">{GUIDE_SEAL}</p>
        <h2 className="page-title">Guia Prático para Mobilização</h2>
        <p className="intro">
          Orientações rápidas para preparar, executar e acompanhar a mobilização do
          paciente crítico.
        </p>

        <div className="stack">
          {GUIDE_STEPS.map((step) => {
            const isOpen = open === step.id;
            return (
              <article className="accordion" key={step.id}>
                <div className="accordion-head">
                  <button
                    onClick={() => setOpen(isOpen ? null : step.id)}
                    aria-expanded={isOpen}
                    aria-controls={`guide-${step.id}`}
                  >
                    <span>
                      <strong className="guide-number">{step.number}</strong> {step.title}
                      {!isOpen && <em className="guide-short">{step.short}</em>}
                    </span>
                    {isOpen ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
                  </button>
                  <FavoriteButton
                    item={{ id: `guia-${step.id}`, label: `Guia — ${step.title}`, page: "guia" }}
                    inline
                  />
                </div>
                {isOpen && (
                  <div id={`guide-${step.id}`} className="accordion-body">
                    <p>{step.body}</p>
                    {step.bullets && (
                      <ul className="check-list">
                        {step.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="note warning attention-card" role="alert">
          <TriangleAlert size={22} aria-hidden="true" />
          <span>
            <strong>ATENÇÃO</strong>
            <p>{GUIDE_ATTENTION}</p>
          </span>
        </div>

        <div className="summary-box">
          <div>
            <strong>Regra prática</strong>
            <div className="plan-flow" aria-label="Regra prática em seis passos">
              {GUIDE_RULE.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
          </div>
        </div>

        <button className="primary-btn" onClick={() => navigate("avaliacao")}>
          Iniciar Avaliação do Paciente <ArrowRight size={19} aria-hidden="true" />
        </button>
      </section>
    </main>
  );
}
