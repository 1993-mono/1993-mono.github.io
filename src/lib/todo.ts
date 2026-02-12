import fs from 'fs';
import path from 'path';
import { markdownToHtmlCustom } from './markdown';

const todoFilePath = path.join(process.cwd(), 'content/todo/todos.md');

/**
 * todos.md 파일의 마크다운을 HTML로 변환
 * @returns HTML 문자열
 */
export async function getTodoHtmlContent(): Promise<string> {
  try {
    const fileContents = fs.readFileSync(todoFilePath, 'utf8');
    const { html } = await markdownToHtmlCustom(fileContents);
    return html;
  } catch (error) {
    console.error('할 일 파일을 읽는 중 오류가 발생했습니다:', error);
    return '';
  }
}