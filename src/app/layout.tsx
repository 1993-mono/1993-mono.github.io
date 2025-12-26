import type { Metadata } from "next";
import ResponsiveLayout from "./components/ResponsiveLayout";
import ResponsiveDetector from "./components/ResponsiveDetector";
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
        <ResponsiveDetector />
        <ResponsiveLayout>{children}</ResponsiveLayout>
      </body>
    </html>
  );
}