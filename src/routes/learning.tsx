import { createFileRoute } from "@tanstack/react-router";
import { LearningPage } from "../components/learning/LearningPage";
import { Sidebar } from "../components/Sidebar";

export const Route = createFileRoute("/learning")({ component: LearningRoute });

function LearningRoute() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#F3F4F6]">
      <Sidebar />
      <main className="ml-[240px] px-4 md:px-8 py-8">
        <LearningPage />
      </main>
    </div>
  );
}
