'use client';

import { GoogleMapsApiDiagnostics } from '@/components/GoogleMapsApiDiagnostics';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';

export default function GoogleMapsTestPage() {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | undefined>();

  const handleAddressChange = (address: string, coordinates?: { lat: number; lng: number }) => {
    setSelectedAddress(address);
    setSelectedCoordinates(coordinates);
    console.log('Address selected:', { address, coordinates });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-bottom shadow-sm">
        <div className="metan-container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-green-600" />
                Google Maps API Test
              </h1>
              <p className="text-gray-600 mt-1">
                Диагностика и тестирование функций поиска городов
              </p>
            </div>
            <Link 
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Home className="h-4 w-4" />
              На главную
            </Link>
          </div>
        </div>
      </div>

      <div className="metan-container py-8">
        <div className="space-y-8">
          {/* Предупреждение о доступе */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-orange-800">Служебная страница</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    Эта страница предназначена для диагностики Google Maps API. 
                    В production окружении доступ к ней должен быть ограничен.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Тест живого поиска */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Тест поиска городов
              </CardTitle>
              <CardDescription>
                Проверьте работу автодополнения адресов как на реальном сайте
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <AddressAutocomplete
                  label="Поиск города"
                  placeholder="Начните вводить название города..."
                  value={selectedAddress}
                  onChange={handleAddressChange}
                />
                
                {selectedAddress && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Выбранный город:</h4>
                    <p className="text-sm text-green-700">
                      <strong>Название:</strong> {selectedAddress}
                    </p>
                    {selectedCoordinates && (
                      <p className="text-sm text-green-700 mt-1">
                        <strong>Координаты:</strong> {selectedCoordinates.lat.toFixed(6)}, {selectedCoordinates.lng.toFixed(6)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Диагностика API */}
          <GoogleMapsApiDiagnostics />
          
          {/* Инструкции по настройке */}
          <Card>
            <CardHeader>
              <CardTitle>Инструкции по настройке для Production</CardTitle>
              <CardDescription>
                Шаги для корректной работы Google Maps API на домене metan.lv
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">1. Настройка переменных окружения</h3>
                  <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_ACTUAL_API_KEY
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">2. Настройка API ключа в Google Cloud Console</h3>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Перейдите в Google Cloud Console → Credentials</li>
                    <li>• Найдите ваш API ключ</li>
                    <li>• В разделе "Application restrictions" добавьте:</li>
                    <li className="ml-4 font-mono text-xs bg-gray-100 p-1 rounded">metan.lv/*</li>
                    <li className="ml-4 font-mono text-xs bg-gray-100 p-1 rounded">*.metan.lv/*</li>
                    <li>• Убедитесь что включены API: Maps JavaScript API, Places API, Geocoding API</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">3. Проверка на Vercel/Netlify</h3>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• Добавьте переменную окружения в настройках проекта</li>
                    <li>• Убедитесь что переменная начинается с NEXT_PUBLIC_</li>
                    <li>• После изменения переменных пересоберите проект</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">4. Резервный режим</h3>
                  <p className="text-sm text-gray-700">
                    Даже если Google Maps API недоступен, система автоматически переключится 
                    в offline режим и будет искать города в локальной базе данных.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}