import { meta, row, scroll, title } from "@/lib/styles";

export const metadata = { title: "Links" };

const links = [
    { title: "GitHub", href: "https://github.com/PaulLin1", label: "github.com/PaulLin1" },
    { title: "LinkedIn", href: "https://www.linkedin.com/in/plin/", label: "linkedin.com/in/plin" },
    { title: "Email", href: "mailto:linp40182@gmail.com", label: "linp40182@gmail.com" },
];

export default function LinksPage() {
    return (
        <>
            <h1 className={title}>Links</h1>
            <div className={`${scroll} gap-2`}>
                {links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={row}>
                        <span>{link.title}</span>
                        <span className={meta}>{link.label}</span>
                    </a>
                ))}
            </div>
        </>
    );
}
