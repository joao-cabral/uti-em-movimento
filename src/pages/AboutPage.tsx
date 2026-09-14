import { GraduationCap, Info, Landmark, ShieldCheck, Users } from "lucide-react";
import { TopBar, Disclaimer } from "../components/ui";
import { ABOUT } from "../data/about";
import { REFERENCES } from "../data/references";
import type { Page } from "../types";

export default function AboutPage({
  navigate,
  back,
}: {
  navigate: (page: Page) => void;
  back: () => void;
}) {
  return (
    <main className="screen with-bottom">
      <TopBar
        title="Sobre o Projeto"
        onBack={back}
        favorite={{ id: "page-perfil", label: "Sobre o Projeto", page: "perfil" }}
      />
      <section className="content">
        <div className="about-head">
          <div className="about-logo" aria-hidden="true">
            <Landmark size={26} />
          </div>
          <div>
            <h2>{ABOUT.projectName}</h2>
            <p>{ABOUT.tagline}</p>
            <span className="version-chip">Versão {ABOUT.version}</span>
          </div>
        </div>

        <article className="about-card">
          <GraduationCap size={22} aria-hidden="true" />
          <div>
            <strong>Objetivo</strong>
            <p>{ABOUT.objective}</p>
          </div>
        </article>

        <article className="about-card">
          <Info size={22} aria-hidden="true" />
          <div>
            <strong>Curso e projeto</strong>
            <p>{ABOUT.course}</p>
            <p>{ABOUT.extension}</p>
          </div>
        </article>

        <article className="about-card">
          <Users size={22} aria-hidden="true" />
          <div>
            <strong>Instituição e equipe</strong>
            <p>{ABOUT.institution}</p>
            <p>
              <strong>Integrantes:</strong>
            </p>
            <ul>
              {ABOUT.members.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p>
              <strong>Orientador(a):</strong> {ABOUT.advisor}
            </p>
          </div>
        </article>

        <article className="about-card">
          <ShieldCheck size={22} aria-hidden="true" />
          <div>
            <strong>Privacidade de dados</strong>
            <p>{ABOUT.privacy}</p>
          </div>
        </article>

        <p className="hint">
          Para personalizar os dados institucionais, edite o arquivo{" "}
          <code>src/data/about.ts</code> e gere nova build.
        </p>

        <h2 className="section-inline">Referências centrais</h2>
        <ul className="ref-list">
          {REFERENCES.slice(0, 8).map((r) => (
            <li key={r.id}>
              {r.url ? (
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  {r.citation}
                </a>
              ) : (
                <span>{r.citation}</span>
              )}
            </li>
          ))}
        </ul>
        <button className="secondary-btn" onClick={() => navigate("materiais")}>
          Ver todas as referências e materiais
        </button>

        <Disclaimer />
      </section>
    </main>
  );
}
