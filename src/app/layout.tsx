import type { Metadata } from "next";
import ResponsiveLayout from "./components/ResponsiveLayout";
import ResponsiveDetector from "./components/ResponsiveDetector";
import { SITE_NAME, MENU } from "@/lib/constants";
import "./styles.scss";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: MENU.HOME.description,
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