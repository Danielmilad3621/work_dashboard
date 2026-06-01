import type { DayData } from "./CalendarPage";
import { DayCell } from "./DayCell";

const dayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function MonthGrid({ days }: { days: DayData[] }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <div className="min-w-[640px] px-1">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayLabels.map((label) => (
            <div
              key={label}
              className="text-[11px] font-medium tracking-wider text-[#6B7280] text-center py-2"
            >
              {label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, i) => (
            <DayCell key={i} day={day} isSaturday={i % 7 === 5} />
          ))}
        </div>
      </div>
    </div>
  );
}
