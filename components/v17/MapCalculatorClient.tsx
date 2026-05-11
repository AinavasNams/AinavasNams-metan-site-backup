'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngLiteral } from 'leaflet';
import type { ExternalPin, MapCalcPayload, CalcResult as SharedCalcResult } from './MapCalculator';

// Fix Leaflet marker icons for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Zone = {
  key: string;
  minKm: number;
  maxKm: number;
  label: string;
  color: string;
  fillOpacity: number;
  price: string;
};

type Props = {
  onResult?: (payload: MapCalcPayload & { country_code?: string }) => void;
  externalPin?: ExternalPin | null;
};

const CENTER: LatLngLiteral = { lat: 56.4815, lng: 23.0618 }; // Bēne

const ZONES: Zone[] = [
  { key: 'z1', minKm: 0,   maxKm: 50,  label: '0–50 km',    color: '#7EDC8A', fillOpacity: 0.35, price: 'Cena no 365 € (ar līgumu uz 12 mēnešiem)' },
  { key: 'z2', minKm: 50,  maxKm: 100, label: '50–100 km',  color: '#FFD44D', fillOpacity: 0.30, price: 'Cena no 400 €' },
  { key: 'z3', minKm: 100, maxKm: 150, label: '100–150 km', color: '#FF9B3D', fillOpacity: 0.28, price: 'Cena no 460 €' },
  { key: 'z4', minKm: 150, maxKm: 200, label: '150–200 km', color: '#FF5A5F', fillOpacity: 0.26, price: 'Cena no 500 €' },
];

function circleRingLngLat(center: LatLngLiteral, radiusMeters: number, points = 240) {
  const earth = 6378137;
  const lat1 = center.lat * Math.PI / 180;
  const lon1 = center.lng * Math.PI / 180;
  const ang = radiusMeters / earth;

  const ring: [number, number][] = [];
  for (let i = 0; i <= points; i++) {
    const brng = (i / points) * 2 * Math.PI;
    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(ang) +
      Math.cos(lat1) * Math.sin(ang) * Math.cos(brng)
    );
    const lon2 = lon1 + Math.atan2(
      Math.sin(brng) * Math.sin(ang) * Math.cos(lat1),
      Math.cos(ang) - Math.sin(lat1) * Math.sin(lat2)
    );
    ring.push([lon2 * 180 / Math.PI, lat2 * 180 / Math.PI]);
  }
  return ring;
}

function worldWithHole(center: LatLngLiteral, holeRadiusMeters: number) {
  const outer: [number, number][] = [
    [-179.9, -85],
    [ 179.9, -85],
    [ 179.9,  85],
    [-179.9,  85],
    [-179.9, -85],
  ];

  return {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'Polygon' as const,
      coordinates: [outer, circleRingLngLat(center, holeRadiusMeters, 260)],
    },
  };
}

function labelPositionNorth(center: LatLngLiteral, radiusMeters: number): LatLngLiteral {
  // 1° lat ≈ 111_320m
  const dLat = radiusMeters / 111_320;
  return { lat: center.lat + dLat, lng: center.lng };
}

function makeLabelIcon(textTop: string, textBottom: string, color: string) {
  const html = `
  <div style="
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
    background: rgba(255,255,255,0.92);
    border: 1px solid rgba(0,0,0,0.12);
    border-left: 6px solid ${color};
    border-radius: 12px;
    padding: 6px 10px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.10);
    line-height: 1.1;
    white-space: nowrap;
  ">
    <div style="font-weight: 800; font-size: 12px; color: #111;">${textTop}</div>
    <div style="font-weight: 600; font-size: 11px; color: #374151; margin-top: 2px;">${textBottom}</div>
  </div>`;
  return L.divIcon({ className: 'zone-label', html, iconSize: [10, 10], iconAnchor: [5, 5] });
}

function samePoint(a: LatLngLiteral | null, b: LatLngLiteral | null) {
  if (!a || !b) return false;
  return Math.abs(a.lat - b.lat) < 1e-6 && Math.abs(a.lng - b.lng) < 1e-6;
}

