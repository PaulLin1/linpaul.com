import ContentHeader from "../ContentHeader";
import Markdown from "../Markdown";
import Section from "../Section";
import type { LayoutProps } from "./index";

/** Text on top, a captioned grid of images below. */
export default function GalleryLayout({ entry }: LayoutProps) {
    return (
        <>
            <ContentHeader entry={entry} />
            <Section>
                <Markdown>{entry.content}</Markdown>
            </Section>

            {entry.images.length > 0 && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
                        gap: "0.5rem",
                    }}
                >
                    {entry.images.map((image, i) => (
                        <figure
                            key={image.src}
                            style={{
                                margin: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                            }}
                        >
                            <img
                                src={image.src}
                                alt={
                                    image.alt ??
                                    image.caption ??
                                    `${entry.data.title ?? entry.slug} ${i + 1}`
                                }
                                loading="lazy"
                                decoding="async"
                                style={{
                                    width: "100%",
                                    height: "18rem",
                                    objectFit: "contain",
                                }}
                            />
                            {image.caption && (
                                <figcaption
                                    style={{
                                        background: "white",
                                        padding: "0.25rem 0.5rem",
                                    }}
                                >
                                    {image.caption}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            )}
        </>
    );
}
