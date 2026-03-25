import React from "react";

const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: "8rem",
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: "90vw",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    width: "100%",
};

export default function CenteredLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <div style={containerStyle}>{children}</div>
        </main>
    );
}
