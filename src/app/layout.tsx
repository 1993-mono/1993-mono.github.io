import type { Metadata } from "next";
import Link from "next/link";
import { BriefcaseIcon as BriefcaseIconOutline, DocumentTextIcon as DocumentTextIconOutline } from "@heroicons/react/24/outline";
import { BriefcaseIcon as BriefcaseIconSolid, DocumentTextIcon as DocumentTextIconSolid } from "@heroicons/react/24/solid";
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
        <div id="wrapper" className="flex flex-col min-h-screen">
          <header className="flex justify-between items-center border-b border-gray-200 px-[var(--spacing-container-x)] py-[var(--spacing-header-y)]">
            <h1>
              <Link href="/" className="text-2xl text-gray-950 font-bold">DevFolio</Link>
            </h1>
            <nav>
              <ul className="flex gap-5">
                <li>
                  <Link href="/portfolio" className="group flex items-center gap-1 transition-all duration-300 hover:text-gray-950 hover:font-semibold">
                    <span className="w-4.5 h-4.5 relative">
                      <BriefcaseIconOutline className="w-full h-full absolute top-0 left-0 transition-all duration-300 group-hover:opacity-0" />
                      <BriefcaseIconSolid className="w-full h-full absolute top-0 left-0 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </span>
                    <span>포트폴리오</span>
                  </Link>
                </li>
                <li>
                  <Link href="/devlog" className="group flex items-center gap-1 transition-all duration-300 hover:text-gray-950 hover:font-semibold">
                    <span className="w-4.5 h-4.5 relative">
                      <DocumentTextIconOutline className="w-full h-full absolute top-0 left-0 transition-all duration-300 group-hover:opacity-0" />
                      <DocumentTextIconSolid className="w-full h-full absolute top-0 left-0 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </span>
                    <span>개발 기록</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex-1 flex flex-col px-[var(--spacing-container-x)] py-[var(--spacing-main-y)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}