import { Briefcase, Users, CalendarDays, Megaphone } from "lucide-react";
import { CategorySection } from "./CategorySection";
import { EmailsHeader } from "./EmailsHeader";
import { EmailsHeroStrip } from "./EmailsHeroStrip";
import type { EmailRowData } from "./EmailRow";
import { customersById } from "../../lib/tags";

type EmailCategory = "customer" | "internal" | "events" | "announcements";

type Email = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  category: EmailCategory;
  callId?: string;
};

const emails: Email[] = [
  {
    id: "e1",
    sender: "Sarah Johnson",
    subject: "Client follow-up regarding proposal",
    preview: "Hi Daniel, just following up on the proposal we discussed last week…",
    time: "2h ago",
    unread: true,
    category: "customer",
    callId: "call-acme",
  },
  {
    id: "e2",
    sender: "Michael Chen",
    subject: "Discovery call notes & next steps",
    preview: "Thanks for the call earlier — sharing my notes and a few follow-up questions…",
    time: "5h ago",
    unread: true,
    category: "customer",
    callId: "call-globex",
  },
  {
    id: "e3",
    sender: "Priya Raman",
    subject: "Revised pricing for Initech",
    preview: "Attached is the updated pricing sheet we agreed to share after the review…",
    time: "1d ago",
    unread: false,
    category: "customer",
    callId: "call-initech",
  },
  {
    id: "e4",
    sender: "Tom Wright",
    subject: "Re: Procurement timeline",
    preview: "Our legal team flagged a couple of clauses — can we hop on a quick sync?",
    time: "2d ago",
    unread: true,
    category: "customer",
    callId: "call-acme",
  },

  {
    id: "i1",
    sender: "Marketing Team",
    subject: "Weekly marketing update",
    preview: "Here's the update for this week's campaign performance and upcoming pushes…",
    time: "3h ago",
    unread: true,
    category: "internal",
  },
  {
    id: "i2",
    sender: "Alex Park (Manager)",
    subject: "1:1 prep for Friday",
    preview: "Mind sending over your weekly highlights and any blockers ahead of our 1:1?",
    time: "6h ago",
    unread: true,
    category: "internal",
  },
  {
    id: "i3",
    sender: "Jordan Lee (Skip)",
    subject: "Org goals — Q3 draft",
    preview: "Sharing the early draft of Q3 org goals; would value your input on section 2…",
    time: "1d ago",
    unread: false,
    category: "internal",
  },
  {
    id: "i4",
    sender: "Rita Gomez (Teammate)",
    subject: "Code review on PR #482",
    preview: "Left a few comments on your PR — mostly nits, one question about the retry path…",
    time: "1d ago",
    unread: false,
    category: "internal",
  },

  {
    id: "ev1",
    sender: "Events Desk",
    subject: "SaaStr Annual — early bird ends Friday",
    preview: "Last chance to grab early-bird passes for SaaStr Annual in September…",
    time: "8h ago",
    unread: true,
    category: "events",
  },
  {
    id: "ev2",
    sender: "People Ops",
    subject: "Summer team offsite — save the date",
    preview: "Blocking June 18-20 for our team offsite. Travel details to follow shortly…",
    time: "2d ago",
    unread: false,
    category: "events",
  },
  {
    id: "ev3",
    sender: "Internal Speakers",
    subject: "Lunch & Learn: AI in production",
    preview: "Join us Thursday at noon for a candid session on shipping AI features safely…",
    time: "3d ago",
    unread: false,
    category: "events",
  },

  {
    id: "a1",
    sender: "Leadership",
    subject: "Company all-hands recap",
    preview: "Thank you to everyone who joined yesterday — recording and slides are linked below…",
    time: "1d ago",
    unread: true,
    category: "announcements",
  },
  {
    id: "a2",
    sender: "IT Department",
    subject: "Mandatory security training",
    preview: "Please complete the annual security training module by end of month…",
    time: "2d ago",
    unread: false,
    category: "announcements",
  },
  {
    id: "a3",
    sender: "HR",
    subject: "New benefits portal is live",
    preview: "Our updated benefits portal is now available — log in to review your selections…",
    time: "4d ago",
    unread: false,
    category: "announcements",
  },
];

function rowsFor(category: EmailCategory): EmailRowData[] {
  return emails
    .filter((e) => e.category === category)
    .map((e) => {
      const call = e.callId ? customersById.get(e.callId) : undefined;
      return {
        id: e.id,
        sender: e.sender,
        subject: e.subject,
        preview: e.preview,
        time: e.time,
        unread: e.unread,
        callCompany: call?.company,
      };
    });
}

export function EmailsPage() {
  const customerRows = rowsFor("customer");
  const internalRows = rowsFor("internal");
  const eventRows = rowsFor("events");
  const announcementRows = rowsFor("announcements");

  const unread = emails.filter((e) => e.unread).length;
  const opportunities = customerRows.length;
  const internal = internalRows.length;

  return (
    <div className="max-w-[1024px] mx-auto space-y-6">
      <EmailsHeader />
      <EmailsHeroStrip unread={unread} opportunities={opportunities} internal={internal} />
      <CategorySection
        icon={Briefcase}
        tile="tile-violet"
        title="Customer emails"
        description="Opportunities — tagged to a customer call"
        emails={customerRows}
      />
      <CategorySection
        icon={Users}
        tile="tile-emerald"
        title="Internal communication"
        description="Teammates, manager and skip managers"
        emails={internalRows}
      />
      <CategorySection
        icon={CalendarDays}
        tile="tile-orange"
        title="Events"
        description="Conferences, offsites and team gatherings"
        emails={eventRows}
      />
      <CategorySection
        icon={Megaphone}
        tile="tile-blue"
        title="Announcements"
        description="Company-wide updates and policy changes"
        emails={announcementRows}
      />
    </div>
  );
}
