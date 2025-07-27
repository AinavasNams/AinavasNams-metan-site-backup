'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, MapPin, AlertTriangle } from 'lucide-react';
import { useGoogleMapsApi } from '@/hooks/useGoogleMapsApi';
import { searchCitiesFallback, formatCityForDisplay, type CityData } from '@/lib/cities-fallback';
import { searchCitiesCombined } from '@/lib/cities-api-fallback';

interface AddressAutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (address: string, coordinates?: { lat: number; lng: number }) => void;
  className?: string;
}

// Конвертируем CityData в формат совместимый с Google Maps predictions
interface CityPrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  isFallback?: boolean;
  coordinates?: { lat: number; lng: number };
  isFromApi?: boolean; // Результат получен из публичного API
}

export default function AddressAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  className = ''
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<CityPrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Используем новый хук для загрузки Google Maps API
  const { isLoaded: isApiLoaded, isLoading: isApiLoading, error: apiError } = useGoogleMapsApi();

  useEffect(() => {
    // Инициализируем Places API когда Google Maps загружен
    if (isApiLoaded && window.google?.maps?.places) {
      try {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
        
        // Создаем скрытый div для PlacesService
        const mapDiv = document.createElement('div');
        const map = new window.google.maps.Map(mapDiv);
        placesService.current = new window.google.maps.places.PlacesService(map);
        
        console.log('✅ Google Places API services initialized');
        setUseFallback(false);
      } catch (error) {
        console.error('❌ Error initializing Google Places API services:', error);
        console.log('🔄 Switching to fallback city search');
        setUseFallback(true);
      }
    } else if (apiError) {
      console.log('🔄 Google Maps API error, using fallback city search');
      setUseFallback(true);
    }
  }, [isApiLoaded, apiError]);

  // Очистка timeout при размонтировании
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const handleInputChange = async (inputValue: string) => {
    onChange(inputValue);
    
    // Отменяем предыдущий поиск
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    // Сбрасываем состояние поиска при пустом вводе
    if (!inputValue.trim() || inputValue.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    // Показываем индикатор загрузки
    setIsLoading(true);
    // НЕ скрываем предложения сразу, только если ввод короткий
    
    console.log(`🔍 Starting debounced search for "${inputValue}" (length: ${inputValue.length})`);

    // Debounce поиска на 300ms
    searchTimeout.current = setTimeout(async () => {
      await performSearch(inputValue);
    }, 300);
  };

  const performSearch = async (inputValue: string) => {
    console.log(`🚀 Performing actual search for "${inputValue}"`);

    // Если Google Maps API недоступен, используем fallback
    if (useFallback || apiError || !isApiLoaded) {
      console.log('🔄 Using fallback city search for:', inputValue);
      handleFallbackSearch(inputValue);
      return;
    }

    // Пробуем Google Maps API
    if (!autocompleteService.current) {
      console.log('⚠️ AutocompleteService not initialized, switching to fallback');
      setUseFallback(true);
      handleFallbackSearch(inputValue);
      return;
    }

    try {
      // Основной запрос - поиск городов в Балтии с поддержкой разных языков
      const request: google.maps.places.AutocompletionRequest = {
        input: inputValue,
        componentRestrictions: { country: ['lv', 'lt', 'ee'] },
        types: ['(cities)'], // Фокус только на города
        language: 'lv' // Основной язык латышский, но Google автоматически поддерживает мульти-язык
      };

      console.log(`🔍 Google Maps API search for cities: "${inputValue}"`);

      autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
        console.log(`📊 Google Maps API response for "${inputValue}":`, { status, predictionsCount: predictions?.length });
        setIsLoading(false);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions && predictions.length > 0) {
          const formattedPredictions: CityPrediction[] = predictions.map(pred => ({
            place_id: pred.place_id,
            description: pred.description,
            structured_formatting: pred.structured_formatting,
            isFallback: false
          }));
          
          console.log(`✅ Google Maps found ${predictions.length} cities for "${inputValue}", showing suggestions`);
          setSuggestions(formattedPredictions);
          setShowSuggestions(true);
          
        } else {
          console.log(`⚠️ Google Maps API failed (status: ${status}), switching to fallback search for "${inputValue}"`);
          handleFallbackSearch(inputValue);
        }
      });
    } catch (error) {
      console.error('❌ Error in Google Maps city search:', error);
      console.log('🔄 Switching to fallback search');
      handleFallbackSearch(inputValue);
    }
  };

  const handleFallbackSearch = async (inputValue: string) => {
    try {
      console.log(`🔍 Starting enhanced fallback search for: "${inputValue}"`);
      
      // Используем комбинированный поиск (локальная база + публичные API)
      const cities = await searchCitiesCombined(inputValue, searchCitiesFallback, 8);
      
      const formattedSuggestions: CityPrediction[] = cities.map((city, index) => {
        // Определяем откуда результат
        const isFromApi = city.isFromApi || false;
        const formatted = formatCityForDisplay(city);
        
        return {
          place_id: `fallback_${city.name}_${city.countryCode}_${index}`,
          description: `${city.name}, ${city.country}`,
          structured_formatting: {
            main_text: formatted.mainText,
            secondary_text: isFromApi ? `${formatted.secondaryText} (online)` : formatted.secondaryText
          },
          isFallback: true,
          coordinates: { lat: city.lat, lng: city.lng },
          isFromApi
        };
      });
      
      console.log(`📊 Fallback search results for "${inputValue}":`, { 
        citiesFound: cities.length, 
        willShowSuggestions: formattedSuggestions.length > 0 
      });
      
      setSuggestions(formattedSuggestions);
      // Показываем предложения только если есть результаты
      if (formattedSuggestions.length > 0) {
        setShowSuggestions(true);
        console.log(`✅ Showing ${formattedSuggestions.length} fallback suggestions for "${inputValue}"`);
      } else {
        setShowSuggestions(false);
        console.log(`❌ No fallback results found for "${inputValue}"`);
      }
      setIsLoading(false);
      
      const localCount = formattedSuggestions.filter(s => !s.isFromApi).length;
      const apiCount = formattedSuggestions.filter(s => s.isFromApi).length;
      
      console.log(`✅ Enhanced search found ${cities.length} cities for "${inputValue}" (${localCount} local + ${apiCount} online)`);
    } catch (error) {
      console.error('❌ Error in enhanced fallback search:', error);
      
      // Если комбинированный поиск не сработал, используем только локальную базу
      try {
        const localCities = searchCitiesFallback(inputValue, 8);
        const formattedSuggestions: CityPrediction[] = localCities.map(city => {
          const formatted = formatCityForDisplay(city);
          return {
            place_id: `local_${city.name}_${city.countryCode}`,
            description: `${city.name}, ${city.country}`,
            structured_formatting: {
              main_text: formatted.mainText,
              secondary_text: formatted.secondaryText
            },
            isFallback: true,
            coordinates: { lat: city.lat, lng: city.lng }
          };
        });
        
        console.log(`📊 Local-only search results for "${inputValue}":`, { 
          citiesFound: localCities.length, 
          willShowSuggestions: formattedSuggestions.length > 0 
        });
        
        setSuggestions(formattedSuggestions);
        // Показываем предложения только если есть результаты
        if (formattedSuggestions.length > 0) {
          setShowSuggestions(true);
          console.log(`✅ Showing ${formattedSuggestions.length} local suggestions for "${inputValue}"`);
        } else {
          setShowSuggestions(false);
          console.log(`❌ No local results found for "${inputValue}"`);
        }
        console.log(`✅ Local-only search found ${localCities.length} cities for "${inputValue}"`);
      } catch (localError) {
        console.error('❌ Even local search failed:', localError);
        setSuggestions([]);
        setShowSuggestions(false);
      }
      
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = async (prediction: CityPrediction) => {
    const mainText = prediction.structured_formatting.main_text;
    const fullDescription = prediction.description;
    
    // Используем краткое название города для отображения
    onChange(mainText);
    setShowSuggestions(false);
    setSuggestions([]);

    console.log(`🎯 Selected: ${mainText} (${fullDescription})`);

    // Если это fallback результат, координаты уже есть
    if (prediction.isFallback && prediction.coordinates) {
      console.log(`📍 Using fallback coordinates for ${mainText}:`, prediction.coordinates);
      onChange(mainText, prediction.coordinates);
      return;
    }

    // Получаем координаты через Google Places API
    if (isApiLoaded && placesService.current && prediction.place_id && !prediction.isFallback) {
      const request: google.maps.places.PlaceDetailsRequest = {
        placeId: prediction.place_id,
        fields: ['geometry.location', 'formatted_address']
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
          const coordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          
          console.log(`📍 Google Maps coordinates for ${mainText}:`, coordinates);
          onChange(mainText, coordinates);
        } else {
          console.log(`⚠️ Could not get coordinates for ${mainText} from Google Maps`);
          // Можем попробовать найти в fallback базе
          const fallbackCities = searchCitiesFallback(mainText, 1);
          if (fallbackCities.length > 0) {
            const coords = { lat: fallbackCities[0].lat, lng: fallbackCities[0].lng };
            console.log(`📍 Using fallback coordinates for ${mainText}:`, coords);
            onChange(mainText, coords);
          }
        }
      });
    }
  };

  const handleBlur = () => {
    console.log('🔄 Input blur event triggered');
    // Увеличиваем задержку, чтобы клик по предложению успел сработать
    // и не конфликтовал с поиском
    setTimeout(() => {
      console.log('⏰ Hiding suggestions after blur delay');
      setShowSuggestions(false);
    }, 300);
  };

  // Определяем статус API
  const getApiStatus = () => {
    if (apiError || useFallback) {
      return { icon: AlertTriangle, text: 'Offline režīms', color: 'text-orange-600' };
    }
    if (isApiLoading) {
      return { icon: Loader2, text: 'Ielādē...', color: 'text-blue-600' };
    }
    if (isApiLoaded) {
      return { icon: MapPin, text: 'Gatavs', color: 'text-green-600' };
    }
    return { icon: MapPin, text: 'Gaida...', color: 'text-gray-600' };
  };

  const apiStatus = getApiStatus();

  return (
    <div className={`relative ${className}`}>
      {/* Label с индикатором состояния API */}
      <Label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
        <MapPin className="h-4 w-4 text-teal-600" />
        {label}
        <div className={`text-xs flex items-center gap-1 ${apiStatus.color}`}>
          <apiStatus.icon className={`h-3 w-3 ${isApiLoading ? 'animate-spin' : ''}`} />
          {apiStatus.text}
        </div>
      </Label>

      {/* Предупреждение об offline режиме */}
      {(apiError || useFallback) && (
        <div className="mb-2 p-2 bg-orange-50 border border-orange-200 rounded-md">
          <p className="text-xs text-orange-700 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Rezerves režīms • Meklē lokālajā datubāzē un papildina ar online datiem
          </p>
        </div>
      )}

      {/* Input field */}
      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={
            apiError || useFallback ? "Meklējiet pilsētu (offline režīms)" :
            isApiLoading ? "Ielādē kartes API..." :
            !isApiLoaded ? "Gaida kartes API..." :
            placeholder
          }
          className="w-full pr-10 bg-white border-gray-300"
          disabled={isLoading}
        />

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
            <p className="text-xs text-gray-600 flex items-center gap-1">
              {useFallback || apiError ? (
                <>
                  <AlertTriangle className="h-3 w-3 text-orange-500" />
                  Offline meklēšana • Galvenās pilsētas
                </>
              ) : (
                <>
                  🌍 Izvēlieties pilsētu • Latvija un Lietuva
                </>
              )}
            </p>
          </div>
          {suggestions.map((prediction) => {
            const mainText = prediction.structured_formatting.main_text;
            const secondaryText = prediction.structured_formatting.secondary_text;
            
            // Определяем страну по вторичному тексту
            let countryFlag = '🏴';
            if (secondaryText?.toLowerCase().includes('latvia') || secondaryText?.toLowerCase().includes('latvija')) {
              countryFlag = '🇱🇻';
            } else if (secondaryText?.toLowerCase().includes('lithuania') || secondaryText?.toLowerCase().includes('lietuva')) {
              countryFlag = '🇱🇹';
            } else if (secondaryText?.toLowerCase().includes('estonia') || secondaryText?.toLowerCase().includes('eesti')) {
              countryFlag = '🇪🇪';
            }
            
            return (
              <button
                key={prediction.place_id}
                type="button"
                onClick={() => handleSuggestionClick(prediction)}
                className="w-full px-4 py-3 text-left hover:bg-green-50 focus:bg-green-50 focus:outline-none border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="text-lg mt-0.5 flex-shrink-0">
                    {countryFlag}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-medium text-gray-900 truncate flex items-center gap-2">
                      {mainText}
                      {prediction.isFallback && !prediction.isFromApi && (
                        <span className="text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded">
                          offline
                        </span>
                      )}
                      {prediction.isFromApi && (
                        <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                          online
                        </span>
                      )}
                    </div>
                    {secondaryText && (
                      <div className="text-sm text-gray-500 truncate mt-0.5">
                        {secondaryText}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-400 mt-1">
                    →
                  </div>
                </div>
              </button>
            );
          })}
          
          {/* Подсказка внизу списка */}
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              {useFallback || apiError ? (
                <>💡 Rezerves režīms: meklē lokālajā datubāzē un papildina ar online datiem</>
              ) : (
                <>💡 Meklējiet jebkurā valodā: latviski, lietuviski, krieviski, angliski</>
              )}
            </p>
            {(useFallback || apiError) && suggestions.some(s => s.isFromApi) && (
              <p className="text-xs text-blue-600 text-center mt-1">
                🌐 Daži rezultāti iegūti no online avotiem
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}