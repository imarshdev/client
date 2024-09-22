import React, { useEffect, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import ReactDOM from "react-dom";
import "../css/ride.css";
import ridericon from "../assets/ridericon.png";
import { CiHome } from "react-icons/ci";
import { MdAdd, MdWork } from "react-icons/md";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native-web";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { Autocomplete } from "@react-google-maps/api";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";

export default function CurrentRide() {
  const [destinationLat, setDestinationLat] = useState({});
  const [destinationLng, setDestinationLng] = useState({});
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [destination, setDestination] = useState();
  const [userLocation, setUserLocation] = useState();
  const [directions, setDirections] = useState(null);
  const [step, setStep] = useState(false);
  const [inputFocused, setInputFocused] = useState(null);
  const [autoComplete, setAutocomplete] = useState(false);
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const destinationRef = useRef();
  const currentride = () => {
    navigate("/");
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("https://walamin-server.onrender.com/all-locations")
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 30000); // 30000 milliseconds = 30 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11?logo=false",
      zoom: 15,
    });

    setMap(map);

    // Add the Mapbox Directions control
    const directions = new window.MapboxDirections({
      accessToken: window.mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/walking",
      alternatives: false,
      geometries: "geojson",
      controls: { instructions: false, inputs: false },
      flyTo: true,
    });

    map.addControl(directions);
    setDirections(directions);

    directions.on("route", (e) => {
      const route = e.route[0].geometry.coordinates;
      const routeObject = e.route[0];
      setDistance(routeObject.distance);
      setDuration(routeObject.duration);
      console.log(distance);
      console.log(duration);

      // Add the route as a GeoJSON source
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        },
      });

      // Add a line layer to visualize the route
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-cap": "round",
          "line-join": "round",
          "line-width": 6,
        },
        paint: {
          "line-color": "#888",
          "line-opacity": 0.75,
        },
      });
    });

    // Add markers for each location
    data.forEach((location) => {
      if (location.location) {
        const markerElement = document.createElement("div");
        ReactDOM.render(<RiderMarker />, markerElement);
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([location.location.longitude, location.location.latitude])
          .addTo(map);
      }
    });

    // Add marker for current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;

        setUserLocation([longitude, latitude]);

        map.setCenter([longitude, latitude]);
        map.setZoom(15);

        const marker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map);
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
      }
    );

    return () => {
      map.remove();
    };
  }, [data]);
  const screenHeight = window.innerHeight;
  const verticalOffset = screenHeight * 1;
  const focused = () => {
    setAutocomplete(true);
  };
  const goup = () => {
    setInputFocused(true);
    setStep(true);
  };
  const unFocused = () => {
    if (!userLocation || !destination) return;
    map.setCenter(userLocation);
    if (directions) {
      directions.setOrigin(userLocation); // Uganda Parliament coordinates
      directions.setDestination([destinationLng, destinationLat]); // Forest Mall coordinates
    }
    map.setZoom(13);
  };
  const blurred = () => {
    setInputFocused(false);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: destinationRef.current.value },
      (results, status) => {
        if (status === "OK") {
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
          setDestinationLat(results[0].geometry.location.lat());
          setDestinationLng(results[0].geometry.location.lng());
        }
      }
    );
    setDestination(destinationRef.current.value);
  };
  useEffect(() => {
    if (location) {
      console.log(destination);
    }
  });
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={verticalOffset}
      behavior="height"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        boxSizing: "border-box",
        padding: "30px 10px",
      }}
    >
      <TouchableOpacity id="back" onPress={currentride}>
        <IoIosArrowBack size={24} />
      </TouchableOpacity>
      <div
        id="map"
        style={{
          height: "80vh",
          width: "100vw",
        }}
      ></div>
      <BottomSheet
        header={
          <>
            {step ? (
              <>
                <Autocomplete>
                  <input
                    type="text"
                    placeholder="Where to ?"
                    style={{
                      width: "72vw",
                      height: "0.5rem",
                      padding: "0 10px",
                      boxSizing: "border-box",
                    }}
                    onFocus={focused}
                    onChange={goup}
                    onBlur={blurred}
                    ref={destinationRef}
                  />
                </Autocomplete>
                <TouchableOpacity
                  onPress={unFocused}
                  style={{
                    width: "20%",
                    display: "flex",
                    alighItems: "center",
                    justifyContent: "center",
                    backgroundColor: "limegreen",
                    borderRadius: "10px",
                  }}
                >
                  <p>Go</p>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={goup}
                style={{
                  width: "100%",
                  height: "3rem",
                  boxSizing: "border-box",
                  display: "flex",
                  alighItems: "center",
                  justifyContent: "center",
                  backgroundColor: "limegreen",
                  borderRadius: "10px",
                }}
              >
                <p style={{ color: "#fff" }}>Click to Enter Destination</p>
              </TouchableOpacity>
            )}
          </>
        }
        skipInitialTransition={true}
        expandOnContentDrag={true}
        blocking={false}
        snapPoints={({ maxHeight }) =>
          inputFocused
            ? [maxHeight - maxHeight / 10]
            : inputFocused === false
            ? [maxHeight / 3.3]
            : [maxHeight / 2]
        }
        open={true}
        style={{ boxSizing: "border-box", padding: "10px" }}
      >
        {autoComplete ? (
          <p>
            {inputFocused === false ? (
              <>
                <p>Distance: {(distance / 1000).toFixed(2)} km</p>{" "}
                {/* Convert to km */}
                <p>Duration: {(duration / 60).toFixed(2)} mins</p>{" "}
                {/* Convert to mins */}
                <p>Cost: {(distance / 1).toFixed(0)} shs</p>
                <TouchableOpacity id="confirm-pickup">
                  <p>Order</p>
                </TouchableOpacity>
                <TouchableOpacity id="cancel-pickup">
                  <p>Cancel</p>
                </TouchableOpacity>
              </>
            ) : (
              <></>
            )}
          </p>
        ) : (
          <>
            <div style={{ width: "100%" }}>
              <p>Saved</p>
              <div className="saved-container">
                <div
                  style={{
                    width: "20%",
                    marginRight: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity id="saved">
                    <CiHome size={20} color="darkgreen" />
                  </TouchableOpacity>
                  <span>Home</span>
                </div>

                <div
                  style={{
                    width: "20%",
                    marginRight: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity id="saved">
                    <MdWork size={20} color="darkgreen" />
                  </TouchableOpacity>
                  <span>Work</span>
                </div>

                <div
                  style={{
                    width: "20%",
                    marginRight: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity id="saved">
                    <MdAdd size={20} color="darkgreen" />
                  </TouchableOpacity>
                  <span>Add</span>
                </div>
              </div>
            </div>
            <p>Recents</p>
            <div className="locations">
              <div
                className="location"
                style={{ borderTop: "solid 0.1px rgba(0, 100, 0, 0.192)" }}
              >
                <span>Place Name</span>
                <span>formatted_address</span>
              </div>
              <div className="location">
                <span>Place Name</span>
                <span>formatted_address</span>
              </div>
            </div>
          </>
        )}
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}

const RiderMarker = () => {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        }}
      >
        <img src={ridericon} style={{ width: "40px" }} />
      </div>
    </div>
  );
};
