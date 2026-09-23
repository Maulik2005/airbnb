import { ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-react";
import { useEffect, useRef, type RefObject } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { usePresence } from "../../hooks/usePresence";
import type { Photo } from "../../types";
import styles from "./Lightbox.module.css";

type LightboxProps = {
  photos: Photo[];
  index: number | null;
  titleFor: (photo: Photo) => string;
  onClose: () => void;
  onChange: (index: number) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  onMountedChange?: (mounted: boolean) => void;
};

export function Lightbox({
  photos,
  index,
  titleFor,
  onClose,
  onChange,
  returnFocusRef,
  onMountedChange,
}: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const { mounted, visible } = usePresence(open, 240);
  const activeIndex = index ?? 0;
  useFocusTrap(ref, open && visible, returnFocusRef);

  useEffect(() => {
    onMountedChange?.(mounted);
  }, [mounted, onMountedChange]);

  useEffect(() => {
    if (!open || index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onChange(Math.max(0, index - 1));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onChange(Math.min(photos.length - 1, index + 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, onChange, photos.length]);

  if (!mounted || photos.length === 0) return null;
  const photo = photos[Math.min(activeIndex, photos.length - 1)];

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ""}`}
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={titleFor(photo)}
      tabIndex={-1}
    >
      <header className={styles.top}>
        <button type="button" className={styles.icon} onClick={onClose} aria-label="Back to photo tour">
          <LayoutGrid size={18} />
        </button>
        <h2>{titleFor(photo)}</h2>
        <div className={styles.right}>
          <span aria-live="polite">
            {activeIndex + 1} of {photos.length}
          </span>
          <button type="button" className={styles.icon} data-autofocus onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
      </header>
      <div className={styles.stage}>
        <button
          type="button"
          className={styles.nav}
          aria-label="Previous photo"
          disabled={activeIndex === 0}
          onClick={() => onChange(activeIndex - 1)}
        >
          <ChevronLeft size={22} />
        </button>
        <div className={styles.frame}>
          <img key={photo.id} src={photo.src} alt={photo.alt} className={styles.image} />
        </div>
        <button
          type="button"
          className={styles.nav}
          aria-label="Next photo"
          disabled={activeIndex === photos.length - 1}
          onClick={() => onChange(activeIndex + 1)}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
