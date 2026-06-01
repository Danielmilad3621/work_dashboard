import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SettingsSectionProps = {
  icon: LucideIcon;
  tile: string;
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
};

export function SettingsSection({
  icon: Icon,
  tile,
  title,
  description,
  action,
  children,
}: SettingsSectionProps) {
  return (
    <div className="dash-card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`icon-tile ${tile}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            <p className="text-xs text-[#9CA3AF]">{description}</p>
          </div>
        </div>
        {action}
      </div>
      <div>{children}</div>
    </div>
  );
}

type SettingsRowProps = {
  label: string;
  description?: ReactNode;
  control: ReactNode;
  divider?: boolean;
};

export function SettingsRow({ label, description, control, divider = true }: SettingsRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-6 py-4 ${
        divider ? "border-t border-white/5 first:border-t-0" : ""
      }`}
    >
      <div className="min-w-0">
        <div className="text-sm text-[#F3F4F6]">{label}</div>
        {description && <div className="text-xs text-[#9CA3AF] mt-0.5">{description}</div>}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

type ToggleProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
};

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-block w-10 h-6 rounded-full transition-colors border cursor-pointer align-middle ${
        checked
          ? "bg-dd-purple border-dd-purple"
          : "bg-white/5 border-white/10 hover:border-white/20"
      }`}
    >
      <span
        className={`absolute top-1/2 -mt-2 w-4 h-4 rounded-full bg-white shadow-md transition-[left] duration-200 ease-out ${
          checked ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}
