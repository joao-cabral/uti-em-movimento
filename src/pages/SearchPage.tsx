import { useState } from "react";
import { ChevronRight, SearchX } from "lucide-react";
import { TopBar } from "../components/ui";
import { searchAll } from "../utils/search";
import type { Page, SearchEntry } from "../types";

export default function SearchPage({
  navigate,
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<SearchEntry[] | null>(null);

  const search = (value: string) => {
    setTerm(value);
    setResults(value.trim().length >= 2 ? searchAll(value) : null);
  };

  return (
    <main className="screen with-bottom">
      <TopBar title="Buscar" onBack={back} />
      <section className="content">
        <label className="search-field">
          <span className="sr-only">Buscar no conteúdo do aplicativo</span>
          <input
            type="search"
            inputMode="search"
            placeholder='Ex.: "ventilação mecânica", "ECMO", "sedestação"'
            value={term}
            onChange={(e) => search(e.target.value)}
          />
        </label>

        {results && results.length === 0 && (
          <div className="empty-state">
            <SearchX size={34} aria-hidden="true" />
            <p>
              Nada encontrado para <strong>“{term}”</strong>. Tente outro termo, como
              “delirium”, “deambulação”, “vasoativo” ou “IMS”.
            </p>
          </div>
        )}

        {results && results.length > 0 && (
          <>
            <p className="hint" aria-live="polite">
              {results.length} resultado{results.length > 1 ? "s" : ""} em conteúdos
              educacionais
            </p>
            <div className="stack">
              {results.map((r) => (
                <button
                  className="option-card search-result"
                  key={r.id}
                  onClick={() => navigate(r.page)}
                >
                  <span>
                    <em className="material-cat">{r.category}</em>
                    <strong>{r.title}</strong>
                    <small>
                      {r.text.length > 140 ? `${r.text.slice(0, 140)}…` : r.text}
                    </small>
                  </span>
                  <ChevronRight aria-hidden="true" />
                </button>
              ))}
            </div>
          </>
        )}

        {!results && (
          <p className="intro">
            A busca local percorre o referencial teórico, protocolos, contraindicações,
            guia prático, monitorização, materiais e referências — tudo no seu
            dispositivo, sem enviar nada para servidores.
          </p>
        )}
      </section>
    </main>
  );
}
