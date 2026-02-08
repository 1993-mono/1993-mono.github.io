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

// 인덱스 파일 구조
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

// 인덱스 파일 읽기 (없으면 null)
function getDevlogIndex(): DevlogIndex | null {
  try {
    const data = fs.readFileSync(indexPath, 'utf8');
    return JSON.parse(data) as DevlogIndex;
  } catch {
    return null;
  }
}

// 날짜를 문자열로 변환하는 헬퍼 함수
function formatDate(date: unknown): string {
  if (!date) return '';
  if (date instanceof Date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  }
  if (typeof date === 'string') {
    return date;
  }
  return String(date);
}

// 모든 devlog 포스트의 메타데이터 가져오기
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

  // 날짜순으로 정렬 (최신순)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 특정 slug의 포스트 데이터 가져오기
export async function getDevlogPost(slug: string): Promise<DevlogPost | null> {
  try {
    // slug가 폴더 경로를 포함할 수 있음 (예: "Next.js/next-first-post")
    const fullPath = path.join(devlogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 마크다운을 HTML로 변환 (체크박스는 커스텀 태그로 변환, 제목에 id 부여)
    const { html, headings } = await markdownToHtmlCustom(content);

    // 폴더 정보 추출
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

// 모든 slug 목록 가져오기
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

// 재귀적으로 폴더 내 모든 .md 파일 찾기 (인덱스 없을 때 폴백)
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

// 1차 탭용 폴더 목록 가져오기 (content/devlog 하위 폴더들)
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

// 특정 폴더의 하위 폴더 목록 가져오기
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

// 특정 폴더의 포스트 가져오기
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
      content: '', // 목록용이라 content 불필요
      folder: e.folder,
    }));
  }

  // 인덱스 없을 때 기존 방식 (파일 스캔)
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

// 특정 폴더의 포스트 개수 가져오기
export function getPostCount(folder: string | null): number {
  return getDevlogPostsByFolder(folder).length;
}
