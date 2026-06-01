import { useMemo, useState } from "react";
import {
  User,
  Building2,
  Bell,
  Plug,
  Palette,
  ShieldCheck,
  AlertTriangle,
  Check,
  Mail,
  AtSign,
  CalendarDays,
  Globe2,
  Pencil,
  Trash2,
  Download,
  LogOut,
  KeyRound,
  Smartphone,
  Sparkles,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsHeroStrip } from "./SettingsHeroStrip";
import { SettingsSection, SettingsRow, Toggle } from "./SettingsSection";
import { weekdays, type Weekday } from "../../lib/rto";

type IntegrationKey = "gcal" | "slack" | "zoom" | "outlook" | "linear";

type Integration = {
  key: IntegrationKey;
  name: string;
  description: string;
  accent: "violet" | "cyan" | "emerald" | "orange" | "pink";
  initials: string;
};

const integrations: Integration[] = [
  {
    key: "gcal",
    name: "Google Calendar",
    description: "Sync meetings, RTO and availability",
    accent: "violet",
    initials: "GC",
  },
  {
    key: "slack",
    name: "Slack",
    description: "Surface mentions and DMs in your inbox",
    accent: "pink",
    initials: "SL",
  },
  {
    key: "zoom",
    name: "Zoom",
    description: "Auto-attach join links to scheduled calls",
    accent: "cyan",
    initials: "ZM",
  },
  {
    key: "outlook",
    name: "Outlook",
    description: "Mirror your work mailbox",
    accent: "orange",
    initials: "OL",
  },
  {
    key: "linear",
    name: "Linear",
    description: "Pull assigned issues into Tasks",
    accent: "emerald",
    initials: "LR",
  },
];

const accentChip: Record<Integration["accent"], string> = {
  violet: "bg-dd-purple/15 text-dd-purple",
  cyan: "bg-dd-cyan/15 text-dd-cyan",
  emerald: "bg-dd-green/15 text-dd-green",
  orange: "bg-dd-orange/15 text-dd-orange",
  pink: "bg-dd-pink/15 text-dd-pink",
};

const accentTile: Record<Integration["accent"], string> = {
  violet: "tile-violet",
  cyan: "tile-cyan",
  emerald: "tile-emerald",
  orange: "tile-orange",
  pink: "tile-violet",
};

type AccentKey = "purple" | "cyan" | "emerald" | "orange" | "pink";

const accents: { key: AccentKey; label: string; swatch: string }[] = [
  { key: "purple", label: "Purple", swatch: "var(--dd-purple)" },
  { key: "cyan", label: "Cyan", swatch: "var(--dd-cyan)" },
  { key: "emerald", label: "Emerald", swatch: "var(--dd-green)" },
  { key: "orange", label: "Orange", swatch: "var(--dd-orange)" },
  { key: "pink", label: "Pink", swatch: "var(--dd-pink)" },
];

type ThemeKey = "dark" | "light" | "system";

const themes: { key: ThemeKey; label: string; icon: typeof Sun }[] = [
  { key: "dark", label: "Dark", icon: Moon },
  { key: "light", label: "Light", icon: Sun },
  { key: "system", label: "Auto", icon: Monitor },
];

