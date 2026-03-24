import React from "react";

export type LineProps = {
    text: string;
    asHeading?: boolean;
    asLink?: boolean;
    href?: string;
};

const Line: React.FC<LineProps> = ({
    text,
    asHeading = false,
    asLink = false,
    href,
}) => {
    const style = {
        padding: asHeading ? "0.5rem 1rem" : "0.25rem 0.5rem",
        fontSize: asHeading ? "3rem" : undefined,
        fontWeight: asHeading ? 900 : undefined,
        margin: 0,
        backgroundColor: "white",
        cursor: asLink ? "pointer" : "default",
        textDecoration: "none",
        color: "inherit",
        display: "inline-block",
    };

    if (asLink && href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={style}
            >
                {text}
            </a>
        );
    }

    const Element = asHeading ? "h1" : "span";
    return <Element style={style}>{text}</Element>;
};

export default Line;
