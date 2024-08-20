import React from "react";
import { TouchableOpacity } from "react-native-web";
import "../css/home.css";
import { FaHome, FaServicestack } from "react-icons/fa";
import { MdAccessTime, MdAccountBalanceWallet } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { RiListSettingsLine } from "react-icons/ri";
import { CiLocationOn, CiCreditCard1 } from "react-icons/ci";

import { Link } from "react-router-dom";

export default function Account() {
  return (
    <main className="home">
      <div className="top" style={{ height: "15vh" }}>
        <div
          className="topper"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            <span>Mansur, Chelangat</span>
            <br />
            <span style={{ fontSize: 12, padding: 0 }}>0767116290</span>
          </span>
          <div>
            <TouchableOpacity>
              <RiListSettingsLine size={20} />
            </TouchableOpacity>
          </div>
        </div>
      </div>
      <div className="mid_details" style={{ height: "75vh" }}>
        <p style={{ textAlign: "start" }}>Scheduled Rides</p>
        <div className="scheduled_ride">
          <span style={{ fontSize: 18 }}>School</span>
          <span>
            <CiLocationOn style={{ marginRight: "10px" }} />
            Ntinda Stretcher - UICT
          </span>
          <span>
            <MdAccessTime style={{ marginRight: "10px" }} />
            Mon - Fri 8 am
          </span>
          <span>
            <CiCreditCard1 style={{ marginRight: "10px" }} />
            Card - $5
          </span>
          <TouchableOpacity id="action">
            <span>Edit</span>
          </TouchableOpacity>
        </div>
        <div className="scheduled_ride">
          <span style={{ fontSize: 18 }}>Work</span>
          <span>
            <CiLocationOn style={{ marginRight: "10px" }} />
            UICT - Mapeera House
          </span>
          <span>
            <MdAccessTime style={{ marginRight: "10px" }} />
            Mon - Fri 2 pm
          </span>
          <span>
            <CiCreditCard1 style={{ marginRight: "10px" }} />
            Card - $5
          </span>
          <TouchableOpacity id="action">
            <span>Edit</span>
          </TouchableOpacity>
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
            <span style={{ fontSize: 12 }}>services</span>
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
            <span style={{ fontSize: 12, color: "#fff" }}>account</span>
          </span>
        </Link>
      </TouchableOpacity>
    </div>
  );
}
