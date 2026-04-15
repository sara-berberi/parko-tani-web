import { ReactNode } from "react";

type Variant = "iphone" | "android" | "ipad";

interface Props {
  variant?: Variant;
  children?: ReactNode;
  className?: string;
}

/**
 * Device mockup primitive. Aspect ratio is locked; parent controls width.
 * Children render inside the screen. If no children, a subtle placeholder shows.
 */
export function DeviceFrame({ variant = "iphone", children, className = "" }: Props) {
  if (variant === "ipad") {
    return (
      <div
        className={`relative ${className}`}
        style={{ aspectRatio: "3 / 4" }}
      >
        <div
          className="absolute inset-0 bg-ink-900 rounded-[28px] p-3 shadow-device"
          style={{ boxShadow: "0 40px 80px -20px rgba(11,18,32,0.35), 0 12px 24px -12px rgba(11,18,32,0.2), inset 0 0 0 1.5px rgba(255,255,255,0.06)" }}
        >
          <div className="relative w-full h-full bg-ink-100 rounded-[18px] overflow-hidden">
            {children ?? <ScreenPlaceholder />}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "android") {
    return (
      <div
        className={`relative ${className}`}
        style={{ aspectRatio: "9 / 19.5" }}
      >
        <div
          className="absolute inset-0 bg-ink-900 rounded-[38px] p-[5px] shadow-device"
          style={{ boxShadow: "0 40px 80px -20px rgba(11,18,32,0.35), 0 12px 24px -12px rgba(11,18,32,0.2), inset 0 0 0 1.5px rgba(255,255,255,0.08)" }}
        >
          <div className="relative w-full h-full bg-ink-100 rounded-[34px] overflow-hidden">
            {/* Android punch-hole camera */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-ink-900 z-10" />
            {children ?? <ScreenPlaceholder />}
          </div>
        </div>
      </div>
    );
  }

  // iPhone (default)
  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: "9 / 19.5" }}
    >
      <div
        className="absolute inset-0 bg-ink-900 rounded-[44px] p-[6px] shadow-device"
        style={{ boxShadow: "0 40px 80px -20px rgba(11,18,32,0.35), 0 12px 24px -12px rgba(11,18,32,0.2), inset 0 0 0 1.5px rgba(255,255,255,0.1)" }}
      >
        <div className="relative w-full h-full bg-ink-100 rounded-[38px] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[32%] h-[22px] rounded-full bg-ink-900 z-10" />
          {children ?? <ScreenPlaceholder />}
        </div>
      </div>
    </div>
  );
}

function ScreenPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-paper-100 to-paper-200">
      <div className="text-[10px] tracking-[0.2em] uppercase text-ink-400 font-medium">
        Parko Tani
      </div>
    </div>
  );
}
