import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { sections } from "../../lib/scorecard-data";

function useActiveSection(): string {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio that's currently
        // intersecting; falls back to the most recent if none intersect.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Trigger when section enters the upper-middle of the viewport.
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function TableOfContents() {
  const active = useActiveSection();

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav aria-label="Page sections" className="sticky top-8 hidden lg:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          On this page
        </p>
        <ul className="space-y-1 border-l border-slate-200">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                    isActive
                      ? "border-[#632CA6] font-medium text-[#632CA6]"
                      : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile/tablet: collapsed disclosure */}
      <details className="group rounded-lg border border-slate-200 bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between p-3 text-sm font-medium text-slate-900">
          <span>On this page</span>
          <ChevronDown
            className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <ul className="border-t border-slate-100 p-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#632CA6]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
