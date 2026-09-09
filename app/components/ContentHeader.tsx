import Line from "./Line";
import type { Entry } from "@/lib/content";

export default function ContentHeader({ entry }: { entry: Entry }) {
    const { title, date, github, tags } = entry.data;
    const sortedTags = [...(tags ?? [])].sort((a, b) => a.localeCompare(b));
    const meta = [sortedTags.length > 0 ? sortedTags.join(", ") : null, date]
        .filter(Boolean)
        .join(" | ");

    return (
        <>
            <Line as="h1">{title ?? entry.slug}</Line>
            {(meta || github) && (
                <Line className="row__meta">
                    {meta}
                    {github && (
                        <>
                            {meta && " | "}
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </>
                    )}
                </Line>
            )}
        </>
    );
}
