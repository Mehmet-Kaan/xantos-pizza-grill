import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Navn Icon
export function UserIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"
        fill="currentColor"
      />
    </svg>
  );
}

// E-mail Icon
export function MailIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M7.2 3.1 5.4 4.3c-.8.5-1.2 1.5-1 2.4.9 4.2 4 7.7 8.1 8.9.9.3 1.9 0 2.4-.8l1.3-1.9c.4-.6.2-1.5-.4-2l-1.6-1.1c-.6-.4-1.3-.3-1.8.2l-.7.8c-1.2-.5-2.4-1.7-2.9-2.9l.8-.7c.5-.5.6-1.3.2-1.9L9.2 3.4C8.8 2.8 7.9 2.7 7.2 3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TrashIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M6 6l1 14h10l1-14" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

export function InCartIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Cart base */}
      <path d="M6 6h15l-1.5 9H6z" />
      {/* Wheels */}
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      {/* Check mark inside cart */}
      <path d="M9 10l2 2 4-4" />
    </svg>
  );
}

export function CheckedIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M7.3 5h13.2l-1.3 7.4c-.2 1-1 1.6-2 1.6H9.2c-1 0-1.8-.6-2-1.6L6 4H3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19" r="1.4" fill="currentColor" />
      <circle cx="17" cy="19" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M5 12h12.5M13 7.5 17.5 12 13 16.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PizzaIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M4.3 6.2 12 3.5l7.7 2.7L12 20.5 4.3 6.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="1.1" fill="currentColor" />
      <circle cx="9.5" cy="12.2" r="0.9" fill="currentColor" />
      <circle cx="14.7" cy="13.3" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

export function ContactIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
