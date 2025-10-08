'use client'

import { useMemo, useState } from 'react'
import { TrendingUp } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

import type { ImprovementIdea } from '@/data/homeData'

type EquityForecastProps = {
  currentValue: number
  mortgageBalance: number
  improvementIdeas: ImprovementIdea[]
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function EquityForecast({ currentValue, mortgageBalance, improvementIdeas }: EquityForecastProps) {
  const baseGain = useMemo(
    () => improvementIdeas.reduce((total, idea) => total + idea.valueGain, 0),
    [improvementIdeas]
  )
  const [budget, setBudget] = useState<number[]>([15000])

  const projectedValue = useMemo(() => {
    const additionalLift = budget[0] * 0.65
    return currentValue + baseGain + additionalLift
  }, [baseGain, budget, currentValue])

  const projectedEquity = useMemo(
    () => projectedValue - mortgageBalance,
    [projectedValue, mortgageBalance]
  )

  const baseEquity = currentValue - mortgageBalance
  const equityDelta = projectedEquity - baseEquity

  return (
    <Card className="border-none bg-white/85 shadow-xl backdrop-blur">
      <CardHeader className="gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
          <TrendingUp className="size-4" aria-hidden />
          Equity Scenario Builder
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">See how upgrades unlock future equity</CardTitle>
        <CardDescription>
          Adjust your improvement budget to visualize potential valuation lift and net gains after projects.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>Projected budget</span>
            <span className="text-base font-semibold text-foreground">{currency.format(budget[0])}</span>
          </div>
          <Slider
            value={budget}
            onValueChange={setBudget}
            min={0}
            max={50000}
            step={5000}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>$25k</span>
            <span>$50k</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Projected value</p>
            <p className="text-2xl font-semibold text-foreground">{currency.format(projectedValue)}</p>
            <p className="text-xs text-muted-foreground">Includes Opendoor&apos;s estimate plus upgrade lift.</p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-white/80 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Future equity</p>
            <p className="text-2xl font-semibold text-foreground">{currency.format(projectedEquity)}</p>
            <p className="text-xs text-muted-foreground">After subtracting your estimated mortgage balance.</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">Net new equity</p>
            <p className="text-2xl font-semibold text-emerald-600">{currency.format(equityDelta)}</p>
            <p className="text-xs text-muted-foreground">Potential upside from your improvement strategy.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/10 bg-white/70 p-4 text-sm text-muted-foreground">
          We assume 65% of each dollar invested is returned in additional value. Update this once you receive contractor quotes or AI remodel suggestions.
        </div>
      </CardContent>
    </Card>
  )
}
