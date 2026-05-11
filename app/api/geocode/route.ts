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

function deepClean(q: string): string {
  return q
    // Remove company types (LT/LV/EN/RU)
    .replace(/\b(UAB|AB|MB|I[IĮ]|V[SŠ][IĮ]|SIA|AS|IK|ZS|VSIA|O[UÜ]|Ltd|LLC|GmbH|s\.r\.o\.|[ОO][ОO][ОO]|[ОO][АA][ОO])\b\.?/gi, '')
    // Remove quoted company names
    .replace(/[„"«»""'\u201C\u201D\u201E\u201F]/g, '')
    // Remove common words that confuse geocoding
    .replace(/\b(firma|company|uznemums|bendrov[eė])\b/gi, '')
    // Remove district/region abbreviations
    .replace(/\b(raj\.|r\.|nov\.|pag\.|sav\.|sen\.|apsr\.|aps\.)\s*/gi, ' ')
    // Remove postal codes
    .replace(/\b(LT|LV)-?\s?\d{4,6}\b/gi, '')
    // Remove special chars
    .replace(/[\/|()#№]/g, ' ')
    // Collapse commas with no content
    .replace(/,\s*,/g, ',')
    // Collapse spaces
    .replace(/\s+/g, ' ')
    // Clean leading/trailing commas
    .replace(/^[\s,]+|[\s,]+$/g, '')
    .trim();
}

function extractStreetCity(q: string): string[] {
  const cleaned = deepClean(q);
  const parts = cleaned.split(',').map(p => p.trim()).filter(p => p.length > 1);
  const candidates: string[] = [];

  if (parts.length >= 2) {
    // Last 2 parts (usually city + street)
    candidates.push(parts.slice(-2).join(', '));
    // Last 3 parts
    if (parts.length >= 3) {
      candidates.push(parts.slice(-3).join(', '));
    }
  }

  // Also try just the cleaned version
  if (cleaned !== q && cleaned.length > 3) {
    candidates.push(cleaned);
  }

  return candidates;
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

  // Try 2: basic normalized
  if (!best) {
    results = await nominatimSearch(q2);
    best = results ? pickBest(results, prefer) : null;
  }

  // Try 3: country-tailored retries
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

  // Try 4: deep clean (remove company names, abbreviations)
  if (!best) {
    const q3 = deepClean(q1);
    if (q3 !== q2 && q3.length > 2) {
      results = await nominatimSearch(q3);
      best = results ? pickBest(results, prefer) : null;

      // Try 4b: deep clean + country
      if (!best) {
        const tries =
          prefer === 'lt'
            ? [`${q3}, Lietuva`, `${q3}, Latvija`]
            : [`${q3}, Latvija`, `${q3}, Lietuva`];

        for (const t of tries) {
          results = await nominatimSearch(t);
          best = results ? pickBest(results, prefer || (t.includes('Latv') ? 'lv' : 'lt')) : null;
          if (best) break;
        }
      }
    }
  }

  // Try 5: extract street + city only
  if (!best) {
    const candidates = extractStreetCity(q1);
    for (const c of candidates) {
      results = await nominatimSearch(c);
      best = results ? pickBest(results, prefer) : null;
      if (best) break;

      // Also try with country suffix
      const countryTries =
        prefer === 'lt'
          ? [`${c}, Lietuva`, `${c}, Latvija`]
          : [`${c}, Latvija`, `${c}, Lietuva`];

      for (const t of countryTries) {
        results = await nominatimSearch(t);
        best = results ? pickBest(results, prefer || (t.includes('Latv') ? 'lv' : 'lt')) : null;
        if (best) break;
      }
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

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    // 1) Reverse geocode по координатам (lat/lng)
    const lat = Number(body?.lat);
    const lng = Number(body?.lng);

    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      const cacheKey = `rev:${lat.toFixed(5)},${lng.toFixed(5)}`;
      const cached = CACHE.get(cacheKey);
      if (cached && Date.now() - cached.ts < TTL_MS) {
        return NextResponse.json(cached.value);
      }

      const url =
        `https://nominatim.openstreetmap.org/reverse` +
        `?format=json&addressdetails=1` +
        `&zoom=18` +
        `&lat=${encodeURIComponent(String(lat))}` +
        `&lon=${encodeURIComponent(String(lng))}`;

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

        if (!res.ok) {
          const out = { ok: false, error: 'reverse geocode upstream failed' };
          return NextResponse.json(out, { status: 502 });
        }

        const data: any = await res.json();
        const cc = String(data?.address?.country_code || '').toLowerCase();

        if (cc !== 'lv' && cc !== 'lt') {
          const out = { ok: false, error: 'outside lv/lt' };
          CACHE.set(cacheKey, { ts: Date.now(), value: out });
          return NextResponse.json(out, { status: 400 });
        }

        const out = {
          ok: true,
          lat,
          lng,
          display_name: String(data?.display_name || ''),
          country_code: cc,
        };

        CACHE.set(cacheKey, { ts: Date.now(), value: out });
        return NextResponse.json(out);
      } catch {
        const out = { ok: false, error: 'reverse geocode timeout' };
        return NextResponse.json(out, { status: 504 });
      } finally {
        clearTimeout(timer);
      }
    }

    // 2) Forward geocode по строке q
    const q = String(body?.q || '').trim();
    if (q) {
      const url = new URL(req.url);
      url.searchParams.set('q', q);
      return GET(new Request(url.toString(), { method: 'GET' }));
    }

    return NextResponse.json({ ok: false, error: 'q or lat/lng required' }, { status: 400 });
  } catch {
    return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 });
  }
}
