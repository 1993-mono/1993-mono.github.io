'use client';

import type { TocItem } from '@/lib/markdown';

interface PostAsideTocProps {
  items: TocItem[];
}

export default function PostAsideToc({ items }: PostAsideTocProps) {
  if (items.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="post-aside-toc" aria-label="목차">
      <ul className="post-aside-toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className="post-aside-toc-item"
            data-depth={item.depth}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="post-aside-toc-link"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
