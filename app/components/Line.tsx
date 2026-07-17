import React from "react";

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

    return (
        <Component
            href={Component === "a" ? href : undefined}
            className={classes}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Line;
