import { Circle, Loader, CheckCircle2 } from "lucide-react";
import { StatusSection } from "./StatusSection";
import { TasksHeader } from "./TasksHeader";
import { TasksHeroStrip } from "./TasksHeroStrip";
import type { Status, TaskRowData } from "./TaskRow";

const tasks: TaskRowData[] = [
  {
    id: "t1",
    title: "Draft Q2 renewal proposal",
    priority: "High",
    time: "10:00 AM",
    status: "todo",
    tag: { kind: "customer", id: "call-acme" },
  },
  {
    id: "t2",
    title: "Send discovery call follow-up notes",
    priority: "Medium",
    time: "11:30 AM",
    status: "todo",
    tag: { kind: "customer", id: "call-globex" },
  },
  {
    id: "t3",
    title: "Review Initech pricing sheet revisions",
    priority: "Medium",
    status: "todo",
    tag: { kind: "customer", id: "call-initech" },
  },
  {
    id: "t4",
    title: "Spec onboarding email flow",
    priority: "Low",
    status: "todo",
    tag: { kind: "project", id: "proj-onboarding" },
  },
  {
    id: "t5",
    title: "Plan tomorrow's tasks",
    priority: "Low",
    status: "todo",
  },

  {
    id: "t6",
    title: "Build customer portal dashboard widgets",
    priority: "High",
    time: "02:00 PM",
    status: "in_progress",
    tag: { kind: "project", id: "proj-portal" },
  },
  {
    id: "t7",
    title: "Wire Stripe webhook retries",
    priority: "High",
    status: "in_progress",
    tag: { kind: "project", id: "proj-billing" },
  },
  {
    id: "t8",
    title: "Procurement clause review with Acme legal",
    priority: "Medium",
    time: "03:30 PM",
    status: "in_progress",
    tag: { kind: "customer", id: "call-acme" },
  },
  {
    id: "t9",
    title: "Backfill analytics events for last 30 days",
    priority: "Medium",
    status: "in_progress",
    tag: { kind: "project", id: "proj-analytics" },
  },

  {
    id: "t10",
    title: "Prepare client report",
    priority: "High",
    time: "Yesterday",
    status: "done",
    tag: { kind: "customer", id: "call-acme" },
  },
  {
    id: "t11",
    title: "Review project wireframes",
    priority: "Medium",
    time: "Yesterday",
    status: "done",
    tag: { kind: "project", id: "proj-portal" },
  },
  {
    id: "t12",
    title: "Team stand-up meeting",
    priority: "Low",
    time: "Yesterday",
    status: "done",
  },
];

function tasksFor(status: Status): TaskRowData[] {
  return tasks.filter((t) => t.status === status);
}

export function TasksPage() {
  const todoTasks = tasksFor("todo");
  const inProgressTasks = tasksFor("in_progress");
  const doneTasks = tasksFor("done");

  return (
    <div className="max-w-[1024px] mx-auto space-y-6">
      <TasksHeader />
      <TasksHeroStrip
        todo={todoTasks.length}
        inProgress={inProgressTasks.length}
        done={doneTasks.length}
      />
      <StatusSection
        icon={Circle}
        tile="tile-violet"
        title="To do"
        description="Backlog ready to pick up"
        countLabel={`${todoTasks.length} open`}
        tasks={todoTasks}
      />
      <StatusSection
        icon={Loader}
        tile="tile-orange"
        title="In progress"
        description="Currently active work"
        countLabel={`${inProgressTasks.length} active`}
        tasks={inProgressTasks}
      />
      <StatusSection
        icon={CheckCircle2}
        tile="tile-emerald"
        title="Done"
        description="Recently completed"
        countLabel={`${doneTasks.length} done`}
        tasks={doneTasks}
      />
    </div>
  );
}
