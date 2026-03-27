"use client";

import Link from "next/link";
import "../styles/globals.css";
import { ReactNode, useState } from "react";
import RandomImages from "./components/RandomImages";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  const [showImages, setShowImages] = useState(true);

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
          <nav style={{ display: "flex", gap: "1.5rem" }}>
            {["/", "/portfolio", "/links", "/about"].map((href, i) => {
              const labels = ["Home", "Portfolio", "Links", "About"];
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    textDecoration: "none",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                  }}
                >
                  {labels[i]}
                </Link>
              );
            })}
          </nav>

          {/* Toggle */}
          <label
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
          </label>
        </div>

        {/* Background */}
        {showImages && <RandomImages />}

        {/* Content */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}