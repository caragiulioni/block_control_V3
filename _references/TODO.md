# BLOCKCONTROL — TODO / NOTES

---

## DEMOs Section

- [ ] Add text somewhere noting this is the third iteration of the website

---

## Links

- [ ] Update links section with current data

| Name | URL | Note |
|------|-----|------|
|    *Kate White  |  https://soundcloud.com/brace_dnb   |  DJ, production, events  |
|     Francic DiStasio / Mega Labs |  https://www.mega-labs.io/   | AImeets music industry software |
|    David Rawalia  |  wallyofficial.com   |   DJ, production, events  |
|    Sam Vipond  |  https://soundcloud.com/sam-vipond   |  Sound designer, DJ, drummer |
| *Jeff Ray | https://jeffrayfilms.com/ | Use existing text |
| Saigon | www.instagram.com/djsaigon1 | A-Z of Toronto DNB? S = Saigon |
| GenericTM | www.instagram.com/generictm | Music and design powerhouse |
| DNA Records | www.dnarecords.org | For all your vinyl needs |

> `*` = already exists in the site mockup links but needs updated/corrected URL

---

## Contact Form

- [ ] Set up auto-reply email on form submission
  - Netlify Forms captures the submission
  - Use a Netlify Function (`submission-created` event) to trigger an auto-reply
  - Send via Resend (or similar) — free tier, no branding
  - Email sends from `signal@blockcontrol.ca` (requires DNS domain verification)
  - Style the email as HTML — terminal/cyberpunk vibe ("SIGNAL RECEIVED // OPERATOR WILL REPLY")
- [ ] Forward domain email to Gmail
- [ ] Set up Gmail alias to send as domain email

### UX / Design Overhaul

- [ ] Replace audio bus area with a "Ready to Transmit" component:
  - Looks like a blank terminal with a blinking cursor + empty loading bar at bottom
  - On form submit click:
    1. Terminal begins "typing" status messages
    2. Loading bar fills (same style as gateway handshake bar on SystemDown page)
    3. At 100%: bar turns green, success message appears
  - Reuse/adapt the barber-pole progress bar from the gateway reference
- [ ] Keep existing HUD status rows:
  - SECURE / PROTOCOL
  - RELAY / SMTP
  - NODE / MTL
  - ENCRYPTION / ON
- [ ] Simplify signal bar — replace with something like `SIGNAL // READY` or `CHANNEL // OPEN`
- [ ] On mobile: TBD — ensure form + transmit animation works well stacked

### Language ideas for terminal typing sequence:
```
> BUFFER LOADED // PREPARING TRANSMISSION
> ROUTING: NODE_MTL → RELAY_SMTP
> PACKET ENCRYPTED // DISPATCHING...
> ████████████████ COMPLETE
> SIGNAL RECEIVED — STANDBY FOR REPLY
```

---

## Optimization

- [ ] Compress `video-thumbnail.png` (currently 4.3MB — too large for deploy)

---

## DONE ✓

- [x] Refactor DEMOs section to use the carousel component
- [x] Build photo display using two reference URL files (`photourls_2026.txt`, `photourls_legacy.txt`)
  - 2026 (new) photos first, randomized; legacy after, randomized (Fisher-Yates)
- [x] Remove the EQ visualizer from contact — incorporated into music player instead
  - Signal indicator flatlines when paused, fills on play
  - Audio bus animates on play, freezes on pause

---
