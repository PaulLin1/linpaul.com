"use client";

import { useCallback, useEffect, useRef } from "react";

// Fraction of the remaining distance to the pointer's target that --split
// closes each frame. This trailing ease is what makes the drag read as
// smooth rather than jumpy — there's no separate "collapse" step or
// threshold: the target IS the raw pointer position the whole way, so
// closing a side is just this same ease continuing down to 0 (or up to
// 100), no jump anywhere in the range.
const FOLLOW = 0.25;
const SETTLE_EPSILON = 0.05;
const DEFAULT_SPLIT = 60;

export default function SplitHandle() {
    const draggingRef = useRef(false);
    const targetRef = useRef(DEFAULT_SPLIT);
    const currentRef = useRef(DEFAULT_SPLIT);
    const rafRef = useRef<number | null>(null);

    const tick = useCallback(() => {
        const target = targetRef.current;
        let next = currentRef.current + (target - currentRef.current) * FOLLOW;
        if (Math.abs(target - next) < SETTLE_EPSILON) next = target;
        currentRef.current = next;

        const root = document.documentElement;
        root.style.setProperty("--split", String(next));
        // Once the ease has actually arrived at a true edge, guarantee that
        // side is fully gone (not just shrunk to zero width) rather than
        // leaning on the box model alone.
        if (next === 0) root.dataset.collapsed = "content";
        else if (next === 100) root.dataset.collapsed = "images";
        else delete root.dataset.collapsed;

        rafRef.current = next === target ? null : requestAnimationFrame(tick);
    }, []);

    const setTarget = useCallback(
        (clientX: number) => {
            targetRef.current = Math.max(
                0,
                Math.min(100, (clientX / window.innerWidth) * 100),
            );
            if (rafRef.current === null) {
                rafRef.current = requestAnimationFrame(tick);
            }
        },
        [tick],
    );

    const onPointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            draggingRef.current = true;
            document.body.style.userSelect = "none";
            setTarget(e.clientX);
        },
        [setTarget],
    );

    const onPointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!draggingRef.current) return;
            setTarget(e.clientX);
        },
        [setTarget],
    );

    const stopDragging = useCallback(() => {
        draggingRef.current = false;
        document.body.style.userSelect = "";
    }, []);

    // Cancel any in-flight easing if the component ever unmounts mid-drag.
    useEffect(() => {
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            className="split-handle"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize content and image split"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
        />
    );
}
