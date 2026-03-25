import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { slug: string[] } }
) {
  const filePath = path.join(
    process.cwd(),
    "content/portfolio",
    ...params.slug
  );

  if (!fs.existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }

  const file = fs.readFileSync(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}