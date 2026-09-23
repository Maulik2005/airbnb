import { Home, Minus, Plus, Search } from "lucide-react";
import { useState } from "react";
import styles from "./LocationMap.module.css";

type LocationMapProps = {
  label: string;
  neighbourhood: string;
  more: string;
};

export function LocationMap({ label, neighbourhood, more }: LocationMapProps) {
  const [zoom, setZoom] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [notice, setNotice] = useState("");

  return (
    <section className={styles.section} id="location" aria-labelledby="location-title">
      <h2 id="location-title">Where you'll be</h2>
      <p className={styles.place}>{label}</p>
      <div className={styles.map}>
        <div className={styles.canvas} style={{ transform: `scale(${zoom})` }}>
          <svg viewBox="0 0 824 354" role="img" aria-label="Approximate map of Candolim">
            <rect width="824" height="354" fill="#eaf2e5" />
            <path d="M0 0 H336 L170 354 H0 Z" fill="#add3e6" />
            <circle cx="247" cy="138" r="36" fill="#cfe3c8" />
            <circle cx="578" cy="214" r="48" fill="#cfe3c8" />
            <g stroke="#6a7a70" strokeOpacity="0.11" strokeWidth="1">
              {[61, 128, 195, 262, 329, 396, 463, 530, 597, 664, 731, 798].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="354" />
              ))}
              {[66, 132, 198, 264, 330].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="824" y2={y} />
              ))}
            </g>
          </svg>
        </div>
        <span className={styles.pin} aria-hidden="true">
          <Home size={22} strokeWidth={2.25} />
        </span>
        <button type="button" className={styles.search} aria-label="Search this area" onClick={() => setNotice("Showing stays around Candolim.")}>
          <Search size={16} />
        </button>
        <div className={styles.zoom}>
          <button type="button" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(1.25, value + 0.08))}><Plus size={16} /></button>
          <button type="button" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(1, value - 0.08))}><Minus size={16} /></button>
        </div>
      </div>
      <p className={styles.exact}>Exact location will be provided after booking.</p>
      {notice && <p className={styles.notice} role="status">{notice}</p>}
      <h3>Neighbourhood highlights</h3>
      <p className={styles.copy}>
        {neighbourhood}
        {expanded ? more : ""}
      </p>
      <button type="button" className={styles.more} onClick={() => setExpanded((open) => !open)}>
        {expanded ? "Show less" : "Show more"}
      </button>
    </section>
  );
}
