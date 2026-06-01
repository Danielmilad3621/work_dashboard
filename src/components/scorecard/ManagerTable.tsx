import { FileText, Users, MessageSquare } from "lucide-react";
import { managers, slackChannels } from "../../lib/scorecard-data";

function SubBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof FileText;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#632CA6]/10 text-[#632CA6]">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <h3 className="text-sm font-semibold tracking-tight text-slate-900">{title}</h3>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}

export function ManagerTable() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <SubBlock icon={FileText} title="Comp plan / quota letter">
        <p>From RevOps. Has dollar NN MRR target, PA count, and regional multipliers.</p>
      </SubBlock>

      <SubBlock icon={Users} title="My manager">
        <p className="text-slate-600">By region:</p>
        <table className="mt-3 w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th className="pb-2 pr-3 font-medium">Region</th>
              <th className="pb-2 font-medium">Manager</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {managers.map((m) => (
              <tr key={m.region}>
                <td className="py-2 pr-3 font-mono text-xs text-slate-600">{m.region}</td>
                <td className="py-2 font-medium text-slate-900">{m.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-slate-500">
          <a
            href="#ref-5"
            className="rounded px-1 font-mono font-medium text-[#632CA6] hover:bg-[#632CA6]/10 hover:underline"
            aria-label="Jump to reference 5"
          >
            [5]
          </a>
        </p>
      </SubBlock>

      <SubBlock icon={MessageSquare} title="Slack channels">
        <ul className="space-y-1.5">
          {slackChannels.map((c) => (
            <li key={c}>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800">
                {c}
              </code>
            </li>
          ))}
        </ul>
      </SubBlock>
    </div>
  );
}
