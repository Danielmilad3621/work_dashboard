import { AlertTriangle } from "lucide-react";
import { qualificationGate } from "../../lib/scorecard-data";

function renderInlineBold(text: string) {
  // Splits **bold** segments. Keeps the markup minimal — no full markdown.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-amber-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function QualificationGate() {
  const g = qualificationGate;
  return (
    <aside
      className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5 sm:p-6"
      aria-labelledby="qualification-gate-title"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            id="qualification-gate-title"
            className="text-lg font-semibold tracking-tight text-amber-950"
          >
            {g.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">{g.intro}</p>
          <ul className="mt-3 space-y-2 text-sm text-amber-900">
            {g.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                />
                <span>{renderInlineBold(b)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-medium text-amber-950">{g.closing}</p>
          <p className="mt-4 border-t border-amber-200 pt-3 text-xs leading-relaxed text-amber-800">
            {g.fineprint}{" "}
            <a
              href={`#ref-${g.ref}`}
              className="rounded px-1 font-mono font-medium text-amber-900 underline-offset-2 hover:underline"
              aria-label={`Jump to reference ${g.ref}`}
            >
              [{g.ref}]
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}
