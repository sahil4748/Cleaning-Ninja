import Link from "next/link";

export function NinjaMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M8 34V14h8l16 20h8V14h-8v11L16 14"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path d="m34 4 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="currentColor" />
    </svg>
  );
}
export default function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`cn-brand${light ? " cn-brand-light" : ""}`}
      aria-label="Cleaning Ninja home"
    >
      <NinjaMark />
      <span>
        cleaning
        <span>
          ninja<span className="cn-brand-dot">.</span>
        </span>
      </span>
    </Link>
  );
}
