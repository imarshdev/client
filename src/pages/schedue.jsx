import React, { useEffect, useRef, useState } from "react";
import "../css/map.css";
import { BottomSheet } from "react-spring-bottom-sheet";
import { TouchableOpacity } from "react-native-web";

export default function ScheduleRide() {
  const [number, setNumber] = useState(4);
  const [open, setOpen] = useState(true);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyLrk1KXy32iTkKpsbR1J1USZWKd4lE5oud&libraries=geometry,places&callback=initMap`;
    document.head.appendChild(script);

    window.initMap = () => {
      const mapElement = document.getElementById("map");
      const mapInstance = new google.maps.Map(mapElement, {
        center: { lat: 0.3163, lng: 32.5811 },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      });
      setMap(mapInstance);

      const input = document.getElementById("pac-input-2");
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
          setNumber(4)
        setDestination(place.formatted_address);
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
      });

      const getDirections = () => {
        // Get the user's current location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            const directionsService = new google.maps.DirectionsService();
            const directionsRequest = {
              origin: new google.maps.LatLng(
                userLocation.lat,
                userLocation.lng
              ),
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING,
            };
            directionsService.route(directionsRequest, (result, status) => {
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
          },
          (error) => {
            console.error(error);
          },
          { enableHighAccuracy: true }
        );
      };
    };
  }, []);
  return (
    <>
      <div>
        <div id="map" style={{ height: "100vh", width: "100vw" }} />
        <BottomSheet
          open={open}
          blocking={false}
          snapPoints={({ maxHeight }) => [maxHeight / number]}
        >
          <div
            style={{ width: "100vw", boxSizing: "border-box", padding: "20px" }}
          >
            <p>Where To?</p>
            <div style={{ borderBottom: "solid 0.5px black" }}>
                          <input
                              onFocus={()=>setNumber(1)}
                style={{ width: "100%" }}
                id="pac-input-2"
                type="text"
                placeholder="Search for a place"
              />
            </div>
            <br />
            <TouchableOpacity id="confirm-pickup">
              <p> Confirm Location</p>
            </TouchableOpacity>
          </div>
        </BottomSheet>
      </div>
    </>
  );
}
