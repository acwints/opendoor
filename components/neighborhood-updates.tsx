import Image from "next/image";

import { MessageCircle, RadioTower } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { NeighborhoodUpdate } from "@/data/homeData";

type NeighborhoodUpdatesProps = {
  updates: NeighborhoodUpdate[];
};

const tagColorMap: Record<string, string> = {
  Community: "bg-emerald-100 text-emerald-700",
  Event: "bg-emerald-50 text-emerald-600",
  Safety: "bg-amber-100 text-amber-700",
  Freebie: "bg-sky-100 text-sky-700",
  Garden: "bg-lime-100 text-lime-700",
};

export function NeighborhoodUpdates({ updates }: NeighborhoodUpdatesProps) {
  return (
    <Card className="border-none bg-white/90 shadow-xl backdrop-blur">
      <CardHeader className="gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-600">
          <RadioTower className="size-4" aria-hidden />
          Nextdoor Puls
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Neighborhood updates from your block
        </CardTitle>
        <CardDescription>
          Surface the latest chatter from your Nextdoor thread so you can stay connected with the cul-de-sac.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {updates.map((update) => (
          <article
            key={update.id}
            className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 via-white to-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
                <Image
                  src={update.avatarUrl}
                  alt={`${update.neighbor} avatar`}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {update.neighbor}
                  </p>
                  <span className="text-xs uppercase tracking-[0.3em] text-emerald-600">
                    {update.distance}
                  </span>
                  <span className="text-xs text-muted-foreground">• {update.timeAgo}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {update.headline}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {update.message}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {update.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${tagColorMap[tag] ?? "bg-slate-100 text-slate-600"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
        <div className="flex items-center gap-2 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 p-4 text-sm text-emerald-700">
          <MessageCircle className="size-4" aria-hidden />
          Post an update on Nextdoor to let neighbors know about any projects or tours before you list.
        </div>
      </CardContent>
    </Card>
  );
}
