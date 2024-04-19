// components/GoogleMap.tsx

import { useRef, useEffect } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google) return; // Check if Google Maps API is available
    const map = new window.google.maps.Map(mapRef.current!, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    // Additional map configurations or functionality here

    return () => {
      // Cleanup when the component unmounts
      map.setMap(null);
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}

export default GoogleMap;
