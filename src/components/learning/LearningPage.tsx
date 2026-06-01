import { ShieldCheck, GraduationCap, Globe2 } from "lucide-react";
import { CategorySection } from "./CategorySection";
import { LearningHeader } from "./LearningHeader";
import { LearningHeroStrip } from "./LearningHeroStrip";
import type { LearningRowData } from "./LearningRow";

const materials: LearningRowData[] = [
  // Internal - mandatory
  {
    id: "im1",
    title: "Annual security & phishing awareness",
    provider: "Internal LMS · Security",
    kind: "internal",
    requirement: "mandatory",
    progress: 100,
    certification: true,
    certified: true,
    dueDate: "May 30",
  },
  {
    id: "im2",
    title: "Code of conduct & ethics refresher",
    provider: "Internal LMS · People Ops",
    kind: "internal",
    requirement: "mandatory",
    progress: 40,
    certification: true,
    certified: false,
    dueDate: "Jun 14",
  },
  {
    id: "im3",
    title: "GDPR & data handling essentials",
    provider: "Internal LMS · Legal",
    kind: "internal",
    requirement: "mandatory",
    progress: 0,
    certification: true,
    certified: false,
    dueDate: "Jul 01",
  },

  // Internal - optional
  {
    id: "io1",
    title: "Internal platform deep-dive — Billing",
    provider: "Engineering · Tech talks",
    kind: "internal",
    requirement: "optional",
    progress: 65,
    dueDate: "Self-paced",
  },
  {
    id: "io2",
    title: "Leadership 101 — managing up",
    provider: "Internal LMS · People",
    kind: "internal",
    requirement: "optional",
    progress: 20,
    certification: true,
    certified: false,
    dueDate: "Self-paced",
  },
  {
    id: "io3",
    title: "Design systems — using our tokens",
    provider: "Design · Office hours",
    kind: "internal",
    requirement: "optional",
    progress: 0,
    dueDate: "Self-paced",
  },

  // External
  {
    id: "ex1",
    title: "Advanced TypeScript Patterns",
    provider: "Frontend Masters",
    kind: "external",
    progress: 80,
    certification: true,
    certified: false,
    dueDate: "Jun 20",
    link: "https://frontendmasters.com",
  },
  {
    id: "ex2",
    title: "AWS Solutions Architect — Associate",
    provider: "AWS · Coursera",
    kind: "external",
    progress: 35,
    certification: true,
    certified: false,
    dueDate: "Aug 15",
    link: "https://aws.amazon.com/certification/",
  },
  {
    id: "ex3",
    title: "Designing Data-Intensive Applications",
    provider: "O'Reilly · Book club",
    kind: "external",
    progress: 50,
    dueDate: "Ongoing",
  },
  {
    id: "ex4",
    title: "Product Strategy Workshop",
    provider: "Reforge",
    kind: "external",
    progress: 100,
    certification: true,
    certified: true,
    dueDate: "Apr 12",
  },
];

function filterBy(
  kind: "internal" | "external",
  requirement?: "mandatory" | "optional",
): LearningRowData[] {
  return materials.filter((m) => {
    if (m.kind !== kind) return false;
    if (requirement && m.requirement !== requirement) return false;
    return true;
  });
}

export function LearningPage() {
  const mandatory = filterBy("internal", "mandatory");
  const optional = filterBy("internal", "optional");
  const external = filterBy("external");

  const total = materials.length;
  const overallProgress =
    total === 0 ? 0 : Math.round(materials.reduce((sum, m) => sum + m.progress, 0) / total);

  const mandatoryPending = mandatory.filter((m) => m.progress < 100).length;
  const mandatoryTotal = mandatory.length;

  const certs = materials.filter((m) => m.certification);
  const certificationsEarned = certs.filter((m) => m.certified).length;
  const certificationsTotal = certs.length;

  return (
    <div className="max-w-[1024px] mx-auto space-y-6">
      <LearningHeader />
      <LearningHeroStrip
        overallProgress={overallProgress}
        mandatoryPending={mandatoryPending}
        mandatoryTotal={mandatoryTotal}
        certificationsEarned={certificationsEarned}
        certificationsTotal={certificationsTotal}
      />
      <CategorySection
        icon={ShieldCheck}
        tile="tile-orange"
        title="Internal — mandatory"
        description="Compliance, security and policy training required by the company"
        materials={mandatory}
        emptyHint="Nothing required of you right now. 🎉"
      />
      <CategorySection
        icon={GraduationCap}
        tile="tile-violet"
        title="Internal — optional"
        description="Tech talks, deep-dives and skills offered internally"
        materials={optional}
        emptyHint="Browse the internal catalogue to add something."
      />
      <CategorySection
        icon={Globe2}
        tile="tile-emerald"
        title="External training & courses"
        description="Conferences, books, online courses and certifications outside the company"
        materials={external}
        emptyHint="Add your first external course or certification."
      />
    </div>
  );
}
