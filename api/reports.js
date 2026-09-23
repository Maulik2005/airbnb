import { listing } from "../server/data/listing.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const reason = String(req.body?.reason ?? "").trim();
  if (reason.length < 8) {
    res.status(400).json({ error: "Please add a short reason." });
    return;
  }

  res.status(201).json({
    ok: true,
    id: `rpt_${Date.now()}`,
    listingId: listing.id,
  });
}
