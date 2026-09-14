import { ArrowDown, ClipboardList, FileText, Flag, HeartPulse, Home, Stethoscope } from "lucide-react";
import { TopBar } from "../components/ui";
import type { Page } from "../types";

const STEPS = [
  { icon: Home, title: "Início", text: "Apresentação, menu principal e destaque para a avaliação guiada.", page: "home" as Page },
  { icon: ClipboardList, title: "Avaliação", text: "Wizard em 6 etapas: condição clínica, cardiovascular, respiratória, neurológica, dispositivos e capacidade funcional.", page: "avaliacao" as Page },
  { icon: Flag, title: "Resultado", text: "Classificação em Verde, Amarelo ou Vermelho — com fatores considerados, nunca um simples 'pode/não pode'.", page: "avaliacao" as Page },
  { icon: Stethoscope, title: "Protocolo", text: "Plano proporcional à capacidade atual, dentro da progressão de 9 níveis.", page: "protocolos" as Page },
  { icon: HeartPulse, title: "Monitorização", text: "Antes, durante e após — com sinais claros para reduzir ou interromper.", page: "monitorizacao" as Page },
  { icon: FileText, title: "Registro e reavaliação", text: "Documentar tolerância, intercorrências e plano da próxima sessão; depois, reavaliar.", page: "registro" as Page },
];

export default function FlowPage({
  navigate,
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  return (
    <main className="screen with-bottom">
      <TopBar
        title="Resumo do Fluxo"
        onBack={back}
        favorite={{ id: "page-fluxo", label: "Resumo do Fluxo", page: "fluxo" }}
      />
      <section className="content">
        <p className="intro">O ciclo completo de apoio à decisão neste aplicativo:</p>

        <ol className="flow-list">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <button className="flow-item" onClick={() => navigate(s.page)}>
                <span className="flow-icon" aria-hidden="true">
                  <s.icon size={22} />
                </span>
                <span>
                  <strong>{i + 1}. {s.title}</strong>
                  <p>{s.text}</p>
                </span>
              </button>
              {i < STEPS.length - 1 && <ArrowDown className="flow-arrow" size={20} aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <button className="primary-btn" onClick={() => navigate("avaliacao")}>
          Começar pela Avaliação
        </button>
      </section>
    </main>
  );
}
