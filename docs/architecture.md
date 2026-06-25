# Block Control 2025

## Project Overview

**Block Control** is a personal portfolio and artist website for **Cara Giulioni** — a front-end developer, visual artist, and DJ/music producer. Built as a single-page application, it showcases her work through an interactive audio player, visual components, and a cyberpunk-inspired dual-theme design.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | react-jss (CSS-in-JS, component-scoped) |
| Audio | react-h5-audio-player |
| Audio Hosting | Google Cloud Storage (MP3s) |
| Icons | Material Icons (Google Fonts CDN) |
| Linting | ESLint 9 |

## Key Features

- Dual theme system (cyber/neon) with light/dark mode toggle
- Custom audio player with tabbed playlists (Tracks, Mixes, Favorites)
- Hover/active states, download links, and prev/next navigation
- 3D card carousel with swipe/touch support
- Responsive layout with media query utilities
- "About" section with polaroid-style cards and folder UI

---

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Development Workflow                   │
└─────────────────────────────────────────────────────────┘

  ┌──────────┐     ┌──────────┐     ┌──────────────┐
  │  Author  │────▶│ npm run  │────▶│ Vite HMR Dev │
  │  Code    │     │   dev    │     │   Server     │
  └──────────┘     └──────────┘     └──────────────┘
                                           │
                                           ▼
                                    ┌──────────────┐
                                    │  Browser at  │
                                    │  localhost   │
                                    └──────────────┘

  ┌──────────┐     ┌──────────┐     ┌──────────────┐
  │  Build   │────▶│ npm run  │────▶│  Static      │
  │  for     │     │  build   │     │  dist/       │
  │  Prod    │     │          │     │  bundle      │
  └──────────┘     └──────────┘     └──────────────┘

  ┌──────────┐     ┌──────────┐
  │  Lint    │────▶│ npm run  │
  │  Check   │     │  lint    │
  └──────────┘     └──────────┘
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          index.html                                   │
│                     (entry point, loads /src/main.jsx)                │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          main.jsx                                     │
│                    ReactDOM.createRoot(#root)                         │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      ThemeProvider                                    │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  ThemeContext (darkMode, toggleTheme)                          │  │
│  │  JssThemeProvider (active theme object + screenWidth)          │  │
│  │                                                               │  │
│  │  Themes: ┌─────────┐  ┌─────────┐                            │  │
│  │          │  cyber   │  │   neon  │                            │  │
│  │          │ (light)  │  │  (dark) │                            │  │
│  │          └─────────┘  └─────────┘                            │  │
│  └───────────────────────────────────────────────────────────────┘  │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           App.jsx                                     │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          Home Page                                    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Landing                                                        │ │
│  │  └─ CenteredWrapper > <img> (logo/hero image)                  │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Audio Player                                                   │ │
│  │  ┌──────────────────┐  ┌────────────────────────────────────┐  │ │
│  │  │  Thumbnail +     │  │  Playlists Component               │  │ │
│  │  │  Controls        │  │  ┌────────┬────────┬────────────┐  │  │ │
│  │  │  (react-h5-      │  │  │ Tracks │ Mixes  │ Favorites  │  │  │ │
│  │  │   audio-player)  │  │  └────────┴────────┴────────────┘  │  │ │
│  │  │                  │  │  Track list with:                   │  │ │
│  │  │  ◀ ▶ ▶| 🔊      │  │  - hover/active states             │  │ │
│  │  └──────────────────┘  │  - download links                  │  │ │
│  │                        │  - favorite toggle                  │  │ │
│  │                        └────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  About (commented out)                                          │ │
│  │  └─ Folder > Polaroid > FeatureText                            │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Carousel (commented out in App.jsx)                            │ │
│  │  └─ 3D card stack with swipe/click navigation                  │ │
│  └────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     External Resources                                │
│                                                                      │
│  Google Cloud Storage ─── MP3 audio files                            │
│  Google Fonts CDN ─────── Material Icons                             │
│  global.css ───────────── CSS custom properties (--main-bg, etc.)   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
User Action (theme toggle / play / tab click)
        │
        ▼
┌──────────────────┐
│  ThemeContext     │──── darkMode state toggles CSS data-theme attribute
│  (React Context) │     on <html>, switching CSS custom properties
└──────────────────┘
        │
        ▼
┌──────────────────┐
│  JssThemeProvider │──── Provides theme tokens (colors, screenWidth)
│                  │     to all useStyles() hooks in child components
└──────────────────┘

Audio Player State (local to Player component):
  playlist[] ←→ mapTrackAttributes() ←→ Playlists UI
  currentTrack ←→ react-h5-audio-player <Controls>
  activeTab ←→ Tab buttons filter allTracks[]
```

---

## Project Structure

```
src/
├── main.jsx                  # Entry point, mounts app with ThemeProvider
├── App.jsx                   # Root component, renders Home
├── index.css                 # Base Vite styles
├── styles/
│   └── global.css            # CSS custom properties, data-theme styles
├── themes/
│   └── themes.js             # cyber + neon JSS theme objects
├── providers/
│   ├── ThemeContext.js        # React context for dark/light state
│   └── ThemeProvider.jsx      # Combines ThemeContext + JssThemeProvider
├── pages/
│   ├── home.jsx              # Main page (Landing + Player)
│   ├── demos.jsx             # Placeholder demos page
│   └── 404.js                # Not found page
├── components/
│   ├── wrapper.jsx           # CenteredWrapper layout utility
│   ├── landing/              # Hero/logo landing section
│   ├── audio-player/         # Audio player + playlists + utils
│   ├── carousel/             # 3D swipeable card carousel
│   ├── about/                # About section (polaroid, folder, grid)
│   └── feature-text/         # Styled text display component
├── utilities/
│   └── apply-media-query.jsx # Responsive breakpoint helper
└── images/                   # Static image assets
```

---

## Summary

This is a work-in-progress creative portfolio site. The landing page and audio player are active; the About section and Carousel are built but commented out. The architecture is straightforward — a single-page React app with no router, using JSS for scoped theming and local component state for the audio player logic. Audio assets are served from Google Cloud Storage.
