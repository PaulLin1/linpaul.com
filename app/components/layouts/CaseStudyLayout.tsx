import ContentHeader from "../ContentHeader";
import Hero from "../Hero";
import ImageCarousel from "../ImageCarousel";
import Markdown from "../Markdown";
import Section from "../Section";
import { entryHasImages } from "@/lib/content";
import type { LayoutProps } from "./index";

/** Text down the left, media down the right: an optional hero (a GIF demo, say)
 *  stacked above a captioned carousel you scroll left and right. The media column
 *  drops below the text once the window is too narrow for two columns. */
export default function CaseStudyLayout({ entry }: LayoutProps) {
    const hasImages = entry.images.length > 0;
    const hasHero = entry.hero !== null;
    const hasMedia = hasImages || hasHero;
    const title = entry.data.title ?? entry.slug;

    const splitClass = [
        "split",
        hasMedia && "split--media",
        hasHero && "split--hero",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <ContentHeader entry={entry} />
            <div className={splitClass}>
                <Section>
                    <Markdown wide={!entryHasImages(entry)}>
                        {entry.content}
                    </Markdown>
                </Section>

                {hasMedia && (
                    <div
                        className={`media-col${
                            hasHero ? " media-col--stacked" : ""
                        }`}
                    >
                        <Hero image={entry.hero} title={title} />
                        {hasImages && (
                            <ImageCarousel
                                images={entry.images}
                                title={title}
                                aspect={entry.data.aspect}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
