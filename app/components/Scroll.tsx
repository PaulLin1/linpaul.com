import React from "react";

/**
 * A content box that scrolls on its own. The window never scrolls, so every
 * page puts its overflowing content inside one of these. It takes whatever
 * height the page shell has left over, rather than a fixed fraction of the
 * viewport.
 */
export default function Scroll({ children }: { children: React.ReactNode }) {
    return <div className="scroll">{children}</div>;
}
