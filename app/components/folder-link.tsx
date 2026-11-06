"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FolderLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const selected = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={selected ? "page" : undefined}
      className={`flex items-center justify-between gap-1 px-1 no-underline outline outline-1 -outline-offset-1 ${
        selected ? "outline-black" : "outline-transparent"
      }`}
    >
      {children}
    </Link>
  );
}
