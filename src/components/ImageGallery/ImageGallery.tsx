import type { Photo } from "../../types";
import styles from "./ImageGallery.module.css";

type ImageGalleryProps = {
  photos: Photo[];
  onOpenTour: (photoId: number | undefined, trigger: HTMLElement) => void;
  showAllRef: (node: HTMLButtonElement | null) => void;
};

export function ImageGallery({ photos, onOpenTour, showAllRef }: ImageGalleryProps) {
  const hero = photos.slice(0, 5);
  return (
    <section className={styles.gallery} aria-label="Photo gallery">
      {hero.map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          className={`${styles.tile} ${styles[`tile${index + 1}`]}`}
          onClick={(event) => onOpenTour(photo.id, event.currentTarget)}
          aria-label={`View photo: ${photo.alt}`}
        >
          <img src={photo.src} alt={photo.alt} />
        </button>
      ))}
      <button type="button" className={styles.showAll} onClick={(event) => onOpenTour(undefined, event.currentTarget)} ref={showAllRef} aria-label="Show all photos">
        <NineDots />
        Show all photos
      </button>
    </section>
  );
}

function NineDots() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => {
        const x = (i % 3) * 5 + 2;
        const y = Math.floor(i / 3) * 5 + 2;
        return <rect key={i} x={x} y={y} width="2.2" height="2.2" rx="0.4" fill="currentColor" />;
      })}
    </svg>
  );
}
