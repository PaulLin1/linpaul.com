"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const IMAGE_MAX = 117;
/** Numbers with no file on disk — skipped so they never take up a slot. */
const MISSING = new Set([50, 91]);
const POOL = Array.from({ length: IMAGE_MAX }, (_, i) => i + 1).filter(
    (n) => !MISSING.has(n),
);

/* Pacing. One image is swapped per tick, so the collage turns over its full
   set roughly every SLOTS * TICK — about 15s. Lifespan is derived from TICK to
   keep that balance: 15 images expiring over 15 ticks is exactly the one-in-one-out
   rate the swap loop can sustain, so TICK is the only dial worth turning here. */
const COLS = 5;
const ROWS = 3;
const SLOTS = COLS * ROWS;
const TICK = 1000;
const IMAGE_LIFESPAN = SLOTS * TICK;
const FADE = 1.2;
const FADE_MS = FADE * 1000;
/** An image number can't return until its old copy is off screen for good. */
const REUSE_COOLDOWN = FADE_MS + 2000;
/** A gap this much longer than a tick means the tab was hidden, not that time passed. */
const STALL = TICK * 3;

const WIDTHS = [200, 250, 300, 350];
const HEIGHTS = [150, 180, 220, 270];

interface CollageImage {
    src: string;
    width: number;
    height: number;
    key: string;
    n: number;
    /** Which grid cell this image holds. One image per cell, so they spread out. */
    cell: number;
    /** Position as a 0..1 fraction of the free space, so it survives a resize. */
    fx: number;
    fy: number;
    lifespan: number;
    /** Set when the image goes on screen, never when it's built — see `show`. */
    expiresAt: number;
    /** Fading out. It still renders, but has given up its cell. */
    exiting: boolean;
    /** When to drop it from the DOM: once the fade-out has finished. */
    removeAt: number;
}

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/** A point inside `cell`, inset from its edges so neighbours don't stack up. */
function positionIn(cell: number): { fx: number; fy: number } {
    const col = cell % COLS;
    const row = Math.floor(cell / COLS);
    const jitter = () => 0.15 + Math.random() * 0.7;
    return {
        fx: (col + jitter()) / COLS,
        fy: (row + jitter()) / ROWS,
    };
}

function makeImage(n: number, cell: number, lifespan: number): CollageImage {
    return {
        src: `/backgroundImages/${n}.webp`,
        width: pick(WIDTHS),
        height: pick(HEIGHTS),
        key: `${n}-${cell}-${Math.random()}`,
        n,
        cell,
        ...positionIn(cell),
        lifespan,
        expiresAt: Infinity,
        exiting: false,
        removeAt: Infinity,
    };
}

/**
 * Start an image's clock at the moment it goes on screen. Stamping it at build
 * time instead means a slow preload eats into the lifespan, and the image can
 * land already expired — which looks like a flash.
 */
function show(img: CollageImage, now: number): CollageImage {
    return { ...img, expiresAt: now + img.lifespan };
}

