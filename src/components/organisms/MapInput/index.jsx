import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';

import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

export default function MapInput({
  center = { lat: 1.2983000336922557, lng: 103.82741106870155 },
  setLocation,
  location,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: [process.env.REACT_APP_GOOGLE_LIBRARIES],
  });

  const [currentMap, setCurrentMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [allMarkers, setAllMarkers] = useState(null);

  // Loads the markers of walking spots
  useEffect(() => {
    const markers = async () => {
      try {
        const markersDetails = await axios.get(process.env.REACT_APP_API_URL + 'walk/map');
        console.log('markers info', markersDetails);
        setAllMarkers(markersDetails.data);
      } catch (e) {
        console.log(e);
      }
    };
    markers();
  }, []);
  if (!allMarkers) {
    return <div>No Markers</div>;
  }

  // ?HANDLERS
  // ON CLICK HANDLER FOR THE POI MARKERS
  const handleActiveMarker = async (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // Buttonhandler to set the location id for the form
  function selectLocation(id) {
    // De-selects if this location was previously selected
    if (location == id) {
      setLocation(null);
    } else {
      setLocation(id);
    }
  }

  return (
    <>
      <Box width='100%' height={'50vh'}>
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
          onLoad={(currentMap) => setCurrentMap(currentMap)}
        >
          <Marker
            position={center}
            icon='https://maps.gstatic.com/mapfiles/ms2/micons/lightblue.png'
          />
          {allMarkers.map(({ id, name, position, headCount }) => (
            <Marker key={id} position={position} onClick={() => handleActiveMarker(id)}>
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <div>{name}</div>
                    <div>
                      <br />
                      <Button colorScheme='teal' size='xs' onClick={() => selectLocation(id)}>
                        {location === id ? 'Unselect' : 'Select'}
                      </Button>
                    </div>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      </Box>
    </>
  );
}
