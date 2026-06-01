export type Customer = {
  id: string;
  company: string;
  topic: string;
};

export type Project = {
  id: string;
  name: string;
  code: string;
};

export type TagRef = { kind: "customer"; id: string } | { kind: "project"; id: string };

export const customers: Customer[] = [
  { id: "call-acme", company: "Acme Corp", topic: "Q2 renewal" },
  { id: "call-globex", company: "Globex", topic: "Discovery call" },
  { id: "call-initech", company: "Initech", topic: "Proposal review" },
];

export const customersById: ReadonlyMap<string, Customer> = new Map(
  customers.map((c) => [c.id, c]),
);

export const projects: Project[] = [
  { id: "proj-portal", name: "Customer Portal", code: "CP" },
  { id: "proj-billing", name: "Billing Revamp", code: "BR" },
  { id: "proj-onboarding", name: "Onboarding v2", code: "ON" },
  { id: "proj-analytics", name: "Analytics Pipeline", code: "AP" },
];

export type ResolvedTag = { kind: "customer"; label: string } | { kind: "project"; label: string };

export function resolveTag(ref: TagRef): ResolvedTag | undefined {
  if (ref.kind === "customer") {
    const c = customers.find((x) => x.id === ref.id);
    return c ? { kind: "customer", label: c.company } : undefined;
  }
  const p = projects.find((x) => x.id === ref.id);
  return p ? { kind: "project", label: p.name } : undefined;
}
