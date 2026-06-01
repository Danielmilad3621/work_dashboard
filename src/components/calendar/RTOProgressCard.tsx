import { Target } from "lucide-react";

type RTOProgressCardProps = {
  percent: number;
  daysCompleted: number;
  daysTarget: number;
  daysLeft: number;
};

export function RTOProgressCard({
  percent,
  daysCompleted,
  daysTarget,
  daysLeft,
}: RTOProgressCardProps) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div className="dash-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dd-green/10 to-transparent pointer-events-none" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="icon-tile tile-orange">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight">RTO progress</h3>
              <p className="text-xs text-[#9CA3AF]">Office attendance this month</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light tracking-tight leading-none font-mono">
              {clamped}%
            </div>
            <div className="text-[11px] text-[#6B7280] mt-1">of monthly target</div>
          </div>
        </div>

        <div
          className="h-2 rounded-full bg-white/5 overflow-hidden"
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="RTO progress this month"
        >
          <div
            className="h-full bg-dd-green rounded-full transition-all"
            style={{ width: `${clamped}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-4 text-xs">
          <span className="text-[#9CA3AF]">
            <span className="text-[#F3F4F6] font-medium font-mono">
              {daysCompleted} of {daysTarget}
            </span>{" "}
            office days this month
          </span>
          <span className="inline-flex items-center gap-1.5 text-dd-green">
            <span className="w-1.5 h-1.5 rounded-full bg-dd-green" />
            {daysLeft} days left to hit target
          </span>
        </div>
      </div>
    </div>
  );
}
