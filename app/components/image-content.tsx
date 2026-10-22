import { readdir } from "node:fs/promises";
import Image from "next/image";
import path from "node:path";
import ImageRenderer from "./image-renderer";

export default async function ImageContent() {
  "use cache";

  const contentDir = path.join(process.cwd(), "public/backgroundImages");
  const images = await readdir(contentDir);

  return <ImageRenderer images={images} />;
}
