import { BarChart3, ExternalLink } from "lucide-react";
import { dashboardLinks } from "../../lib/scorecard-data";

export function DashboardLinks() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {dashboardLinks.map((d) => (
        <a
          key={d.id}
          href={d.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#632CA6]/40 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#632CA6]"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#632CA6]/10 text-[#632CA6]">
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-base font-semibold tracking-tight text-slate-900 group-hover:text-[#632CA6]">
                  {d.name}
                </h3>
                <ExternalLink
                  className="h-3.5 w-3.5 shrink-0 text-slate-400 group-hover:text-[#632CA6]"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-0.5 text-xs font-mono uppercase tracking-wide text-slate-500">
                {d.platform}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.description}</p>
            </div>
          </div>
        </a>
      ))}
      <p className="md:col-span-2 -mt-1 text-xs text-slate-500">
        <a
          href="#ref-6"
          className="rounded px-1 font-mono font-medium text-[#632CA6] hover:bg-[#632CA6]/10 hover:underline"
          aria-label="Jump to reference 6"
        >
          [6]
        </a>{" "}
        Sales Engineering Reporting Landscape
      </p>
    </div>
  );
}
