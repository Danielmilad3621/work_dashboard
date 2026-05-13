import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard, CheckSquare, Calendar, Video, Mail, GraduationCap,
  BarChart3, Settings, Search, Bell, ChevronRight, Phone, CloudSun,
  Target, Check, Plus, BookOpen, Building2, UtensilsCrossed,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Dashboard });

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: CheckSquare, label: "Tasks" },
  { icon: Calendar, label: "Calendar" },
  { icon: Video, label: "Meetings" },
  { icon: Mail, label: "Emails" },
  { icon: GraduationCap, label: "Learning", badge: "New" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

function Sidebar() {
  return (
    <aside className="w-[240px] shrink-0 fixed left-0 top-0 h-screen bg-[#0B0F1A] border-r border-white/5 flex flex-col p-4">
      <div className="flex items-center gap-2.5 px-2 py-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
          <LayoutDashboard className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold tracking-tight">My Dashboard</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active
                  ? "bg-violet-500/15 text-white"
                  : "text-[#9CA3AF] hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-500 rounded-r" />
              )}
              <Icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:bg-white/5 cursor-pointer">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-pink-500 flex items-center justify-center text-sm font-medium">
          DC
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">Daniel Carter</div>
          <div className="text-xs text-[#6B7280] truncate">daniel@work.com</div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#6B7280]" />
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-400 to-pink-500 flex items-center justify-center font-medium">
          DC
        </div>
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
            className="bg-[#121826] border border-white/5 rounded-full pl-9 pr-4 py-2 text-sm w-72 focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <button className="relative w-10 h-10 rounded-full bg-[#121826] border border-white/5 flex items-center justify-center hover:border-violet-500/30">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-violet-500 text-[10px] flex items-center justify-center">2</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-[#121826] border border-white/5 flex items-center justify-center hover:border-violet-500/30">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon, tile, label, value, sub, children,
}: { icon: any; tile: string; label: string; value: string; sub: string; children?: React.ReactNode }) {
  return (
    <div className="dash-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className={`icon-tile ${tile} mb-4`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="text-xs text-[#9CA3AF] mb-1">{label}</div>
          <div className="text-3xl font-light tracking-tight">{value}</div>
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
        cx="34" cy="34" r={r} stroke="#F59E0B" strokeWidth="6" fill="none"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
      />
    </svg>
  );
}

const tasks = [
  { done: true, title: "Prepare client report", priority: "High", time: "10:00 AM" },
  { done: true, title: "Review project wireframes", priority: "Medium", time: "11:30 AM" },
  { done: true, title: "Team stand-up meeting", priority: "Low", time: "12:00 PM" },
  { done: false, title: "Update website content", priority: "Medium", time: "02:00 PM" },
  { done: false, title: "Follow up with design team", priority: "Low", time: "03:30 PM" },
  { done: false, title: "Send monthly newsletter", priority: "High", time: "05:00 PM" },
  { done: false, title: "Analyze campaign performance", priority: "Low", time: "" },
  { done: false, title: "Plan tomorrow's tasks", priority: "Low", time: "" },
];

const priColor: Record<string, string> = {
  High: "#F43F5E", Medium: "#F59E0B", Low: "#10B981",
};

function TasksCard() {
  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold tracking-tight">Today To-Do List</h3>
        <span className="text-xs text-[#9CA3AF]">3 / 8 completed</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 mb-5 overflow-hidden">
        <div className="h-full bg-violet-500 rounded-full" style={{ width: "37.5%" }} />
      </div>
      <ul className="space-y-1">
        {tasks.map((t, i) => (
          <li key={i} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/[0.03]">
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
              t.done ? "bg-violet-500 border-violet-500" : "border-white/15"
            }`}>
              {t.done && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            <span className={`flex-1 text-sm ${t.done ? "line-through text-[#6B7280]" : "text-[#F3F4F6]"}`}>
              {t.title}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: priColor[t.priority] }} />
              {t.priority}
            </span>
            {t.time && <span className="text-xs text-[#6B7280] w-16 text-right">{t.time}</span>}
          </li>
        ))}
      </ul>
      <button className="mt-4 text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1.5">
        <Plus className="w-4 h-4" /> Add new task
      </button>
    </div>
  );
}

const meetings = [
  {
    start: "10:30", end: "11:30 AM", title: "Client Strategy Call",
    sub: "Discuss Q2 roadmap", platform: "Zoom", chip: "violet", extra: 2,
  },
  {
    start: "03:00", end: "04:00 PM", title: "Marketing Sync",
    sub: "Campaign planning", platform: "Google Meet", chip: "emerald", extra: 3,
  },
];

function MeetingsCard() {
  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold tracking-tight">Upcoming Meetings</h3>
        <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 text-xs flex items-center justify-center">2</span>
      </div>
      <div className="space-y-3">
        {meetings.map((m, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="text-center w-16 shrink-0">
              <div className="text-sm font-medium">{m.start}</div>
              <div className="text-[10px] text-[#6B7280]">{m.end}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{m.title}</div>
              <div className="text-xs text-[#9CA3AF] truncate">{m.sub}</div>
            </div>
            <span className={`text-[10px] px-2 py-1 rounded-md ${
              m.chip === "violet" ? "bg-violet-500/20 text-violet-300" : "bg-emerald-500/20 text-emerald-300"
            }`}>{m.platform}</span>
            <div className="flex -space-x-2">
              {[0,1].map(j => (
                <div key={j} className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 border-2 border-[#121826]" />
              ))}
              <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-[#121826] text-[10px] flex items-center justify-center">+{m.extra}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-violet-400 hover:text-violet-300">View all meetings →</button>
    </div>
  );
}

const days = [
  { d: "Mon", on: true }, { d: "Tue", on: false }, { d: "Wed", on: true },
  { d: "Thu", on: false }, { d: "Fri", on: true }, { d: "Sat", on: false }, { d: "Sun", on: false },
];

function RTOCard() {
  return (
    <div className="dash-card">
      <h3 className="text-base font-semibold tracking-tight mb-5">RTO / Calendar</h3>
      <div className="flex items-center justify-between mb-5">
        {days.map((day) => (
          <div key={day.d} className="flex flex-col items-center gap-2">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
              day.on ? "bg-emerald-500/20 border border-emerald-500/40" : "border border-white/10"
            }`}>
              {day.on && <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} />}
            </div>
            <span className="text-[10px] text-[#9CA3AF]">{day.d}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 pt-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-[#F3F4F6]">RTO Target Progress</span>
          <span className="text-[#9CA3AF] text-xs">2 / 3 days</span>
        </div>
        <div className="text-2xl font-light mb-2">67%</div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-5">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "67%" }} />
        </div>
        <button className="w-full bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2">
          📅 View full calendar
        </button>
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
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300">New</span>
          </div>
          <p className="text-sm text-[#9CA3AF] mb-5 max-w-sm">
            Add resources you want to learn or revisit later.
          </p>
          <button className="bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Material
          </button>
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
          <Building2 className="w-5 h-5 text-violet-400 mb-3" />
          <div className="text-xs text-[#9CA3AF]">Office Day</div>
          <div className="text-lg font-medium">Yes</div>
          <div className="text-[10px] text-[#6B7280]">Today</div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <UtensilsCrossed className="w-5 h-5 text-emerald-400 mb-3" />
          <div className="text-xs text-[#9CA3AF]">Today's Meal</div>
          <div className="text-lg font-medium">Chicken Pasta</div>
          <div className="text-[10px] text-[#6B7280]">🍝</div>
        </div>
      </div>
      <button className="text-sm text-violet-400 hover:text-violet-300">View weekly plan →</button>
    </div>
  );
}

const emails = [
  { sender: "Sarah Johnson", subject: "Client follow-up regarding proposal", preview: "Hi Daniel, just following up on the proposal we discussed…", time: "2h ago" },
  { sender: "Marketing Team", subject: "Weekly marketing update", preview: "Here's the update for this week's campaign performance…", time: "4h ago" },
  { sender: "Invoice Desk", subject: "Invoice #INV-2025-045", preview: "Please find attached the invoice for April services.", time: "1d ago" },
];

function EmailsCard() {
  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold tracking-tight">Pending Emails</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300">5 unread</span>
      </div>
      <div className="space-y-1">
        {emails.map((e, i) => (
          <div key={i} className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-white/[0.03]">
            <div className="w-5 h-5 rounded-md border border-white/15 shrink-0" />
            <div className="w-40 text-sm font-medium truncate">{e.sender}</div>
            <div className="w-64 text-sm text-[#F3F4F6] truncate">{e.subject}</div>
            <div className="flex-1 text-sm text-[#9CA3AF] truncate">{e.preview}</div>
            <div className="text-xs text-[#6B7280] w-16 text-right">{e.time}</div>
            <div className="w-2 h-2 rounded-full bg-violet-500" />
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-violet-400 hover:text-violet-300">View all emails →</button>
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
          <StatCard icon={Calendar} tile="tile-violet" label="Today" value="9:30 AM" sub="Tue, May 20, 2025" />
          <StatCard icon={CloudSun} tile="tile-blue" label="Weather" value="12°C" sub="💧 Partly cloudy" />
          <StatCard icon={Phone} tile="tile-emerald" label="Customer Calls" value="3" sub="Scheduled today" />
          <StatCard icon={Target} tile="tile-orange" label="RTO Target" value="60%" sub="This month progress">
            <div className="relative">
              <RingProgress value={60} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">60%</span>
            </div>
          </StatCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2"><TasksCard /></div>
          <div><RTOCard /></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2 grid gap-4">
            <MeetingsCard />
            <LearningCard />
          </div>
          <div><OfficeLifeCard /></div>
        </div>

        <EmailsCard />
      </main>
    </div>
  );
}
