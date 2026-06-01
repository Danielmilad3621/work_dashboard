import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type CategorySectionProps = {
  icon: LucideIcon;
  tile: string;
  title: string;
  description: string;
  stat?: string;
  statChip?: string;
  children: ReactNode;
};

export function CategorySection({
  icon: Icon,
  tile,
  title,
  description,
  stat,
  statChip,
  children,
}: CategorySectionProps) {
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
          {stat && (
            <span className="text-xs text-[#9CA3AF] hidden sm:inline font-mono">{stat}</span>
          )}
          {statChip && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-dd-purple/15 text-dd-purple font-mono">
              {statChip}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
