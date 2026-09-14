import { ClipboardCheck, Activity, NotebookPen } from "lucide-react";
import { TopBar, Accordion, SourceBadge, ReferenceList, FavoriteButton } from "../components/ui";
import { MONITOR_PHASES, KEY_ALERT, STOP_SIGNS } from "../data/monitoring";
import type { AccordionSection, Page } from "../types";

const ICONS = { before: ClipboardCheck, during: Activity, after: NotebookPen };

export default function MonitoringPage({
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  const stopSection: AccordionSection[] = [
    {
      ...STOP_SIGNS,
      favorite: { id: "monit-sinais", label: STOP_SIGNS.title, page: "monitorizacao" },
    },
  ];

  return (
    <main className="screen with-bottom">
      <TopBar
        title="Monitorização e Segurança"
        onBack={back}
        favorite={{ id: "page-monitorizacao", label: "Monitorização e Segurança", page: "monitorizacao" }}
      />
      <section className="content">
        <p className="intro">
          Monitorização estruturada em três momentos: <strong>antes</strong> da sessão,{" "}
          <strong>durante</strong> a atividade e <strong>após</strong> a mobilização.
        </p>

        <div className="note danger" role="alert">
          <span>
            <strong>Atenção:</strong> {KEY_ALERT}{" "}
            <SourceBadge source={{ kind: "consensus", refs: ["hodgson2014consensus"] }} />
          </span>
        </div>

        <div className="phase-grid">
          {MONITOR_PHASES.map((phase) => {
            const Icon = ICONS[phase.icon];
            return (
              <article className="phase-card" key={phase.id}>
                <header>
                  <Icon aria-hidden="true" />
                  <h2>{phase.title}</h2>
                  <FavoriteButton
                    item={{ id: `monit-${phase.id}`, label: `Monitorização — ${phase.title}`, page: "monitorizacao" }}
                    inline
                  />
                </header>
                <p className="muted">{phase.intro}</p>
                <ul className="check-list">
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <Accordion sections={stopSection} idPrefix="stop" allowMultiple />

        <details className="accordion-refs">
          <summary>Referências de segurança</summary>
          <ReferenceList ids={["hodgson2014consensus", "schaller2024", "padis2018"]} />
        </details>
      </section>
    </main>
  );
}
