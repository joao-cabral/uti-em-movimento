import { useState } from "react";
import { Copy, Info, Trash2 } from "lucide-react";
import { TopBar, Disclaimer } from "../components/ui";
import { useRecords } from "../hooks/useRecords";
import type { Page, Risk } from "../types";
import { RESULT_META } from "../clinical/classify";

const TOLERANCES = ["Boa tolerância", "Tolerância regular", "Tolerância limitada", "Intercorrência que motivou interrupção"];

const LEVEL_OPTIONS = [
  "1 · Mobilização passiva",
  "2 · Exercícios ativo-assistidos",
  "3 · Exercícios ativos no leito",
  "4 · Sedestação",
  "5 · Sedestação à beira do leito",
  "6 · Transferência para poltrona",
  "7 · Ortostatismo",
  "8 · Marcha estacionária",
  "9 · Deambulação",
];

export default function RecordsPage({
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  const { records, add, remove } = useRecords();
  const [risk, setRisk] = useState<Risk | "">("");
  const [level, setLevel] = useState("");
  const [tolerance, setTolerance] = useState("");
  const [events, setEvents] = useState("");
  const [nextPlan, setNextPlan] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const canSave = risk !== "" && level !== "" && tolerance !== "";

  const save = () => {
    if (!canSave) return;
    add({ risk: risk as Risk, level, tolerance, events, nextPlan });
    setRisk("");
    setLevel("");
    setTolerance("");
    setEvents("");
    setNextPlan("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const copyLatest = async () => {
    if (records.length === 0) return;
    const r = records[0];
    const text =
      `Evolução Fisioterapia — ${new Date(r.createdAt).toLocaleString("pt-BR")}\n` +
      `Classificação da avaliação: ${RESULT_META[r.risk].title} (${RESULT_META[r.risk].label})\n` +
      `Nível realizado: ${r.level}\n` +
      `Tolerância: ${r.tolerance}\n` +
      (r.events ? `Intercorrências: ${r.events}\n` : "Intercorrências: negadas\n") +
      (r.nextPlan ? `Plano da próxima sessão: ${r.nextPlan}` : "");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="screen with-bottom">
      <TopBar title="Registro de Evolução" onBack={back} />
      <section className="content">
        <div className="note info" role="note">
          <Info size={20} aria-hidden="true" />
          <span>
            <strong>Privacidade:</strong> registre apenas dados funcionais e clínicos
            não identificáveis. Não digite nome, CPF, número de prontuário ou qualquer
            identificador do paciente. Os registros ficam somente neste dispositivo.
          </span>
        </div>

        <div className="form-card">
          <label className="field">
            <span>Classificação da avaliação associada *</span>
            <select value={risk} onChange={(e) => setRisk(e.target.value as Risk | "")}>
              <option value="">Selecione…</option>
              <option value="green">Verde — compatível com progressão</option>
              <option value="yellow">Amarelo — requer precauções</option>
              <option value="red">Vermelho — reavaliar antes de progredir</option>
            </select>
          </label>
          <label className="field">
            <span>Nível funcional realizado *</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="">Selecione…</option>
              {LEVEL_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Tolerância *</span>
            <select value={tolerance} onChange={(e) => setTolerance(e.target.value)}>
              <option value="">Selecione…</option>
              {TOLERANCES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Intercorrências (opcional)</span>
            <textarea
              rows={2}
              value={events}
              onChange={(e) => setEvents(e.target.value)}
              placeholder="Ex.: dessaturação leve durante transferência, resolvida com retorno ao leito."
            />
          </label>
          <label className="field">
            <span>Plano para a próxima sessão (opcional)</span>
            <textarea
              rows={2}
              value={nextPlan}
              onChange={(e) => setNextPlan(e.target.value)}
              placeholder="Ex.: repetir sedestação à beira do leito, meta 10 min com um auxiliador."
            />
          </label>
          <button className="primary-btn" onClick={save} disabled={!canSave}>
            Salvar registro no dispositivo
          </button>
          {saved && (
            <p className="hint success" role="status">
              Registro salvo com sucesso.
            </p>
          )}
        </div>

        {records.length > 0 && (
          <>
            <h2 className="section-inline">Histórico neste dispositivo</h2>
            <button className="secondary-btn" onClick={copyLatest}>
              <Copy size={17} aria-hidden="true" />
              {copied ? "Texto copiado!" : "Copiar último registro como texto de evolução"}
            </button>
            <ul className="record-list">
              {records.map((r) => (
                <li key={r.id}>
                  <div className={`record-card ${r.risk}`}>
                    <header>
                      <time dateTime={r.createdAt}>
                        {new Date(r.createdAt).toLocaleString("pt-BR")}
                      </time>
                      <button
                        className="icon-btn danger"
                        onClick={() => remove(r.id)}
                        aria-label="Excluir registro"
                      >
                        <Trash2 size={17} aria-hidden="true" />
                      </button>
                    </header>
                    <p>
                      <strong>{r.level}</strong> · {r.tolerance}
                    </p>
                    {r.events && <p>Intercorrências: {r.events}</p>}
                    {r.nextPlan && <p>Próxima sessão: {r.nextPlan}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <Disclaimer text="O registro é um auxílio educacional à documentação. A evolução oficial do paciente segue o prontuário institucional e as normas da profissão." />
      </section>
    </main>
  );
}
