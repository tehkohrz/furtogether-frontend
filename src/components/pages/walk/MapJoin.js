import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [allMarkers, setAllMarkers] = useState(null);
  const [updatingJoinCount, setUpdatingJoinCount] = useState(false);
  const [joinUpdatedTs, setJoinUpdatedTs] = useState(0);

  const navigate = useNavigate();

  const markers = async () => {
    try {
      const markersDetails = await axios.get(
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_API_URL + "walk/map"
      );
      console.log("markers info", markersDetails.data);
      setAllMarkers(markersDetails.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    markers();
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
        process.env.REACT_APP_API_URL + `walk/join/${marker}`,
        // {
        //   locaton_id: marker,
        // }
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

  if (!allMarkers) {
    return <div>Hello</div>;
  }

  return (
    <>
      <Flex alignItems="center">
        <Box width="40%" height={400} padding={4}>
          <Flex direction="row">
            <Box width="50%" marginBottom={2}>
              <Select placeholder="Select option">
                <option value="7:00">7:00</option>
                <option value="8:00">8:00</option>
                <option value="9:00">9:00</option>
                <option value="10:00">10:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">19:00</option>
              </Select>
            </Box>
            <Box padding={1.5} width="50%">
              <Button
                colorScheme="teal"
                size="xs"
                // onClick={}
              >
                Meeting At This Time
              </Button>
            </Box>
          </Flex>
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
