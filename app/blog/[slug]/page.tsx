import Markdown from "@/app/components/markdown";

export const instant = false;

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <Markdown directory="content/blog" slug={slug} />;
}