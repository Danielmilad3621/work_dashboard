import type { LucideIcon } from "lucide-react";
import { Calendar } from "lucide-react";
import { RTOProgressCard } from "./RTOProgressCard";

type HeroCardProps = {
  icon: LucideIcon;
  tile: string;
  label: string;
  sub: string;
  value: string;
};

function HeroCard({ icon: Icon, tile, label, sub, value }: HeroCardProps) {
  return (
    <div className="dash-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dd-purple/10 to-transparent pointer-events-none" />
      <div className="relative">
        <div className={`icon-tile ${tile} mb-4`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-xs text-[#9CA3AF] mb-1">{label}</div>
        <div className="text-3xl font-light tracking-tight font-mono">{value}</div>
        <div className="text-xs text-[#6B7280] mt-1">{sub}</div>
      </div>
    </div>
  );
}

export function HeroStrip() {
  return (
    <div className="space-y-4">
      <HeroCard
        icon={Calendar}
        tile="tile-violet"
        label="Today"
        sub="May 20, 2025"
        value="Tuesday"
      />
      <RTOProgressCard percent={60} daysCompleted={6} daysTarget={10} daysLeft={6} />
    </div>
  );
}
