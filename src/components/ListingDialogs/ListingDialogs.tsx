import { formatINR } from "../../lib/format";
import type { Listing, Review } from "../../types";
import { ReviewCard } from "../Reviews/Reviews";
import styles from "./ListingDialogs.module.css";

export type DialogState =
  | { kind: "reviews" }
  | { kind: "policy"; title: string; body: string }
  | { kind: "reserve" }
  | { kind: "report" }
  | { kind: "reviews-help" }
  | { kind: "confirmed"; id: string; total: number; nights: number }
  | null;

type ListingDialogsProps = {
  dialog: DialogState;
  listing: Listing;
  expandedReviews: Record<number, boolean>;
  summary: string;
  guests: number;
  nights: number;
  payable: number;
  claimed: boolean;
  reportText: string;
  formError: string;
  onToggleReview: (id: number) => void;
  onReserve: () => void;
  onReportText: (value: string) => void;
  onSubmitReport: () => void;
};

export function dialogTitle(dialog: DialogState) {
  if (!dialog) return "";
  if (dialog.kind === "reviews") return "Reviews";
  if (dialog.kind === "reviews-help") return "How reviews work";
  if (dialog.kind === "policy") return dialog.title;
  if (dialog.kind === "reserve") return "Request to book";
  if (dialog.kind === "confirmed") return "Reservation requested";
  return "Report this listing";
}

export function ListingDialogs({
  dialog,
  listing,
  expandedReviews,
  summary,
  guests,
  nights,
  payable,
  claimed,
  reportText,
  formError,
  onToggleReview,
  onReserve,
  onReportText,
  onSubmitReport,
}: ListingDialogsProps) {
  if (!dialog) return null;

  if (dialog.kind === "reviews") {
    return (
      <div className={styles.reviewList}>
        {listing.reviews.map((review: Review) => (
          <ReviewCard
            key={review.id}
            review={review}
            expanded={Boolean(expandedReviews[review.id])}
            onToggle={() => onToggleReview(review.id)}
          />
        ))}
      </div>
    );
  }

  if (dialog.kind === "policy") {
    return <p className={styles.dialogCopy}>{dialog.body}</p>;
  }

  if (dialog.kind === "reviews-help") {
    return (
      <div className={styles.dialogCopy}>
        <p>Reviews are written by guests after a stay. Star ratings cover cleanliness, accuracy, check-in, communication, location, and value.</p>
        <p>A guest favourite is a home with consistently strong ratings and reliable hosting. The score shown is the average of those guest ratings.</p>
      </div>
    );
  }

  if (dialog.kind === "reserve") {
    return (
      <div className={styles.dialogCopy}>
        <p><strong>{listing.title}</strong></p>
        <p>{summary || "Add dates to continue."}</p>
        <p>{guests} guests · {nights} nights</p>
        <p>{nights > 0 ? formatINR(payable) : "Select dates"} {claimed ? "(10% off applied)" : ""}</p>
        <p>You won't be charged yet. This request is saved by the local booking service.</p>
        {formError && <p className={styles.error}>{formError}</p>}
        <button type="button" className={styles.primary} onClick={onReserve} disabled={nights <= 0}>
          Confirm reservation
        </button>
      </div>
    );
  }

  if (dialog.kind === "confirmed") {
    return (
      <div className={styles.dialogCopy}>
        <p>Reservation <strong>{dialog.id}</strong> is held for {dialog.nights} nights.</p>
        <p>Total {formatINR(dialog.total)}. You won't be charged yet.</p>
      </div>
    );
  }

  return (
    <form
      className={styles.dialogCopy}
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmitReport();
      }}
    >
      <label htmlFor="report-reason">Why are you reporting this listing?</label>
      <textarea
        id="report-reason"
        value={reportText}
        onChange={(event) => onReportText(event.target.value)}
        rows={5}
        required
        minLength={8}
      />
      {formError && <p className={styles.error}>{formError}</p>}
      <button type="submit" className={styles.primary}>Submit report</button>
    </form>
  );
}
