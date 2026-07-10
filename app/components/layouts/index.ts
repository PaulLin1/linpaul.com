import type { ComponentType } from "react";
import type { Entry } from "@/lib/content";

import CaseStudyLayout from "./CaseStudyLayout";
import GalleryLayout from "./GalleryLayout";
import ProseLayout from "./ProseLayout";
import SplitLayout from "./SplitLayout";

export interface LayoutProps {
    entry: Entry;
}

/** Add a layout here and any entry can opt in with `layout: <key>` in its frontmatter. */
const LAYOUTS: Record<string, ComponentType<LayoutProps>> = {
    prose: ProseLayout,
    split: SplitLayout,
    "case-study": CaseStudyLayout,
    gallery: GalleryLayout,
};

const DEFAULT_LAYOUTS: Record<string, string> = {
    blog: "prose",
    portfolio: "split",
};

export function resolveLayout(entry: Entry): ComponentType<LayoutProps> {
    const requested = entry.data.layout;
    if (requested && LAYOUTS[requested]) return LAYOUTS[requested];

    return LAYOUTS[DEFAULT_LAYOUTS[entry.collection] ?? "prose"] ?? ProseLayout;
}
