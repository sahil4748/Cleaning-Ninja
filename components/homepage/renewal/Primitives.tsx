import type { SVGProps } from "react";
import { Logo } from "@/components/brand/Logo";

const monogramPath =
  "M10 56V20C10 12.27 16.27 6 24 6h3l17 24V6h10v38c0 7.73-6.27 14-14 14h-3L20 34v22H10Z";

export function Arrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 19 19 5M5 5h14v14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path fill="currentColor" d={monogramPath} />
    </svg>
  );
}

export function Brand({ tone = "light" }: { tone?: "light" | "dark" }) {
  return <Logo tone={tone} height={48} className="rn-brand" />;
}
