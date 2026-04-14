import React from "react";

export type LineProps<T extends React.ElementType> = {
    as?: T;
    children: React.ReactNode;
    href?: string;
} & React.ComponentPropsWithoutRef<T>;

const Line = <T extends React.ElementType = "span">({
    as,
    children,
    href,
    style: styleProp,
    ...props
}: LineProps<T> & { style?: React.CSSProperties }) => {
    const Component = as || "span";

    const style: React.CSSProperties = {
        padding: "0.25rem 0.5rem",
        margin: 0,
        backgroundColor: "white",
        display: "inline-block",
        color: "inherit",
        textDecoration: "none",
        ...styleProp,
    };

    return (
        <Component
            href={Component === "a" ? href : undefined}
            style={style}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Line;