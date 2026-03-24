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
}

export default function BlogPage() {
    const postsDirectory = path.join(process.cwd(), "content/posts");
    const filenames = fs.readdirSync(postsDirectory);

    const posts: Post[] = filenames.map((file) => {
        const filePath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        return {
            slug: file.replace(/\.md$/, ""),
            title: data.title || file.replace(/\.md$/, ""),
            tags: Array.isArray(data.tags) ? data.tags : [],
            date: data.date || "Unknown",
        };
    });

    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <CenteredLayout>
            <Line text="Blog" asHeading />

            <Section>
                {posts.map((post) => (
                    <div
                        key={post.slug}
                        style={{
                            // Remove this, i want styling to be uniform
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "1rem",
                            backgroundColor: "white",
                        }}
                    >
                        <Line asLink href={`/blog/${post.slug}`} text={post.title} />

                        <Line
                            text={`${post.tags.length > 0 ? post.tags.join(", ") : "No tags"} | ${post.date}`}
                        />
                    </div>
                ))}
            </Section>
        </CenteredLayout>
    );
}
