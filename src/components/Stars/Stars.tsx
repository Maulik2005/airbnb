import styles from "./Stars.module.css";

type StarsProps = {
  value?: number;
  label?: string;
};

export function Stars({ value = 5, label = "5 stars" }: StarsProps) {
  const fill = Math.max(0, Math.min(5, value));
  return (
    <span className={styles.stars} role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => {
        const amount = Math.max(0, Math.min(1, fill - index));
        return (
          <span key={index} className={styles.star} aria-hidden="true">
            <span className={styles.empty}>★</span>
            <span className={styles.full} style={{ width: `${amount * 100}%` }}>★</span>
          </span>
        );
      })}
    </span>
  );
}
