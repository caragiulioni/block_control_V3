# BLOCKCONTROL — V3

![Block Control](https://storage.googleapis.com/blockcontrol-2026/card.landing.png)

**[www.blockcontrol.ca](https://www.blockcontrol.ca)**

Personal portfolio site for Cara Giulioni — developer, DJ, visual artist. This is the third iteration of Block Control, rebuilt from the ground up.

---

## What's New

- Full UI/design overhaul with a dark cyberpunk/terminal aesthetic
- Custom-built music player with tabbed playlists, signal meter, and EQ visualizer
- Demos and photography presented in responsive carousels
- Interactive gateway overlay on first visit
- Contact form with animated terminal "transmission" sequence
- Styled auto-reply email on form submission via Resend
- Scroll-triggered section reveals with text scramble animations
- Accessibility-first approach throughout (keyboard nav, aria-labels, reduced-motion support)

## Stack

- **Framework:** React 19 + Vite
- **Styling:** CSS Modules + CSS custom properties (single dark theme)
- **Fonts:** Space Mono (headings/mono), Hanken Grotesk (body)
- **Hosting:** Netlify (auto-deploy from `main`)
- **Forms:** Netlify Forms with honeypot spam protection
- **Email:** Resend API (Netlify Functions, `submission-created` event)
- **Assets:** Google Cloud Storage (images, audio)
- **Domain/DNS:** IONOS (blockcontrol.ca), with SPF + DKIM configured for Resend

## Deployment

The site auto-deploys via Netlify webhook on push to `main`.

- **Production:** [www.blockcontrol.ca](https://www.blockcontrol.ca)

## Email / DNS Setup

- Domain email (`signal@blockcontrol.ca`) managed through IONOS
- Gmail alias configured for sending/receiving as the domain address
- Resend handles transactional auto-reply emails via API
- DNS records include SPF and DKIM entries for Resend domain verification
- Netlify Function (`submission-created`) triggers on every form submission and sends a styled HTML auto-reply to the submitter

## Local Development

```bash
npm install
npm run dev
```

For Netlify Functions locally: `netlify dev` (requires Netlify CLI and a linked site).

---
