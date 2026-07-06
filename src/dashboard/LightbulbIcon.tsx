export function LightbulbIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 2.5a5.5 5.5 0 0 0-3 10.1c.5.35.8.9.8 1.5v.4h4.4v-.4c0-.6.3-1.15.8-1.5A5.5 5.5 0 0 0 10 2.5Z"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path d="M8.2 17h3.6M8.7 18.5h2.6" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
    </svg>
  );
}
