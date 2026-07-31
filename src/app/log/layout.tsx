import type { Metadata } from 'next';
import { SITE_NAME, MENU } from '@/lib/constants';
import './styles.scss';

export const metadata: Metadata = {
  title: `${MENU.LOG.name} | ${SITE_NAME}`,
  description: MENU.LOG.description,
};

export default function LogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main id="log">{children}</main>;
}