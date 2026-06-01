import { CalendarRange, Sparkles } from "lucide-react";
import { CategorySection } from "./CategorySection";
import { OfficeLifeHeader } from "./OfficeLifeHeader";
import { OfficeLifeHeroStrip } from "./OfficeLifeHeroStrip";
import { PerkRow } from "./PerkRow";
import { WeekdayRow } from "./WeekdayRow";
import { perks, weeklyPlan } from "../../lib/office";
import { officeDaysPerWeek } from "../../lib/rto";

export function OfficeLifePage() {
  const officeDays = weeklyPlan.filter((d) => d.office).length;
  const mealsTotal = weeklyPlan.filter((d) => d.office).length;
  const mealsBooked = mealsTotal;
  const perksClaimed = perks.filter((p) => p.status === "booked").length;
  const perksAvailable = perks.filter((p) => p.status === "available").length;

  return (
    <div className="max-w-[1024px] mx-auto space-y-6">
      <OfficeLifeHeader />
      <OfficeLifeHeroStrip
        officeDays={officeDays}
        rtoTarget={officeDaysPerWeek}
        mealsBooked={mealsBooked}
        mealsTotal={mealsTotal}
        perksClaimed={perksClaimed}
      />
      <CategorySection
        icon={CalendarRange}
        tile="tile-violet"
        title="This week"
        description="Office days and meals from Mon to Fri"
        stat={`${officeDays} office days`}
        statChip={`${mealsBooked} / ${mealsTotal} meals`}
      >
        {weeklyPlan.map((d) => (
          <WeekdayRow key={d.day} {...d} />
        ))}
      </CategorySection>
      <CategorySection
        icon={Sparkles}
        tile="tile-emerald"
        title="Office perks"
        description="Amenities and bookable services on-site"
        stat={`${perksAvailable} available`}
        statChip={`${perks.length} total`}
      >
        {perks.map((p) => (
          <PerkRow key={p.id} {...p} />
        ))}
      </CategorySection>
    </div>
  );
}
