import { Link, useLocation } from "@tanstack/react-router";
import {
  CheckSquare,
  Calendar,
  Video,
  Mail,
  GraduationCap,
  BarChart3,
  Building2,
  Settings,
  ChevronRight,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  icon: LucideIcon;
  label: string;
  to?:
    | "/"
    | "/tasks"
    | "/calendar"
    | "/meetings"
    | "/emails"
    | "/learning"
    | "/office-life"
    | "/scorecard"
    | "/settings";
  badge?: string;
};

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" },
  { icon: CheckSquare, label: "Tasks", to: "/tasks" },
  { icon: Calendar, label: "Calendar", to: "/calendar" },
  { icon: Video, label: "Meetings", to: "/meetings" },
  { icon: Mail, label: "Emails", to: "/emails" },
  { icon: GraduationCap, label: "Learning", to: "/learning", badge: "New" },
  { icon: Building2, label: "Office Life", to: "/office-life" },
  { icon: BarChart3, label: "Scorecard", to: "/scorecard" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

export function Sidebar() {
  const { pathname } = useLocation();
  // Only the first nav item that owns the current route is highlighted,
  // so shortcuts (e.g. Meetings -> /calendar) don't double-light with Calendar.
  const activeIndex = navItems.findIndex((it) => it.to === pathname);

  return (
    <aside className="w-[240px] shrink-0 fixed left-0 top-0 h-screen bg-[#0B0F1A] border-r border-white/5 flex flex-col p-4">
      <div className="flex items-center gap-2.5 px-2 py-3 mb-6">
        <img
          src="/datadog-logo.png"
          alt="Datadog"
          className="w-8 h-8 rounded-lg object-cover shrink-0"
        />
        <span className="font-semibold tracking-tight text-dd-purple-logo">My Dashboard</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = index === activeIndex;
          const className = `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            active
              ? "bg-dd-purple/15 text-white"
              : "text-[#9CA3AF] hover:bg-white/5 hover:text-white"
          }`;
          const content = (
            <>
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-dd-purple rounded-r" />
              )}
              <Icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-dd-purple text-white">
                  {item.badge}
                </span>
              )}
            </>
          );
          if (item.to) {
            return (
              <Link key={item.label} to={item.to} className={className}>
                {content}
              </Link>
            );
          }
          return (
            <button key={item.label} type="button" className={className}>
              {content}
            </button>
          );
        })}
      </nav>
      <button
        type="button"
        aria-label="Account menu"
        className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:bg-white/5 text-left w-full focus:outline-none focus:ring-2 focus:ring-dd-purple"
      >
        <img
          src="/avatar-daniel.png"
          alt="Daniel Carter"
          className="w-9 h-9 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">Daniel Carter</div>
          <div className="text-xs text-[#6B7280] truncate">daniel@work.com</div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#6B7280]" />
      </button>
    </aside>
  );
}
