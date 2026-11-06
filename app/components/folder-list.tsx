import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import FolderLink from "@/app/components/folder-link";

interface FolderListProps {
  directory: string;
}

interface Project {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  languages: string[];
}

function cleanWords(words: unknown[]): string[] {
  return words.map((word) => String(word ?? "").trim()).filter(Boolean);
}

function Badge({ word }: { word: string }) {
  // return <span className="p-1 text-white bg-purple-400">{word}</span>;
  return <span className="">{word}</span>;

}

const FULL_DATE = /^(\d{2})-(\d{2})-(\d{4})$/;

export function displayDate(date: string) {
  return date.replace(FULL_DATE, "$3");
}

function sortKeys(date: string) {
  const parts = date
    .split(" - ")
    .map((part) => part.trim().replace(FULL_DATE, "$3-$1-$2"));
  return { start: parts[0], end: parts[parts.length - 1] };
}

function compareDatesDesc(a: string, b: string) {
  const ka = sortKeys(a);
  const kb = sortKeys(b);
  return kb.start.localeCompare(ka.start) || kb.end.localeCompare(ka.end);
}

async function fetchFiles(directory: string): Promise<Project[]> {
  "use cache";

  // Statically scope the path to content/ so the build doesn't trace the whole project.
  const section = directory.replace(/^content\//, "");
  const contentDir = path.join(process.cwd(), "content", section);
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
      tags: cleanWords(data.tags ?? []),
      languages: cleanWords(data.languages ?? []),
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
          <FolderLink
            href={`/${directory.replace(/^content\//, "")}/${project.slug}`}
          >
            <h2 className="min-w-0">{project.title}</h2>

            <div className="flex shrink-0 items-center gap-2">
              <div className="flex items-center gap-1">
                {/* {[...project.tags, ...project.languages].map((word) => (
                  <Badge key={word} word={word} />
                ))} */}
                {[...project.tags, ...project.languages].join(', ')}
              </div>
              <span>|</span>
              <p>{displayDate(project.date)}</p>
            </div>
          </FolderLink>
        </li>
      ))}
    </ul>
  );
}
