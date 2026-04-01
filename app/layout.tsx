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
					gap: "1.5rem",
					flexWrap: "wrap",
					}}
				>
					{/* Desktop links */}
					<div
					className="desktop-nav"
					style={{ display: "flex", gap: "1.5rem" }}
					>
					{navLinks.map(({ href, label }) => (
						<Link
						key={href}
						href={href}
						style={{ textDecoration: "none", fontSize: "1.5rem", fontWeight: 500 }}
						>
						{label}
						</Link>
					))}
					</div>

					{/* Hamburger */}
					<button
					className="hamburger"
					onClick={() => setMenuOpen((prev) => !prev)}
					aria-label="Toggle menu"
					style={{
						display: "none",
						background: "none",
						border: "none",
						cursor: "pointer",
						fontSize: "1.75rem",
						lineHeight: 1,
					}}
					>
					{menuOpen ? "✕" : "☰"}
					</button>
				</div>

				{/* Mobile menu */}
				{menuOpen && (
					<div
					className="mobile-menu"
					style={{
						position: "absolute",
						top: "100%",
						right: 0,
						background: "#fff",
						boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
						borderRadius: "8px",
						padding: "0.75rem 0",
						display: "flex",
						flexDirection: "column",
						minWidth: "160px",
						zIndex: 100,
					}}
					>
					{navLinks.map(({ href, label }) => (
						<Link
						key={href}
						href={href}
						onClick={() => setMenuOpen(false)}
						style={{
							textDecoration: "none",
							fontSize: "1.1rem",
							fontWeight: 500,
							padding: "0.6rem 1.25rem",
						}}
						>
						{label}
						</Link>
					))}
					</div>
				)}

				<style>{`
					@media (max-width: 640px) {
					.desktop-nav { display: none !important; }
					.hamburger { display: block !important; }
					}
				`}</style>
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
