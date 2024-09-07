import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-web";
import ride from "../assets/ride.svg";
import delivery from "../assets/delivery.svg";
import schedule from "../assets/schedule.svg";
import axios from "axios";
import { CiCreditCard1, CiLocationOn, CiTimer } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function CapDash() {
  const [page, setPage] = useState("scheduled");
  const [data, setData] = useState("");
  const [dataExpress, setDataExpress] = useState("");

  const handleDeclineRide = (index) => {
    axios.post("/decline-ride", {
      username,
      rideIndex: index,
    });
  };

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
    navigate("/home");
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
                    .filter(
                      (ride, rideIndex) =>
                        !user.declinedRides.includes(rideIndex)
                    )
                    .map((ride, rideIndex) => (
                      <div
                        key={rideIndex}
                        ride={ride}
                        className="scheduled_ride"
                        style={{
                          boxSizing: "border-box",
                          padding: "0px",
                          justifyContent: "space-between",
                          height: "12rem",
                        }}
                      >
                        <span style={{ fontSize: 18 }}>
                          {ride.rideCategory}
                        </span>
                        <span style={{ padding: "0px 10px" }}>
                          <CiLocationOn style={{ marginRight: "10px" }} />
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
        {page === "delivery" && <p>Deliver</p>}
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
