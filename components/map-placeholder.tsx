import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MapPlaceholder() {
  return (
    <Card className="h-full border-none bg-white/80 shadow-xl backdrop-blur">
      <CardHeader className="gap-2">
        <CardTitle className="text-xl font-semibold text-foreground">Neighborhood Snapshot</CardTitle>
        <CardDescription>
          Map view of nearby sales and recent activity (coming soon).
        </CardDescription>
      </CardHeader>
      <CardContent className="relative flex h-[260px] items-center justify-center overflow-hidden rounded-b-xl bg-[radial-gradient(circle_at_20%_20%,hsl(var(--chart-1)/0.18),transparent_55%),radial-gradient(circle_at_80%_30%,hsl(var(--chart-2)/0.18),transparent_45%),radial-gradient(circle_at_50%_80%,hsl(var(--chart-4)/0.16),transparent_60%)] text-sm text-muted-foreground">
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_14px,rgba(255,255,255,0.35)_15px),linear-gradient(90deg,transparent_14px,rgba(255,255,255,0.35)_15px)] bg-[length:32px_32px] mix-blend-overlay" />
        <div className="relative z-10 text-center text-white/80">
          <p className="text-sm font-medium">Interactive map placeholder</p>
          <p className="text-xs text-white/60">
            Live insights launching soon • Request access with your Opendoor guide
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
