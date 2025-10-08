"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ConditionGrid } from "@/components/condition-grid";
import { EquityForecast } from "@/components/equity-forecast";
import { HelperTeam } from "@/components/helper-team";
import { HomeCalendar } from "@/components/home-calendar";
import { HomeMap } from "@/components/home-map";
import { HomeBudget } from "@/components/home-budget";
import { MarketGazette } from "@/components/market-gazette";
import { NeighborhoodUpdates } from "@/components/neighborhood-updates";
import { OpportunityHighlights } from "@/components/opportunity-highlights";
import { ValueCard } from "@/components/value-card";
import { ValueChart } from "@/components/value-chart";
import { GalleryGrid } from "@/components/gallery-grid";

import type { HomeData } from "@/data/homeData";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "home-care", label: "Home Services" },
  { id: "market", label: "Market Insights" },
  { id: "neighborhood", label: "Neighborhood" },
] as const;

export type TabKey = (typeof tabs)[number]["id"];

type DashboardNavProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
} & ComponentPropsWithoutRef<"nav">;

export function DashboardNav({ activeTab, onTabChange, className, ...props }: DashboardNavProps) {
  return (
    <nav
      {...props}
      className={cn(
        "mx-auto w-full max-w-3xl rounded-2xl border border-border/70 bg-white/85 shadow-sm backdrop-blur",
        className
      )}
      aria-label="Home dashboard sections"
    >
      <ul className="flex w-full items-center justify-between gap-2 p-1" role="tablist">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-1">
            <button
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "w-full rounded-full px-4 py-2 text-center text-sm font-medium transition",
                activeTab === tab.id
                  ? "bg-primary text-white shadow"
                  : "bg-white/70 text-muted-foreground hover:bg-white"
              )}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type DashboardTabsProps = {
  data: HomeData;
  previousValue: number;
  confidenceScore: number;
  activeTab: TabKey;
};

export function DashboardTabs({ data, previousValue, confidenceScore, activeTab }: DashboardTabsProps) {
  let content: ReactNode;

  if (activeTab === "overview") {
    content = (
      <div
        role="tabpanel"
        id="panel-overview"
        aria-labelledby="tab-overview"
        className="space-y-8"
      >
        <OpportunityHighlights
          currentValue={data.currentValue}
          mortgageBalance={data.mortgageBalance}
          avgDaysOnMarket={data.avgDaysOnMarket}
          buyerDemandScore={data.buyerDemandScore}
          pricePerSqft={data.pricePerSqft}
        />

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <ValueCard
            address={data.address}
            currentValue={data.currentValue}
            previousValue={previousValue}
            condition={data.condition}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <Card className="relative overflow-hidden border-none bg-white/85 shadow-xl backdrop-blur">
              <span className="pointer-events-none absolute -right-20 top-[-80px] h-48 w-48 rounded-full bg-primary/15 blur-2xl" />
              <span className="pointer-events-none absolute -bottom-24 left-10 h-40 w-40 rounded-full bg-emerald-300/20 blur-2xl" />
              <CardHeader className="relative z-10 gap-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
                  Confidence Score
                </div>
                <CardTitle className="text-2xl font-semibold text-foreground">
                  Valuation Confidence
                </CardTitle>
                <CardDescription>
                  Based on nearby comps and recent condition assessments.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-5">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-5xl font-semibold text-foreground">
                      {confidenceScore}%
                    </span>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      trusted accuracy
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-emerald-700">
                    Stable
                  </span>
                </div>
                <Progress value={confidenceScore} className="h-3 overflow-hidden rounded-full bg-primary/10" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Inputs · 3 comps</span>
                  <span>Last refresh · 2 days ago</span>
                </div>
              </CardContent>
              <CardFooter className="relative z-10 border-t border-primary/10 bg-primary/5 text-xs text-muted-foreground">
                Appears accurate based on three recent sales within 0.4 miles.
              </CardFooter>
            </Card>

            {/* <Card className="relative overflow-hidden border border-primary/20 bg-primary/5 shadow-sm">
              <span className="pointer-events-none absolute -right-16 bottom-[-60px] h-48 w-48 rounded-full bg-white/30 blur-2xl" />
              <CardHeader className="relative z-10 gap-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
                  Keep it current
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Refresh your valuation
                </CardTitle>
                <CardDescription>
                  Add photos or notes so your Opendoor guide can refine your estimate.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Share recent upgrades, seasonal maintenance, or market feedback.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button className="rounded-full px-4">Upload Photo</Button>
                  <Button variant="secondary" className="rounded-full border-primary/40 bg-white/80 px-4 text-primary hover:bg-white">
                    Ask about my home
                  </Button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </section>

        <section>
          <ValueChart data={data.valueHistory} />
        </section>

        <section>
          <GalleryGrid images={data.galleryImages} showCover={false} />
        </section>
      </div>
    );
  } else if (activeTab === "home-care") {
    content = (
      <div
        role="tabpanel"
        id="panel-home-care"
        aria-labelledby="tab-home-care"
        className="space-y-8"
      >
        <EquityForecast
          currentValue={data.currentValue}
          mortgageBalance={data.mortgageBalance}
          improvementIdeas={data.improvementIdeas}
        />

        <section className="grid gap-6 xl:grid-cols-[3fr,2fr]">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <ConditionGrid scores={data.condition} />
            </div>
            <HelperTeam helpers={data.helperTeam} />
            <HomeBudget items={data.serviceBudget} />
          </div>
          <HomeCalendar events={data.serviceSchedule} helpers={data.helperTeam} />
        </section>

        {/** Service roster moved next to budget above; removed standalone section. */}
      </div>
    );
  } else if (activeTab === "market") {
    content = (
      <div
        role="tabpanel"
        id="panel-market"
        aria-labelledby="tab-market"
        className="space-y-8"
      >
        <section className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
          <MarketGazette
            comps={data.comps}
            currentValue={data.currentValue}
            avgDaysOnMarket={data.avgDaysOnMarket}
            buyerDemandScore={data.buyerDemandScore}
          />
          <HomeMap
            subject={{
              lat: data.location.lat,
              lng: data.location.lng,
              address: data.address,
              currentValue: data.currentValue,
            }}
            comps={data.comps}
          />
        </section>
      </div>
    );
  } else {
    content = (
      <div
        role="tabpanel"
        id="panel-neighborhood"
        aria-labelledby="tab-neighborhood"
        className="space-y-8"
      >
        <NeighborhoodUpdates updates={data.neighborhoodUpdates} />
      </div>
    );
  }

  return <div className="space-y-8">{content}</div>;
}
