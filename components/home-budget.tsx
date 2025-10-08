"use client";

import type { ComponentType } from "react";

import { ArrowDownRight, ArrowUpRight, Minus, Wallet } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ServiceBudgetItem } from "@/data/homeData";

type HomeBudgetProps = {
  items: ServiceBudgetItem[];
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const signMap: Record<"up" | "down" | "flat", { icon: ComponentType<{ className?: string }> }> = {
  up: { icon: ArrowUpRight },
  down: { icon: ArrowDownRight },
  flat: { icon: Minus },
};

const getTrend = (change: number): "up" | "down" | "flat" => {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "flat";
};

export function HomeBudget({ items }: HomeBudgetProps) {
  const monthlyTotal = items.reduce((sum, item) => sum + item.monthlySpend, 0);
  const netChange = items.reduce((sum, item) => sum + item.change, 0);
  const trend = getTrend(netChange);
  const TrendIcon = signMap[trend].icon;

  return (
    <Card className="h-full border-none bg-white/80 shadow-xl backdrop-blur">
      <CardHeader className="relative z-10 gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
          <Wallet className="size-4" aria-hidden />
          Budget Overview
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Monthly service spend
        </CardTitle>
        <CardDescription>
          Track recurring care costs and upcoming adjustments at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/50 bg-muted/30 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Total this month
            </p>
            <p className="text-2xl font-semibold text-foreground">
              {currency.format(monthlyTotal)}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-foreground shadow-sm">
            <TrendIcon className="size-4 text-primary" aria-hidden />
            {netChange === 0 ? "On track" : `${netChange > 0 ? "+" : ""}${currency.format(netChange)}`}
          </div>
        </div>

        <div className="grid gap-3">
          {items.map((item) => {
            const itemTrend = getTrend(item.change);
            const ItemTrendIcon = signMap[itemTrend].icon;
            return (
              <div
                key={item.id}
                className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-white via-white to-primary/5 p-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">{item.category}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span className="text-lg font-semibold text-foreground">
                    {currency.format(item.monthlySpend)}
                  </span>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    <ItemTrendIcon className="size-4 text-primary" aria-hidden />
                    {item.change === 0 ? "Holding" : `${item.change > 0 ? "+" : ""}${currency.format(item.change)}`}
                  </div>
                  {typeof item.upcoming === "number" && item.upcoming !== item.monthlySpend && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                      Next month {currency.format(item.upcoming)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
