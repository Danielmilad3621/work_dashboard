export type Platform = "Zoom" | "Google Meet" | "Teams";

const platformStyles: Record<Platform, string> = {
  Zoom: "bg-dd-purple/15 text-dd-purple",
  "Google Meet": "bg-dd-green/15 text-dd-green",
  Teams: "bg-dd-blue/15 text-dd-blue",
};

type PlatformChipProps = {
  platform: Platform;
};

export function PlatformChip({ platform }: PlatformChipProps) {
  return (
    <span className={`text-[10px] px-2 py-1 rounded-md shrink-0 ${platformStyles[platform]}`}>
      {platform}
    </span>
  );
}
