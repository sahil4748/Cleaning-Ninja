export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={down ? "at-arrow at-arrow-down" : "at-arrow"}
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}
export function Mark() {
  return (
    <svg className="at-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M5 21c9 0 15-6 15-16 0 10 6 16 15 16-9 0-15 6-15 14 0-8-6-14-15-14Z"
        fill="currentColor"
      />
      <path d="m7 5 4 4m18 23 4 4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
