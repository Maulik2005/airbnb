import { useEffect } from "react";

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    document.body.classList.add("scroll-lock");
    return () => document.body.classList.remove("scroll-lock");
  }, [locked]);
}
