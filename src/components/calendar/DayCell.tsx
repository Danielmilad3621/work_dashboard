import { Check } from "lucide-react";
import type { DayData } from "./CalendarPage";

const eventDotColor: Record<"violet" | "amber", string> = {
  violet: "var(--dd-purple)",
  amber: "var(--dd-orange)",
};

export function DayCell({ day, isSaturday = false }: { day: DayData; isSaturday?: boolean }) {
  const isWeekend = day.isSunday || isSaturday;

  const dateColor = !day.inMonth
    ? "text-[#6B7280]"
    : day.isSunday
      ? "text-dd-pink"
      : isSaturday
        ? "text-dd-pink/60"
        : "text-[#F3F4F6]";

  return (
    <div
      className={`relative rounded-xl border p-3 min-h-[80px] md:min-h-[120px] flex flex-col gap-1 ${
        isWeekend && day.inMonth
          ? "bg-[#0D111B] border-dd-pink/10"
          : "bg-[#0F1420] border-white/[0.04]"
      } ${!day.inMonth ? "opacity-50" : ""}`}
      style={
        day.isToday
          ? {
              boxShadow: "0 0 0 1px var(--dd-purple), 0 0 20px var(--dd-purple-glow)",
            }
          : undefined
      }
    >
      <div className={`text-lg font-medium leading-none font-mono ${dateColor}`}>{day.date}</div>

      {day.officeDay && (
        <div className="inline-flex items-center gap-1 self-start px-1.5 py-0.5 rounded-md bg-dd-green/10">
          <Check className="w-3 h-3 text-dd-green" strokeWidth={3} />
          <span className="text-[11px] text-dd-green">Office Day</span>
        </div>
      )}

      {day.event && (
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: eventDotColor[day.event.color] }}
          />
          <span className="text-[11px] text-[#F3F4F6] truncate">{day.event.name}</span>
        </div>
      )}
    </div>
  );
}
