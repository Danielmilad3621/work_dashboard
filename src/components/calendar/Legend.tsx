import { Check } from "lucide-react";

export function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-[#9CA3AF]">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-dd-green/15 flex items-center justify-center">
          <Check className="w-3 h-3 text-dd-green" strokeWidth={3} />
        </div>
        <span>Attended Office Day</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full border border-dashed border-dd-purple" />
        <span>Day Left to Attend</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-dd-orange" />
        <span>Event</span>
      </div>
    </div>
  );
}
