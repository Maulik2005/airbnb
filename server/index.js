import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { listing, nightsBetween, priceForNights } from "./data/listing.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3001;

const reservations = [];
const reports = [];

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/listing", (_req, res) => {
  res.json(listing);
});

app.post("/api/reservations", (req, res) => {
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
  const reservation = {
    id: `res_${reservations.length + 1}`,
    listingId: listing.id,
    checkIn,
    checkOut,
    guests: guestCount,
    nights,
    total: priceForNights(nights),
    currency: listing.currency,
    createdAt: new Date().toISOString(),
  };
  reservations.push(reservation);
  res.status(201).json(reservation);
});

app.post("/api/reports", (req, res) => {
  const reason = String(req.body?.reason ?? "").trim();
  if (reason.length < 8) {
    res.status(400).json({ error: "Please add a short reason." });
    return;
  }
  const report = {
    id: `rpt_${reports.length + 1}`,
    listingId: listing.id,
    reason,
    createdAt: new Date().toISOString(),
  };
  reports.push(report);
  res.status(201).json({ ok: true, id: report.id });
});

const dist = path.resolve(__dirname, "../dist");
app.use(express.static(dist));
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    next();
    return;
  }
  res.sendFile(path.join(dist, "index.html"), (error) => {
    if (error) res.status(404).json({ error: "Frontend build not found. Run npm run dev or npm run build." });
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
