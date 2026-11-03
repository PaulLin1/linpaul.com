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

// Blog front matter stores full dates as MM-DD-YYYY; show only the year.
const FULL_DATE = /^(\d{2})-(\d{2})-(\d{4})$/;

export function displayDate(date: string) {
  return date.replace(FULL_DATE, "$3");
}

function sortKeys(date: string) {
  const parts = date.split(" - ").map((part) => part.trim().replace(FULL_DATE, "$3-$1-$2"));
  return { start: parts[0], end: parts[parts.length - 1] };
}

function compareDatesDesc(a: string, b: string) {
  const ka = sortKeys(a);
  const kb = sortKeys(b);
  return kb.start.localeCompare(ka.start) || kb.end.localeCompare(ka.end);
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

  return projects.sort((a, b) => compareDatesDesc(a.date, b.date));
}

export default async function FolderList({ directory }: FolderListProps) {
  const projects = await fetchFiles(directory);

  return (
    <ul className="list-none flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pl-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
              <p>{displayDate(project.date)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
