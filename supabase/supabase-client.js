// ============================================================
// Supabase REST client — zero-dependency, vanilla JS
// Used by forms on BCA Management Skills (newsletter, admissions, contact).
// All public insert-only — anon key is safe to commit.
// ============================================================

const SUPABASE_URL = window.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || '';

// Resolve mode: 'live' (real Supabase) | 'demo' (writes to localStorage)
const MODE = SUPABASE_URL && SUPABASE_ANON_KEY ? 'live' : 'demo';

if (MODE === 'demo') {
  console.info(
    '%c[BCA Management] Supabase not configured — running in DEMO mode.\n' +
    'Form submissions will be stored in localStorage.\n' +
    'To enable live mode, set SUPABASE_URL and SUPABASE_ANON_KEY in /config.js',
    'color:#00d4aa;font-weight:600'
  );
}

const LS_KEY = 'bca_management_submissions';

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeLocal(record) {
  const all = readLocal();
  all.unshift(record);
  localStorage.setItem(LS_KEY, JSON.stringify(all.slice(0, 200)));
  return record;
}

async function supabaseInsert(table, payload) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase ${res.status}: ${text || res.statusText}`);
  }
  return { ok: true, mode: 'live' };
}

// ------------------------------------------------------------
// Public API
// ------------------------------------------------------------

export async function subscribeNewsletter({ email, source = 'cta' } = {}) {
  const clean = String(email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    throw new Error('Please enter a valid email address.');
  }
  const record = {
    table: 'newsletter_subscribers',
    submitted_at: new Date().toISOString(),
    payload: { email: clean, source, referrer: location.href, user_agent: navigator.userAgent }
  };
  if (MODE === 'live') {
    await supabaseInsert('newsletter_subscribers', record.payload);
    return { ok: true, mode: 'live' };
  }
  return { ok: true, mode: 'demo', record: writeLocal(record) };
}

export async function submitAdmissionInquiry(form) {
  const full_name = String(form.full_name || '').trim();
  const email = String(form.email || '').trim().toLowerCase();
  const phone = String(form.phone || '').trim() || null;
  const current_year = String(form.current_year || '').trim() || null;
  const intended_start = String(form.intended_start || '').trim() || null;
  const message = String(form.message || '').trim() || null;
  if (full_name.length < 2) throw new Error('Please enter your full name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Please enter a valid email.');
  const record = {
    table: 'admissions_inquiries',
    submitted_at: new Date().toISOString(),
    payload: {
      full_name, email, phone, current_year, intended_start, message,
      source_page: location.pathname, referrer: document.referrer,
      user_agent: navigator.userAgent
    }
  };
  if (MODE === 'live') {
    await supabaseInsert('admissions_inquiries', record.payload);
    return { ok: true, mode: 'live' };
  }
  return { ok: true, mode: 'demo', record: writeLocal(record) };
}

export async function submitContactMessage(form) {
  const email = String(form.email || '').trim().toLowerCase();
  const message = String(form.message || '').trim();
  const name = String(form.name || '').trim() || null;
  const subject = String(form.subject || '').trim() || null;
  const topic = String(form.topic || 'general').trim();
  if (message.length < 1) throw new Error('Please enter a message.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Please enter a valid email.');
  const record = {
    table: 'contact_submissions',
    submitted_at: new Date().toISOString(),
    payload: {
      name, email, subject, message, topic,
      referrer: document.referrer, user_agent: navigator.userAgent
    }
  };
  if (MODE === 'live') {
    await supabaseInsert('contact_submissions', record.payload);
    return { ok: true, mode: 'live' };
  }
  return { ok: true, mode: 'demo', record: writeLocal(record) };
}

export const supabaseConfig = { MODE, URL: SUPABASE_URL, KEY_USED: !!SUPABASE_ANON_KEY };
