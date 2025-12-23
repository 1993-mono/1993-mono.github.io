"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseIcon as BriefcaseIconOutline,
  DocumentTextIcon as DocumentTextIconOutline,
  HandRaisedIcon as HandRaisedIconOutline,
} from "@heroicons/react/24/outline";
import {
  BriefcaseIcon as BriefcaseIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  HandRaisedIcon as HandRaisedIconSolid,
} from "@heroicons/react/24/solid";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            <span className="icn-container">
              <HandRaisedIconOutline className="icn default" />
              <HandRaisedIconSolid className="icn hover" />
            </span>
            <span className="txt">인사말</span>
          </Link>
        </li>
        <li>
          <Link
            href="/portfolio"
            className={pathname.startsWith("/portfolio") ? "active" : ""}
          >
            <span className="icn-container">
              <BriefcaseIconOutline className="icn default" />
              <BriefcaseIconSolid className="icn hover" />
            </span>
            <span className="txt">포트폴리오</span>
          </Link>
        </li>
        <li>
          <Link
            href="/devlog"
            className={pathname.startsWith("/devlog") ? "active" : ""}
          >
            <span className="icn-container">
              <DocumentTextIconOutline className="icn default" />
              <DocumentTextIconSolid className="icn hover" />
            </span>
            <span className="txt">개발 기록</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

