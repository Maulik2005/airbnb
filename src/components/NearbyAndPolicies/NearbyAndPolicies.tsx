import { Calendar, ChevronLeft, ChevronRight, KeyRound, Shield } from "lucide-react";
import { useRef, useState } from "react";
import { formatINR } from "../../lib/format";
import type { Listing } from "../../types";
import styles from "./NearbyAndPolicies.module.css";

export function ThingsToKnow({ listing, onLearn }: { listing: Listing; onLearn: (title: string, body: string) => void }) {
  const { cancellation, rules, safety } = listing.policies;
  return (
    <section className={styles.things} id="policies" aria-labelledby="know-title">
      <h2 id="know-title">Things to know</h2>
      <div className={styles.columns}>
        <article>
          <Calendar size={24} />
          <h3>{cancellation.title}</h3>
          <p>{cancellation.summary}</p>
          <button type="button" onClick={() => onLearn(cancellation.title, cancellation.body)}>Learn more</button>
        </article>
        <article>
          <KeyRound size={24} />
          <h3>{rules.title}</h3>
          {rules.lines.map((line) => <p key={line}>{line}</p>)}
          <button type="button" onClick={() => onLearn(rules.title, rules.body)}>Learn more</button>
        </article>
        <article>
          <Shield size={24} />
          <h3>{safety.title}</h3>
          {safety.lines.map((line) => <p key={line}>{line}</p>)}
          <button type="button" onClick={() => onLearn(safety.title, safety.body)}>Learn more</button>
        </article>
      </div>
    </section>
  );
}

const PAGE_COUNT = 2;

function ratingLabel(rating: number) {
  const hundredths = Math.round(rating * 100) % 10;
  return hundredths === 0 ? rating.toFixed(1) : rating.toFixed(2);
}

export function NearbyStays({ listing }: { listing: Listing }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const photos = Object.fromEntries(listing.photos.map((photo) => [photo.id, photo]));

  const syncPage = () => {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setPage(max > 0 && node.scrollLeft > max / 2 ? PAGE_COUNT : 1);
  };

  const scrollByPage = (direction: number) => {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    node.scrollTo({ left: direction > 0 ? max : 0, behavior: "smooth" });
  };

  return (
    <section className={styles.nearby} aria-labelledby="nearby-title">
      <div className={styles.head}>
        <h2 id="nearby-title">More stays nearby</h2>
        <div className={styles.pager}>
          <span>{page} / {PAGE_COUNT}</span>
          <button type="button" aria-label="Previous stays" onClick={() => scrollByPage(-1)} disabled={page === 1}><ChevronLeft size={16} /></button>
          <button type="button" aria-label="Next stays" onClick={() => scrollByPage(1)} disabled={page === PAGE_COUNT}><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className={styles.row} ref={scroller} onScroll={syncPage}>
        {listing.nearby.map((stay) => {
          const photo = photos[stay.photoId];
          return (
            <article key={stay.id} className={styles.card}>
              <img src={photo?.src} alt={stay.title} />
              <h3>{stay.title}</h3>
              <p>{formatINR(stay.price)} <span>★ {ratingLabel(stay.rating)}</span></p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
