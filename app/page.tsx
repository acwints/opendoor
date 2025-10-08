"use client";

import { useState } from "react";

import Image from "next/image";

import { ArrowRight } from "lucide-react";

import { homeData } from "@/data/homeData";
import { Button } from "@/components/ui/button";
import { DashboardNav, DashboardTabs, type TabKey } from "@/components/dashboard-tabs";
import { AiSearch } from "@/components/ai-search";

const CONFIDENCE_SCORE = 82;

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const previousValue =
    homeData.valueHistory.at(-2)?.value ?? homeData.currentValue;
  const coverImage = homeData.galleryImages[0];
  const aiContext = {
    address: homeData.address,
    currentValue: homeData.currentValue,
    comps: homeData.comps,
    condition: homeData.condition,
    improvementIdeas: homeData.improvementIdeas,
    buyerDemandScore: homeData.buyerDemandScore,
    avgDaysOnMarket: homeData.avgDaysOnMarket,
    pricePerSqft: homeData.pricePerSqft,
  } satisfies Record<string, unknown>;

  return (
    <main className="relative min-h-screen bg-background">
      {coverImage && (
        <section className="relative h-[360px] w-full overflow-hidden sm:h-[400px] lg:h-[440px]">
          <Image
            src={coverImage.url}
            alt={coverImage.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-6 py-6 lg:px-10 lg:py-8">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/90">
                Opendoor
              </p>
              <h1 className="truncate px-2 text-center text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
                {homeData.address}
              </h1>
              <Button variant="secondary" className="group rounded-full bg-white px-5 text-foreground shadow-sm hover:bg-white/90">
                Get listing guidance
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Button>
            </div>
            <div className="flex flex-col gap-5 text-white w-full">
              <div className="flex justify-center w-full">
                <AiSearch context={aiContext} />
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="relative bg-background">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-12 pt-8 lg:px-10">
          <div className="flex justify-center">
            <DashboardNav
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="max-w-xl bg-card shadow-sm"
            />
          </div>
          <DashboardTabs
            data={homeData}
            previousValue={previousValue}
            confidenceScore={CONFIDENCE_SCORE}
            activeTab={activeTab}
          />
        </div>
      </div>
    </main>
  );
}
