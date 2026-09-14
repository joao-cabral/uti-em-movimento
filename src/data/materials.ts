import type { MaterialItem } from "../types";

export const MATERIAL_CATEGORIES = [
  "Diretrizes",
  "Artigos científicos",
  "Escalas",
  "Fluxogramas",
  "Checklists",
  "Referências",
  "Sobre o projeto",
] as const;

export const MATERIALS: MaterialItem[] = [
  {
    id: "mat-padis2025",
    category: "Diretrizes",
    title: "SCCM PADIS — Focused Update 2025 (Immobility)",
    description:
      "Atualização da diretriz da SCCM sobre dor, ansiedade, agitação/sedação, delirium, imobilidade e sono na UTI. Recomenda (condicional, certeza moderada) mobilização/reabilitação aprimorada em relação ao cuidado usual; reconhece que eventos adversos graves não são comuns durante a reabilitação.",
    url: "https://pubmed.ncbi.nlm.nih.gov/39982143/",
    citation: "Lewis K, Balas MC, Stollings JL, et al. Crit Care Med. 2025;53(3):e711-e727.",
  },
  {
    id: "mat-padis2018",
    category: "Diretrizes",
    title: "Diretrizes PADIS (SCCM, 2018) — seção Imobilidade",
    description:
      "Base da recomendação atual: sugerem realizar reabilitação/mobilização em adultos criticamente enfermos.",
    url: "https://www.sccm.org/clinical-resources/guidelines/guidelines/guidelines-for-the-prevention-and-management-of-pa",
    citation: "Devlin JW, Skrobik Y, Gélinas C, et al. Crit Care Med. 2018;46(9):e825-e873.",
  },
  {
    id: "mat-schaller2024",
    category: "Diretrizes",
    title: "Diretriz de posicionamento e mobilização precoce (Schaller et al., 2024)",
    description:
      "Painel interdisciplinar germano-austríaco: 46 recomendações sobre posicionamento e mobilização precoce em pacientes críticos adultos; define mobilização precoce como início em até 72h da admissão.",
    url: "https://pubmed.ncbi.nlm.nih.gov/39073582/",
    citation: "Schaller SJ, Scheffenbichler FT, Bein T, et al. Intensive Care Med. 2024;50(8):1211-1227.",
  },
  {
    id: "mat-amib2019",
    category: "Diretrizes",
    title: "Diretrizes Brasileiras de Mobilização Precoce em UTI (AMIB/AMB)",
    description:
      "Referência nacional: mobilização precoce é segura e deve ser meta de toda a equipe multiprofissional; aborda candidatos, contraindicações, dose e desfechos.",
    url: "https://www.scielo.br/j/rbti/a/5HVNpmmyXy8Z5mcgrcLV7GJ/",
    citation: "Aquim EE, Bernardo W, Buzzini RC, et al. Rev Bras Ter Intensiva. 2019;31(4):434-443.",
  },
  {
    id: "mat-ats2014",
    category: "Diretrizes",
    title: "ATS — Diagnóstico da fraqueza muscular adquirida na UTI",
    description:
      "Diretriz oficial da American Thoracic Society para identificação e diagnóstico de FMA-UTI em adultos (inclui uso do exame com escala MRC).",
    url: "https://www.thoracic.org/statements/resources/cc/ICUAW_cpg.pdf",
    citation: "Fan E, Cheek F, Chlan L, et al. Am J Respir Crit Care Med. 2014;190(12):1437-1446.",
  },
  {
    id: "mat-team2022",
    category: "Artigos científicos",
    title: "TEAM Trial (NEJM 2022)",
    description:
      "Ensaio randomizado multicêntrico: mobilização ativa precoce intensificada não aumentou dias vivo e fora do hospital até o dia 180, com mais eventos adversos potencialmente relacionados no grupo intensificado. Referência central do princípio 'precoce ≠ máximo'.",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2209083",
    citation: "Hodgson CL, Bailey M, Bellomo R, et al. N Engl J Med. 2022;387(19):1747-1758.",
  },
  {
    id: "mat-evidmeta2023",
    category: "Artigos científicos",
    title: "Metanálise de mobilização ativa precoce (NEJM Evidence 2023)",
    description:
      "Metanálise de ensaios randomizados de mobilização ativa precoce em UTI: sem demonstração de benefício em mortalidade e sinal de possível aumento de eventos adversos em pacientes em ventilação mecânica ao início.",
    url: "https://evidence.nejm.org/doi/full/10.1056/EVIDoa2200234",
    citation: "NEJM Evidence. 2023;2(2). doi:10.1056/EVIDoa2200234",
  },
  {
    id: "mat-iccn2024",
    category: "Artigos científicos",
    title: "Meta-análise em rede — mobilização em até 72h (2024)",
    description:
      "Revisão sistemática com meta-análise em rede: mobilização precoce sozinha reduziu dias de internação na UTI e no hospital; também melhorou funcionalidade e qualidade de vida.",
    url: "https://pubmed.ncbi.nlm.nih.gov/37948898/",
    citation: "Intensive Crit Care Nurs. 2024;80:103573.",
  },
  {
    id: "mat-consensus2014",
    category: "Artigos científicos",
    title: "Consenso internacional — critérios de segurança na mobilização ativa (VM)",
    description:
      "Recomendações de especialistas sobre parâmetros de segurança para mobilizar pacientes adultos em ventilação mecânica: quando é seguro iniciar, continuar, parar/atrasar.",
    url: "https://pubmed.ncbi.nlm.nih.gov/25475522/",
    citation: "Hodgson CL, Beedle B, Brown R, et al. Crit Care. 2014;18(6):658.",
  },
  {
    id: "mat-ims",
    category: "Escalas",
    title: "ICU Mobility Scale (IMS)",
    description:
      "Escala internacional de 0 a 10 para o maior nível de mobilização realizado na UTI; viável, com boa reprodutibilidade, validade e responsividade. Útil para padronizar comunicação e registro.",
    url: "https://www.monash.edu/__data/assets/pdf_file/0010/933985/icu_mobility_scale.pdf",
    citation: "Hodgson C, Needham D, Haines K, et al. Heart Lung. 2014;43(1):19-24; Tipping CJ, et al. Ann Am Thorac Soc. 2016;13(6):887-893.",
  },
  {
    id: "mat-mrc",
    category: "Escalas",
    title: "MRC Sum Score (força muscular 0–5)",
    description:
      "Avaliação clínica de força em grupos musculares (escala MRC); soma 0–60. <48 apoia o diagnóstico de FMA-UTI em paciente cooperativo, conforme diretrizes.",
    url: "https://pubmed.ncbi.nlm.nih.gov/12472328/",
    citation: "De Jonghe B, Sharshar T, Lefaucheur JP, et al. JAMA. 2002;288(22):2859-2867; Stevens RD, et al. Crit Care Med. 2009;37(Suppl):S299-S308.",
  },
  {
    id: "mat-camicu",
    category: "Escalas",
    title: "CAM-ICU (triagem de delirium)",
    description:
      "Instrumento válido e rápido para identificar delirium em pacientes criticamente enfermos, inclusive em ventilação mecânica. Importante na etapa neurológica da avaliação.",
    url: "https://pubmed.ncbi.nlm.nih.gov/11730446/",
    citation: "Ely EW, Inouye SK, Bernard GR, et al. JAMA. 2001;286(21):2703-2710.",
  },
  {
    id: "mat-fluxograma",
    category: "Fluxogramas",
    title: "Fluxo de decisão do aplicativo",
    description:
      "Fluxo educacional de triagem: condição clínica → cardiovascular → respiratório → neurológico → dispositivos → capacidade funcional → resultado → plano → monitorização → registro.",
  },
  {
    id: "mat-checklist",
    category: "Checklists",
    title: "Checklist de segurança da sessão",
    description:
      "Sequência: preparar paciente/ambiente/dispositivos → definir objetivo e nível → executar com assistência proporcional → monitorar sinais de alerta → interromper precocemente se necessário → registrar e reavaliar.",
  },
  {
    id: "mat-refs",
    category: "Referências",
    title: "Lista completa de referências",
    description:
      "Todas as fontes citadas pelo aplicativo, identificadas como diretriz, ensaio clínico, revisão sistemática ou consenso, com DOI/PubMed. Nenhuma referência foi criada para este projeto.",
  },
  {
    id: "mat-sobre",
    category: "Sobre o projeto",
    title: "Sobre o UTI em Movimento",
    description:
      "Projeto acadêmico de extensão — ferramenta educacional de apoio à decisão em Fisioterapia Intensiva. Não armazena dados identificáveis de pacientes e não substitui a avaliação clínica.",
  },
];
