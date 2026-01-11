import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getAllDevlogSlugs, getDevlogPost } from '@/lib/devlog';
import './styles.scss';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllDevlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.split('/'), // 슬래시로 분리하여 배열로 변환
  }));
}

export default async function DevlogPost({ params }: PageProps) {
  const { slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join('/') : slug; // 배열을 문자열로 조인
  const post = await getDevlogPost(slugString);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="devlog-header">
          <Link href="/devlog" className="breadcrumb-back">
            <ArrowLeftIcon className="icn" />
            <span className="txt">목록으로 돌아가기</span>
          </Link>
          <nav className="breadcrumb" aria-label="페이지 경로">
            <ol>
              <li>
                <Link href="/devlog">개발 기록</Link>
              </li>
              {Array.isArray(slug) && slug.length > 1 && (
                <>
                  {slug.slice(0, -1).map((part, idx) => {
                    const path = '/devlog/' + slug.slice(0, idx + 1).join('/');
                    return (
                      <li key={idx}>
                        <Link href={path}>{part}</Link>
                      </li>
                    );
                  })}
                </>
              )}
            </ol>
          </nav>
      </div>
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