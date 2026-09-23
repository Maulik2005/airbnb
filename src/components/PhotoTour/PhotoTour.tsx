import { ChevronLeft, Heart, Upload } from "lucide-react";
import { useEffect, useRef, type RefObject } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { usePresence } from "../../hooks/usePresence";
import type { Listing, Photo } from "../../types";
import styles from "./PhotoTour.module.css";

type PhotoTourProps = {
  listing: Listing;
  open: boolean;
  focusPhotoId: number | null;
  saved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
  onClose: () => void;
  onOpenPhoto: (index: number, trigger: HTMLElement) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  onMountedChange?: (mounted: boolean) => void;
};

/** Airbnb-style rows: full-width singles and side-by-side pairs. */
function toMasonryRows(photos: Photo[]) {
  const rows: Photo[][] = [];
  let index = 0;

  if (photos.length === 2) {
    // Two large stacked shots (matches Living room 2 style in the reference)
    rows.push([photos[0]]);
    rows.push([photos[1]]);
    return rows;
  }

  if (photos.length === 3) {
    // One wide hero, then a pair (matches Living room 1 style)
    rows.push([photos[0]]);
    rows.push([photos[1], photos[2]]);
    return rows;
  }

  while (index < photos.length) {
    const remaining = photos.length - index;
    if (remaining === 1) {
      rows.push([photos[index]]);
      index += 1;
    } else if (remaining === 3) {
      rows.push([photos[index]]);
      rows.push([photos[index + 1], photos[index + 2]]);
      index += 3;
    } else {
      rows.push([photos[index], photos[index + 1]]);
      index += 2;
    }
  }

  return rows;
}

export function PhotoTour({
  listing,
  open,
  focusPhotoId,
  saved,
  onToggleSave,
  onShare,
  onClose,
  onOpenPhoto,
  returnFocusRef,
  onMountedChange,
}: PhotoTourProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { mounted, visible } = usePresence(open, 280);
  useFocusTrap(ref, open && visible, returnFocusRef);

  useEffect(() => {
    onMountedChange?.(mounted);
  }, [mounted, onMountedChange]);

  useEffect(() => {
    if (!open || !visible || !focusPhotoId) return;
    const node = document.getElementById(`tour-photo-${focusPhotoId}`);
    node?.scrollIntoView({ block: "center" });
  }, [open, visible, focusPhotoId]);

  if (!mounted) return null;

  const coverFor = (categoryId: string) => listing.photos.find((photo) => photo.category === categoryId);

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ""}`}
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      tabIndex={-1}
    >
      <header className={styles.top}>
        <button type="button" className={styles.icon} data-autofocus onClick={onClose} aria-label="Close photo tour">
          <ChevronLeft size={20} />
        </button>
        <h2>Photo tour</h2>
        <div className={styles.actions}>
          <button type="button" className={styles.icon} onClick={onShare} aria-label="Share">
            <Upload size={18} />
          </button>
          <button
            type="button"
            className={`${styles.icon} ${saved ? styles.saved : ""}`}
            onClick={onToggleSave}
            aria-pressed={saved}
            aria-label={saved ? "Saved" : "Save"}
          >
            <Heart size={18} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </header>

      <div className={styles.body} ref={bodyRef}>
        <nav className={styles.categories} aria-label="Photo categories">
          {listing.categories.map((category, index) => {
            const cover = coverFor(category.id);
            return (
              <a
                key={category.id}
                href={`#tour-${category.id}`}
                className={styles.category}
                style={{ transitionDelay: visible ? `${40 + index * 25}ms` : "0ms" }}
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById(`tour-${category.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <img src={cover?.src} alt="" />
                <span>{category.title}</span>
              </a>
            );
          })}
        </nav>

        {listing.categories.map((category, sectionIndex) => {
          const photos = listing.photos.filter((photo) => photo.category === category.id);
          const rows = toMasonryRows(photos);
          return (
            <section
              key={category.id}
              id={`tour-${category.id}`}
              className={styles.section}
              style={{ transitionDelay: visible ? `${70 + sectionIndex * 35}ms` : "0ms" }}
            >
              <div className={styles.copy}>
                <h3>{category.title}</h3>
                <p>{category.caption}</p>
              </div>
              <div className={styles.masonry}>
                {rows.map((row, rowIndex) => (
                  <div
                    key={`${category.id}-row-${rowIndex}`}
                    className={row.length === 1 ? styles.rowFull : styles.rowPair}
                  >
                    {row.map((photo) => (
                      <PhotoButton
                        key={photo.id}
                        photo={photo}
                        index={listing.photos.findIndex((item) => item.id === photo.id)}
                        onOpen={onOpenPhoto}
                        wide={row.length === 1}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function PhotoButton({
  photo,
  index,
  onOpen,
  wide,
}: {
  photo: Photo;
  index: number;
  onOpen: (index: number, trigger: HTMLElement) => void;
  wide: boolean;
}) {
  return (
    <button
      type="button"
      id={`tour-photo-${photo.id}`}
      className={`${styles.photo} ${wide ? styles.photoWide : styles.photoHalf}`}
      onClick={(event) => onOpen(index, event.currentTarget)}
      aria-label={`Open ${photo.alt} in full view`}
    >
      <img src={photo.src} alt={photo.alt} />
    </button>
  );
}
