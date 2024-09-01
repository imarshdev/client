import React, { useEffect, useState } from "react";
import "../css/map.css";
import { CiRoute } from "react-icons/ci";
import { TiArrowRightOutline, TiTickOutline } from "react-icons/ti";
import { TouchableOpacity } from "react-native-web";
import { BottomSheet } from "react-spring-bottom-sheet";
import { StatusBar } from "react-native-web";
import { Helmet } from "react-helmet-async";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const [mapHeight, setMapHeight] = useState("85vh");
  const [map, setMap] = useState(null);
  const [open, setOpen] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate()

  const back = () => {
    navigate("/home")
  };
  const openAndCalculate = () => {
    setOpen(true);
    setMapHeight("55vh");
    calculateDirections();
  };
  const close = () => {
    setMapHeight("85vh");
    setOpen(false);
  };

  useEffect(() => {
    // Load the Google Maps JavaScript API with the Places library
    const script = document.createElement("script");
    script.src =
      "https://maps.gomaps.pro/maps/api/js?key=AlzaSyLrk1KXy32iTkKpsbR1J1USZWKd4lE5oud&libraries=geometry,places&callback=initMap";
    document.head.appendChild(script);

    // Initialize the map and autocomplete

    window.initMap = () => {
      const mapElement = document.getElementById("map");
      const mapOptions = {
        center: { lat: 0.3163, lng: 32.5811 },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      };
      const mapInstance = new google.maps.Map(mapElement, mapOptions);
      setMap(mapInstance);

      const kampalaBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(0.2927, 32.5517),
        new google.maps.LatLng(0.3473, 32.6317)
      );

      const input1 = document.getElementById("pac-input-1");
      const autocompleteInstance1 = new google.maps.places.Autocomplete(
        input1,
        {
          bounds: kampalaBounds,
          componentRestrictions: { country: "UG" },
        }
      );
      autocompleteInstance1.bindTo("bounds", mapInstance);
      setAutocomplete(autocompleteInstance1);

      const input2 = document.getElementById("pac-input-2");
      const autocompleteInstance2 = new google.maps.places.Autocomplete(
        input2,
        {
          bounds: kampalaBounds,
          componentRestrictions: { country: "UG" },
        }
      );
      autocompleteInstance2.bindTo("bounds", mapInstance);
      setAutocomplete(autocompleteInstance2);

      // Set up the event listener for when the user selects a place
      autocompleteInstance1.addListener("place_changed", () => {
        const place = autocompleteInstance1.getPlace();
        if (!place.geometry) {
          console.log(
            "No details available for the input: '" + place.name + "'"
          );
          return;
        }
        setOrigin(place.formatted_address);
      });

      autocompleteInstance2.addListener("place_changed", () => {
        const place = autocompleteInstance2.getPlace();
        if (!place.geometry) {
          console.log(
            "No details available for the input: '" + place.name + "'"
          );
          return;
        }
        setDestination(place.formatted_address);
        calculateDirections();
      });
    };
  }, []);

  const calculateDirections = () => {
    if (origin && destination) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRequest = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      directionsService.route(directionsRequest, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          if (directionsRenderer) {
            directionsRenderer.setDirections(response);
          } else {
            const directionsRendererInstance =
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response,
              });
            setDirectionsRenderer(directionsRendererInstance);
            setDistance(response.routes[0].legs[0].distance.text);
            setDuration(response.routes[0].legs[0].duration.text);
          }
        } else {
          console.log("Directions request failed: " + status);
        }
      });
    }
  };

  return (
    <>
      <div className="home" style={{ justifyContent: "start" }}>
        <div className="search">
          <div className="search-1">
            <CiRoute color="limegreen" />
            <CiRoute color="pink" />
          </div>
          <div className="search-2">
            <label className="search-2-label">
              <span>from: </span>
              <input
                type="text"
                placeholder="enter pick-up location"
                id="pac-input-1"
              />
            </label>
            <label className="search-2-label">
              <span>to: </span>
              <input
                type="text"
                placeholder="enter-destination"
                id="pac-input-2"
              />
            </label>
          </div>
          <div className="search-3">
            <TouchableOpacity id="go" onPress={openAndCalculate}>
              <span style={{ color: "orange" }}>
                <TiTickOutline />
              </span>
            </TouchableOpacity>
          </div>
        </div>
        <TouchableOpacity
          id="back"
          onPress={back}
        >
          <IoIosArrowBack size={24} />
        </TouchableOpacity>
        <BottomSheet blocking={false} open={open} id="bottom-sheet">
          <div id="bottom-sheet">
            <div>
              <p>Distance: {distance}</p>
              <p>Duration: {duration}</p>
            </div>
            <div>
              <p>Cost: </p>
            </div>
            <div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <TouchableOpacity
                  id="option"
                  style={{ width: "35%", backgroundColor: "orange" }}
                  onPress={close}
                >
                  <span> Cancel</span>
                </TouchableOpacity>
                <TouchableOpacity
                  id="option"
                  style={{ width: "60%", backgroundColor: "limegreen" }}
                >
                  <span>Order</span>
                </TouchableOpacity>
              </div>
            </div>
          </div>
        </BottomSheet>
        <div
          id="map"
          style={{ height: mapHeight, width: "100%", marginTop: "15vh" }}
        ></div>
      </div>
    </>
  );
};

export default Map;

