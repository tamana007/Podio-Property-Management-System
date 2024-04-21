import { useRef, useEffect,useState, useMemo } from "react";
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import type { NextPage } from "next";

declare global {
  interface Window {
    google: any;
  }
}
interface GeocoderResult {
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

function GoogleMapContainer() {
  const [mapCenter, setMapCenter] = useState<{ lat: number, lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const libraries = useMemo(() => ["places"], []);
  const mapCenter2 = useMemo(
    () => ({ lat: 30.2672, lng: -97.7431 }),
    []
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    googleMapsApiKey: 'AIzaSyByebbhLZ-w8EcqWuTozv1Dys-fLC0zEU0',
    libraries: libraries as any,
  });

  // if (!isLoaded) {
  //   return <p>Loading...</p>;
  // }
  useEffect(() => {
    if (isLoaded) {
      // Use Google Maps Geocoding service to get latitude and longitude for the location name
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: 'DALLAS' }, (results:GeocoderResult[], status:string) => {
        if (status === 'OK' && results && results.length > 0) {
          const location = results[0].geometry.location;
          setMapCenter({ lat: location.lat(), lng: location.lng() });
        }
      });
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div ref={mapRef} style={{ width: "100%", height: "400px" }}>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        // center={mapCenter}
        center={mapCenter2 || mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={() => console.log("Map Component Loaded...")}
      />
    </div>
  );
}

export default GoogleMapContainer;
