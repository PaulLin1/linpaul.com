import fs from "fs";
import path from "path";
import matter from "gray-matter";

import React from "react";
import Line from "../components/Line";
import CenteredLayout from "../components/MainLayout";
import Section from "../components/Section";

interface Post {
    slug: string;
    title: string;
    tags: string[];
    date: string;
    image: string | null;
}

export default function BlogPage() {
    const postsDirectory = path.join(process.cwd(), "content/portfolio");

    const folders = fs
        .readdirSync(postsDirectory)
        .filter((file) =>
            fs.statSync(path.join(postsDirectory, file)).isDirectory()
        );

    const posts: Post[] = folders.map((folder) => {
        const folderPath = path.join(postsDirectory, folder);

        // support both .md and .markdown
        const writeupPathMd = path.join(folderPath, "writeup.md");
        const writeupPathMarkdown = path.join(folderPath, "writeup.markdown");

        const writeupPath = fs.existsSync(writeupPathMd)
            ? writeupPathMd
            : writeupPathMarkdown;

        let data: any = {};

        if (fs.existsSync(writeupPath)) {
            const fileContents = fs.readFileSync(writeupPath, "utf8");
            data = matter(fileContents).data;
        }

        const imagePath = path.join(folderPath, "image.jpg");
        const hasImage = fs.existsSync(imagePath);

        return {
            slug: folder,
            title: data.title || folder,
            tags: Array.isArray(data.tags) ? data.tags : [],
            date: data.date || "Unknown",
            image: hasImage ? `/portfolio/${folder}/image.jpg` : null,
        };
    });

    posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <CenteredLayout>
            <Line as="h1">Portfolio</Line>

            <Section>
                {posts.map((post) => (
                    <Line
                        key={post.slug}
                        as="a"
                        href={`/portfolio/${post.slug}`}
                        style={post.tags.includes("Design") ? { backgroundColor: "yellow" } : undefined}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <span>{post.title}</span>

                            <span>
                                {post.tags.length > 0
                                    ? post.tags.join(", ")
                                    : "No tags"}{" "}
                                | {post.date}
                            </span>
                        </div>
                    </Line>
                ))}
            </Section>
        </CenteredLayout>
    );
}