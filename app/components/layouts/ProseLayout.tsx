import ContentHeader from "../ContentHeader";
import Markdown from "../Markdown";
import Section from "../Section";
import type { LayoutProps } from "./index";

/** Full-width text. The default for blog posts. */
export default function ProseLayout({ entry }: LayoutProps) {
    return (
        <>
            <ContentHeader entry={entry} />
            <Section>
                <Markdown>{entry.content}</Markdown>
            </Section>
        </>
    );
}
