import type { ImageRef } from "@/lib/content";

/** A single image — usually a GIF demo — that sits at the top of the case-study
 *  media column, above the carousel. Driven by `hero:` in an entry's
 *  frontmatter; renders nothing when the entry has no hero. */
export default function Hero({
    image,
    title,
}: {
    image: ImageRef | null;
    title: string;
}) {
    if (!image) return null;

    return (
        <figure className="hero">
            <img
                src={image.src}
                alt={image.alt ?? `${title} — demo`}
                loading="eager"
                decoding="async"
            />
            {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
    );
}
