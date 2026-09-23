import styles from "./StickyNav.module.css";

type StickyNavProps = {
  visible: boolean;
  active: string;
  priceLabel: string;
  rating: number;
  reviewCount: number;
  onReserve: () => void;
};

const links = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
];

export function StickyNav({ visible, active, priceLabel, rating, reviewCount, onReserve }: StickyNavProps) {
  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ""}`} aria-hidden={!visible}>
      <div className={styles.inner}>
        <nav aria-label="Listing sections">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className={active === link.id ? styles.active : ""}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.meta}>
          <p>
            <strong>{priceLabel}</strong>
            <span>★ {rating.toFixed(2)} · {reviewCount} reviews</span>
          </p>
          <button type="button" onClick={onReserve} tabIndex={visible ? 0 : -1}>Reserve</button>
        </div>
      </div>
    </div>
  );
}
