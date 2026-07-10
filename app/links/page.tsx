import Line from "../components/Line";
import CenteredLayout from "../components/MainLayout";
import Section from "../components/Section";

export const metadata = { title: "Links" };

interface LinkItem {
    title: string;
    href: string;
    description?: string;
}

const links: LinkItem[] = [
    {
        title: "GitHub",
        href: "https://github.com/PaulLin1",
        description: "github.com/PaulLin1",
    },
    {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/plin/",
        description: "linkedin.com/in/plin",
    },
    {
        title: "Email",
        href: "mailto:linp40182@gmail.com",
        description: "linp40182@gmail.com",
    },
];

export default function LinksPage() {
    return (
        <CenteredLayout>
            <Line as="h1">Links</Line>

            <Section>
                {links.map((link) => (
                    <Line
                        key={link.href}
                        as="a"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <span>{link.title}</span>
                            <span>{link.description}</span>
                        </div>
                    </Line>
                ))}
            </Section>
        </CenteredLayout>
    );
}