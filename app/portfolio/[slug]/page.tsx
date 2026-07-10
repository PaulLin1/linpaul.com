import ContentPage from "../../components/ContentPage";
import { getEntry, listSlugs } from "@/lib/content";

const COLLECTION = "portfolio";

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return listSlugs(COLLECTION).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const entry = getEntry(COLLECTION, slug);
    return entry ? { title: `${entry.data.title ?? slug} — Paul Lin` } : {};
}

export default async function PortfolioPostPage({ params }: Props) {
    const { slug } = await params;
    return <ContentPage collection={COLLECTION} slug={slug} />;
}
