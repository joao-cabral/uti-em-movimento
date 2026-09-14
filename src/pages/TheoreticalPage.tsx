import { BookOpenCheck } from "lucide-react";
import { TopBar, Accordion, SourceBadge, FavoriteButton } from "../components/ui";
import { THEORETICAL, THEORETICAL_SUMMARY } from "../data/theoretical";
import type { AccordionSection, FavoriteItem, Page } from "../types";

const sections: AccordionSection[] = THEORETICAL.map((section) => ({
  ...section,
  favorite: {
    id: `ref-${section.id}`,
    label: section.title,
    page: "referencial" as const,
  },
}));

export default function TheoreticalPage({
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  const pageFav: FavoriteItem = {
    id: "page-referencial",
    label: "Referencial Teórico",
    page: "referencial",
  };

  return (
    <main className="screen with-bottom">
      <TopBar title="Referencial Teórico" onBack={back} favorite={pageFav} />
      <section className="content">
        <p className="intro">
          Fundamentos da fisioterapia intensiva aplicada à mobilização precoce do
          paciente crítico adulto. Cada conteúdo traz a natureza da fonte:{" "}
          <SourceBadge source={{ kind: "evidence", refs: [] }} /> = suporte direto de
          estudos; <SourceBadge source={{ kind: "recommendation", refs: [] }} /> =
          diretriz; <SourceBadge source={{ kind: "consensus", refs: [] }} /> =
          consenso de especialistas.
        </p>

        <Accordion sections={sections} idPrefix="ref" allowMultiple />

        <article className="summary-box">
          <BookOpenCheck size={30} aria-hidden="true" />
          <div>
            <div className="summary-head">
              <strong>{THEORETICAL_SUMMARY.title}</strong>
              <FavoriteButton
                item={{ id: "ref-resumo", label: "Referencial — Resumo", page: "referencial" }}
                inline
              />
            </div>
            <p>
              A mobilização precoce na UTI deve ser sempre{" "}
              <strong>individualizada</strong>, <strong>progressiva</strong>,{" "}
              <strong>monitorizada</strong> e <strong>baseada na condição clínica e
              funcional</strong> de cada paciente.
            </p>
            <ul>
              {THEORETICAL_SUMMARY.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </main>
  );
}
