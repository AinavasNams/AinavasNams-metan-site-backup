'use client';

import { useState, useEffect } from 'react';

interface GoogleMapsApiState {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

let isApiLoading = false;
let isApiLoaded = false;
let apiError: string | null = null;

export function useGoogleMapsApi(): GoogleMapsApiState {
  const [state, setState] = useState<GoogleMapsApiState>({
    isLoaded: isApiLoaded,
    isLoading: isApiLoading,
    error: apiError
  });

  useEffect(() => {
    // Если API уже загружен или загружается, обновляем состояние
    if (isApiLoaded) {
      setState({ isLoaded: true, isLoading: false, error: null });
      return;
    }

    if (isApiLoading) {
      setState({ isLoaded: false, isLoading: true, error: null });
      return;
    }

    // Проверяем есть ли уже Google Maps
    if (window.google?.maps?.places) {
      console.log('✅ Google Maps API already loaded');
      isApiLoaded = true;
      setState({ isLoaded: true, isLoading: false, error: null });
      return;
    }

    // Проверяем есть ли API ключ
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    // 🚨 ДИАГНОСТИКА ДЛЯ PRODUCTION
    console.log('🔍 Google Maps API Diagnostics:', {
      environment: process.env.NODE_ENV,
      hasApiKey: !!apiKey,
      apiKeyPrefix: apiKey ? `${apiKey.substring(0, 10)}...` : 'MISSING',
      currentDomain: typeof window !== 'undefined' ? window.location.hostname : 'SSR',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'SSR'
    });
    
    if (!apiKey || apiKey === 'XXXXXXXXXX' || apiKey.length < 20) {
      const error = `Google Maps API key not configured properly. Environment: ${process.env.NODE_ENV}. Domain: ${typeof window !== 'undefined' ? window.location.hostname : 'SSR'}`;
      console.error('❌', error);
      console.error('💡 For production, set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in deployment environment');
      apiError = error;
      setState({ isLoaded: false, isLoading: false, error });
      return;
    }

    // Начинаем загрузку
    isApiLoading = true;
    setState({ isLoaded: false, isLoading: true, error: null });

    console.log(`🔄 Loading Google Maps API for domain: ${window.location.hostname}`);

    // Создаем уникальный callback name
    const callbackName = `initGoogleMapsApi_${Date.now()}`;
    
    // Создаем callback функцию
    (window as any)[callbackName] = () => {
      console.log('✅ Google Maps API loaded successfully');
      isApiLoaded = true;
      isApiLoading = false;
      apiError = null;
      setState({ isLoaded: true, isLoading: false, error: null });
      
      // Очищаем callback
      delete (window as any)[callbackName];
    };

    // Создаем script элемент
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}&loading=async`;
    script.async = true;
    script.defer = true;

    // Обработка ошибок загрузки
    script.onerror = (event) => {
      const error = `Google Maps API script failed to load. This usually means:
1. API key is invalid or has domain restrictions
2. API key doesn't have Places API enabled
3. Network/CSP blocking the request

Domain: ${window.location.hostname}
Event: ${JSON.stringify({ type: (event as any)?.type, message: (event as any)?.message, target: (event as any)?.target?.tagName })}`;
      
      console.error('❌ Google Maps API Error:', error);
      console.error('🔍 Debug info:', {
        apiKey: apiKey?.substring(0, 10) + '...',
        scriptSrc: script.src,
        currentDomain: window.location.hostname,
        referrer: document.referrer,
        userAgent: navigator.userAgent.substring(0, 100) + '...'
      });
      
      console.error('💡 Solutions:');
      console.error('  1. Check API key in deployment environment variables');
      console.error('  2. Add metan.lv to API key domain restrictions in Google Cloud Console');
      console.error('  3. Enable Places API in Google Cloud Console');
      console.error('  4. Check CSP headers allow https://maps.googleapis.com');
      
      isApiLoading = false;
      apiError = error;
      setState({ isLoaded: false, isLoading: false, error });
      
      // Очищаem callback при ошибке
      delete (window as any)[callbackName];
    };

    // Добавляем скрипт в DOM
    document.head.appendChild(script);

    // Таймаут на случай если callback не вызовется
    const timeout = setTimeout(() => {
      if (!isApiLoaded && isApiLoading) {
        const error = `Google Maps API load timeout (30 seconds). Domain: ${window.location.hostname}. This usually means the API key has domain restrictions or network issues.`;
        console.error('❌', error);
        isApiLoading = false;
        apiError = error;
        setState({ isLoaded: false, isLoading: false, error });
        
        // Очищаем callback при таймауте
        delete (window as any)[callbackName];
      }
    }, 30000); // 30 секунд

    // Очистка при размонтировании
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return state;
}