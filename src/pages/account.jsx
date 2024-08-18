import React from "react";
import { TouchableOpacity } from "react-native-web";
import "../css/home.css";
import { FaHome, FaServicestack } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { Link } from "react-router-dom";


export default function Account() {
  return (
    <main className="home">
      <div className="top">
        <div className="topper">
          <p>Account</p>
        </div>
      </div>
      <div className="mid_details"></div>
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
          </span>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link to="/services">
          <span class="icon_button">
            <FaServicestack color="#fff" size={24} />
          </span>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link to="/wallet">
          <span class="icon_button">
            <MdAccountBalanceWallet color="#fff" size={24} />
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
