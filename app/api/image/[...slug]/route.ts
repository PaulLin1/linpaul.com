import fs from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";

import { CONTENT_ROOT } from "@/lib/content";

const CONTENT_TYPES: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".svg": "image/svg+xml",
};

/** Serves images from anywhere under content/, e.g. /api/image/blog/collar/1.jpg */
export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ slug: string[] }> },
) {
    const { slug } = await context.params;
    const filePath = path.join(CONTENT_ROOT, ...slug);

    if (!filePath.startsWith(CONTENT_ROOT + path.sep)) {
        return new Response("Forbidden", { status: 403 });
    }

    const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()];
    if (!contentType) {
        return new Response("Not found", { status: 404 });
    }

    try {
        const file = await fs.readFile(filePath);
        return new Response(new Uint8Array(file), {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return new Response("Not found", { status: 404 });
    }
}
