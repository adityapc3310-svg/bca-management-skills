// =============================================================
// Supabase project configuration
// =============================================================
// To wire up the live backend:
//   1. Create a free project at https://supabase.com
//   2. Open the SQL editor and run the contents of /supabase/schema.sql
//   3. From Project Settings → API, copy:
//        - Project URL         → paste into SUPABASE_URL below
//        - anon public key     → paste into SUPABASE_ANON_KEY below
//   4. Commit /cfg.js back to the repo (anon key is safe to expose to
//      browsers — Supabase row-level-security keeps mutations scoped to insert).
//   5. While still empty, the site runs in DEMO mode and stores submissions
//      in localStorage so you can preview the UX end-to-end.
//
// For local-only overrides during development you can copy this file to
// /config.js (already .gitignored below in the README) and uncomment the
// real values — the live keys in the committed file are what the deployed
// site will actually use.
// =============================================================

window.SUPABASE_URL = '';        // e.g. 'https://abcdxyz.supabase.co'
window.SUPABASE_ANON_KEY = '';   // e.g. 'eyJhbGciOiJI...long-anon-public-key'
