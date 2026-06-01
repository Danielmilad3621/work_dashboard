import { Briefcase } from "lucide-react";

type ProjectTagProps = {
  name: string;
};

export function ProjectTag({ name }: ProjectTagProps) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-dd-green/15 text-dd-green shrink-0">
      <Briefcase className="w-3 h-3" />
      <span className="truncate max-w-[140px]">{name}</span>
    </span>
  );
}
