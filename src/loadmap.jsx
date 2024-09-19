import { useEffect } from "react";
// load map, this is just to avoid loading the map multiple times because we will be using the map component severely


const LoadGoogleMaps = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyLrk1KXy32iTkKpsbR1J1USZWKd4lE5oud&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []); // pretty self explaining, 

  return null;
};

export default LoadGoogleMaps;