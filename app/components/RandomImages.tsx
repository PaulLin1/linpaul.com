"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE_MAX = 117;
const SLOTS = 15;
const IMAGE_LIFESPAN = 4000;
const TICK = 500;
const WIDTHS = [200, 250, 300, 350];
const HEIGHTS = [150, 180, 220, 270];

interface CollageImage {
    src: string;
    width: number;
    height: number;
    key: string;
    n: number;
    top: number;
    left: number;
    expiresAt: number;
}

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function makeImage(n: number, now: number): CollageImage {
    const width = pick(WIDTHS);
    const height = pick(HEIGHTS);
    return {
        src: `/backgroundImages/${n}.webp`,
        width,
        height,
        key: `${n}-${now}`,
        n,
        top: Math.random() * (window.innerHeight - height),
        left: Math.random() * (window.innerWidth - width),
        expiresAt: now + IMAGE_LIFESPAN,
    };
}

export default function CollageBackground() {
    const [images, setImages] = useState<CollageImage[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const now = Date.now();
        const taken = new Set<number>();
        const initial: CollageImage[] = [];
        while (initial.length < SLOTS) {
            const n = Math.floor(Math.random() * IMAGE_MAX) + 1;
            if (taken.has(n)) continue;
            taken.add(n);
            initial.push(makeImage(n, now + initial.length));
        }
        setImages(initial);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const interval = setInterval(() => {
            setImages((prev) => {
                const now = Date.now();
                const active = prev.filter((img) => img.expiresAt > now);
                if (active.length >= SLOTS) return active;

                const taken = new Set(active.map((img) => img.n));
                const available: number[] = [];
                for (let i = 1; i <= IMAGE_MAX; i++) {
                    if (!taken.has(i)) available.push(i);
                }
                if (available.length === 0) return active;

                const n = available[Math.floor(Math.random() * available.length)];
                return [...active, makeImage(n, now)];
            });
        }, TICK);
        return () => clearInterval(interval);
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                overflow: "hidden",
                zIndex: -1,
                pointerEvents: "none",
            }}
        >
            <AnimatePresence>
                {images.map((img) => (
                    <motion.img
                        key={img.key}
                        src={img.src}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            top: img.top,
                            left: img.left,
                            objectFit: "cover",
                        }}
                        onError={(e) => {
                            e.currentTarget.style.visibility = "hidden";
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
