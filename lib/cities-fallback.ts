// Резервная база данных городов для случаев когда Google Maps API недоступен
export interface CityData {
  name: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  aliases: string[]; // Альтернативные названия на разных языках
}

export const BALTIC_CITIES: CityData[] = [
  // Латвия - крупные города
  { name: 'Rīga', country: 'Latvia', countryCode: 'LV', lat: 56.9496, lng: 24.1052, aliases: ['riga', 'рига'] },
  { name: 'Daugavpils', country: 'Latvia', countryCode: 'LV', lat: 55.8744, lng: 26.5358, aliases: ['daugavpils', 'даугавпилс'] },
  { name: 'Liepāja', country: 'Latvia', countryCode: 'LV', lat: 56.5046, lng: 21.0086, aliases: ['liepaja', 'лиепая'] },
  { name: 'Jelgava', country: 'Latvia', countryCode: 'LV', lat: 56.6500, lng: 23.7294, aliases: ['jelgava', 'елгава'] },
  { name: 'Jūrmala', country: 'Latvia', countryCode: 'LV', lat: 56.9677, lng: 23.7794, aliases: ['jurmala', 'юрмала'] },
  { name: 'Ventspils', country: 'Latvia', countryCode: 'LV', lat: 57.3946, lng: 21.5683, aliases: ['ventspils', 'вентспилс'] },
  { name: 'Rēzekne', country: 'Latvia', countryCode: 'LV', lat: 56.5077, lng: 27.3407, aliases: ['rezekne', 'резекне'] },
  { name: 'Valmiera', country: 'Latvia', countryCode: 'LV', lat: 57.5386, lng: 25.4270, aliases: ['valmiera', 'валмиера'] },
  { name: 'Jēkabpils', country: 'Latvia', countryCode: 'LV', lat: 56.4989, lng: 25.8573, aliases: ['jekabpils', 'екабпилс'] },
  { name: 'Ogre', country: 'Latvia', countryCode: 'LV', lat: 56.8162, lng: 24.6044, aliases: ['ogre', 'огре'] },
  { name: 'Tukums', country: 'Latvia', countryCode: 'LV', lat: 56.9676, lng: 23.1548, aliases: ['tukums', 'тукумс'] },
  { name: 'Salaspils', country: 'Latvia', countryCode: 'LV', lat: 56.8609, lng: 24.3647, aliases: ['salaspils', 'саласпилс'] },
  { name: 'Cēsis', country: 'Latvia', countryCode: 'LV', lat: 57.3117, lng: 25.2752, aliases: ['cesis', 'цесис'] },
  { name: 'Kuldīga', country: 'Latvia', countryCode: 'LV', lat: 56.9677, lng: 21.9747, aliases: ['kuldiga', 'кулдига'] },
  { name: 'Bauska', country: 'Latvia', countryCode: 'LV', lat: 56.4065, lng: 24.1901, aliases: ['bauska', 'бауска'] },
  { name: 'Sigulda', country: 'Latvia', countryCode: 'LV', lat: 57.1544, lng: 24.8537, aliases: ['sigulda', 'сигулда'] },
  { name: 'Dobele', country: 'Latvia', countryCode: 'LV', lat: 56.6234, lng: 23.2816, aliases: ['dobele', 'добеле'] },
  { name: 'Krāslava', country: 'Latvia', countryCode: 'LV', lat: 55.8950, lng: 27.1681, aliases: ['kraslava', 'краслава'] },
  { name: 'Madona', country: 'Latvia', countryCode: 'LV', lat: 56.8487, lng: 26.2153, aliases: ['madona', 'мадона'] },
  { name: 'Aizkraukle', country: 'Latvia', countryCode: 'LV', lat: 56.6045, lng: 25.2547, aliases: ['aizkraukle', 'айзкраукле'] },

  // Литва - крупные города
  { name: 'Vilnius', country: 'Lithuania', countryCode: 'LT', lat: 54.6872, lng: 25.2797, aliases: ['vilnius', 'вильнюс', 'вильня'] },
  { name: 'Kaunas', country: 'Lithuania', countryCode: 'LT', lat: 54.8985, lng: 23.9036, aliases: ['kaunas', 'каунас'] },
  { name: 'Klaipėda', country: 'Lithuania', countryCode: 'LT', lat: 55.7033, lng: 21.1443, aliases: ['klaipeda', 'клайпеда'] },
  { name: 'Šiauliai', country: 'Lithuania', countryCode: 'LT', lat: 55.9349, lng: 23.3141, aliases: ['siauliai', 'шяуляй'] },
  { name: 'Panevėžys', country: 'Lithuania', countryCode: 'LT', lat: 55.7353, lng: 24.3540, aliases: ['panevezys', 'паневежис'] },
  { name: 'Alytus', country: 'Lithuania', countryCode: 'LT', lat: 54.3963, lng: 24.0456, aliases: ['alytus', 'алитус'] },
  { name: 'Marijampolė', country: 'Lithuania', countryCode: 'LT', lat: 54.5592, lng: 23.3542, aliases: ['marijampole', 'мариямполе'] },
  { name: 'Mažeikiai', country: 'Lithuania', countryCode: 'LT', lat: 56.3079, lng: 22.3397, aliases: ['mazeikiai', 'мажейкяй'] },
  { name: 'Jonava', country: 'Lithuania', countryCode: 'LT', lat: 55.0773, lng: 24.2790, aliases: ['jonava', 'йонава'] },
  { name: 'Utena', country: 'Lithuania', countryCode: 'LT', lat: 55.4969, lng: 25.5997, aliases: ['utena', 'утена'] },
  { name: 'Kėdainiai', country: 'Lithuania', countryCode: 'LT', lat: 55.2914, lng: 23.9739, aliases: ['kedainiai', 'кедайняй'] },
  { name: 'Telšiai', country: 'Lithuania', countryCode: 'LT', lat: 56.0084, lng: 22.2473, aliases: ['telsiai', 'тельшяй'] },
  { name: 'Visaginas', country: 'Lithuania', countryCode: 'LT', lat: 55.5968, lng: 26.4197, aliases: ['visaginas', 'висагинас'] },
  { name: 'Tauragė', country: 'Lithuania', countryCode: 'LT', lat: 55.2515, lng: 22.2894, aliases: ['taurage', 'таураге'] },
  { name: 'Ukmergė', country: 'Lithuania', countryCode: 'LT', lat: 55.2470, lng: 24.7563, aliases: ['ukmerge', 'укмерге'] },
  { name: 'Plungė', country: 'Lithuania', countryCode: 'LT', lat: 55.9115, lng: 21.8444, aliases: ['plunge', 'плунге'] },
  { name: 'Kretinga', country: 'Lithuania', countryCode: 'LT', lat: 55.8892, lng: 21.2448, aliases: ['kretinga', 'кретинга'] },
  { name: 'Šilutė', country: 'Lithuania', countryCode: 'LT', lat: 55.3493, lng: 21.4823, aliases: ['silute', 'шилуте'] },
  { name: 'Radviliškis', country: 'Lithuania', countryCode: 'LT', lat: 55.8133, lng: 23.5458, aliases: ['radviliskis', 'радвилишкис'] },
  { name: 'Druskininkai', country: 'Lithuania', countryCode: 'LT', lat: 54.0187, lng: 23.9736, aliases: ['druskininkai', 'друскининкай'] }
];

