import { useEffect, useState } from "react";

/**
 * Keeps an overlay mounted through its exit transition.
 * Matches the reference photo-tour pattern: mount at opacity 0, then ease to 1.
 */
export function usePresence(open: boolean, durationMs = 250) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setVisible(true));
      });
      return () => window.cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), durationMs);
    return () => window.clearTimeout(timer);
  }, [open, durationMs]);

  return { mounted, visible };
}
