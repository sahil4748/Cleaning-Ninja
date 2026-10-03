import type { SVGProps } from "react";

const n = "M18 46V18h6l16 19V18h6v28h-6L24 27v19Z";

/** Square room with a negative-space N: two walls and the blade of light between them. */
export function Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...props}>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="currentColor" />
      <path d={n} fill="var(--mark-cut, #ffffff)" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="rs-brand">
      <Mark className="rs-brand-mark" />
      <span className="rs-brand-word">
        Cleaning <em>Ninja</em>
      </span>
    </span>
  );
}

export function Arrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
