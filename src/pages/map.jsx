import React, { useEffect, useState } from "react";
import "../css/map.css";
import { CiRoute } from "react-icons/ci";
import { LuArrowDownUp } from "react-icons/lu";
import { TouchableOpacity } from "react-native-web";

const Map = () => {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

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
          }
        } else {
          console.log("Directions request failed: " + status);
        }
      });
    }
  };

  return (
    <>
      <div className="home">
        <div className="search">
          <div className="search-1">
            <CiRoute color="limegreen" />
            <CiRoute color="pink" />
          </div>
          <div className="search-2">
            <label className="search-2-label">
              <span>from: </span>
              <input type="text" placeholder="enter pick-up" id="pac-input-1" />
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
            <TouchableOpacity id="go" onPress={calculateDirections}>
              <span style={{color: 'limegreen'}}>Go</span>
            </TouchableOpacity>
          </div>
        </div>
        <div id="map" style={{ height: "100vh", width: "100%" }}></div>
      </div>
    </>
  );
};

export default Map;


export const MapTrial = () => {
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.gomaps.pro/maps/api/js?key=AlzaSyLrk1KXy32iTkKpsbR1J1USZWKd4lE5oud&libraries=geometry,places&callback=initMap";
    document.head.appendChild(script);

    window.initMap = () => {
      const mapElement = document.getElementById("map");
      const mapOptions = {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 13,
      };
      const mapInstance = new google.maps.Map(mapElement, mapOptions);
      setMap(mapInstance);
    };
  }, []);

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };


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
          }
          setDistance(response.routes[0].legs[0].distance.text);
          setDuration(response.routes[0].legs[0].duration.text);
        } else {
          console.log("Directions request failed: " + status);
        }
      });
    }
  };

  return (
    <div className="home">
      <input
        type="text"
        value={origin}
        onChange={handleOriginChange}
        placeholder="Enter starting point"
      />
      <input
        type="text"
        value={destination}
        onChange={handleDestinationChange}
        placeholder="Enter destination"
      />
      <button onClick={calculateDirections}>Get Directions</button>
      <div>
        <p>Distance: {distance}</p>
        <p>Duration: {duration}</p>
      </div>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
    </div>
  );
};