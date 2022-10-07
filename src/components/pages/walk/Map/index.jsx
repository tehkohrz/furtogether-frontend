import React, { useState, useEffect } from "react";
import { Box, Button, Text, Flex, Select } from "@chakra-ui/react";

import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";

// CENTER LOCATION FOR THE MAP?
const center = { lat: 1.2983000336922557, lng: 103.82741106870155 };

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  console.log("isLoaded", isLoaded);

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [activeMarker, setActiveMarker] = useState(null);
  const [allMarkers, setAllMarkers] = useState([]);
  const [updatingJoinCount, setUpdatingJoinCount] = useState(false);
  const [joinUpdatedTs, setJoinUpdatedTs] = useState(0);
  const [newTime, setNewTime] = useState(7);

  const handleNewTime = async () => {
    try {
      const markersDetails = await axios.get(
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_API_URL + `walk/map?start_int=${newTime}`,
        //  { params: { startInt: newTime } } // replace int with startInt
      );
      console.log("markers info", markersDetails.data);
      setAllMarkers(markersDetails.data);
    } catch (e) {
      console.log(e);
    }
    //setJoinUpdatedTs(Date.now())
  };

  useEffect(() => {
    if (joinUpdatedTs !== 0) handleNewTime();
  }, [joinUpdatedTs]);

  // useEffect(() => {
  //   handleJoin();
  //   markers();
  // }, []);

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

  const handleChange = (e) => {
    console.log('xssd', e.target.value)
    setNewTime(Number(e.target.value));
  };

  // ON CLICK HANDLER FOR THE POI MARKERS
  const handleActiveMarker = async (marker) => {
    if (marker === activeMarker) {
      return;
    }
    // await getCount(marker);
    setActiveMarker(marker);
  };

  const handleJoin = async (marker) => {
    setUpdatingJoinCount(true);
    try {
      const updatedNum = await axios.put(
        process.env.REACT_APP_API_URL + `walk/join/${marker}?st=${newTime}`,
        {},
        { withCredentials: true }
      );
      setJoinUpdatedTs(Date.now());
      // navigate("/walk/map");

      // navigate("/");
    } catch (err) {
      console.log("cannot join propoery");
    }
    setUpdatingJoinCount(false);
  };

  return (
    <>
      <Flex alignItems="center">
        <Box width="40%" height={400} padding={4}>
          <form>
            <Flex direction="row">
              <Box width="50%" marginBottom={2}>
                <Select placeholder="Select option" onChange={handleChange}
                value={newTime}
                >
                  <option value={7}>7:00</option>
                  <option value={8}>8:00</option>
                  <option value={9}>9:00</option>
                  <option value={10}>10:00</option>
                  <option value={17}>17:00</option>
                  <option value={18}>18:00</option>
                  <option value={19}>19:00</option>
                  <option value={20}>19:00</option>
                </Select>
              </Box>
              <Box padding={1.5} width="50%">
                <Button colorScheme="teal" size="xs" 
                onClick={handleNewTime}
                >
                  Meeting At This Time
                </Button>
              </Box>
            </Flex>
          </form>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
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
              icon="https://maps.gstatic.com/mapfiles/ms2/micons/lightblue.png"
            />
            {allMarkers && allMarkers.length && allMarkers.map(({ id, name, position, headCount }) => (
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
                          disabled={updatingJoinCount}
                          colorScheme="teal"
                          size="xs"
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
