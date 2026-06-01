import type { LucideIcon } from "lucide-react";
import { LearningRow, type LearningRowData } from "./LearningRow";

type CategorySectionProps = {
  icon: LucideIcon;
  tile: string;
  title: string;
  description: string;
  materials: LearningRowData[];
  emptyHint?: string;
};

export function CategorySection({
  icon: Icon,
  tile,
  title,
  description,
  materials,
  emptyHint,
}: CategorySectionProps) {
  const completed = materials.filter((m) => m.progress >= 100).length;
  const total = materials.length;
  const avg =
    total === 0 ? 0 : Math.round(materials.reduce((sum, m) => sum + m.progress, 0) / total);

  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-5 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`icon-tile ${tile}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            <p className="text-xs text-[#9CA3AF] truncate">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-[#9CA3AF] hidden sm:inline font-mono">
            {completed} / {total} done
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-dd-purple/15 text-dd-purple font-mono">
            {avg}% avg
          </span>
        </div>
      </div>

      {total === 0 ? (
        <div className="text-sm text-[#6B7280] px-2 py-6 text-center">
          {emptyHint ?? "Nothing here yet."}
        </div>
      ) : (
        <div className="space-y-1">
          {materials.map((m) => (
            <LearningRow key={m.id} {...m} />
          ))}
        </div>
      )}
    </div>
  );
}
