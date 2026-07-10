"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ImageRef } from "@/lib/content";

const buttonStyle: React.CSSProperties = {
    background: "white",
    border: "none",
    padding: "0.25rem 0.75rem",
    font: "inherit",
    color: "black",
    cursor: "pointer",
};

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
    maxHeight = "52vh",
}: {
    images: ImageRef[];
    title: string;
    /** Width-over-height, e.g. "3/4" for portrait phone photos. */
    aspect?: string;
    maxHeight?: string;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const ratio = parseAspect(aspect);

    const scrollTo = useCallback((target: number) => {
        const track = trackRef.current;
        if (!track) return;
        track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
    }, []);

    const step = useCallback(
        (delta: number) => {
            scrollTo(Math.min(Math.max(index + delta, 0), images.length - 1));
        },
        [index, images.length, scrollTo],
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

    if (images.length === 0) return null;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                // Height-driven: the ratio picks the width, so the image box
                // hugs the photo exactly and never outgrows the viewport.
                width: `calc(${maxHeight} * ${ratio})`,
                maxWidth: "100%",
            }}
        >
            <div
                ref={trackRef}
                className="no-scrollbar"
                style={{
                    display: "flex",
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    // No gap: slides are exactly one track-width apart, which is
                    // what scrollTo() and the index math both assume.
                }}
            >
                {images.map((image, i) => (
                    <figure
                        key={image.src}
                        style={{
                            flex: "0 0 100%",
                            scrollSnapAlign: "start",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                            margin: 0,
                            minWidth: 0,
                        }}
                    >
                        <img
                            src={image.src}
                            alt={image.alt ?? image.caption ?? `${title} ${i + 1}`}
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                            draggable={false}
                            style={{
                                display: "block",
                                width: "100%",
                                // Fixed box keeps every caption on the same line,
                                // whatever a given photo's true ratio is.
                                aspectRatio: String(ratio),
                                objectFit: "contain",
                            }}
                        />
                        {image.caption && (
                            <figcaption
                                style={{
                                    background: "white",
                                    padding: "0.25rem 0.5rem",
                                }}
                            >
                                {image.caption}
                            </figcaption>
                        )}
                    </figure>
                ))}
            </div>

            {images.length > 1 && (
                <div style={{ display: "flex", gap: "0.25rem" }}>
                    <button
                        type="button"
                        onClick={() => step(-1)}
                        disabled={index === 0}
                        aria-label="Previous image"
                        style={{ ...buttonStyle, opacity: index === 0 ? 0.4 : 1 }}
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={() => step(1)}
                        disabled={index === images.length - 1}
                        aria-label="Next image"
                        style={{
                            ...buttonStyle,
                            opacity: index === images.length - 1 ? 0.4 : 1,
                        }}
                    >
                        ›
                    </button>
                    <span style={{ background: "white", padding: "0.25rem 0.5rem" }}>
                        {index + 1} / {images.length}
                    </span>
                </div>
            )}
        </div>
    );
}
