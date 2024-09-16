import { useEffect, useState, useRef } from "react";
import { TouchableOpacity } from "react-native-web";
import { BottomSheet } from "react-spring-bottom-sheet";

const AllLocations = () => {
  const [open, setOpen] = useState(false);
  const dismis = () => {
    setOpen(false);
  };
  return (
    <div style={{ width: "100vw" }}>
      <div id="mapelement" style={{ height: "55vh", width: "100%" }} />
      <div
        style={{
          width: "100%",
          height: "45vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "20px",
          boxShadow: "0 1px 20px rgba(160, 163, 189, 0.801)",
          borderRadius: "10px 10px 0 0 ",
        }}
      >
        <h2>Username: Marsh Mansur</h2>
        <>
          <p style={{ fontSize: "14px" }}>Origin: </p>
          <span>9J28+Q3G, Ntinda - Kisaasi Rd, Kampala, Uganda</span>
        </>
        <>
          <p style={{ fontSize: "14px" }}>Destination: </p>
          <span>Kyaliwajjala Trading Center</span>
        </>
        <>
          <p style={{ fontSize: "14px" }}>Cost: </p>
          <span>Shs. 4500</span>
        </>
        <br />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              width: "45%",
              height: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "limegreen",
              borderRadius: "5px",
            }}
          >
            <span style={{ color: "#fff" }}>call user</span>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "45%",
              height: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "5px",
              border: "solid 0.1px limegreen",
            }}
            onPress={() => setOpen(true)}
          >
            <span>Start Ride</span>
          </TouchableOpacity>
        </div>
      </div>
      <BottomSheet
        open={open}
        snapPoints={({ maxHeight }) => [maxHeight]}
        onDismiss={dismis}
        header={<p>On Trip</p>}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p>Ongoing</p>
          <Ongoing setOpen={setOpen} open={open} />
        </div>
      </BottomSheet>
    </div>
  );
};

export default AllLocations;

const Ongoing = ({ setOpen, open }) => {
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11?logo=false",
      zoom: 15,
    });

    setMap(map);

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
      { enableHighAccuracy: true }
    );

    return () => {
      map.remove();
    };
  }, []);
  return (
    <>
      <div
        ref={mapContainerRef}
        id="map"
        style={{ width: "100%", height: "60vh" }}
      ></div>
      <br />
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            width: "45%",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "5px",
            border: "solid 0.1px limegreen",
          }}
        >
          <span>Add Stop</span>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "45%",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "limegreen",
            borderRadius: "5px",
          }}
          onPress={() => setOpen(false)}
        >
          <span style={{ color: "#fff" }}>End Ride</span>
        </TouchableOpacity>
      </div>
    </>
  );
};
