import type { LucideIcon } from "lucide-react";
import { MeetingRow, type MeetingRowData } from "./MeetingRow";

type CategorySectionProps = {
  icon: LucideIcon;
  tile: string;
  title: string;
  description: string;
  meetings: MeetingRowData[];
};

export function CategorySection({
  icon: Icon,
  tile,
  title,
  description,
  meetings,
}: CategorySectionProps) {
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
          {meetings.length} today
        </span>
      </div>
      {meetings.length === 0 ? (
        <div className="text-sm text-[#6B7280] px-2 py-6 text-center">
          No meetings in this category today.
        </div>
      ) : (
        <div className="space-y-3">
          {meetings.map(({ id, ...m }) => (
            <MeetingRow key={id} {...m} />
          ))}
        </div>
      )}
    </div>
  );
}
