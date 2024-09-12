import React, { useContext, useEffect, useState } from "react";
import { FaHome, FaServicestack } from "react-icons/fa";
import { MdAccountBalanceWallet, MdDining } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaUserAstronaut } from "react-icons/fa";
import "../css/home.css";
import { TouchableOpacity } from "react-native-web";
import { Link, useNavigate } from "react-router-dom";
import ride from "../assets/ride.svg";
import delivery from "../assets/delivery.svg";
import schedule from "../assets/schedule.svg";
import dine from "../assets/dine.svg";
import send from "../assets/send.svg";
import withdraw from "../assets/withdraw.svg";
import shopping from "../assets/shopping.svg";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { RiAuctionLine } from "react-icons/ri";
import { LoginContext } from "../../loggedin";

function Home() {
  const { user } = useContext(UserContext);
  const [time, setTime] = useState("");
  const [currentTimeString, setCurrentTimeString] = useState(new Date());
  const navigate = useNavigate();

useEffect(() => {
  if (!user.isLoggedIn) {
    navigate("/signin", { replace: true });
  }
}, [user.isLoggedIn, navigate]);

  useEffect(() => {
    const currentTime = new Date().getHours();
    let time;

    if (currentTime < 12) {
      time = "Good morning, ";
    } else if (currentTime < 18) {
      time = "Good afternoon, ";
    } else {
      time = "Good evening, ";
    }
    setTime(time);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimeString(new Date());
    }, 1000);
    return () => clearInterval(timer);
  });

  const timeOptions = { hour: "2-digit", minute: "2-digit" };
  const dateOptions = { weekday: "short", month: "short", day: "2-digit" };

  const formattedTime = currentTimeString.toLocaleTimeString(
    "en-US",
    timeOptions
  );
  const formattedDate = currentTimeString.toLocaleDateString(
    "en-US",
    dateOptions
  );

  return (
    <>
      <main className="home">
        <div className="top">
          <div className="topper">
            <div className="upper_topper">
              <TouchableOpacity id="user_icon">
                <div className="user_icon one">
                  <FaUserAstronaut color="green" size={24} />
                </div>
              </TouchableOpacity>
            </div>
            <p>
              {time} {user.Username}!
            </p>
            <div>
              <span>{formattedTime}</span>
              <br />
              <span>{formattedDate}</span>
              <br />
            </div>
          </div>
        </div>

        <div className="mid_details">
          <div className="mid_details_upper">
            <TouchableOpacity id="service_item">
              <Link to="/map2" id="link_item">
                <img src={delivery} style={{ width: "36px" }} />
                <p style={{ fontSize: 12 }}>Delivery</p>{" "}
              </Link>
            </TouchableOpacity>

            <TouchableOpacity id="service_item">
              <Link to="/map2" id="link_item">
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
                <FaServicestack size={34} color="limegreen" />
                <p style={{ fontSize: 12 }}>All Services</p>{" "}
              </Link>
            </TouchableOpacity>
          </div>
          <div className="mid_details_lower">
            <div className="image"></div>
          </div>
        </div>

        <div className="bottom_drawer">
          <Navigator page="home" />
        </div>
      </main>
    </>
  );
}

export default Home;

export function Navigator() {
  return (
    <div className="navigator">
      <TouchableOpacity>
        <Link to="/home">
          <span className="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>Home</span>
          </span>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link to="/wallet">
          <span className="icon_button">
            <MdAccountBalanceWallet color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>Wallet</span>
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
