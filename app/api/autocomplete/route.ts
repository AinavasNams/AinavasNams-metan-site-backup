// app/api/autocomplete/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query');
  if (!query) {
    return NextResponse.json({ status: 'INVALID_REQUEST', results: [] }, { status: 400 });
  }

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_SERVER_API_KEY;
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('⚠️ Missing GOOGLE_MAPS_SERVER_API_KEY env variable');
    return NextResponse.json(
      { status: 'ERROR', results: [], error: 'Missing server API key' },
      { status: 500 }
    );
  }
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&language=lv&components=country:lv&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === 'OK') {
      const predictions = Array.isArray(data.predictions) ? data.predictions : [];

      const results = await Promise.all(
        predictions.slice(0, 8).map(async (prediction: any) => {
          const baseResult = {
            label: prediction.description,
            value: prediction.description,
            place_id: prediction.place_id,
          };

          if (!prediction.place_id) {
            return baseResult;
          }

          try {
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${encodeURIComponent(
              prediction.place_id
            )}&fields=geometry&key=${GOOGLE_MAPS_API_KEY}`;
            const detailsRes = await fetch(detailsUrl);
            if (!detailsRes.ok) {
              console.warn('⚠️ Place Details request failed with status:', detailsRes.status);
              return baseResult;
            }
            const detailsData = await detailsRes.json();
            if (detailsData.status !== 'OK') {
              console.warn('⚠️ Place Details API status:', detailsData.status);
              return baseResult;
            }
            const location = detailsData.result?.geometry?.location;

            if (location?.lat && location?.lng) {
              return {
                ...baseResult,
                geometry: {
                  location: {
                    lat: Number(location.lat),
                    lng: Number(location.lng),
                  },
                },
              };
            }
          } catch (detailsError) {
            console.warn('⚠️ Failed to fetch place details:', detailsError);
          }

          return baseResult;
        })
      );

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