export function SettingsPage() {
  // Profile
  const [name, setName] = useState("Daniel Carter");
  const [email] = useState("daniel@work.com");
  const [title, setTitle] = useState("Senior Solutions Engineer");
  const [timezone, setTimezone] = useState("Europe/London");

  // Workspace / RTO
  const [officeDays, setOfficeDays] = useState<Set<Weekday>>(
    new Set<Weekday>(["Mon", "Wed", "Fri"]),
  );
  const [rtoTarget, setRtoTarget] = useState(3);

  // Notifications
  const [notif, setNotif] = useState({
    emailDigest: true,
    mentions: true,
    meetingReminders: true,
    rtoReminders: false,
    learningDue: true,
    productNews: false,
  });

  // Integrations
  const [connected, setConnected] = useState<Set<IntegrationKey>>(
    new Set<IntegrationKey>(["gcal", "slack", "zoom"]),
  );

  // Appearance
  const [theme, setTheme] = useState<ThemeKey>("dark");
  const [accent, setAccent] = useState<AccentKey>("purple");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  // Security
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  // Privacy
  const [privacy, setPrivacy] = useState({
    showInOffice: true,
    shareWorkingHours: true,
    analytics: false,
  });

  const [dirty, setDirty] = useState(false);
  const markDirty = () => setDirty(true);

  // Derived hero stats
  const profileCompletion = useMemo(() => {
    const filled = [name, email, title, timezone].filter((v) => v.trim().length > 0).length;
    return Math.round((filled / 4) * 100);
  }, [name, email, title, timezone]);

  const securityScore: "Strong" | "Good" | "Weak" = twoFactor
    ? sessionAlerts
      ? "Strong"
      : "Good"
    : "Weak";

  const toggleOfficeDay = (day: Weekday) => {
    setOfficeDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }
      return next;
    });
    markDirty();
  };

  const toggleIntegration = (key: IntegrationKey) => {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
    markDirty();
  };

  return (
    <div className="max-w-[1024px] mx-auto space-y-6">
      <SettingsHeader dirty={dirty} onSave={() => setDirty(false)} />

      <SettingsHeroStrip
        profileCompletion={profileCompletion}
        integrationsConnected={connected.size}
        integrationsTotal={integrations.length}
        securityScore={securityScore}
        twoFactorEnabled={twoFactor}
      />

      {/* Profile */}
      <SettingsSection
        icon={User}
        tile="tile-violet"
        title="Profile"
        description="How you appear across the dashboard"
      >
        <div className="flex items-center gap-4 pb-5 border-b border-white/5">
          <div className="relative">
            <img
              src="/avatar-daniel.png"
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-dd-purple text-white flex items-center justify-center border-2 border-[#121826] hover:bg-dd-purple/90"
              aria-label="Change avatar"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-medium truncate">{name}</div>
            <div className="text-xs text-[#9CA3AF] truncate">{email}</div>
            <div className="text-xs text-[#6B7280] mt-1 truncate">{title}</div>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-dd-purple/15 text-dd-purple">
            Pro plan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          <Field label="Display name">
            <TextInput
              value={name}
              onChange={(v) => {
                setName(v);
                markDirty();
              }}
            />
          </Field>
          <Field label="Email" hint="Used for sign-in & receipts">
            <TextInput value={email} onChange={() => {}} disabled icon={Mail} />
          </Field>
          <Field label="Job title">
            <TextInput
              value={title}
              onChange={(v) => {
                setTitle(v);
                markDirty();
              }}
            />
          </Field>
          <Field label="Timezone">
            <SelectInput
              value={timezone}
              onChange={(v) => {
                setTimezone(v);
                markDirty();
              }}
              options={[
                "Europe/London",
                "Europe/Paris",
                "Europe/Dublin",
                "America/New_York",
                "America/Los_Angeles",
                "Asia/Singapore",
              ]}
              icon={Globe2}
            />
          </Field>
        </div>
      </SettingsSection>

      {/* Workspace / RTO */}
      <SettingsSection
        icon={Building2}
        tile="tile-cyan"
        title="Workspace & RTO"
        description="Office days, working hours and return-to-office targets"
        action={
          <span className="text-xs px-2.5 py-1 rounded-full bg-dd-purple/15 text-dd-purple font-mono">
            {officeDays.size} / 5 days
          </span>
        }
      >
        <div className="pb-5 border-b border-white/5">
          <div className="text-sm mb-1">Office days</div>
          <div className="text-xs text-[#9CA3AF] mb-4">
            Pick which weekdays you typically work from the office.
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {weekdays
              .filter((d) => d !== "Sat" && d !== "Sun")
              .map((day) => {
                const on = officeDays.has(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleOfficeDay(day)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-colors ${
                      on
                        ? "bg-dd-green/15 border-dd-green/40 text-dd-green"
                        : "bg-[#121826] border-white/5 text-[#9CA3AF] hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-[4px] flex items-center justify-center border ${
                        on
                          ? "bg-dd-green border-dd-green text-[#0B0F1A]"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      {on && <Check className="w-3 h-3" strokeWidth={3} />}
                    </span>
                    {day}
                  </button>
                );
              })}
          </div>
        </div>

        <SettingsRow
          label="RTO target"
          description="Days per week you aim to be in the office"
          control={
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setRtoTarget(n);
                    markDirty();
                  }}
                  className={`w-9 h-9 rounded-lg text-sm font-mono transition-colors border ${
                    n === rtoTarget
                      ? "bg-dd-purple border-dd-purple text-white"
                      : "bg-[#121826] border-white/5 text-[#9CA3AF] hover:border-white/20"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          }
        />

        <SettingsRow
          label="Working hours"
          description="Default availability shown to teammates"
          control={
            <div className="flex items-center gap-2 text-sm font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-[#121826] border border-white/5">
                09:00
              </span>
              <span className="text-[#6B7280]">→</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#121826] border border-white/5">
                17:30
              </span>
            </div>
          }
        />
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        icon={Bell}
        tile="tile-orange"
        title="Notifications"
        description="Choose what reaches your inbox and when"
      >
        <SettingsRow
          label="Daily email digest"
          description="One summary email each morning at 08:00"
          control={
            <Toggle
              checked={notif.emailDigest}
              onChange={(v) => {
                setNotif({ ...notif, emailDigest: v });
                markDirty();
              }}
              label="Daily email digest"
            />
          }
        />
        <SettingsRow
          label="Mentions & replies"
          description="Notify me when teammates @-mention me"
          control={
            <Toggle
              checked={notif.mentions}
              onChange={(v) => {
                setNotif({ ...notif, mentions: v });
                markDirty();
              }}
              label="Mentions & replies"
            />
          }
        />
        <SettingsRow
          label="Meeting reminders"
          description="15 minutes before each scheduled call"
          control={
            <Toggle
              checked={notif.meetingReminders}
              onChange={(v) => {
                setNotif({ ...notif, meetingReminders: v });
                markDirty();
              }}
              label="Meeting reminders"
            />
          }
        />
        <SettingsRow
          label="RTO reminders"
          description="Nudge me on office days the night before"
          control={
            <Toggle
              checked={notif.rtoReminders}
              onChange={(v) => {
                setNotif({ ...notif, rtoReminders: v });
                markDirty();
              }}
              label="RTO reminders"
            />
          }
        />
        <SettingsRow
          label="Learning deadlines"
          description="Mandatory training due in the next 14 days"
          control={
            <Toggle
              checked={notif.learningDue}
              onChange={(v) => {
                setNotif({ ...notif, learningDue: v });
                markDirty();
              }}
              label="Learning deadlines"
            />
          }
        />
        <SettingsRow
          label="Product news"
          description="Occasional updates about new dashboard features"
          control={
            <Toggle
              checked={notif.productNews}
              onChange={(v) => {
                setNotif({ ...notif, productNews: v });
                markDirty();
              }}
              label="Product news"
            />
          }
        />
      </SettingsSection>

      {/* Integrations */}
      <SettingsSection
        icon={Plug}
        tile="tile-emerald"
        title="Integrations"
        description="Connect the tools that power your day"
        action={
          <span className="text-xs px-2.5 py-1 rounded-full bg-dd-purple/15 text-dd-purple font-mono">
            {connected.size} / {integrations.length} connected
          </span>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {integrations.map((it) => {
            const on = connected.has(it.key);
            return (
              <div
                key={it.key}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors"
              >
                <div
                  className={`icon-tile ${accentTile[it.accent]} text-xs font-semibold font-mono`}
                >
                  {it.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{it.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        on ? accentChip[it.accent] : "bg-white/5 text-[#6B7280]"
                      }`}
                    >
                      {on ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                  <div className="text-xs text-[#9CA3AF] truncate">{it.description}</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleIntegration(it.key)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                    on
                      ? "bg-white/5 text-[#9CA3AF] hover:bg-white/10 hover:text-white"
                      : "bg-dd-purple text-white hover:bg-dd-purple/90"
                  }`}
                >
                  {on ? "Disconnect" : "Connect"}
                </button>
              </div>
            );
          })}
        </div>
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection
        icon={Palette}
        tile="tile-violet"
        title="Appearance"
        description="Theme, accent and motion preferences"
      >
        <SettingsRow
          label="Theme"
          description="Dark is the default Datadog feel"
          control={
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#121826] border border-white/5">
              {themes.map((t) => {
                const Icon = t.icon;
                const active = t.key === theme;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => {
                      setTheme(t.key);
                      markDirty();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      active ? "bg-dd-purple text-white" : "text-[#9CA3AF] hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          }
        />

        <SettingsRow
          label="Accent color"
          description="Used for active states and highlights"
          control={
            <div className="flex items-center gap-2">
              {accents.map((a) => {
                const active = a.key === accent;
                return (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => {
                      setAccent(a.key);
                      markDirty();
                    }}
                    aria-label={a.label}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform border-2 ${
                      active ? "border-white scale-110" : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: a.swatch }}
                  >
                    {active && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          }
        />

        <SettingsRow
          label="Compact mode"
          description="Tighter spacing across lists and cards"
          control={
            <Toggle
              checked={compactMode}
              onChange={(v) => {
                setCompactMode(v);
                markDirty();
              }}
              label="Compact mode"
            />
          }
        />

        <SettingsRow
          label="Reduce motion"
          description="Dial back hover lifts and transitions"
          control={
            <Toggle
              checked={reduceMotion}
              onChange={(v) => {
                setReduceMotion(v);
                markDirty();
              }}
              label="Reduce motion"
            />
          }
        />
      </SettingsSection>

      {/* Security */}
      <SettingsSection
        icon={ShieldCheck}
        tile="tile-emerald"
        title="Security"
        description="Passwords, two-factor auth and active sessions"
        action={
          <span
            className={`text-xs px-2.5 py-1 rounded-full ${
              securityScore === "Strong"
                ? "bg-dd-green/15 text-dd-green"
                : securityScore === "Good"
                  ? "bg-dd-orange/15 text-dd-orange"
                  : "bg-dd-pink/15 text-dd-pink"
            }`}
          >
            {securityScore}
          </span>
        }
      >
        <SettingsRow
          label="Password"
          description="Last changed 42 days ago"
          control={
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121826] border border-white/5 text-sm hover:border-dd-purple/30 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Change
            </button>
          }
        />
        <SettingsRow
          label="Two-factor auth"
          description="Authenticator app, time-based codes"
          control={
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#9CA3AF] flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                {twoFactor ? "Enabled" : "Disabled"}
              </span>
              <Toggle
                checked={twoFactor}
                onChange={(v) => {
                  setTwoFactor(v);
                  markDirty();
                }}
                label="Two-factor auth"
              />
            </div>
          }
        />
        <SettingsRow
          label="New sign-in alerts"
          description="Email me when a new device signs in"
          control={
            <Toggle
              checked={sessionAlerts}
              onChange={(v) => {
                setSessionAlerts(v);
                markDirty();
              }}
              label="New sign-in alerts"
            />
          }
        />
        <SettingsRow
          label="Active sessions"
          description="3 devices currently signed in"
          control={
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121826] border border-white/5 text-sm hover:border-dd-purple/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out all
            </button>
          }
        />
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection
        icon={AtSign}
        tile="tile-cyan"
        title="Privacy"
        description="Control how your activity is shared"
      >
        <SettingsRow
          label="Show me as in-office"
          description="Teammates can see your RTO days on their calendar"
          control={
            <Toggle
              checked={privacy.showInOffice}
              onChange={(v) => {
                setPrivacy({ ...privacy, showInOffice: v });
                markDirty();
              }}
              label="Show me as in-office"
            />
          }
        />
        <SettingsRow
          label="Share working hours"
          description="Hide your hours from cross-org search"
          control={
            <Toggle
              checked={privacy.shareWorkingHours}
              onChange={(v) => {
                setPrivacy({ ...privacy, shareWorkingHours: v });
                markDirty();
              }}
              label="Share working hours"
            />
          }
        />
        <SettingsRow
          label="Anonymous usage analytics"
          description={
            <>
              Help us improve — see our{" "}
              <button type="button" className="text-dd-purple hover:underline">
                privacy policy
              </button>
            </>
          }
          control={
            <Toggle
              checked={privacy.analytics}
              onChange={(v) => {
                setPrivacy({ ...privacy, analytics: v });
                markDirty();
              }}
              label="Anonymous usage analytics"
            />
          }
        />
      </SettingsSection>

      {/* Tips card */}
      <div className="dash-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dd-purple/15 to-transparent pointer-events-none" />
        <div className="relative flex items-start gap-4">
          <div className="icon-tile tile-violet">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold mb-1">Quick wins</div>
            <p className="text-xs text-[#9CA3AF] max-w-xl">
              You can boost your account score by enabling 2FA, connecting at least 4 integrations
              and keeping your profile completion at 100%.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#9CA3AF]">
              <CalendarDays className="w-3.5 h-3.5" />
              Updated today
            </span>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <SettingsSection
        icon={AlertTriangle}
        tile="tile-orange"
        title="Danger zone"
        description="These actions affect your entire account"
      >
        <SettingsRow
          label="Export your data"
          description="Download a JSON archive of everything in your dashboard"
          control={
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121826] border border-white/5 text-sm hover:border-dd-purple/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          }
        />
        <SettingsRow
          label="Delete account"
          description="Permanently remove your account and all data"
          control={
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dd-pink/10 border border-dd-pink/30 text-dd-pink text-sm hover:bg-dd-pink/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete account
            </button>
          }
        />
      </SettingsSection>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-xs text-[#9CA3AF] mb-1.5">{label}</div>
      {children}
      {hint && <div className="text-[11px] text-[#6B7280] mt-1">{hint}</div>}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  disabled,
  icon: Icon,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  icon?: typeof Mail;
}) {
  return (
    <div className="relative">
      {Icon && <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />}
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-[#121826] border border-white/5 rounded-xl text-sm py-2.5 focus:outline-none focus:ring-2 focus:ring-dd-purple focus:border-transparent disabled:text-[#6B7280] disabled:cursor-not-allowed ${
          Icon ? "pl-9 pr-3" : "px-3"
        }`}
      />
    </div>
  );
}

function SelectInput({
  value,
  onChange,
  options,
  icon: Icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon?: typeof Globe2;
}) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-[#121826] border border-white/5 rounded-xl text-sm py-2.5 focus:outline-none focus:ring-2 focus:ring-dd-purple focus:border-transparent ${
          Icon ? "pl-9 pr-3" : "px-3"
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#121826]">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
