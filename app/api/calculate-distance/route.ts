import { NextRequest, NextResponse } from 'next/server';

interface DistanceRequest {
  origin: string;
  destination: string;
}

interface DistanceResponse {
  distance: number; // в километрах
  duration: number; // в минутах
  status: 'OK' | 'ERROR';
  error?: string;
}

export async function POST(request: NextRequest) {
  console.log('🗺️ Distance calculation API called');
  
  try {
    const { origin, destination }: DistanceRequest = await request.json();
    
    if (!origin || !destination) {
      console.log('❌ Missing origin or destination');
      return NextResponse.json(
        { status: 'ERROR', error: 'Origin and destination are required' },
        { status: 400 }
      );
    }

    const serverApiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;
    
    if (!serverApiKey) {
      console.log('❌ Server API key not configured');
      return NextResponse.json(
        { status: 'ERROR', error: 'Server API key not configured' },
        { status: 500 }
      );
    }

    // Используем Distance Matrix API для расчета расстояния
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&units=metric&key=${serverApiKey}`;
    
    console.log('🌐 Calling Google Distance Matrix API...');
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('📊 Google API response status:', data.status);
    
    if (data.status !== 'OK') {
      console.log('❌ Google API error:', data.status, data.error_message);
      return NextResponse.json(
        { status: 'ERROR', error: `Google API error: ${data.status}` },
        { status: 400 }
      );
    }

    const element = data.rows[0]?.elements[0];
    
    if (!element || element.status !== 'OK') {
      console.log('❌ No route found or element error:', element?.status);
      return NextResponse.json(
        { status: 'ERROR', error: 'No route found between locations' },
        { status: 400 }
      );
    }

    // Извлекаем расстояние и время
    const distanceInMeters = element.distance.value;
    const durationInSeconds = element.duration.value;
    
    const distanceInKm = Math.round(distanceInMeters / 1000);
    const durationInMinutes = Math.round(durationInSeconds / 60);
    
    console.log(`✅ Distance calculated: ${distanceInKm}km, ${durationInMinutes}min`);
    
    const result: DistanceResponse = {
      distance: distanceInKm,
      duration: durationInMinutes,
      status: 'OK'
    };

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('❌ Distance calculation error:', error);
    return NextResponse.json(
      { status: 'ERROR', error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Также поддерживаем GET для простых запросов
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  
  if (!origin || !destination) {
    return NextResponse.json(
      { status: 'ERROR', error: 'Origin and destination parameters are required' },
      { status: 400 }
    );
  }
  
  // Переиспользуем логику POST
  const mockRequest = {
    json: async () => ({ origin, destination })
  } as NextRequest;
  
  return POST(mockRequest);
}