/** Resolves once the browser actually has the bitmap, so the fade-in can't pop. */
function preload(src: string): Promise<boolean> {
    return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

export default function CollageBackground() {
    const [images, setImages] = useState<CollageImage[]>([]);
    // The opening set is on screen. Until then the swap loop must stay parked,
    // or it fills the empty collage with images that the opening set then wipes.
    const [seeded, setSeeded] = useState(false);

    // The loop reads and writes the collage across an await, so the live set
    // lives in a ref; state exists only to render it.
    const imagesRef = useRef<CollageImage[]>([]);
    /** image number -> the time it's allowed to be shown again. */
    const cooldownRef = useRef<Map<number, number>>(new Map());
    const lastTickRef = useRef(0);

    const commit = useCallback((next: CollageImage[]) => {
        imagesRef.current = next;
        setImages(next);
    }, []);

    /** An image number that's neither on screen nor still fading out. */
    const freeNumber = useCallback((now: number): number | null => {
        const onScreen = new Set(imagesRef.current.map((img) => img.n));
        const available = POOL.filter((n) => {
            if (onScreen.has(n)) return false;
            const until = cooldownRef.current.get(n);
            if (until === undefined) return true;
            if (until > now) return false;
            cooldownRef.current.delete(n);
            return true;
        });
        return available.length > 0 ? pick(available) : null;
    }, []);

    useEffect(() => {
        let cancelled = false;
        const taken = new Set<number>();
        const initial: CollageImage[] = [];

        for (let cell = 0; cell < SLOTS; cell++) {
            let n = pick(POOL);
            while (taken.has(n)) n = pick(POOL);
            taken.add(n);
            // Stagger the first batch's expiries across one lifespan, otherwise
            // the whole set dies on the same tick and the screen empties at once.
            initial.push(
                makeImage(n, cell, IMAGE_LIFESPAN * (0.3 + cell / SLOTS)),
            );
        }

        // Show the opening set only once it's decoded, so it fades in cleanly
        // instead of 15 images popping in at whatever rate the network delivers.
        Promise.all(initial.map((img) => preload(img.src))).then((loaded) => {
            if (cancelled) return;
            const now = Date.now();
            commit(
                initial.filter((_, i) => loaded[i]).map((img) => show(img, now)),
            );
            lastTickRef.current = now;
            setSeeded(true);
        });

        return () => {
            cancelled = true;
        };
    }, [commit]);

    useEffect(() => {
        if (!seeded) return;
        let cancelled = false;

        const interval = setInterval(async () => {
            const now = Date.now();
            const gap = now - lastTickRef.current;
            lastTickRef.current = now;

            // Background tabs get their timers throttled. Without this, coming
            // back to the tab expires the whole collage at once and it visibly
            // wipes; instead, treat the hidden stretch as time that didn't pass.
            if (gap > STALL) {
                commit(
                    imagesRef.current.map((img) => ({
                        ...img,
                        expiresAt: img.expiresAt + gap,
                        removeAt: img.removeAt + gap,
                    })),
                );
                return;
            }

            const next = imagesRef.current
                // Drop images whose fade-out has finished. Doing this ourselves,
                // rather than leaning on AnimatePresence, is what guarantees the
                // node actually leaves the DOM.
                .filter((img) => img.removeAt > now)
                .map((img) => {
                    if (img.exiting || img.expiresAt > now) return img;
                    // Expired: start the fade-out and give up the cell, so a new
                    // image can crossfade in over it.
                    cooldownRef.current.set(img.n, now + REUSE_COOLDOWN);
                    return { ...img, exiting: true, removeAt: now + FADE_MS };
                });

            const live = next.filter((img) => !img.exiting);
            if (live.length >= SLOTS) {
                commit(next);
                return;
            }

            const usedCells = new Set(live.map((img) => img.cell));
            const freeCells = [...Array(SLOTS).keys()].filter(
                (c) => !usedCells.has(c),
            );
            const n = freeNumber(now);
            if (freeCells.length === 0 || n === null) {
                commit(next);
                return;
            }

            // One image in per tick: replacing every free cell at once reads as
            // a flicker rather than a collage rearranging itself.
            const incoming = makeImage(n, pick(freeCells), IMAGE_LIFESPAN);
            commit(next);

            if (!(await preload(incoming.src)) || cancelled) return;

            // The set may have moved on during the load — only take the cell if
            // it's still free. The clock starts now, not before the load.
            const current = imagesRef.current;
            const conflict = current.some(
                (img) =>
                    img.n === n || (!img.exiting && img.cell === incoming.cell),
            );
            if (conflict) return;
            commit([...current, show(incoming, Date.now())]);
        }, TICK);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, [seeded, commit, freeNumber]);

    if (!seeded) return null;

    return (
        <div
            aria-hidden
            className="collage"
            // Hand the fade duration to CSS so the keyframe fade-in and the
            // fade-out transition stay tied to the same FADE constant the swap
            // loop schedules against.
            style={{ "--collage-fade": `${FADE}s` } as React.CSSProperties}
        >
            {images.map((img) => (
                <img
                    key={img.key}
                    className="collage__img"
                    src={img.src}
                    alt=""
                    decoding="async"
                    // An image fades in from its class on mount and, once
                    // `exiting`, transitions to 0 — the same crossfade as before,
                    // now handled entirely by the stylesheet.
                    style={{
                        // Sized against the viewport so the collage keeps its
                        // proportions on a phone instead of a few tiles covering
                        // the whole screen.
                        width: `min(${img.width}px, 45vw)`,
                        height: `min(${img.height}px, 30vh)`,
                        // Placing by fraction of the free space means the browser
                        // re-solves the position on every resize.
                        left: `calc((100% - min(${img.width}px, 45vw)) * ${img.fx})`,
                        top: `calc((100% - min(${img.height}px, 30vh)) * ${img.fy})`,
                        opacity: img.exiting ? 0 : undefined,
                    }}
                />
            ))}
        </div>
    );
}
