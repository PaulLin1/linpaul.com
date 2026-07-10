import CollectionList from "../components/CollectionList";

export const metadata = { title: "Blog" };

export default function BlogPage() {
    return <CollectionList collection="blog" heading="Blog" />;
}
