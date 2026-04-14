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
    params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const folderPath = path.join(
        process.cwd(),
        "content/portfolio",
        slug
    );

    if (!fs.existsSync(folderPath)) notFound();

    const writeupPath = path.join(folderPath, "writeup.md");
    if (!fs.existsSync(writeupPath)) notFound();

    const fileContents = fs.readFileSync(writeupPath, "utf8");
    const { content, data } = matter(fileContents);

    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const imageFiles = fs
        .readdirSync(folderPath)
        .filter((f) => imageExtensions.includes(path.extname(f).toLowerCase()))
        .sort();
    const imagePaths = imageFiles.map(
        (f) => `/api/image/${slug}/${f}`
    );

    return (
        <CenteredLayout>
            <Line as="h1">{data.title}</Line>
            <Line>
            {data.date}
            {data.github && (
                <>
                {" | "}
                <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                </>
            )}
            </Line>

            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "stretch",
                }}
            >
                {/* LEFT: text */}
                <Section>
                    <div className="markdown">
                        <ReactMarkdown>{content.trim()}</ReactMarkdown>
                    </div>
                </Section>

                {/* RIGHT: images stacked vertically */}
                {imagePaths.length > 0 && (
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
                        {imagePaths.map((src, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: 1,
                                    overflow: "hidden",
                                    minHeight: 0,
                                }}
                            >
                                <img
                                    src={src}
                                    alt={`${data.title} ${i + 1}`}
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

            <style>{`
.markdown {
    max-height: 60vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.markdown::-webkit-scrollbar {
    display: none;
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