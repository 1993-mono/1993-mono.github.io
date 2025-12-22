import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllDevlogSlugs, getDevlogPost } from '@/lib/devlog';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllDevlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function DevlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getDevlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Link
        href="/devlog"
        className="inline-block mb-6 text-gray-600 hover:text-gray-950 transition-colors"
      >
        ← 목록으로 돌아가기
      </Link>
      <article className="prose prose-gray max-w-none">
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

