import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  NotebookPen,
  RotateCcw,
  ShieldAlert,
  Stethoscope,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import type { AnswerMap, Page, Risk } from "../types";
import { ASSESSMENT_STEPS, TOTAL_STEPS } from "../clinical/steps";
import { CAPACITY_TO_LEVEL, RESULT_META, classify, isAnswerComplete } from "../clinical/classify";
import { PROTOCOL_LEVELS } from "../data/protocols";
import { TopBar, Disclaimer, ProgressBar } from "../components/ui";
import { OptionGroup, CheckGroup } from "../components/options";

type View = "steps" | "result" | "plan";

const GROUPS: number[] = [...new Set(ASSESSMENT_STEPS.map((s) => s.group))];

export default function AssessmentPage({
  navigate,
  back,
  goHome,
  answers,
  setAnswers,
  resetAssessment,
}: {
  navigate: (page: Page, params?: { protocolLevel?: number }) => void;
  back: () => void;
  goHome: () => void;
  answers: AnswerMap;
  setAnswers: (a: AnswerMap | ((prev: AnswerMap) => AnswerMap)) => void;
  resetAssessment: () => void;
}) {
  const [view, setView] = useState<View>("steps");
  const [stepIndex, setStepIndex] = useState(0);

  const group = GROUPS[stepIndex];
  const groupSteps = ASSESSMENT_STEPS.filter((s) => s.group === group);
  const classification = useMemo(() => classify(answers), [answers]);

  const setAnswer = (stepId: string, value: string | string[]) =>
    setAnswers((prev) => ({ ...prev, [stepId]: value }));

  const groupComplete = groupSteps.every((s) => isAnswerComplete(s.id, answers));

  const canGoBackStep = stepIndex > 0;
  const goStep = (dir: 1 | -1) => {
    if (dir === 1 && !groupComplete) return;
    if (dir === 1 && stepIndex === GROUPS.length - 1) setView("result");
    else setStepIndex((i) => Math.min(GROUPS.length - 1, Math.max(0, i + dir)));
  };

  const restart = () => {
    resetAssessment();
    setStepIndex(0);
    setView("steps");
  };

  if (view === "result" || view === "plan") {
    return (
      <ResultViews
        view={view}
        setView={setView}
        navigate={navigate}
        goHome={goHome}
        classification={classification}
        onDefineLevel={() => {
          setStepIndex(GROUPS.length - 1);
          setView("steps");
        }}
        onRestart={restart}
      />
    );
  }

  return (
    <main className="screen with-bottom">
      <TopBar title="Avaliação Inicial" onBack={canGoBackStep ? () => goStep(-1) : back} />
      <section className="content wizard">
        <div className="progress-head">
          <span>
            Etapa {group} de {TOTAL_STEPS + 2}
          </span>
          <strong>{groupSteps[0].title}</strong>
        </div>
        <ProgressBar step={group} total={TOTAL_STEPS + 2} />

        {groupSteps.map((step) => {
          const value = answers[step.id];
          return (
            <div key={step.id} className="step-block">
              <article className="question-card">
                <h2>{step.question}</h2>
                {step.help && <p>{step.help}</p>}
              </article>

              {step.notice && (
                <div className="note info" role="note">
                  <ShieldAlert size={20} aria-hidden="true" />
                  <span>{step.notice}</span>
                </div>
              )}

              {step.multiple ? (
                <CheckGroup
                  name={step.question}
                  options={step.options}
                  values={Array.isArray(value) ? value : []}
                  exclusiveId={step.exclusiveId}
                  onChange={(ids) => setAnswer(step.id, ids)}
                />
              ) : (
                <OptionGroup
                  name={step.question}
                  options={step.options}
                  value={typeof value === "string" ? value : undefined}
                  onChange={(id) => setAnswer(step.id, id)}
                />
              )}
            </div>
          );
        })}

        <div className="wizard-actions">
          <button
            className="secondary-btn"
            onClick={() => goStep(-1)}
            disabled={!canGoBackStep}
          >
            <ArrowLeft size={18} aria-hidden="true" /> Voltar
          </button>
          <button
            className="primary-btn grow"
            onClick={() => goStep(1)}
            disabled={!groupComplete}
            aria-disabled={!groupComplete}
          >
            {stepIndex === GROUPS.length - 1 ? "Ver resultado" : "Continuar"}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        {!groupComplete && (
          <p className="hint" aria-live="polite">
            Selecione {groupSteps.length > 1 ? "as opções de todas as perguntas" : "uma opção"} para
            continuar.
          </p>
        )}
      </section>
    </main>
  );
}

