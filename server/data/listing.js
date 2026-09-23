const photo = (id, file, alt, category) => ({
  id,
  src: `https://images.pexels.com/photos/${file}?auto=compress&cs=tinysrgb&w=1200`,
  alt,
  category,
});

const photos = [
  photo(1, "276746/pexels-photo-276746.jpeg", "Living room 1 photo", "living-room-1"),
  photo(2, "29012619/pexels-photo-29012619/free-photo-of-bright-modern-living-room-with-soft-white-interiors.jpeg", "Living room 1 photo", "living-room-1"),
  photo(3, "30386991/pexels-photo-30386991/free-photo-of-modern-living-room-with-cozy-navy-sofa.jpeg", "Living room 1 photo", "living-room-1"),
  photo(4, "33537442/pexels-photo-33537442/free-photo-of-cozy-brick-walled-living-room-with-large-window.jpeg", "Living room 2 photo", "living-room-2"),
  photo(5, "28542161/pexels-photo-28542161/free-photo-of-cozy-living-room-with-modern-art-decor.jpeg", "Living room 2 photo", "living-room-2"),
  photo(6, "19836790/pexels-photo-19836790/free-photo-of-view-of-a-kitchen-with-white-cabinets-and-a-silver-sink.jpeg", "Full kitchen photo", "kitchen"),
  photo(7, "7045356/pexels-photo-7045356.jpeg", "Full kitchen photo", "kitchen"),
  photo(8, "34574606/pexels-photo-34574606/free-photo-of-elegant-bedroom-interior-with-blue-accents-and-natural-light.jpeg", "Bedroom photo", "bedroom"),
  photo(9, "30767888/pexels-photo-30767888/free-photo-of-cozy-modern-bedroom-in-santa-teresa-brazil.jpeg", "Bedroom photo", "bedroom"),
  photo(10, "15456211/pexels-photo-15456211/free-photo-of-rustic-pretty-bedroom.jpeg", "Bedroom photo", "bedroom"),
  photo(11, "6957081/pexels-photo-6957081.jpeg", "Full bathroom photo", "bathroom"),
  photo(12, "8082195/pexels-photo-8082195.jpeg", "Full bathroom photo", "bathroom"),
  photo(13, "11593505/pexels-photo-11593505.jpeg", "Gym photo", "gym"),
  photo(14, "27195989/pexels-photo-27195989/free-photo-of-a-gym-room-with-exercise-equipment-and-a-ceiling-light.jpeg", "Gym photo", "gym"),
  photo(15, "18153132/pexels-photo-18153132/free-photo-of-apartments-with-balconies.jpeg", "Exterior photo", "exterior"),
  photo(16, "37301680/pexels-photo-37301680/free-photo-of-modern-urban-building-architecture-against-blue-sky.jpeg", "Exterior photo", "exterior"),
  photo(17, "15088502/pexels-photo-15088502/free-photo-of-a-rooftop-swimming-pool.jpeg", "Pool photo", "pool"),
  photo(18, "33819401/pexels-photo-33819401/free-photo-of-aerial-view-of-rooftop-pool-and-surrounding-cityscape.jpeg", "Pool photo", "pool"),
  photo(19, "6980724/pexels-photo-6980724.jpeg", "Additional photos photo", "additional"),
  photo(20, "6899357/pexels-photo-6899357.jpeg", "Additional photos photo", "additional"),
  photo(21, "4488754/pexels-photo-4488754.jpeg", "Additional photos photo", "additional"),
];

