import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";

import "./globals.css";
import Collage from "./components/Collage";
import Nav from "./components/Nav";
import SplitHandle from "./components/SplitHandle";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL("https://linpaul.com"),
    title: { default: "Paul Lin", template: "%s" },
    description: "Paul Lin",
    openGraph: {
        title: "Paul Lin",
        description: "Paul Lin",
        url: "https://linpaul.com",
        siteName: "Paul Lin",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Paul Lin",
        description: "Paul Lin",
    },
};

const column = "w-full overflow-hidden px-(--pad) lg:max-w-(--split-width)";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="m-0 flex h-dvh flex-col overflow-hidden bg-white font-sans text-base leading-[1.55] font-light wrap-break-word text-black">
                <Collage />
                <SplitHandle />
                <header className={`${column} flex min-h-14 flex-none items-center justify-between gap-2 bg-white py-2`}>
                    <Link
                        href="/"
                        className="flex-none text-lg leading-tight tracking-[-0.01em] whitespace-nowrap text-black no-underline opacity-(--content-fade)"
                    >
                        Paul Lin
                    </Link>
                    <Nav />
                </header>
                <main className={`${column} flex min-h-0 flex-1 flex-col gap-(--gap) pt-[clamp(1rem,3vh,2.5rem)] pb-[clamp(1rem,4vh,2.5rem)] opacity-(--content-fade)`}>
                    {children}
                </main>
            </body>
        </html>
    );
}
