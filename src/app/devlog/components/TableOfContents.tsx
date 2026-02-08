'use client';

import type { TocItem } from '@/lib/markdown';

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="table-of-contents" aria-label="목차">
      <h2 className="toc-title">목차</h2>
      <ul className="toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className="toc-item"
            data-depth={item.depth}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="toc-link"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
