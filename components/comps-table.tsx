import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { ComparableHome } from "@/data/homeData";

type CompsTableProps = {
  comps: ComparableHome[];
  subjectValue: number;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function CompsTable({ comps, subjectValue }: CompsTableProps) {
  const closestCompAddress = comps.reduce((closest, current) => {
    const closestDelta = Math.abs((closest?.price ?? subjectValue) - subjectValue);
    const currentDelta = Math.abs(current.price - subjectValue);
    return currentDelta < closestDelta ? current : closest;
  }, comps[0])?.address;

  return (
    <Card className="h-full border-none bg-white/85 shadow-xl backdrop-blur">
      <CardHeader className="gap-2">
        <CardTitle className="text-xl font-semibold text-foreground">Recent Comps</CardTitle>
        <CardDescription>
          Nearby comparable sales within the last 90 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Address</TableHead>
              <TableHead>Square Feet</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="pr-6 text-right">Delta vs. yours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comps.map((comp) => {
              const delta = comp.price - subjectValue;
              const isClosest = comp.address === closestCompAddress;
              return (
                <TableRow
                  key={comp.address}
                  className={`transition hover:bg-primary/5 ${isClosest ? 'bg-primary/5' : ''}`}
                >
                  <TableCell className="pl-6 font-medium">
                    {comp.address}
                    {isClosest && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        Closest match
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{comp.sqft.toLocaleString()} ft²</TableCell>
                  <TableCell>{currencyFormatter.format(comp.price)}</TableCell>
                  <TableCell className="pr-6 text-right">
                    <span
                      className={
                        delta >= 0
                          ? "text-emerald-600 dark:text-emerald-300"
                          : "text-rose-600 dark:text-rose-300"
                      }
                    >
                      {delta >= 0 ? "+" : ""}
                      {currencyFormatter.format(delta)}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
