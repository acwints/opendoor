'use client'

import {
  Area,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import type { ValueHistoryPoint } from '@/data/homeData'

type ValueChartProps = {
  data: ValueHistoryPoint[]
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function ValueChart({ data }: ValueChartProps) {
  const minY = Math.min(...data.map((point) => point.value)) * 0.98
  const maxY = Math.max(...data.map((point) => point.value)) * 1.02

  return (
    <Card className="h-full border-none bg-white/80 shadow-xl backdrop-blur">
      <CardHeader className="gap-2">
        <CardTitle className="text-xl font-semibold text-foreground">Value Trend</CardTitle>
        <CardDescription>Explore how your home&apos;s value has shifted over the past year.</CardDescription>
      </CardHeader>
      <CardContent className="h-[320px] px-0 pb-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 16, right: 24, left: 12, bottom: 8 }}>
            <defs>
              <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border) / 60%)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              domain={[minY, maxY]}
              tickFormatter={(value) => currencyFormatter.format(value)}
              tickLine={false}
              axisLine={false}
              width={80}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3', stroke: 'hsl(var(--muted) / 80%)' }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid hsl(var(--border))',
                background: 'hsl(var(--background))',
              }}
              formatter={(value: number) => currencyFormatter.format(value)}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="transparent"
              fill="url(#valueGradient)"
              fillOpacity={0.9}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--chart-1)"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, stroke: 'var(--background)' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
