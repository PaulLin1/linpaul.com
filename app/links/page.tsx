import Line from "../components/Line";
import CenteredLayout from "../components/MainLayout";
import Scroll from "../components/Scroll";
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

            <Scroll>
                <Section>
                    {links.map((link) => (
                        <Line
                            key={link.href}
                            as="a"
                            href={link.href}
                            block
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="row">
                                <span>{link.title}</span>
                                <span className="row__meta">
                                    {link.description}
                                </span>
                            </span>
                        </Line>
                    ))}
                </Section>
            </Scroll>
        </CenteredLayout>
    );
}
