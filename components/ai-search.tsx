'use client'

import { FormEvent, useEffect, useMemo, useState, useTransition } from 'react'
import { ArrowUpRight, Loader2, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'

type Insight = {
  title: string
  detail: string
}

type AiSearchResult = {
  summary: string
  insights: Insight[]
  recommendations: string[]
}

type AiSearchProps = {
  context: Record<string, unknown>
}

export function AiSearch({ context }: AiSearchProps) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<AiSearchResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const placeholderQuery = useMemo(
    () =>
      'How can I unlock more equity without fully listing right now?',
    []
  )

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!query.trim()) {
      setError('Ask something about your home or the market to continue.')
      return
    }
    setError(null)
    startTransition(async () => {
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, context }),
        })

        if (!response.ok) {
          throw new Error('Request failed')
        }

        const data: AiSearchResult = await response.json()
        setResult(data)
      } catch (err) {
        console.error(err)
        setError('Something went wrong reaching the Opendoor assistant. Try again in a moment.')
      }
    })
  }

  if (!isClient) {
    return (
      <Card className="w-full max-w-2xl border border-white/30 bg-white/85 shadow-lg backdrop-blur">
        <CardHeader className="gap-1 pb-3">
          <CardDescription>Loading assistant…</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl border border-white/30 bg-white/95 shadow-lg backdrop-blur">
      <CardContent className="space-y-3 pt-0">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              id="ai-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholderQuery}
              className="w-full rounded-full border border-border/60 bg-white px-9 py-2 text-sm text-foreground shadow-inner outline-none transition focus:border-primary"
            />
          </div>
          <Button type="submit" className="rounded-full px-4 py-2 text-sm" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : 'Ask OpendoorAI'}
          </Button>
        </form>
        {error && <p className="text-xs text-rose-500">{error}</p>}
        {result && (
          <div className="space-y-3 rounded-2xl border border-border/40 bg-white/90 p-4 shadow-sm">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Summary</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{result.summary}</p>
            </div>
            {result.insights.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Signals</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {result.insights.map((insight) => (
                    <li key={insight.title} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 rounded-full bg-primary" />
                      <span>
                        <span className="font-medium text-foreground">{insight.title}: </span>
                        {insight.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.recommendations.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Next moves</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {result.recommendations.map((recommendation) => (
                    <li key={recommendation} className="flex items-start gap-2">
                      <ArrowUpRight className="mt-0.5 size-4 text-primary" aria-hidden />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
