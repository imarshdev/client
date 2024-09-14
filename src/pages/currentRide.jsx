import React, { useEffect, useState } from "react";
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

mapboxgl.accessToken =
  "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";

export default function CurrentRide() {
  const [step, setStep] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [autoComplete, setAutocomplete] = useState(false);
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
    setInputFocused(false);
    setAutocomplete(false);
    setStep(false);
  };
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
      <div id="map" style={{ height: "50vh", width: "100vw" }}></div>
      <BottomSheet
        header={
          <>
            {step ? (
              <>
                <input
                  type="text"
                  placeholder="Where to ?"
                  style={{
                    width: "74%",
                    height: "1.5rem",
                    padding: "0 10px",
                    boxSizing: "border-box",
                  }}
                  onFocus={focused}
                  onChange={goup}
                  onBlur={unFocused}
                />
                <TouchableOpacity
                  onPress={unFocused}
                  style={{
                    width: "20%",
                    display: "flex",
                    alighItems: "center",
                    justifyContent: "center",
                    backgroundColor: "lightgray",
                    borderRadius: "10px",
                  }}
                >
                  <p>Cancel</p>
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
          inputFocused ? [maxHeight - maxHeight / 10] : [maxHeight / 2]
        }
        open={true}
        style={{ boxSizing: "border-box", padding: "10px" }}
      >
        {autoComplete ? (
          <p></p>
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