import { Star, Trash2 } from "lucide-react";
import { TopBar } from "../components/ui";
import { useFavorites } from "../hooks/useFavorites";
import type { Page } from "../types";

export default function FavoritesPage({
  navigate,
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  const { items, remove } = useFavorites();

  return (
    <main className="screen with-bottom">
      <TopBar title="Favoritos" onBack={back} />
      <section className="content">
        {items.length === 0 ? (
          <div className="empty-state">
            <Star size={34} aria-hidden="true" />
            <p>
              Nenhum favorito ainda. Toque na estrela de qualquer conteúdo (topo das
              páginas ou itens de listas) para salvá-lo aqui, neste dispositivo.
            </p>
          </div>
        ) : (
          <div className="stack">
            {items.map((f) => (
              <div className="option-card fav-row" key={f.id}>
                <button className="fav-open" onClick={() => navigate(f.page)}>
                  <span>
                    <strong>{f.label}</strong>
                    <small>abrir na seção</small>
                  </span>
                </button>
                <button
                  className="icon-btn danger"
                  onClick={() => remove(f.id)}
                  aria-label={`Remover ${f.label} dos favoritos`}
                >
                  <Trash2 size={17} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
