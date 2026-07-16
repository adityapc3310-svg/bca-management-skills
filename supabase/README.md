# BCA Management Skills — Backend (Supabase)

This folder contains the **backend integration** for the live site at
<https://adityapc3310-svg.github.io/bca-management-skills/>.

The front-end now ships with three tables' worth of behaviour:

| User action                              | Form on the site             | Supabase table                       |
| ---------------------------------------- | ---------------------------- | ------------------------------------ |
| Clicking **Apply Now** in the CTA        | `apply.html`                 | `admissions_inquiries`               |
| Submitting **any email signup on the site** | homepage CTA + footer card | `newsletter_subscribers`             |
| Sending a **general contact message**    | (planned `contact.html`)     | `contact_submissions`                |

Until your Supabase project URL and anon key are configured, the site
gracefully degrades to **DEMO mode**: submissions are stored in the
browser's `localStorage` so you can fully verify the UX end-to-end.

---

## 1. Create a free Supabase project

1. Sign up at <https://supabase.com> (free tier is enough).
2. Click **New Project**, pick a region, name, and database password.
3. Wait ~1 minute for provisioning.

## 2. Run the schema

1. In your Supabase dashboard, open **SQL Editor → New query**.
2. Paste the entire contents of [`schema.sql`](./schema.sql).
3. Click **Run**. This is idempotent — safe to re-run.

The script creates:

- **`newsletter_subscribers`** — `id`, `email` (unique), `source`, `referrer`,
  `user_agent`, `created_at`, `confirmed_at`. RLS: anon can `INSERT` only.
- **`admissions_inquiries`** — `id`, `full_name`, `email`, `phone`,
  `current_year`, `intended_start`, `message`, plus tracking columns.
  Status enum: `new | reviewing | accepted | rejected`. RLS: anon `INSERT` only.
- **`contact_submissions`** — `id`, `email`, `name`, `subject`, `message`,
  `topic`, plus tracking columns. RLS: anon `INSERT` only.

## 3. Wire up the keys

1. In Supabase: **Project Settings → API**.
2. Copy the **Project URL** and the **`anon` public** key.
3. Open [`config.js`](./config.js) in this repo and paste both values:

   ```js
   window.SUPABASE_URL = 'https://abcdefg.supabase.co';
   window.SUPABASE_ANON_KEY = 'eyJhbGciOiJI...long-anon-key';
   ```

4. Commit. The anon key is designed to be public — RLS keeps writes scoped to
   anonymous `INSERT` only.

After ~30 seconds, GitHub Pages will rebuild and the `<span class="demo-tag">`
on `apply.html` will switch from `DEMO` (yellow) to `LIVE` (green).

## 4. Local development

Copy `config.js` to a new `config.local.js` and uncomment the real keys
there (don't commit it). The client falls back to extracting values from
`window.SUPABASE_URL` / `window.SUPABASE_ANON_KEY`, so any HTML page can
override by loading its own `config.local.js` before the client.

## 5. Files in this folder

```
supabase/
├── schema.sql              ↪ tables, indexes, RLS, triggers (run once)
├── supabase-client.js      ↪ vanilla JS REST client (zero deps)
├── config.js               ↪ window.SUPABASE_URL + SUPABASE_ANON_KEY
└── README.md               ↪ this file
```

## 6. Verifying submissions

After a successful live submit, rows appear in your Supabase dashboard:

- **Table Editor → newsletter_subscribers / admissions_inquiries / contact_submissions**

You can also use **SQL Editor**:

```sql
select created_at, email, source from newsletter_subscribers order by created_at desc limit 20;
select created_at, full_name, email, status from admissions_inquiries order by created_at desc limit 20;
```

## 7. Security model

- All three tables have **Row Level Security enabled**.
- Anonymous visitors have only `INSERT` permission (signing up / submitting).
- Reading/updating requires the `authenticated` role; you'd add signed-in
  admin policies in Supabase if you later build an admin dashboard.
- Input is validated both client-side (UX) and by the Supabase policies
  (with `with check` length constraints) so a bad actor can't pollute rows.
