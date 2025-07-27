// Дополнительный резервный поиск городов через публичные API
// Используется если Google Maps API недоступен и локальная база не дала результатов

export interface PublicApiCity {
  name: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  population?: number;
}

// Номинатим - бесплатный API для геокодирования на основе OpenStreetMap  
export async function searchCitiesNominatim(query: string, limit: number = 5): Promise<PublicApiCity[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    console.log(`🌍 Searching cities via Nominatim API: "${query}"`);
    
    // Параметры для поиска городов в Латвии и Литве
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('q', query);
    url.searchParams.set('format', 'json');
    url.searchParams.set('addressdetails', '1');
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('countrycodes', 'lv,lt,ee'); // Латвия, Литва, Эстония
    url.searchParams.set('featuretype', 'city');
    url.searchParams.set('class', 'place');
    
    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'METAN.LV Website (contact@metan.lv)'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      return [];
    }

    const cities: PublicApiCity[] = data
      .filter((item: any) => {
        // Фильтруем только города и населенные пункты
        const placeType = item.type?.toLowerCase();
        const itemClass = item.class?.toLowerCase();
        return (
          (placeType && ['city', 'town', 'village', 'hamlet'].includes(placeType)) ||
          (itemClass && itemClass === 'place')
        );
      })
      .map((item: any) => {
        const countryCode = item.address?.country_code?.toUpperCase() || 'UN';
        let country = 'Unknown';

        // Определяем страну
        switch (countryCode) {
          case 'LV':
            country = 'Latvia';
            break;
          case 'LT':
            country = 'Lithuania';
            break;
          case 'EE':
            country = 'Estonia';
            break;
        }

        return {
          name: item.display_name.split(',')[0].trim(),
          country,
          countryCode,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          population: item.address?.population ? parseInt(item.address.population) : undefined
        };
      })
      .filter((city: PublicApiCity) => {
        // Фильтруем валидные координаты и города в нужном регионе
        return (
          city.lat && city.lng &&
          city.lat > 53.5 && city.lat < 59.5 && // Примерные границы региона
          city.lng > 19.0 && city.lng < 29.0 &&
          city.name.length > 0 &&
          city.name.length < 50
        );
      });

    console.log(`✅ Nominatim API found ${cities.length} cities for "${query}"`);
    return cities;

  } catch (error) {
    console.error(`❌ Nominatim API search failed for "${query}":`, error);
    return [];
  }
}

// REST Countries API - для получения информации о странах
export async function searchCitiesRestCountries(query: string): Promise<PublicApiCity[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    console.log(`🌍 Searching via REST Countries API: "${query}"`);
    
    // Поиск по столицам стран Балтии
    const countries = ['latvia', 'lithuania', 'estonia'];
    const results: PublicApiCity[] = [];

    for (const country of countries) {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,capital,latlng,cca2`);
        
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const countryData = data[0];
            const capital = countryData.capital?.[0];
            
            if (capital && capital.toLowerCase().includes(query.toLowerCase())) {
              results.push({
                name: capital,
                country: countryData.name.common,
                countryCode: countryData.cca2,
                lat: countryData.latlng[0],
                lng: countryData.latlng[1]
              });
            }
          }
        }
      } catch (error) {
        console.log(`⚠️ Error searching ${country}:`, error);
      }
    }

    console.log(`✅ REST Countries API found ${results.length} capitals for "${query}"`);
    return results;

  } catch (error) {
    console.error(`❌ REST Countries API search failed for "${query}":`, error);
    return [];
  }
}

// Основная функция поиска через публичные API
export async function searchCitiesPublicApi(query: string, limit: number = 8): Promise<PublicApiCity[]> {
  if (!query || query.length < 2) {
    return [];
  }

  console.log(`🔍 Starting public API city search for: "${query}"`);
  
  try {
    // Пробуем Nominatim API первым (наиболее полный)
    const nominatimResults = await searchCitiesNominatim(query, limit);
    
    if (nominatimResults.length > 0) {
      return nominatimResults;
    }

    // Если Nominatim не дал результатов, пробуем REST Countries для столиц
    console.log(`⚠️ Nominatim returned no results, trying REST Countries API`);
    const restCountriesResults = await searchCitiesRestCountries(query);
    
    return restCountriesResults;

  } catch (error) {
    console.error(`❌ All public API searches failed for "${query}":`, error);
    return [];
  }
}

// Комбинированный поиск: локальная база + публичные API
export async function searchCitiesCombined(
  query: string,
  searchFallback: (query: string, limit: number) => any[],
  limit: number = 8
): Promise<any[]> {
  if (!query || query.length < 2) {
    return [];
  }

  console.log(`🔍 Combined city search for: "${query}"`);

  try {
    // Сначала ищем в локальной базе (быстро)
    const localResults = searchFallback(query, limit);
    
    if (localResults.length >= 3) {
      console.log(`✅ Local database provided ${localResults.length} results`);
      return localResults;
    }

    // Если локальная база дала мало результатов, дополняем через API
    console.log(`⚠️ Local database found only ${localResults.length} results, searching via public APIs`);
    
    const apiResults = await searchCitiesPublicApi(query, limit - localResults.length);
    
    // Объединяем результаты, убираем дубликаты
    const combined = [...localResults];
    
    for (const apiResult of apiResults) {
      const isDuplicate = combined.some(local => 
        local.name?.toLowerCase() === apiResult.name.toLowerCase() ||
        (Math.abs(local.lat - apiResult.lat) < 0.01 && Math.abs(local.lng - apiResult.lng) < 0.01)
      );
      
      if (!isDuplicate) {
        combined.push({
          name: apiResult.name,
          country: apiResult.country,
          countryCode: apiResult.countryCode,
          lat: apiResult.lat,
          lng: apiResult.lng,
          aliases: [apiResult.name.toLowerCase()],
          isFromApi: true
        });
      }
    }

    console.log(`✅ Combined search found ${combined.length} total results (${localResults.length} local + ${apiResults.length} API)`);
    return combined.slice(0, limit);

  } catch (error) {
    console.error(`❌ Combined search failed for "${query}":`, error);
    return searchFallback(query, limit); // Возвращаем хотя бы локальные результаты
  }
}