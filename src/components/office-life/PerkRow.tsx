import type { LucideIcon } from "lucide-react";
import { Bike, Coffee, Dumbbell, ParkingSquare, Sofa, UtensilsCrossed } from "lucide-react";
import type { Perk, PerkIcon, PerkStatus } from "../../lib/office";

const iconMap: Record<PerkIcon, LucideIcon> = {
  gym: Dumbbell,
  snacks: UtensilsCrossed,
  parking: ParkingSquare,
  lounge: Sofa,
  coffee: Coffee,
  bike: Bike,
};

const tileMap: Record<PerkIcon, string> = {
  gym: "tile-orange",
  snacks: "tile-emerald",
  parking: "tile-violet",
  lounge: "tile-cyan",
  coffee: "tile-orange",
  bike: "tile-emerald",
};

function StatusBadge({ status }: { status: PerkStatus }) {
  if (status === "booked") {
    return (
      <span className="text-[10px] px-2 py-0.5 rounded-md bg-dd-purple/15 text-dd-purple border border-dd-purple/30">
        Booked
      </span>
    );
  }
  if (status === "closed") {
    return (
      <span className="text-[10px] px-2 py-0.5 rounded-md bg-dd-pink/15 text-dd-pink border border-dd-pink/30">
        Closed
      </span>
    );
  }
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-md bg-dd-green/15 text-dd-green border border-dd-green/30">
      Available
    </span>
  );
}

export function PerkRow({ icon, name, sub, status }: Perk) {
  const Icon = iconMap[icon];
  const tile = tileMap[icon];

  return (
    <div className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-white/[0.03]">
      <div className={`icon-tile ${tile} shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-[#F3F4F6] truncate">{name}</div>
        <div className="text-xs text-[#9CA3AF] truncate">{sub}</div>
      </div>

      <div className="shrink-0">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}
