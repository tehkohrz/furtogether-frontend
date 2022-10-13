import React, { useState, useEffect } from 'react';
import { Box, Center, Flex, Select } from '@chakra-ui/react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { LocationMarker } from '../../../molecules';

// CENTER LOCATION FOR THE MAP?
const center = { lat: 1.2983000336922557, lng: 103.82741106870155 };

export default function Map() {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [allMarkers, setAllMarkers] = useState(null);
  const [timeFilter, setTimeFilter] = useState('07:00');
  const [userDaily, setUserDaily] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  // ?API CALLS AND EFFECTS TO LOAD INFO
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
          timeFilter,
        },
        {
          withCredentials: true,
        }
      );
      const locations = data.locations.map((location) => {
        const entry = {
          id: location.id,
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

  // ?TIME FILTER
  // Set the new time filter and closes the active window to reset the values
  const handleSelectChange = (e) => {
    setTimeFilter(e.target.value);
    setActiveMarker(null);
  };
  const TimeSelect = generateTimeSelect(handleSelectChange);

  return (
    <>
      <Flex alignItems='center'>
        <Box width='100%' height={'90vh'} padding={4}>
          <Center marginBottom={2}>{TimeSelect}</Center>
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
              {allMarkers?.map((marker) => {
                let activeInfo = false;
                if (marker.id == activeMarker) {
                  activeInfo = true;
                }
                return (
                  <LocationMarker
                    key={marker.id}
                    marker={marker}
                    timeFilter={timeFilter}
                    joinedMarker={userDaily == marker.id ? true : false}
                    setUserDaily={setUserDaily}
                    activeInfo={activeInfo}
                    setActiveMarker={setActiveMarker}
                  />
                );
              })}
            </GoogleMap>
          )}
        </Box>
      </Flex>
    </>
  );
}

// Generate time filter
function generateTimeSelect(handleChange) {
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
    <Select
      textAlign={'center'}
      fontSize={'xl'}
      size={'lg'}
      placeholder='Select Time'
      onChange={handleChange}
      defaultValue='07:00'
    >
      {timeOptions}
    </Select>
  );
}
