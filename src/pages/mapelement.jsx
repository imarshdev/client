// oh god this is alot, ill probably put comments on this one tomorrow
// well, tomorrow is today, so yeah

// first we import stuff
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
import { io } from "socket.io-client";
import { Autocomplete } from "@react-google-maps/api";
// socket thing
const socket = io("https://walamin-server.onrender.com");

// map element component
export default function MapElement() {
  const [rideDetails, setRideDetails] = useState({
    username: "",
    token: "",
    origin: "",
    destination: "",
    cost: "",
  });
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

  // so this was a trial, setting random coordinates to check is the rider icons show on the map
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
  // back to home page
  const back = () => {
    navigate("/");
  };
  // starting, idk what it's starting
  // it's probably after the user has selected the destination and now we are getting the directions to that destination
  const start = () => {
    setNumber(2.5);
    if (!destination) return;
    getDirections();
    setSendRide(true);
  };
  // we probably never used this because its gray, if you are an intern, i've probably asked you to delete useless stuff from the code, this is it
  const snapPoints = ({ maxHeight, minHeight }) => {
    return isExpanded ? [maxHeight / 1] : [minHeight];
  };
  // here we fetch all locations, of the riders, technically, we are fetching all the locations of all users and filtering out the registered riders, fron a riders array
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://walamin-server.onrender.com/all-locations"
        );
        console.log(response.data);
        // here we check if the locations are there, and if the username exists in rhe allowed names array
        if (Array.isArray(response.data)) {
          // for every new rider we register, their username must be added here......
          const allowedNames = ["Marsh", "Marsh mansur"];
          const newData = response.data.map((item) => {
            console.log("Item:", item);
            if (item.location && allowedNames.includes(item.username)) {
              return {
                lat: item.location.latitude,
                lng: item.location.longitude,
                name: item.username,
              };
            } else {
              return null;
            }
          });

          // Filter out null values
          const filteredData = newData.filter((item) => item !== null);

          // Check if filteredData is different from simplifiedData
          if (JSON.stringify(filteredData) !== JSON.stringify(simplifiedData)) {
            if (filteredData.length > 0) {
              setSimplifiedData(filteredData);
            }
            console.log("Simplified Data", simplifiedData);
          }
        }

        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call fetchData immediately

    const intervalId = setInterval(fetchData, 90000); // Fetch every 90 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // i dont know what this does, please find out....
  // oh wait, it just logs simplified data... lol
  useEffect(() => {
    console.log("Simplified Data:", simplifiedData);
  }, [simplifiedData]);

  // here we log stuff, just to make sure they exist..
  useEffect(() => {
    setUsername(user.Username);
    setToken(user.Token);
    console.log("Username:", username);
    console.log("Token:", token);
    console.log("cost:", cost);
  });

  // this one is for booking a ride
  const bookRide = async () => {
    setResult(2);
    console.log("Origin:", origin);
    console.log("Destination:", destination);
    setRideDetails({
      ...rideDetails,
      username: username,
      token: token,
      origin: origin,
      destination: destination,
      cost: cost,
    });
    // we make a post request with orgin, destination, username and token to store a ride in the database
    try {
      socket.emit("orderRide", rideDetails);
      setRideDetails({
        username: "",
        token: "",
        origin: "",
        destination: "",
        cost: "",
      });
      const response = await axios.post(
        "https://walamin-server.onrender.com/rides/express",
        {
          username,
          token,
          origin: origin,
          destination: destination,
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
  // this is the map element......
  // oh god, im not even halfway commenting
  // see you tomorow
  // commenting code is actually soo boring, here is a tip, comment while you write the code, not after
  useEffect(() => {
    const script = document.createElement("script"); // here we append the gomaps/googlemaps script to the head
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyLrk1KXy32iTkKpsbR1J1USZWKd4lE5oud&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      // we initialize the map
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude; // get the user current location
        const mapElement = document.getElementById("map");
        const mapInstance = new google.maps.Map(mapElement, {
          // create the mapinstance
          center: { lat: latitude, lng: longitude }, // center is user current location
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        });
        setMap(mapInstance);

        new google.maps.Marker({
          // here we also add a marker to the current user position
          map: mapInstance,
          position: { lat: latitude, lng: longitude },
          title: "hello World!",
        });

        simplifiedData.forEach((location) => {
          // we map throught all the riders, filtered, and show a marker for all
          new google.maps.Marker({
            map: mapInstance,
            position: { lat: location.lat, lng: location.lng },
            title: location.name,
            icon: {
              url: ridericon,
              scaledSize: new google.maps.Size(50, 50), // Size of the icon
            },
          });
        });

        const input = document.getElementById("input"); // this is the autocomplete instance
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
      });
    };
  }, [data]);

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
                <Autocomplete>
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
                </Autocomplete>
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
            width: "100%",
            boxSizing: "border-box",
            padding: "20px 20px 40px 20px",
          }}
        >
          <div>
            {loadingSuggestions && (
              <div style={{ padding: "20px" }}>
                <FallingLines height="10rem" />
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
