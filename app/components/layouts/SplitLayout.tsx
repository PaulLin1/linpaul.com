import ContentHeader from "../ContentHeader";
import Markdown from "../Markdown";
import Section from "../Section";
import type { LayoutProps } from "./index";

/** Text left, a stack of images in a rail to the right. The default for portfolio
 *  entries. The rail drops below the text once the window is too narrow for two
 *  columns. */
export default function SplitLayout({ entry }: LayoutProps) {
    return (
        <>
            <ContentHeader entry={entry} />
            <div className="split split--rail">
                <Section>
                    <Markdown>{entry.content}</Markdown>
                </Section>

                {entry.images.length > 0 && (
                    <div className="stack">
                        {entry.images.map((image, i) => (
                            <img
                                key={image.src}
                                src={image.src}
                                alt={
                                    image.alt ??
                                    `${entry.data.title ?? entry.slug} ${i + 1}`
                                }
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
