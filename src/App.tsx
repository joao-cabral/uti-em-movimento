import { useCallback, useEffect, useState } from "react";
import { Home, Search, Star, UserRound } from "lucide-react";
import type { AnswerMap, NavParams, Page } from "./types";
import HomePage from "./pages/HomePage";
import TheoreticalPage from "./pages/TheoreticalPage";
import WhenPage from "./pages/WhenPage";
import AssessmentPage from "./pages/AssessmentPage";
import ProtocolsPage from "./pages/ProtocolsPage";
import ContraindicationsPage from "./pages/ContraindicationsPage";
import MonitoringPage from "./pages/MonitoringPage";
import GuidePage from "./pages/GuidePage";
import MaterialsPage from "./pages/MaterialsPage";
import FlowPage from "./pages/FlowPage";
import RecordsPage from "./pages/RecordsPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";

interface NavEntry {
  page: Page;
  params?: NavParams;
}

const NAV_TABS: { id: Page; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Início", icon: Home },
  { id: "favoritos", label: "Favoritos", icon: Star },
  { id: "buscar", label: "Buscar", icon: Search },
  { id: "perfil", label: "Perfil", icon: UserRound },
];

export default function App() {
  const [stack, setStack] = useState<NavEntry[]>([{ page: "home" }]);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const current = stack[stack.length - 1];

  const navigate = useCallback((page: Page, params?: NavParams) => {
    setStack((s) => [...s, { page, params }]);
  }, []);

  const back = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const goHome = useCallback(() => setStack([{ page: "home" }]), []);

  const navTab = useCallback((page: Page) => {
    setStack([{ page: "home" }, { page }]);
  }, []);

  const resetAssessment = useCallback(() => setAnswers({}), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stack.length, current.page]);

  const renderPage = () => {
    switch (current.page) {
      case "home":
        return <HomePage navigate={navigate} />;
      case "referencial":
        return <TheoreticalPage navigate={navigate} back={back} />;
      case "quando":
        return <WhenPage navigate={navigate} back={back} />;
      case "avaliacao":
        return (
          <AssessmentPage
            navigate={navigate}
            back={back}
            goHome={goHome}
            answers={answers}
            setAnswers={setAnswers}
            resetAssessment={resetAssessment}
          />
        );
      case "protocolos":
        return (
          <ProtocolsPage
            navigate={navigate}
            back={back}
            initialLevel={current.params?.protocolLevel}
          />
        );
      case "contraindicacoes":
        return <ContraindicationsPage navigate={navigate} back={back} />;
      case "monitorizacao":
        return <MonitoringPage navigate={navigate} back={back} />;
      case "guia":
        return <GuidePage navigate={navigate} back={back} />;
      case "materiais":
        return <MaterialsPage navigate={navigate} back={back} />;
      case "fluxo":
        return <FlowPage navigate={navigate} back={back} />;
      case "registro":
        return <RecordsPage navigate={navigate} back={back} />;
      case "buscar":
        return <SearchPage navigate={navigate} back={back} />;
      case "favoritos":
        return <FavoritesPage navigate={navTab} back={back} />;
      case "perfil":
        return <AboutPage navigate={navigate} back={back} />;
    }
  };

  return (
    <div className="app-shell">
      {renderPage()}
      <nav className="bottom-nav" aria-label="Navegação principal">
        {NAV_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={current.page === id ? "active" : ""}
            aria-current={current.page === id ? "page" : undefined}
            onClick={() => navTab(id)}
          >
            <Icon size={23} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
