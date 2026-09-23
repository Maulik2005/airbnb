export type Photo = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

export type Review = {
  id: number;
  name: string;
  initial: string;
  color: string;
  tenure: string;
  when: string;
  text: string;
};

export type Listing = {
  id: string;
  title: string;
  subtitle: string;
  specs: string[];
  locationLabel: string;
  rating: number;
  reviewCount: number;
  guestFavourite: { title: string; subtitle: string };
  pricePerFiveNights: number;
  currency: string;
  defaultStay: { checkIn: string; checkOut: string; guests: number };
  maxGuests: number;
  host: {
    name: string;
    initials: string;
    avatarLabel: string;
    yearsHosting: number;
    reviews: number;
    rating: number;
    responseRate: string;
    responseTime: string;
    born: string;
    school: string;
    badge: string;
  };
  cohosts: { name: string; initial: string; color: string; photo?: string }[];
  sleep: { title: string; detail: string; photoId: number }[];
  amenities: { id: string; label: string; icon: string }[];
  categories: { id: string; title: string; caption: string }[];
  photos: Photo[];
  ratingBars: { label: string; score: string; icon: string }[];
  distribution: { stars: number; count: number }[];
  reviewTags: { id: string; label: string; count: number; icon: string }[];
  reviews: Review[];
  neighbourhood: string;
  neighbourhoodMore: string;
  policies: {
    cancellation: { title: string; summary: string; body: string };
    rules: { title: string; lines: string[]; body: string };
    safety: { title: string; lines: string[]; body: string };
  };
  nearby: { id: string; title: string; price: number; rating: number; photoId: number }[];
};

export type Reservation = {
  id: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  total: number;
  currency: string;
};
