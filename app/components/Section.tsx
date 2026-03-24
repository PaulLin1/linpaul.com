import React from "react";

const sectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

export default function Section({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={sectionStyle}>{children}</div>;
}