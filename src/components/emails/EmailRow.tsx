import { CustomerTag } from "../tags/CustomerTag";

export type EmailRowData = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  callCompany?: string;
};

export function EmailRow({
  sender,
  subject,
  preview,
  time,
  unread,
  callCompany,
}: Omit<EmailRowData, "id">) {
  return (
    <div className="flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-white/[0.03]">
      <div className="w-5 h-5 rounded-md border border-white/15 shrink-0" />
      <div className="w-40 text-sm font-medium truncate">{sender}</div>
      <div className="w-64 text-sm text-[#F3F4F6] truncate">{subject}</div>
      <div className="flex-1 text-sm text-[#9CA3AF] truncate">{preview}</div>
      {callCompany && <CustomerTag company={callCompany} />}
      <div className="text-xs text-[#6B7280] w-16 text-right font-mono">{time}</div>
      <div
        className={`w-2 h-2 rounded-full shrink-0 ${unread ? "bg-dd-purple" : "bg-transparent"}`}
      />
    </div>
  );
}
