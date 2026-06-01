export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const weekdays: readonly Weekday[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

const officeWeekdays: ReadonlySet<Weekday> = new Set<Weekday>(["Mon", "Wed", "Fri"]);

export function isOfficeWeekday(day: Weekday): boolean {
  return officeWeekdays.has(day);
}

export const officeDaysPerWeek = officeWeekdays.size;
