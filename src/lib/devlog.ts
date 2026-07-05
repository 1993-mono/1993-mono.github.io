import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtmlCustom, type TocItem } from './markdown';

const devlogDirectory = path.join(process.cwd(), 'content/devlog');
const indexPath = path.join(process.cwd(), '.devlog-index.json');

export interface DevlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  htmlContent?: string;
  headings?: TocItem[];
  folder?: string;
}

// Index file structure
interface DevlogIndexEntry {
  slug: string;
  title: string;
  date: string;
  folder?: string;
}

interface DevlogIndex {
  entries: DevlogIndexEntry[];
  folders: string[];
  subFoldersMap: Record<string, string[]>;
}

// Read index file (returns null if missing)
function getDevlogIndex(): DevlogIndex | null {
  try {
    const data = fs.readFileSync(indexPath, 'utf8');
    return JSON.parse(data) as DevlogIndex;
  } catch {
    return null;
  }
}

// Helper to convert a date value to a string
function formatDate(date: unknown): string {
  if (!date) return '';
  if (date instanceof Date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  }
  if (typeof date === 'string') {
    return date;
  }
  return String(date);
}

// Fetch metadata for all devlog posts
export function getAllDevlogPosts(): DevlogPost[] {
  const fileNames = fs.readdirSync(devlogDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(devlogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: formatDate(data.date),
        content,
      };
    });

  // Sort by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Fetch post data for a specific slug
export async function getDevlogPost(slug: string): Promise<DevlogPost | null> {
  try {
    // slug may include a folder path (e.g. "Next.js/next-first-post")
    const fullPath = path.join(devlogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML (custom checkbox tags, heading ids)
    const { html, headings } = await markdownToHtmlCustom(content);

    // Extract folder info
    const relativePath = path.relative(devlogDirectory, fullPath);
    const folder = path.dirname(relativePath) !== '.' ? path.dirname(relativePath).replace(/\\/g, '/') : undefined;

    return {
      slug,
      title: data.title || '',
      date: formatDate(data.date),
      content,
      htmlContent: html,
      headings,
      folder,
    };
  } catch {
    return null;
  }
}

// Fetch all slug values
export function getAllDevlogSlugs(): string[] {
  const index = getDevlogIndex();
  if (index) {
    return index.entries.map((e) => e.slug);
  }

  const markdownFiles = getAllMarkdownFiles(devlogDirectory);
  return markdownFiles.map((file) => {
    const relativePath = path.relative(devlogDirectory, file.path);
    return relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
  });
}

// Recursively find all .md files in a folder (fallback when index is missing)
function getAllMarkdownFiles(dir: string, baseDir: string = devlogDirectory): Array<{ path: string; folder: string }> {
  const files: Array<{ path: string; folder: string }> = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(baseDir, dir);
    const folder = relativePath || '';

    if (item.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath, baseDir));
    } else if (item.isFile() && item.name.endsWith('.md')) {
      files.push({ path: fullPath, folder });
    }
  }

  return files;
}

// Fetch top-level folders for primary tabs (direct children of content/devlog)
export function getDevlogFolders(): string[] {
  const index = getDevlogIndex();
  if (index) {
    return index.folders;
  }

  const items = fs.readdirSync(devlogDirectory, { withFileTypes: true });
  return items
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .sort();
}

// Fetch subfolders for a given folder
export function getSubFolders(parentFolder: string | null): string[] {
  const index = getDevlogIndex();
  if (index) {
    if (parentFolder === null) {
      return index.folders;
    }
    return index.subFoldersMap[parentFolder] || [];
  }

  if (parentFolder === null) {
    return getDevlogFolders();
  }

  const folderPath = path.join(devlogDirectory, parentFolder);
  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    return [];
  }

  const items = fs.readdirSync(folderPath, { withFileTypes: true });
  return items
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .sort();
}

// Fetch posts for a given folder
export function getDevlogPostsByFolder(folder: string | null): DevlogPost[] {
  const index = getDevlogIndex();
  if (index) {
    let entries = index.entries;
    if (folder !== null) {
      const folderNorm = folder.replace(/\\/g, '/');
      entries = entries.filter((e) => {
        const postFolder = (e.folder || '').replace(/\\/g, '/');
        return postFolder === folderNorm || postFolder.startsWith(folderNorm + '/');
      });
    }
    return entries.map((e) => ({
      slug: e.slug,
      title: e.title,
      date: e.date,
      content: '', // Not needed for list views
      folder: e.folder,
    }));
  }

  // Fallback to file scan when index is missing
  const markdownFiles = getAllMarkdownFiles(devlogDirectory);

  const allPostsData = markdownFiles
    .filter((file) => {
      if (folder === null) {
        return true;
      }
      const folderNormalized = folder.replace(/\//g, path.sep);
      const fileFolderNormalized = file.folder.replace(/\//g, path.sep);
      return fileFolderNormalized === folderNormalized ||
        fileFolderNormalized.startsWith(folderNormalized + path.sep);
    })
    .map((file) => {
      const fileContents = fs.readFileSync(file.path, 'utf8');
      const { data, content } = matter(fileContents);
      const fileName = path.basename(file.path);
      const slug = file.folder
        ? `${file.folder.replace(/\\/g, '/')}/${fileName.replace(/\.md$/, '')}`
        : fileName.replace(/\.md$/, '');

      return {
        slug,
        title: data.title || '',
        date: formatDate(data.date),
        content,
        folder: file.folder ? file.folder.replace(/\\/g, '/') : undefined,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

// Fetch post count for a given folder
export function getPostCount(folder: string | null): number {
  return getDevlogPostsByFolder(folder).length;
}
