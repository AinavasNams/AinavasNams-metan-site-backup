import { NextResponse } from 'next/server';

type CacheItem = { ts: number; value: any };
const CACHE = new Map<string, CacheItem>();
const TTL_MS = 1000 * 60 * 60; // 1 hour
const UPSTREAM_TIMEOUT_MS = 4500;

// Rough bounding box for Latvia + Lithuania (left, top, right, bottom)
const VIEWBOX = '20.5,58.2,28.5,53.7';

function normalizeQuery(q: string) {
  return q
    .replace(/\b(LT|LV)-?\s?\d{4,6}\b/gi, '')
    .replace(/[\/|]/g, ' ')
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectHint(q: string): 'lv' | 'lt' | '' {
  const s = q.toLowerCase();
  if (/(latv|latvia|latvija|lv\b)/i.test(s)) return 'lv';
  if (/(lietuv|lithuan|lietuva|lt\b)/i.test(s)) return 'lt';
  return '';
}

async function nominatimSearch(q: string) {
  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?format=json&limit=5&addressdetails=1` +
    `&countrycodes=lv,lt` +
    `&viewbox=${encodeURIComponent(VIEWBOX)}` +
    `&bounded=1` +
    `&q=${encodeURIComponent(q)}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'lv,en;q=0.8,ru;q=0.5',
        'User-Agent': 'metan.lv zone map (contact: info@metan.lv)',
        Referer: 'https://metan.lv/',
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!res.ok) return null;

    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function pickBest(results: any[], prefer: 'lv' | 'lt' | '') {
  if (!Array.isArray(results) || results.length === 0) return null;

  const filtered = results.filter((r) => {
    const cc = String(r?.address?.country_code || '').toLowerCase();
    return cc === 'lv' || cc === 'lt';
  });

  if (filtered.length === 0) return null;

  if (prefer) {
    const pref = filtered.find(
      (r) => String(r?.address?.country_code || '').toLowerCase() === prefer
    );
    if (pref) return pref;
  }

  // default: Latvia first
  const lv = filtered.find((r) => String(r?.address?.country_code || '').toLowerCase() === 'lv');
  if (lv) return lv;

  return filtered[0];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const qRaw = (searchParams.get('q') || '').trim();

  if (!qRaw) {
    return NextResponse.json({ ok: false, error: 'q required' }, { status: 400 });
  }

  const q1 = qRaw.slice(0, 200);
  const q2 = normalizeQuery(q1);

  const cacheKey = q1.toLowerCase();
  const cached = CACHE.get(cacheKey);
  if (cached && Date.now() - cached.ts < TTL_MS) {
    return NextResponse.json(cached.value);
  }

  const prefer = detectHint(q2); // lv / lt / ''

  // Try 1: raw
  let results = await nominatimSearch(q1);
  let best = results ? pickBest(results, prefer) : null;

  // Try 2: normalized
  if (!best) {
    results = await nominatimSearch(q2);
    best = results ? pickBest(results, prefer) : null;
  }

  // Try 3: country-tailored retries (default prefer LV)
  if (!best) {
    const tries =
      prefer === 'lt'
        ? [`${q2}, Lietuva`, `${q2}, Latvija`]
        : [`${q2}, Latvija`, `${q2}, Lietuva`];

    for (const t of tries) {
      results = await nominatimSearch(t);
      best = results ? pickBest(results, prefer || (t.includes('Latv') ? 'lv' : 'lt')) : null;
      if (best) break;
    }
  }

  if (!best) {
    const out = { ok: false, error: 'not found (lv/lt only)' };
    CACHE.set(cacheKey, { ts: Date.now(), value: out });
    return NextResponse.json(out);
  }

  const cc = String(best?.address?.country_code || '').toLowerCase();

  const out = {
    ok: true,
    lat: parseFloat(best.lat),
    lng: parseFloat(best.lon),
    display_name: best.display_name,
    country_code: cc, // 'lv' | 'lt'
  };

  CACHE.set(cacheKey, { ts: Date.now(), value: out });
  return NextResponse.json(out);
}
