import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from '@react-google-maps/api';

// CENTER LOCATION FOR THE MAP?
const center = { lat: 1.2983000336922557, lng: 103.82741106870155 };
// MARKERS FOR THE POIs TO BE PULLED FROM AN API
const markers = [
  {
    id: 1,
    name: 'ACSJ',
    position: { lat: 1.3093241020015653, lng: 103.84158485336222 },
    postal: 'Singapore 227988',
  },
  {
    id: 2,
    name: 'Teachers Network',
    position: { lat: 1.298156613368654, lng: 103.82893366886304 },
    postal: 'Singapore 249564',
  },
  {
    id: 3,
    name: 'Botanic Garden',
    position: { lat: 1.3147701916083578, lng: 103.81571461383005 },
    postal: 'Singapore 257494',
  },
  {
    id: 4,
    name: 'Irwell Bank',
    position: { lat: 1.2977756658797466, lng: 103.83107536388265 },
    postal: 'Singapore 239200',
  },
  {
    id: 5,
    name: 'Chatsworth Park',
    position: { lat: 1.3001809922672687, lng: 103.82191579587575 },
    postal: 'Singapore 249767',
  },
];

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  console.log('isLoaded', isLoaded);

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [activeMarker, setActiveMarker] = useState(null);

  if (!isLoaded) {
    return <Typography> Not Loading</Typography>;
  }

  // ON CLICK HANDLER FOR THE POI MARKERS
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
          // onLoad={handleOnLoad}
          // onClick={() => setActiveMarker(null)}
        >
          <MarkerF
            position={center}
            icon='https://maps.gstatic.com/mapfiles/ms2/micons/lightblue.png'
          />

          {markers.map(({ id, name, position }) => (
            <MarkerF
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
            >
              {activeMarker === id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>
      </Box>
    </>
  );
}

export default Map;
