import { ClipboardList, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { HomeHelper } from "@/data/homeData";

const ratingFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

type HelperTeamProps = {
  helpers: HomeHelper[];
};

export function HelperTeam({ helpers }: HelperTeamProps) {
  return (
    <Card className="border-none bg-white/90 shadow-xl backdrop-blur">
      <CardHeader className="gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
          <ClipboardList className="size-4" aria-hidden />
          Helper Network
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Your listing-ready helper team
        </CardTitle>
        <CardDescription>
          Opendoor concierge connections to keep the home polished, safe, and market-ready when it&apos;s time to list.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {helpers.map((helper) => (
          <article
            key={helper.id}
            className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white via-white to-primary/5 p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">
                  {helper.role}
                </p>
                <h3 className="text-lg font-semibold text-foreground">
                  {helper.name}
                </h3>
                <p className="text-sm text-muted-foreground">{helper.vendor}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                <Sparkles className="size-4" aria-hidden />
                {ratingFormatter.format(helper.rating)}★
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-primary">
                  Response Time
                </span>
                <p>{helper.responseTime}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-primary">
                  Why they matter
                </span>
                <p>{helper.notes}</p>
              </div>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
