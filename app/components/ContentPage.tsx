import { notFound } from "next/navigation";

import CenteredLayout from "./MainLayout";
import { resolveLayout } from "./layouts";
import { getEntry } from "@/lib/content";

/** Renders any entry from any collection using the layout its frontmatter asks for. */
export default function ContentPage({
    collection,
    slug,
}: {
    collection: string;
    slug: string;
}) {
    const entry = getEntry(collection, slug);
    if (!entry) notFound();

    const Layout = resolveLayout(entry);

    return (
        <CenteredLayout>
            <Layout entry={entry} />
        </CenteredLayout>
    );
}
