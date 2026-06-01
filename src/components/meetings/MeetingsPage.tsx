import { Briefcase, Users } from "lucide-react";
import { CategorySection } from "./CategorySection";
import { MeetingsHeader } from "./MeetingsHeader";
import { MeetingsHeroStrip } from "./MeetingsHeroStrip";
import type { MeetingRowData } from "./MeetingRow";
import type { Platform } from "./PlatformChip";
import { customersById } from "../../lib/tags";

type MeetingCategory = "customer" | "internal";

type Meeting = {
  id: string;
  start: string;
  end: string;
  title: string;
  sub: string;
  platform: Platform;
  attendees: number;
  category: MeetingCategory;
  callId?: string;
};

const meetings: Meeting[] = [
  {
    id: "m1",
    start: "09:30",
    end: "10:00 AM",
    title: "Acme Corp — Q2 renewal sync",
    sub: "Review pricing and next steps",
    platform: "Zoom",
    attendees: 4,
    category: "customer",
    callId: "call-acme",
  },
  {
    id: "m2",
    start: "11:00",
    end: "11:45 AM",
    title: "Globex discovery call",
    sub: "Initial requirements walkthrough",
    platform: "Google Meet",
    attendees: 3,
    category: "customer",
    callId: "call-globex",
  },
  {
    id: "m3",
    start: "02:30",
    end: "03:15 PM",
    title: "Initech proposal review",
    sub: "Walk through revised pricing sheet",
    platform: "Teams",
    attendees: 5,
    category: "customer",
    callId: "call-initech",
  },

  {
    id: "m4",
    start: "09:00",
    end: "09:15 AM",
    title: "Team standup",
    sub: "Daily sync — blockers & priorities",
    platform: "Google Meet",
    attendees: 6,
    category: "internal",
  },
  {
    id: "m5",
    start: "01:00",
    end: "01:30 PM",
    title: "1:1 with Alex",
    sub: "Weekly check-in with manager",
    platform: "Zoom",
    attendees: 2,
    category: "internal",
  },
  {
    id: "m6",
    start: "04:00",
    end: "05:00 PM",
    title: "Marketing sync",
    sub: "Campaign planning for next sprint",
    platform: "Teams",
    attendees: 5,
    category: "internal",
  },
];

function rowsFor(category: MeetingCategory): MeetingRowData[] {
  return meetings
    .filter((m) => m.category === category)
    .map((m) => {
      const call = m.callId ? customersById.get(m.callId) : undefined;
      return {
        id: m.id,
        start: m.start,
        end: m.end,
        title: m.title,
        sub: m.sub,
        platform: m.platform,
        attendees: m.attendees,
        callCompany: call?.company,
      };
    });
}

export function MeetingsPage() {
  const customerRows = rowsFor("customer");
  const internalRows = rowsFor("internal");

  const today = meetings.length;
  const customer = customerRows.length;
  const internal = internalRows.length;

  return (
    <div className="max-w-[1024px] mx-auto space-y-6">
      <MeetingsHeader />
      <MeetingsHeroStrip today={today} customer={customer} internal={internal} />
      <CategorySection
        icon={Briefcase}
        tile="tile-violet"
        title="Customer meetings"
        description="External calls — tagged to a customer"
        meetings={customerRows}
      />
      <CategorySection
        icon={Users}
        tile="tile-emerald"
        title="Internal meetings"
        description="Standups, 1:1s and team syncs"
        meetings={internalRows}
      />
    </div>
  );
}
