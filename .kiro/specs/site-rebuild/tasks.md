# Tasks

## Phase 1: Shared Components + Under Construction Page

- [ ] Set up global CSS (variables, fonts, body reset, selection, base texture)
- [ ] Build `Chip` component (variants: neon, cyan, green)
- [ ] Build `TopBar` component (branding, status, live clock)
- [ ] Build `Footer` component
- [ ] Build `HudDossier` component (scan animation, glyph, rows, spark SVG, chips, configurable via props)
- [ ] Build `Panel` component (collapsible, corner brackets, aria-expanded, defaultOpen prop)
- [ ] Build `TerminalLog` component (typewriter effect, line-by-line reveal)
- [ ] Build `RebootBar` component (looping progress bar)
- [ ] Build `TextScramble` utility/hook (character scramble animation)
- [ ] Compose Under Construction page from shared components
- [ ] Respect `prefers-reduced-motion` across all animated components
- [ ] Verify build passes, deploy to main
- [ ] Verify responsive behavior at mobile/tablet/desktop breakpoints

## Phase 2: Full Site — Global + Hero

- [ ] Build `ScrollReveal` utility (IntersectionObserver + scramble + scanline wipe)
- [ ] Build Hero section (full viewport, background, grid overlay, title reveal, chips, scroll cue)

## Phase 2: About

- [ ] Build About section (Panel default open, prose left, HudDossier right)

## Phase 2: Demos

- [ ] Build Demo card component (image, number, title, description, chips, links)
- [ ] Build Demos section (Panel default collapsed, 6 demo cards)

## Phase 2: Media

- [ ] Build Photography carousel (prev/next, dots, filmstrip, swipe, keyboard, blurred BG)
- [ ] Build Video section (embed slot in collapsed Panel)
- [ ] Place existing audio player in Music Production panel (default open, placeholder styling)

## Phase 2: Contact

- [ ] Build Contact form (Netlify Forms integration, name/email/message/submit)
- [ ] Build EQ visualizer (decorative animated bars)
- [ ] Build Contact section (two-column: form + HUD with meter, EQ, buffer readout)

## Phase 2: Links + Footer

- [ ] Build Links section (Panel collapsed, two-column link card grid)
- [ ] Wire up Footer component in full site layout

## Phase 3: Music Player (separate spec)

- [ ] Write dedicated player spec (tabbed playlists, restyle, bug fixes)
- [ ] Accessibility audit: keyboard tab order, aria-labels, screen reader testing
- [ ] Execute player restyle and fixes
- [ ] Verify responsive player layout on mobile/tablet
