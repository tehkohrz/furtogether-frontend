import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Stack } from '@chakra-ui/react';

import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

export default function MapInput({
  center = { lat: 1.2983000336922557, lng: 103.82741106870155 },
  setLocation,
  location,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [currentMap, setCurrentMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [allMarkers, setAllMarkers] = useState(null);

  // Loads the markers of walking spots
  useEffect(() => {
    const getMarkers = async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_API_URL + 'walk/markers');
        const markers = data.locations.map((location) => {
          const entry = {
            id: location.id,
            position: { lat: location.latitude, lng: location.longitude },
            name: location.name,
            postal: location.postal,
          };
          return entry;
        });
        setAllMarkers(markers);
      } catch (e) {
        console.log(e);
      }
    };
    getMarkers();
  }, []);
  if (!allMarkers) {
    return <Text>No Markers</Text>;
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
        {isLoaded && (
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
            {allMarkers.map(({ id, name, position }) => (
              <Marker key={id} position={position} onClick={() => handleActiveMarker(id)}>
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <Stack direction='column'>
                      <Text as='b' fontSize={'md'} color={'black'}>
                        {name}
                      </Text>
                      {location === id ? (
                        <Button colorScheme={'red'} size='xs' onClick={() => selectLocation(id)}>
                          Unselect
                        </Button>
                      ) : (
                        <Button colorScheme={'teal'} size='xs' onClick={() => selectLocation(id)}>
                          Select
                        </Button>
                      )}
                    </Stack>
                  </InfoWindow>
                ) : null}
              </Marker>
            ))}
          </GoogleMap>
        )}
      </Box>
    </>
  );
}
