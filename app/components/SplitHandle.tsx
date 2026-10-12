"use client";

import { useRef } from "react";

/** The draggable line between content and the collage. Eases --split toward
 *  the pointer each frame so the drag feels smooth. */
export default function SplitHandle() {
    const target = useRef(60);
    const current = useRef(60);
    const frame = useRef(0);

    const animate = () => {
        current.current += (target.current - current.current) * 0.25;
        if (Math.abs(target.current - current.current) < 0.05) {
            current.current = target.current;
        }
        document.documentElement.style.setProperty("--split", String(current.current));
        frame.current =
            current.current === target.current ? 0 : requestAnimationFrame(animate);
    };

    const follow = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
        target.current = Math.min(100, Math.max(0, (e.clientX / window.innerWidth) * 100));
        if (!frame.current) frame.current = requestAnimationFrame(animate);
    };

    return (
        <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize content and image split"
            onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                document.body.style.userSelect = "none";
                follow(e);
            }}
            onPointerMove={follow}
            onLostPointerCapture={() => (document.body.style.userSelect = "")}
            className="fixed inset-y-0 left-[clamp(10px,var(--split-width),calc(100%_-_10px))] z-10 hidden w-3 -translate-x-1/2 cursor-col-resize touch-none lg:block after:absolute after:inset-y-0 after:left-1/2 after:w-px after:-translate-x-1/2 after:bg-rule"
        />
    );
}
