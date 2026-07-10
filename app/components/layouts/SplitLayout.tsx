import ContentHeader from "../ContentHeader";
import Markdown from "../Markdown";
import Section from "../Section";
import type { LayoutProps } from "./index";

/** Text left, a static stack of images right. The default for portfolio entries. */
export default function SplitLayout({ entry }: LayoutProps) {
    return (
        <>
            <ContentHeader entry={entry} />
            <div style={{ display: "flex", gap: "1rem", alignItems: "stretch" }}>
                <Section>
                    <Markdown>{entry.content}</Markdown>
                </Section>

                {entry.images.length > 0 && (
                    <div
                        style={{
                            flex: "0 0 33.33%",
                            height: "60vh",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                            overflow: "hidden",
                        }}
                    >
                        {entry.images.map((image, i) => (
                            <div
                                key={image.src}
                                style={{ flex: 1, overflow: "hidden", minHeight: 0 }}
                            >
                                <img
                                    src={image.src}
                                    alt={
                                        image.alt ??
                                        `${entry.data.title ?? entry.slug} ${i + 1}`
                                    }
                                    loading="lazy"
                                    decoding="async"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
