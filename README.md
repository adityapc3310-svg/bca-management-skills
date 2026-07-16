# BCA Management Skills

Premium single-page site about **BCA Management Skills** — the curriculum that
transforms BCA graduates into technology leaders.

**Live:** <https://adityapc3310-svg.github.io/bca-management-skills/>

## Stack

- Static HTML/CSS/JS (zero build step)
- Three.js (orbital visualization in hero)
- Google Fonts: Space Grotesk + JetBrains Mono
- **Supabase** backend (REST, public anon-key) — see [`supabase/`](./supabase/)

## Structure

```
bca-management-skills/
├── index.html             ↪ home page (Hero, 5 Pillars, Curriculum, Career, Resources/Certs, CTA, Footer)
├── apply.html             ↪ admissions form (uses Supabase)
├── hero-3d.js             ↪ Three.js hero visualization
├── favicon.svg
├── supabase/
│   ├── schema.sql         ↪ tables + RLS + triggers (run in Supabase SQL editor)
│   ├── supabase-client.js ↪ vanilla REST client
│   ├── config.js          ↪ SUPABASE_URL + SUPABASE_ANON_KEY
│   └── README.md          ↪ setup instructions
└── README.md              ↪ this file
```

## Local preview

```bash
# any static server works, for example:
python -m http.server 8000
# then open http://localhost:8000
```

## Backend setup

See **[`supabase/README.md`](./supabase/README.md)** — fully walks through
creating a free Supabase project, running the schema, and pasting your anon
key into `supabase/config.js`. Until you do this, forms run in DEMO mode
and persist to `localStorage`.

## Design system

- Dark navy `#060910` / `#0a0f1a`
- Electric cyan `#00d4aa` (primary), warm amber `#ffb84d` (secondary accent)
- Typography: Space Grotesk (UI/display) + JetBrains Mono (numbers/labels)
- Honours `prefers-reduced-motion`. Hero 3D hidden on mobile.

## License

Educational/portfolio project for BCA coursework.
