import type { Metadata } from "next";
import Link from "next/link";
import "./globals.scss";

export const metadata: Metadata = {
  title: "DevFolio",
  description: "포트폴리오 + 개발 기록",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header>
          <h1><Link href="/">DevFolio</Link></h1>
          <nav>
            <ul>
              <li><Link href="/portfolio">포트폴리오</Link></li>
              <li><Link href="/devlog">개발 기록</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}