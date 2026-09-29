import type { SVGProps } from "react";
import "./brand.css";

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

export function Brand() {
  return (
    <span
      className="rn-brand rn-brand--signature"
      role="img"
      aria-label="Cleaning Ninja"
    >
      <svg
        className="rn-brand-signature"
        viewBox="0 0 224 68"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d={monogramPath} />
        <g
          transform="translate(77 3) scale(1.29)"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="square"
          strokeLinejoin="round"
        >
          <path d="M5.5 0H2.5C.85 0 0 1.4 0 4s.85 4 2.5 4h3M11 0v8h5M26 0h-5v8h5m-5-4h4M31 8l3-8h1l3 8m-5.9-2.6h4.8M44 8V0l6 8V0M57 0v8M64 8V0l6 8V0M81 1c-.8-.7-1.8-1-3-1-2.2 0-3.3 1.4-3.3 4S75.8 8 78 8h3V4.3h-2.7" />
        </g>
        <g transform="translate(75 27)" fill="currentColor">
          <path d="M0 29V0h7.5v3.8C9.8.8 13.1-.7 17.2-.7 25-.7 29.5 4.1 29.5 12v17h-8V13.1c0-4.5-2.2-6.9-6.3-6.9-4.5 0-7.2 3.1-7.2 8.1V29H0Z" />
          <path d="M38 0h8v29h-8V0Zm0-11h8v7h-8v-7Z" />
          <path d="M54.5 29V0H62v3.8C64.3.8 67.6-.7 71.7-.7 79.5-.7 84 4.1 84 12v17h-8V13.1c0-4.5-2.2-6.9-6.3-6.9-4.5 0-7.2 3.1-7.2 8.1V29h-8Z" />
          <path d="M92.5 0h8v28.5c0 8-3.7 11.7-11.8 11.7h-3.2v-7h2.7c3 0 4.3-1.4 4.3-4.5V0Zm0-11h8v7h-8v-7Z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M129.5 0h8v29h-8v-3.8c-2.5 3-5.7 4.5-9.7 4.5-8.2 0-13.8-6.1-13.8-15.2S111.6-.7 119.8-.7c4 0 7.2 1.5 9.7 4.5V0ZM122 6c-4.7 0-7.9 3.5-7.9 8.5s3.2 8.5 7.9 8.5 7.9-3.5 7.9-8.5S126.7 6 122 6Z"
          />
        </g>
      </svg>
    </span>
  );
}
