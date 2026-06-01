import type { LucideIcon } from "lucide-react";
import { EmailRow, type EmailRowData } from "./EmailRow";

type CategorySectionProps = {
  icon: LucideIcon;
  tile: string;
  title: string;
  description: string;
  emails: EmailRowData[];
};

export function CategorySection({
  icon: Icon,
  tile,
  title,
  description,
  emails,
}: CategorySectionProps) {
  const unread = emails.filter((e) => e.unread).length;

  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`icon-tile ${tile}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            <p className="text-xs text-[#9CA3AF]">{description}</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-dd-purple/15 text-dd-purple">
          {unread} unread
        </span>
      </div>
      <div className="space-y-1">
        {emails.map(({ id, ...e }) => (
          <EmailRow key={id} {...e} />
        ))}
      </div>
    </div>
  );
}
