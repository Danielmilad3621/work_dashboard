import type { LucideIcon } from "lucide-react";
import { Circle, Loader, CheckCircle2 } from "lucide-react";

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

type TasksHeroStripProps = {
  todo: number;
  inProgress: number;
  done: number;
};

export function TasksHeroStrip({ todo, inProgress, done }: TasksHeroStripProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <HeroCard
        icon={Circle}
        tile="tile-violet"
        label="To do"
        sub="open backlog items"
        value={`${todo}`}
      />
      <HeroCard
        icon={Loader}
        tile="tile-orange"
        label="In progress"
        sub="actively working"
        value={`${inProgress}`}
      />
      <HeroCard
        icon={CheckCircle2}
        tile="tile-emerald"
        label="Done"
        sub="completed"
        value={`${done}`}
      />
    </div>
  );
}
