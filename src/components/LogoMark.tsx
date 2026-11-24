/**
 * Minimalist geometric placeholder emblem for NAVYUG.
 * Swap this SVG or replace with an <img> asset when the final logo is ready.
 */
interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className = 'w-8 h-8' }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="10"
        className="fill-[#EEF2FA] dark:fill-[#1D283E] stroke-[#2D4A8A]/25 dark:stroke-[#7CA0F0]/30"
        strokeWidth="1.5"
      />
      <circle
        cx="18"
        cy="18"
        r="9.5"
        className="stroke-[#2D4A8A] dark:stroke-[#7CA0F0]"
        strokeWidth="1.75"
      />
      <path
        d="M18 8.5V18L24.5 14"
        className="stroke-[#2C7A6B] dark:stroke-[#55B8A5]"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="18"
        cy="18"
        r="2.2"
        className="fill-[#2D4A8A] dark:fill-[#7CA0F0]"
      />
    </svg>
  );
}
