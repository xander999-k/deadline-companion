import { GRIK_AI_LOGO } from "@/assets/grik_ai_logo";

interface LogoProps {
  size?: number;        // height in px, width auto-scales
  showText?: boolean;   // logo already has text baked in
  className?: string;
}

export function Logo({ size = 36, className = "" }: LogoProps) {
  return (
    <img
      src={GRIK_AI_LOGO}
      alt="GRIK AI"
      height={size}
      style={{ height: size, width: "auto", display: "block" }}
      className={className}
    />
  );
}
