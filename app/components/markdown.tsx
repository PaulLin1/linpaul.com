import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import ImageCarousel, {
  type CarouselImage,
} from "@/app/components/image-carousel";

interface BlogProp {
  directory: string;
  slug: string;
}

export default async function Writeup({ directory, slug }: BlogProp) {
  "use cache";

  const filePath = path.join(process.cwd(), directory, slug, "writeup.md");

  let content: string;

  try {
    content = await readFile(filePath, "utf8");
  } catch {
    notFound();
  }

  const { data, content: body } = matter(content);

  const imageDir = `/${directory.replace(/^content\//, "")}/${slug}`;
  const images: CarouselImage[] = [
    ...(data.hero ? [{ src: data.hero }] : []),
    ...(data.images ?? []),
  ].map((image: CarouselImage) => ({
    src: `${imageDir}/${image.src}`,
    caption: image.caption,
  }));

  return (
    <div className="flex h-[calc(100dvh-6rem)] min-h-0 flex-row items-stretch gap-8 overflow-hidden">
      <article className="prose prose-neutral min-h-0 min-w-0 flex-1 max-w-none overflow-y-auto text-black font-['Helvetica',Arial,sans-serif] prose-headings:text-black prose-p:text-black prose-strong:text-black prose-a:text-black [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <h1>{data.title}</h1>
        <p>{String(data.date ?? "")}</p>
        <ReactMarkdown>{body}</ReactMarkdown>
      </article>

      {images.length > 0 && (
        <div className="relative w-2/5 shrink-0 self-center">
          <ImageCarousel images={images} />
        </div>
      )}
    </div>
  );
}
