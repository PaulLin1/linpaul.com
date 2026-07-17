import ContentHeader from "../ContentHeader";
import Markdown from "../Markdown";
import Scroll from "../Scroll";
import Section from "../Section";
import type { LayoutProps } from "./index";

/** Text on top, a captioned grid of images below, the pair scrolling together in
 *  one box. The grid reflows from several columns down to one as the window narrows. */
export default function GalleryLayout({ entry }: LayoutProps) {
    return (
        <>
            <ContentHeader entry={entry} />
            <Scroll>
                <Section>
                    <Markdown>{entry.content}</Markdown>
                </Section>

                {entry.images.length > 0 && (
                    <div className="gallery">
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
            </Scroll>
        </>
    );
}
