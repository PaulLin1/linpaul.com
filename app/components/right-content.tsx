import { readdir } from "node:fs/promises";
import path from "node:path";
import ImageRenderer from "./image-renderer";

export default async function RightContent() {
  const contentDir = path.join(process.cwd(), "public/backgroundImages");
  const images = await readdir(contentDir);

  return <ImageRenderer images={images} />;
//   return (
//     <p></p>
//   );
}
