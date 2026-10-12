"use client";

import { useRef, useState } from "react";
import type { ImageRef } from "@/lib/content";

const caption = "bg-white px-2.5 py-1 text-sm text-soft";

/** The media column of an entry: an optional hero image above a carousel.
 *  Without a hero, the carousel fills the column's height on wide screens. */
export default function Media({
    hero,
    images,
    title,
    aspect = "3/4",
}: {
    hero: ImageRef | null;
    images: ImageRef[];
    title: string;
    aspect?: string;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    // Updated immediately on click, so rapid clicks step from where the
    // carousel is headed rather than where it last settled.
    const indexRef = useRef(0);
    const fill = !hero;

    const goTo = (i: number) => {
        indexRef.current = i;
        setIndex(i);
    };

    const step = (delta: number) => {
        const track = trackRef.current!;
        const target = Math.min(Math.max(indexRef.current + delta, 0), images.length - 1);
        goTo(target);
        const slide = track.children[target] as HTMLElement;
        track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    };

    return (
        <div
            className={`flex min-w-0 flex-col gap-2 ${fill ? "lg:overflow-hidden" : "lg:max-h-full lg:self-start lg:overflow-y-auto"}`}
        >
            {hero && (
                <figure className="m-0 flex min-w-0 flex-col gap-1">
                    <img
                        src={hero.src}
                        alt={hero.alt ?? `${title} — demo`}
                        className="block h-auto w-full"
                    />
                    {hero.caption && <figcaption className={caption}>{hero.caption}</figcaption>}
                </figure>
            )}

            {images.length > 0 && (
                <div className={`flex min-w-0 flex-col gap-1 ${fill ? "lg:h-full lg:min-h-0" : ""}`}>
                    <div
                        ref={trackRef}
                        onScroll={(e) => {
                            const t = e.currentTarget;
                            goTo(Math.round(t.scrollLeft / t.clientWidth));
                        }}
                        className={`relative flex min-h-0 snap-x snap-mandatory overflow-x-auto overscroll-x-contain ${fill ? "lg:flex-1" : ""}`}
                    >
                        {images.map((image, i) => (
                            <figure
                                key={image.src}
                                className="m-0 flex min-w-0 flex-[0_0_100%] snap-start snap-always flex-col gap-1"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt ?? image.caption ?? `${title} ${i + 1}`}
                                    loading={i === 0 ? "eager" : "lazy"}
                                    draggable={false}
                                    style={fill ? { aspectRatio: aspect } : undefined}
                                    className={`block w-full object-contain ${fill ? "lg:min-h-0 lg:w-auto lg:max-w-full lg:flex-1 lg:self-center" : ""}`}
                                />
                                {image.caption && (
                                    <figcaption className={caption}>{image.caption}</figcaption>
                                )}
                            </figure>
                        ))}
                    </div>

                    {images.length > 1 && (
                        <div className="flex flex-none items-center gap-1">
                            {[-1, 1].map((delta) => (
                                <button
                                    key={delta}
                                    type="button"
                                    onClick={() => step(delta)}
                                    disabled={index === (delta < 0 ? 0 : images.length - 1)}
                                    aria-label={delta < 0 ? "Previous image" : "Next image"}
                                    className="cursor-pointer border-none bg-white px-3 py-1 font-[inherit] text-black disabled:cursor-default disabled:opacity-40"
                                >
                                    {delta < 0 ? "‹" : "›"}
                                </button>
                            ))}
                            <span className={`ms-auto ${caption}`}>
                                {index + 1} / {images.length}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
