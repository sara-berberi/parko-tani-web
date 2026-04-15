"use client";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className}>
      <rect width="80" height="80" rx="18" fill="#0b1220" />
      <path d="M24 18 L24 60" stroke="#f6f5f0" strokeWidth="7" strokeLinecap="round" />
      <path
        d="M24 18 C24 18 46 18 46 18 C54 18 60 24 60 32 C60 40 54 46 46 46 L24 46"
        stroke="#f6f5f0"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="58" cy="58" r="5" fill="#1e4d92" />
    </svg>
  );
}
