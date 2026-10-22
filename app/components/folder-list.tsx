import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";

interface FolderListProps {
  directory: string;
}

interface Project {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

async function fetchFiles(directory: string): Promise<Project[]> {
  "use cache";

  const contentDir = path.join(process.cwd(), directory);
  const folders = await readdir(contentDir, { withFileTypes: true });

  const projects: Project[] = [];

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;

    const filePath = path.join(contentDir, folder.name, "writeup.md");
    const content = await readFile(filePath, "utf8");
    const { data } = matter(content);

    projects.push({
      slug: folder.name,
      title: data.title,
      date: String(data.date),
      tags: data.tags ?? [],
    });
  }

  return projects;
}

export default async function FolderList({ directory }: FolderListProps) {
  const projects = await fetchFiles(directory);

  return (
    <ul className="list-none flex flex-col gap-1 pl-0">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link
            href={`/${directory.replace(/^content\//, "")}/${project.slug}`}
            className="flex items-center justify-between gap-1  no-underline"
          >
            <h2 className="min-w-0">{project.title}</h2>

            <div className="flex shrink-0 items-center gap-2">
              <span>{project.tags.join(", ")}</span>
              <span>|</span>
              <p>{project.date}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
