import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

import Line from "../components/Line";
import CenteredLayout from "../components/MainLayout";
import Section from "../components/Section";

export default function PostPage() {

    if (!fs.existsSync("content/about.md")) notFound();

    const fileContents = fs.readFileSync("content/about.md", "utf8");
    const { content, data } = matter(fileContents);

    return (
        <CenteredLayout>
            <Line as="h1">About</Line>

            <Section>
                <div className="markdown">
                    <ReactMarkdown>{content.trim()}</ReactMarkdown>
                </div>
            </Section>
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
