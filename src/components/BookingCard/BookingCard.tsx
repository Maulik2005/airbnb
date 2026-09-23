import { ChevronDown, Flag, Tag } from "lucide-react";
import { useState } from "react";
import { formatINR, formatShortDate } from "../../lib/format";
import styles from "./BookingCard.module.css";

type BookingCardProps = {
  checkIn: string | null;
  checkOut: string | null;
  nights: number;
  total: number;
  discountedTotal: number;
  claimed: boolean;
  guests: number;
  maxGuests: number;
  rating: number;
  reviewCount: number;
  cancellationLabel: string;
  onGuests: (count: number) => void;
  onReserve: () => void;
  onReport: () => void;
  onClaim: () => void;
  onJumpToDates: () => void;
};

export function BookingCard(props: BookingCardProps) {
  const [guestOpen, setGuestOpen] = useState(false);
  const price = props.claimed ? props.discountedTotal : props.total;
  const headline = props.nights > 0 ? `${formatINR(price)} for ${props.nights} night${props.nights === 1 ? "" : "s"}` : "Add dates for prices";

  return (
    <div className={styles.stack}>
      <section className={styles.promo}>
        <Tag size={20} strokeWidth={2} className={styles.tagIcon} aria-hidden="true" />
        <p>
          {props.claimed ? "10% discount applied to this stay." : "Get 10% off your next stay."}{" "}
          <a href="#policies">Terms apply</a>
        </p>
        <button type="button" onClick={props.onClaim} disabled={props.claimed}>
          {props.claimed ? "Applied" : "Claim"}
        </button>
      </section>

      <section className={styles.card} aria-label="Booking">
        <h2>{headline}</h2>
        <div className={styles.dates}>
          <button type="button" onClick={props.onJumpToDates}>
            <span>CHECK-IN</span>
            {props.checkIn ? formatShortDate(props.checkIn) : "Add date"}
          </button>
          <button type="button" onClick={props.onJumpToDates}>
            <span>CHECKOUT</span>
            {props.checkOut ? formatShortDate(props.checkOut) : "Add date"}
          </button>
        </div>
        <div className={styles.guests}>
          <button type="button" aria-expanded={guestOpen} onClick={() => setGuestOpen((open) => !open)}>
            <span>GUESTS</span>
            <strong>{props.guests} guest{props.guests === 1 ? "" : "s"}</strong>
            <ChevronDown size={18} />
          </button>
          {guestOpen && (
            <div className={styles.guestPop} role="dialog" aria-label="Guests">
              <GuestRow label="Adults" value={props.guests} min={1} max={props.maxGuests} onChange={props.onGuests} />
              <p>This place has a maximum of {props.maxGuests} guests.</p>
            </div>
          )}
        </div>
        <p className={styles.cancel}>Free cancellation before {props.cancellationLabel}</p>
        <button type="button" className={styles.reserve} onClick={props.onReserve} disabled={props.nights <= 0}>
          Reserve
        </button>
        <p className={styles.note}>You won't be charged yet</p>
        <p className={styles.rating}>★ {props.rating.toFixed(2)} · {props.reviewCount} reviews</p>
      </section>
      <button type="button" className={styles.report} onClick={props.onReport}>
        <Flag size={14} /> Report this listing
      </button>
    </div>
  );
}

function GuestRow({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <div className={styles.row}>
      <span>{label}</span>
      <div>
        <button type="button" aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
        <span>{value}</span>
        <button type="button" aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  );
}
