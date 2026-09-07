'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { loadPlacesLibrary, parseAddressComponents, type ParsedAddress } from '@/lib/googleMaps';

interface Suggestion {
  id: string;
  label: string;
  prediction: google.maps.places.PlacePrediction;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  // Called when the user picks a suggestion — fields other than street1 may be empty strings.
  onSelect: (parsed: ParsedAddress) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  onBlur?: () => void;
}

const DEBOUNCE_MS = 250;

export default function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder,
  id,
  name,
  onBlur,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const placesRef = useRef<google.maps.PlacesLibrary | null>(null);
  const placesUnavailableRef = useRef(false);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const justSelectedRef = useRef(false);

  // Lazily load the Places library on first focus/typing.
  const ensurePlaces = useCallback(async () => {
    if (placesRef.current || placesUnavailableRef.current) return placesRef.current;
    try {
      placesRef.current = await loadPlacesLibrary();
      return placesRef.current;
    } catch {
      placesUnavailableRef.current = true; // no key or load failed — degrade to plain input
      return null;
    }
  }, []);

  const runSearch = useCallback(
    async (input: string) => {
      const places = await ensurePlaces();
      if (!places || input.trim().length < 3) {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      if (!sessionTokenRef.current) {
        sessionTokenRef.current = new places.AutocompleteSessionToken();
      }

      setLoading(true);
      try {
        const { suggestions: raw } =
          await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input,
            sessionToken: sessionTokenRef.current,
            includedRegionCodes: ['us'],
          });

        const mapped: Suggestion[] = raw
          .map((s) => s.placePrediction)
          .filter((p): p is google.maps.places.PlacePrediction => p != null)
          .map((p) => ({ id: p.placeId, label: p.text.toString(), prediction: p }));

        setSuggestions(mapped);
        setActiveIndex(-1);
        setOpen(mapped.length > 0);
      } catch {
        setSuggestions([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    },
    [ensurePlaces]
  );

  function handleInputChange(next: string) {
    onChange(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }
    debounceRef.current = setTimeout(() => runSearch(next), DEBOUNCE_MS);
  }

  async function handlePick(s: Suggestion) {
    setOpen(false);
    setSuggestions([]);
    justSelectedRef.current = true;
    try {
      const place = s.prediction.toPlace();
      await place.fetchFields({ fields: ['addressComponents'] });
      const parsed = parseAddressComponents(place.addressComponents ?? []);
      onChange(parsed.street1 || s.label);
      onSelect(parsed);
    } catch {
      onChange(s.label);
    } finally {
      // End the billing session — next keystroke starts a fresh one.
      sessionTokenRef.current = null;
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        e.preventDefault();
        handlePick(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Input
        id={id}
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true);
          void ensurePlaces();
        }}
        onBlur={onBlur}
      />

      {loading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
      )}

      {open && suggestions.length > 0 && (
        <ul className="absolute z-30 mt-1 w-full max-h-64 overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {suggestions.map((s, idx) => (
            <li key={s.id}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handlePick(s)}
                className={`flex w-full items-start gap-2 px-3 py-2 text-left text-sm ${
                  idx === activeIndex ? 'bg-red-50 text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
                <span className="leading-snug">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
