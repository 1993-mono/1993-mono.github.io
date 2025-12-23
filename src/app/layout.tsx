import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "./components/Navigation";
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
        <div id="wrapper">
          <header>
            <h1 className="logo"><Link href="/">DevFolio</Link></h1>
            <Navigation />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}