import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native-web";
import "../css/home.css";
import { FaHome, FaServicestack } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { Link } from "react-router-dom";
import Sound from "../click_sound.mp3";

function play() {
  const audio = new Audio(Sound);
  audio.volume = 0.5;
  audio.play();
}
export default function Services() {
  return (
    <>
      <div className="home">
        <div className="top">
          <div className="topper">
            <p>Services</p>
          </div>
        </div>
        <div className="mid_details"></div>
        <div className="bottom_drawer">
          <Navigator />
        </div>
      </div>
    </>
  );
}

export function Navigator() {
  return (
    <div className="navigator">
      <Link style={{ display: "contents", color: "black" }} to="/home">
        <TouchableOpacity id="nav_icon">
          <div onClick={play} className="icon_div">
            <FaHome size={24} />
          </div>
        </TouchableOpacity>
      </Link>
      <Link style={{ display: "contents", color: "black" }} to="/services">
        <TouchableOpacity id="nav_icon">
          <div
            onClick={play}
            className="icon_div"
            style={{
              backgroundColor: "#fff",
            }}
          >
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
