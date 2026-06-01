import { Info } from "lucide-react";

export function InfoBanner() {
  return (
    <div className="dash-card flex items-center gap-4 border-dd-purple/15 shadow-[0_0_24px_-4px_rgba(128,0,255,0.15)]">
      <div className="w-9 h-9 rounded-full bg-dd-purple/10 flex items-center justify-center shrink-0">
        <Info className="w-4 h-4 text-dd-purple" />
      </div>
      <p className="text-sm text-[#9CA3AF] leading-relaxed">
        Calendar view, marked on the calendar day attend and day left to attend and also event on
        each day.
      </p>
    </div>
  );
}
