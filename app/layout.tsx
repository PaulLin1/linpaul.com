import type { Metadata } from "next";
import "./globals.css";

import PanelRenderer from "./components/panel-renderer";

export const metadata: Metadata = {
  title: "Paul Lin",
  description: "Paul Lin's Portfolio",
};

export default function RootLayout({ children, right }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex h-dvh flex-row overflow-hidden font-sans pl-10 pr-10">
        <PanelRenderer right={right}>
          {children}
        </PanelRenderer>
      </body>
    </html>
  );
}
