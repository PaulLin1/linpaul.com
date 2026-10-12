"use client";

import { useEffect, useState } from "react";

const MISSING = [50, 91];
const POOL = Array.from({ length: 117 }, (_, i) => i + 1).filter(
    (n) => !MISSING.includes(n),
);
const COLS = 5;
const ROWS = 3;
const SLOTS = COLS * ROWS;
const WIDTHS = [200, 250, 300, 350];
const HEIGHTS = [150, 180, 220, 270];

interface Tile {
    key: number;
    n: number;
    cell: number;
    width: string;
    height: string;
    /** Position as a 0..1 fraction of the free space, so it survives a resize. */
    fx: number;
    fy: number;
    exiting: boolean;
}

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const jitter = () => 0.15 + Math.random() * 0.7;

let nextKey = 0;

/** A new image for `cell`, never one already on screen. */
function makeTile(cell: number, current: Tile[]): Tile {
    const used = current.map((t) => t.n);
    return {
        key: nextKey++,
        n: pick(POOL.filter((n) => !used.includes(n))),
        cell,
        width: `min(${pick(WIDTHS)}px, 45vw)`,
        height: `min(${pick(HEIGHTS)}px, 30vh)`,
        fx: ((cell % COLS) + jitter()) / COLS,
        fy: (Math.floor(cell / COLS) + jitter()) / ROWS,
        exiting: false,
    };
}

/** A grid of background photos beside the content. Each second one cell (in a
 *  shuffled order) crossfades to a new photo. */
export default function Collage() {
    const [tiles, setTiles] = useState<Tile[]>([]);

    useEffect(() => {
        const order = [...Array(SLOTS).keys()].sort(() => Math.random() - 0.5);
        setTiles(order.reduce<Tile[]>((acc, cell) => [...acc, makeTile(cell, acc)], []));

        let tick = 0;
        const id = setInterval(() => {
            const cell = order[tick++ % SLOTS];
            setTiles((current) => {
                // Last tick's outgoing tile has finished fading; drop it.
                const kept = current
                    .filter((t) => !t.exiting)
                    .map((t) => (t.cell === cell ? { ...t, exiting: true } : t));
                return [...kept, makeTile(cell, kept)];
            });
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-y-0 right-0 left-(--split-width) -z-10 hidden overflow-hidden opacity-(--image-fade) lg:block"
        >
            {tiles.map((t) => (
                <img
                    key={t.key}
                    src={`/backgroundImages/${t.n}.webp`}
                    alt=""
                    decoding="async"
                    // Fade in only once loaded, so slow images don't pop.
                    onLoad={(e) => (e.currentTarget.dataset.loaded = "")}
                    className={`absolute object-cover opacity-0 transition-opacity duration-1000 data-loaded:opacity-80 ${t.exiting ? "opacity-0!" : ""}`}
                    style={{
                        width: t.width,
                        height: t.height,
                        left: `calc((100% - ${t.width}) * ${t.fx})`,
                        top: `calc((100% - ${t.height}) * ${t.fy})`,
                    }}
                />
            ))}
        </div>
    );
}
