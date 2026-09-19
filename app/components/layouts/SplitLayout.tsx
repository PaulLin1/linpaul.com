import ContentHeader from "../ContentHeader";
import Markdown from "../Markdown";
import Section from "../Section";
import type { LayoutProps } from "./index";

/** Text left, a stack of images in a rail to the right. The default for portfolio
 *  entries. The rail drops below the text once the window is too narrow for two
 *  columns. */
export default function SplitLayout({ entry }: LayoutProps) {
    const hasImages = entry.images.length > 0;
    const title = entry.data.title ?? entry.slug;

    return (
        <>
            <ContentHeader entry={entry} />
            <div className={`split${hasImages ? " split--rail" : ""}`}>
                <Section>
                    {/* Always wide: with images, the grid column (split--rail's
                        2fr) already disciplines the width, so the fixed
                        reading-measure cap on top of that just left blank
                        space beside the text as the page grew while the image
                        rail kept filling its own column — text should fill
                        its column exactly like the rail does. Without images
                        it's the only column, so wide already applied. */}
                    <Markdown wide>{entry.content}</Markdown>
                </Section>

                {hasImages && (
                    <div className="stack">
                        {entry.images.map((image, i) => (
                            <img
                                key={image.src}
                                src={image.src}
                                alt={image.alt ?? `${title} ${i + 1}`}
                                loading="lazy"
                                decoding="async"
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
