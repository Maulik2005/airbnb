# Airbnb Clone - PlayPower Labs Assignment

## Overview

A desktop listing page for a serviced apartment in Candolim, Goa. It includes the photo grid, full-screen photo tour, single-image lightbox, booking card, reviews, and a small Node API for the listing, reservation requests, and reports.

The interface was built independently from visual and behavioral observation of the provided reference. No reference source, components, styles, or scripts were copied.

## Tech Stack

- React 19 and TypeScript
- Vite
- CSS modules and design tokens
- Lucide React icons
- Node.js and Express

## Features

- Listing page with header search, gallery, host details, amenities, calendar, reviews, map, and nearby stays
- Photo tour opened from the hero image or Show all photos
- Lightbox with previous, next, counter, and the same 21-photo sequence
- Keyboard controls and focus restoration
- Sticky section navigation
- Reservation and report requests handled by the API

## Project Structure

```
server/
  index.js                 Express API (listing, reservations, reports)
  data/listing.js          Listing content and pricing helpers

src/
  main.tsx                 App entry
  App.tsx                  Loads listing from the API
  api.ts                   Client fetch helpers
  types.ts                 Shared TypeScript types
  constants/               Amenity icon map
  lib/format.ts            Dates and currency helpers
  hooks/                   Focus trap, presence, scroll lock
  styles/globals.css       Design tokens
  pages/ListingPage/       Page shell, overlays, and sticky nav
  components/
    Header/                Top search bar
    StickyNav/             In-page section nav
    ImageGallery/          Hero photo grid
    PhotoTour/             Full-screen photo tour
    Lightbox/              Single-image viewer
    PlaceDetails/          Guest favourite, sleep, amenities, calendar
    BookingCard/           Reserve rail
    Reviews/               Ratings and review cards
    LocationMap/           Neighbourhood map
    MeetHost/              Host and co-hosts
    NearbyAndPolicies/     Things to know and nearby stays
    ListingDialogs/        Reserve, report, and review dialogs
    Dialog/                Shared modal shell

docs/                      Architecture notes and AI workflow
.ai/                       Optional review agents used during development
.cursor/rules/             Project conventions
```

## Running Locally

```bash
npm install
npm run dev
```

The API runs at `http://localhost:3001` and the site at `http://localhost:5173`.

## Build

```bash
npm run build
npm start
```

`npm start` serves the API and the production build from `dist/`.

## Deployment

Build the client, then run the Node server with `PORT` set. Put the static build behind a CDN and run more than one API instance behind a load balancer for a production rollout. See `docs/architecture.md`.

## Architecture

`docs/architecture-diagram.png` and `docs/architecture.md` describe a production vacation-rental marketplace: edge cache, frontend, gateway, domain services, PostgreSQL, Redis, object storage, search, a queue, and monitoring.

## AI Development Workflow

Review roles live in `.ai/agents/`. The process, prompts, and visual measurements are in `docs/AI_WORKFLOW.md`.

## Accessibility

- Semantic regions and a single `h1`
- Named buttons, image alt text, and dialog labels
- Visible `:focus-visible` outlines
- Focus moves into an overlay and returns to the control that opened it
- The page behind an overlay is marked `inert`
- Escape closes only the top overlay

## Keyboard Controls

| Key | Action |
| --- | --- |
| Escape | Close the lightbox, then a dialog, then the photo tour |
| ArrowLeft | Previous lightbox image |
| ArrowRight | Next lightbox image |
| Tab | Move through the open overlay without leaving it |

## Important Implementation Decisions

- One photo list from `GET /api/listing` drives the hero, the tour, and the lightbox, so the index stays in sync.
- The hero and Show all photos open the photo tour. A tour image opens the lightbox.
- The content column is 1120px. The gallery is 480px tall with an 8px gap.
- Dates default to 18–23 October 2026, which is ₹28,499 for 5 nights before the optional 10% claim.
- Photos are served from Pexels (`https://www.pexels.com`) under the Pexels license. They are referenced by URL rather than copied from the reference application.

## Original Implementation Note

This implementation was independently developed from visual and behavioral observation of the provided reference. The reference repository and its source were not cloned, downloaded, or reused.