export function searchCitiesFallback(query: string, limit: number = 10): CityData[] {
  if (!query || query.length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results: { city: CityData; score: number }[] = [];

  console.log(`🔍 Fallback city search for: "${query}"`);

  for (const city of BALTIC_CITIES) {
    let score = 0;
    const cityName = city.name.toLowerCase();
    
    // Точное совпадение начала названия (высший приоритет)
    if (cityName.startsWith(normalizedQuery)) {
      score += 100;
    }
    
    // Совпадение в любом месте названия
    if (cityName.includes(normalizedQuery)) {
      score += 80;
    }
    
    // Поиск по альтернативным названиям
    for (const alias of city.aliases) {
      const aliasLower = alias.toLowerCase();
      if (aliasLower.startsWith(normalizedQuery)) {
        score += 90;
      } else if (aliasLower.includes(normalizedQuery)) {
        score += 70;
      }
    }
    
    // Звуковое сходство (простая проверка)
    if (score === 0 && normalizedQuery.length >= 3) {
      const soundsSimilar = cityName.substring(0, 3) === normalizedQuery.substring(0, 3) ||
                           city.aliases.some(alias => alias.toLowerCase().substring(0, 3) === normalizedQuery.substring(0, 3));
      if (soundsSimilar) {
        score += 50;
      }
    }
    
    if (score > 0) {
      results.push({ city, score });
    }
  }

  // Сортируем по релевантности
  results.sort((a, b) => b.score - a.score);
  
  const finalResults = results.slice(0, limit).map(r => r.city);
  console.log(`✅ Fallback search found ${finalResults.length} cities`);
  
  return finalResults;
}

export function formatCityForDisplay(city: CityData): {
  mainText: string;
  secondaryText: string;
  countryFlag: string;
} {
  const countryFlags: Record<string, string> = {
    'LV': '🇱🇻',
    'LT': '🇱🇹',
    'EE': '🇪🇪'
  };

  return {
    mainText: city.name,
    secondaryText: city.country,
    countryFlag: countryFlags[city.countryCode] || '🏴'
  };
}