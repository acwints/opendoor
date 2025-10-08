import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ConditionScores } from "@/data/homeData";

type ValueCardProps = {
  address: string;
  currentValue: number;
  previousValue: number;
  condition: ConditionScores;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatLabel = (value: string) =>
  value
    .split(/[-_\s]+/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

const getHealthTone = (score: number) => {
  if (score >= 85) return "bg-emerald-300";
  if (score >= 70) return "bg-amber-300";
  return "bg-rose-300";
};

const getHealthLabel = (score: number) => {
  if (score >= 85) return "Strong";
  if (score >= 70) return "Watch";
  return "Attention";
};

export function ValueCard({ address, currentValue, previousValue, condition }: ValueCardProps) {
  const change = currentValue - previousValue;
  const percentChange = previousValue
    ? (change / previousValue) * 100
    : 0;
  const isPositive = change >= 0;

  const prioritizedHealth = Object.entries(condition)
    .map(([system, score]) => ({
      system,
      score,
      tone: getHealthTone(score),
      label: getHealthLabel(score),
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <Card className="relative h-full overflow-hidden border-none bg-gradient-to-br from-[#0D5BFF] via-[#1C6BFF] to-[#021B4A] text-white shadow-xl">
      <span className="pointer-events-none absolute -left-20 top-[-60px] h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 right-[-40px] h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />

      <CardHeader className="relative z-10 gap-4">
        <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/70">
          <Sparkles className="size-4" aria-hidden />
          {address}
        </CardDescription>
        <CardTitle className="text-5xl font-semibold">
          {currencyFormatter.format(currentValue)}
        </CardTitle>
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
          <span className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.3em]">
            Estimated Home Value
          </span>
          <span className="text-white/60">Updated moments ago</span>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 space-y-6 text-sm text-white/80">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 rounded-full border border-white/25 px-3 py-1 text-sm font-medium ${
                isPositive
                  ? "bg-emerald-400/20 text-white"
                  : "bg-rose-400/20 text-white"
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="size-4" aria-hidden />
              ) : (
                <ArrowDownRight className="size-4" aria-hidden />
              )}
              {percentChange >= 0 ? "+" : ""}
              {percentChange.toFixed(2)}%
            </span>
            <span className="text-white/70">
              vs last month ({currencyFormatter.format(previousValue)})
            </span>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-xs uppercase tracking-[0.3em] text-white/60">
              Change
            </span>
            <span className="text-lg font-semibold text-white">
              {currencyFormatter.format(Math.abs(change))}{" "}
              {isPositive ? "gain" : "decline"}
            </span>
          </div>
        </div>

        {prioritizedHealth.length > 0 && (
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/70">
              <span>Home health</span>
              <span>Snapshot</span>
            </div>
            <div className="mt-3 space-y-3">
              {prioritizedHealth.map(({ system, score, tone, label }) => (
                <div key={system} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em]">
                    <span className="text-white/70">{formatLabel(system)}</span>
                    <span className="flex items-center gap-2 text-white">
                      <span>{score}</span>
                      <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white">
                        {label}
                      </span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/15">
                    <span
                      className={`block h-full ${tone}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="relative z-10 flex items-center justify-between border-t border-white/15 bg-white/5 py-5 text-white/70">
        <div className="text-xs uppercase tracking-[0.35em]">Confidence high</div>
        <Button
          size="lg"
          variant="secondary"
          className="rounded-full bg-white px-6 text-[#0D5BFF] hover:bg-white/90"
        >
          Update My Value
        </Button>
      </CardFooter>
    </Card>
  );
}
