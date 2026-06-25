# Block Control 2025 — Site Rebuild

## Overview

Rebuild blockcontrol.ca as a static React (Vite) site using CSS Modules and CSS custom properties for styling. The design is fully defined in two HTML reference files. The site is a personal portfolio for Cara Giulioni (developer, DJ, visual artist) with a cyberpunk/terminal aesthetic.

## Reference Files

- `_references/blockcontrol-system-down.html` — Under construction page
- `_references/blockcontrol fullsite.html` — Complete site design

## Design System

- **Fonts:** Space Mono (mono/headings), Hanken Grotesk (body)
- **Color palette:** CSS custom properties (--void, --cyan, --neon, --ink, --panel, --line, etc.)
- **Styling approach:** CSS Modules (`.module.css`) for components, global CSS for variables/resets/body
- **No theme toggle** — single dark theme
- **Animations:** Scroll-triggered decode/scramble on section entry, scanline wipe, blinking cursor, EQ bars
- **Responsive:** Mobile-first approach. All layouts designed for small screens first, scaled up with breakpoints. Reference CSS uses `clamp()`, fluid padding, and grid collapsing at ~600px/820px.
- **Accessibility:** `prefers-reduced-motion` respected, proper aria attributes, keyboard navigation, focus-visible styles, semantic HTML. Player accessibility (tab navigation, aria-labels on controls, skip/prev/next reachable via keyboard) to be verified and documented in Phase 3 spec.

---

## Phase 1: Shared Components + Under Construction Page

### Goal
Build reusable components from the design system, compose them into the "System Down" page, and deploy to `main` so the live site shows something immediately.

### Shared Components to Build

1. **Chip** — Inline label/badge with variants (neon, cyan, green)
2. **TopBar** — Site header bar with branding, status text, live clock
3. **Footer** — Bottom bar with site link and tagline
4. **HUD Dossier** — Sidebar card with scan animation, glyph avatar, row data, trajectory spark SVG, chips, footer line. Configurable content via props.
5. **Panel (collapsible)** — Corner-bracket container with header button, expand/collapse via CSS grid-rows animation, aria-expanded support. Accepts `defaultOpen` prop.

### Under Construction Page Composition

- TopBar (BLOCKCONTROL // NODE_MTL // OFFLINE)
- Two-column grid layout:
  - Left: Alert panel with heading ("SYSTEM DOWN"), scramble animation on title, subtitle, status chips, terminal typewriter log, reboot progress bar (looping), retry button
  - Right: HUD Dossier (subject info, STANDBY status)
- Footer

### Under Construction Page — Interactive Behaviors

- Live clock in TopBar
- Text scramble animation on "DOWN" heading
- Terminal typewriter effect (sequential line reveal)
- Reboot progress bar (loops: fills to ~80%, stalls, resets)
- Retry button re-triggers all animations
- `prefers-reduced-motion`: disable animations, show static content

---

## Phase 2: Full Site (section by section)

### Global Setup
- CSS variables from the design (full palette)
- Body background texture (radial gradients + scanlines + grid pattern)
- Font imports (Google Fonts: Space Mono, Hanken Grotesk)
- Scroll-reveal utility (IntersectionObserver-based, triggers scramble + scanline wipe)
- `::selection` styling

### Sections

#### Hero
- Full viewport height, background image (base64 or GCS-hosted later), overlay gradients, grid pattern
- TopBar (branding + live clock)
- Animated title reveal (staggered fade-up on load)
- Eyebrow text, main heading (BLOCKCONTROL), subtitle with name
- Role chips (DEV, SOUND, VISUAL)
- Scroll cue with blinking arrow

#### About (default open)
- Section heading with eyebrow
- Collapsible Panel wrapping a two-column "dossier" layout:
  - Left: Prose paragraphs (bio text)
  - Right: HUD Dossier sidebar (same component as under-construction, different data — STATUS: ACTIVE)

#### Demos (default collapsed)
- Section heading with eyebrow
- Collapsible Panel containing project cards (6 demos)
- Each card: background image, demo number, title, description, tech chips, GitHub/Live/Demo links
- Card data can live in a static array or JSON reference file

#### Media — Music Production (default open)
- Section heading with eyebrow
- Collapsible Panel containing the audio player
- **NOTE:** Existing player component will be restyled to match the site design. It uses a tabbed interface (Tracks / Mixes tabs) to switch playlists. Detailed player spec to follow in a separate document when we reach Phase 3.
- Tracklist display beneath player

#### Media — DJ Mixes (default collapsed)
- Collapsible Panel
- Same player module, loaded with DJ mix playlist
- **NOTE:** May merge with Music Production as a tab rather than separate panel — TBD in player spec

#### Media — Video (default collapsed)
- Collapsible Panel
- Video embed slot (YouTube or direct)

#### Media — Photography (default collapsed)
- Collapsible Panel containing a photo carousel
- Features: prev/next buttons, dot indicators, filmstrip thumbnails, swipe on mobile, keyboard nav
- Blurred background copy behind main image
- Photo data from reference file (GCS URLs later)

#### Contact (default open)
- Two-column layout (no collapsible panel — always visible)
- Left: Contact form (name, email, message, submit button) — Netlify Forms integration
- Right: HUD sidebar (channel status, signal meter, EQ visualizer)
- EQ visualizer: decorative animated bars (CSS keyframes, no real audio input)
- Live character count in HUD footer ("BUFFER // 0042 B")

#### Links (default collapsed)
- Collapsible Panel
- Two-column grid of link cards (name, description, external URL)
- 8 associate links

#### Footer
- Max-width container, border-top
- Site link left, tagline right

---

## Phase 3: Music Player Restyle + Bug Fixes

- Separate spec to be written when Phase 2 is complete
- Scope: restyle player to match site aesthetic, fix known bugs, finalize tabbed playlist UX (Tracks/Mixes), hover/active/paused states, download functionality, prev/next disable logic, volume hide on mobile
- Accessibility audit: verify keyboard tab order through all player controls, ensure aria-labels on play/pause/skip/download/favorite, screen reader announcements for track changes
- Uses `react-h5-audio-player` under the hood (or evaluate alternatives)

---

## Technical Decisions

| Decision | Choice |
|----------|--------|
| Framework | React 19 + Vite |
| Styling | CSS Modules + CSS custom properties |
| Language | JSX (not TypeScript) |
| Theming | Single dark theme, no toggle |
| Fonts | Google Fonts (Space Mono, Hanken Grotesk) |
| Forms | Netlify Forms |
| Audio hosting | Google Cloud Storage |
| Image hosting | Google Cloud Storage (URLs in reference file) |
| Deployment | Netlify, auto-deploy from `main` |
| Player library | react-h5-audio-player (existing, may revisit) |

---

## Asset Strategy

- All images and audio hosted on Google Cloud Storage
- A reference file (JSON or similar) will map asset URLs to their usage
- No local image/audio files in the repo beyond what the player currently uses (KEAK.jpg, RIOT.jpg — to be replaced with GCS URLs later)

---

## Build Order

1. Shared components (Chip, TopBar, Footer, HUD, Panel)
2. Under Construction page → deploy to `main`
3. Global styles + scroll-reveal utility
4. Hero section
5. About section
6. Demos section
7. Media sections (Photography carousel, Video embed — player placeholder)
8. Contact section (form + HUD + EQ)
9. Links section
10. Footer
11. Player restyle (separate spec)
