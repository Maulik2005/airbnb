import { ChevronLeft, ChevronRight, Keyboard } from "lucide-react";
import { monthLabel, parseISODate, toISODate } from "../../lib/format";
import styles from "./AvailabilityCalendar.module.css";

type AvailabilityCalendarProps = {
  checkIn: string | null;
  checkOut: string | null;
  summary: string;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
  visibleMonth: Date;
  onVisibleMonth: (date: Date) => void;
  keyboard: boolean;
  onToggleKeyboard: () => void;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function AvailabilityCalendar({
  checkIn,
  checkOut,
  summary,
  onChange,
  visibleMonth,
  onVisibleMonth,
  keyboard,
  onToggleKeyboard,
}: AvailabilityCalendarProps) {
  const nights = checkIn && checkOut ? Math.round((parseISODate(checkOut).getTime() - parseISODate(checkIn).getTime()) / 86400000) : 0;

  const select = (iso: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, null);
      return;
    }
    if (parseISODate(iso) <= parseISODate(checkIn)) {
      onChange(iso, null);
      return;
    }
    onChange(checkIn, iso);
  };

  const shift = (amount: number) => {
    onVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + amount, 1));
  };

  const left = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
  const right = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);

  return (
    <section className={styles.section} id="availability" aria-labelledby="availability-title">
      <h2 id="availability-title">{nights > 0 ? `${nights} nights in Candolim` : "Select check-in date"}</h2>
      <p>{checkIn && checkOut ? summary : "Add your travel dates for exact pricing"}</p>
      <div className={styles.nav}>
        <button type="button" aria-label="Previous month" onClick={() => shift(-1)}><ChevronLeft size={18} /></button>
        <button type="button" aria-label="Next month" onClick={() => shift(1)}><ChevronRight size={18} /></button>
      </div>
      <div className={styles.months}>
        <Month year={left.getFullYear()} month={left.getMonth()} checkIn={checkIn} checkOut={checkOut} onSelect={select} />
        <Month year={right.getFullYear()} month={right.getMonth()} checkIn={checkIn} checkOut={checkOut} onSelect={select} />
      </div>
      {keyboard && (
        <div className={styles.keyboard}>
          <label>
            Check-in
            <input type="date" value={checkIn ?? ""} onChange={(event) => onChange(event.target.value || null, checkOut)} />
          </label>
          <label>
            Checkout
            <input type="date" value={checkOut ?? ""} onChange={(event) => onChange(checkIn, event.target.value || null)} />
          </label>
        </div>
      )}
      <div className={styles.footer}>
        <button type="button" className={styles.keyButton} aria-label="Toggle keyboard date input" aria-pressed={keyboard} onClick={onToggleKeyboard}>
          <Keyboard size={16} />
        </button>
        <button type="button" className={styles.clear} onClick={() => onChange(null, null)} disabled={!checkIn && !checkOut}>
          Clear dates
        </button>
      </div>
    </section>
  );
}

function Month({ year, month, checkIn, checkOut, onSelect }: { year: number; month: number; checkIn: string | null; checkOut: string | null; onSelect: (iso: string) => void }) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = [...Array.from({ length: first }, () => null), ...Array.from({ length: days }, (_, index) => index + 1)];

  return (
    <div>
      <h3>{monthLabel(year, month)}</h3>
      <div className={styles.week} aria-hidden="true">
        {WEEKDAYS.map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
      </div>
      <div className={styles.grid} role="grid" aria-label={monthLabel(year, month)}>
        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} />;
          const iso = toISODate(new Date(year, month, day));
          const start = checkIn === iso;
          const end = checkOut === iso;
          const inRange = Boolean(checkIn && checkOut && parseISODate(iso) > parseISODate(checkIn) && parseISODate(iso) < parseISODate(checkOut));
          const className = [styles.day, start || end ? styles.endpoint : "", inRange ? styles.inRange : "", start ? styles.rangeStart : "", end ? styles.rangeEnd : ""].filter(Boolean).join(" ");
          return (
            <button key={iso} type="button" className={className} onClick={() => onSelect(iso)} aria-pressed={start || end} aria-label={iso}>
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
