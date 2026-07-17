"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/music", label: "Music" },
    { href: "/links", label: "Links" },
    { href: "/about", label: "About" },
];

export default function Nav() {
    const pathname = usePathname();

    return (
        <header className="site-header">
            <nav className="site-nav">
                {navLinks.map(({ href, label }) => {
                    const active =
                        href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(href);

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
