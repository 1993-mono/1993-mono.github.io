import type { Metadata } from 'next';
import { SITE_NAME, MENU } from '@/lib/constants';
import './styles.scss';

export const metadata: Metadata = {
  title: `${MENU.PORTFOLIO.name} | ${SITE_NAME}`,
  description: MENU.PORTFOLIO.description,
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main id="portfolio">{children}</main>;
}