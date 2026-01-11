"use client";

import Header from "./Header";
import { useResponsiveStore } from "@/stores/responsive";

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
              <p>Copyright 2025 DevFolio.<br /> All Rights Reserved.</p>
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