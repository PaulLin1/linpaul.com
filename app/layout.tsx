import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import "../styles/globals.css";
import Nav from "./components/Nav";
import RandomImages from "./components/RandomImages";

const description =
    "Paul Lin";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL("https://linpaul.com"),
    title: {
        default: "Paul Lin",
        template: "%s",
    },
    description,
    icons: {
        icon: "/about.jpg",
    },
    openGraph: {
        title: "Paul Lin",
        description,
        url: "https://linpaul.com",
        siteName: "Paul Lin",
        images: [{ url: "/about.jpg" }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Paul Lin",
        description,
        images: ["/about.jpg"],
    },
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Nav />
                <RandomImages />
                <main>{children}</main>
            </body>
        </html>
    );
}
