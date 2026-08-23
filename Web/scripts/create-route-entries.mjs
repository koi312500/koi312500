import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(webRoot, "dist");
const rootEntryPath = resolve(distRoot, "index.html");
const contentPath = resolve(webRoot, "src/data/content.ts");

const [rootEntry, contentSource] = await Promise.all([
  readFile(rootEntryPath, "utf8"),
  readFile(contentPath, "utf8"),
]);

const projectIds = [
  ...contentSource.matchAll(/^\s{4}id:\s*"([a-z0-9-]+)",?$/gm),
].map((match) => match[1]);

if (projectIds.length === 0) {
  throw new Error(`No project IDs found in ${contentPath}`);
}

const routes = [
  "about",
  "skills",
  "works",
  "timeline",
  ...projectIds.map((projectId) => `works/${projectId}`),
];

await Promise.all(
  routes.map(async (route) => {
    const destination = resolve(distRoot, route, "index.html");
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, rootEntry, "utf8");
  }),
);

console.log(`Created ${routes.length} clean route entries.`);
