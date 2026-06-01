import type { LucideIcon } from "lucide-react";
import { TaskRow, type TaskRowData } from "./TaskRow";

type StatusSectionProps = {
  icon: LucideIcon;
  tile: string;
  title: string;
  description: string;
  countLabel: string;
  tasks: TaskRowData[];
};

export function StatusSection({
  icon: Icon,
  tile,
  title,
  description,
  countLabel,
  tasks,
}: StatusSectionProps) {
  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`icon-tile ${tile}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            <p className="text-xs text-[#9CA3AF]">{description}</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-dd-purple/15 text-dd-purple">
          {countLabel}
        </span>
      </div>
      <div className="space-y-1">
        {tasks.map((t) => (
          <TaskRow key={t.id} {...t} />
        ))}
      </div>
    </div>
  );
}
