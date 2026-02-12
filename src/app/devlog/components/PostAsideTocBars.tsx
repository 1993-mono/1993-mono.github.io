'use client';

import type { TocItem } from '@/lib/markdown';

interface PostAsideTocBarsProps {
  items: TocItem[];
}

export default function PostAsideTocBars({ items }: PostAsideTocBarsProps) {
  if (items.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="post-aside-toc-bars" aria-label="목차">
      <ul className="post-aside-toc-barslist">
        {items.map((item) => (
          <li
            key={item.id}
            className="post-aside-toc-barsitem"
            data-depth={item.depth}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="post-aside-toc-barslink"
              aria-label={item.text}
            ></a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
