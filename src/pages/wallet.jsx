// Import necessary libraries and components
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-web";
import "../css/home.css";
import "../css/account.css";
import { FaHome } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CiSquareChevDown } from "react-icons/ci";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { Link } from "react-router-dom";
import mtn from "../assets/mtn.svg";
import airtel from "../assets/airtel.svg";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
// Define the Wallet component
export default function Wallet() {
  // State variables for amount, step, and bottom sheet open state
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState("pay");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);


  // Function to dismiss the bottom sheet
  const dismis = () => {
    setOpen(false);
  };

  // Function to dismiss the second bottom sheet
  const dismis1 = () => {
    setOpen1(false);
  };

  // Function to set the step to custom
  const custom = () => {
    setStep("custom");
  };

  // Function to set the step to pay
  const pay = () => {
    setStep("pay");
  };

  return (
    // Main container
    <main className="home">
      {/* Top section */}
      <div className="top" style={{ height: "40vh" }}>
        {/* Topper container */}
        <div className="topper" style={{ borderRadius: "10px" }}>
          {/* Wallet title */}
          <p>Wallet</p>
          {/* card container */}
          <div className="card">
            {/* account ballance text */}
            <span style={{ fontSize: "12px" }}>Your balance</span>
            <br />
            <span style={{ fontSize: "30px" }}>
              {/* account ballance amount */}
              sh. 00<span>.00</span>
            </span>
          </div>
          {/* action buttons container */}
          <div className="action_buttons">
            {/* top-up button */}
            <TouchableOpacity onPress={() => setOpen(true)} id="action_button">
              <IoMdAdd size={24} />
              <span style={{ fontSize: 12, color: "#fff" }}>top up</span>
            </TouchableOpacity>
            {/* withdrawal button */}
            <TouchableOpacity onPress={() => setOpen1(true)} id="action_button">
              <CiSquareChevDown size={24} />
              <span style={{ fontSize: 12, color: "#fff" }}>withdraw</span>
            </TouchableOpacity>
          </div>
        </div>
      </div>
      {/* transaction history */}
      <p style={{ boxSizing: "border-box", padding: "0 10px" }}>
        Transaction History
      </p>
      {/* scrollview for transaction history */}
      <ScrollView
        className="mid_details"
        style={{
          height: "60vh",
          textAlign: "start",
          boxSizing: "border-box",
          padding: "10px",
          width: "100vw",
        }}
      >
        <FallingLines width="100px"/>
      </ScrollView>
      <div className="bottom_drawer wallet_bottom_drawer">
        <Navigator />
      </div>
      <BottomSheet onDismiss={dismis} open={open}>
        <div
          style={{ height: "70vh", boxSizing: "border-box", padding: "20px" }}
        >
          <p>
            Choose Amount: <span style={{ fontSize: "20px" }}>{amount}</span>
          </p>
          <div className="amount_container">
            <TouchableOpacity
              onPress={() => setAmount("1,000")}
              id="amount_item"
            >
              <span>sh.1,000</span>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("2,000")}
              id="amount_item"
            >
              <span>sh.2,000</span>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("5,000")}
              id="amount_item"
            >
              <span>sh.5,000</span>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("10,000")}
              id="amount_item"
            >
              <span>sh.10,000</span>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("20,000")}
              id="amount_item"
            >
              <span>sh.20,000</span>
            </TouchableOpacity>
            <TouchableOpacity onPress={custom} id="amount_item">
              <span>Custom</span>
            </TouchableOpacity>
          </div>
          {step === "custom" && (
            <div
              className="options"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  borderBottom: "solid 1px #0a542e",
                  width: "75%",
                }}
              >
                <input
                  className="input_amount"
                  style={{ width: "100%", border: "solid 1px black" }}
                  type="number"
                  inputMode="numeric"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <TouchableOpacity onPress={pay} id="pay">
                <span>Next</span>
              </TouchableOpacity>
            </div>
          )}
          <p>Options</p>
          {step === "pay" && (
            <div className="options">
              <TouchableOpacity id="option_item">
                <img src={mtn} style={{ width: "100%" }} />
              </TouchableOpacity>
              <TouchableOpacity id="option_item">
                <img src={airtel} style={{ width: "100%" }} />
              </TouchableOpacity>
            </div>
          )}
          <br />
          <TouchableOpacity id="finish">
            <span>Next</span>
          </TouchableOpacity>
        </div>
      </BottomSheet>
      <BottomSheet onDismiss={dismis1} open={open1}>
        <div
          style={{ height: "70vh", boxSizing: "border-box", padding: "20px" }}
        >
          <p>
            Choose Amount: <span style={{ fontSize: "20px" }}>{amount}</span>
          </p>
          <div className="amount_container">
            <TouchableOpacity
              onPress={() => setAmount("1,000")}
              id="amount_item"
            >
              <span>sh.1,000</span>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("2,000")}
              id="amount_item"
            >
              <span>sh.2,000</span>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("5,000")}
              id="amount_item"
            >
              <span>sh.5,000</span>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("10,000")}
              id="amount_item"
            >
              <span>sh.10,000</span>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmount("20,000")}
              id="amount_item"
            >
              <span>sh.20,000</span>
            </TouchableOpacity>
            <TouchableOpacity onPress={custom} id="amount_item">
              <span>Custom</span>
            </TouchableOpacity>
          </div>
          {step === "custom" && (
            <div
              className="options"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  borderBottom: "solid 1px #0a542e",
                  width: "75%",
                }}
              >
                <input
                  className="input_amount"
                  style={{ width: "100%", border: "solid 1px black" }}
                  type="number"
                  inputMode="numeric"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <TouchableOpacity onPress={pay} id="pay">
                <span>Next</span>
              </TouchableOpacity>
            </div>
          )}
          <p>Options</p>
          {step === "pay" && (
            <div className="options">
              <TouchableOpacity id="option_item">
                <img src={mtn} style={{ width: "100%" }} />
              </TouchableOpacity>
              <TouchableOpacity id="option_item">
                <img src={airtel} style={{ width: "100%" }} />
              </TouchableOpacity>
            </div>
          )}
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
        <Link to="/">
          <span className="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>Home</span>
          </span>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity>
        <Link to="/wallet">
          <span className="icon_button">
            <MdAccountBalanceWallet color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>Wallet</span>
          </span>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity>
        <Link to="/account">
          <span className="icon_button">
            <GiFullMotorcycleHelmet color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>Profile</span>
          </span>
        </Link>
      </TouchableOpacity>
    </div>
  );
}
