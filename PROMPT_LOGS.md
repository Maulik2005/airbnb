# Prompt Logs — Airbnb Listing Assignment

These are the AI prompts used while building the Candolim listing page (React + Vite + Express). The reference was observed visually; source code from the reference was not copied.

---

## 1. Project setup and architecture

**Prompt:** Build a desktop Airbnb-style listing page as an original implementation. Use React, TypeScript, Vite, CSS modules, and a small Node/Express API for listing data, reservations, and reports. Do not copy reference source.

**Follow-ups:**
- Keep content at 1120px width. Gallery 480px tall with an 8px gap.
- Primary text `#222222`. Reserve/search actions `#ff385c`.
- Photos, photo tour, and lightbox must all read the same `photos` array from `GET /api/listing`.
- Escape closes only the top overlay and restores focus to the trigger.
- Desktop only unless asked for mobile.

---

## 2. Visual inspection before coding

**Prompt:** Inspect the rendered listing before writing UI. Record column width, type sizes, gallery geometry, colors, and overlay behavior. Do not assume a generic listing layout.

**Prompt:** Compare the running page at 1366, 1440, and 1920. Fix one region at a time.

---

## 3. Data model and API

**Prompt:** Model photos, categories, reviews, host, policies, and nearby stays as data served by a Node API. Render the gallery, photo tour, and lightbox from that one list.

**Prompt:** Add reservation and report endpoints that validate dates and guests and return JSON errors when input is invalid.

---

## 4. Photo tour and lightbox

**Prompt:** Open the photo tour from the hero and from “Show all photos”. Open the lightbox from a tour image. Keep the photo index in sync across gallery, tour, and lightbox.

**Prompt:** Close the top overlay with Escape. Move focus into the overlay on open and back to the trigger on close. Mark the page behind overlays as inert.

---

## 5. Listing sections to match reference

**Prompt:** Match the listing sections: header search, title/share/save, image gallery, guest favourite, host row, sleep rooms, amenities, availability calendar, booking card, reviews, location map, meet your host, things to know, and nearby stays.

**Prompt:** Make the “Meet your host” card, co-hosts, and host details match the reference spacing and typography.

**Prompt:** Also match this Google Map as reference so the location map looks the same (Candolim coast, house pin, search and zoom controls, pastel land/water, grid, park circles).

---

## 6. Accessibility and polish

**Prompt:** Add semantic regions, a single h1, named buttons, image alt text, dialog labels, and visible `:focus-visible` outlines.

**Prompt:** Sticky section nav for Photos / Amenities / Reviews / Location. Keyboard support for lightbox arrows and Escape stacking.

---

## 7. Submission structure

**Prompt:** Structure all code for submission. Split oversized page files into clear components, remove unused code, update README project structure, and ensure `npm run build` passes.

**Resulting layout used for hand-in:**
- `server/` — Express API + listing data
- `src/pages/ListingPage/` — page shell and overlay orchestration
- `src/components/` — Header, gallery, tour, lightbox, PlaceDetails, BookingCard, Reviews, LocationMap, MeetHost, NearbyAndPolicies, ListingDialogs, Dialog
- `src/hooks/`, `src/lib/`, `src/constants/`, `docs/`, `.ai/`

---

## 8. Review roles used during development

Prompts were also framed with these review roles (see `.ai/agents/`):

1. **UI Analyst** — spacing, type, and color against the observed listing
2. **Frontend Architect** — component boundaries and API-owned listing data
3. **Accessibility Reviewer** — focus, keyboard, names, and headings
4. **Visual QA Reviewer** — desktop sizes and overlay paths
5. **Code Quality Reviewer** — duplication, dead code, and API checks

---

## Notes for reviewers

- Tooling: Cursor (Composer) for implementation and visual QA loops.
- Images: Pexels URLs referenced by the API data, not copied from the reference app.
- Original implementation note: built from visual/behavioral observation of the provided reference only.
