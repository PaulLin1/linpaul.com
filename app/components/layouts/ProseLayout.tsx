import ContentHeader from "../ContentHeader";
import Markdown from "../Markdown";
import Scroll from "../Scroll";
import Section from "../Section";
import { entryHasImages } from "@/lib/content";
import type { LayoutProps } from "./index";

/** Full-width text in a scrolling box. The default for blog posts. Text runs the
 *  whole width when the post has no images, and drops to a reading measure once
 *  images appear alongside it. */
export default function ProseLayout({ entry }: LayoutProps) {
    return (
        <>
            <ContentHeader entry={entry} />
            <Scroll>
                <Section>
                    <Markdown wide={!entryHasImages(entry)}>
                        {entry.content}
                    </Markdown>
                </Section>
            </Scroll>
        </>
    );
}
