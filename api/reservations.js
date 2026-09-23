import { listing, nightsBetween, priceForNights } from "../server/data/listing.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const { checkIn, checkOut, guests } = req.body ?? {};
  const nights = nightsBetween(checkIn, checkOut);
  if (!checkIn || !checkOut || nights <= 0) {
    res.status(400).json({ error: "Choose a valid check-in and checkout." });
    return;
  }

  const guestCount = Number(guests);
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > listing.maxGuests) {
    res.status(400).json({ error: `This place allows up to ${listing.maxGuests} guests.` });
    return;
  }

  res.status(201).json({
    id: `res_${Date.now()}`,
    listingId: listing.id,
    checkIn,
    checkOut,
    guests: guestCount,
    nights,
    total: priceForNights(nights),
    currency: listing.currency,
    createdAt: new Date().toISOString(),
  });
}
