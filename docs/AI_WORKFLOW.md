# AI development workflow

This project was built by inspecting the rendered reference, measuring layout, and writing an original React and Node implementation. The reference source was not copied.

## Roles

The files in `.ai/agents/` are the review roles used while building:

- UI Analyst — spacing, type, and color against the observed listing
- Frontend Architect — component boundaries and the API-owned listing data
- Accessibility Reviewer — focus, keyboard, names, and headings
- Visual QA Reviewer — the three desktop sizes and the overlay paths
- Code Quality Reviewer — duplication, dead code, and API checks

`.ai/skills/` holds two repeatable checks: visual comparison and listing interactions. `.cursor/rules/listing-page.mdc` keeps later edits on the same tokens and overlay rules.

## Prompts used

1. Inspect the rendered listing before writing UI. Record width, type sizes, gallery geometry, colors, and overlay behavior. Do not assume a generic listing layout.
2. Model photos, categories, reviews, and policies as data served by a Node API. Render the gallery, photo tour, and lightbox from that one list.
3. Open the photo tour from the hero and from Show all photos. Open the lightbox from a tour image. Keep the index in sync.
4. Close the top overlay with Escape. Move focus in on open and back to the trigger on close.
5. Compare the running page at 1366, 1440, and 1920. Fix one region at a time.

## Review process

- Architecture first: page, sections, overlays, and API.
- Implement the listing, then the photo tour, then the lightbox.
- Run the accessibility checklist against the overlays.
- Run `npm run build` and fix every TypeScript or Vite error.

## Visual comparison

The reference was opened in a desktop browser. Measurements that drove the layout:

- Content column 1120px, header about 80px
- Title 26px / 600, subtitle 22px / 600
- Gallery 480px tall, left image about 556px, four images about 274×236, 8px gap
- Text `#222222`, reserve button `#ff385c`, radius 8px on that button and 12px on the gallery
- Photo tour is a full-screen white page with category thumbnails and a two-column section
- Lightbox is white, with a centered image, 1 of 21, previous, next, a grid button, and close

## Debugging

- If the page stays on “Listing unavailable”, the Vite app cannot reach `http://localhost:3001`. Use `npm run dev`, which starts both.
- If a photo fails, the `photos` entry in `server/data/listing.js` is the source. Pexels URLs are the image host.
- Overlay bugs are usually focus or scroll-lock order. Escape is handled in `ListingPage` so only the top layer closes.
