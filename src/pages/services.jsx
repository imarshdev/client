import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native-web";
import "../css/home.css";
import { FaHome, FaMotorcycle, FaServicestack } from "react-icons/fa";
import { PiHandWithdraw } from "react-icons/pi";
import {
  MdAccountBalanceWallet,
  MdCarRental,
  MdDining,
  MdDirectionsBike,
  MdOutlineDeliveryDining,
} from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { GrFormSchedule } from "react-icons/gr";

export default function Services() {
  return (
    <main className="home">
      <div className="top" style={{ height: "10%" }}>
        <div className="topper">
          <p>All Services</p>
        </div>
      </div>
      <div className="mid_details" style={{ height: "80vh" }}>
        <div className="services_container">
          <TouchableOpacity id="service_item">
            <FaMotorcycle size={34} />
            <p style={{ fontSize: 12 }}>Order Ride</p>
          </TouchableOpacity>
          <TouchableOpacity id="service_item">
            <MdDirectionsBike size={34} />
            <p style={{ fontSize: 12 }}>Bike</p>
          </TouchableOpacity>
          <TouchableOpacity id="service_item">
            <MdOutlineDeliveryDining size={34} />
            <p style={{ fontSize: 12 }}>Delivery</p>
          </TouchableOpacity>
          <TouchableOpacity id="service_item">
            <GrFormSchedule size={34} />
            <p style={{ fontSize: 12 }}>Schedule ride</p>
          </TouchableOpacity>
          <TouchableOpacity id="service_item">
            <MdDining size={34} />
            <p style={{ fontSize: 12 }}>Dine</p>
          </TouchableOpacity>
          <TouchableOpacity id="service_item">
            <IoIosSend size={34} />
            <p style={{ fontSize: 12 }}>Send Money</p>
          </TouchableOpacity>
          <TouchableOpacity id="service_item">
            <PiHandWithdraw size={34} />
            <p style={{ fontSize: 12 }}>Withdraw</p>
          </TouchableOpacity>
        </div>
        <div className="services_container">
          <p style={{ textAlign: "start" }}>More to Come !!</p>
        </div>
      </div>
      <div className="bottom_drawer">
        <Navigator />
      </div>
    </main>
  );
}

export function Navigator() {
  return (
    <div className="navigator">
      <TouchableOpacity>
        <Link to="/home">
          <span class="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>home</span>
          </span>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link to="/services">
          <span class="icon_button">
            <FaServicestack color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>services</span>
          </span>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link to="/wallet">
          <span class="icon_button">
            <MdAccountBalanceWallet color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>wallet</span>
          </span>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link to="/account">
          <span class="icon_button">
            <GiFullMotorcycleHelmet color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>account</span>
          </span>
        </Link>
      </TouchableOpacity>
    </div>
  );
}
