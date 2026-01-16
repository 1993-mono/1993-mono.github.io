import { getTodoHtmlContent } from '@/lib/todo';

export default async function Todo() {
  const htmlContent = await getTodoHtmlContent();

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}