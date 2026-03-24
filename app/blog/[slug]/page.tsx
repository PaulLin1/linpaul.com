import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import MDXRenderer from "../../components/MDXRenderer";
import React from "react";
import Line from "../../components/Line";
import CenteredLayout from "../../components/MainLayout";
import Section from "../../components/Section";

interface Props {
    params: { slug: string };
}

export default async function PostPage({ params }: Props) {
	const filePath = path.join(
        process.cwd(),
        "content/posts",
        `${params.slug}.md`,
    );
    if (!fs.existsSync(filePath)) notFound();

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContents);
    const mdxSource = await serialize(content);

    return (
        <CenteredLayout>
			<Line text={data.title} asHeading />

			<Line text={data.date} />

            <Section>
				<div
                    style={{
                        height: "60vh",
                        overflowY: "auto",
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE and Edge
                    }}
                >
					<MDXRenderer source={mdxSource} />
				</div>
            </Section>
        </CenteredLayout>
    );
}
