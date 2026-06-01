import { useMemo, useState } from "react";
import { Bell, Check, Settings, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  notifications as seedNotifications,
  notificationMeta,
  type Notification,
} from "../../lib/notifications";

type Filter = "all" | "unread";

export function NotificationsPopover() {
  const [items, setItems] = useState<Notification[]>(seedNotifications);
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState(false);

  const unread = useMemo(() => items.filter((n) => n.unread).length, [items]);

  const visible = useMemo(
    () => (filter === "unread" ? items.filter((n) => n.unread) : items),
    [items, filter],
  );

  const today = visible.filter((n) => n.bucket === "today");
  const earlier = visible.filter((n) => n.bucket === "earlier");

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  const toggleRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}
          className="relative w-10 h-10 rounded-full bg-[#121826] border border-white/5 flex items-center justify-center hover:border-dd-purple/30 focus:outline-none focus:ring-2 focus:ring-dd-purple data-[state=open]:border-dd-purple/50"
        >
          <Bell className="w-4 h-4" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-dd-pink text-[10px] flex items-center justify-center font-mono">
              {unread}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-[420px] max-w-[calc(100vw-32px)] p-0 rounded-2xl border-white/5 bg-[#121826] text-[#F3F4F6] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        <div className="px-4 pt-4 pb-3 border-b border-white/5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="icon-tile tile-violet" style={{ width: 32, height: 32 }}>
                <Bell className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-tight truncate">Notifications</div>
                <div className="text-[11px] text-[#9CA3AF] truncate">
                  {unread > 0 ? `${unread} unread` : "You're all caught up"}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={markAllRead}
              disabled={unread === 0}
              className="flex items-center gap-1.5 text-xs text-dd-purple hover:text-dd-purple/80 disabled:text-[#6B7280] disabled:cursor-not-allowed shrink-0"
            >
              <Check className="w-3.5 h-3.5" />
              Mark all read
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0F1420] border border-white/5">
            <FilterTab active={filter === "all"} onClick={() => setFilter("all")} label="All" />
            <FilterTab
              active={filter === "unread"}
              onClick={() => setFilter("unread")}
              label="Unread"
              count={unread}
            />
          </div>
        </div>

        <div className="max-h-[440px] overflow-y-auto">
          {visible.length === 0 ? (
            <EmptyState onShowAll={() => setFilter("all")} />
          ) : (
            <>
              {today.length > 0 && (
                <NotificationGroup label="Today" items={today} onToggleRead={toggleRead} />
              )}
              {earlier.length > 0 && (
                <NotificationGroup label="Earlier" items={earlier} onToggleRead={toggleRead} />
              )}
            </>
          )}
        </div>

        <div className="border-t border-white/5 px-2 py-2 flex items-center justify-between bg-[#0F1420]">
          <Link
            to="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5"
          >
            <Settings className="w-3.5 h-3.5" />
            Settings
          </Link>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-dd-purple hover:text-dd-purple/80 px-2 py-1.5 rounded-lg hover:bg-dd-purple/10"
          >
            View all notifications
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function FilterTab({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
        active ? "bg-dd-purple text-white" : "text-[#9CA3AF] hover:text-white"
      }`}
    >
      {label}
      {typeof count === "number" && count > 0 && (
        <span
          className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
            active ? "bg-white/20 text-white" : "bg-white/5 text-[#9CA3AF]"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function NotificationGroup({
  label,
  items,
  onToggleRead,
}: {
  label: string;
  items: Notification[];
  onToggleRead: (id: string) => void;
}) {
  return (
    <div className="px-2 pt-3 pb-1">
      <div className="px-2 mb-1 text-[10px] uppercase tracking-wider text-[#6B7280] font-medium">
        {label}
      </div>
      <ul className="space-y-0.5">
        {items.map((n) => (
          <li key={n.id}>
            <NotificationItem n={n} onToggleRead={onToggleRead} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function NotificationItem({
  n,
  onToggleRead,
}: {
  n: Notification;
  onToggleRead: (id: string) => void;
}) {
  const meta = notificationMeta[n.kind];
  const Icon = meta.icon;
  return (
    <button
      type="button"
      onClick={() => onToggleRead(n.id)}
      className="group w-full text-left flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-white/[0.03] focus:outline-none focus:bg-white/[0.04] transition-colors"
    >
      <div className={`icon-tile ${meta.tile} shrink-0`} style={{ width: 36, height: 36 }}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${meta.chip} shrink-0`}
          >
            {meta.label}
          </span>
          <span className="text-[11px] text-[#6B7280] font-mono truncate">{n.time}</span>
        </div>
        <div
          className={`text-sm leading-snug truncate ${
            n.unread ? "text-[#F3F4F6] font-medium" : "text-[#D1D5DB]"
          }`}
        >
          {n.title}
        </div>
        <div className="text-xs text-[#9CA3AF] truncate mt-0.5">{n.description}</div>
      </div>
      <span
        aria-hidden="true"
        className={`mt-1.5 w-2 h-2 rounded-full shrink-0 transition-colors ${
          n.unread ? "bg-dd-purple" : "bg-transparent group-hover:bg-white/10"
        }`}
      />
    </button>
  );
}

function EmptyState({ onShowAll }: { onShowAll: () => void }) {
  return (
    <div className="px-6 py-10 text-center">
      <div className="mx-auto w-12 h-12 rounded-2xl bg-dd-purple/10 border border-dd-purple/20 flex items-center justify-center mb-3">
        <Check className="w-5 h-5 text-dd-purple" />
      </div>
      <div className="text-sm font-medium mb-1">You're all caught up</div>
      <div className="text-xs text-[#9CA3AF] mb-4">
        No unread notifications. Nice work, Daniel.
      </div>
      <button
        type="button"
        onClick={onShowAll}
        className="text-xs text-dd-purple hover:text-dd-purple/80"
      >
        Show all notifications →
      </button>
    </div>
  );
}
