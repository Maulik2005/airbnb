import { useEffect, useState } from "react";
import { fetchListing } from "./api";
import { ListingPage } from "./pages/ListingPage/ListingPage";
import type { Listing } from "./types";
import styles from "./App.module.css";

export default function App() {
  const [listing, setListing] = useState<Listing | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchListing(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setListing(data);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        setError("The listing could not be loaded. The API is unavailable.");
      });
    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <main className={styles.status}>
        <h1>Listing unavailable</h1>
        <p>{error}</p>
      </main>
    );
  }

  if (!listing) {
    return (
      <main className={styles.status} aria-live="polite">
        <p>Loading…</p>
      </main>
    );
  }

  return <ListingPage listing={listing} />;
}
