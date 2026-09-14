import type { AccordionSection } from "../types";

export const THEORETICAL: AccordionSection[] = [
  {
    id: "fmauti",
    title: "O que é fraqueza muscular adquirida na UTI (FMA-UTI)?",
    body:
      "FMA-UTI (do inglês ICU-acquired weakness) é o termo guarda-chuva para a fraqueza muscular generalizada que se desenvolve durante a doença crítica, sem outra etiologia plausível além da própria internação em UTI. Compreende a polineuropatia da doença crítica, a miopatia da doença crítica e formas mistas. Clinicamente, manifesta-se como fraqueza simétrica e proximal, detectada no exame físico quando o paciente está acordado e cooperativo. Sua prevalência varia conforme a população e os critérios diagnósticos utilizados.",
    source: { kind: "consensus", refs: ["stevens2009", "ats2014"] },
  },
  {
    id: "imobilidade",
    title: "Impactos da imobilidade na UTI",
    body:
      "A imobilidade prolongada no leito contribui para perda rápida de massa e força muscular, atrofia diafragmática, rigidez articular e contracturas, além de aumentar o risco de lesões por pressão, tromboembolismo, infecções respiratórias associadas à ventilação, delirium e piores desfechos funcionais após a alta. A FMA-UTI está associada a maior tempo de ventilação mecânica, maior permanência na UTI e no hospital e maior dependência funcional no longo prazo, integrando o quadro da síndrome pós-UTI (PICS).",
    source: { kind: "evidence", refs: ["dejonghe2002", "stevens2009", "padis2018"] },
  },
  {
    id: "beneficios",
    title: "Benefícios da mobilização precoce",
    body:
      "Quando indicada e realizada com segurança, a mobilização precoce busca preservar amplitude de movimento e função muscular, mitigar a FMA-UTI e as complicações da imobilidade, favorecer a interação paciente-ventilador e apoiar a recuperação funcional. Revisões recentes associam estratégias de mobilização a melhora de desfechos funcionais e redução de dias de internação em alguns cenários, com eventos adversos graves incomuns durante sessões conduzidas sob critérios de segurança. As diretrizes da SCCM (2018 e atualização 2025) sugerem oferecer reabilitação/mobilização a adultos na UTI e, na atualização, mobilização/reabilitação 'aprimorada' em relação ao cuidado usual, recomendação condicional com certeza moderada de evidência.",
    source: { kind: "recommendation", refs: ["padis2025", "padis2018", "iccn2024", "amib2019"] },
  },
  {
    id: "evidencias",
    title: "Evidências científicas recentes — mobilizar cedo não é mobilizar máximo",
    body:
      "Ensaios randomizados de grande porte publicados em 2022 matizaram o entusiasmo inicial: no TEAM (NEJM 2022), a mobilização ativa precoce intensificada não aumentou dias vivo e fora do hospital até o dia 180 e houve mais eventos adversos potencialmente relacionados à mobilização no grupo intensificado. Uma metanálise de ensaios sobre mobilização ativa precoce (NEJM Evidence 2023) não demonstrou benefício em mortalidade e sinalizou possível aumento de eventos adversos em populações selecionadas. Lição central da literatura: precocidade não autoriza intensidade máxima; dose, progressão e tolerância precisam ser individualizadas, monitorizadas e reavaliadas.",
    source: { kind: "evidence", refs: ["team2022", "evidmeta2023"] },
  },
  {
    id: "recomendacoes",
    title: "Recomendações internacionais",
    body:
      "SCCM (PADIS 2018 e Focused Update 2025): reabilitar/mobilizar adultos críticos, com atenção à segurança — eventos adversos graves não são comuns durante reabilitação. Grupo de especialistas germano-austríaco (Schaller et al., Intensive Care Med 2024): 46 recomendações sobre posicionamento e mobilização precoce, definindo mobilização precoce como início em até 72h da admissão, com critérios e condutas de segurança. Consenso internacional de segurança para mobilização ativa em ventilação mecânica (Hodgson et al., Critical Care 2014) oferece parâmetros de monitorização e critérios para interromper/atrasar a atividade. Brasil: Diretrizes Brasileiras de Mobilização Precoce em UTI (AMIB/AMB, 2019) afirmam que a mobilização precoce é segura e deve ser meta de toda a equipe multiprofissional.",
    source: { kind: "recommendation", refs: ["padis2025", "schaller2024", "hodgson2014consensus", "amib2019"] },
  },
  {
    id: "principios",
    title: "Princípios da mobilização segura",
    body:
      "1) Individualização — decisão a partir do quadro clínico global, não de um número isolado. 2) Progressão gradual — partir da capacidade atual para atividades proporcionais, sem buscar o maior nível possível de imediato. 3) Monitorização estruturada — avaliar antes, durante e após, com critérios explícitos para reduzir ou interromper. 4) Segurança de dispositivos — conferir fixação e risco de deslocamento antes de mover. 5) Equipe e planejamento — dimensionar pessoal e equipamentos. 6) Documentação e reavaliação — registrar resposta e replanejar a próxima sessão. 7) Comunicação multiprofissional — sedação, analgesia e ventilação devem permitir a participação (ex.: sedação leve, triagem de delirium).",
    source: { kind: "consensus", refs: ["hodgson2014consensus", "schaller2024", "padis2018"] },
  },
];

export const THEORETICAL_SUMMARY = {
  id: "resumo-referencial",
  title: "Resumo",
  bullets: [
    "Individualizada — a decisão parte do contexto clínico completo, jamais de um único valor fisiológico.",
    "Progressiva — capacidade atual → atividade proporcional → progressão conforme tolerância.",
    "Monitorizada — vigilância estruturada antes, durante e após cada sessão.",
    "Baseada na condição clínica e funcional — estabilidade, dispositivos, consciência e resposta ao esforço definem o próximo passo.",
  ],
};
