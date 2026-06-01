import type { LucideIcon } from "lucide-react";
import { UserCircle, Plug, ShieldCheck } from "lucide-react";

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

type SettingsHeroStripProps = {
  profileCompletion: number;
  integrationsConnected: number;
  integrationsTotal: number;
  securityScore: "Strong" | "Good" | "Weak";
  twoFactorEnabled: boolean;
};

export function SettingsHeroStrip({
  profileCompletion,
  integrationsConnected,
  integrationsTotal,
  securityScore,
  twoFactorEnabled,
}: SettingsHeroStripProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <HeroCard
        icon={UserCircle}
        tile="tile-violet"
        label="Profile completion"
        sub="across your account info"
        value={`${profileCompletion}%`}
        progress={profileCompletion}
      />
      <HeroCard
        icon={Plug}
        tile="tile-cyan"
        label="Integrations connected"
        sub={`of ${integrationsTotal} available`}
        value={`${integrationsConnected}`}
      />
      <HeroCard
        icon={ShieldCheck}
        tile="tile-emerald"
        label="Account security"
        sub={twoFactorEnabled ? "2FA enabled" : "2FA disabled — enable it"}
        value={securityScore}
      />
    </div>
  );
}
