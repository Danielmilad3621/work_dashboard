import { createFileRoute } from "@tanstack/react-router";
import { ScorecardPage } from "../components/scorecard/ScorecardPage";
import { Sidebar } from "../components/Sidebar";

export const Route = createFileRoute("/scorecard")({ component: ScorecardRoute });

function ScorecardRoute() {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <main className="ml-[240px]">
        <ScorecardPage />
      </main>
    </div>
  );
}
