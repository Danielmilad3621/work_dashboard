import {
  AtSign,
  Video,
  CheckSquare,
  Mail,
  GraduationCap,
  Building2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type NotificationKind =
  | "mention"
  | "meeting"
  | "task"
  | "email"
  | "learning"
  | "rto"
  | "system";

export type NotificationBucket = "today" | "earlier";

export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  bucket: NotificationBucket;
  actor?: string;
};

type KindMeta = {
  label: string;
  icon: LucideIcon;
  tile: string;
  chip: string;
};

export const notificationMeta: Record<NotificationKind, KindMeta> = {
  mention: {
    label: "Mention",
    icon: AtSign,
    tile: "tile-violet",
    chip: "bg-dd-purple/15 text-dd-purple",
  },
  meeting: {
    label: "Meeting",
    icon: Video,
    tile: "tile-cyan",
    chip: "bg-dd-cyan/15 text-dd-cyan",
  },
  task: {
    label: "Task",
    icon: CheckSquare,
    tile: "tile-emerald",
    chip: "bg-dd-green/15 text-dd-green",
  },
  email: {
    label: "Email",
    icon: Mail,
    tile: "tile-blue",
    chip: "bg-dd-blue/15 text-dd-blue",
  },
  learning: {
    label: "Learning",
    icon: GraduationCap,
    tile: "tile-orange",
    chip: "bg-dd-orange/15 text-dd-orange",
  },
  rto: {
    label: "RTO",
    icon: Building2,
    tile: "tile-emerald",
    chip: "bg-dd-green/15 text-dd-green",
  },
  system: {
    label: "System",
    icon: Sparkles,
    tile: "tile-violet",
    chip: "bg-white/5 text-[#9CA3AF]",
  },
};

export const notifications: Notification[] = [
  {
    id: "n1",
    kind: "mention",
    actor: "Alex Park",
    title: "Alex Park mentioned you in #se-emea",
    description: "“@daniel can you grab the Acme renewal deck before 3pm?”",
    time: "4m ago",
    unread: true,
    bucket: "today",
  },
  {
    id: "n2",
    kind: "meeting",
    title: "Client Strategy Call starts in 15 minutes",
    description: "Zoom · 10:30 – 11:30 AM · Acme Corp",
    time: "12m ago",
    unread: true,
    bucket: "today",
  },
  {
    id: "n3",
    kind: "email",
    actor: "Sarah Johnson",
    title: "New customer email from Sarah Johnson",
    description: "Client follow-up regarding proposal — tagged Acme Corp",
    time: "2h ago",
    unread: false,
    bucket: "today",
  },
  {
    id: "n4",
    kind: "task",
    title: "Task “Update website content” is due at 2:00 PM",
    description: "Medium priority · assigned to you",
    time: "3h ago",
    unread: false,
    bucket: "today",
  },
  {
    id: "n5",
    kind: "rto",
    title: "Office day tomorrow",
    description: "You’re marked in-office Wednesday — desk D-14 booked",
    time: "Today, 09:01",
    unread: false,
    bucket: "today",
  },
  {
    id: "n6",
    kind: "learning",
    title: "Mandatory security training due in 5 days",
    description: "Annual InfoSec module · ~25 min",
    time: "Yesterday",
    unread: false,
    bucket: "earlier",
  },
  {
    id: "n7",
    kind: "meeting",
    actor: "Priya Raman",
    title: "Priya Raman invited you to “Initech proposal review”",
    description: "Thursday · 4:00 – 4:30 PM · Google Meet",
    time: "Yesterday",
    unread: false,
    bucket: "earlier",
  },
  {
    id: "n8",
    kind: "system",
    title: "New feature: Customer tags on emails",
    description: "Tag customer-facing emails to the right opportunity automatically.",
    time: "2d ago",
    unread: false,
    bucket: "earlier",
  },
];

export function unreadCount(items: Notification[] = notifications): number {
  return items.filter((n) => n.unread).length;
}
