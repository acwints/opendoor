import { TrendingUp, Gauge, PiggyBank } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

type OpportunityHighlightsProps = {
  currentValue: number
  mortgageBalance: number
  avgDaysOnMarket: number
  buyerDemandScore: number
  pricePerSqft: number
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function OpportunityHighlights({
  currentValue,
  mortgageBalance,
  avgDaysOnMarket,
  buyerDemandScore,
  pricePerSqft,
}: OpportunityHighlightsProps) {
  const availableEquity = currentValue - mortgageBalance

  const highlights = [
    {
      title: 'Unlockable equity',
      value: currency.format(availableEquity),
      detail: 'Estimated after outstanding balance. Eligible for Opendoor-backed cash advance.',
      icon: PiggyBank,
      badge: 'Ready now',
      badgeColor: 'bg-emerald-500/15 text-emerald-600',
    },
    {
      title: 'Local market tempo',
      value: `${avgDaysOnMarket} days`,
      detail: 'Average days on market in your micro-neighborhood the past 30 days.',
      icon: Gauge,
      badge: avgDaysOnMarket <= 25 ? 'Hot' : 'Balanced',
      badgeColor: 'bg-orange-500/15 text-orange-600',
    },
    {
      title: 'Buyer demand index',
      value: `${buyerDemandScore}/100`,
      detail: `Homes near ${currency.format(pricePerSqft)} per ft² are outperforming list price by 3.4%.`,
      icon: TrendingUp,
      badge: 'Top 15%',
      badgeColor: 'bg-primary/15 text-primary',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {highlights.map(({ title, value, detail, icon: Icon, badge, badgeColor }) => (
        <Card key={title} className="border-none bg-white/85 shadow-lg backdrop-blur">
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div className={`inline-flex items-center gap-2 rounded-full ${badgeColor} px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]`}>
                {badge}
              </div>
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{title}</p>
              <p className="text-2xl font-semibold text-foreground">{value}</p>
            </div>
            <p className="text-sm text-muted-foreground">{detail}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
