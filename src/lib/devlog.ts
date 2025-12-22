import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const devlogDirectory = path.join(process.cwd(), 'content/devlog');

export interface DevlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  htmlContent?: string;
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
    const fullPath = path.join(devlogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 마크다운을 HTML로 변환
    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();

    return {
      slug,
      title: data.title || '',
      date: formatDate(data.date),
      content,
      htmlContent,
    };
  } catch (error) {
    return null;
  }
}

// 모든 slug 목록 가져오기
export function getAllDevlogSlugs(): string[] {
  const fileNames = fs.readdirSync(devlogDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}