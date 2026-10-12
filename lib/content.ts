import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const CONTENT_ROOT = path.join(process.cwd(), "content");
export const COLLECTIONS = ["portfolio", "experiences", "blog"];

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"];

type ImageSource = string | { src: string; caption?: string; alt?: string };

export interface ImageRef {
    src: string;
    caption?: string;
    alt?: string;
}

export interface Frontmatter {
    title?: string;
    date?: string;
    tags?: string[];
    github?: string;
    /** Carousel aspect ratio as width/height, e.g. "3/4". */
    aspect?: string;
    /** Omit to use every image in the entry's folder. */
    images?: ImageSource[];
    /** A single image (often a GIF demo) shown above the carousel. */
    hero?: ImageSource;
}

export interface Entry {
    slug: string;
    href: string;
    data: Frontmatter;
    content: string;
    hero: ImageRef | null;
    images: ImageRef[];
}

/** "09-14-2025" → "2025". */
export function displayYear(date?: string) {
    return date?.match(/\d{4}/)?.[0] ?? date;
}

/** Tags (sorted) and year, joined for a meta line. */
export function metaLine({ tags, date }: Frontmatter) {
    return [[...(tags ?? [])].sort().join(", "), displayYear(date)]
        .filter(Boolean)
        .join(" | ");
}

/** Each entry is a folder holding `writeup.md` plus its images. */
export function listSlugs(collection: string): string[] {
    const dir = path.join(CONTENT_ROOT, collection);
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((slug) => fs.existsSync(path.join(dir, slug, "writeup.md")));
}

export function getEntry(collection: string, slug: string): Entry | null {
    const dir = path.join(CONTENT_ROOT, collection, slug);
    const file = path.join(dir, "writeup.md");
    if (!fs.existsSync(file)) return null;

    const { content, data } = matter(fs.readFileSync(file, "utf8"));
    const fm = data as Frontmatter;

    const toRef = (image: ImageSource): ImageRef => {
        const ref = typeof image === "string" ? { src: image } : image;
        const external = /^(https?:)?\/\//.test(ref.src) || ref.src.startsWith("/");
        return {
            ...ref,
            src: external ? ref.src : `/api/image/${collection}/${slug}/${ref.src}`,
        };
    };

    const hero = fm.hero ? toRef(fm.hero) : null;
    const heroFile = typeof fm.hero === "string" ? fm.hero : fm.hero?.src;
    const images = Array.isArray(fm.images)
        ? fm.images
        : fs
              .readdirSync(dir)
              .filter((f) => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
              .filter((f) => f !== heroFile)
              .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    return {
        slug,
        href: `/${collection}/${slug}`,
        data: fm,
        content,
        hero,
        images: images.map(toRef),
    };
}

/** Entries in a collection, newest first. */
export function getCollection(collection: string): Entry[] {
    return listSlugs(collection)
        .map((slug) => getEntry(collection, slug)!)
        .sort(
            (a, b) =>
                new Date(b.data.date ?? "").getTime() -
                new Date(a.data.date ?? "").getTime(),
        );
}
