import type { Metadata } from 'next';
import { SITE_NAME, MENU } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${MENU.ROADMAP.name} | ${SITE_NAME}`,
  description: MENU.ROADMAP.description,
};

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main id="roadmap">{children}</main>;
}
