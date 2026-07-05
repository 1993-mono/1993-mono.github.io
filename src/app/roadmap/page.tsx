import { getRoadmapHtmlContent } from '@/lib/roadmap';

export default async function Roadmap() {
  const htmlContent = await getRoadmapHtmlContent();

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
