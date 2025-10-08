'use client'

import type { ReactNode } from 'react'

import { Droplets, Home, Layers3, Trees, UtensilsCrossed, Wind, HeartPulse } from 'lucide-react'

import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type { ConditionScores } from '@/data/homeData'

type ConditionGridProps = {
  scores: ConditionScores
}

const iconMap: Record<string, ReactNode> = {
  roof: <Home className="size-5" aria-hidden />,
  flooring: <Layers3 className="size-5" aria-hidden />,
  kitchen: <UtensilsCrossed className="size-5" aria-hidden />,
  exterior: <Trees className="size-5" aria-hidden />,
  hvac: <Wind className="size-5" aria-hidden />,
  plumbing: <Droplets className="size-5" aria-hidden />,
}

export function ConditionGrid({ scores }: ConditionGridProps) {
  return (
    <Card className="h-full">
      <CardHeader className="gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
          <HeartPulse className="size-4" aria-hidden />
          Home Health
        </div>
        <CardTitle className="text-2xl">Overall condition by system</CardTitle>
        <CardDescription>Condition scores across key systems.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 md:grid-cols-2">
        {Object.entries(scores).map(([system, value]) => {
          const levelColor =
            value >= 85
              ? 'from-emerald-500/15 to-emerald-500/5'
              : value >= 70
                ? 'from-amber-400/15 to-amber-400/5'
                : 'from-rose-500/15 to-rose-500/5'
          const icon = iconMap[system] ?? <Droplets className="size-5" aria-hidden />

          return (
            <div
              key={system}
              className={`relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br ${levelColor} p-5 shadow-sm transition hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {icon}
                  </span>
                  <div>
                    <p className="font-semibold capitalize text-foreground">
                      {system.replace('-', ' ')}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      condition
                    </p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-foreground">{value}</span>
              </div>
              <Progress value={value} className="mt-4 h-2" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
