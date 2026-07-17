"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ImageRef } from "@/lib/content";

/** "3/4" -> 0.75. Falls back to 3:4 portrait on anything unparseable. */
export function parseAspect(aspect: string | undefined): number {
    const [w, h] = (aspect ?? "3/4").split("/").map((n) => Number(n.trim()));
    return Number.isFinite(w) && Number.isFinite(h) && w > 0 && h > 0
        ? w / h
        : 3 / 4;
}

export default function ImageCarousel({
    images,
    title,
    aspect,
}: {
    images: ImageRef[];
    title: string;
    /** Width-over-height, e.g. "3/4" for portrait phone photos. */
    aspect?: string;
}) {
    const rootRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [index, setIndex] = useState(0);
    const ratio = parseAspect(aspect);

    const step = useCallback(
        (delta: number) => {
            const track = trackRef.current;
            if (!track) return;
            const target = Math.min(
                Math.max(index + delta, 0),
                images.length - 1,
            );
            track.scrollTo({
                left: target * track.clientWidth,
                behavior: "smooth",
            });
        },
        [index, images.length],
    );

    // Keep the counter in sync with swipes and trackpad scrolling.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const onScroll = () => {
            if (track.clientWidth === 0) return;
            setIndex(Math.round(track.scrollLeft / track.clientWidth));
        };

        track.addEventListener("scroll", onScroll, { passive: true });
        return () => track.removeEventListener("scroll", onScroll);
    }, []);

    // A resize changes the track width, which leaves scrollLeft pointing between
    // two slides. Snap back onto the current one so the view never sits halfway.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const observer = new ResizeObserver(() => {
            track.scrollTo({ left: index * track.clientWidth });
        });
        observer.observe(track);
        return () => observer.disconnect();
    }, [index]);

    // Publish the photo's rendered width so the stylesheet can shrink the whole
    // carousel — track, caption and controls — to hug the image instead of
    // letting them span the wider column beside a portrait photo. The column's
    // height is fixed by the text next to it, so narrowing the carousel never
    // feeds back into the image size.
    useEffect(() => {
        const img = imgRef.current;
        const root = rootRef.current;
        if (!img || !root) return;

        const update = () => {
            root.style.setProperty("--frame-width", `${img.offsetWidth}px`);
        };
        update();

        const observer = new ResizeObserver(update);
        observer.observe(img);
        return () => observer.disconnect();
    }, []);

    if (images.length === 0) return null;

    return (
        // The ratio goes to CSS as a variable: in one column it sets the photo's
        // height, and in two columns the stylesheet ignores it and lets the
        // column height drive instead.
        <div
            ref={rootRef}
            className="carousel"
            style={{ "--ratio": String(ratio) } as React.CSSProperties}
        >
            <div ref={trackRef} className="carousel__track no-scrollbar">
                {images.map((image, i) => (
                    <figure key={image.src} className="carousel__slide">
                        <img
                            ref={i === 0 ? imgRef : undefined}
                            src={image.src}
                            alt={image.alt ?? image.caption ?? `${title} ${i + 1}`}
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                            draggable={false}
                        />
                        {image.caption && (
                            <figcaption>{image.caption}</figcaption>
                        )}
                    </figure>
                ))}
            </div>

            {images.length > 1 && (
                <div className="carousel__controls">
                    <button
                        type="button"
                        onClick={() => step(-1)}
                        disabled={index === 0}
                        aria-label="Previous image"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={() => step(1)}
                        disabled={index === images.length - 1}
                        aria-label="Next image"
                    >
                        ›
                    </button>
                    <span className="carousel__count">
                        {index + 1} / {images.length}
                    </span>
                </div>
            )}
        </div>
    );
}
