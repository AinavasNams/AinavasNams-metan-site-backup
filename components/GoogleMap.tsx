'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { useGoogleMapsApi } from '@/hooks/useGoogleMapsApi';

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    info?: string;
  }>;
  className?: string;
}

export default function GoogleMap({ 
  center, 
  zoom = 15, 
  markers = [], 
  className = "w-full h-64 rounded-lg" 
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Используем новый хук для загрузки Google Maps API
  const { isLoaded: isApiLoaded, isLoading: isApiLoading, error: apiError } = useGoogleMapsApi();

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !isApiLoaded || !window.google?.maps) return;

      console.log('✅ Initializing Google Maps with center:', center);

      // Create map
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ weight: "2.00" }]
          },
          {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [{ color: "#9c9c9c" }]
          },
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [{ visibility: "on" }]
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }]
          },
          {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#eeeeee" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#7b7b7b" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }]
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#46bcec" }, { visibility: "on" }]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#c8d7d4" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#070707" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          }
        ]
      });

      // Add markers
      markers.forEach((marker, index) => {
        console.log('Adding marker:', marker);
        
        const mapMarker = new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: googleMapRef.current,
          title: marker.title,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#2563eb" stroke="#ffffff" stroke-width="4"/>
                <circle cx="20" cy="20" r="8" fill="#ffffff"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 20)
          }
        });

        // Add info window if info text provided
        if (marker.info) {
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; font-family: Inter, sans-serif;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${marker.title}</h3>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">${marker.info}</p>
              </div>
            `
          });

          mapMarker.addListener('click', () => {
            infoWindow.open(googleMapRef.current, mapMarker);
          });
        }
      });

      setMapLoaded(true);
    };

    // Инициализируем карту когда Google Maps API загружен
    if (isApiLoaded) {
      console.log('🗺️ Google Maps API is ready, initializing map...');
      initMap();
    }
  }, [isApiLoaded, center, zoom, markers]);

  // Fallback component when Google Maps is not available
  if (apiError) {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
    const openStreetMapUrl = `https://www.openstreetmap.org/?mlat=${center.lat}&mlon=${center.lng}&zoom=${zoom}`;
    
    return (
      <div className={`${className} bg-gradient-to-br from-teal-50 to-emerald-100 border-2 border-dashed border-teal-200 relative overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 gap-2 h-full w-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="bg-teal-600 rounded-full"></div>
            ))}
          </div>
        </div>
        
        <div className="h-full flex flex-col items-center justify-center p-8 text-center relative z-10">
          <div className="mb-6 p-6 bg-white rounded-full shadow-xl border-4 border-teal-200">
            <MapPin className="h-10 w-10 text-teal-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-teal-900 mb-3">
            Atrašanās vieta kartē
          </h3>
          
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              ⚠️ Kartes API nav pieejams: {apiError}
            </p>
          </div>
          
          <div className="mb-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-teal-200 max-w-md">
            <p className="text-sm font-semibold text-teal-800 mb-2">
              📍 Koordinātes: {center.lat}°N, {center.lng}°E
            </p>
            
            {markers.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-teal-900 text-base">
                  {markers[0].title}
                </h4>
                {markers[0].info && (
                  <p className="text-sm text-teal-700 leading-relaxed">
                    {markers[0].info}
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-teal-700 font-medium">Skatīt kartē:</p>
            <div className="flex gap-3 flex-wrap justify-center">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <ExternalLink className="h-4 w-4" />
                Google Maps
              </a>
              <a 
                href={openStreetMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <ExternalLink className="h-4 w-4" />
                OpenStreetMap
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '250px' }}
      />
      {(!mapLoaded || isApiLoading) && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
            <span className="text-sm">
              {isApiLoading ? 'Ielādē Google Maps API...' : 'Ielādē karti...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}