import { Link } from "@tanstack/react-router";
import { ChevronLeft, Plus } from "lucide-react";

export function MeetingsHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="w-10 h-10 rounded-xl bg-[#121826] border border-white/5 flex items-center justify-center text-[#F3F4F6] hover:border-dd-purple/30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-[28px] font-semibold tracking-tight text-dd-purple-logo">Meetings</h1>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-dd-purple hover:bg-dd-purple/90 text-sm font-medium text-white transition-colors">
        <Plus className="w-4 h-4" />
        <span>New meeting</span>
      </button>
    </div>
  );
}
