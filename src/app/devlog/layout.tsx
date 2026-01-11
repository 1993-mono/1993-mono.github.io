import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개발 기록 | DevFolio',
  description: '개발 과정에서 배운 것들과 기록들',
};

export default function DevlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main id="devlog">{children}</main>;
}