import Markdown from "@/app/components/markdown";

export const instant = false;

export default async function PortfolioPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <Markdown directory="content/portfolio" slug={slug} />;
}