export const MapTrial = () => {
  const [map, setMap] = useState(null);
  const [page, setPage] = useState("agreement");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [autocomplete, setAutocomplete] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

    const navigate = useNavigate();

    const back = () => {
      navigate("/home");
    };

  const openAndCalculate = () => {
    setOpen(true);
    calculateDirections();
  };
  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Load the Google Maps JavaScript API with the Places library
    const script = document.createElement("script");
    script.src =
      "https://maps.gomaps.pro/maps/api/js?key=AlzaSyLrk1KXy32iTkKpsbR1J1USZWKd4lE5oud&libraries=geometry,places&callback=initMap";
    document.head.appendChild(script);

    // Initialize the map and autocomplete

    window.initMap = () => {
      const mapElement = document.getElementById("map");
      const mapOptions = {
        center: { lat: 0.3163, lng: 32.5811 },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      };
      const mapInstance = new google.maps.Map(mapElement, mapOptions);
      setMap(mapInstance);

      const input1 = document.getElementById("pac-input-1");
      const autocompleteInstance1 = new google.maps.places.Autocomplete(input1);
      autocompleteInstance1.bindTo("bounds", mapInstance);
      setAutocomplete(autocompleteInstance1);

      const input2 = document.getElementById("pac-input-2");
      const autocompleteInstance2 = new google.maps.places.Autocomplete(input2);
      autocompleteInstance2.bindTo("bounds", mapInstance);
      setAutocomplete(autocompleteInstance2);

      // Set up the event listener for when the user selects a place
      autocompleteInstance1.addListener("place_changed", () => {
        const place = autocompleteInstance1.getPlace();
        if (!place.geometry) {
          console.log(
            "No details available for the input: '" + place.name + "'"
          );
          return;
        }
        setOrigin(place.formatted_address);
      });

      autocompleteInstance2.addListener("place_changed", () => {
        const place = autocompleteInstance2.getPlace();
        if (!place.geometry) {
          console.log(
            "No details available for the input: '" + place.name + "'"
          );
          return;
        }
        setDestination(place.formatted_address);
        calculateDirections();
      });
    };
  }, []);

  const calculateDirections = () => {
    if (origin && destination) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRequest = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      directionsService.route(directionsRequest, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          if (directionsRenderer) {
            directionsRenderer.setDirections(response);
          } else {
            const directionsRendererInstance =
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response,
              });
            setDirectionsRenderer(directionsRendererInstance);
            setDistance(response.routes[0].legs[0].distance.text);
            setDuration(response.routes[0].legs[0].duration.text);
          }
        } else {
          console.log("Directions request failed: " + status);
        }
      });
    }
  };

  return (
    <>
      {page === "agreement" && (
        <>
          <p>Agreement</p>
          <TouchableOpacity id="back" onPress={back}>
            <IoIosArrowBack size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPage("loaction")}
            id="option"
            style={{ width: "100px" }}
          >
            <span>Next</span>
          </TouchableOpacity>
        </>
      )}
      {page === "location" && (
        <div className="home">
          <div className="search">
            <div className="search-1">
              {step === 1 && <CiRoute color="limegreen" />}
              {step === 2 && <CiRoute color="pink" />}
            </div>
            <div className="search-2">
              {step === 1 && (
                <label className="search-2-label">
                  <span>from: </span>
                  <input
                    type="text"
                    placeholder="enter pick-up location"
                    id="pac-input-1"
                  />
                </label>
              )}
              {step === 2 && (
                <label className="search-2-label">
                  <span>to: </span>
                  <input
                    type="text"
                    placeholder="enter-destination"
                    id="pac-input-2"
                  />
                </label>
              )}
            </div>
            <div className="search-3">
              {step === 1 && (
                <TouchableOpacity id="go" onPress={() => setStep(2)}>
                  <span style={{ color: "limegreen" }}>
                    <TiArrowRightOutline />
                  </span>
                </TouchableOpacity>
              )}
              {step === 2 && (
                <TouchableOpacity id="go" onPress={openAndCalculate}>
                  <span style={{ color: "orange" }}>
                    <TiTickOutline />
                  </span>
                </TouchableOpacity>
              )}
            </div>
          </div>
          <TouchableOpacity id="back" onPress={() => setPage("agreement")}>
            <IoIosArrowBack size={24} />
          </TouchableOpacity>
          <BottomSheet blocking={false} open={open} id="bottom-sheet">
            <div id="bottom-sheet">
              <div>
                <p>Distance: {distance}</p>
                <p>Duration: {duration}</p>
              </div>
              <div>
                <p>Cost: </p>
              </div>
              <div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    id="option"
                    style={{ width: "30%", border: " solid 1px orange" }}
                    onPress={close}
                  >
                    <span> Cancel</span>
                  </TouchableOpacity>
                  <TouchableOpacity
                    id="option"
                    style={{ width: "65%" }}
                    onPress={() => setPage("information")}
                  >
                    <span>Continue Scheduling</span>
                  </TouchableOpacity>
                </div>
              </div>
            </div>
          </BottomSheet>
          <div id="map" style={{ height: "100vh", width: "100%" }}></div>
        </div>
      )}
      {page === "information" && (
        <>
          <TouchableOpacity id="back" onPress={() => setPage("location")}>
            <IoIosArrowBack size={24} />
          </TouchableOpacity>
          <p>More Information</p>
        </>
      )}
    </>
  );
};
