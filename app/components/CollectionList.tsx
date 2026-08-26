import Line from "./Line";
import CenteredLayout from "./MainLayout";
import Scroll from "./Scroll";
import Section from "./Section";
import { getCollection } from "@/lib/content";

/** Index page for a collection: one line per entry, newest first. */
export default function CollectionList({
    collection,
    heading,
}: {
    collection: string;
    heading: string;
}) {
    const entries = getCollection(collection);

    return (
        <CenteredLayout>
            <Line as="h1">{heading}</Line>
            <Scroll>
                <Section>
                    {entries.map(({ slug, href, data }) => {
                        const tags = [...(data.tags ?? [])].sort((a, b) =>
                            a.localeCompare(b)
                        );

                        return (
                            <Line key={slug} as="a" href={href} block>
                                <span className="row">
                                    <span>{data.title ?? slug}</span>
                                    <span className="row__meta">
                                        {tags.length > 0
                                            ? tags.join(", ")
                                            : "No tags"}{" "}
                                        | {data.date ?? "Unknown"}
                                    </span>
                                </span>
                            </Line>
                        );
                    })}
                </Section>
            </Scroll>
        </CenteredLayout>
    );
}
