import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  Settings,
  Search,
  Phone,
  CloudSun,
  Target,
  Check,
  Plus,
  Building2,
  UtensilsCrossed,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { NotificationsPopover } from "../components/notifications/NotificationsPopover";
import { weekdays, isOfficeWeekday } from "../lib/rto";

export const Route = createFileRoute("/")({ component: Dashboard });

function TopBar() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <img
          src="/avatar-daniel.png"
          alt="Daniel Carter"
          className="w-11 h-11 rounded-full object-cover shrink-0"
        />
        <div>
          <div className="text-lg font-semibold tracking-tight">Good morning, Daniel 👋</div>
          <div className="text-sm text-[#9CA3AF]">You have 6 tasks and 2 meetings today.</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            placeholder="Search anything…"
            className="bg-[#121826] border border-white/5 rounded-full pl-9 pr-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-dd-purple focus:border-transparent"
          />
        </div>
        <NotificationsPopover />
        <Link
          to="/settings"
          aria-label="Settings"
          className="w-10 h-10 rounded-full bg-[#121826] border border-white/5 flex items-center justify-center hover:border-dd-purple/30"
        >
          <Settings className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  tile,
  label,
  value,
  sub,
  children,
}: {
  icon: LucideIcon;
  tile: string;
  label: string;
  value: string;
  sub: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="dash-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dd-purple/10 to-transparent pointer-events-none" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className={`icon-tile ${tile} mb-4`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="text-xs text-[#9CA3AF] mb-1">{label}</div>
          <div className="text-3xl font-light tracking-tight font-mono">{value}</div>
          <div className="text-xs text-[#6B7280] mt-1">{sub}</div>
        </div>
        {children}
      </div>
    </div>
  );
}

function RingProgress({ value }: { value: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width="68" height="68" className="-rotate-90">
      <circle cx="34" cy="34" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
      <circle
        cx="34"
        cy="34"
        r={r}
        stroke="var(--dd-orange)"
        strokeWidth="6"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

const tasks = [
  { id: "dt1", done: true, title: "Prepare client report", priority: "High", time: "10:00 AM" },
  {
    id: "dt2",
    done: true,
    title: "Review project wireframes",
    priority: "Medium",
    time: "11:30 AM",
  },
  { id: "dt3", done: true, title: "Team stand-up meeting", priority: "Low", time: "12:00 PM" },
  { id: "dt4", done: false, title: "Update website content", priority: "Medium", time: "02:00 PM" },
  {
    id: "dt5",
    done: false,
    title: "Follow up with design team",
    priority: "Low",
    time: "03:30 PM",
  },
  { id: "dt6", done: false, title: "Send monthly newsletter", priority: "High", time: "05:00 PM" },
  { id: "dt7", done: false, title: "Analyze campaign performance", priority: "Low", time: "" },
  { id: "dt8", done: false, title: "Plan tomorrow's tasks", priority: "Low", time: "" },
];

const priColor: Record<string, string> = {
  High: "var(--dd-pink)",
  Medium: "var(--dd-orange)",
  Low: "var(--dd-green)",
};

function TasksCard() {
  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold tracking-tight">Today To-Do List</h3>
        <span className="text-xs text-[#9CA3AF] font-mono">3 / 8 completed</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 mb-5 overflow-hidden">
        <div className="h-full bg-dd-purple rounded-full" style={{ width: "37.5%" }} />
      </div>
      <ul className="space-y-1">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/[0.03]"
          >
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                t.done ? "bg-dd-purple border-dd-purple" : "border-white/15"
              }`}
            >
              {t.done && <Check className="w-3 h-3 text-dd-green" strokeWidth={3} />}
            </div>
            <span
              className={`flex-1 text-sm ${t.done ? "line-through text-[#6B7280]" : "text-[#F3F4F6]"}`}
            >
              {t.title}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: priColor[t.priority] }}
              />
              {t.priority}
            </span>
            {t.time && (
              <span className="text-xs text-[#6B7280] w-16 text-right font-mono">{t.time}</span>
            )}
          </li>
        ))}
      </ul>
      <Link
        to="/tasks"
        className="mt-4 inline-flex items-center gap-1.5 text-sm text-dd-purple hover:text-dd-purple/80"
      >
        View all tasks <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

const meetings = [
  {
    id: "dm1",
    start: "10:30",
    end: "11:30 AM",
    title: "Client Strategy Call",
    sub: "Discuss Q2 roadmap",
    platform: "Zoom",
    chip: "violet",
    extra: 2,
  },
  {
    id: "dm2",
    start: "03:00",
    end: "04:00 PM",
    title: "Marketing Sync",
    sub: "Campaign planning",
    platform: "Google Meet",
    chip: "emerald",
    extra: 3,
  },
];

function MeetingsCard() {
  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold tracking-tight">Upcoming Meetings</h3>
        <span className="w-6 h-6 rounded-full bg-dd-purple text-white text-xs flex items-center justify-center font-mono">
          2
        </span>
      </div>
      <div className="space-y-3">
        {meetings.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02]"
          >
            <div className="text-center w-16 shrink-0">
              <div className="text-sm font-medium font-mono">{m.start}</div>
              <div className="text-[10px] text-[#6B7280] font-mono">{m.end}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{m.title}</div>
              <div className="text-xs text-[#9CA3AF] truncate">{m.sub}</div>
            </div>
            <span
              className={`text-[10px] px-2 py-1 rounded-md ${
                m.chip === "violet"
                  ? "bg-dd-purple/15 text-dd-purple"
                  : "bg-dd-green/15 text-dd-green"
              }`}
            >
              {m.platform}
            </span>
            <div className="flex -space-x-2">
              {[0, 1].map((j) => (
                <div
                  key={j}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-dd-purple to-dd-pink border-2 border-[#121826]"
                />
              ))}
              <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-[#121826] text-[10px] flex items-center justify-center font-mono">
                +{m.extra}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/meetings"
        className="mt-4 inline-flex items-center gap-1.5 text-sm text-dd-purple hover:text-dd-purple/80"
      >
        View all meetings <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function RTOCard() {
  return (
    <div className="dash-card">
      <h3 className="text-base font-semibold tracking-tight mb-5">RTO / Calendar</h3>
      <div className="flex items-center justify-between mb-5">
        {weekdays.map((day) => {
          const on = isOfficeWeekday(day);
          return (
            <div key={day} className="flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  on ? "bg-dd-green/20 border border-dd-green/40" : "border border-white/10"
                }`}
              >
                {on && <Check className="w-4 h-4 text-dd-green" strokeWidth={3} />}
              </div>
              <span className="text-[10px] text-[#9CA3AF]">{day}</span>
            </div>
          );
        })}
      </div>
      <div className="border-t border-white/5 pt-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-[#F3F4F6]">RTO Target Progress</span>
          <span className="text-[#9CA3AF] text-xs font-mono">2 / 3 days</span>
        </div>
        <div className="text-2xl font-light mb-2 font-mono">67%</div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-5">
          <div className="h-full bg-dd-green rounded-full" style={{ width: "67%" }} />
        </div>
        <Link
          to="/calendar"
          className="w-full bg-dd-purple hover:bg-dd-purple/90 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2"
        >
          📅 View full calendar
        </Link>
      </div>
    </div>
  );
}

