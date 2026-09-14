import {
  Activity,
  BookOpen,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileText,
  GitBranch,
  HeartPulse,
  Lightbulb,
  NotebookPen,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";
import type { Page } from "../types";
import { Disclaimer } from "../components/ui";

const MENU: { page: Page; label: string; desc: string; icon: typeof BookOpen }[] = [
  { page: "referencial", label: "Referencial Teórico", desc: "Fundamentos baseados em evidência", icon: BookOpen },
  { page: "quando", label: "Quando Mobilizar?", desc: "Introdução à triagem clínica", icon: Clock3 },
  { page: "avaliacao", label: "Avaliação Inicial", desc: "Wizard guiado, passo a passo", icon: ClipboardList },
  { page: "protocolos", label: "Protocolos de Mobilização", desc: "Progressão em 9 níveis", icon: Stethoscope },
  { page: "contraindicacoes", label: "Contraindicações e Precauções", desc: "Cautelas e cenários especiais", icon: ShieldAlert },
  { page: "monitorizacao", label: "Monitorização e Segurança", desc: "Antes, durante e após", icon: HeartPulse },
  { page: "guia", label: "Guia Prático", desc: "6 etapas para a sessão", icon: Lightbulb },
  { page: "materiais", label: "Materiais de Apoio", desc: "Diretrizes, escalas e referências", icon: FileText },
];

export default function HomePage({
  navigate,
}: {
  navigate: (page: Page, params?: { protocolLevel?: number }) => void;
}) {
  return (
    <main className="screen with-bottom">
      <section className="welcome">
        <p className="eyebrow">Olá, Profissional!</p>
        <p className="welcome-sub">Fisioterapia Intensiva · Mobilização Precoce</p>
      </section>

      <section className="hero" aria-label="UTI em Movimento">
        <div>
          <h1>UTI em Movimento</h1>
          <p>Mobilização segura e baseada em evidências para o paciente crítico.</p>
        </div>
        <Activity size={90} strokeWidth={1.2} aria-hidden="true" />
      </section>

      <button
        className="feature-card"
        onClick={() => navigate("avaliacao")}
        aria-label="Iniciar avaliação clínica guiada"
      >
        <ClipboardList size={38} aria-hidden="true" />
        <div>
          <strong>Como saber qual é a hora de mobilizar?</strong>
          <span>Realize uma avaliação clínica guiada, passo a passo.</span>
        </div>
        <ChevronRight aria-hidden="true" />
      </button>

      <h2 className="section-title">Menu principal</h2>
      <section className="menu-grid">
        {MENU.map(({ page, label, desc, icon: Icon }) => (
          <button key={page} className="menu-card" onClick={() => navigate(page)}>
            <Icon size={28} aria-hidden="true" />
            <span>
              <strong>{label}</strong>
              <em>{desc}</em>
            </span>
          </button>
        ))}
      </section>

      <section className="quick-links">
        <button onClick={() => navigate("fluxo")}>
          <GitBranch size={20} aria-hidden="true" /> Resumo do Fluxo
        </button>
        <button onClick={() => navigate("registro")}>
          <NotebookPen size={20} aria-hidden="true" /> Registrar evolução
        </button>
      </section>

      <section className="remember">
        <strong>Lembre-se</strong>
        <Disclaimer />
        <p className="remember-extra">
          Nenhum valor fisiológico isolado decide pela mobilização. A decisão é sempre
          clínica, contextual e multiprofissional.
        </p>
      </section>
    </main>
  );
}
