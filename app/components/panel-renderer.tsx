"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Panel, Group, Separator, useGroupRef } from "react-resizable-panels";
import NavBar from "@/app/components/navbar";

const WRITEUP = /^\/(blog|portfolio|experiences)\/[^/]+/;
export default function PanelLayout({
  children,
  right,
}: {
  children: React.ReactNode;
  right: React.ReactNode;
}) {
  const groupRef = useGroupRef();
  const pathname = usePathname();

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!dragging) return;
    const stop = () => setDragging(false);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging]);

  function slideTo(main: number) {
    groupRef.current?.setLayout({ main, images: 100 - main });
  }

  function handleClick(e: React.MouseEvent) {
    const link = (e.target as HTMLElement).closest("a");
    const href = link?.getAttribute("href");
    if (href && WRITEUP.test(href)) slideTo(0);
  }

  const isWriteup = WRITEUP.test(pathname);
  useEffect(() => {
    if (!isWriteup) slideTo(50);
  }, [isWriteup]);

  return (
    <Group
      groupRef={groupRef}
      onClickCapture={handleClick}
      orientation="horizontal"
      defaultLayout={{ main: 50, images: 50 }}
      className={`flex h-full min-h-0 flex-1 gap-0 ${
        dragging
          ? ""
          : "[&>[data-panel]]:transition-[flex-grow] [&>[data-panel]]:duration-1000 [&>[data-panel]]:ease-in-out"
      }`}
    >
      <Panel
        id="main"
        minSize={0}
        className="flex min-h-0 min-w-0 flex-col"
        style={{ overflow: "hidden" }}
      >
        <NavBar />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-10">
          {children}
        </div>
      </Panel>

      <Separator
        onPointerDown={() => setDragging(true)}
        className="relative mx-5 shrink-0 cursor-col-resize"
        style={{
          width: "1px",
          backgroundColor: "#d1d5db",
          alignSelf: "stretch",
        }}
      >
        <div
          className="absolute inset-y-0 -left-2 -right-2"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 flex h-8 w-3 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[3px] rounded-full border border-gray-300 bg-white"
          aria-hidden="true"
        >
          <span className="h-[3px] w-[3px] rounded-full bg-gray-400" />
          <span className="h-[3px] w-[3px] rounded-full bg-gray-400" />
          <span className="h-[3px] w-[3px] rounded-full bg-gray-400" />
        </div>
      </Separator>

      <Panel
        id="images"
        minSize={0}
        className="flex min-h-0 min-w-0 flex-col"
        style={{ overflow: "hidden" }}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-10">
          {right}
        </div>
      </Panel>
    </Group>
  );
}
