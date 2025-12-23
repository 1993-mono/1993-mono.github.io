import Link from 'next/link';
import { getAllDevlogPosts, type DevlogPost } from '@/lib/devlog';

export default function Devlog() {
  const posts = getAllDevlogPosts();

  return (
    <main id="devlog" className="flex-1 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">개발 기록</h2>
      {posts.length === 0 ? (
        <p className="text-gray-600">아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post: DevlogPost) => (
            <li key={post.slug}>
              <Link
                href={`/devlog/${post.slug}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}