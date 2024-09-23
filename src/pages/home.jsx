// welcome to the home page, not alot goes on here besides just a bunch of buttons for navigation and displaying names
// first, some to-dos

/*
  ~ 
  ~
*/

// import stuff
import React, { useContext, useEffect, useState } from "react";
import { FaHome, FaServicestack } from "react-icons/fa";
import { MdAccountBalanceWallet, MdDining, MdSchedule } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaUserAstronaut } from "react-icons/fa";
import "../css/home.css";
import { TouchableOpacity } from "react-native-web";
import { Link, useNavigate } from "react-router-dom";
import dine from "../assets/dine.svg";
import send from "../assets/send.svg";
import withdraw from "../assets/withdraw.svg";
import shopping from "../assets/shopping.svg";
import { UserContext } from "../../UserContext";
import { RiAuctionLine } from "react-icons/ri";
import { CiDeliveryTruck } from "react-icons/ci";

function Home() {
  // import the user from the global context
  const { user } = useContext(UserContext);
  const [time, setTime] = useState("");
  const [currentTimeString, setCurrentTimeString] = useState(new Date());
  const navigate = useNavigate();

  // this takes the user to the signin, if they haven't logged in
  // logging in sets the isloggedin state to true, globally
  // i should probably add this to every page
  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/signin", { replace: true });
    }
  }, [user.isLoggedIn, navigate]);

  // this is simply getting the current time at all times to ensure proper greeting of the current user
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

  // this is a timer to make sure the greeting is updated in real time
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


  // home component
  return (
    <>
      {/* container */}
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
            {/* greet the user */}
            <p>
              {time} {user.Username}!
            </p>
            <div>
              {/* display date and time */}
              <span>{formattedTime}</span>
              <br />
              <span>{formattedDate}</span>
              <br />
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="mid_details">
          <div className="mid_details_upper">
            {/* delivery button */}
            <TouchableOpacity id="service_item" style={{ marginTop: "10px" }}>
              <Link to="/map2" id="link_item">
                <CiDeliveryTruck size={34} color="#ffc107" />
                <p style={{ fontSize: 12, color: "#333333" }}>
                  Delivery Services
                </p>
              </Link>
            </TouchableOpacity>

            {/* express ride button */}
            <TouchableOpacity id="service_item">
              <Link to="/currentRide" id="link_item">
                <GiFullMotorcycleHelmet size={34} color="#0097a7" />
                <p style={{ fontSize: 12, color: "#1a1d23" }}>Express Ride</p>
              </Link>
            </TouchableOpacity>

            {/* schedule ride button */}
            <TouchableOpacity id="service_item" style={{ marginTop: "10px" }}>
              <Link to="/agree" id="link_item">
                <MdSchedule size={34} color="4caf50" />
                <p style={{ fontSize: 12, color: "#333333" }}>Schedule ride</p>
              </Link>
            </TouchableOpacity>

            {/* dine button */}
            <TouchableOpacity id="service_item" style={{ marginTop: "10px" }}>
              <Link id="link_item">
                <img src={dine} style={{ width: "34px" }} />
                <p style={{ fontSize: 12 }}>Dine</p>{" "}
              </Link>
            </TouchableOpacity>

            {/* shopping button */}
            <TouchableOpacity id="service_item">
              <Link id="link_item">
                <img src={shopping} style={{ width: "34px" }} />
                <p style={{ fontSize: 12 }}>Shopping</p>{" "}
              </Link>
            </TouchableOpacity>

            {/* auction house button */}
            <TouchableOpacity id="service_item" style={{ marginTop: "10px" }}>
              <Link id="link_item">
                <RiAuctionLine size={34} color="limegreen" />
                <p style={{ fontSize: 12 }}>Auction House</p>{" "}
              </Link>
            </TouchableOpacity>

            {/* send money button */}
            <TouchableOpacity id="service_item" style={{ marginTop: "10px" }}>
              <Link id="link_item">
                <img src={send} style={{ width: "34px" }} />
                <p style={{ fontSize: 12 }}>Send Money</p>{" "}
              </Link>
            </TouchableOpacity>

            {/* withdrawal button */}
            <TouchableOpacity id="service_item">
              <Link to="/recieveRide" id="link_item">
                <img src={withdraw} style={{ width: "34px" }} />
                <p style={{ fontSize: 12 }}>Withdraw</p>{" "}
              </Link>
            </TouchableOpacity>

            {/* button to all services page */}
            <TouchableOpacity id="service_item" style={{ marginTop: "10px" }}>
              <Link to="/allLocations" id="link_item">
                <FaServicestack size={34} color="limegreen" />
                <p style={{ fontSize: 12 }}>All Services</p>{" "}
              </Link>
            </TouchableOpacity>
          </div>
          <div className="mid_details_lower">
            <div className="image"></div>
          </div>
        </div>

        {/* bottom navigator */}
        <div className="bottom_drawer">
          <Navigator page="home" />
        </div>
      </main>
    </>
  );
}

export default Home;

// navigator component
export function Navigator() {
  return (
    <div className="navigator">
      {/* home page */}
      <TouchableOpacity>
        <Link to="/">
          <span className="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>Home</span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* wallet page */}
      <TouchableOpacity>
        <Link to="/wallet">
          <span className="icon_button">
            <MdAccountBalanceWallet color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>Wallet</span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* profile page */}
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
