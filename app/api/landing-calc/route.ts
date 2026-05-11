import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Rate Limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// KONFIGURĀCIJA: BĀZE BĒNE
const BASE_COORDS = { lat: 56.4815, lon: 23.0618 };

type ZoneData = {
  id: string;
  title: string;
  price: number | null;
  basePrice: number | null;
};

type RouteMode = 'lv_only' | 'cross_border';
type RouteProvider = 'google_matrix' | 'graphhopper';

function normCC(v: any): 'lv' | 'lt' | '' {
  const s = String(v || '').trim().toLowerCase();
  if (s === 'lv') return 'lv';
  if (s === 'lt') return 'lt';
  return '';
}

function getZoneData(km: number): ZoneData {
  if (km <= 50)  return { id: 'zone_1', title: 'Zona 1 (0-50 km)', price: 365, basePrice: 430 };
  if (km <= 100) return { id: 'zone_2', title: 'Zona 2 (50-100 km)', price: 400, basePrice: 480 };
  if (km <= 150) return { id: 'zone_3', title: 'Zona 3 (100-150 km)', price: 460, basePrice: 540 };
  if (km <= 200) return { id: 'zone_4', title: 'Zona 4 (150-200 km)', price: 500, basePrice: 590 };
  return { id: 'individual', title: 'Ārpus 200 km zonas', price: null, basePrice: null };
}

async function googleMatrixDistanceKm(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number
) {
  const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_MAPS_SERVER_API_KEY not configured');

  const origin = `${originLat},${originLng}`;
  const destination = `${destLat},${destLng}`;

  const url =
    `https://maps.googleapis.com/maps/api/distancematrix/json` +
    `?origins=${encodeURIComponent(origin)}` +
    `&destinations=${encodeURIComponent(destination)}` +
    `&units=metric` +
    `&key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, { cache: 'no-store' });
  const data = await response.json();

  if (data.status !== 'OK') {
    throw new Error(`Google API error: ${data.status}`);
  }

  const element = data.rows?.[0]?.elements?.[0];
  if (!element || element.status !== 'OK') {
    throw new Error(`No route found: ${element?.status || 'UNKNOWN'}`);
  }

  return {
    km: Math.round(element.distance.value / 1000),
    minutes: Math.round(element.duration.value / 60),
    provider: 'google_matrix' as RouteProvider,
  };
}

const LT_BBOX = {
  minLon: 20.9,
  minLat: 53.9,
  maxLon: 26.9,
  maxLat: 56.5,
};

function makeAvoidAreaFromBBox(b: typeof LT_BBOX) {
  const p1 = `${b.minLat},${b.minLon}`;
  const p2 = `${b.minLat},${b.maxLon}`;
  const p3 = `${b.maxLat},${b.maxLon}`;
  const p4 = `${b.maxLat},${b.minLon}`;
  return `${p1}|${p2}|${p3}|${p4}|${p1}`;
}

async function graphhopperDistanceKm(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  mode: RouteMode
) {
  const key = process.env.GRAPHOPPER_API_KEY;
  if (!key) throw new Error('GRAPHOPPER_API_KEY not configured');

  const baseUrl = process.env.GRAPHOPPER_URL || 'https://graphhopper.com/api/1/route';
  const vehicle = process.env.GRAPHOPPER_VEHICLE || 'car';

  const params = new URLSearchParams();
  params.set('key', key);
  params.append('point', `${originLat},${originLng}`);
  params.append('point', `${destLat},${destLng}`);
  params.set('vehicle', vehicle);
  params.set('locale', 'en');
  params.set('instructions', 'false');
  params.set('calc_points', 'false');

  if (mode === 'lv_only') {
    params.set('avoid_area', makeAvoidAreaFromBBox(LT_BBOX));
  }

  const url = `${baseUrl}?${params.toString()}`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`GraphHopper error: ${data?.message || res.statusText}`);
  }

  const path = data?.paths?.[0];
  if (!path || typeof path.distance !== 'number' || typeof path.time !== 'number') {
    throw new Error('GraphHopper: no path');
  }

  return {
    km: Math.round(path.distance / 1000),
    minutes: Math.round(path.time / 60000),
    provider: 'graphhopper' as RouteProvider,
  };
}

async function roadDistanceKm(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  mode: RouteMode
) {
  if (mode === 'lv_only' && process.env.GRAPHOPPER_API_KEY) {
    return await graphhopperDistanceKm(originLat, originLng, destLat, destLng, mode);
  }
  return await googleMatrixDistanceKm(originLat, originLng, destLat, destLng);
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error('SMTP credentials not configured');
  }

  const secure =
    typeof process.env.SMTP_SECURE === 'string'
      ? process.env.SMTP_SECURE === 'true'
      : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (body.action === 'calculate') {
      const { lat, lng } = body;
      const cc = normCC(body.countryCode ?? body.country_code);

      if (typeof lat !== 'number' || typeof lng !== 'number') {
        return NextResponse.json({ error: 'Coordinates required' }, { status: 400 });
      }

      const routeMode: RouteMode = cc === 'lv' ? 'lv_only' : 'cross_border';

      const { km, minutes, provider } = await roadDistanceKm(
        BASE_COORDS.lat,
        BASE_COORDS.lon,
        lat,
        lng,
        routeMode
      );

      const zone = getZoneData(km);

      const warning =
        routeMode === 'lv_only' && provider !== 'graphhopper'
          ? 'LV-only requested but routing provider cannot enforce avoid-country.'
          : undefined;

      return NextResponse.json({
        distance: km,
        minutes,
        zone: zone.title,
        price: zone.price,
        basePrice: zone.basePrice,
        isIndividual: zone.price === null,
        country_code: cc || undefined,
        routeMode,
        routeProvider: provider,
        warning,
      });
    }

    if (body.action === 'submit_lead') {
      const { phone, email, address, zone, price, distance, isIndividual } = body.data || {};
      if (!phone) {
        return NextResponse.json({ error: 'Phone required' }, { status: 400 });
      }

      const transporter = createTransporter();

      await transporter.sendMail({
        from: `"Metan Kalkulators" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: email || undefined,
        subject: isIndividual
          ? `⚠️ INDIVIDUĀLS PIEPRASĪJUMS (>200 km): ${phone}`
          : `✅ Jauns Līguma Klients (${zone}): ${phone}`,
        text: `
PIETEIKUMS NO PARTNERU LAPAS

Telefons: ${phone}
E-pasts: ${email || '-'}
Adrese: ${address || '-'}

Attālums: ~${distance ?? '-'} km
Zona: ${zone}
Cena: ${price ? price + ' €' : 'INDIVIDUĀLI'}
`,
      });

      return NextResponse.json({ success: true });
    }

    if (body.action === 'send_to_customer') {
      const { email, address, zone, price, distance, isIndividual } = body.data || {};
      if (!email) {
        return NextResponse.json({ error: 'Email required' }, { status: 400 });
      }

      const transporter = createTransporter();

      await transporter.sendMail({
        from: `"Metan.lv" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Metan.lv — Aprēķina kopsavilkums',
        text: `
Labdien!

Nosūtām Jūsu aprēķinu:

Adrese: ${address || '-'}
Attālums: ~${distance ?? '-'} km
Zona: ${zone}
Cena: ${isIndividual ? 'INDIVIDUĀLI' : `no ${price} €`}

Ar cieņu,
metan.lv
`,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (e) {
    console.error('landing-calc error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
