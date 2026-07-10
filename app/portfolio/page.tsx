import CollectionList from "../components/CollectionList";

export const metadata = { title: "Portfolio" };

export default function PortfolioPage() {
    return (
        <CollectionList
            collection="portfolio"
            heading="Portfolio"
            highlightTag="Design"
        />
    );
}
