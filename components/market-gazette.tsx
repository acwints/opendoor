"use client";

import Image from "next/image";
import { Newspaper, Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ComparableHome } from "@/data/homeData";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type MarketGazetteProps = {
  comps: ComparableHome[];
  currentValue: number;
  avgDaysOnMarket: number;
  buyerDemandScore: number;
};

const sourceBadges: Record<NonNullable<ComparableHome["source"]>, string> = {
  zillow: "bg-sky-500/15 text-sky-600",
  redfin: "bg-rose-500/15 text-rose-600",
  opendoor: "bg-primary/15 text-primary",
};

const sourceLabels: Record<NonNullable<ComparableHome["source"]>, string> = {
  zillow: "Zillow Snapshot",
  redfin: "Redfin Flash",
  opendoor: "Opendoor Verified",
};

export function MarketGazette({ comps, currentValue, avgDaysOnMarket, buyerDemandScore }: MarketGazetteProps) {
  return (
    <Card className="border-none bg-white/90 shadow-xl backdrop-blur">
      <CardHeader className="gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
          <Newspaper className="size-4" aria-hidden />
          Market Gazette
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">Austin Homefront Daily</CardTitle>
        <CardDescription>
          Zillow & Redfin feeds stitched together with Opendoor pricing to keep your ear on the block.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm text-muted-foreground sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Median Comp Spread</p>
            <p className="text-xl font-semibold text-foreground">{currency.format(currentValue - 12000)}</p>
            <p>Pricing staying within 2% of your Opendoor estimate.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Buyer Demand Index</p>
            <p className="text-xl font-semibold text-foreground">{buyerDemandScore}/100</p>
            <p>Mock Redfin demand tracker flags your block as &ldquo;accelerating.&rdquo;</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Days on Market</p>
            <p className="text-xl font-semibold text-foreground">{avgDaysOnMarket} days</p>
            <p>Zillow feed shows turn-key listings moving in under four weeks.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <Zap className="size-4" aria-hidden />
            Latest closings within 0.5 miles
          </div>
          <div className="grid gap-4">
            {comps.map((comp) => (
              <article
                key={comp.address}
                className="grid gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-white via-white to-primary/5 p-4 shadow-sm transition hover:shadow-md md:grid-cols-[220px_1fr]"
              >
                {comp.imageUrl ? (
                  <div className="relative h-40 overflow-hidden rounded-xl">
                    <Image
                      src={comp.imageUrl}
                      alt={`${comp.address} exterior`}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
                    Image unavailable
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{comp.address}</h3>
                    {comp.source && (
                      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${sourceBadges[comp.source]}`}>
                        {sourceLabels[comp.source]}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Closed {comp.soldDate ? new Date(comp.soldDate).toLocaleDateString() : "recently"} · {comp.beds ?? 3} bed · {comp.baths ?? 2} bath · {comp.sqft.toLocaleString()} ft²
                  </p>
                  <p className="text-base font-semibold text-foreground">Sold for {currency.format(comp.price)}</p>
                  <p className="text-sm text-muted-foreground">
                    {comp.price >= currentValue
                      ? "Traded above your estimated value, signaling upward momentum."
                      : "Closed below your estimate, likely due to condition or concessions."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
