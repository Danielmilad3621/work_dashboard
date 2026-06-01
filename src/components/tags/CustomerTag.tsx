import { Phone } from "lucide-react";

type CustomerTagProps = {
  company: string;
};

export function CustomerTag({ company }: CustomerTagProps) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-dd-purple/15 text-dd-purple shrink-0">
      <Phone className="w-3 h-3" />
      <span className="truncate max-w-[140px]">{company}</span>
    </span>
  );
}
