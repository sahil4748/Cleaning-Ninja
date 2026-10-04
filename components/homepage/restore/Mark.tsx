import { Logo } from "@/components/brand/Logo";
import type { SVGProps } from "react";

export function Wordmark({ tone = "auto" }: { tone?: "auto" | "light" | "dark" }) {
  return <Logo tone={tone} height={44} className="rs-logo" />;
}

export function Arrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
