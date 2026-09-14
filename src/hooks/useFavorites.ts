import { useCallback, useEffect, useState } from "react";
import type { FavoriteItem } from "../types";

const STORAGE_KEY = "uti-em-movimento:favoritos";

function readFavorites(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function writeFavorites(list: FavoriteItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* armazenamento indisponível */
  }
  window.dispatchEvent(new CustomEvent("favorites-changed"));
}

export function useFavorites() {
  const [items, setItems] = useState<FavoriteItem[]>(readFavorites);

  useEffect(() => {
    const sync = () => setItems(readFavorites());
    window.addEventListener("favorites-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("favorites-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((item: FavoriteItem) => {
    const current = readFavorites();
    const exists = current.some((f) => f.id === item.id);
    writeFavorites(
      exists ? current.filter((f) => f.id !== item.id) : [item, ...current]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => items.some((f) => f.id === id),
    [items]
  );

  const remove = useCallback((id: string) => {
    writeFavorites(readFavorites().filter((f) => f.id !== id));
  }, []);

  return { items, toggle, isFavorite, remove };
}
