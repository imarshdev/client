/* 
  this is the captains dashboard, i packed alot of messy unreadable code here, 
  frankly because if i'm the only one that understands it, you can't fire me👀
*/
// but first, as usual, some to-dos to ease the process
/*
  ~ map directions for capt using map box
  ~ completed ride interface for captain, and user
  ~ animations and sounds to keep the app lively
  ~ real time location updates during rides !!!!
  ~ when rider clicks start ride, bottom sheet apears for user, showing current ride status
  ~ add the ability to add stops 
*/
// now we import stuff
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

// this is the mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiaW1hcnNoIiwiYSI6ImNtMDZiZDB2azB4eDUyanM0YnVhN3FtZzYifQ.gU1K02oIfZLWJRGwnjGgCg";

// captain component
export default function CapDash() {
  const [declinedRides, setDeclinedRides] = useState({}); // this is for making sure declined rides dont get re-rendered
  const [page, setPage] = useState("scheduled");
  const [data, setData] = useState(""); // this is the data got from the backend, "rides"
  const [dataExpress, setDataExpress] = useState("");

  // when a rider accepts a ride
  const handleAcceptRide = (username, rideIndex) => {
    // passing username and rideIndex so we can access then in the current ride component
    const rideData = dataExpress[username].expressRides[rideIndex]; // storing ridedata in a constant to be used as it is passed
    const rideId = `${rideData.origin}${rideData.timestamp}`; // Define rideId here
    navigate("/mapride", {
      //navigate to mapride component together with the respective usersname, contact and ridedata
      state: {
        username,
        contact: dataExpress[username].contact,
        rideData,
      },
    });
    axios
      .patch("https://walamin-server.onrender.com/accept-ride", {
        // this is for patching the accepted ride, so that no other users can get an already accepted ride
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
  // here we handle what happens when a rider declines a ride
  const handleDeclineRide = (username, rideIndex) => {
    // we pass username and rideIndex ofcourse
    const declinedRide = dataExpress[username].expressRides[rideIndex]; // store declined ride in a variable
    const rideId = `${declinedRide.origin}${declinedRide.timestamp}`; // define the ride id
    setDeclinedRides((prevDeclinedRides) => {
      // now here, we set the declined rides array, we store every ride a rider declines
      const updatedDeclinedRides = { ...prevDeclinedRides };
      updatedDeclinedRides[username] = [
        ...(updatedDeclinedRides[username] || []),
        rideId,
      ];
      // store this array in the local storage
      localStorage.setItem(
        "declinedRides",
        JSON.stringify(updatedDeclinedRides)
      );
      return updatedDeclinedRides;
    });
  };
  // every time, we have to check, if the declined rides exist, we replace with an updated one, then if they don't, then we set
  useEffect(() => {
    const storedDeclinedRides = localStorage.getItem("declinedRides");
    if (storedDeclinedRides) {
      setDeclinedRides(JSON.parse(storedDeclinedRides));
    }
  }, []);

  // here we fetch all rides, scheduled rides
  useEffect(() => {
    const intervalId = setInterval(() => {
      // using an interval to make sure we fetch new rides too
      axios
        .get("https://walamin-server.onrender.com/all-rides")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 20000); // 20000 milliseconds = 20 seconds interval

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // then here we fetch all express rides
  useEffect(() => {
    const intervalId = setInterval(() => {
      // also in intervals to cater for new data
      axios
        .get("https://walamin-server.onrender.com/all-express-rides")
        .then((response) => {
          setDataExpress(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000); // 5000 milliseconds = 5 seconds interval

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // this is to log the data, to make sure it exists before being used.... you dont want to render null data
  useEffect(() => {
    console.log(data);
    console.log(dataExpress);
  }, [data, dataExpress]);

  // we trancate text because the containers for displaying scheduled ride can be small sometimes so locations are trancated
  function truncateText(text, maxLength) {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  }

  // navigate back to home function....
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };

  // and the component
  return (
    // component container div
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
      {/* going back to home page */}
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
        {/* this is for scheduled rides area, to display scheduled rides, so riders can attend to clients */}
        {page === "scheduled" && (
          <ScrollView
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "20px 0px",
            }}
          >
            {/* mapping the rides */}
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
        {/* this is for express rides, those that are to happen immediately */}
        {page === "express" && (
          <ScrollView
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              padding: "20px 0px",
            }}
          >
            {/* same, we map them, might be complicated mapping, ask me (MARSH...) */}
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
                          {/* button for accepting */}
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
                          {/* button for declining..... */}
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
        {/* this is for delivery services, riders to pick up stuff and drop them off at locations */}
        {page === "delivery" && (
          <>
            <p>Deliver</p>
          </>
        )}
      </div>
      {/* this is like the bottom navigation thing, to mmove between screens, scheduled, express and delivery */}
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

//  welcome to the map ride function, here we show the map to the current rider to a respective ride.....
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
  // dismiss the bottom sheet
  const dismis = () => {
    setOpen(false);
  };
  // go back to captains das
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

    // google maps thing.
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
        center: { lat: centerLat, lng: centerLng }, // we do this so that the center of the map is dependant on the route of the current ride
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      });
      // geocoder to get location lat and lng
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: rideData.origin }, (results, status) => {
        if (status === "OK") {
          setOriginLat(results[0].geometry.location.lat());
          setOriginLng(results[0].geometry.location.lng());
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
        }
      });
      // geocoder to get location lat and lng
      geocoder.geocode({ address: rideData.destination }, (results, status) => {
        if (status === "OK") {
          setDestinationLat(results[0].geometry.location.lat());
          setDestinationLng(results[0].geometry.location.lng());
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng());
        }
      });

      // getting directions
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
  // component
  return (
    <div style={{ width: "100vw" }}>
      {/* back arrow thing, to dashboard */}
      <TouchableOpacity id="back" onPress={back}>
        <IoIosArrowBack size={24} />
      </TouchableOpacity>
      {/* map element */}
      <div id="mapElement" style={{ height: "55vh", width: "100%" }} />
      {/* bottom div with ride information */}
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
          {/* button to call user, uses the contact to make a call to respective user */}
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
          {/* start ride button, starts the ride.. */}
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
      {/* this is the bottom sheet that'll show the directions and routing guidance to the rider */}
      <BottomSheet
        open={open}
        snapPoints={({ maxHeight }) => [maxHeight]}
        onDismiss={dismis}
        header={<p>On Trip</p>}
      >
        {/* div */}
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
          {/* ongoing component */}
          <Ongoing destinationLat={destinationLat} destinationLng={destinationLng} setOpen={setOpen} open={open} />
        </div>
      </BottomSheet>
    </div>
  );
}

// component to store the mapbox directions map instance
const Ongoing = ({ setOpen, open, destinationLat, destinationLng }) => {
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);
  const [directions, setDirections] = useState();
  const [riderLocationLat, setRiderLocationLat] = useState();
  const [riderLocationLng, setRiderLocationLng] = useState();
  const [destinationLat, setDestinationLat] = useState({});
  const [destinationLng, setDestinationLng] = useState({});
  useEffect(() => {
    // im not sure i remember what this does but its something to do with checking is the map has been loaded in the parent container, before carrying anything ouot
    if (!mapContainerRef.current) return;

    // make the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11?logo=false",
      zoom: 15,
    });

    setMap(map);

    const directions = new window.MapboxDirections({
      accessToken: window.mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/walking",
      alternatives: false,
      geometries: "geojson",
      controls: { instructions: true, inputs: false },
      flyTo: true,
    });

    map.addControl(directions);
    setDirections(directions);

    // Add marker for current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        setRiderLocationLat(latitude);
        setRiderLocationLng(longitude);
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
  const go = () => {
    if (directions) {
      directions.setOrigin([riderLocationLng, riderLocationLat]);
      directions.setDestination([destinationLng, destinationLat]); 
    }
  };
  // div.... duh
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
        {/* first button to add a stop, mot yet functional */}
        <TouchableOpacity
          onPress={go}
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
          <span>Go !</span>
        </TouchableOpacity>
        {/* button to end ride, this can be at the end of the ride, or just ended midRide */}
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
