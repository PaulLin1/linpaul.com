import ContentHeader from "../ContentHeader";
import Markdown from "../Markdown";
import Scroll from "../Scroll";
import Section from "../Section";
import type { LayoutProps } from "./index";

/** Full-width text in a scrolling box. The default for blog posts. */
export default function ProseLayout({ entry }: LayoutProps) {
    return (
        <>
            <ContentHeader entry={entry} />
            <Scroll>
                <Section>
                    <Markdown>{entry.content}</Markdown>
                </Section>
            </Scroll>
        </>
    );
}
