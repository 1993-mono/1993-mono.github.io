"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  BriefcaseIcon as BriefcaseIconOutline,
  DocumentTextIcon as DocumentTextIconOutline,
  HandRaisedIcon as HandRaisedIconOutline,
  CheckCircleIcon as CheckCircleIconOutline,
} from "@heroicons/react/24/outline";
import {
  BriefcaseIcon as BriefcaseIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  HandRaisedIcon as HandRaisedIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
} from "@heroicons/react/24/solid";
import { useResponsiveStore } from "@/stores/responsive";
import { useDevlogStore } from "@/stores/devlog";
import { SITE_NAME, MENU } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

function NavMenu() {
  const pathname = usePathname();
  const resetTabs = useDevlogStore((state) => state.resetTabs);

  return (
    <ul className="depth-1">
      <li>
        <Link
          href="/"
          className={pathname === "/" ? "active" : ""}
          onClick={resetTabs}
        >
          <span className="icn-container">
            <HandRaisedIconOutline className="icn default" />
            <HandRaisedIconSolid className="icn hover" />
          </span>
          <span className="txt">{MENU.HOME.name}</span>
        </Link>
      </li>
      <li>
        <Link
          href="/portfolio"
          className={pathname.startsWith("/portfolio") ? "active" : ""}
          onClick={resetTabs}
        >
          <span className="icn-container">
            <BriefcaseIconOutline className="icn default" />
            <BriefcaseIconSolid className="icn hover" />
          </span>
          <span className="txt">{MENU.PORTFOLIO.name}</span>
        </Link>
      </li>
      <li>
        <Link
          href="/devlog"
          className={pathname.startsWith("/devlog") ? "active" : ""}
          onClick={resetTabs}
        >
          <span className="icn-container">
            <DocumentTextIconOutline className="icn default" />
            <DocumentTextIconSolid className="icn hover" />
          </span>
          <span className="txt">{MENU.DEVLOG.name}</span>
        </Link>
      </li>
      <li>
        <Link
          href="/todo"
          className={pathname.startsWith("/todo") ? "active" : ""}
          onClick={resetTabs}
        >
          <span className="icn-container">
            <CheckCircleIconOutline className="icn default" />
            <CheckCircleIconSolid className="icn hover" />
          </span>
          <span className="txt">{MENU.TODO.name}</span>
        </Link>
      </li>
    </ul>
  );
}

export default function Header() {
  const mode = useResponsiveStore((state) => state.mode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <h1 className="logo"><Link href="/">{SITE_NAME}</Link></h1>
      {mode === "mobile" && (
        <button type="button" className="menu-button" aria-label="Open menu" onClick={handleMenuButtonClick}><Bars3Icon /></button>
      )}
      {mode === "pc" ? (
        <nav>
          <NavMenu />
        </nav>
      ) : (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <div className="nav-title">
                <button type="button" className="menu-button" aria-label="Close menu" onClick={handleMenuButtonClick}><XMarkIcon /></button>
              </div>
              <NavMenu />
            </motion.nav>
          )}
        </AnimatePresence>
      )}
    </header>
  );
}