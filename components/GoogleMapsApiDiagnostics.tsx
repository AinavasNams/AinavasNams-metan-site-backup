'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, MapPin, Globe, Key, Server } from 'lucide-react';
import { useGoogleMapsApi } from '@/hooks/useGoogleMapsApi';
import { searchCitiesFallback } from '@/lib/cities-fallback';

export function GoogleMapsApiDiagnostics() {
  const { isLoaded, isLoading, error } = useGoogleMapsApi();
  const [testResults, setTestResults] = useState<any>({});
  const [testQuery, setTestQuery] = useState('Rīga');
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Автоматический запуск тестов при загрузке
  useEffect(() => {
    if (isLoaded && !error) {
      runDiagnostics();
    }
  }, [isLoaded, error]);

  const runDiagnostics = async () => {
    setIsRunningTests(true);
    const results: any = {};
    
    console.log('🔍 Starting Google Maps API diagnostics...');
    
    try {
      // 1. Проверка базовой загрузки API
      results.apiLoaded = {
        status: isLoaded && !error,
        message: isLoaded ? 'Google Maps API загружен' : (error || 'API не загружен'),
        details: {
          isLoaded,
          isLoading,
          error,
          windowGoogle: !!window.google,
          googleMaps: !!window.google?.maps,
          googlePlaces: !!window.google?.maps?.places
        }
      };

      // 2. Проверка переменных окружения
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      results.environment = {
        status: !!apiKey && apiKey.length > 20,
        message: apiKey ? `API ключ настроен (${apiKey.substring(0, 10)}...)` : 'API ключ не найден',
        details: {
          hasApiKey: !!apiKey,
          keyLength: apiKey?.length || 0,
          nodeEnv: process.env.NODE_ENV,
          domain: window.location.hostname,
          protocol: window.location.protocol
        }
      };

      // 3. Тест AutocompleteService
      if (isLoaded && window.google?.maps?.places) {
        try {
          const autocompleteService = new window.google.maps.places.AutocompleteService();
          
          const testPromise = new Promise((resolve, reject) => {
            const request = {
              input: testQuery,
              componentRestrictions: { country: ['lv', 'lt'] },
              types: ['(cities)']
            };
            
            autocompleteService.getPlacePredictions(request, (predictions, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                resolve({
                  status: true,
                  message: `Найдено ${predictions?.length || 0} городов для "${testQuery}"`,
                  details: {
                    predictions: predictions?.map(p => ({
                      name: p.structured_formatting.main_text,
                      description: p.description
                    })) || []
                  }
                });
              } else {
                reject({
                  status: false,
                  message: `Ошибка поиска: ${status}`,
                  details: { status, testQuery }
                });
              }
            });
          });

          results.autocomplete = await testPromise;
        } catch (error) {
          results.autocomplete = {
            status: false,
            message: `Ошибка AutocompleteService: ${error}`,
            details: { error: String(error) }
          };
        }
      } else {
        results.autocomplete = {
          status: false,
          message: 'Places API недоступен',
          details: { reason: 'API не загружен или Places отсутствует' }
        };
      }

      // 4. Тест fallback поиска
      try {
        const fallbackResults = searchCitiesFallback(testQuery, 5);
        results.fallback = {
          status: fallbackResults.length > 0,
          message: `Fallback нашел ${fallbackResults.length} городов для "${testQuery}"`,
          details: {
            cities: fallbackResults.map(city => ({
              name: city.name,
              country: city.country,
              coordinates: { lat: city.lat, lng: city.lng }
            }))
          }
        };
      } catch (error) {
        results.fallback = {
          status: false,
          message: `Ошибка fallback поиска: ${error}`,
          details: { error: String(error) }
        };
      }

      // 5. Проверка геокодирования
      if (isLoaded && window.google?.maps) {
        try {
          const geocoder = new window.google.maps.Geocoder();
          
          const geocodePromise = new Promise((resolve, reject) => {
            geocoder.geocode({ 
              address: `${testQuery}, Latvia`,
              componentRestrictions: { country: 'LV' }
            }, (results, status) => {
              if (status === 'OK' && results && results.length > 0) {
                const result = results[0];
                resolve({
                  status: true,
                  message: `Геокодирование успешно для "${testQuery}"`,
                  details: {
                    address: result.formatted_address,
                    coordinates: {
                      lat: result.geometry.location.lat(),
                      lng: result.geometry.location.lng()
                    }
                  }
                });
              } else {
                reject({
                  status: false,
                  message: `Ошибка геокодирования: ${status}`,
                  details: { status, testQuery }
                });
              }
            });
          });

          results.geocoding = await geocodePromise;
        } catch (error) {
          results.geocoding = {
            status: false,
            message: `Ошибка Geocoder: ${error}`,
            details: { error: String(error) }
          };
        }
      } else {
        results.geocoding = {
          status: false,
          message: 'Geocoder недоступен',
          details: { reason: 'Google Maps API не загружен' }
        };
      }

    } catch (error) {
      console.error('❌ Error in diagnostics:', error);
    }

    setTestResults(results);
    setIsRunningTests(false);
    console.log('✅ Diagnostics completed:', results);
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    );
  };

  const getStatusBadge = (status: boolean) => {
    return (
      <Badge variant={status ? "default" : "destructive"}>
        {status ? "OK" : "ОШИБКА"}
      </Badge>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Google Maps API Диагностика
          </CardTitle>
          <CardDescription>
            Проверка состояния Google Maps API и функций поиска городов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Input
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              placeholder="Введите название города для тестирования"
              className="flex-1"
            />
            <Button 
              onClick={runDiagnostics}
              disabled={isRunningTests}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRunningTests ? 'animate-spin' : ''}`} />
              {isRunningTests ? 'Тестирую...' : 'Запустить тесты'}
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Загрузка API */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Загрузка API
                  {testResults.apiLoaded && getStatusBadge(testResults.apiLoaded.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-start gap-2">
                  {testResults.apiLoaded && getStatusIcon(testResults.apiLoaded.status)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      {testResults.apiLoaded?.message || 'Не тестировано'}
                    </p>
                    {testResults.apiLoaded?.details && (
                      <div className="mt-2 text-xs text-gray-500 space-y-1">
                        <div>Загружен: {testResults.apiLoaded.details.isLoaded ? 'Да' : 'Нет'}</div>
                        <div>Places API: {testResults.apiLoaded.details.googlePlaces ? 'Да' : 'Нет'}</div>
                        <div>Домен: {testResults.apiLoaded.details.domain || 'N/A'}</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Переменные окружения */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  API Ключ
                  {testResults.environment && getStatusBadge(testResults.environment.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-start gap-2">
                  {testResults.environment && getStatusIcon(testResults.environment.status)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      {testResults.environment?.message || 'Не проверено'}
                    </p>
                    {testResults.environment?.details && (
                      <div className="mt-2 text-xs text-gray-500 space-y-1">
                        <div>Длина ключа: {testResults.environment.details.keyLength}</div>
                        <div>Среда: {testResults.environment.details.nodeEnv}</div>
                        <div>Домен: {testResults.environment.details.domain}</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Автодополнение */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Поиск городов (Google)
                  {testResults.autocomplete && getStatusBadge(testResults.autocomplete.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-start gap-2">
                  {testResults.autocomplete && getStatusIcon(testResults.autocomplete.status)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      {testResults.autocomplete?.message || 'Не тестировано'}
                    </p>
                    {testResults.autocomplete?.details?.predictions && (
                      <div className="mt-2 text-xs text-gray-500">
                        <div className="space-y-1">
                          {testResults.autocomplete.details.predictions.slice(0, 3).map((pred: any, idx: number) => (
                            <div key={idx}>{pred.name} - {pred.description}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fallback поиск */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Offline поиск
                  {testResults.fallback && getStatusBadge(testResults.fallback.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-start gap-2">
                  {testResults.fallback && getStatusIcon(testResults.fallback.status)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      {testResults.fallback?.message || 'Не тестировано'}
                    </p>
                    {testResults.fallback?.details?.cities && (
                      <div className="mt-2 text-xs text-gray-500">
                        <div className="space-y-1">
                          {testResults.fallback.details.cities.slice(0, 3).map((city: any, idx: number) => (
                            <div key={idx}>{city.name}, {city.country}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Общий статус */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Общий статус системы:</h3>
            <div className="text-sm text-gray-700">
              {isLoading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Загружается Google Maps API...
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-4 w-4" />
                  Google Maps API недоступен. Система работает в offline режиме.
                </div>
              )}
              {isLoaded && !error && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Google Maps API работает корректно.
                </div>
              )}
            </div>
          </div>

          {/* Рекомендации */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium mb-2 text-blue-800">Рекомендации:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Убедитесь, что переменная NEXT_PUBLIC_GOOGLE_MAPS_API_KEY настроена в production</li>
              <li>• Добавьте домен metan.lv в разрешенные домены в Google Cloud Console</li>
              <li>• Включите Places API в вашем Google Cloud проекте</li>
              <li>• Даже при проблемах с API, система работает в offline режиме</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}