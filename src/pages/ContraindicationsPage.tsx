import { AlertTriangle } from "lucide-react";
import { TopBar, Accordion } from "../components/ui";
import { CONTRAINDICATIONS, ABSOLUTE_NOTE } from "../data/contraindications";
import type { AccordionSection, Page } from "../types";

const sections: AccordionSection[] = CONTRAINDICATIONS.map((s) => ({
  ...s,
  favorite: { id: `contra-${s.id}`, label: s.title, page: "contraindicacoes" as const },
}));

export default function ContraindicationsPage({
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  return (
    <main className="screen with-bottom">
      <TopBar
        title="Contraindicações e Precauções"
        onBack={back}
        favorite={{ id: "page-contraindicacoes", label: "Contraindicações e Precauções", page: "contraindicacoes" }}
      />
      <section className="content">
        <p className="intro">
          Estrutura de referência para decidir <strong>quando não progredir</strong>,{" "}
          <strong>quando ter cautela</strong> e <strong>quando planejar com equipe</strong>.
          Nenhum valor isolado deve definir a decisão.
        </p>

        <div className="note warning" role="note">
          <AlertTriangle size={20} aria-hidden="true" />
          <span>{ABSOLUTE_NOTE}</span>
        </div>

        <Accordion sections={sections} idPrefix="contra" allowMultiple />

        <div className="note info">
          <span>
            Preferimos linguagem não absoluta: <em>reavaliar</em>, <em>não progredir
            neste momento</em>, <em>requer precaução</em>, <em>requer avaliação
            individual</em>, <em>requer planejamento multiprofissional</em>.
          </span>
        </div>
      </section>
    </main>
  );
}
