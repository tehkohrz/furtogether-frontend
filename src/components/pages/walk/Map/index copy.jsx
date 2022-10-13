import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Flex, Select, Stack, HStack } from '@chakra-ui/react';

import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

// CENTER LOCATION FOR THE MAP?
const center = { lat: 1.2983000336922557, lng: 103.82741106870155 };

export default function Map() {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [allMarkers, setAllMarkers] = useState(null);
  const [newTime, setNewTime] = useState('07:00');
  const [userDaily, setUserDaily] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    getAllDaily();
    getUserDaily();
  }, []);

  // Gets the user's current db daily record
  async function getUserDaily() {
    try {
      // New user wont have a record no need to throw error
      const { data } = await axios.get(process.env.REACT_APP_API_URL + `walk/user`, {
        withCredentials: true,
      });
      if (data.userDaily) {
        setUserDaily(data.userDaily.locationId);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Get all the daily routines for all locations
  async function getAllDaily() {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + `walk/map`,
        {
          filterTime: newTime,
        },
        {
          withCredentials: true,
        }
      );
      const locations = data.locations.map((location) => {
        const entry = {
          id: location.id,
          headCount: location.dailies.length,
          dailies: location.dailies,
          position: { lat: location.latitude, lng: location.longitude },
          name: location.name,
          postal: location.postal,
        };
        return entry;
      });
      setAllMarkers(locations);
    } catch (e) {
      console.log(e);
    }
  }
  // TIME FILTER
  // Set the new time filter state
  const handleSelectChange = (e) => {
    setNewTime(e.target.value);
  };
  const TimeFilter = generateTimeFilter(handleSelectChange);

  let mapMarkers;
  // If the locations are loaded then generate the components
  if (allMarkers) {
    mapMarkers = allMarkers.map((marker) => {
      // On CLick handler to set the selected marker
      const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        // await getCount(marker);
        setActiveMarker(marker);
      };
      // Button handler for join and API call to update dailies db
      const handleJoin = async () => {
        try {
          const updatedDaily = await axios.put(
            process.env.REACT_APP_API_URL + `walk/join`,
            { markerId: marker.id, newTime },
            { withCredentials: true }
          );
          setUserDaily(marker.id);
        } catch (err) {
          console.log(err);
        }
      };

      // Handles the cancellation of daily
      const handleCancel = async () => {
        try {
          const updatedDaily = await axios.put(process.env.REACT_APP_API_URL + `walk/cancel`, {
            withCredentials: true,
          });
          setUserDaily(null);
        } catch (err) {
          console.log(err);
        }
      };
      return (
        <Marker
          key={marker.id}
          position={marker.position}
          onClick={() => handleActiveMarker(marker.id)}
        >
          {activeMarker === marker.id ? (
            <InfoWindow onCloseClick={() => handleActiveMarker(null)}>
              <Stack direction='column'>
                <Text as='b' color={'black'}>
                  {marker.name}
                </Text>
                <HStack>
                  <Text color={'black'}>Dogs Walking :</Text>
                  <Text as='b' color={'black'}>
                    {marker.headCount}
                  </Text>
                </HStack>
                {/* Conditional for different button depending on current user committed location */}
                {userDaily == marker.id ? (
                  <Button colorScheme='red' onClick={handleCancel}>
                    Cancel
                  </Button>
                ) : (
                  <Button colorScheme='teal' size='xs' onClick={handleJoin}>
                    Join
                  </Button>
                )}
              </Stack>
            </InfoWindow>
          ) : null}
        </Marker>
      );
    });
  }
  return (
    <>
      <Flex alignItems='center'>
        <Box width='100%' height={'90vh'} padding={4}>
          <form>
            <Flex direction='row'>
              <Box width='100%%' marginBottom={2}>
                {TimeFilter}
              </Box>
              <Box padding={1.5} width='50%'>
                <Button colorScheme='teal' size='xs'>
                  Meeting At This Time
                </Button>
              </Box>
            </Flex>
          </form>
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
              onLoad={(map) => setMap(map)}
            >
              <Marker
                position={center}
                icon='https://maps.gstatic.com/mapfiles/ms2/micons/lightblue.png'
              />
              {mapMarkers}
            </GoogleMap>
          )}
        </Box>
      </Flex>
    </>
  );
}

// Generate time filter
function generateTimeFilter(handleChange) {
  const timeOptions = [];
  for (let i = 0; i < 24; i += 1) {
    let label = `${i}:00`;
    if (i < 10) {
      label = `0${i}:00`;
    }
    const option = <option value={label}>{label}</option>;
    timeOptions.push(option);
  }
  return (
    <Select placeholder='Select Time' onChange={handleChange} defaultValue='07:00'>
      {timeOptions}
    </Select>
  );
}
