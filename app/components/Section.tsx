import React from "react";

export default function Section({ children }: { children: React.ReactNode }) {
    return <div className="section">{children}</div>;
}
