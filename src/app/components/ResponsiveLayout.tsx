"use client";

import Header from "./Header";
import { useResponsiveStore } from "@/stores/responsive";
import { SITE_NAME } from "@/lib/constants";

export default function ResponsiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = useResponsiveStore((state) => state.mode);

  return (
    <div id="wrapper">
      {mode === "pc" ? (
        <>
          <aside>
            <Header />
            <footer>
              <p>Copyright 2025 {SITE_NAME}.<br /> All Rights Reserved.</p>
            </footer>
          </aside>
          {children}
        </>
      ) : (
        <>
          <Header />
          {children}
          <footer>
            <p>Copyright 2025 DevFolio.<br /> All Rights Reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}