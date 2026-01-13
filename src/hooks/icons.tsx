import React from "react";

export function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5h13" />
    </svg>
  );
}

export function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M22 16.92V21a1 1 0 0 1-1.11 1c-6.59-.58-12-5.66-12-12.25A1 1 0 0 1 10 8h4.09a1 1 0 0 1 1 .91c.13 1.21.56 2.4 1.26 3.45a1 1 0 0 1-.21 1.36l-2.2 1.65a16 16 0 0 0 6.1 6.1l1.65-2.21a1 1 0 0 1 1.36-.21c1.05.7 2.24 1.13 3.45 1.26a1 1 0 0 1 .91 1z" />
    </svg>
  );
}

export function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ✅ Add Sun and Moon icons
export function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" strokeWidth="2" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        strokeWidth="2"
      />
    </svg>
  );
}

export function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        d="M21 12.79A9 9 0 0 1 12.21 3a7 7 0 0 0 0 14 9 9 0 0 1 8.79-4.21z"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        d="M18 6L6 18M6 6l12 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