function ResultViews({
  view,
  setView,
  navigate,
  goHome,
  classification,
  onDefineLevel,
  onRestart,
}: {
  view: View;
  setView: (v: View) => void;
  navigate: (page: Page, params?: { protocolLevel?: number }) => void;
  goHome: () => void;
  classification: ReturnType<typeof classify>;
  onDefineLevel: () => void;
  onRestart: () => void;
}) {
  const { risk, stops, cautions, unknowns, specialDevices, capacityOptionId } =
    classification;
  const meta = RESULT_META[risk];
  const capacity = capacityOptionId
    ? CAPACITY_TO_LEVEL[capacityOptionId]
    : undefined;
  const protocol = capacity ? PROTOCOL_LEVELS.find((p) => p.id === capacity.level) : undefined;

  const iconFor: Record<Risk, ReactNode> = {
    green: <CheckCircle2 size={42} aria-hidden="true" />,
    yellow: <TriangleAlert size={42} aria-hidden="true" />,
    red: <XCircle size={42} aria-hidden="true" />,
  };

  return (
    <main className="screen with-bottom">
      <TopBar
        title={view === "result" ? "Resultado da Avaliação" : "Plano de Mobilização"}
        onBack={() => (view === "result" ? onDefineLevel() : setView("result"))}
      />
      <section className="content wizard">
        <div className="progress-head">
          <span>
            Etapa {view === "result" ? 7 : 8} de {TOTAL_STEPS + 2}
          </span>
          <strong>
            {view === "result" ? "Resultado" : "Plano de mobilização"}
          </strong>
        </div>
        <ProgressBar step={view === "result" ? 7 : 8} total={TOTAL_STEPS + 2} />

        <div className={`result-card ${risk}`} role="status">
          {iconFor[risk]}
          <p className="result-label">
            {meta.label} · {risk === "green" ? "atenção mantida" : risk === "yellow" ? "cautela" : "priorizar estabilização"}
          </p>
          <h2>{meta.title}</h2>
          <p>{meta.description}</p>
        </div>

        {(stops.length > 0 || cautions.length > 0 || unknowns.length > 0 || specialDevices.length > 0) && (
          <section className="reasons">
            <h3>Fatores considerados nesta classificação</h3>
            {stops.map((s, i) => (
              <p className="reason red" key={`s${i}`}>
                <XCircle size={16} aria-hidden="true" /> {s.step}: {s.text}
              </p>
            ))}
            {cautions.map((c, i) => (
              <p className="reason yellow" key={`c${i}`}>
                <TriangleAlert size={16} aria-hidden="true" /> {c.step}: {c.text}
              </p>
            ))}
            {specialDevices.map((d, i) => (
              <p className="reason yellow" key={`d${i}`}>
                <ShieldAlert size={16} aria-hidden="true" /> {d}
              </p>
            ))}
            {unknowns.length > 0 && (
              <p className="reason yellow" key="u">
                <ClipboardList size={16} aria-hidden="true" /> Confirmar com a equipe:{" "}
                {unknowns.join(", ")}.
              </p>
            )}
          </section>
        )}

        {capacity && (
          <div className="summary-box">
            <HeartPulse size={28} aria-hidden="true" />
            <div>
              <strong>Capacidade funcional informada</strong>
              <p>
                Nível atual compatível com: <strong>{capacity.label}</strong>. A
                atividade deve partir desta capacidade, não de um nível-alvo ideal.
              </p>
            </div>
          </div>
        )}

        {view === "result" ? (
          <>
            <section className="next-steps">
              <h3>Próximos passos</h3>
              <div className="stack">
                <button className="option-card" onClick={() => setView("plan")}>
                  <span>Ver plano recomendado</span> <ArrowRight aria-hidden="true" />
                </button>
                <button
                  className="option-card"
                  onClick={() =>
                    navigate("protocolos", capacity ? { protocolLevel: capacity.level } : undefined)
                  }
                >
                  <span>Ver protocolo de mobilização</span> <ArrowRight aria-hidden="true" />
                </button>
                <button className="option-card" onClick={onDefineLevel}>
                  <span>Definir / revisar nível funcional</span> <ArrowRight aria-hidden="true" />
                </button>
                <button className="option-card" onClick={() => navigate("monitorizacao")}>
                  <span>Revisar monitorização e segurança</span> <ArrowRight aria-hidden="true" />
                </button>
                <button className="option-card" onClick={() => navigate("registro")}>
                  <span>Registrar evolução</span> <ArrowRight aria-hidden="true" />
                </button>
                <button className="option-card" onClick={onRestart}>
                  <span>Refazer avaliação</span> <RotateCcw aria-hidden="true" />
                </button>
              </div>
            </section>
            <div className="cta-stack">
              <button className="primary-btn" onClick={() => setView("plan")}>
                <Stethoscope size={19} aria-hidden="true" /> Ver plano recomendado
              </button>
            </div>
            <Disclaimer />
          </>
        ) : (
          <>
            {risk === "red" ? (
              <section className="plan-block">
                <h3>Conduta recomendada neste momento</h3>
                <ul className="check-list">
                  <li>
                    Não progredir a mobilização ativa agora. Foram identificados
                    fatores que indicam necessidade de estabilização/reavaliação.
                  </li>
                  <li>Discutir com a equipe assistencial o plano de estabilização.</li>
                  <li>
                    Manter apenas o que a equipe julgar seguro (ex.: posicionamento
                    e cuidados de manutenção conforme indicação clínica).
                  </li>
                  <li>Repetir esta avaliação após estabilização ou mudança do quadro.</li>
                </ul>
              </section>
            ) : protocol ? (
              <section className="plan-block">
                <h3>
                  Nível inicial sugerido: {protocol.id} · {protocol.name}
                </h3>
                <p className="plan-thesis">
                  {risk === "green"
                    ? "Partir da capacidade atual e considerar progressão proporcional apenas com boa tolerância — precocidade não significa intensidade máxima."
                    : "Manter o nível atual com as precauções abaixo. Progressão não é automática: exige confirmação das informações pendentes e tolerância demonstrada."}
                </p>
                <p><strong>Objetivo:</strong> {protocol.objective}</p>
                {protocol.details.map((d) => (
                  <p key={d.label}>
                    <strong>{d.label}:</strong> {d.text}
                  </p>
                ))}
              </section>
            ) : (
              <section className="plan-block">
                <h3>Defina o nível funcional</h3>
                <p>
                  Volte à etapa 6 e informe a capacidade funcional atual do paciente
                  para gerar um plano proporcional.
                </p>
                <button className="secondary-btn" onClick={onDefineLevel}>
                  Ir para a capacidade funcional
                </button>
              </section>
            )}

            {cautions.length > 0 && risk !== "red" && (
              <section className="plan-block">
                <h3>Precauções para a sessão</h3>
                <ul className="check-list">
                  {cautions.map((c, i) => (
                    <li key={i}>{c.text}</li>
                  ))}
                  {specialDevices.map((d, i) => (
                    <li key={`sp${i}`}>{d}</li>
                  ))}
                  <li>Monitorização intensificada e equipe adicional conforme o caso.</li>
                  <li>Interromper e reavaliar diante de qualquer deterioração nova.</li>
                </ul>
              </section>
            )}

            <div className="plan-flow" aria-label="Regra prática">
              {["Preparar", "Avaliar", "Mobilizar", "Monitorar", "Reavaliar", "Registrar"].map(
                (word) => (
                  <span key={word}>{word}</span>
                )
              )}
            </div>

            <div className="cta-stack">
              <button className="primary-btn" onClick={() => navigate("registro")}>
                <NotebookPen size={19} aria-hidden="true" /> Registrar esta avaliação
              </button>
              <button className="secondary-btn" onClick={() => navigate("monitorizacao")}>
                Revisar monitorização e segurança
              </button>
              <button className="secondary-btn" onClick={onRestart}>
                <RotateCcw size={18} aria-hidden="true" /> Refazer avaliação
              </button>
              <button className="secondary-btn" onClick={goHome}>
                Concluir e voltar ao início
              </button>
            </div>
            <Disclaimer text="O plano acima é uma sugestão educacional baseada apenas nas respostas informadas. A conduta final é da equipe multiprofissional, com avaliação clínica individual." />
          </>
        )}
      </section>
    </main>
  );
}
