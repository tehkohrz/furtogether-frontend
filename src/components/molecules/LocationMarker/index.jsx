import React, { useState } from 'react';
import { Button, Text, Stack, HStack } from '@chakra-ui/react';

import { InfoWindow, Marker } from '@react-google-maps/api';
import axios from 'axios';

export default function LocationMarkers({
  marker,
  timeFilter,
  joinedMarker,
  setUserDaily,
  activeInfo,
  setActiveMarker,
}) {
  const [headCount, setHeadCount] = useState(0);
  // counts the headcount based on the filtered time
  function markerClick() {
    let headCount = 0;
    marker.dailies.forEach((entry) => {
      // Convert to integer for comparison
      const startTime = Number(entry.start_time.replace(':', ''));
      const filterTime = Number(timeFilter.replace(':', ''));
      // Count only if the start time is earlier than the filter and it is not your own entry
      if (startTime < filterTime && !joinedMarker) {
        headCount += 1;
      }
    });
    setHeadCount(headCount);
    setActiveMarker(marker.id);
  }

  // Button handler for join and API call to update dailies db
  const handleJoin = async () => {
    try {
      const updatedDaily = await axios.put(
        process.env.REACT_APP_API_URL + `walk/join`,
        { locationId: marker.id, newStartTime: timeFilter },
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
      const updatedDaily = await axios.delete(process.env.REACT_APP_API_URL + `walk/cancel`, {
        withCredentials: true,
      });
      setUserDaily(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Marker key={marker.id} position={marker.position} onClick={markerClick}>
      {activeInfo ? (
        <InfoWindow>
          <Stack direction='column'>
            <Text as='b' fontSize={'md'} color={'black'}>
              {marker.name}
            </Text>
            <HStack>
              <Text fontSize={'s'} color={'black'}>
                Dogs Walking :
              </Text>
              <Text as='b' fontSize={'md'} color={'black'}>
                {headCount}
              </Text>
            </HStack>
            {/* Conditional for different button depending on current user committed location */}
            {joinedMarker ? (
              <Button colorScheme='red' size='xs' onClick={handleCancel}>
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
}
