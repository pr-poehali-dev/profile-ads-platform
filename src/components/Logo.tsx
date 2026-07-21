import { useId } from "react";

interface LogoProps {
  size?: number;
  className?: string;
  /** Render only the white horseshoe mark without the gradient background tile (for use on already-colored panels) */
  light?: boolean;
}

export default function Logo({ size = 40, className = "", light = false }: LogoProps) {
  const gradId = useId();

  if (light) {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12,31 L12,14 A8,8 0 0,1 28,14 L28,31" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="27" r="1.7" fill="currentColor" className="text-black/10" />
        <circle cx="28" cy="27" r="1.7" fill="currentColor" className="text-black/10" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${gradId})`} />
      <path d="M12,31 L12,14 A8,8 0 0,1 28,14 L28,31" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="27" r="1.7" fill={`url(#${gradId})`} />
      <circle cx="28" cy="27" r="1.7" fill={`url(#${gradId})`} />
    </svg>
  );
}
