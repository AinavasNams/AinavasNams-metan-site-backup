// app/api/autocomplete/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query');
  if (!query) {
    return NextResponse.json({ status: 'INVALID_REQUEST', results: [] }, { status: 400 });
  }

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_SERVER_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&language=lv&components=country:lv&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === 'OK') {
      const results = data.predictions.map((p: any) => ({
        label: p.description,
        value: p.description,
      }));
      return NextResponse.json({ status: 'OK', results });
    } else {
      console.warn('⚠️ Google Autocomplete API status:', data.status);
      return NextResponse.json({ status: data.status, results: [] }, { status: 502 });
    }
  } catch (err) {
    console.error('❌ Error in /api/autocomplete:', err);
    return NextResponse.json({ status: 'ERROR', results: [] }, { status: 500 });
  }
}