export default function MapCalculatorClient({ onResult, externalPin }: Props) {
  const mapRef = useRef<L.Map | null>(null);

  const [query, setQuery] = useState('');
  const [pin, setPin] = useState<LatLngLiteral | null>(null);
  const [pinLabel, setPinLabel] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const [calc, setCalc] = useState<SharedCalcResult | null>(null);

  // ✅ сохраняем страну результата geocode (lv/lt)
  const [countryCode, setCountryCode] = useState<string>('');

  const outsideGeo = useMemo(() => worldWithHole(CENTER, 200_000), []);
  const sortedZones = useMemo(() => [...ZONES].sort((a, b) => b.maxKm - a.maxKm), []);

  // ✅ Distance calc теперь принимает countryCode и передаёт его в landing-calc
  async function calculateByRoads(lat: number, lng: number, cc?: string): Promise<SharedCalcResult> {
    const res = await fetch('/api/landing-calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'calculate', lat, lng, countryCode: cc || '' }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'calc failed');
    return data as SharedCalcResult;
  }

  async function setPinAndCalc(p: LatLngLiteral, label: string, cc?: string) {
    setStatus('loading');
    setPin(p);
    setPinLabel(label);
    setCalc(null);

    try {
      const r = await calculateByRoads(p.lat, p.lng, cc);
      setCalc(r);
      setStatus('idle');

      const map = mapRef.current;
      if (map) {
        map.fitBounds(
          L.latLngBounds([CENTER.lat, CENTER.lng], [p.lat, p.lng]).pad(0.35)
        );
      }

      onResult?.({
        lat: p.lat,
        lng: p.lng,
        address: label,
        result: r,
        country_code: cc,
      });
    } catch {
      setStatus('error');
    }
  }

  // ✅ External pin -> set marker + calc + sync right panel
  useEffect(() => {
    if (!externalPin) return;
    const p: LatLngLiteral = { lat: externalPin.lat, lng: externalPin.lng };
    if (samePoint(pin, p)) return;

    const label = externalPin.address || 'Jūsu atrašanās vieta';
    setQuery(label);

    // Внешний pin пока без country_code (MVP). Значит cross_border в API.
    setPinAndCalc(p, label, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalPin?.lat, externalPin?.lng]);

  async function handleSearch() {
    const q = query.trim();
    if (!q) return;

    setStatus('loading');
    setCalc(null);

    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 7000);

    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`, {
        signal: controller.signal,
      });
      const data = await res.json();

      if (!res.ok || data?.ok !== true || !data.lat || !data.lng) {
        throw new Error('no geocode');
      }

      const p: LatLngLiteral = { lat: data.lat, lng: data.lng };
      const label = data.display_name || q;
      const cc = String(data.country_code || '').toLowerCase(); // 'lv' | 'lt'

      setCountryCode(cc);
      await setPinAndCalc(p, label, cc);
    } catch (e: any) {
      // AbortError = нормальная отмена запроса при быстрой печати/таймауте
      if (e?.name === 'AbortError') return;
      setStatus('error');
    } finally {
      clearTimeout(t);
    }
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex gap-2">
        <input
          id="map-search"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ievadiet adresi (piem., Rīga, Brīvības iela 1)"
          className="flex-1 rounded-xl border px-4 py-3 text-sm"
        />
        <button
          onClick={handleSearch}
          disabled={status === 'loading'}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
        >
          {status === 'loading' ? 'Meklē...' : 'Pārbaudīt zonu'}
        </button>
      </div>

      {status === 'error' && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Neizdevās atrast adresi vai aprēķināt maršrutu. Pamēģiniet precīzāk.
        </div>
      )}

      <div className="h-[420px] md:h-[620px] rounded-2xl border overflow-hidden">
        <MapContainer
          center={CENTER}
          zoom={7}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
          ref={(m) => (mapRef.current = m)}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={CENTER}>
            <Popup><b>Bēne</b><br />Zonu centrs</Popup>
          </Marker>

          {/* Circles */}
          {sortedZones.map(z => (
            <Circle
              key={z.key}
              center={CENTER}
              radius={z.maxKm * 1000}
              pathOptions={{
                color: z.color,
                fillColor: z.color,
                fillOpacity: z.fillOpacity,
              }}
            />
          ))}

          {/* Permanent labels (always visible) */}
          {ZONES.map(z => (
            <Marker
              key={z.key + '_label'}
              position={labelPositionNorth(CENTER, z.maxKm * 1000)}
              icon={makeLabelIcon(z.label, z.price, z.color)}
              interactive={false}
            />
          ))}

          {/* Outside shade (>200km) */}
          <GeoJSON
            data={outsideGeo as any}
            style={{ fillColor: '#808080', fillOpacity: 0.2, weight: 0 }}
          />

          {pin && (
            <Marker position={pin}>
              <Popup>
                <b>{pinLabel}</b><br />
                {calc ? (
                  <>
                    Attālums (pa ceļiem): {calc.distance} km<br />
                    Zona: {calc.zone}<br />
                    Cena: {calc.isIndividual ? 'INDIVIDUĀLI' : `no ${calc.price} €`}<br />
                    Valsts: {countryCode ? countryCode.toUpperCase() : '—'}
                  </>
                ) : (
                  <>Aprēķina datus ielādē...</>
                )}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
