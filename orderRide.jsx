import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://walamin-server.onrender.com");

const RideApp = () => {
  const [rideDetails, setRideDetails] = useState({
    username: "",
    contact: "",
    userLocation: "",
    destinationName: "",
    cost: "",
  });
  const [rides, setRides] = useState([]);

  useEffect(() => {
    socket.on("newRide", (ride) => {
      setRides((prevRides) => [...prevRides, ride]);
    });
    return () => {
      socket.off("newRide");
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRideDetails({ ...rideDetails, [name]: value });
  };

  const handleOrderRide = () => {
    socket.emit("orderRide", rideDetails);
    setRideDetails({ username: "", contact: "", destination: "" });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: "30px 10px",
      }}
    >
      <h1>Ride App</h1>
      <input
        type="text"
        name="username"
        value={rideDetails.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <input
        type="text"
        name="contact"
        value={rideDetails.contact}
        onChange={handleInputChange}
        placeholder="Contact"
      />
      <input
        type="text"
        name="destination"
        value={rideDetails.destination}
        onChange={handleInputChange}
        placeholder="Destination"
      />
      <button onClick={handleOrderRide}>
        <p>Order Ride</p>
      </button>
      <ul>
        {rides.map((ride, index) => {
          return (
            <li key={index}>
              {ride.username} - {ride.contact} - {ride.userLocation} - {ride.destinationName} - {ride.cost}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RideApp;

export function ReceiveRide() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    socket.on("newRide", (ride) => {
      setRides((prevRides) => [...prevRides, ride]);
    });
    return () => {
      socket.off("newRide");
    };
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: "30px 10px",
      }}
    >
      <h2>Rides</h2>
      <ul>
        {rides.map((ride, index) => {
          return (
            <li key={index}>
              {ride.username} - {ride.token} - {ride.destination} -{ride.origin}
              - {ride.cost}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
