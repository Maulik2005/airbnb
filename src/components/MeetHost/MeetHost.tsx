import { Check, GraduationCap, PartyPopper, Shield } from "lucide-react";
import type { Listing } from "../../types";
import styles from "./MeetHost.module.css";

type MeetHostProps = {
  listing: Listing;
  onMessage: (trigger: HTMLElement) => void;
};

export function MeetHost({ listing, onMessage }: MeetHostProps) {
  return (
    <section className={styles.meet} id="host" aria-labelledby="meet-title">
      <h2 id="meet-title">Meet your host</h2>
      <div className={styles.meetGrid}>
        <div className={styles.meetLeft}>
          <div className={styles.hostCard}>
            <div className={styles.hostIdentity}>
              <span className={styles.hostAvatarLg} aria-hidden="true">
                {(listing.host.avatarLabel ?? listing.host.initials).split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
                <span className={styles.verified} aria-hidden="true">
                  <Check size={12} strokeWidth={3} />
                </span>
              </span>
              <strong>{listing.host.name}</strong>
              <p>{listing.host.badge}</p>
            </div>
            <dl>
              <div>
                <dt>{listing.host.reviews.toLocaleString("en-IN")}</dt>
                <dd>Reviews</dd>
              </div>
              <div>
                <dt>{listing.host.rating.toFixed(2)}★</dt>
                <dd>Rating</dd>
              </div>
              <div>
                <dt>{listing.host.yearsHosting}</dt>
                <dd>Years hosting</dd>
              </div>
            </dl>
          </div>
          <ul className={styles.hostFacts}>
            <li><PartyPopper size={18} aria-hidden="true" />{listing.host.born}</li>
            {listing.host.school && (
              <li><GraduationCap size={18} aria-hidden="true" />{listing.host.school}</li>
            )}
          </ul>
        </div>

        <div className={styles.meetRight}>
          <div>
            <h3>Co-Hosts</h3>
            <ul className={styles.cohosts}>
              {listing.cohosts.map((host) => (
                <li key={host.name}>
                  {host.photo ? (
                    <img src={host.photo} alt="" className={styles.cohostPhoto} />
                  ) : (
                    <span style={{ background: host.color }}>{host.initial}</span>
                  )}
                  <span className={styles.cohostName}>{host.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.hostDetails}>
            <h3>Host details</h3>
            <p>Response rate: {listing.host.responseRate}</p>
            <p>Responds {listing.host.responseTime}</p>
            <button
              type="button"
              className={styles.messageHost}
              onClick={(event) => onMessage(event.currentTarget)}
            >
              Message host
            </button>
          </div>
        </div>
      </div>

      <p className={styles.protect}>
        <Shield size={16} aria-hidden="true" />
        To help protect your payment, always use Airbnb to send money and communicate with hosts.
      </p>
    </section>
  );
}
