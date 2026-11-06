// Obsidian vault -> site content. One-way: the vault is the source of truth.
//
//   npm run sync            write content/ + public/
//   npm run sync -- --dry   validate and print, write nothing
//
// VAULT_PATH comes from .env.local.
//
// A note is published when it has a `site` property (anywhere in the vault):
//
//   site:      blog | portfolio | experiences        (required)
//   slug:      url-name, lowercase-kebab             (required, unique per site)
//   title:     display title                         (required)
//   date:      YYYY-MM-DD or YYYY                    (required)
//   end:       YYYY-MM-DD or YYYY                    (optional, makes a range)
//   topics:    [..]   blog/portfolio labels           (optional)
//   role:      text   experiences label               (optional)
//   languages: [..]   portfolio                       (optional)
//   draft:     true   skip this note                  (optional)
//
// Every local image embed in the note (![[file.png|Caption]] or ![Caption](file.png))
// is pulled out of the text and becomes a carousel image, in order.
// Images are found the way Obsidian finds them, so they can live in any folder.
//
// Output (the format the site reads; regenerated from scratch each run, don't edit by hand):
//   content/<site>/<slug>/writeup.md
//   public/<site>/<slug>/<image files>

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const SECTIONS = ["blog", "portfolio", "experiences"];
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE = /^\d{4}(-\d{2}-\d{2})?$/;

const REPO = path.resolve(import.meta.dirname, "..");
const DRY = process.argv.includes("--dry");
const VAULT = process.env.VAULT_PATH;

if (!VAULT) fail(["VAULT_PATH is not set (add it to .env.local)"]);

function fail(errors) {
  console.error("Sync aborted, nothing written:\n  " + errors.join("\n  "));
  process.exit(1);
}

// --- vault index ---------------------------------------------------------

async function walk(dir, out = { files: [], evicted: new Set() }) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    // iCloud stand-in for a file that isn't downloaded: ".Name.png.icloud"
    const icloud = entry.name.match(/^\.(.+)\.icloud$/);
    if (icloud) out.evicted.add(icloud[1]);
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.files.push(full);
  }
  return out;
}

const { files, evicted } = await walk(VAULT);

// Skip the vault's templates folder (placeholders like {{title}} aren't real posts).
const templatesDir = await fs
  .readFile(path.join(VAULT, ".obsidian/templates.json"), "utf8")
  .then((t) => JSON.parse(t).folder)
  .catch(() => undefined);
const isTemplate = (f) => templatesDir && f.startsWith(path.join(VAULT, templatesDir) + path.sep);
const byName = new Map();
for (const f of files) {
  const key = path.basename(f).toLowerCase();
  byName.set(key, [...(byName.get(key) ?? []), f]);
}

// Obsidian-style resolution: exact path (note-relative, then vault-relative),
// else match by file name, preferring the note's folder, then the shortest path.
async function resolve(target, noteDir) {
  const clean = decodeURIComponent(target).replace(/^\/+/, "");
  for (const base of [noteDir, VAULT]) {
    const candidate = path.join(base, clean);
    if (files.includes(candidate)) return candidate;
  }
  const matches = byName.get(path.basename(clean).toLowerCase()) ?? [];
  return (
    matches.find((m) => path.dirname(m) === noteDir) ??
    [...matches].sort((a, b) => a.length - b.length)[0]
  );
}

// --- parse notes ---------------------------------------------------------

const asText = (v) =>
  v instanceof Date ? v.toISOString().slice(0, 10) : v == null ? "" : String(v).trim();
const asList = (v) =>
  (Array.isArray(v) ? v : v == null ? [] : [v]).map(asText).filter(Boolean);

// The site expects "MM-DD-YYYY" or "YYYY", with " - " between range ends.
const displayDate = (d) => d.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$2-$3-$1");

const WIKI_EMBED = /!\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g;
const MD_EMBED = /!\[([^\]]*)\]\(<?([^)>]+?)>?(?:\s+"[^"]*")?\)/g;
const WIKI_LINK = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g;

const errors = [];
const entries = [];
const seen = new Map();

