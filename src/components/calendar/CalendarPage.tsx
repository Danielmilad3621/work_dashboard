import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarHeader } from "./CalendarHeader";
import { HeroStrip } from "./HeroStrip";
import { InfoBanner } from "./InfoBanner";
import { MonthGrid } from "./MonthGrid";
import { Legend } from "./Legend";
import { weekdays, isOfficeWeekday } from "../../lib/rto";

export type DayData = {
  date: number;
  inMonth: boolean;
  isSunday: boolean;
  isToday: boolean;
  officeDay: boolean;
  event?: { name: string; color: "violet" | "amber" };
};

type BaseDay = Omit<DayData, "officeDay">;

const baseDays: BaseDay[] = [
  { date: 28, inMonth: false, isSunday: false, isToday: false },
  { date: 29, inMonth: false, isSunday: false, isToday: false },
  { date: 30, inMonth: false, isSunday: false, isToday: false },
  { date: 1, inMonth: true, isSunday: false, isToday: false },
  { date: 2, inMonth: true, isSunday: false, isToday: false },
  { date: 3, inMonth: true, isSunday: false, isToday: false },
  { date: 4, inMonth: true, isSunday: true, isToday: false },

  { date: 5, inMonth: true, isSunday: false, isToday: false },
  { date: 6, inMonth: true, isSunday: false, isToday: false },
  { date: 7, inMonth: true, isSunday: false, isToday: false },
  { date: 8, inMonth: true, isSunday: false, isToday: false },
  { date: 9, inMonth: true, isSunday: false, isToday: false },
  { date: 10, inMonth: true, isSunday: false, isToday: false },
  { date: 11, inMonth: true, isSunday: true, isToday: false },

  { date: 12, inMonth: true, isSunday: false, isToday: false },
  {
    date: 13,
    inMonth: true,
    isSunday: false,
    isToday: false,
    event: { name: "Team Meeting", color: "amber" },
  },
  { date: 14, inMonth: true, isSunday: false, isToday: false },
  { date: 15, inMonth: true, isSunday: false, isToday: false },
  { date: 16, inMonth: true, isSunday: false, isToday: false },
  { date: 17, inMonth: true, isSunday: false, isToday: false },
  { date: 18, inMonth: true, isSunday: true, isToday: false },

  { date: 19, inMonth: true, isSunday: false, isToday: false },
  {
    date: 20,
    inMonth: true,
    isSunday: false,
    isToday: true,
    event: { name: "Client Call", color: "violet" },
  },
  { date: 21, inMonth: true, isSunday: false, isToday: false },
  { date: 22, inMonth: true, isSunday: false, isToday: false },
  { date: 23, inMonth: true, isSunday: false, isToday: false },
  { date: 24, inMonth: true, isSunday: false, isToday: false },
  { date: 25, inMonth: true, isSunday: true, isToday: false },

  { date: 26, inMonth: true, isSunday: false, isToday: false },
  {
    date: 27,
    inMonth: true,
    isSunday: false,
    isToday: false,
    event: { name: "Workshop", color: "amber" },
  },
  { date: 28, inMonth: true, isSunday: false, isToday: false },
  { date: 29, inMonth: true, isSunday: false, isToday: false },
  { date: 30, inMonth: true, isSunday: false, isToday: false },
  { date: 31, inMonth: true, isSunday: false, isToday: false },
  { date: 1, inMonth: false, isSunday: true, isToday: false },
];

const mockDays: DayData[] = baseDays.map((day, i) => ({
  ...day,
  officeDay: day.inMonth && isOfficeWeekday(weekdays[i % 7]),
}));

function NavButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="w-10 h-10 rounded-xl bg-[#121826] border border-white/5 flex items-center justify-center text-[#F3F4F6] hover:border-dd-purple/30 transition-colors">
      {children}
    </button>
  );
}

export function CalendarPage() {
  return (
    <div className="max-w-[1024px] mx-auto space-y-6">
      <CalendarHeader />
      <HeroStrip />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">May 2025</h2>
        <div className="flex items-center gap-2">
          <NavButton>
            <ChevronLeft className="w-4 h-4" />
          </NavButton>
          <NavButton>
            <ChevronRight className="w-4 h-4" />
          </NavButton>
        </div>
      </div>
      <InfoBanner />
      <MonthGrid days={mockDays} />
      <Legend />
    </div>
  );
}
