import type { Metadata } from "next";
import Link from "next/link";
import { BriefcaseIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import "./styles.scss";

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
        <header className="flex justify-between items-center border-b border-gray-200 px-5 py-2.5">
          <h1>
            <Link href="/" className="text-2xl font-bold">DevFolio</Link>
          </h1>
          <nav>
            <ul className="flex gap-5">
              <li>
                <Link href="/portfolio" className="flex items-center gap-1">
                  <BriefcaseIcon className="w-5 h-5" />
                  <span>포트폴리오</span>
                </Link>
              </li>
              <li>
                <Link href="/devlog" className="flex items-center gap-1">
                  <DocumentTextIcon className="w-5 h-5" />
                  <span>개발 기록</span>
                </Link>
              </li>
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