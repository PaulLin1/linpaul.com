import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { notFound } from "next/navigation";

import Line from "../components/Line";
import CenteredLayout from "../components/MainLayout";
import Markdown from "../components/Markdown";
import Scroll from "../components/Scroll";
import Section from "../components/Section";

export default function AboutPage() {
    const filePath = path.join(process.cwd(), "content/about.md");
    if (!fs.existsSync(filePath)) notFound();

    const { content } = matter(fs.readFileSync(filePath, "utf8"));

    return (
        <CenteredLayout>
            <Line as="h1">About</Line>

            <Scroll>
                <Section>
                    <Markdown>{content}</Markdown>
                </Section>

                <div style={{ width: "100%", maxWidth: "22rem" }}>
                    <Image
                        src="/ab.jpg"
                        alt="Paul Lin"
                        width={800}
                        height={800}
                        sizes="(max-width: 30rem) 100vw, 22rem"
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                        }}
                        priority
                    />
                </div>
            </Scroll>
        </CenteredLayout>
    );
}