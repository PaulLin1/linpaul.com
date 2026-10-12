import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { markdown, scroll, title } from "@/lib/styles";

export default function AboutPage() {
    const file = path.join(process.cwd(), "content/about.md");
    const { content } = matter(fs.readFileSync(file, "utf8"));

    return (
        <>
            <h1 className={title}>About</h1>
            <div className={`${scroll} gap-(--gap)`}>
                <div className={markdown}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.trim()}</ReactMarkdown>
                </div>
                <Image
                    src="/about.jpg"
                    alt="Paul Lin"
                    width={800}
                    height={800}
                    sizes="(max-width: 30rem) 100vw, 22rem"
                    className="block h-auto w-full max-w-88 flex-none"
                    priority
                />
            </div>
        </>
    );
}
