"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React, { ReactNode, ReactElement } from "react";

interface MDXRendererProps {
    source: MDXRemoteSerializeResult;
}

// Paragraph props type
interface ParagraphProps {
    children: ReactNode;
}

// Custom paragraph component that splits content into highlighted lines
const Paragraph = ({ children }: ParagraphProps): ReactElement => {
    if (typeof children === "string") {
        const lines = children
            .split(/(?<=\.)\s+|(?<=!)\s+|(?<=\?)\s+|\n/) // Split sentences or newlines
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    margin: "0 0 1rem 0",
                }}
            >
                {lines.map((line, idx) => (
                    <span
                        key={idx}
                        style={{
                            backgroundColor: "white",
                            display: "inline",
                            padding: "0 0.25rem",
                            fontSize: "1.25rem",
                        }}
                    >
                        {line}
                    </span>
                ))}
            </div>
        );
    }

    // If children are React elements (e.g., <a>, <strong>, etc.)
    return <div style={{ margin: "0 0 1rem 0" }}>{children}</div>;
};

export default function MDXRenderer({
    source,
}: MDXRendererProps): ReactElement {
    return <MDXRemote {...source} components={{ p: Paragraph }} />;
}
