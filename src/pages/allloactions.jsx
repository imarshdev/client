import { useEffect, useState, useRef } from "react";
import { TouchableOpacity } from "react-native-web";
import { Link } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import ride from "../assets/ride.svg";
import delivery from "../assets/delivery.svg";
import schedule from "../assets/schedule.svg";
import dine from "../assets/dine.svg";
import send from "../assets/send.svg";
import withdraw from "../assets/withdraw.svg";
import shopping from "../assets/shopping.svg";
import { RiAuctionLine } from "react-icons/ri";
import { FaServicestack } from "react-icons/fa";

const AllLocations = () => {

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        padding: "10px",
        alignItems: "center",
      }}
    >
      <div className="mid_details_upper">
        <TouchableOpacity id="service_item">
          <Link to="/map2" id="link_item">
            <img src={delivery} style={{ width: "36px" }} />
            <p style={{ fontSize: 12 }}>Delivery</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link to="/currentRide" id="link_item">
            <img src={ride} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Order Ride</p>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link to="/agree" id="link_item">
            <img src={schedule} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Schedule ride</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={dine} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Dine</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={shopping} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Shopping</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <RiAuctionLine size={34} color="limegreen" />
            <p style={{ fontSize: 12 }}>Auction House</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={send} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Send Money</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={withdraw} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Withdraw</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={send} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Send Money</p>{" "}
          </Link>
        </TouchableOpacity>

        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={send} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Send Money</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={send} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Send Money</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={send} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Send Money</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={send} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Send Money</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={send} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Send Money</p>{" "}
          </Link>
        </TouchableOpacity>
        <TouchableOpacity id="service_item">
          <Link id="link_item">
            <img src={send} style={{ width: "34px" }} />
            <p style={{ fontSize: 12 }}>Send Money</p>{" "}
          </Link>
        </TouchableOpacity>
      </div>
    </div>
  );
};

export default AllLocations;
