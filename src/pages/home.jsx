import React, { useState } from "react";
import { FaCloudSunRain, FaMotorcycle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaServicestack } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import Sound from "../click_sound.mp3";
import "../css/home.css";
import { TouchableOpacity } from "react-native-web";
import { Link } from "react-router-dom";

function play() {
  const audio = new Audio(Sound);
  audio.volume = 0.5;
  audio.play();
}

function Home() {
  return (
    <>
      <div className="home">
        <div className="top">
          <div className="topper">
            <div className="upper_topper">
              <TouchableOpacity id="user_icon">
                <div onClick={play} className="user_icon one">
                  <FaUserAstronaut color="green" size={24} />
                </div>
              </TouchableOpacity>
            </div>
            <p>Good Morning Mansur</p>
            <div>
              <span>11:29</span>
              <br />
              <span>Fri Aug 16</span>
              <br />
              <span>
                23 <FaCloudSunRain />
              </span>
            </div>
          </div>
        </div>

        <div className="mid_details">
          <div className="mid_details_upper">
            <Link
              style={{ display: "contents", color: "black" }}
              to="/delivery"
            >
              <TouchableOpacity id="items_wrapper">
                <div onClick={play} className="items">
                  <MdOutlineDeliveryDining color="green" size={26} />
                  <br />
                  <span>Delivery</span>
                </div>
              </TouchableOpacity>
            </Link>
            <Link style={{ display: "contents", color: "black" }} to="/ride">
              <TouchableOpacity id="items_wrapper">
                <div onClick={play} className="items">
                  <FaMotorcycle color="green" size={26} />
                  <br />
                  <span>Order Ride</span>
                </div>
              </TouchableOpacity>
            </Link>
            <Link
              style={{ display: "contents", color: "black" }}
              to="/schedule"
            >
              <TouchableOpacity id="items_wrapper">
                <div onClick={play} className="items">
                  <GrSchedule color="green" size={26} />
                  <br />
                  <span>Schedule</span>
                </div>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity id="items_wrapper">
              <div onClick={play} className="items">
                ???
              </div>
            </TouchableOpacity>
            <TouchableOpacity id="items_wrapper">
              <div onClick={play} className="items">
                ???
              </div>
            </TouchableOpacity>
            <TouchableOpacity id="items_wrapper">
              <div onClick={play} className="items">
                ???
              </div>
            </TouchableOpacity>
          </div>
          <div className="mid_details_lower">
            <div className="image"></div>
          </div>
        </div>

        <div className="bottom_drawer">
          <Navigator page="home" />
        </div>
      </div>
    </>
  );
}

export default Home;

export function Navigator() {
  return (
    <div className="navigator">
      <Link style={{ display: "contents", color: "black" }} to="/home">
        <TouchableOpacity id="nav_icon">
          <div
            onClick={play}
            className="icon_div"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <FaHome size={24} />
          </div>
        </TouchableOpacity>
      </Link>
      <Link style={{ display: "contents", color: "black" }} to="/services">
        <TouchableOpacity id="nav_icon">
          <div onClick={play} className="icon_div">
            <FaServicestack size={24} />
          </div>
        </TouchableOpacity>
      </Link>
      <Link style={{ display: "contents", color: "black" }} to="/wallet">
        <TouchableOpacity id="nav_icon">
          <div onClick={play} className="icon_div">
            <MdAccountBalanceWallet size={24} />
          </div>
        </TouchableOpacity>
      </Link>
      <Link style={{ display: "contents", color: "black" }} to="/account">
        <TouchableOpacity id="nav_icon">
          <div onClick={play} className="icon_div">
            <GiFullMotorcycleHelmet size={24} />
          </div>
        </TouchableOpacity>
      </Link>
    </div>
  );
}

export function Delivery() {
  return (
    <div className="home">
      <div className="map"></div>
      <div className="ride_details">
        <h2>Delivery</h2>
        <p>Destination</p>
        <InputText className="input_area"></InputText>
        <br />
        <br />
        <button>Next</button>
      </div>
    </div>
  );
}

export function OrderRide() {
  return (
    <div className="home">
      <div className="map"></div>
      <div className="ride_details">
        <h2>Order Ride</h2>
        <p>Destination</p>
        <InputText className="input_area"></InputText>
        <br />
        <br />
        <button>Next</button>
      </div>
    </div>
  );
}

export function Schedule() {
  return (
    <div className="home">
      <div className="map"></div>
      <div className="ride_details">
        <h2>Schedule Ride</h2>
        <p>Destination</p>
        <InputText className="input_area"></InputText>
        <br />
        <br />
        <button>Next</button>
      </div>
    </div>
  );
}
