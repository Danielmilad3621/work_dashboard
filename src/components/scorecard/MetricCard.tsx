import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Metric } from "../../lib/scorecard-data";

export function MetricCard({ metric }: { metric: Metric }) {
  const [open, setOpen] = useState(false);
  const Icon = metric.icon;

  return (
    <article className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#632CA6]/40 hover:shadow-sm">
      <header className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#632CA6]/10 text-[#632CA6]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold tracking-tight text-slate-900">{metric.name}</h3>
          <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{metric.oneLine}</p>
        </div>
      </header>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${metric.id}-details`}
        className="mt-4 inline-flex items-center gap-1 self-start text-sm font-medium text-[#632CA6] hover:text-[#4f2484]"
      >
        {open ? "Hide details" : "Show details"}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <dl
          id={`${metric.id}-details`}
          className="mt-3 space-y-3 rounded-lg bg-slate-50 p-4 text-sm"
        >
          {metric.details.map((d) => (
            <div key={d.label}>
              <dt className="font-medium text-slate-900">{d.label}</dt>
              <dd className="mt-0.5 leading-relaxed text-slate-700">{d.body}</dd>
            </div>
          ))}
        </dl>
      )}

      <footer className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-slate-500">
        <span className="font-medium uppercase tracking-wide">References:</span>
        {metric.refs.map((r, i) => (
          <span key={r} className="inline-flex items-center">
            <a
              href={`#ref-${r}`}
              className="rounded px-1.5 py-0.5 font-mono font-medium text-[#632CA6] hover:bg-[#632CA6]/10 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#632CA6]"
              aria-label={`Jump to reference ${r}`}
            >
              [{r}]
            </a>
            {i < metric.refs.length - 1 && <span className="text-slate-300">,</span>}
          </span>
        ))}
      </footer>
    </article>
  );
}
