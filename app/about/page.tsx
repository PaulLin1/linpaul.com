import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { notFound } from "next/navigation";

import Line from "../components/Line";
import CenteredLayout from "../components/MainLayout";
import Markdown from "../components/Markdown";
import Section from "../components/Section";

export default function AboutPage() {
    const filePath = path.join(process.cwd(), "content/about.md");
    if (!fs.existsSync(filePath)) notFound();

    const { content } = matter(fs.readFileSync(filePath, "utf8"));

    return (
        <CenteredLayout>
            <Line as="h1">About</Line>

            <Section>
                <Markdown>{content}</Markdown>
            </Section>

            <div
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    margin: "2rem auto 0",
                }}
            >
                <Image
                    src="/about.jpg"
                    alt="Paul Lin"
                    width={500}
                    height={500}
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                    }}
                    priority
                />
            </div>
        </CenteredLayout>
    );
}