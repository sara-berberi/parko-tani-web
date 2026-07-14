"use client";

import { useEffect, useState } from "react";

/* The journey is laid out fundamentally differently below `lg`: the copy moves
   from a left column to a bottom card, so the camera has to frame the city
   centrally instead of dodging text. That's a layout decision, not just a
   style, so it needs to reach JS — a media query alone can't do it.

   Starts false and corrects after mount, so SSR always renders the desktop
   layout and hydration never mismatches. */
export function useIsMobile(query = "(max-width: 1023px)") {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return isMobile;
}
