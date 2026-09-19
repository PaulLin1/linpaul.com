import ContentHeader from "../ContentHeader";
import Hero from "../Hero";
import ImageCarousel from "../ImageCarousel";
import Markdown from "../Markdown";
import Section from "../Section";
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
                    {/* Always wide: with media, the grid column (split--media's
                        even 1fr) already disciplines the width, so the fixed
                        reading-measure cap on top of that just left blank
                        space beside the text as the page grew while the media
                        column kept filling its own column — text should fill
                        its column exactly like the media does. Without media
                        it's the only column, so wide already applied. */}
                    <Markdown wide>{entry.content}</Markdown>
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
