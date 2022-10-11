import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Text, Flex } from '@chakra-ui/react';

import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import axios from 'axios';

// CENTER LOCATION FOR THE MAP?
const center = { lat: 1.2983000336922557, lng: 103.82741106870155 };

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  console.log('isLoaded', isLoaded);

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [activeMarker, setActiveMarker] = useState(null);
  const [allMarkers, setAllMarkers] = useState(null);

  const navigate = useNavigate();

  const markers = async () => {
    try {
      const markersDetails = await axios.get(
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_API_URL + 'walk/map'
      );
      console.log('markers info', markersDetails.data);
      setAllMarkers(markersDetails.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    markers();
  }, []);

  if (!isLoaded) {
    return <Text> Not Loading</Text>;
  }

  // const getCount = async (markerIndex) => {
  //   // eslint-disable-next-line no-undef
  //   const headCount = await axios.get(
  //     process.env.REACT_APP_API_URL + `walk/${markerIndex}`
  //   );
  //   console.log("headCountResults", headCount.data);
  //   return headCount.data;
  // };

  // ON CLICK HANDLER FOR THE POI MARKERS
  const handleActiveMarker = async (marker) => {
    if (marker === activeMarker) {
      return;
    }
    // await getCount(marker);
    setActiveMarker(marker);
  };

  const handleJoin = async (marker) => {
    const updatedNum = await axios.put(
      process.env.REACT_APP_API_URL + `walk/join/${marker}`,
      // {
      //   locaton_id: marker,
      // }
      {},
      { withCredentials: true }
    );
    navigate('/about');
  };

  if (!allMarkers) {
    return <div>Hello</div>;
  }

  return (
    <>
      <Flex alignItems='center'>
        <Box width='100%' height={1000}>
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
          >
            <Marker
              position={center}
              icon='https://maps.gstatic.com/mapfiles/ms2/micons/lightblue.png'
            />
            {allMarkers.map(({ id, name, position, headCount }) => (
              <Marker
                key={id}
                position={position}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <div>{name}</div>
                      <div>Headcount {headCount}</div>
                      <div>
                        <br />
                        <Button
                          colorScheme='teal'
                          size='xs'
                          onClick={() => handleJoin(id)}
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  </InfoWindow>
                ) : null}
              </Marker>
            ))}
          </GoogleMap>
        </Box>
      </Flex>
    </>
  );
}

export default Map;
