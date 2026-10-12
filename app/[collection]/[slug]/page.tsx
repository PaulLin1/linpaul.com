import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Media from "../../components/Media";
import { COLLECTIONS, displayYear, getEntry, listSlugs } from "@/lib/content";
import { markdown, meta, title } from "@/lib/styles";

interface Props {
    params: Promise<{ collection: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
    return COLLECTIONS.flatMap((collection) =>
        listSlugs(collection).map((slug) => ({ collection, slug })),
    );
}

export async function generateMetadata({ params }: Props) {
    const { collection, slug } = await params;
    const entry = getEntry(collection, slug);
    return entry ? { title: `${entry.data.title ?? slug} — Paul Lin` } : {};
}

/** Text on the left; hero and carousel on the right when the entry has images.
 *  On wide screens each column scrolls on its own; narrow, they stack. */
export default async function EntryPage({ params }: Props) {
    const { collection, slug } = await params;
    const entry = getEntry(collection, slug);
    if (!entry) notFound();

    const { data, hero, images, content } = entry;
    const info = [[...(data.tags ?? [])].sort().join(", "), displayYear(data.date)]
        .filter(Boolean)
        .join(" | ");
    const columns = hero
        ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
        : images.length > 0
          ? "lg:grid-cols-2"
          : "";

    return (
        <>
            <h1 className={title}>{data.title ?? slug}</h1>
            {(info || data.github) && (
                <p className={`m-0 py-1 ${meta}`}>
                    {info}
                    {data.github && (
                        <>
                            {info && " | "}
                            <a href={data.github} target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </>
                    )}
                </p>
            )}
            <div className={`grid min-h-0 flex-1 grid-cols-1 gap-(--gap) overflow-y-auto overscroll-contain lg:overflow-hidden ${columns}`}>
                <div className={`${markdown} lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.trim()}</ReactMarkdown>
                </div>
                {(hero || images.length > 0) && (
                    <Media hero={hero} images={images} title={data.title ?? slug} aspect={data.aspect} />
                )}
            </div>
        </>
    );
}
