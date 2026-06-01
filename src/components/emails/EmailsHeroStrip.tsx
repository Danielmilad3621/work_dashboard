import type { LucideIcon } from "lucide-react";
import { Mail, Briefcase, Users } from "lucide-react";

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

type EmailsHeroStripProps = {
  unread: number;
  opportunities: number;
  internal: number;
};

export function EmailsHeroStrip({ unread, opportunities, internal }: EmailsHeroStripProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <HeroCard
        icon={Mail}
        tile="tile-violet"
        label="Unread"
        sub="across all categories"
        value={`${unread}`}
      />
      <HeroCard
        icon={Briefcase}
        tile="tile-emerald"
        label="Opportunities"
        sub="customer threads"
        value={`${opportunities}`}
      />
      <HeroCard
        icon={Users}
        tile="tile-orange"
        label="Internal"
        sub="team conversations"
        value={`${internal}`}
      />
    </div>
  );
}
