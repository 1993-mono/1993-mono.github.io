import type { Metadata } from 'next';
import { SITE_NAME, MENU } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${MENU.TODO.name} | ${SITE_NAME}`,
  description: MENU.TODO.description,
};

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main id="todo">{children}</main>;
}