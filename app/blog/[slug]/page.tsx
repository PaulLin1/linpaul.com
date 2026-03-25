import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

import Line from "../../components/Line";
import CenteredLayout from "../../components/MainLayout";
import Section from "../../components/Section";

interface Props {
    params: { slug: string };
}

export default function PostPage({ params }: Props) {
    const filePath = path.join(
        process.cwd(),
        "content/blog",
        `${params.slug}.md`,
    );

    if (!fs.existsSync(filePath)) notFound();

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContents);

    return (
        <CenteredLayout>
            <Line as="h1">{data.title}</Line>
            <Line>{data.date}</Line>

            <Section>
                <div className="markdown">
                    <ReactMarkdown>
                        {content.trim()}
                    </ReactMarkdown>
                </div>
            </Section>

<style>{`
.markdown {
    max-height: 60vh;
    overflow-y: auto;

    /* hide scrollbar (Firefox) */
    scrollbar-width: none;

    /* hide scrollbar (IE/Edge legacy) */
    -ms-overflow-style: none;
}

.markdown::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
}

.markdown > * {
    display: block;
    padding: 0.25rem 0.5rem;
    background: white;
    margin-bottom: 0.5rem;
}
`}</style>
        </CenteredLayout>
    );
}