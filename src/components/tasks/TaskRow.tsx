import { Check } from "lucide-react";
import type { TagRef } from "../../lib/tags";
import { Tag } from "../tags/Tag";

export type Priority = "High" | "Medium" | "Low";
export type Status = "todo" | "in_progress" | "done";

export type TaskRowData = {
  id: string;
  title: string;
  priority: Priority;
  time?: string;
  status: Status;
  tag?: TagRef;
};

const priColor: Record<Priority, string> = {
  High: "var(--dd-pink)",
  Medium: "var(--dd-orange)",
  Low: "var(--dd-green)",
};

export function TaskRow({ title, priority, time, status, tag }: TaskRowData) {
  const done = status === "done";
  return (
    <div className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-white/[0.03]">
      <div
        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
          done ? "bg-dd-purple border-dd-purple" : "border-white/15"
        }`}
      >
        {done && <Check className="w-3 h-3 text-dd-green" strokeWidth={3} />}
      </div>
      <div
        className={`flex-1 text-sm truncate ${
          done ? "line-through text-[#6B7280]" : "text-[#F3F4F6]"
        }`}
      >
        {title}
      </div>
      {tag && <Tag ref={tag} />}
      <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF] w-20 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: priColor[priority] }} />
        {priority}
      </span>
      <div className="text-xs text-[#6B7280] w-16 text-right shrink-0 font-mono">{time ?? ""}</div>
    </div>
  );
}
