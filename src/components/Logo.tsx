"use client";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className}>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a88e0" />
          <stop offset="100%" stopColor="#1848a0" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="20" fill="url(#logo-grad)" />
      <rect width="80" height="40" rx="20" fill="rgba(255,255,255,0.12)" />
      <line x1="0" y1="52" x2="80" y2="52" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      <line x1="30" y1="52" x2="30" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      <line x1="54" y1="52" x2="54" y2="80" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
      <path d="M22 16 L22 56" stroke="white" strokeWidth="7" strokeLinecap="round" />
      <path
        d="M22 16 C22 16 46 16 46 16 C54 16 60 22 60 30 C60 38 54 44 46 44 L22 44"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="62" cy="62" r="10" fill="white" opacity="0.12" />
      <circle cx="62" cy="62" r="5" fill="white" opacity="0.9" />
      <circle cx="62" cy="62" r="2.5" fill="url(#logo-grad)" />
    </svg>
  );
}
