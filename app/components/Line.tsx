import React from "react";
import NextLink from "next/link";

export type LineProps<T extends React.ElementType> = {
    as?: T;
    children: React.ReactNode;
    href?: string;
    /** Stretch to the full column width so stacked rows share an edge. */
    block?: boolean;
} & React.ComponentPropsWithoutRef<T>;

/** A line of text on the site's white chip. */
const Line = <T extends React.ElementType = "span">({
    as,
    children,
    href,
    block,
    className,
    ...props
}: LineProps<T> & { className?: string }) => {
    const Component = as || "span";

    const classes = ["tile", block && "tile--block", className]
        .filter(Boolean)
        .join(" ");

    // "a" goes through next/link so internal links navigate client-side
    // (no full page reload, no collage/scroll reset) instead of as a plain
    // anchor tag.
    if (Component === "a" && href) {
        return (
            <NextLink href={href} className={classes} {...props}>
                {children}
            </NextLink>
        );
    }

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
};

export default Line;
