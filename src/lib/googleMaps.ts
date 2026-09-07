import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

// Singleton loader for the Google Maps JS API "places" library.
// Resolves to the places library, or rejects if no key is configured / load fails.
// Callers must handle rejection gracefully (fall back to a plain input).

let placesPromise: Promise<google.maps.PlacesLibrary> | null = null;

export function loadPlacesLibrary(): Promise<google.maps.PlacesLibrary> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('google-maps: not in browser'));
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(new Error('google-maps: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set'));
  }

  if (!placesPromise) {
    setOptions({ key: apiKey, v: 'weekly' });
    placesPromise = importLibrary('places');
  }

  return placesPromise;
}

export interface ParsedAddress {
  street1: string;
  city: string;
  state: string;
  zip: string;
}

// Maps a resolved Place's addressComponents into our flat US-address fields.
export function parseAddressComponents(
  components: google.maps.places.AddressComponent[]
): ParsedAddress {
  const get = (type: string, short = false): string => {
    const c = components.find((comp) => comp.types.includes(type));
    if (!c) return '';
    return (short ? c.shortText : c.longText) ?? '';
  };

  const streetNumber = get('street_number');
  const route = get('route');
  const city =
    get('locality') || get('postal_town') || get('sublocality_level_1') || get('sublocality');

  return {
    street1: [streetNumber, route].filter(Boolean).join(' '),
    city,
    state: get('administrative_area_level_1', true),
    zip: get('postal_code'),
  };
}
