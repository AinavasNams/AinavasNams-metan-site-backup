// components/AddressAutocomplete.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Suggestion {
  label: string;
  value: string;
  lat?: number;
  lng?: number;
}

interface AddressAutocompleteProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  onSelect?: (value: string, coordinates?: { lat: number; lng: number }) => void;
  onChange?: (value: string, coordinates?: { lat: number; lng: number }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function AddressAutocomplete({
  id,
  name,
  label,
  value: controlledValue,
  onSelect,
  onChange,
  placeholder = 'Ievadiet adresi...',
  className = '',
  disabled = false,
  required = false,
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(controlledValue ?? '');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (controlledValue === undefined) return;
    setInputValue(controlledValue ?? '');
  }, [controlledValue]);

  const fallbackSearch = useCallback(() => {
    setUseFallback(true);
    setApiError(true);
    const fallbackCities = ['Rīga', 'Jelgava', 'Daugavpils', 'Liepāja', 'Rēzekne'];
    const filtered = fallbackCities
      .filter((city) => city.toLowerCase().startsWith(inputValue.toLowerCase()))
      .map((city) => ({ label: city, value: city }));
    setSuggestions(filtered);
  }, [inputValue]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      if (inputValue.length < 2) {
        setSuggestions([]);
        setLoading(false);
        setApiError(false);
        setUseFallback(false);
        return;
      }

      setLoading(true);
      setApiError(false);

      fetch(`/api/autocomplete?query=${encodeURIComponent(inputValue)}`, {
        signal: controller.signal,
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok && data?.status === 'OK') {
            const parsed = data.results.map((r: any) => ({
              label: r.label || r.description || r.formatted_address || r.value,
              value: r.value || r.description || r.formatted_address || '',
              lat: r.geometry?.location?.lat,
              lng: r.geometry?.location?.lng,
            }));
            setSuggestions(parsed);
            setUseFallback(false);
          } else {
            console.warn('🔁 Falling back to local search', data);
            fallbackSearch();
          }
        })
        .catch((err) => {
          console.error('❌ Autocomplete API error:', err);
          fallbackSearch();
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [inputValue, fallbackSearch]);

  return (
    <div className={`w-full relative ${className}`}>
      {label && (
        <Label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Input
        id={id}
        name={name}
        value={inputValue}
        onChange={(e) => {
          const newVal = e.target.value;
          setInputValue(newVal);
          if (onChange) onChange(newVal);
        }}
        placeholder={placeholder}
        className={useFallback ? 'bg-yellow-50' : ''}
        disabled={disabled}
        required={required}
        autoComplete="off"
      />
      {loading && (
        <div className="absolute top-2 right-3">
          <Loader2 className="animate-spin w-4 h-4 text-gray-500" />
        </div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute z-50 bg-white border w-full shadow rounded max-h-48 overflow-auto mt-1">
          {suggestions.map((sug, i) => (
            <li
              key={i}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setInputValue(sug.label);
                setSuggestions([]);
                const coords =
                  sug.lat && sug.lng
                    ? { lat: Number(sug.lat), lng: Number(sug.lng) }
                    : undefined;
                if (onSelect) onSelect(sug.label, coords);
                if (onChange) onChange(sug.label, coords);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {sug.label}
            </li>
          ))}
        </ul>
      )}
      {apiError && (
        <p className="text-xs text-red-500 mt-1">
          Neizdevās iegūt ieteikumus no API — tiek izmantots lokālais režīms.
        </p>
      )}
    </div>
  );
}
