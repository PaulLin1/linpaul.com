import Line from "./Line";
import CenteredLayout from "./MainLayout";
import Section from "./Section";
import { getCollection } from "@/lib/content";

/** Index page for a collection: one line per entry, newest first. */
export default function CollectionList({
    collection,
    heading,
    highlightTag,
}: {
    collection: string;
    heading: string;
    /** Entries carrying this tag get a yellow row. */
    highlightTag?: string;
}) {
    const entries = getCollection(collection);

    return (
        <CenteredLayout>
            <Line as="h1">{heading}</Line>
            <Section>
                {entries.map(({ slug, href, data }) => {
                    const tags = data.tags ?? [];

                    return (
                        <Line
                            key={slug}
                            as="a"
                            href={href}
                            style={
                                highlightTag && tags.includes(highlightTag)
                                    ? { backgroundColor: "yellow" }
                                    : undefined
                            }
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                <span>{data.title ?? slug}</span>
                                <span>
                                    {tags.length > 0 ? tags.join(", ") : "No tags"}{" "}
                                    | {data.date ?? "Unknown"}
                                </span>
                            </div>
                        </Line>
                    );
                })}
            </Section>
        </CenteredLayout>
    );
}
