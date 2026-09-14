export interface GuideStep {
  id: string;
  number: string;
  title: string;
  short: string;
  body: string;
  bullets?: string[];
}

export const GUIDE_STEPS: GuideStep[] = [
  {
    id: "objetivo",
    number: "01",
    title: "Defina o objetivo",
    short: "Antes de iniciar, saiba o que a sessão pretende alcançar.",
    body: "Todo contato com o paciente crítico deveria ter uma resposta explícita para a pergunta 'qual é o objetivo de mover este paciente agora?'. O objetivo deve ser realista, mensurável e individualizado para a condição e a fase da doença.",
    bullets: [
      "Manutenção de amplitude de movimento articular",
      "Prevenção de complicações da imobilidade",
      "Controle de tronco",
      "Sedestação",
      "Transferência leito-poltrona",
      "Ortostatismo",
      "Marcha / deambulação",
    ],
  },
  {
    id: "preparacao",
    number: "02",
    title: "Prepare o paciente e o ambiente",
    short: "Logística segura evita metade dos problemas.",
    body: "Prepare tudo antes de iniciar. Profissionais desorganizados improvisam, e improvisos aumentam eventos adversos.",
    bullets: [
      "Organizar equipamentos necessários (dispositivos de assistência, O2 portátil, aspirador)",
      "Verificar fixação e posição de todos os dispositivos invasivos",
      "Posicionar o paciente de forma segura e alinhada",
      "Garantir espaço livre para a equipe se mover",
      "Assegurar outro profissional presente quando exigido pela complexidade",
      "Confirmar plano de parada e retorno rápido ao leito",
    ],
  },
  {
    id: "nivel",
    number: "03",
    title: "Respeite o nível funcional",
    short: "Comece pela capacidade atual do paciente.",
    body: "O ponto de partida é aquilo que o paciente consegue realizar hoje com assistência adequada — não o nível que ele 'deveria' alcançar. Forçar progressão acima da capacidade gera risco e eventos adversos sem evidência de benefício.",
  },
  {
    id: "resposta",
    number: "04",
    title: "Observe a resposta",
    short: "Monitore continuamente antes que o paciente piore.",
    body: "A resposta ao movimento deve ser observada durante toda a sessão. Sinais clínicos, comportamento e dispositivo são parte do monitoramento. Se houver sinal de alerta, reduza ou pare.",
  },
  {
    id: "progressao",
    number: "05",
    title: "Progrida com cautela",
    short: "Só suba um degrau depois de consolidar o anterior.",
    body: "A progressão deve acontecer apenas quando houver boa tolerância demonstrada na sessão anterior — e mesmo assim, gradualmente, com tempo/repouso/dificuldade ajustados um de cada vez. Mobilização precoce não significa mobilização máxima.",
  },
  {
    id: "registro",
    number: "06",
    title: "Registre e reavalie",
    short: "Documentar protege o paciente e a equipe.",
    body: "Registre objetivo, atividade realizada, nível de assistência, tolerância e intercorrências. Planeje a próxima sessão com base no que foi observado. Evolução não documentada gera decisões duplicadas ou conflitantes.",
  },
];

export const GUIDE_ATTENTION =
  "A presença de ventilação mecânica, dispositivos invasivos ou terapia intensiva não significa, isoladamente, que o paciente não possa ser mobilizado. A decisão depende da avaliação clínica, estabilidade, riscos e recursos disponíveis.";

export const GUIDE_RULE = [
  "Preparar",
  "Avaliar",
  "Mobilizar",
  "Monitorar",
  "Reavaliar",
  "Registrar",
];

export const GUIDE_SEAL = "GUIA RÁPIDO • 6 ETAPAS";
