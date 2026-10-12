import Link from "next/link";

import { COLLECTIONS, displayYear, getCollection } from "@/lib/content";
import { meta, row, scroll, title } from "@/lib/styles";

interface Props {
    params: Promise<{ collection: string }>;
}

const heading = (collection: string) =>
    collection[0].toUpperCase() + collection.slice(1);

export const dynamicParams = false;

export function generateStaticParams() {
    return COLLECTIONS.map((collection) => ({ collection }));
}

export async function generateMetadata({ params }: Props) {
    return { title: heading((await params).collection) };
}

export default async function CollectionPage({ params }: Props) {
    const { collection } = await params;

    return (
        <>
            <h1 className={title}>{heading(collection)}</h1>
            <div className={`${scroll} gap-2`}>
                {getCollection(collection).map(({ slug, href, data }) => (
                    <Link key={slug} href={href} className={row}>
                        <span>{data.title ?? slug}</span>
                        <span className={meta}>
                            {[...(data.tags ?? [])].sort().join(", ") || "No tags"} |{" "}
                            {displayYear(data.date) ?? "Unknown"}
                        </span>
                    </Link>
                ))}
            </div>
        </>
    );
}
