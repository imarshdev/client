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
      <div className="top" style={{ height: "40vh" }}>
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
      <p style={{ boxSizing: "border-box", padding: "0 10px" }}>
        Transaction History
      </p>
      <ScrollView
        className="mid_details"
        style={{
          height: "60vh",
          textAlign: "start",
          boxSizing: "border-box",
          padding: "10px",
        }}
      >
        <div className="history_item">
          <div className="history_icon"></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>5HDG76SHFDBHVDGFD23</span>
            <span>UICT - The Acacia Mall</span>
          </div>
        </div>
        <div className="history_item">
          <div className="history_icon"></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>JE77BXCHCMVCJVNV</span>
            <span>Lugogo Mall - Ntinda Stretcher</span>
          </div>
        </div>
        <div className="history_item">
          <div className="history_icon"></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>92CURBVUUR9993</span>
            <span>UICT - Sai Pali Institute</span>
          </div>
        </div>
        <div className="history_item">
          <div className="history_icon"></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>87RHDHVBVCVJHDH66</span>
            <span>Mapeera House - Arena Mall</span>
          </div>
        </div>
        <div className="history_item">
          <div className="history_icon"></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>6JHSHD67DNCDI23</span>
            <span>Ntinda Stretcher - CC Metroplex Mall</span>
          </div>
        </div>
        <div className="history_item">
          <div className="history_icon"></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>5HDG76SHFDBHVDGFD23</span>
            <span>UICT - The Acacia Mall</span>
          </div>
        </div>
        <div className="history_item">
          <div className="history_icon"></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>5HDG76SHFDBHVDGFD23</span>
            <span>UICT - The Acacia Mall</span>
          </div>
        </div>
      </ScrollView>
      <div className="bottom_drawer wallet_bottom_drawer">
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
