"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const LegacyShell = dynamic(() => import("./LegacyShell"));

/** Keep the approved homepage independent of the internal-page presentation. */
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return ["/", "/legal/privacy", "/legal/terms", "/services/carpet-cleaning"].includes(pathname) ? (
    <>{children}</>
  ) : (
    <LegacyShell>{children}</LegacyShell>
  );
}
