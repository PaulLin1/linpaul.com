"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The family masthead: a translucent bar over the page-wide random-image
// field (RandomImages, mounted in the layout and sitting behind everything).
// Wordmark left, nav as a row of rounded pills.
const navLinks = [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/experiences", label: "Experiences" },
    { href: "/blog", label: "Blog" },
    { href: "/links", label: "Links" },
    { href: "/about", label: "About" },
];

export default function Nav() {
    const pathname = usePathname();

    return (
        <header className="site-header">
            <Link href="/" className="site-brand">
                Paul Lin
            </Link>
            <nav className="site-nav">
                {navLinks.map(({ href, label }) => {
                    const active = pathname.startsWith(href);

                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={active ? "page" : undefined}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}
