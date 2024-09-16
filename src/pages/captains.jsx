import React, { useEffect, useState, useRef } from "react";
import { ScrollView, TouchableOpacity } from "react-native-web";
import ride from "../assets/ride.svg";
import delivery from "../assets/delivery.svg";
import schedule from "../assets/schedule.svg";
import axios from "axios";
import { CiCreditCard1, CiLocationOn, CiTimer } from "react-icons/ci";
import { MdAccessTime, MdStart } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoIosArrowBack, IoMdPricetags } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";

export default function CapDash() {
  const [declinedRides, setDeclinedRides] = useState({});
  const [page, setPage] = useState("scheduled");
  const [data, setData] = useState("");
  const [dataExpress, setDataExpress] = useState("");

  const handleAcceptRide = (username, rideIndex) => {
    const rideData = dataExpress[username].expressRides[rideIndex];
    const rideId = `${rideData.origin}${rideData.timestamp}`; // Define rideId here
    navigate("/mapride", {
      state: {
        username,
        contact: dataExpress[username].contact,
        rideData,
      },
    });
    axios
      .patch("https://walamin-server.onrender.com/accept-ride", {
        username,
        rideId,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeclineRide = (username, rideIndex) => {
    const declinedRide = dataExpress[username].expressRides[rideIndex];
    const rideId = `${declinedRide.origin}${declinedRide.timestamp}`;
    setDeclinedRides((prevDeclinedRides) => {
      const updatedDeclinedRides = { ...prevDeclinedRides };
      updatedDeclinedRides[username] = [
        ...(updatedDeclinedRides[username] || []),
        rideId,
      ];
      localStorage.setItem(
        "declinedRides",
        JSON.stringify(updatedDeclinedRides)
      );
      return updatedDeclinedRides;
    });
  };
  useEffect(() => {
    const storedDeclinedRides = localStorage.getItem("declinedRides");
    if (storedDeclinedRides) {
      setDeclinedRides(JSON.parse(storedDeclinedRides));
    }
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("https://walamin-server.onrender.com/all-rides")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 20000); // 20000 milliseconds = 20 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("https://walamin-server.onrender.com/all-express-rides")
        .then((response) => {
          setDataExpress(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(dataExpress);
  }, [data, dataExpress]);

  function truncateText(text, maxLength) {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  }
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: "30px 10px",
      }}
    >
      <TouchableOpacity id="back" onPress={back}>
        <IoIosArrowBack size={24} />
      </TouchableOpacity>
      <div>
        <h2>Hello Captain !</h2>
      </div>
      <div
        style={{
          width: "100%",
          height: "80vh",
          boxSizing: "border-box",
          padding: "20px 0px",
        }}
      >
        {page === "scheduled" && (
          <ScrollView
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "20px 0px",
            }}
          >
            {data &&
              Object.keys(data).map((username, index) => (
                <div key={index}>
                  <p>Username: {username}</p>
                  {data[username].map((ride, rideIndex) => (
                    <div key={rideIndex} ride={ride} className="scheduled_ride">
                      <span style={{ fontSize: 18 }}>{ride.rideCategory}</span>
                      <span>
                        <CiLocationOn style={{ marginRight: "10px" }} />
                        {ride.pickupLocation} - {ride.dropoffLocation}
                      </span>
                      <span>
                        <MdAccessTime style={{ marginRight: "10px" }} />
                        {ride.rideDate} - {ride.rideTime}
                      </span>
                      <span>
                        <CiCreditCard1 style={{ marginRight: "10px" }} />
                        {ride.rideStatus}
                      </span>
                      <TouchableOpacity id="action">
                        <span>Accept</span>
                      </TouchableOpacity>
                    </div>
                  ))}
                </div>
              ))}
          </ScrollView>
        )}
        {page === "express" && (
          <ScrollView
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "20px 0px",
            }}
          >
            {dataExpress &&
              Object.keys(dataExpress).map((username, index) => (
                <div key={index}>
                  <p>Username: {username}</p>
                  {dataExpress[username].expressRides
                    .filter((ride) => {
                      const rideId = `${ride.origin}${ride.timestamp}`;
                      return !declinedRides[username]?.includes(rideId);
                    })
                    .map((ride, rideIndex) => (
                      <div
                        key={rideIndex}
                        ride={ride}
                        className="scheduled_ride"
                        style={{
                          boxSizing: "border-box",
                          padding: "0px",
                          justifyContent: "space-between",
                          height: "12.5rem",
                        }}
                      >
                        <span style={{ fontSize: 18 }}>
                          {ride.rideCategory}
                        </span>
                        <span style={{ padding: "0px 10px" }}>
                          <MdStart style={{ marginRight: "10px" }} />
                          {truncateText(ride.origin, 30)}
                        </span>
                        <span style={{ padding: "0px 10px" }}>
                          <CiLocationOn style={{ marginRight: "10px" }} />
                          {truncateText(ride.destination, 30)}
                        </span>
                        <span style={{ padding: "0px 10px" }}>
                          <CiTimer style={{ marginRight: "10px" }} />
                          {truncateText(ride.timestamp, 30)}
                        </span>
                        <span style={{ padding: "0px 10px" }}>
                          <IoCallOutline style={{ marginRight: "10px" }} />
                          {dataExpress[username].contact}
                        </span>
                        <span style={{ padding: "0px 10px" }}>
                          <IoMdPricetags style={{ marginRight: "10px" }} />
                          {`shs.${ride.cost}`}
                        </span>
                        <div
                          style={{
                            width: "100%",
                            height: "25%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              right: 0,
                              width: "40%",
                              height: "100%",
                              backgroundColor: "limegreen",
                              color: "#fff",
                              bottom: 0,
                              borderRadius: "10px 0px 0px 0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onPress={() =>
                              handleAcceptRide(username, rideIndex)
                            }
                          >
                            <span>Accept</span>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              left: 0,
                              width: "40%",
                              height: "100%",
                              backgroundColor: "red",
                              color: "#fff",
                              bottom: 0,
                              borderRadius: "10px 0px 0px 0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onPress={() =>
                              handleDeclineRide(username, rideIndex)
                            }
                          >
                            <span>Decline</span>
                          </TouchableOpacity>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </ScrollView>
        )}
        {page === "delivery" && (
          <>
            <p>Deliver</p>
            <button
              style={{ backgroundColor: "limegreen" }}
              onClick={currentRide}
            >
              <p>Go to current ride</p>
            </button>
          </>
        )}
      </div>
      <div
        style={{
          width: "90%",
          height: "7vh",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <TouchableOpacity onPress={() => setPage("scheduled")}>
          <span className="icon_button">
            <img src={schedule} style={{ width: "34px" }} />
            <span
              style={
                page === "scheduled"
                  ? { fontSize: 12, color: "limegreen" }
                  : { fontSize: 12, color: "black" }
              }
            >
              Scheduled Rides
            </span>
          </span>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage("delivery")}>
          <span className="icon_button">
            <img src={delivery} style={{ width: "34px" }} />
            <span
              style={
                page === "delivery"
                  ? { fontSize: 12, color: "limegreen" }
                  : { fontSize: 12, color: "black" }
              }
            >
              Delivery
            </span>
          </span>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage("express")}>
          <span className="icon_button">
            <img src={ride} style={{ width: "34px" }} />
            <span
              style={
                page === "express"
                  ? { fontSize: 12, color: "limegreen" }
                  : { fontSize: 12, color: "black" }
              }
            >
              Express Rides
            </span>
          </span>
        </TouchableOpacity>
      </div>
    </div>
  );
}

export function MapRide() {
  const location = useLocation();
  const { username, contact, rideData } = location.state;
  const [originLat, setOriginLat] = useState({});
  const [originLng, setOriginLng] = useState({});
  const [destinationLat, setDestinationLat] = useState({});
  const [destinationLng, setDestinationLng] = useState({});
  const [userLat, setUserLat] = useState({});
  const [userLng, setUserLng] = useState({});
  const [open, setOpen] = useState(false);
  const dismis = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const back = () => {
    navigate("/captain-dash");
  };
  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLat(position.coords.latitude);
      setUserLng(position.coords.longitude);
    });

    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyLrk1KXy32iTkKpsbR1J1USZWKd4lE5oud&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      // Calculate the center of the map
      const centerLat = (userLat + originLat + destinationLat) / 3;
      const centerLng = (userLng + originLng + destinationLng) / 3;
      const mapInstance = new google.maps.Map(mapElement, {
        center: { lat: centerLat, lng: centerLng },
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      });
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: rideData.origin }, (results, status) => {
        if (status === "OK") {
          setOriginLat(results[0].geometry.location.lat());
          setOriginLng(results[0].geometry.location.lng());
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
        }
      });
      geocoder.geocode({ address: rideData.destination }, (results, status) => {
        if (status === "OK") {
          setDestinationLat(results[0].geometry.location.lat());
          setDestinationLng(results[0].geometry.location.lng());
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
        }
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: mapInstance, // Set the map instance here
      });

      // Define request for directions
      const request = {
        origin: { lat: userLat, lng: userLng },
        destination: { lat: originLat, lng: originLng },
        travelMode: google.maps.TravelMode.DRIVING,
      };

      // Get directions from user to origin
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        }
      });

      // Define request for directions from origin to destination
      const request2 = {
        origin: { lat: originLat, lng: originLng },
        destination: { lat: destinationLat, lng: destinationLng },
        travelMode: google.maps.TravelMode.DRIVING,
      };

      // Get directions from origin to destination
      directionsService.route(request2, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const directionsRenderer2 = new google.maps.DirectionsRenderer({
            map: mapInstance,
            directions: result,
            polylineOptions: {
              strokeColor: "#32CD32", // Limegreen
            },
          });
        }
      });
    };
  });
  return (
    <div style={{ width: "100vw" }}>
      <TouchableOpacity id="back" onPress={back}>
        <IoIosArrowBack size={24} />
      </TouchableOpacity>
      <div id="mapElement" style={{ height: "55vh", width: "100%" }} />
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
        <h2>Username: {username}</h2>
        <>
          <p style={{ fontSize: "14px" }}>Origin: </p>
          <span>{rideData.origin}</span>
        </>
        <>
          <p style={{ fontSize: "14px" }}>Destination: </p>
          <span>{rideData.destination}</span>
        </>
        <>
          <p style={{ fontSize: "14px" }}>Cost: </p>
          <span>Shs. {rideData.cost}</span>
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
            onPress={() => window.open(`tel:${contact}`, "_self")}
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
}

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
