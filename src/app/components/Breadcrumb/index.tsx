import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import './styles.scss';

interface BreadcrumbItem {
  href: string;
  children: React.ReactNode;
}

interface BreadcrumbProps {
  backLink?: {
    href: string;
    children?: React.ReactNode;
  };
  items: BreadcrumbItem[];
  ariaLabel?: string;
}

export default function Breadcrumb({
  backLink,
  items,
  ariaLabel = '페이지 경로',
}: BreadcrumbProps) {
  const defaultBackLinkChildren = (
    <>
      <span className="icn-container"><ArrowLeftIcon className="icn" /></span>
      <span className="txt">목록으로 돌아가기</span>
    </>
  );

  return (
    <div className="breadcrumb-container">
      {backLink && (
        <Link href={backLink.href} className="back-link">
          {backLink.children ?? defaultBackLinkChildren}
        </Link>
      )}
      <nav aria-label={ariaLabel}>
        <ol>
          {items.map((item, idx) => (
            <li key={idx}>
              <Link href={item.href}>{item.children}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}