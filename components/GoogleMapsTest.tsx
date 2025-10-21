'use client';

import { useEffect, useState } from 'react';

function GoogleMapsTest() {
  const [status, setStatus] = useState<string>('Initializing...');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    setLogs(prev => [...prev, logMessage]);
  };

  useEffect(() => {
    const testGoogleMapsAPI = async () => {
      try {
        addLog('🔄 Starting Google Maps API test...');
        setStatus('Testing API key and script loading...');

        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          throw new Error('API key not found');
        }

        addLog(`🔑 API Key: ${apiKey.substring(0, 20)}...`);

        // Проверим может ли API уже загружен
        if (window.google?.maps?.places) {
          addLog('✅ Google Maps API already loaded');
          setStatus('✅ Google Maps API ready');
          return;
        }

        // Создаем уникальный callback
        const callbackName = `testCallback_${Date.now()}`;
        addLog(`📞 Creating callback: ${callbackName}`);

        // Создаем callback функцию
        (window as any)[callbackName] = () => {
          addLog('✅ Google Maps API callback executed successfully');
          if (window.google?.maps?.places) {
            addLog('✅ Google Places API available');
            setStatus('✅ All APIs loaded successfully');
          } else {
            addLog('⚠️ Google Places API not available');
            setStatus('⚠️ Places API missing');
          }
        };

        // Создаем скрипт
        const script = document.createElement('script');
        const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`;
        script.src = scriptUrl;
        script.async = true;
        script.defer = true;

        addLog(`📋 Script URL: ${scriptUrl}`);

        // Обработка успешной загрузки
        script.onload = () => {
          addLog('✅ Script element loaded successfully');
        };

        // Обработка ошибок
        script.onerror = (event) => {
          const errorMsg = `Script load error: ${JSON.stringify({ type: (event as any)?.type, target: (event as any)?.target?.tagName })}`;
          addLog(`❌ ${errorMsg}`);
          setStatus(`❌ Script load failed`);
          delete (window as any)[callbackName];
        };

        addLog('📡 Adding script to DOM...');
        document.head.appendChild(script);

        // Таймаут для тестирования
        setTimeout(() => {
          if (!(window as any)[callbackName]) {
            return; // Callback уже был вызван или очищен
          }
          
          addLog('⏰ Timeout reached - checking status...');
          if (window.google?.maps?.places) {
            addLog('✅ API loaded despite no callback');
            setStatus('✅ API loaded (no callback)');
          } else {
            addLog('❌ API failed to load within timeout');
            setStatus('❌ Timeout - API not loaded');
          }
          delete (window as any)[callbackName];
        }, 10000);

      } catch (error) {
        const errorMsg = `Test error: ${error}`;
        addLog(`❌ ${errorMsg}`);
        setStatus(`❌ ${errorMsg}`);
      }
    };

    testGoogleMapsAPI();
  }, []);

  return (
    <div className="fixed top-4 right-4 max-w-md bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 z-50">
      <h3 className="font-bold text-lg mb-2">Google Maps API Test</h3>
      <div className="mb-3 p-2 bg-gray-100 rounded text-sm font-mono">
        Status: {status}
      </div>
      <div className="max-h-64 overflow-y-auto bg-black text-green-400 text-xs font-mono p-2 rounded">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
      <button
        onClick={() => {
          setLogs([]);
          setStatus('Restarting test...');
          window.location.reload();
        }}
        className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
      >
        Restart Test
      </button>
    </div>
  );
}

export default GoogleMapsTest;