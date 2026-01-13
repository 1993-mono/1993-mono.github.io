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
    { href: '/devlog', children: '개발 기록' },
    ...(Array.isArray(slug) && slug.length > 1
      ? slug.slice(0, -1).map((part, idx) => {
        const path = '/devlog/' + slug.slice(0, idx + 1).join('/');
        return { href: path, children: part };
      })
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
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{post.date}</p>
        <div
          className="devlog-content"
          dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
        />
      </article>
    </>
  );
}