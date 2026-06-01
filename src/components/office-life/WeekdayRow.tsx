import { Building2, Home } from "lucide-react";
import type { WeekdayPlan } from "../../lib/office";

export function WeekdayRow({ day, date, office, isToday, meal }: WeekdayPlan) {
  return (
    <div
      className={`flex flex-col gap-3 py-3 px-2 rounded-lg hover:bg-white/[0.03] md:flex-row md:items-center md:gap-4 ${
        isToday ? "bg-dd-purple/[0.06]" : ""
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 border ${
          isToday
            ? "border-dd-purple/40 bg-dd-purple/10 text-dd-purple"
            : "border-white/10 text-[#F3F4F6]"
        }`}
      >
        <span className="text-[10px] uppercase tracking-wide text-[#9CA3AF]">{day}</span>
        <span className="text-sm font-semibold font-mono leading-none">
          {date.split(" ")[1]}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium truncate text-[#F3F4F6]">
            {office ? "In the office" : "Working remote"}
          </span>
          {isToday && (
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-dd-purple/15 text-dd-purple border border-dd-purple/30">
              Today
            </span>
          )}
        </div>
        <div className="text-xs text-[#9CA3AF] truncate">{date}</div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {office ? (
          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-dd-green/15 text-dd-green border border-dd-green/30">
            <Building2 className="w-3 h-3" />
            Office
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#9CA3AF] border border-white/10">
            <Home className="w-3 h-3" />
            Remote
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 md:w-64 shrink-0">
        <span className="text-lg shrink-0">{meal.emoji}</span>
        <div className="min-w-0">
          <div className="text-xs text-[#6B7280]">Today's meal</div>
          <div className="text-sm text-[#F3F4F6] truncate">{meal.name}</div>
        </div>
      </div>
    </div>
  );
}
