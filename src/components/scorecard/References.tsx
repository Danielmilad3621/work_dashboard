import { ExternalLink } from "lucide-react";
import { references } from "../../lib/scorecard-data";

export function References() {
  return (
    <ol className="space-y-3" aria-label="References">
      {references.map((r) => (
        <li
          key={r.id}
          id={`ref-${r.id}`}
          className="flex gap-3 rounded-lg p-3 target:bg-[#632CA6]/5 target:ring-2 target:ring-[#632CA6]/30"
        >
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 font-mono text-xs font-semibold text-slate-700">
            {r.id}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-900">{r.title}</p>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 inline-flex items-center gap-1 break-all text-xs text-[#632CA6] hover:underline"
            >
              {r.url}
              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </li>
      ))}
    </ol>
  );
}
