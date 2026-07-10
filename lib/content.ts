import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const CONTENT_ROOT = path.join(process.cwd(), "content");

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"];

/** Filenames treated as the body of a folder-based entry, in priority order. */
const ENTRY_FILES = ["index.md", "writeup.md"];

export interface ImageRef {
    /** Fully resolved URL, ready for <img src>. */
    src: string;
    caption?: string;
    alt?: string;
}

export interface Frontmatter {
    title?: string;
    date?: string;
    tags?: string[];
    layout?: string;
    github?: string;
    /** Image aspect ratio as width/height, e.g. "3/4". Used by image layouts. */
    aspect?: string;
    /** Either bare filenames or objects with captions. Omit to auto-discover. */
    images?: Array<string | { src: string; caption?: string; alt?: string }>;
    [key: string]: unknown;
}

export interface Entry {
    collection: string;
    slug: string;
    href: string;
    data: Frontmatter;
    content: string;
    images: ImageRef[];
}

export type EntrySummary = Omit<Entry, "content" | "images">;

const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
});

function isImage(file: string) {
    return IMAGE_EXTS.includes(path.extname(file).toLowerCase());
}

/** Resolves a slug to its markdown file, whether flat or inside a folder. */
function resolveSource(collection: string, slug: string) {
    const base = path.join(CONTENT_ROOT, collection, slug);

    if (fs.existsSync(base) && fs.statSync(base).isDirectory()) {
        const entryFile = ENTRY_FILES.map((f) => path.join(base, f)).find((p) =>
            fs.existsSync(p),
        );
        return entryFile ? { file: entryFile, dir: base } : null;
    }

    const flat = `${base}.md`;
    return fs.existsSync(flat) ? { file: flat, dir: null } : null;
}

/** Turns a frontmatter image reference into a servable URL. */
function toUrl(collection: string, slug: string, src: string) {
    if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return src;
    return `/api/image/${collection}/${slug}/${src}`;
}

function loadImages(
    collection: string,
    slug: string,
    dir: string | null,
    data: Frontmatter,
): ImageRef[] {
    if (Array.isArray(data.images)) {
        return data.images.map((image) =>
            typeof image === "string"
                ? { src: toUrl(collection, slug, image) }
                : { ...image, src: toUrl(collection, slug, image.src) },
        );
    }

    if (!dir) return [];

    return fs
        .readdirSync(dir)
        .filter(isImage)
        .sort(collator.compare)
        .map((file) => ({ src: toUrl(collection, slug, file) }));
}

export function listSlugs(collection: string): string[] {
    const dir = path.join(CONTENT_ROOT, collection);
    if (!fs.existsSync(dir)) return [];

    return fs
        .readdirSync(dir)
        .map((name) =>
            fs.statSync(path.join(dir, name)).isDirectory()
                ? name
                : name.endsWith(".md")
                  ? name.slice(0, -3)
                  : null,
        )
        .filter((slug): slug is string => slug !== null)
        .filter((slug) => resolveSource(collection, slug) !== null);
}

export function getEntry(collection: string, slug: string): Entry | null {
    const source = resolveSource(collection, slug);
    if (!source) return null;

    const { content, data } = matter(fs.readFileSync(source.file, "utf8"));
    const frontmatter = data as Frontmatter;

    return {
        collection,
        slug,
        href: `/${collection}/${slug}`,
        data: frontmatter,
        content,
        images: loadImages(collection, slug, source.dir, frontmatter),
    };
}

/** Entries in a collection, newest first. Body and images are omitted. */
export function getCollection(collection: string): EntrySummary[] {
    return listSlugs(collection)
        .map((slug) => getEntry(collection, slug))
        .filter((entry): entry is Entry => entry !== null)
        .map(({ content: _content, images: _images, ...summary }) => summary)
        .sort(
            (a, b) =>
                new Date(b.data.date ?? "").getTime() -
                new Date(a.data.date ?? "").getTime(),
        );
}
