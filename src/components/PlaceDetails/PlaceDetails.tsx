import { Star } from "lucide-react";
import { amenityIcons } from "../../constants/amenityIcons";
import type { Listing, Photo } from "../../types";
import { AvailabilityCalendar } from "../AvailabilityCalendar/AvailabilityCalendar";
import styles from "./PlaceDetails.module.css";

type PlaceDetailsProps = {
  listing: Listing;
  photoById: Record<number, Photo>;
  checkIn: string | null;
  checkOut: string | null;
  summary: string;
  month: Date;
  keyboardDates: boolean;
  onChangeDates: (start: string | null, end: string | null) => void;
  onVisibleMonth: (month: Date) => void;
  onToggleKeyboard: () => void;
};

export function PlaceDetails({
  listing,
  photoById,
  checkIn,
  checkOut,
  summary,
  month,
  keyboardDates,
  onChangeDates,
  onVisibleMonth,
  onToggleKeyboard,
}: PlaceDetailsProps) {
  return (
    <div>
      <h2 className={styles.subtitle}>{listing.subtitle}</h2>
      <p className={styles.specs}>{listing.specs.join(" · ")}</p>

      <section className={styles.favourite} aria-label="Guest favourite">
        <div className={styles.favouriteLeft}>
          <span className={styles.rosette} aria-hidden="true">🏵️</span>
          <div>
            <p className={styles.favouriteTitle}>{listing.guestFavourite.title}</p>
            <p className={styles.favouriteCopy}>{listing.guestFavourite.subtitle}</p>
          </div>
          <span className={styles.rosette} aria-hidden="true">🏵️</span>
        </div>
        <div className={styles.ratingBlock}>
          <div className={styles.ratingScore}>
            <strong>{listing.rating.toFixed(2)}</strong>
            <span className={styles.starRow} aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={12} fill="#222222" stroke="none" />
              ))}
            </span>
          </div>
          <div className={styles.reviewCount}>
            <strong>{listing.reviewCount}</strong>
            <span>Reviews</span>
          </div>
        </div>
      </section>

      <section className={styles.hostRow}>
        <span className={styles.hostAvatar} aria-hidden="true">{listing.host.initials}</span>
        <div>
          <strong>Hosted by {listing.host.name}</strong>
          <p>{listing.host.yearsHosting} years hosting</p>
        </div>
      </section>

      <section className={styles.sleep} aria-labelledby="sleep-title">
        <h2 id="sleep-title">Where you'll sleep</h2>
        <div className={styles.sleepGrid}>
          {listing.sleep.map((room) => (
            <article key={room.title}>
              <img src={photoById[room.photoId]?.src} alt={room.title} />
              <h3>{room.title}</h3>
              <p>{room.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.amenities} id="amenities" aria-labelledby="amenities-title">
        <h2 id="amenities-title">What this place offers</h2>
        <ul>
          {listing.amenities.map((amenity) => (
            <li key={amenity.id}>
              {amenityIcons[amenity.icon]}
              <span>{amenity.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <AvailabilityCalendar
        checkIn={checkIn}
        checkOut={checkOut}
        summary={summary}
        onChange={onChangeDates}
        visibleMonth={month}
        onVisibleMonth={onVisibleMonth}
        keyboard={keyboardDates}
        onToggleKeyboard={onToggleKeyboard}
      />
    </div>
  );
}
