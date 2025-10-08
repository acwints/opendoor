"use client";

import { useMemo, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ChevronLeft,
  ChevronRight,
  List,
  TriangleAlert,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { HomeHelper, HomeServiceEvent } from "@/data/homeData";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
});

const statusStyles: Record<HomeServiceEvent["status"], string> = {
  scheduled: "text-emerald-600 bg-emerald-100",
  completed: "text-slate-600 bg-slate-200",
  "action-needed": "text-amber-600 bg-amber-100",
};

const categoryAccent: Record<HomeServiceEvent["category"], string> = {
  cleaning: "bg-sky-500/10 text-sky-600",
  maintenance: "bg-emerald-500/10 text-emerald-600",
  inspection: "bg-violet-500/10 text-violet-600",
  insurance: "bg-amber-500/10 text-amber-600",
  project: "bg-primary/10 text-primary",
};

const weekdayLabels = Array.from({ length: 7 }, (_, index) =>
  weekdayFormatter.format(new Date(2024, 0, 1 + index))
);

type HomeCalendarProps = {
  events: HomeServiceEvent[];
  helpers: HomeHelper[];
};

const getDateKey = (date: Date) => {
  const local = new Date(date.getTime());
  local.setHours(0, 0, 0, 0);
  return local.toISOString().split("T")[0];
};

const getEventDateKey = (isoString: string) => getDateKey(new Date(isoString));

export function HomeCalendar({ events, helpers }: HomeCalendarProps) {
  const [view, setView] = useState<"month" | "list">("month");
  const [activeDate, setActiveDate] = useState(() => new Date());

  const upcoming = useMemo(
    () => [...events].sort((a, b) => a.scheduledFor.localeCompare(b.scheduledFor)),
    [events]
  );

  const helperLookup = useMemo(
    () => new Map(helpers.map((helper) => [helper.id, helper])),
    [helpers]
  );

  // Weekly view removed

  const monthMatrix = useMemo(() => {
    const start = new Date(activeDate.getFullYear(), activeDate.getMonth(), 1);
    const end = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 0);
    const matrix: Date[][] = [];

    const startDay = (start.getDay() + 6) % 7; // Monday = 0
    const startDate = new Date(start);
    startDate.setDate(startDate.getDate() - startDay);

    const endDay = (end.getDay() + 6) % 7;
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() + (6 - endDay));

    const current = new Date(startDate);
    while (current <= endDate) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      matrix.push(week);
    }
    return matrix;
  }, [activeDate]);

  const monthDays = useMemo(() => monthMatrix.flat(), [monthMatrix]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, HomeServiceEvent[]>();
    for (const event of events) {
      const key = getEventDateKey(event.scheduledFor);
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)?.push(event);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.scheduledFor.localeCompare(b.scheduledFor));
    }
    return map;
  }, [events]);

  const goPrevious = () => {
    if (view === "month") {
      setActiveDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }
  };

  const goNext = () => {
    if (view === "month") {
      setActiveDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }
  };

  const viewLabel = useMemo(() => {
    if (view === "month") {
      return monthFormatter.format(activeDate);
    }
    return "Upcoming schedule";
  }, [view, activeDate]);

  return (
    <Card className="border-none bg-white/90 shadow-xl backdrop-blur">
      <CardHeader className="gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
          <CalendarDays className="size-4" aria-hidden />
          Home Calendar
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Service schedule at a glance
        </CardTitle>
        <CardDescription>
          Keep maintenance, insurance, and projects aligned so your home stays show-ready.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={goPrevious}>
              <ChevronLeft className="size-4" aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={goNext}>
              <ChevronRight className="size-4" aria-hidden />
            </Button>
            <p className="text-sm font-semibold text-foreground">{viewLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={view === "month" ? "default" : "secondary"}
              className="rounded-full px-4"
              onClick={() => setView("month")}
            >
              <CalendarDays className="mr-2 size-4" aria-hidden /> Calendar
            </Button>
            <Button
              variant={view === "list" ? "default" : "secondary"}
              className="rounded-full px-4"
              onClick={() => setView("list")}
            >
              <List className="mr-2 size-4" aria-hidden /> List
            </Button>
          </div>
        </div>

        {/* Next up section removed */}

        {view === "month" && (
          <div className="grid gap-2">
            <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {weekdayLabels.map((label) => (
                <span key={`weekday-${label}`}>{label}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {monthDays.map((date) => {
                const dateKey = getDateKey(date);
                const dayEvents = eventsByDay.get(dateKey) ?? [];
                const isCurrentMonth = date.getMonth() === activeDate.getMonth();
                const isToday = date.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={dateKey}
                    className={`min-h-[94px] rounded-2xl border p-2 text-left text-xs transition hover:border-primary/50 ${
                      isCurrentMonth ? "border-border bg-white/70" : "border-dashed border-border/40 bg-muted/40 text-muted-foreground"
                    } ${isToday ? "ring-2 ring-primary" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{date.getDate()}</span>
                      {dayEvents.length > 0 && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                          {dayEvents.length} svc
                        </span>
                      )}
                    </div>
                    <div className="mt-2 space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div key={event.id} className="rounded-md bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
                          {timeFormatter.format(new Date(event.scheduledFor))} · {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <p className="text-[10px] text-muted-foreground">+{dayEvents.length - 2} more</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/** Weekly view removed */}

        {view === "list" && (
          <div className="space-y-3">
            {upcoming.map((event) => {
              const helper = event.helperId ? helperLookup.get(event.helperId) : undefined;
              const statusIcon =
                event.status === "completed" ? (
                  <CheckCircle2 className="size-4 text-slate-500" aria-hidden />
                ) : event.status === "scheduled" ? (
                  <Clock3 className="size-4 text-emerald-600" aria-hidden />
                ) : (
                  <TriangleAlert className="size-4 text-amber-600" aria-hidden />
                );

              return (
                <article key={event.id} className="rounded-2xl border border-border/60 bg-gradient-to-br from-white via-white to-primary/5 p-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-primary/5 text-primary">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                          {dateFormatter.format(new Date(event.scheduledFor)).split(" ")[0]}
                        </span>
                        <span className="text-lg font-semibold text-foreground">
                          {dateFormatter.format(new Date(event.scheduledFor)).split(" ")[1]?.replace(",", "")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{timeFormatter.format(new Date(event.scheduledFor))}</p>
                        <h3 className="text-base font-semibold text-foreground">{event.title}</h3>
                        {helper ? (
                          <p className="text-sm text-muted-foreground">With {helper.name} · {helper.role}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">Assign a helper to finalize</p>
                        )}
                        <div className="mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          {statusIcon}
                          <span>{event.status === "action-needed" ? "Action needed" : event.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-sm">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${statusStyles[event.status]}`}>
                        {event.status === "action-needed" ? "Action needed" : event.status}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${categoryAccent[event.category]}`}>
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.notes}</p>
                </article>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
