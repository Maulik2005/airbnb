import { Check, KeyRound, MapPin, MessageCircle, Sparkles, Tag } from "lucide-react";
import type { ReactNode } from "react";
import { Stars } from "../Stars/Stars";
import type { Listing, Review } from "../../types";
import styles from "./Reviews.module.css";

const icons: Record<string, ReactNode> = {
  spark: <Sparkles size={16} />,
  check: <Check size={16} />,
  key: <KeyRound size={16} />,
  chat: <MessageCircle size={16} />,
  pin: <MapPin size={16} />,
  tag: <Tag size={16} />,
};

type ReviewsProps = {
  listing: Listing;
  expanded: Record<number, boolean>;
  onToggle: (id: number) => void;
  onShowAll: () => void;
  onHowReviews: (trigger: HTMLElement) => void;
};

export function Reviews({ listing, expanded, onToggle, onShowAll, onHowReviews }: ReviewsProps) {
  const max = Math.max(...listing.distribution.map((item) => item.count), 1);
  const preview = listing.reviews.slice(0, 6);

  return (
    <section className={styles.section} id="reviews" aria-labelledby="reviews-title">
      <div className={styles.hero}>
        <div className={styles.scoreRow}>
          <Laurel flip />
          <p className={styles.score}>{listing.rating.toFixed(2)}</p>
          <Laurel />
        </div>
        <p className={styles.fav}>Guest favourite</p>
        <p className={styles.heroText}>
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button
          type="button"
          className={styles.how}
          onClick={(event) => onHowReviews(event.currentTarget)}
        >
          How reviews work
        </button>
      </div>

      <h2 id="reviews-title">★ {listing.rating.toFixed(2)} · {listing.reviewCount} reviews</h2>
      <div className={styles.summary}>
        <div>
          <p className={styles.caption}>Overall rating</p>
          <div className={styles.bars}>
            {listing.distribution.map((item) => (
              <div key={item.stars} className={styles.barRow}>
                <span>{item.stars}</span>
                <span className={styles.track}><span style={{ width: `${(item.count / max) * 100}%` }} /></span>
              </div>
            ))}
          </div>
        </div>
        <ul className={styles.scores}>
          {listing.ratingBars.map((bar) => (
            <li key={bar.label}>
              <span>{bar.label}</span>
              <strong>{bar.score}</strong>
              {icons[bar.icon]}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.tags} role="list">
        {listing.reviewTags.map((tag) => (
          <span key={tag.id} className={styles.tag} role="listitem">{tag.icon} {tag.label} {tag.count}</span>
        ))}
      </div>
      <div className={styles.grid}>
        {preview.map((review) => (
          <ReviewCard key={review.id} review={review} expanded={Boolean(expanded[review.id])} onToggle={() => onToggle(review.id)} />
        ))}
      </div>
      <button type="button" className={styles.all} onClick={onShowAll}>Show all {listing.reviewCount} reviews</button>
    </section>
  );
}

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`${styles.laurel} ${flip ? styles.flip : ""}`}
      viewBox="0 0 64 96"
      width="56"
      height="84"
      aria-hidden="true"
    >
      <path
        d="M32 8c-6 10-14 18-18 30-3 8-2 18 4 24 4 4 10 6 14 6"
        fill="none"
        stroke="#222"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M18 22c6 2 10 6 12 10" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 36c7 1 12 5 14 9" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 50c7 0 12 3 15 7" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 62c5-1 10 1 13 4" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="20" cy="24" rx="7" ry="3.5" transform="rotate(-35 20 24)" fill="#222" opacity="0.9" />
      <ellipse cx="16" cy="38" rx="7" ry="3.5" transform="rotate(-20 16 38)" fill="#222" opacity="0.9" />
      <ellipse cx="16" cy="52" rx="7" ry="3.5" transform="rotate(-8 16 52)" fill="#222" opacity="0.9" />
      <ellipse cx="22" cy="64" rx="6.5" ry="3.2" transform="rotate(8 22 64)" fill="#222" opacity="0.9" />
    </svg>
  );
}

export function ReviewCard({ review, expanded, onToggle }: { review: Review; expanded: boolean; onToggle: () => void }) {
  const long = review.text.length > 140;
  const text = expanded || !long ? review.text : `${review.text.slice(0, 140).trim()}...`;
  return (
    <article className={styles.card}>
      <header>
        <span className={styles.avatar} style={{ background: review.color }}>{review.initial}</span>
        <div>
          <strong>{review.name}</strong>
          <p>{review.tenure}</p>
        </div>
      </header>
      <p className={styles.when}><Stars value={5} label="5 star review" /> <span>· {review.when}</span></p>
      <p className={styles.text}>{text}</p>
      {long && (
        <button type="button" className={styles.more} onClick={onToggle}>{expanded ? "Show less" : "Show more"}</button>
      )}
    </article>
  );
}