export const listing = {
  id: "mirashya-ug10",
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  subtitle: "Entire serviced apartment in Candolim, India",
  specs: ["3 guests", "1 bedroom", "1 bed", "1 bathroom"],
  locationLabel: "Candolim, Goa, India",
  rating: 4.95,
  reviewCount: 19,
  guestFavourite: {
    title: "Guest favourite",
    subtitle: "One of the most loved homes on Airbnb, according to guests",
  },
  pricePerFiveNights: 28499,
  currency: "INR",
  defaultStay: {
    checkIn: "2026-10-18",
    checkOut: "2026-10-23",
    guests: 2,
  },
  maxGuests: 3,
  cancellationDeadlineLabel: "17 October",
  checkInLabel: "10/18/2026",
  checkOutLabel: "10/23/2026",
  staySummary: "18 Oct 2026 – 23 Oct 2026",
  host: {
    name: "Mirashya Homes",
    initials: "MH",
    avatarLabel: "AMRASHYA\nHOMES",
    yearsHosting: 2,
    reviews: 1463,
    rating: 4.68,
    responseRate: "100%",
    responseTime: "within an hour",
    born: "Born in the 80s",
    school: "Where I went to school: NICMAR GOA",
    badge: "Host",
  },
  cohosts: [
    { name: "Sharath", initial: "S", color: "#e8e8e8", photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120" },
    { name: "Aman Dev Pahwa", initial: "A", color: "#d8d8d8", photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=120" },
    { name: "Maria Karen Priyanka", initial: "M", color: "#cfcfcf", photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120" },
    { name: "Simran", initial: "S", color: "#dedede", photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120" },
    { name: "Pallavi", initial: "P", color: "#d5d5d5", photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120" },
    { name: "Sanyukta", initial: "S", color: "#e4e4e4", photo: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=120" },
    { name: "Shruti", initial: "S", color: "#f3b6c8" },
    { name: "Amisha", initial: "A", color: "#c9d7f2" },
  ],
  sleep: [
    { title: "Living room", detail: "Sofa", photoId: 1 },
    { title: "Bedroom", detail: "1 double bed", photoId: 8 },
  ],
  amenities: [
    { id: "kitchen", label: "Kitchen", icon: "kitchen" },
    { id: "wifi", label: "Wifi", icon: "wifi" },
    { id: "workspace", label: "Dedicated workspace", icon: "workspace" },
    { id: "parking", label: "Free parking on premises", icon: "parking" },
    { id: "pool", label: "Pool", icon: "pool" },
    { id: "hottub", label: "Hot tub", icon: "hottub" },
    { id: "pets", label: "Pets allowed", icon: "pets" },
    { id: "cameras", label: "Exterior security cameras on property", icon: "camera" },
    { id: "co", label: "Carbon monoxide alarm", icon: "alarm" },
    { id: "smoke", label: "Smoke alarm", icon: "smoke" },
  ],
  categories: [
    { id: "living-room-1", title: "Living room 1", caption: "Sofa · Air conditioning · Ceiling fan · TV" },
    { id: "living-room-2", title: "Living room 2", caption: "Ceiling fan · Hot tub" },
    { id: "kitchen", title: "Full kitchen", caption: "Refrigerator · Stove · Cookware" },
    { id: "bedroom", title: "Bedroom", caption: "1 double bed · Wardrobe · Blackout curtains" },
    { id: "bathroom", title: "Full bathroom", caption: "Hot water · Hair dryer · Shower" },
    { id: "gym", title: "Gym", caption: "Free weights · Treadmill" },
    { id: "exterior", title: "Exterior", caption: "Building view · Parking" },
    { id: "pool", title: "Pool", caption: "Rooftop pool · Loungers" },
    { id: "additional", title: "Additional photos", caption: "Details from around the apartment" },
  ],
  photos,
  ratingBars: [
    { label: "Cleanliness", score: "5.0", icon: "spark" },
    { label: "Accuracy", score: "5.0", icon: "check" },
    { label: "Check-in", score: "5.0", icon: "key" },
    { label: "Communication", score: "5.0", icon: "chat" },
    { label: "Location", score: "4.8", icon: "pin" },
    { label: "Value", score: "4.8", icon: "tag" },
  ],
  distribution: [
    { stars: 5, count: 18 },
    { stars: 4, count: 1 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
  reviewTags: [
    { id: "comfort", label: "Comfort", count: 6, icon: "🛋️" },
    { id: "accuracy", label: "Accuracy", count: 5, icon: "✅" },
    { id: "hottub", label: "Hot tub", count: 5, icon: "🛁" },
    { id: "condition", label: "Condition", count: 4, icon: "🎁" },
    { id: "hospitality", label: "Hospitality", count: 8, icon: "🤝" },
    { id: "cleanliness", label: "Cleanliness", count: 4, icon: "🧼" },
    { id: "amenities", label: "Amenities", count: 2, icon: "🛍️" },
  ],
  reviews: [
    { id: 1, name: "Amit", initial: "A", color: "#e07a2f", tenure: "2 months on Airbnb", when: "1 week ago", text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property." },
    { id: 2, name: "Aheesh", initial: "A", color: "#3d6fd8", tenure: "3 years on Airbnb", when: "2 weeks ago", text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely stay here again and recommend it to friends visiting Goa." },
    { id: 3, name: "Samiksha", initial: "S", color: "#c73b8e", tenure: "8 months on Airbnb", when: "May 2026", text: "the host nitish was really great help" },
    { id: 4, name: "Vedant", initial: "V", color: "#7a4cc2", tenure: "4 years on Airbnb", when: "May 2026", text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness and the private jacuzzi made the trip." },
    { id: 5, name: "Vaibhav S", initial: "V", color: "#d23b3b", tenure: "3 years on Airbnb", when: "May 2026", text: "Great great experience living out there, can't expect more, will always look for it in the future and will recommend my friends too." },
    { id: 6, name: "Mohd", initial: "M", color: "#1aa6a6", tenure: "5 years on Airbnb", when: "May 2026", text: "Great place. Exactly as described in the listing." },
    { id: 7, name: "Neha", initial: "N", color: "#e07a2f", tenure: "1 year on Airbnb", when: "April 2026", text: "Quiet building, easy self check-in, and the pool was a nice break after the beach. Would book again." },
    { id: 8, name: "Rahul", initial: "R", color: "#3d6fd8", tenure: "6 years on Airbnb", when: "April 2026", text: "The apartment matched the photos. Parking was simple and the host replied quickly when we asked about restaurants." },
    { id: 9, name: "Ishita", initial: "I", color: "#c73b8e", tenure: "2 years on Airbnb", when: "March 2026", text: "Comfortable bed and a well equipped kitchen. Candolim is an easy walk or short ride away." },
    { id: 10, name: "Karan", initial: "K", color: "#7a4cc2", tenure: "3 years on Airbnb", when: "March 2026", text: "Hot tub on the balcony was the highlight. The place felt private and the team was polite." },
    { id: 11, name: "Diya", initial: "D", color: "#d23b3b", tenure: "9 months on Airbnb", when: "February 2026", text: "Clean linens, strong wifi, and a desk that actually worked for a few calls." },
    { id: 12, name: "Arjun", initial: "A", color: "#1aa6a6", tenure: "4 years on Airbnb", when: "February 2026", text: "Smooth stay from check-in to checkout. The shared pool area was calm in the morning." },
    { id: 13, name: "Meera", initial: "M", color: "#e07a2f", tenure: "5 years on Airbnb", when: "January 2026", text: "Loved the lighting in the living room. Everything we needed for a short Goa trip was there." },
    { id: 14, name: "Sana", initial: "S", color: "#3d6fd8", tenure: "7 months on Airbnb", when: "January 2026", text: "Host communication was excellent. The apartment is compact but thoughtfully set up." },
    { id: 15, name: "Nikhil", initial: "N", color: "#7a4cc2", tenure: "2 years on Airbnb", when: "December 2025", text: "Safe, quiet, and exactly as listed. We used the gym once and it was fine for a quick workout." },
    { id: 16, name: "Pooja", initial: "P", color: "#c73b8e", tenure: "8 years on Airbnb", when: "December 2025", text: "A reliable base in Candolim. Check-in instructions were clear and the space was spotless." },
    { id: 17, name: "Farhan", initial: "F", color: "#d23b3b", tenure: "1 year on Airbnb", when: "November 2025", text: "Good value for the location. The bedroom was comfortable and the bathroom was clean." },
    { id: 18, name: "Tara", initial: "T", color: "#1aa6a6", tenure: "3 years on Airbnb", when: "November 2025", text: "We felt looked after without anyone hovering. Would recommend for couples." },
    { id: 19, name: "Dev", initial: "D", color: "#3d6fd8", tenure: "6 years on Airbnb", when: "October 2025", text: "Photos are accurate. The stay was peaceful and the host's response time was excellent." },
  ],
  neighbourhood:
    "Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.",
  neighbourhoodMore:
    " Candolim Beach is about ten minutes away, with Baga, Calangute, Sinquerim, and Fort Aguada an easy ride from the apartment.",
  policies: {
    cancellation: {
      title: "Cancellation policy",
      summary: "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.",
      body: "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund. After check-in begins, the reservation is non-refundable. This policy applies even if plans change because of illness or travel disruption.",
    },
    rules: {
      title: "House rules",
      lines: ["Check-in after 2:00 pm", "Checkout before 11:00 am", "3 guests maximum"],
      body: "Check-in is after 2:00 pm and checkout is before 11:00 am. The apartment allows 3 guests maximum. Quiet hours start at 10:00 pm. Parties and events are not allowed. Unregistered guests are not permitted.",
    },
    safety: {
      title: "Safety & property",
      lines: [
        "Carbon monoxide alarm not reported",
        "Smoke alarm not reported",
        "Exterior security cameras on property",
      ],
      body: "A carbon monoxide alarm has not been reported for this place. A smoke alarm has not been reported for this place. Exterior security cameras are present on the property. Pool hours are limited and the shared pool should be used respectfully.",
    },
  },
  nearby: [
    { id: "n1", title: "Beautiful Studio with a view to die for", price: 24999, rating: 4.92, photoId: 3 },
    { id: "n2", title: "NAQAB - 1bhk with private pool", price: 42218, rating: 4.95, photoId: 17 },
    { id: "n3", title: "Greentique Luxury Flat with plunge pool", price: 38450, rating: 4.9, photoId: 5 },
    { id: "n4", title: "The Tropical Studio | 5 mins to Beach", price: 22824, rating: 4.96, photoId: 2 },
    { id: "n5", title: "Luxury Casa Bella 1BHK with plunge pool, Calangute", price: 39942, rating: 4.95, photoId: 8 },
    { id: "n6", title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool", price: 45648, rating: 5, photoId: 11 },
    { id: "n7", title: "Luxury Apt | Private Pool | 6 Mins from Beach", price: 48786, rating: 4.93, photoId: 4 },
    { id: "n8", title: "Serendipity Cotta Stay in Calangute", price: 22824, rating: 4.92, photoId: 9 },
  ],
};

export function nightsBetween(checkIn, checkOut) {
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const diff = (end.getTime() - start.getTime()) / 86400000;
  return Number.isFinite(diff) ? diff : 0;
}

export function priceForNights(nights) {
  if (nights <= 0) return 0;
  return Math.round((listing.pricePerFiveNights * nights) / 5);
}
