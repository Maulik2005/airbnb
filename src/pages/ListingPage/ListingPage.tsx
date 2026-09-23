import { Heart, Upload } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createReservation, sendReport } from "../../api";
import { BookingCard } from "../../components/BookingCard/BookingCard";
import { Dialog } from "../../components/Dialog/Dialog";
import { Header } from "../../components/Header/Header";
import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import { Lightbox } from "../../components/Lightbox/Lightbox";
import { ListingDialogs, dialogTitle, type DialogState } from "../../components/ListingDialogs/ListingDialogs";
import { LocationMap } from "../../components/LocationMap/LocationMap";
import { MeetHost } from "../../components/MeetHost/MeetHost";
import { NearbyStays, ThingsToKnow } from "../../components/NearbyAndPolicies/NearbyAndPolicies";
import { PhotoTour } from "../../components/PhotoTour/PhotoTour";
import { PlaceDetails } from "../../components/PlaceDetails/PlaceDetails";
import { Reviews } from "../../components/Reviews/Reviews";
import { StickyNav } from "../../components/StickyNav/StickyNav";
import { useScrollLock } from "../../hooks/useScrollLock";
import { formatINR, formatRangeLabel, nightsBetween, priceForNights } from "../../lib/format";
import type { Listing } from "../../types";
import styles from "./ListingPage.module.css";

