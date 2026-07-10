import ContentHeader from "../ContentHeader";
import ImageCarousel from "../ImageCarousel";
import Markdown from "../Markdown";
import Section from "../Section";
import type { LayoutProps } from "./index";

/** Text left, a captioned carousel you scroll left and right on the right. */
export default function CaseStudyLayout({ entry }: LayoutProps) {
    return (
        <>
            <ContentHeader entry={entry} />
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Section>
                        <Markdown>{entry.content}</Markdown>
                    </Section>
                </div>

                {entry.images.length > 0 && (
                    <div style={{ flex: "0 0 auto", maxWidth: "50%" }}>
                        <ImageCarousel
                            images={entry.images}
                            title={entry.data.title ?? entry.slug}
                            aspect={entry.data.aspect}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
