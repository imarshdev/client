import React, { useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native-web";
import "../css/home.css";
import "../css/account.css";
import { FaCreditCard, FaHome, FaServicestack } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CiSquareChevUp, CiSquareChevDown } from "react-icons/ci";
import { MdAccountBalanceWallet, MdOutlineArrowRightAlt } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { InputText } from "primereact/inputtext";

export default function Wallet() {
  const [open, setOpen] = useState(false);
  const dismis = () => {
    setOpen(false);
  };
  return (
    <main className="home">
      <div className="top" style={{ height: "40vh" }}>
        <div className="topper" style={{ borderRadius: 0 }}>
          <p>Wallet</p>
          <div className="card">
            <span style={{ fontSize: "12px" }}>Your balance</span>
            <br />
            <span style={{ fontSize: "30px" }}>
              sh.17,000 <span>.00</span>
            </span>
          </div>
          <div className="action_buttons">
            <TouchableOpacity onPress={() => setOpen(true)} id="action_button">
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
      ></ScrollView>
      <div className="bottom_drawer wallet_bottom_drawer">
        <Navigator />
      </div>
      <BottomSheet onDismiss={dismis} open={open}>
        <div
          style={{ height: "70vh", boxSizing: "border-box", padding: "20px" }}
        >
          <p>Choose Amount</p>
          <div className="amount_container">
            <TouchableOpacity id="amount_item">
              <span>sh.1,000</span>
            </TouchableOpacity>
            <TouchableOpacity id="amount_item">
              <span>sh.2,000</span>
            </TouchableOpacity>
            <TouchableOpacity id="amount_item">
              <span>sh.5,000</span>
            </TouchableOpacity>
            <TouchableOpacity id="amount_item">
              <span>sh.10,000</span>
            </TouchableOpacity>
            <TouchableOpacity id="amount_item">
              <span>sh.20,000</span>
            </TouchableOpacity>
            <TouchableOpacity id="amount_item">
              <span>Custom</span>
            </TouchableOpacity>
          </div>
          <p>Options</p>
          <div className="options">
            <TouchableOpacity id="option_item">
              <span>MTN</span>
            </TouchableOpacity>
            <TouchableOpacity id="option_item">
              <span>Airtel</span>
            </TouchableOpacity>
          </div>
          <br />
          <TouchableOpacity id="finish">
            <span>Next</span>
          </TouchableOpacity>
        </div>
      </BottomSheet>
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
            <span style={{ fontSize: 12 }}>Home</span>
          </span>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link to="/wallet">
          <span class="icon_button">
            <MdAccountBalanceWallet color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>Wallet</span>
          </span>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link to="/account">
          <span class="icon_button">
            <GiFullMotorcycleHelmet color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>Profile</span>
          </span>
        </Link>
      </TouchableOpacity>
    </div>
  );
}
