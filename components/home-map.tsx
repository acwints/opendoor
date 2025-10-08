'use client'

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  {
    ssr: false,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  {
    ssr: false,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  {
    ssr: false,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ComparableHome } from "@/data/homeData";

type HomeMapProps = {
  subject: {
    lat: number;
    lng: number;
    address: string;
    currentValue: number;
  };
  comps: ComparableHome[];
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function HomeMap({ subject, comps }: HomeMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const center = useMemo(() => [subject.lat, subject.lng] as [number, number], [subject.lat, subject.lng]);
  const comparableMarkers = useMemo(
    () =>
      comps.filter((comp): comp is Required<ComparableHome> =>
        typeof comp.lat === "number" && typeof comp.lng === "number"
      ),
    [comps]
  );

  return (
    <Card className="h-full border-none bg-white/85 shadow-xl backdrop-blur">
      <CardHeader className="gap-2">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">
          Map Intelligence
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">
          Market activity around you
        </CardTitle>
        <CardDescription>
          Explore comparable sales and your home&apos;s position in the neighborhood.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[320px] overflow-hidden rounded-2xl border border-primary/20 shadow-sm">
          {isClient ? (
            <MapContainer
              center={center}
              zoom={14}
              className="h-full w-full"
              scrollWheelZoom={false}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <CircleMarker
                center={center}
                radius={14}
                pathOptions={{
                  color: "#1C6BFF",
                  fillColor: "#1C6BFF",
                  fillOpacity: 0.6,
                  weight: 2,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
                  <div className="text-xs font-semibold">Your home</div>
                </Tooltip>
                <Popup>
                  <div className="space-y-1">
                    <p className="font-semibold">{subject.address}</p>
                    <p className="text-sm text-muted-foreground">
                      Current value {formatCurrency(subject.currentValue)}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>

              {comparableMarkers.map((comp) => (
                <CircleMarker
                  key={comp.address}
                  center={[comp.lat, comp.lng]}
                  radius={10}
                  pathOptions={{
                    color: "#34d399",
                    fillColor: "#34d399",
                    fillOpacity: 0.5,
                    weight: 1.5,
                  }}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
                    <div className="text-xs font-semibold">Recent comp</div>
                  </Tooltip>
                  <Popup>
                    <div className="space-y-1">
                      <p className="font-semibold">{comp.address}</p>
                      <p className="text-sm text-muted-foreground">
                        Sold for {formatCurrency(comp.price)} · {comp.sqft.toLocaleString()} ft²
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          ) : (
            <div className="flex h-full items-center justify-center bg-primary/5 text-sm text-muted-foreground">
              Loading map…
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-3 rounded-full bg-[#1C6BFF]" />
            Your home
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-3 rounded-full bg-[#34d399]" />
            Nearby comps
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
