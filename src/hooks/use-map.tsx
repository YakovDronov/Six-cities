import leaflet, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRef, useEffect, useState, MutableRefObject} from 'react';
import {TileLayerIcon} from '../components/map/utils/utils.ts';


type City = {
  latitude: number;
  longitude: number;
  zoom: number;
};

function useMap(mapRef: MutableRefObject<HTMLDivElement | null>, city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude,
        },
        zoom: city.zoom,
      });

      leaflet
        .tileLayer(TileLayerIcon.UrlPattern,
          {attribution: TileLayerIcon.Attribution,},
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
