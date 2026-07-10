import Link from "next/link";
import { ReactNode } from "react";
import type { Metadata } from "next";

import "../styles/globals.css";
import RandomImages from "./components/RandomImages";

const description =
    "Paul Lin";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/music", label: "Music" },
    { href: "/links", label: "Links" },
    { href: "/about", label: "About" },
];

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
            <body style={{ margin: 0 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "1rem 2rem",
                        background: "white",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <nav
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "1rem",
                        }}
                    >
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                style={{
                                    textDecoration: "none",
                                    // fontSize: "1.2rem",
                                    // fontWeight: 500,
                                    padding: "0.25rem 0.5rem",
                                    color: "black",
                                }}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <RandomImages />

                <main>{children}</main>
            </body>
        </html>
    );
}
