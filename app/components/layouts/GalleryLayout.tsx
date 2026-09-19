import ContentHeader from "../ContentHeader";
import Markdown from "../Markdown";
import Section from "../Section";
import type { LayoutProps } from "./index";

/** Text on the left, a captioned grid of images to the right, each column
 *  scrolling on its own. The grid drops below the text once the window is too
 *  narrow for two columns. */
export default function GalleryLayout({ entry }: LayoutProps) {
    const hasImages = entry.images.length > 0;

    return (
        <>
            <ContentHeader entry={entry} />
            <div className={`split${hasImages ? " split--gallery" : ""}`}>
                <Section>
                    {/* Always wide: with images, the grid column (split--gallery's
                        even 1fr) already disciplines the width, so the fixed
                        reading-measure cap on top of that just left blank
                        space beside the text as the page grew while the
                        gallery kept filling its own column — text should fill
                        its column exactly like the gallery does. Without
                        images it's the only column, so wide already applied. */}
                    <Markdown wide>{entry.content}</Markdown>
                </Section>

                {hasImages && (
                    <div
                        className="gallery"
                        style={
                            entry.data.columns
                                ? {
                                      gridTemplateColumns: `repeat(${entry.data.columns}, 1fr)`,
                                  }
                                : undefined
                        }
                    >
                        {entry.images.map((image, i) => (
                            <figure key={image.src} className="figure">
                                <img
                                    src={image.src}
                                    alt={
                                        image.alt ??
                                        image.caption ??
                                        `${entry.data.title ?? entry.slug} ${i + 1}`
                                    }
                                    loading="lazy"
                                    decoding="async"
                                />
                                {image.caption && (
                                    <figcaption>{image.caption}</figcaption>
                                )}
                            </figure>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
