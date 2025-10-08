import { Lightbulb, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ImprovementIdea } from "@/data/homeData";

type ImprovementListProps = {
  ideas: ImprovementIdea[];
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ImprovementList({ ideas }: ImprovementListProps) {
  const highlighted = ideas.slice(0, 2);

  return (
    <Card className="h-full border border-border/50 bg-white/80 shadow-sm backdrop-blur">
      <CardHeader className="gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <Sparkles className="size-4" aria-hidden />
          Optional Upgrades
        </div>
        <CardTitle className="text-lg font-semibold text-foreground">Nice-to-have improvements</CardTitle>
        <CardDescription>
          Light-touch ideas to consider when timing and budget allow.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {highlighted.map((idea) => {
          const roi = idea.cost > 0 ? (idea.valueGain / idea.cost) * 100 : 0;
          return (
            <div
              key={idea.name}
              className="flex items-start justify-between gap-4 rounded-xl border border-border/40 bg-white p-4 shadow-sm"
            >
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">{idea.name}</p>
                <p className="text-xs text-muted-foreground">
                  Est. spend {currencyFormatter.format(idea.cost)} · Adds about {currencyFormatter.format(idea.valueGain)} in value
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                <Lightbulb className="size-4" aria-hidden />
                {roi.toFixed(0)}% ROI
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
