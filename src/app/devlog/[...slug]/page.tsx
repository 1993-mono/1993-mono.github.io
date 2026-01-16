import { notFound } from 'next/navigation';
import { getAllDevlogSlugs, getDevlogPost } from '@/lib/devlog';
import Breadcrumb from '@/app/components/Breadcrumb';
import './styles.scss';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllDevlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export default async function DevlogPost({ params }: PageProps) {
  const { slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const post = await getDevlogPost(slugString);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { children: '개발 기록' },
    ...(Array.isArray(slug) && slug.length > 1
      ? slug.slice(0, -1).map((part) => ({
        children: part,
      }))
      : []),
  ];

  return (
    <>
      <Breadcrumb
        backLink={{
          href: '/devlog',
        }}
        items={breadcrumbItems}
      />
      <article className="post-page">
        <div className="post-header">
          <h1 className="title">{post.title}</h1>
          <p className="date">{post.date}</p>
        </div>
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
        />
      </article>
    </>
  );
}