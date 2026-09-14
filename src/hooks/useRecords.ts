import { useCallback, useState } from "react";
import { loadJson, saveJson } from "../utils/storage";
import type { SessionRecord } from "../types";

const KEY = "registros";

export function useRecords() {
  const [records, setRecords] = useState<SessionRecord[]>(() =>
    loadJson<SessionRecord[]>(KEY, [])
  );

  const persist = useCallback((next: SessionRecord[]) => {
    setRecords(next);
    saveJson(KEY, next);
  }, []);

  const add = useCallback(
    (record: Omit<SessionRecord, "id" | "createdAt">) => {
      const entry: SessionRecord = {
        ...record,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      persist([entry, ...records]);
      return entry;
    },
    [records, persist]
  );

  const remove = useCallback(
    (id: string) => persist(records.filter((r) => r.id !== id)),
    [records, persist]
  );

  return { records, add, remove };
}
