import Link from "next/link";
export function NinjaMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 5C13.5 5 5 13.5 5 24h14c0-2.8 2.2-5 5-5V5ZM43 24c0 10.5-8.5 19-19 19V29c2.8 0 5-2.2 5-5h14ZM24 5c10.5 0 19 8.5 19 19H29c0-2.8-2.2-5-5-5V5ZM5 24c0 10.5 8.5 19 19 19V29c-2.8 0-5-2.2-5-5H5Z"
        fill="currentColor"
      />
      <path d="m12 31 19-19 5 5-19 19z" fill="var(--cn-paper, #f6f4ed)" />
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
