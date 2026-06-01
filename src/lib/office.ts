import type { Weekday } from "./rto";
import { isOfficeWeekday, weekdays } from "./rto";

export type WeekdayPlan = {
  day: Weekday;
  date: string;
  office: boolean;
  isToday?: boolean;
  meal: { name: string; emoji: string };
};

export type PerkIcon = "gym" | "snacks" | "parking" | "lounge" | "coffee" | "bike";
export type PerkStatus = "available" | "booked" | "closed";

export type Perk = {
  id: string;
  icon: PerkIcon;
  name: string;
  sub: string;
  status: PerkStatus;
};

// Today is "Tue" to match the dashboard copy ("Tue, May 20, 2025").
const todayWeekday: Weekday = "Tue";

const mealsByDay: Record<Weekday, { name: string; emoji: string }> = {
  Mon: { name: "Grilled salmon & quinoa", emoji: "🐟" },
  Tue: { name: "Chicken pasta", emoji: "🍝" },
  Wed: { name: "Veggie buddha bowl", emoji: "🥗" },
  Thu: { name: "Beef burrito bowl", emoji: "🌯" },
  Fri: { name: "Pizza & wings", emoji: "🍕" },
  Sat: { name: "Closed", emoji: "—" },
  Sun: { name: "Closed", emoji: "—" },
};

const datesByDay: Record<Weekday, string> = {
  Mon: "May 19",
  Tue: "May 20",
  Wed: "May 21",
  Thu: "May 22",
  Fri: "May 23",
  Sat: "May 24",
  Sun: "May 25",
};

export const weeklyPlan: WeekdayPlan[] = weekdays
  .filter((d) => d !== "Sat" && d !== "Sun")
  .map((day) => ({
    day,
    date: datesByDay[day],
    office: isOfficeWeekday(day),
    isToday: day === todayWeekday,
    meal: mealsByDay[day],
  }));

export const perks: Perk[] = [
  {
    id: "p1",
    icon: "gym",
    name: "On-site gym",
    sub: "Lower ground · open 06:00–22:00",
    status: "available",
  },
  {
    id: "p2",
    icon: "snacks",
    name: "Snack bar",
    sub: "Floor 4 · restocked Mon & Thu",
    status: "available",
  },
  {
    id: "p3",
    icon: "parking",
    name: "Parking spot",
    sub: "Bay 14 · booked for today",
    status: "booked",
  },
  {
    id: "p4",
    icon: "lounge",
    name: "Quiet lounge",
    sub: "Floor 3 · phone-free zone",
    status: "available",
  },
  {
    id: "p5",
    icon: "coffee",
    name: "Barista coffee",
    sub: "Lobby · until 16:00",
    status: "available",
  },
  {
    id: "p6",
    icon: "bike",
    name: "Bike storage",
    sub: "Basement · keycard access",
    status: "closed",
  },
];
