import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/app/components/navbar";
import ImageContent from "./components/image-content";
import { Panel, Group, Separator } from "react-resizable-panels";

export const metadata: Metadata = {
  title: "Paul Lin",
  description: "Paul Lin's Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
<body className="flex h-dvh flex-row overflow-hidden font-sans pl-10 pr-10">
  <Group
    orientation="horizontal"
    defaultLayout={{ main: 60, images: 40 }}
    className="flex h-full min-h-0 flex-1 gap-0"
  >
          <Panel id="main" minSize={0} className="min-h-0 min-w-0">
            <NavBar />
            <div className="pt-10">{children}</div>
          </Panel>

          <Separator
            className="relative mx-5 shrink-0 cursor-col-resize"
            style={{
              width: "1px",
              backgroundColor: "#d1d5db",
              alignSelf: "stretch",
            }}
          >
            <div
              className="absolute inset-y-0 -left-2 -right-2"
              aria-hidden="true"
            />
          </Separator>

          <Panel id="images" minSize={0} className="min-h-0 min-w-0">
            <ImageContent />
          </Panel>
        </Group>
      </body>
    </html>
  );
}
