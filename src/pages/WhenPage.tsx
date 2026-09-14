import { ArrowRight, ClipboardCheck, HeartPulse, Info, ListChecks, Wind } from "lucide-react";
import { TopBar, Disclaimer } from "../components/ui";
import { SourceBadge } from "../components/ui";
import type { Page } from "../types";

const FACTORS = [
  {
    icon: HeartPulse,
    title: "1. Estabilidade clínica geral",
    text: "Doença de base em fase controlada, sem deterioração aguda em curso.",
  },
  {
    icon: HeartPulse,
    title: "2. Estabilidade cardiovascular",
    text: "Tendência hemodinâmica, perfusão, ritmo e uso/tendência de drogas vasoativas.",
  },
  {
    icon: Wind,
    title: "3. Condição respiratória",
    text: "Suporte utilizado, estabilidade, sincronia, oxigenação adequada ao quadro e desconforto.",
  },
  {
    icon: ClipboardCheck,
    title: "4. Condição neurológica",
    text: "Consciência, capacidade de seguir comandos e comportamento — separados da capacidade motora.",
  },
  {
    icon: ListChecks,
    title: "5. Dispositivos e restrições",
    text: "Linhas, drenos, acessos e restrições: avaliar fixação, segurança e necessidade de equipe.",
  },
  {
    icon: ClipboardCheck,
    title: "6. Capacidade funcional",
    text: "O que o paciente consegue fazer hoje (referência: ICU Mobility Scale).",
  },
  {
    icon: ArrowRight,
    title: "7. Tolerância à atividade",
    text: "Resposta às sessões anteriores e ao esforço atual orienta a progressão.",
  },
];

export default function WhenPage({
  navigate,
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  return (
    <main className="screen with-bottom">
      <TopBar
        title="Quando Mobilizar?"
        onBack={back}
        favorite={{ id: "page-quando", label: "Quando Mobilizar?", page: "quando" }}
      />
      <section className="content">
        <p className="intro">
          Não existe um único número fisiológico universal capaz de decidir, sozinho,
          se o paciente pode ou não ser mobilizado. A decisão deve integrar dimensões
          clínicas — nunca um valor isolado.
        </p>

        <div className="note info">
          <Info size={20} aria-hidden="true" />
          <span>
            A presença de ventilação mecânica, vasopressor em dose estável ou
            dispositivos invasivos não representa, isoladamente, contraindicação
            absoluta.{" "}
            <SourceBadge source={{ kind: "consensus", refs: ["hodgson2014consensus"] }} />{" "}
            <SourceBadge source={{ kind: "recommendation", refs: ["schaller2024"] }} />
          </span>
        </div>

        <h2 className="section-inline">O que integrar na decisão</h2>
        <div className="stack">
          {FACTORS.map(({ icon: Icon, title, text }) => (
            <article className="factor-card" key={title}>
              <Icon size={24} aria-hidden="true" />
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-stack">
          <button className="primary-btn" onClick={() => navigate("avaliacao")}>
            Iniciar triagem <ArrowRight size={19} aria-hidden="true" />
          </button>
          <button className="secondary-btn" onClick={() => navigate("fluxo")}>
            Ver resumo do fluxo completo
          </button>
        </div>

        <Disclaimer />
      </section>
    </main>
  );
}
