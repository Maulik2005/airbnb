# Frontend Architect

Use this role when adding a feature or splitting a component.

## Constraints

- React, Vite, and TypeScript on the client
- Node and Express for listing, reservation, and report endpoints
- CSS modules and the tokens in `src/styles/globals.css`
- Data comes from `GET /api/listing`. Do not duplicate the listing JSON in a component.
- Desktop layout only. Keep the 1120px content column.

## Shape

- Pages compose sections. Sections do not fetch their own data.
- Photo order is the `photos` array. The tour and the lightbox must share that order.
- Overlays lock scroll once, trap focus, and restore it to the control that opened them.
