import ContentHeader from "../ContentHeader";
import ImageCarousel from "../ImageCarousel";
import Markdown from "../Markdown";
import Section from "../Section";
import type { LayoutProps } from "./index";

/** Text left, a captioned carousel you scroll left and right on the right. The
 *  carousel drops below the text once the window is too narrow for two columns. */
export default function CaseStudyLayout({ entry }: LayoutProps) {
    return (
        <>
            <ContentHeader entry={entry} />
            <div className="split split--media">
                <Section>
                    <Markdown>{entry.content}</Markdown>
                </Section>

                {entry.images.length > 0 && (
                    <ImageCarousel
                        images={entry.images}
                        title={entry.data.title ?? entry.slug}
                        aspect={entry.data.aspect}
                    />
                )}
            </div>
        </>
    );
}
