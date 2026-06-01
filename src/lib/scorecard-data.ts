import type { LucideIcon } from "lucide-react";
import { TrendingUp, Layers, GitBranch, FlaskConical, Trophy } from "lucide-react";

export type ReferenceId = 1 | 2 | 3 | 4 | 5 | 6;

export type Reference = {
  id: ReferenceId;
  title: string;
  url: string;
};

export const references: Reference[] = [
  {
    id: 1,
    title: "Sales Engineering Dashboard",
    url: "https://datadoghq.atlassian.net/wiki/spaces/GTMDA/pages/5587207382",
  },
  {
    id: 2,
    title: "CS Product Attach",
    url: "https://datadoghq.atlassian.net/wiki/spaces/GTMDA/pages/4986077786",
  },
  {
    id: 3,
    title: "Product Attachments",
    url: "https://datadoghq.atlassian.net/wiki/spaces/CS/pages/3752165675",
  },
  {
    id: 4,
    title: "Customer Success Supplemental Guidelines (SEEG)",
    url: "https://datadoghq.atlassian.net/wiki/spaces/SEEG/pages/2934702429",
  },
  {
    id: 5,
    title: "Customer Success SE Team",
    url: "https://datadoghq.atlassian.net/wiki/spaces/MCSE/pages/3685056802",
  },
  {
    id: 6,
    title: "Sales Engineering Reporting Landscape",
    url: "https://datadoghq.atlassian.net/wiki/spaces/SOE/pages/6480692225",
  },
];

export type MetricDetailItem = { label: string; body: string };

export type Metric = {
  id: string;
  name: string;
  icon: LucideIcon;
  oneLine: string;
  details: MetricDetailItem[];
  refs: ReferenceId[];
};

export const metrics: Metric[] = [
  {
    id: "net-new-mrr",
    name: "Net New MRR",
    icon: TrendingUp,
    oneLine: "Expansion revenue from existing customers.",
    details: [
      {
        label: "Direct (Lead SE)",
        body: "Credit on opps where I'm the Lead SE on the SFDC opportunity.",
      },
      {
        label: "Indirect (SE-Touched)",
        body: "Credit when I'm an assigned SE on the SFDC Event but not the Lead SE. Counts toward attainment at a reduced weighting.",
      },
    ],
    refs: [1],
  },
  {
    id: "product-attach",
    name: "Product Attach",
    icon: Layers,
    oneLine: "First-time product commits at an account.",
    details: [
      {
        label: "What counts",
        body: 'Scored as "Reenergized" — first time the product has been attached at the account in the last 2 years.',
      },
      {
        label: "Excluded products",
        body: "Infra Pro, Containers, Ingested Metrics, Network Flows, Normalized Queries, Custom Events.",
      },
    ],
    refs: [2, 3],
  },
  {
    id: "pipeline-coverage",
    name: "Pipeline Coverage",
    icon: GitBranch,
    oneLine: "% of CS-aligned opps in my patch that I've touched.",
    details: [
      {
        label: "How it's sliced",
        body: "Measured by stage and by NN MRR band so small opps and large opps are tracked separately.",
      },
      {
        label: "What counts as 'touched'",
        body: "Lead SE assignment or SE Event participation on the opportunity in SFDC.",
      },
    ],
    refs: [1],
  },
  {
    id: "evals-run",
    name: "Evals Run",
    icon: FlaskConical,
    oneLine: "POVs and Enhanced Trials I've delivered.",
    details: [
      {
        label: "Lead SE evals",
        body: "POVs / Enhanced Trials where I'm the Lead SE on the SFDC opportunity.",
      },
      {
        label: "SE-Touched evals",
        body: "POVs / Enhanced Trials where I participated as an assigned SE on the SFDC Event but not as Lead.",
      },
    ],
    refs: [1],
  },
  {
    id: "win-rate",
    name: "Win Rate & Technical Win Rate",
    icon: Trophy,
    oneLine: "Closed-won opps where I was Lead SE.",
    details: [
      {
        label: "Win rate",
        body: "Standard: closed-won / (closed-won + closed-lost) on opps where I was the Lead SE.",
      },
      {
        label: "Technical Win credit",
        body: "Applies even on closed-lost opps when I ran a POV and the opp has technical_win = 'won'. Protects technical credit when the deal is lost on commercial reasons.",
      },
    ],
    refs: [1],
  },
];

export type Manager = {
  region: "East" | "EMEA" | "APAC" | "West";
  name: string;
};

export const managers: Manager[] = [
  { region: "East", name: "Ben Mello" },
  { region: "EMEA", name: "Alex Hurduc" },
  { region: "APAC", name: "Ross Rotherham" },
  { region: "West", name: "Corey Blakeborough" },
];

export const slackChannels: string[] = ["#sales-engineering-comp", "#cs-revops"];

export type DashboardLink = {
  id: string;
  name: string;
  platform: "Metabase" | "Tableau";
  description: string;
  url: string;
};

export const dashboardLinks: DashboardLink[] = [
  {
    id: "se-ic-kpis",
    name: "Sales Engineering IC KPIs Summary",
    platform: "Metabase",
    description: "Filterable to me — IC-level NN MRR, PA, pipeline, evals, win rate.",
    url: "https://metabase-analytics.us1.prod.dog/dashboard/67853-sales-engineering-ic-kpis-summary",
  },
  {
    id: "cs-se-kpi",
    name: "CS SE KPI Dashboard",
    platform: "Tableau",
    description: "Manager+ access. Team-level rollups and trend lines.",
    url: "https://us-east-1.online.tableau.com/#/site/datadog/workbooks/1135304/views",
  },
];

export const qualificationGate = {
  title: "Does it count?",
  intro: "A demo or eval only counts toward attainment if the opp is:",
  bullets: [
    "Tagged **Net New Product** or **Business Unit**",
    "Has **$10k+ Growth MRR** in the Deal Information section",
    "Has **New Product Name** filled in",
  ],
  closing: "Below this bar, it's enablement — not attainment.",
  fineprint:
    "This is the Americas Commercial threshold. Other regions may differ — confirm with your manager.",
  ref: 4 as ReferenceId,
};

export const headerCopy = {
  title: "My CSSE Scorecard",
  subtitle: "What I'm measured on at Datadog — and where to find my actual numbers",
  banner:
    "Your dollar targets aren't here. They're in your comp plan / quota letter from RevOps. This page is the structure, not the numbers.",
};

export type Section = {
  id: string;
  label: string;
};

export const sections: Section[] = [
  { id: "measured-on", label: "What I'm measured on" },
  { id: "qualification-gate", label: "Qualification Gate" },
  { id: "actual-numbers", label: "Where to get my actual numbers" },
  { id: "dashboards", label: "Live progress dashboards" },
  { id: "references", label: "References" },
];