export function ListingPage({ listing }: { listing: Listing }) {
  const [saved, setSaved] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [toast, setToast] = useState("");
  const [searchOpen, setSearchOpen] = useState<"where" | "when" | "who" | null>(null);
  const [where, setWhere] = useState("");
  const [checkIn, setCheckIn] = useState<string | null>(listing.defaultStay.checkIn);
  const [checkOut, setCheckOut] = useState<string | null>(listing.defaultStay.checkOut);
  const [guests, setGuests] = useState(listing.defaultStay.guests);
  const [month, setMonth] = useState(() => new Date(2026, 9, 1));
  const [keyboardDates, setKeyboardDates] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});
  const [tourOpen, setTourOpen] = useState(false);
  const [tourMounted, setTourMounted] = useState(false);
  const [focusPhotoId, setFocusPhotoId] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxMounted, setLightboxMounted] = useState(false);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [reportText, setReportText] = useState("");
  const [formError, setFormError] = useState("");
  const [activeSection, setActiveSection] = useState("photos");
  const [sticky, setSticky] = useState(false);

  const tourReturnRef = useRef<HTMLElement | null>(null);
  const lightboxReturnRef = useRef<HTMLElement | null>(null);
  const dialogReturnRef = useRef<HTMLElement | null>(null);
  const showAllRef = useRef<HTMLButtonElement | null>(null);

  const nights = nightsBetween(checkIn, checkOut);
  const total = priceForNights(nights, listing.pricePerFiveNights);
  const discountedTotal = Math.round(total * 0.9);
  const payable = claimed ? discountedTotal : total;
  const photoById = useMemo(
    () => Object.fromEntries(listing.photos.map((photo) => [photo.id, photo])),
    [listing.photos],
  );
  const categoryTitle = useCallback(
    (category: string) => listing.categories.find((item) => item.id === category)?.title ?? "Photo",
    [listing.categories],
  );

  useScrollLock(tourMounted || lightboxMounted || dialog !== null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (lightboxIndex !== null) {
        event.preventDefault();
        setLightboxIndex(null);
        return;
      }
      if (dialog) {
        event.preventDefault();
        setDialog(null);
        return;
      }
      if (tourOpen) {
        event.preventDefault();
        setTourOpen(false);
        return;
      }
      if (searchOpen) setSearchOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, dialog, tourOpen, searchOpen]);

  useEffect(() => {
    const onScroll = () => {
      setSticky(window.scrollY > 620);
      const sections = ["photos", "amenities", "reviews", "location"];
      let current = "photos";
      for (const id of sections) {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top < 120) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const openTour = (photoId: number | undefined, trigger: HTMLElement) => {
    tourReturnRef.current = trigger;
    setFocusPhotoId(photoId ?? null);
    setTourOpen(true);
  };

  const openDialog = (next: DialogState, trigger?: HTMLElement) => {
    if (trigger) dialogReturnRef.current = trigger;
    setFormError("");
    setDialog(next);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link copied");
    } catch {
      setToast(url);
    }
  };

  const reserve = async () => {
    if (!checkIn || !checkOut) return;
    setFormError("");
    try {
      const reservation = await createReservation({ checkIn, checkOut, guests });
      setDialog({
        kind: "confirmed",
        id: reservation.id,
        total: claimed ? Math.round(reservation.total * 0.9) : reservation.total,
        nights: reservation.nights,
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Reservation failed.");
    }
  };

  const submitReport = async () => {
    setFormError("");
    try {
      await sendReport(reportText);
      setReportText("");
      setDialog(null);
      setToast("Thanks, your report was sent");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not send the report.");
    }
  };

  const summary = checkIn && checkOut ? formatRangeLabel(checkIn, checkOut) : "";
  const overlayOpen = tourMounted || lightboxMounted || dialog !== null;

  return (
    <div className={styles.page}>
      <div inert={overlayOpen ? true : undefined}>
        <Header
          onSearch={setSearchOpen}
          searchOpen={searchOpen}
          where={where}
          when=""
          who=""
          onWhere={setWhere}
          onCloseSearch={() => setSearchOpen(null)}
        />
        <StickyNav
          visible={sticky && !tourMounted && !lightboxMounted}
          active={activeSection}
          priceLabel={nights > 0 ? `${formatINR(payable)} for ${nights} nights` : "Add dates"}
          rating={listing.rating}
          reviewCount={listing.reviewCount}
          onReserve={() => openDialog({ kind: "reserve" })}
        />

        <main className={styles.main} id="photos">
          <div className={styles.titleRow}>
            <h1>{listing.title}</h1>
            <div className={styles.titleActions}>
              <button type="button" onClick={share}>
                <Upload size={16} strokeWidth={2} /> Share
              </button>
              <button type="button" onClick={() => setSaved((value) => !value)} aria-pressed={saved}>
                <Heart size={16} strokeWidth={2} fill={saved ? "currentColor" : "none"} className={saved ? styles.saved : ""} />
                Save
              </button>
            </div>
          </div>

          <ImageGallery
            photos={listing.photos}
            onOpenTour={openTour}
            showAllRef={(node) => {
              showAllRef.current = node;
            }}
          />

          <div className={styles.columns}>
            <PlaceDetails
              listing={listing}
              photoById={photoById}
              checkIn={checkIn}
              checkOut={checkOut}
              summary={summary}
              month={month}
              keyboardDates={keyboardDates}
              onChangeDates={(start, end) => {
                setCheckIn(start);
                setCheckOut(end);
              }}
              onVisibleMonth={setMonth}
              onToggleKeyboard={() => setKeyboardDates((value) => !value)}
            />

            <aside className={styles.rail}>
              <BookingCard
                checkIn={checkIn}
                checkOut={checkOut}
                nights={nights}
                total={total}
                discountedTotal={discountedTotal}
                claimed={claimed}
                guests={guests}
                maxGuests={listing.maxGuests}
                rating={listing.rating}
                reviewCount={listing.reviewCount}
                cancellationLabel="17 October"
                onGuests={setGuests}
                onReserve={() => openDialog({ kind: "reserve" })}
                onReport={() => openDialog({ kind: "report" })}
                onClaim={() => {
                  setClaimed(true);
                  setToast("10% discount applied");
                }}
                onJumpToDates={() =>
                  document.getElementById("availability")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              />
            </aside>
          </div>

          <div className={styles.below}>
            <Reviews
              listing={listing}
              expanded={expandedReviews}
              onToggle={(id) =>
                setExpandedReviews((current) => ({ ...current, [id]: !current[id] }))
              }
              onShowAll={() => openDialog({ kind: "reviews" })}
              onHowReviews={(trigger) => openDialog({ kind: "reviews-help" }, trigger)}
            />

            <LocationMap
              label={listing.locationLabel}
              neighbourhood={listing.neighbourhood}
              more={listing.neighbourhoodMore}
            />

            <MeetHost
              listing={listing}
              onMessage={(trigger) => {
                dialogReturnRef.current = trigger;
                setToast(`Message sent to ${listing.host.name}`);
              }}
            />

            <ThingsToKnow
              listing={listing}
              onLearn={(title, body) => openDialog({ kind: "policy", title, body })}
            />
            <NearbyStays listing={listing} />
          </div>
        </main>

        <footer className={styles.footer}>
          <div>
            <p>© {new Date().getFullYear()} Airbnb, Inc.</p>
            <nav aria-label="Footer">
              <a href="#policies">Privacy</a>
              <a href="#policies">Terms</a>
              <a href="#location">Sitemap</a>
            </nav>
          </div>
        </footer>
      </div>

      {toast && (
        <div className={styles.toast} role="status">
          {toast}
        </div>
      )}

      <PhotoTour
        listing={listing}
        open={tourOpen}
        focusPhotoId={focusPhotoId}
        saved={saved}
        onToggleSave={() => setSaved((value) => !value)}
        onShare={share}
        onClose={() => setTourOpen(false)}
        onMountedChange={setTourMounted}
        onOpenPhoto={(index, trigger) => {
          lightboxReturnRef.current = trigger;
          setLightboxIndex(index);
        }}
        returnFocusRef={tourReturnRef}
      />

      <Lightbox
        photos={listing.photos}
        index={lightboxIndex}
        titleFor={(photo) => categoryTitle(photo.category)}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
        returnFocusRef={lightboxReturnRef}
        onMountedChange={setLightboxMounted}
      />

      <Dialog
        open={dialog !== null}
        title={dialogTitle(dialog)}
        onClose={() => setDialog(null)}
        returnFocusRef={dialogReturnRef}
      >
        <ListingDialogs
          dialog={dialog}
          listing={listing}
          expandedReviews={expandedReviews}
          summary={summary}
          guests={guests}
          nights={nights}
          payable={payable}
          claimed={claimed}
          reportText={reportText}
          formError={formError}
          onToggleReview={(id) =>
            setExpandedReviews((current) => ({ ...current, [id]: !current[id] }))
          }
          onReserve={() => void reserve()}
          onReportText={setReportText}
          onSubmitReport={() => void submitReport()}
        />
      </Dialog>
    </div>
  );
}
