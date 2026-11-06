"use client";

import Image from "next/image";
import { useState } from "react";

export interface CarouselImage {
  src: string;
  caption?: string;
}

export default function ImageCarousel({ images }: { images: CarouselImage[] }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const image = images[index];
  const step = (delta: number) =>
    setIndex((index + delta + images.length) % images.length);

  return (
    <div className="flex flex-col gap-2">
      {/* Fixed-size frame: every image (tall phone screenshot or square) fits
          inside the same box, so the carousel doesn't jump between slides. */}
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={image.src}
          alt={image.caption ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-contain"
          priority={index === 0}
        />
      </div>

      <div className="flex items-center justify-between gap-3 text-sm">
        <p className="m-0 font-['Helvetica',Arial,sans-serif] text-sm text-black">
          {image.caption}
        </p>
        {images.length > 1 && (
          <div className="flex shrink-0 items-center gap-3 font-['Helvetica',Arial,sans-serif] text-black">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="flex h-9 w-9 items-center justify-center border border-black bg-white text-lg text-black transition-colors duration-200 hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              &#8592;
            </button>

            <span className="min-w-[3rem] text-center text-xs tracking-widest tabular-nums">
              {index + 1} / {images.length}
            </span>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="flex h-9 w-9 items-center justify-center border border-black bg-white text-lg text-black transition-colors duration-200 hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              &#8594;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
