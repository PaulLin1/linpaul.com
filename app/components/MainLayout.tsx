import React from "react";

/**
 * The page shell. Stays in normal document flow so long pages simply scroll —
 * width and gutters come from the fluid tokens in globals.css.
 */
export default function CenteredLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="page">{children}</div>;
}
