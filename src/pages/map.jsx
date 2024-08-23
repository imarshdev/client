import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";

export default function GeoSearchExample() {
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLon(position.coords.longitude);
        setLat(position.coords.latitude);
      },
      (error) => console.error(error),
      {
        enableHighAccuracy: true, // Enable high accuracy
        timeout: 10000, // Set a timeout of 10 seconds
        maximumAge: 0, // Don't use cached locations
      }
    );
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [lon, lat],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
    map.addControl(new mapboxgl.NavigationControl()); // Add zoom controls
    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
      }),
      "top-left"
    );

    map.on("load", () => {
      map.addLayer({
        id: "places",
        type: "circle",
        source: {
          type: "vector",
          url: "mapbox://mapbox.04m9x1xg",
        },
        "source-layer": "poi_label",
        paint: {
          "circle-color": "#007bff",
          "circle-radius": 4,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
        },
        filter: ["==", "$type", "Point"],
      });

          map.addLayer({
            id: "place-labels",
            type: "symbol",
            source: {
              type: "vector",
              url: "mapbox://mapbox.04m9x1xg",
            },
            "source-layer": "poi_label",
            layout: {
              "text-field": ["get", "name"],
              "text-variable-anchor": ["top", "bottom", "left", "right"],
              "text-radial-offset": 0.5,
              "text-justify": "auto",
            },
            paint: {
              "text-color": "#333333",
              "text-halo-color": "#ffffff",
              "text-halo-width": 1,
            },
            filter: ["==", "$type", "Point"],
          });
    });


    
    return () => {
      map.remove();
    };
  }, [lon, lat]);

  return (
    <div className="home">
      <div id="map" style={{ width: "100%", height: " 100vh" }}></div>
    </div>
  );
}
