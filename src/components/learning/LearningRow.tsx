import { Award, Check, ExternalLink } from "lucide-react";

export type LearningKind = "internal" | "external";
export type LearningRequirement = "mandatory" | "optional";

export type LearningRowData = {
  id: string;
  title: string;
  provider: string;
  kind: LearningKind;
  progress: number;
  requirement?: LearningRequirement;
  certification?: boolean;
  certified?: boolean;
  dueDate?: string;
  link?: string;
};

function progressBarColor(progress: number, requirement?: LearningRequirement) {
  if (progress >= 100) return "bg-dd-green";
  if (requirement === "mandatory" && progress < 50) return "bg-dd-pink";
  if (progress < 50) return "bg-dd-orange";
  return "bg-dd-purple";
}

export function LearningRow({
  title,
  provider,
  kind,
  progress,
  requirement,
  certification,
  certified,
  dueDate,
  link,
}: LearningRowData) {
  const done = progress >= 100;
  const barColor = progressBarColor(progress, requirement);
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="flex flex-col gap-3 py-3 px-2 rounded-lg hover:bg-white/[0.03] md:flex-row md:items-center md:gap-4">
      <div
        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
          done ? "bg-dd-purple border-dd-purple" : "border-white/15"
        }`}
      >
        {done && <Check className="w-3 h-3 text-dd-green" strokeWidth={3} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm font-medium truncate ${done ? "text-[#9CA3AF]" : "text-[#F3F4F6]"}`}
          >
            {title}
          </span>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#6B7280] hover:text-dd-purple"
              aria-label="Open course link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        <div className="text-xs text-[#9CA3AF] truncate">{provider}</div>
      </div>

      <div className="flex items-center gap-2 shrink-0 flex-wrap">
        {kind === "internal" && requirement === "mandatory" && (
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-dd-pink/15 text-dd-pink border border-dd-pink/30">
            Mandatory
          </span>
        )}
        {kind === "internal" && requirement === "optional" && (
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#9CA3AF] border border-white/10">
            Optional
          </span>
        )}
        {certification && (
          <span
            className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md border ${
              certified
                ? "bg-dd-green/15 text-dd-green border-dd-green/30"
                : "bg-dd-purple/10 text-dd-purple border-dd-purple/30"
            }`}
          >
            <Award className="w-3 h-3" />
            {certified ? "Certified" : "Certification"}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 md:w-64 shrink-0">
        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${safeProgress}%` }}
          />
        </div>
        <span className="text-xs text-[#9CA3AF] w-9 text-right tabular-nums font-mono">
          {safeProgress}%
        </span>
      </div>

      <div className="text-xs text-[#6B7280] w-20 text-right shrink-0">
        {done ? "Done" : (dueDate ?? "")}
      </div>
    </div>
  );
}
