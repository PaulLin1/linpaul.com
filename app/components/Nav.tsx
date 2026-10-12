"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/experiences", label: "Experiences" },
    { href: "/blog", label: "Blog" },
    { href: "/links", label: "Links" },
    { href: "/about", label: "About" },
];

export default function Nav() {
    const pathname = usePathname();

    return (
        <nav className="flex min-w-0 gap-1.5 overflow-x-auto opacity-(--content-fade)">
            {links.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    aria-current={pathname.startsWith(href) ? "page" : undefined}
                    className="whitespace-nowrap px-1.5 py-0.5 text-sm text-black no-underline hover:underline aria-[current=page]:text-link aria-[current=page]:underline"
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}
