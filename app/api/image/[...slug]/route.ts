import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await context.params;

  const filePath = path.join(
    process.cwd(),
    "content/portfolio",
    ...slug
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