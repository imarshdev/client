import React, { useContext, useEffect, useRef, useState } from "react";
import "../css/map.css";
import ridericon from "../assets/ridericon.png";
import { BottomSheet } from "react-spring-bottom-sheet";
import { TouchableOpacity } from "react-native-web";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";

export default function MapElement() {
  const [result, setResult] = useState(1);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sendRide, setSendRide] = useState();
  const [number, setNumber] = useState(3.5);
  const [open, setOpen] = useState(true);
  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationName, setDestinationName] = useState("");
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [cost, setCost] = useState("");
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [step, setStep] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const navigate = useNavigate();
  const [simplifiedData, setSimplifiedData] = useState([]);

  const kampalaCoordinates = [
    { lat: 0.3162, lng: 32.5811 }, // Kampala City Center
    { lat: 0.3345, lng: 32.6156 }, // Makerere University
    { lat: 0.2861, lng: 32.5669 }, // Nakasero Market
    { lat: 0.3083, lng: 32.6039 }, // Kololo Hill
    { lat: 0.3539, lng: 32.6449 }, // Kyambogo University
    { lat: 0.2614, lng: 32.5398 }, // Lubowa Hill
    { lat: 0.2958, lng: 32.5741 }, // Kibuli Hill
    { lat: 0.3395, lng: 32.6298 }, // Ntinda
    { lat: 0.2729, lng: 32.5543 }, // Muyenga
    { lat: 0.3139, lng: 32.5947 }, // Bugolobi
  ];
  const back = () => {
    navigate("/");
  };
  const start = () => {
    setNumber(2.5);
    if (!destination) return;
    getDirections();
    setSendRide(true);
  };
  const snapPoints = ({ maxHeight, minHeight }) => {
    return isExpanded ? [maxHeight / 1] : [minHeight];
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://walamin-server.onrender.com/all-locations"
        );
        console.log(response.data);

        if (Array.isArray(response.data)) {
          const newData = response.data.map((item) => ({
            lat: item.location.latitude,
            lng: item.location.longitude,
            name: item.name,
          }));

          // Check if newData is different from simplifiedData
          if (JSON.stringify(newData) !== JSON.stringify(simplifiedData)) {
            setSimplifiedData(newData);
            console.log(simplifiedData);
          }
        }

        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call fetchData immediately

    const intervalId = setInterval(fetchData, 30000); // Fetch every 30 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    setUsername(user.Username);
    setToken(user.Token);
    console.log("Username:", username);
    console.log("Token:", token);
    console.log("cost:", cost);
  });
  const bookRide = async () => {
    setResult(2);
    console.log("Origin:", origin);
    console.log("Destination:", destinationName);
    try {
      const response = await axios.post(
        "https://walamin-server.onrender.com/rides/express",
        {
          username,
          token,
          origin: origin,
          destination: destinationName,
          cost,
        }
      );
      setResult(3);
      setMessage("Ride sent successfully! Await rider call");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setResult(3);
        setMessage(
          "An error occurred while booking the ride. Please try again."
        );
      }
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
    });
  });
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyLrk1KXy32iTkKpsbR1J1USZWKd4lE5oud&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      const mapElement = document.getElementById("map");
      const mapInstance = new google.maps.Map(mapElement, {
        center: { lat: 0.3163, lng: 32.5811 },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      });
      setMap(mapInstance);

      new google.maps.Marker({
        map: mapInstance,
        position: { lat: 0.3162, lng: 32.5811 },
        title: "hello World!",
      });

      new google.maps.Marker({
        map: mapInstance,
        position: { lat: 0.5162, lng: 35.5811 },
        title: "hello World!",
        icon: {
          url: ridericon,
          scaledSize: new google.maps.Size(50, 50), // Size of the icon
        },
      });

      new google.maps.Marker({
        map: mapInstance,
        position: { lat: 0.4162, lng: 33.5811 },
        title: "hello World!",
      });

      simplifiedData.forEach((location) => {
        new google.maps.marker.AdvancedMarkerElement({
          map: mapInstance,
          position: { lat: location.lat, lng: location.lng },
          title: location.name,
          icon: {
            url: ridericon,
            scaledSize: new google.maps.Size(50, 50), // Size of the icon
          },
        });
        console.log(marker);
      });

      const input = document.getElementById("input");
      const autocompleteInstance = new google.maps.places.Autocomplete(input);
      autocompleteInstance.bindTo("bounds", mapInstance);
      setAutocomplete(autocompleteInstance);

      autocompleteInstance.addListener("place_changed", () => {
        const place = autocompleteInstance.getPlace();
        if (!place.geometry) {
          console.log(
            "No details available for the input: '" + place.name + "'"
          );
          return;
        }
        setStep(null);
        setSendRide(false);
        setDestination(place.formatted_address);
        setDestinationName(place.name);
        console.log("Selected place updated:", place);
        if (place.geometry.viewport) {
          mapInstance.fitBounds(place.geometry.viewport);
        } else {
          mapInstance.setCenter(place.geometry.location);
          mapInstance.setZoom(17);
        }
        new google.maps.Marker({
          position: place.geometry.location,
          map: mapInstance,
        });
        setLoadingSuggestions(false);
      });
    };
  }, [simplifiedData]);

  const getDirections = () => {
    setLoaded(false);
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          {
            location: {
              lat: lat,
              lng: lng,
            },
          },
          (result, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              console.log(result[0].formatted_address);
              setOrigin(result[0].formatted_address);
              const directionsService = new google.maps.DirectionsService();
              const directionsRequest = {
                origin: result[0].formatted_address,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
              };
              directionsService.route(directionsRequest, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  if (directionsRenderer) {
                    directionsRenderer.setDirections(result);
                  } else {
                    const directionsRendererInstance =
                      new google.maps.DirectionsRenderer({
                        map: map,
                        directions: result,
                      });
                    setDirectionsRenderer(directionsRendererInstance);
                    setDistance(result.routes[0].legs[0].distance.text);
                    setDuration(result.routes[0].legs[0].duration.text);
                    const distanceInKm = parseFloat(
                      result.routes[0].legs[0].distance.value / 1000
                    );
                    const cost =
                      distanceInKm < 1.5
                        ? 1000
                        : Math.ceil((distanceInKm - 0.5) / 0.5) * 500;
                    setCost(cost);
                    setLoaded(true);
                  }
                } else {
                  console.log("Directions request failed: " + status);
                }
              });
            } else {
              console.error(status);
            }
          }
        );
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true }
    );
  };
  const screenHeight = window.innerHeight;
  const verticalOffset = screenHeight * 1;
  const goup = () => {
    setInputFocused(true);
    setStep(true);
  };
  const focused = () => {
    setAutocomplete(true);
  };
  const unFocused = () => {
    setInputFocused(false);
    setAutocomplete(false);
    setStep(false);
  };
  return (
    <div>
      <div id="map" style={{ height: "65vh", width: "100vw" }} />
      <TouchableOpacity id="back" onPress={back}>
        <IoIosArrowBack size={24} />
      </TouchableOpacity>

      <BottomSheet
        open={open}
        blocking={false}
        keyboardVerticalOffset={verticalOffset}
        behavior="height"
        snapPoints={({ maxHeight }) =>
          inputFocused ? [maxHeight - maxHeight / 10] : [maxHeight / 2.5]
        }
        skipInitialTransition={true}
        expandOnContentDrag={true}
        header={
          <>
            {step ? (
              <>
                <input
                  type="text"
                  id="input"
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
            ) : step === null ? (
              <p></p>
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
      >
        <div
          style={{
            width: "100vw",
            boxSizing: "border-box",
            padding: "20px 20px 40px 20px",
          }}
        >
          <div>
            {loadingSuggestions && (
              <div style={{ padding: "20px" }}>
                <FallingLines width="100px" />
              </div>
            )}
          </div>
          {number === 2.5 && (
            <>
              {loaded ? (
                <>
                  <p>distance: {distance}</p>
                  <p>Duration: {duration}</p>
                  <p>Estimated Cost: shs.{cost}</p>
                  {result === 1
                    ? null
                    : (result === 2 && <p>Loading....</p>) ||
                      (result === 3 && (
                        <p style={{ marginBottom: "20px" }}>{message}</p>
                      ))}
                  <br />
                </>
              ) : (
                <div style={{ padding: "20px" }}>
                  <FallingLines width="100px" />
                </div>
              )}
            </>
          )}
          <br />
          {sendRide === false && (
            <>
              <p>{origin}</p>
              <br />
              <TouchableOpacity
                onPress={start}
                id="confirm-pickup"
                style={{ width: "90%" }}
              >
                <p> Confirm Location</p>
              </TouchableOpacity>
            </>
          )}
          {sendRide === true && (
            <>
              <TouchableOpacity onPress={bookRide} id="confirm-pickup">
                <p>Order Ride</p>
              </TouchableOpacity>
              <TouchableOpacity onPress={back} id="cancel-pickup">
                <p>Cancel</p>
              </TouchableOpacity>
            </>
          )}
        </div>
      </BottomSheet>
    </div>
  );
}
