import { CustomerTag } from "../tags/CustomerTag";
import { PlatformChip, type Platform } from "./PlatformChip";

export type MeetingRowData = {
  id: string;
  start: string;
  end: string;
  title: string;
  sub: string;
  platform: Platform;
  attendees: number;
  callCompany?: string;
};

export function MeetingRow({
  start,
  end,
  title,
  sub,
  platform,
  attendees,
  callCompany,
}: Omit<MeetingRowData, "id">) {
  const avatarCount = Math.min(2, attendees);
  const extra = Math.max(0, attendees - avatarCount);

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
      <div className="text-center w-16 shrink-0">
        <div className="text-sm font-medium font-mono">{start}</div>
        <div className="text-[10px] text-[#6B7280] font-mono">{end}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-xs text-[#9CA3AF] truncate">{sub}</div>
      </div>
      {callCompany && <CustomerTag company={callCompany} />}
      <PlatformChip platform={platform} />
      <div className="flex -space-x-2">
        {Array.from({ length: avatarCount }).map((_, j) => (
          <div
            key={j}
            className="w-7 h-7 rounded-full bg-gradient-to-br from-dd-purple to-dd-pink border-2 border-[#121826]"
          />
        ))}
        {extra > 0 && (
          <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-[#121826] text-[10px] flex items-center justify-center font-mono">
            +{extra}
          </div>
        )}
      </div>
    </div>
  );
}
