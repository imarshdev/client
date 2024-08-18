import React from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native-web";
import "../css/home.css";
import "../css/account.css";
import { FaCreditCard, FaHome, FaServicestack } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CiSquareChevUp, CiSquareChevDown } from "react-icons/ci";
import { MdAccountBalanceWallet, MdOutlineArrowRightAlt } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BiHide } from "react-icons/bi";

export default function Wallet() {
  return (
    <main className="home">
      <div className="top" style={{ height: "50vh" }}>
        <div className="topper">
          <p>Wallet</p>
          <div className="card">
            <div className="uppercard">
              <div>
                <span style={{ fontSize: 12 }}>Main Card</span>
                <br />
                <span style={{ fontSize: 20 }}>$28.896</span>
              </div>
              <TouchableOpacity>
                <BiHide size={20} />
              </TouchableOpacity>
            </div>
            <div className="lowercard">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaCreditCard color="black" />
                <span
                  style={{ color: "black", fontSize: 14, paddingLeft: "10px" }}
                >
                  ●●●● ●●●● ●●●● 784
                </span>
              </div>
              <MdOutlineArrowRightAlt color="black" />
            </div>
          </div>
          <div className="action_buttons">
            <TouchableOpacity id="action_button">
              <CiSquareChevUp size={24} />
              <span style={{ fontSize: 12, color: "#fff" }}>transfer</span>
            </TouchableOpacity>
            <TouchableOpacity id="action_button">
              <IoMdAdd size={24} />
              <span style={{ fontSize: 12, color: "#fff" }}>top up</span>
            </TouchableOpacity>
            <TouchableOpacity id="action_button">
              <CiSquareChevDown size={24} />
              <span style={{ fontSize: 12, color: "#fff" }}>withdraw</span>
            </TouchableOpacity>
          </div>
        </div>
      </div>
      <div
        className="mid_details"
        style={{ height: "40vh", textAlign: "start", boxSizing: "border-box", padding: "10px" }}
      >
        <p style={{boxSizing: "border-box", padding: "0 10px"}}>Transaction History</p>
        <ScrollView id="history_scroll">
          <div className="history_item"></div>
          <div className="history_item"></div>
          <div className="history_item"></div>
          <div className="history_item"></div>
          <div className="history_item"></div>
          <div className="history_item"></div>
          <div className="history_item"></div>
          <div className="history_item"></div>
          <div className="history_item"></div>
          <div className="history_item"></div>
        </ScrollView>
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
            <span style={{ fontSize: 12, color: "#fff" }}>wallet</span>
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
