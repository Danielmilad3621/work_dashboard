import { Info } from "lucide-react";
import { headerCopy, metrics } from "../../lib/scorecard-data";
import { DashboardLinks } from "./DashboardLinks";
import { ManagerTable } from "./ManagerTable";
import { MetricCard } from "./MetricCard";
import { QualificationGate } from "./QualificationGate";
import { References } from "./References";
import { TableOfContents } from "./TableOfContents";

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header id={id} className="scroll-mt-8">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wide text-[#632CA6]">{eyebrow}</p>
      )}
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {description}
        </p>
      )}
    </header>
  );
}

export function ScorecardPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {headerCopy.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
            {headerCopy.subtitle}
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#632CA6]/20 bg-[#632CA6]/5 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#632CA6]" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-700">{headerCopy.banner}</p>
          </div>
        </header>

        {/* Body: TOC + content */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          <aside>
            <TableOfContents />
          </aside>

          <div className="min-w-0 space-y-14">
            {/* 1. Metrics */}
            <section aria-labelledby="measured-on">
              <SectionHeading
                id="measured-on"
                eyebrow="Section 1"
                title="What I'm measured on"
                description="Five metrics. Each card shows what counts, where it splits, and the source doc. Click a citation to jump to References."
              />
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {metrics.map((m) => (
                  <MetricCard key={m.id} metric={m} />
                ))}
              </div>
            </section>

            {/* 2. Qualification gate */}
            <section
              id="qualification-gate"
              aria-labelledby="qualification-gate-title"
              className="scroll-mt-8"
            >
              <QualificationGate />
            </section>

            {/* 3. Where to get my actual numbers */}
            <section aria-labelledby="actual-numbers">
              <SectionHeading
                id="actual-numbers"
                eyebrow="Section 3"
                title="Where to get my actual numbers"
                description="This page is the structure. These are the sources of truth for the numbers."
              />
              <div className="mt-6">
                <ManagerTable />
              </div>
            </section>

            {/* 4. Dashboards */}
            <section aria-labelledby="dashboards">
              <SectionHeading
                id="dashboards"
                eyebrow="Section 4"
                title="Live progress dashboards"
                description="Where I check attainment in-quarter."
              />
              <div className="mt-6">
                <DashboardLinks />
              </div>
            </section>

            {/* 5. References */}
            <section aria-labelledby="references">
              <SectionHeading
                id="references"
                eyebrow="Section 5"
                title="References"
                description="Source docs for every citation on this page."
              />
              <div className="mt-6">
                <References />
              </div>
            </section>

            <footer className="border-t border-slate-200 pt-6 text-xs text-slate-500">
              Internal Datadog content. Page is the structure only — actual numbers live in the
              linked dashboards and your comp plan.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
