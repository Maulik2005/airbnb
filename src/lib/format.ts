export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseISODate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toISODate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function nightsBetween(checkIn: string | null, checkOut: string | null) {
  if (!checkIn || !checkOut) return 0;
  const diff = parseISODate(checkOut).getTime() - parseISODate(checkIn).getTime();
  return Math.round(diff / 86400000);
}

export function priceForNights(nights: number, fiveNightPrice: number) {
  if (nights <= 0) return 0;
  return Math.round((fiveNightPrice * nights) / 5);
}

export function formatShortDate(iso: string) {
  const date = parseISODate(iso);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${date.getFullYear()}`;
}

export function formatRangeLabel(checkIn: string, checkOut: string) {
  const start = parseISODate(checkIn);
  const end = parseISODate(checkOut);
  const left = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(start);
  const right = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(end);
  return `${left.replace(/ /g, " ")} – ${right}`;
}

export function monthLabel(year: number, month: number) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(year, month, 1));
}
