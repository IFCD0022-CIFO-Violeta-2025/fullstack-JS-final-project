import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { useCallback, useState, useRef, useEffect } from 'react';
import ShareButtons from './shareButtons';

const GoogleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;



function PlanoEvento( ancho='100%', alto='400px', lat=41.3871, lng=2.17, zoom=9 ) {
  const containerStyle = {
    width: ancho,
    height: alto
  };

  const center = {
    lat: 41.3871, 
    lng: 2.17
  };

  const event01 = {
    lat: 41.3871, 
    lng: 2.17
  };
  const event02 = {
    lat: 41.388084174016164,  
    lng: 2.1886755703337863
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleApiKey,
    libraries: ['places'] // Asegúrate de incluir 'places'
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [locationMap, setLocationMap] = useState(center);
  const autocompleteRef = useRef(null);
  const [clickPosition, setClickPosition] = useState({ lat: 0, lng: 0 });
  const inputRef = useRef(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(event01, event02);
    map.fitBounds(bounds);
    map.setZoom(9);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        setLocationMap({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
      }
    }
  };

  useEffect(() => {
    if (map) {
      map.panTo(locationMap);
    }
  }, [locationMap]);

  const onMapClick = (e) => {
    setClickPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })
  };

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ marginBottom: '10px' }}>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Buscar ubicación..."
            ref={inputRef}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </Autocomplete>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        <Marker position={event01} /> // como se añadirían los eventos en un plano
        <Marker position={event02} />
      </GoogleMap>
      <div className='datos'>
        <p></p>
        <p><b>Haz click en el mapa para recoger </b >Latitud: {clickPosition.lat} , Longitud: {clickPosition.lng}</p>
      </div>
      <div className='shareEvent'>
        <ShareButtons lat={clickPosition.lat} lng={clickPosition.lng} title='Mi ubicación actual' />
      </div>
    </div>
  );
}

export default PlanoEvento;