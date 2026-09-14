import { useMemo, useState } from "react";
import { ExternalLink, FolderOpen, Library } from "lucide-react";
import { TopBar, FavoriteButton, Disclaimer } from "../components/ui";
import { MATERIALS, MATERIAL_CATEGORIES } from "../data/materials";
import { REFERENCES } from "../data/references";
import type { Page } from "../types";

const CATEGORY_PAGE: Record<string, Page> = {
  Fluxogramas: "fluxo",
  Checklists: "guia",
  Referências: "materiais",
  "Sobre o projeto": "perfil",
};

export default function MaterialsPage({
  navigate,
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  const [category, setCategory] = useState<string>("Todos");
  const categories = useMemo(
    () => ["Todos", ...MATERIAL_CATEGORIES.filter((c) => MATERIALS.some((m) => m.category === c))],
    []
  );
  const list = MATERIALS.filter((m) => category === "Todos" || m.category === category);

  return (
    <main className="screen with-bottom">
      <TopBar
        title="Materiais de Apoio"
        onBack={back}
        favorite={{ id: "page-materiais", label: "Materiais de Apoio", page: "materiais" }}
      />
      <section className="content">
        <p className="intro">
          Biblioteca do projeto: diretrizes, artigos, escalas e materiais de estudo.
          Os links apontam para PubMed, DOI ou páginas oficiais — nenhum material
          protegido por copyright é reproduzido aqui.
        </p>

        <div className="chip-row" role="tablist" aria-label="Categorias de materiais">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              className={category === c ? "chip active" : "chip"}
              onClick={() => setCategory(c)}
            >
              {c === "Todos" ? <Library size={14} aria-hidden="true" /> : <FolderOpen size={14} aria-hidden="true" />}
              {c}
            </button>
          ))}
        </div>

        <div className="stack">
          {list.map((m) => (
            <article className="material-card" key={m.id}>
              <div>
                <span className="material-cat">{m.category}</span>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                {m.citation && <p className="material-cite">{m.citation}</p>}
                <div className="material-actions">
                  {m.url ? (
                    <a
                      className="link-btn"
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir ${m.title} em nova aba`}
                    >
                      Abrir fonte externa <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  ) : CATEGORY_PAGE[m.category] && CATEGORY_PAGE[m.category] !== "materiais" ? (
                    <button className="link-btn" onClick={() => navigate(CATEGORY_PAGE[m.category])}>
                      Ver dentro do app
                    </button>
                  ) : m.category === "Sobre o projeto" ? (
                    <button className="link-btn" onClick={() => navigate("perfil")}>
                      Ver sobre o projeto
                    </button>
                  ) : null}
                  <FavoriteButton
                    item={{ id: m.id, label: m.title, page: "materiais" }}
                    inline
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <h2 className="section-inline">Referências completas</h2>
        <p className="intro">
          Fontes utilizadas em todo o conteúdo clínico do aplicativo — cada uma
          identificada quanto ao tipo. Nenhuma referência foi inventada: todas foram
          conferidas em PubMed/DOI/publicadores.
        </p>
        <ol className="ref-list full">
          {REFERENCES.map((r) => (
            <li key={r.id}>
              <span className="ref-kind">{r.kind}</span>
              {r.url ? (
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  {r.citation}
                </a>
              ) : (
                <span>{r.citation}</span>
              )}
            </li>
          ))}
        </ol>

        <Disclaimer />
      </section>
    </main>
  );
}