function LearningCard() {
  return (
    <div className="dash-card relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base font-semibold tracking-tight">Learning Materials</h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-dd-purple text-white">
              New
            </span>
          </div>
          <p className="text-sm text-[#9CA3AF] mb-5 max-w-sm">
            Track internal and external training, certifications and progress.
          </p>
          <Link
            to="/learning"
            className="bg-dd-purple hover:bg-dd-purple/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Material
          </Link>
        </div>
        <div className="text-6xl opacity-90">📚</div>
      </div>
    </div>
  );
}

function OfficeLifeCard() {
  return (
    <div className="dash-card">
      <h3 className="text-base font-semibold tracking-tight mb-4">Office Life</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <Building2 className="w-5 h-5 text-dd-purple mb-3" />
          <div className="text-xs text-[#9CA3AF]">Office Day</div>
          <div className="text-lg font-medium">Yes</div>
          <div className="text-[10px] text-[#6B7280]">Today</div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <UtensilsCrossed className="w-5 h-5 text-dd-green mb-3" />
          <div className="text-xs text-[#9CA3AF]">Today's Meal</div>
          <div className="text-lg font-medium">Chicken Pasta</div>
          <div className="text-[10px] text-[#6B7280]">🍝</div>
        </div>
      </div>
      <Link
        to="/office-life"
        className="inline-block text-sm text-dd-purple hover:text-dd-purple/80"
      >
        View weekly plan →
      </Link>
    </div>
  );
}

const emails = [
  {
    id: "de1",
    sender: "Sarah Johnson",
    subject: "Client follow-up regarding proposal",
    preview: "Hi Daniel, just following up on the proposal we discussed…",
    time: "2h ago",
  },
  {
    id: "de2",
    sender: "Marketing Team",
    subject: "Weekly marketing update",
    preview: "Here's the update for this week's campaign performance…",
    time: "4h ago",
  },
  {
    id: "de3",
    sender: "Invoice Desk",
    subject: "Invoice #INV-2025-045",
    preview: "Please find attached the invoice for April services.",
    time: "1d ago",
  },
];

function EmailsCard() {
  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold tracking-tight">Pending Emails</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-dd-purple/15 text-dd-purple">
          5 unread
        </span>
      </div>
      <div className="space-y-1">
        {emails.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-white/[0.03]"
          >
            <div className="w-5 h-5 rounded-md border border-white/15 shrink-0" />
            <div className="w-40 text-sm font-medium truncate">{e.sender}</div>
            <div className="w-64 text-sm text-[#F3F4F6] truncate">{e.subject}</div>
            <div className="flex-1 text-sm text-[#9CA3AF] truncate">{e.preview}</div>
            <div className="text-xs text-[#6B7280] w-16 text-right font-mono">{e.time}</div>
            <div className="w-2 h-2 rounded-full bg-dd-purple" />
          </div>
        ))}
      </div>
      <Link
        to="/emails"
        className="mt-4 inline-block text-sm text-dd-purple hover:text-dd-purple/80"
      >
        View all emails →
      </Link>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#F3F4F6]">
      <Sidebar />
      <main className="ml-[240px] p-8 max-w-[1600px]">
        <TopBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={Calendar}
            tile="tile-violet"
            label="Today"
            value="9:30 AM"
            sub="Tue, May 20, 2025"
          />
          <StatCard
            icon={CloudSun}
            tile="tile-cyan"
            label="Weather"
            value="12°C"
            sub="💧 Partly cloudy"
          />
          <StatCard
            icon={Phone}
            tile="tile-emerald"
            label="Customer Calls"
            value="3"
            sub="Scheduled today"
          />
          <StatCard
            icon={Target}
            tile="tile-orange"
            label="RTO Target"
            value="60%"
            sub="This month progress"
          >
            <div className="relative">
              <RingProgress value={60} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium font-mono">
                60%
              </span>
            </div>
          </StatCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <TasksCard />
          </div>
          <div>
            <RTOCard />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2 grid gap-4">
            <MeetingsCard />
            <LearningCard />
          </div>
          <div>
            <OfficeLifeCard />
          </div>
        </div>

        <EmailsCard />
      </main>
    </div>
  );
}
