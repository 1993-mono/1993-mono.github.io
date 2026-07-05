import fs from 'fs';
import path from 'path';
import { markdownToHtmlCustom } from './markdown';

const todoFilePath = path.join(process.cwd(), 'content/todo/todos.md');

/**
 * Convert todos.md markdown to HTML
 * @returns HTML string
 */
export async function getTodoHtmlContent(): Promise<string> {
  try {
    const fileContents = fs.readFileSync(todoFilePath, 'utf8');
    const { html } = await markdownToHtmlCustom(fileContents);
    return html;
  } catch (error) {
    console.error('Failed to read todo file:', error);
    return '';
  }
}
