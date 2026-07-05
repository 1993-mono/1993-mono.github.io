import fs from 'fs';
import path from 'path';
import { markdownToHtmlCustom } from './markdown';

const roadmapFilePath = path.join(process.cwd(), 'content/roadmap/roadmap.md');

/**
 * roadmap.md 마크다운을 HTML로 변환
 * @returns HTML string
 */
export async function getRoadmapHtmlContent(): Promise<string> {
  try {
    const fileContents = fs.readFileSync(roadmapFilePath, 'utf8');
    const { html } = await markdownToHtmlCustom(fileContents);
    return html;
  } catch (error) {
    console.error('Failed to read roadmap file:', error);
    return '';
  }
}
