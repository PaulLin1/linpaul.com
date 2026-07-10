import Line from "./Line";
import type { Entry } from "@/lib/content";

export default function ContentHeader({ entry }: { entry: Entry }) {
    const { title, date, github } = entry.data;

    return (
        <>
            <Line as="h1">{title ?? entry.slug}</Line>
            {(date || github) && (
                <Line>
                    {date}
                    {github && (
                        <>
                            {date && " | "}
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
