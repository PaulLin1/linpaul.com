"use client";

import Link from "next/link";
import "../styles/globals.css";
import { ReactNode, useState } from "react";
import RandomImages from "./components/RandomImages";

type LayoutProps = { children: ReactNode };

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/links", label: "Links" },
  { href: "/about", label: "About" },
];


export default function Layout({ children }: LayoutProps) {
    const [showImages, setShowImages] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);

    return (
        <html lang="en">
            <body style={{ margin: 0 }}>
                {/* Top Bar */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "1rem 2rem",
                        backdropFilter: "blur(4px)",
                    }}
                >
				{/* Navbar */}
				<nav style={{ position: "relative" }}>
				<div
					style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",
					gap: "1rem", // slightly smaller gap for mobile
					}}
				>
					{navLinks.map(({ href, label }) => (
					<Link
						key={href}
						href={href}
						style={{
						textDecoration: "none",
						fontSize: "1.2rem",
						fontWeight: 500,
						padding: "0.25rem 0.5rem",
						}}
					>
						{label}
					</Link>
					))}
				</div>
				</nav>

                    {/* Toggle */}
                    {/* <label
                        style={{
                            width: 50,
                            height: 28,
                            position: "relative",
                            display: "inline-block",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={showImages}
                            onChange={() => setShowImages((v) => !v)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                inset: 0,
                                cursor: "pointer",
                                background: showImages ? "#000" : "#ccc",
                                transition: "0.3s",
                                borderRadius: 999,
                            }}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    bottom: 3,
                                    left: showImages ? 26 : 4,
                                    width: 22,
                                    height: 22,
                                    borderRadius: "50%",
                                    background: "#fff",
                                    transition: "0.3s",
                                }}
                            />
                        </span>
                    </label> */}
                </div>

                {/* Background */}
                {showImages && <RandomImages />}

                {/* Content */}
                <main>{children}</main>
            </body>
        </html>
    );
}
