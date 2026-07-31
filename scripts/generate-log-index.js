/**
 * Log index generator
 * Scans content/log and writes .log-index.json
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const logDir = path.join(process.cwd(), 'content/log');
const indexPath = path.join(process.cwd(), '.log-index.json');

// Convert a date value to a string
function formatDate(date) {
  if (!date) return '';
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  if (typeof date === 'string') return date;
  return String(date);
}

// Recursively collect .md files
function collectMarkdownFiles(dir, baseDir = logDir) {
  const result = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(baseDir, dir).replace(/\\/g, '/');
    const folder = relativePath || '';

    if (item.isDirectory()) {
      result.push(...collectMarkdownFiles(fullPath, baseDir));
    } else if (item.isFile() && item.name.endsWith('.md')) {
      result.push({ fullPath, folder });
    }
  }
  return result;
}

// Top-level folders (direct children of content/log)
function getTopFolders() {
  const items = fs.readdirSync(logDir, { withFileTypes: true });
  return items
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .sort();
}

// Direct subfolders for a folder (matches log.ts getSubFolders)
function getSubFoldersOf(parentFolder) {
  const folderPath = parentFolder
    ? path.join(logDir, parentFolder)
    : logDir;
  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    return [];
  }
  const items = fs.readdirSync(folderPath, { withFileTypes: true });
  return items
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .sort();
}

// Build parent folder -> subfolder map (recursively traverse all folders)
function getSubFoldersMap(folders) {
  const map = {};
  function collect(parentFolder) {
    const subFolders = getSubFoldersOf(parentFolder);
    if (subFolders.length > 0) {
      map[parentFolder || ''] = subFolders;
      for (const sub of subFolders) {
        const fullPath = parentFolder ? `${parentFolder}/${sub}` : sub;
        collect(fullPath);
      }
    }
  }
  for (const folder of folders) {
    collect(folder);
  }
  return map;
}

function generate() {
  if (!fs.existsSync(logDir)) {
    console.warn('content/log folder not found.');
    fs.writeFileSync(indexPath, JSON.stringify({ entries: [], folders: [], subFoldersMap: {} }, null, 2));
    return;
  }

  const files = collectMarkdownFiles(logDir);
  const folders = getTopFolders();
  const subFoldersMap = getSubFoldersMap(folders);

  const entries = files.map(({ fullPath, folder }) => {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    const fileName = path.basename(fullPath);
    const folderNormalized = folder ? folder.replace(/\\/g, '/') : '';
    const slug = folderNormalized
      ? `${folderNormalized}/${fileName.replace(/\.md$/, '')}`
      : fileName.replace(/\.md$/, '');

    return {
      slug,
      title: data.title || '',
      date: formatDate(data.date),
      folder: folderNormalized || undefined,
    };
  });

  // Sort by date (newest first)
  entries.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });

  const index = {
    entries,
    folders,
    subFoldersMap,
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`Log index updated: ${entries.length} posts`);
}

generate();
