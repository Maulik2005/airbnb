import type { Listing, Reservation } from "./types";

export async function fetchListing(signal?: AbortSignal) {
  const response = await fetch("/api/listing", { signal });
  if (!response.ok) throw new Error("Could not load the listing.");
  return (await response.json()) as Listing;
}

export async function createReservation(body: { checkIn: string; checkOut: string; guests: number }) {
  const response = await fetch("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as Reservation & { error?: string };
  if (!response.ok) throw new Error(data.error || "Reservation failed.");
  return data;
}

export async function sendReport(reason: string) {
  const response = await fetch("/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason }),
  });
  const data = (await response.json()) as { error?: string };
  if (!response.ok) throw new Error(data.error || "Could not send the report.");
}