for (const file of files.filter((f) => f.endsWith(".md") && !isTemplate(f))) {
  let parsed;
  try {
    parsed = matter(await fs.readFile(file, "utf8"));
  } catch (e) {
    if (/\bsite:/.test(await fs.readFile(file, "utf8").catch(() => "")))
      errors.push(`${rel(file)}: bad frontmatter (${e.message.split("\n")[0]})`);
    continue;
  }
  const { data } = parsed;
  const content = parsed.content.replace(/%%[\s\S]*?%%/g, ""); // Obsidian comments
  if (data.site == null || data.draft === true) continue;

  const where = rel(file);
  const site = asText(data.site);
  const slug = asText(data.slug);
  const title = asText(data.title);
  const date = asText(data.date);
  const end = asText(data.end);

  if (!SECTIONS.includes(site)) errors.push(`${where}: site must be one of ${SECTIONS.join(", ")}`);
  if (!SLUG.test(slug)) errors.push(`${where}: slug "${slug}" must be lowercase-kebab`);
  if (!title) errors.push(`${where}: title is required`);
  if (!DATE.test(date)) errors.push(`${where}: date "${date}" must be YYYY-MM-DD or YYYY`);
  if (end && !DATE.test(end)) errors.push(`${where}: end "${end}" must be YYYY-MM-DD or YYYY`);

  const key = `${site}/${slug}`;
  if (seen.has(key)) errors.push(`${where}: slug "${key}" also used by ${seen.get(key)}`);
  seen.set(key, where);

  // Pull image embeds out of the body, in document order.
  const noteDir = path.dirname(file);
  const found = [];
  const collect = (re, toImage) => {
    for (const m of content.matchAll(re)) {
      const img = toImage(m);
      if (img) found.push({ ...img, index: m.index, raw: m[0] });
    }
  };
  collect(WIKI_EMBED, (m) =>
    IMAGE_EXT.test(m[1].trim())
      ? { target: m[1].trim(), caption: /^\d+(x\d+)?$/.test(m[2] ?? "") ? "" : m[2]?.trim() }
      : null,
  );
  collect(MD_EMBED, (m) =>
    !/^[a-z]+:/i.test(m[2]) && IMAGE_EXT.test(m[2].trim())
      ? { target: m[2].trim(), caption: m[1].trim() }
      : null,
  );
  found.sort((a, b) => a.index - b.index);

  const images = [];
  const names = new Map();
  let body = content;
  for (const img of found) {
    body = body.replace(img.raw, "");
    const source = await resolve(img.target, noteDir);
    if (!source) {
      const hint = evicted.has(path.basename(img.target))
        ? " (not downloaded from iCloud yet: open it in Finder/Obsidian)"
        : "";
      errors.push(`${where}: image not found: ${img.target}${hint}`);
      continue;
    }
    const name = path.basename(source);
    if (names.has(name) && names.get(name) !== source)
      errors.push(`${where}: two different images named ${name}`);
    names.set(name, source);
    images.push({ source, name, caption: img.caption || undefined });
  }

  body = body
    .replace(WIKI_LINK, (_, target, alias) => (alias ?? target).trim()) // site can't follow [[links]]
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const topics = site === "experiences" ? asList(data.role) : asList(data.topics);
  const languages = asList(data.languages);
  const frontmatter = {
    title,
    date: end ? `${displayDate(date)} - ${displayDate(end)}` : displayDate(date),
    tags: topics,
    ...(languages.length && { languages }),
    ...(images.length && {
      images: images.map(({ name, caption }) => ({ src: name, ...(caption && { caption }) })),
    }),
  };

  entries.push({ site, slug, where, images, text: matter.stringify(body + "\n", frontmatter) });
}

function rel(file) {
  return path.relative(VAULT, file);
}

if (errors.length) fail(errors);

// --- write ---------------------------------------------------------------

for (const site of SECTIONS) {
  const count = entries.filter((e) => e.site === site).length;
  console.log(`${site}: ${count}`);
}
for (const e of entries) {
  console.log(`  ${e.site}/${e.slug}  <- ${e.where}${e.images.length ? `  (+${e.images.length} images)` : ""}`);
}
if (DRY) {
  console.log("\nDry run, nothing written.");
  process.exit(0);
}

for (const site of SECTIONS) {
  await fs.rm(path.join(REPO, "content", site), { recursive: true, force: true });
  await fs.rm(path.join(REPO, "public", site), { recursive: true, force: true });
}
for (const e of entries) {
  const contentDir = path.join(REPO, "content", e.site, e.slug);
  const publicDir = path.join(REPO, "public", e.site, e.slug);
  await fs.mkdir(contentDir, { recursive: true });
  await fs.writeFile(path.join(contentDir, "writeup.md"), e.text);
  if (e.images.length) await fs.mkdir(publicDir, { recursive: true });
  for (const img of e.images) await fs.copyFile(img.source, path.join(publicDir, img.name));
}
console.log(`\nWrote ${entries.length} entries.`);
