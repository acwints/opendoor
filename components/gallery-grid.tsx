"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { GalleryImage } from "@/data/homeData";

type GalleryGridProps = {
  images: GalleryImage[];
  showCover?: boolean;
};

export function GalleryGrid({ images, showCover = true }: GalleryGridProps) {
  const handleError = (url: string) => {
    console.error("Gallery image failed to load", url);
  };

  const [coverImage, ...secondaryImages] = images;
  const gridImages = showCover ? secondaryImages : images;

  return (
    <Card className="h-full border-none bg-white/85 shadow-xl backdrop-blur">
      <CardHeader className="gap-2">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">
          Home Gallery
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">
          Visual story of your home
        </CardTitle>
        <CardDescription>
          Curated highlights to showcase condition and upgrades to buyers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {(showCover && coverImage ? [coverImage, ...gridImages] : gridImages).map((image, index) => (
            <figure
              key={`${image.url}-${index}`}
              className="group relative h-60 overflow-hidden rounded-2xl border border-white/40 bg-muted/40 shadow-sm transition duration-300 hover:shadow-lg sm:h-64"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 640px) 500px, 100vw"
                onError={() => handleError(image.url)}
                priority={showCover && index === 0}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm text-white">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
