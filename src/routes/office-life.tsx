import { createFileRoute } from "@tanstack/react-router";
import { OfficeLifePage } from "../components/office-life/OfficeLifePage";
import { Sidebar } from "../components/Sidebar";

export const Route = createFileRoute("/office-life")({ component: OfficeLifeRoute });

function OfficeLifeRoute() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#F3F4F6]">
      <Sidebar />
      <main className="ml-[240px] px-4 md:px-8 py-8">
        <OfficeLifePage />
      </main>
    </div>
  );
}
