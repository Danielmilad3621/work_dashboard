import type { LucideIcon } from "lucide-react";
import { Building2, UtensilsCrossed, Coffee } from "lucide-react";

type HeroCardProps = {
  icon: LucideIcon;
  tile: string;
  label: string;
  sub: string;
  value: string;
  progress?: number;
};

function HeroCard({ icon: Icon, tile, label, sub, value, progress }: HeroCardProps) {
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
        {typeof progress === "number" && (
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mt-4">
            <div
              className="h-full bg-dd-purple rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

type OfficeLifeHeroStripProps = {
  officeDays: number;
  rtoTarget: number;
  mealsBooked: number;
  mealsTotal: number;
  perksClaimed: number;
};

export function OfficeLifeHeroStrip({
  officeDays,
  rtoTarget,
  mealsBooked,
  mealsTotal,
  perksClaimed,
}: OfficeLifeHeroStripProps) {
  const officeProgress = rtoTarget === 0 ? 0 : Math.round((officeDays / rtoTarget) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <HeroCard
        icon={Building2}
        tile="tile-violet"
        label="Office days this week"
        sub={`of ${rtoTarget} target`}
        value={`${officeDays} / ${rtoTarget}`}
        progress={officeProgress}
      />
      <HeroCard
        icon={UtensilsCrossed}
        tile="tile-emerald"
        label="Meals booked"
        sub={`of ${mealsTotal} office days`}
        value={`${mealsBooked}`}
      />
      <HeroCard
        icon={Coffee}
        tile="tile-orange"
        label="Perks claimed"
        sub="this week"
        value={`${perksClaimed}`}
      />
    </div>
  );
}
