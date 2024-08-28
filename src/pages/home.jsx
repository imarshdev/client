import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { FaCloudSunRain, FaMotorcycle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GrFormSchedule, GrSchedule } from "react-icons/gr";
import { IoIosArrowRoundBack, IoIosSend } from "react-icons/io";
import { MdAccountBalanceWallet, MdDining } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaServicestack } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import "../css/home.css";
import { TouchableOpacity } from "react-native-web";
import { Link } from "react-router-dom";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { PiHandWithdraw } from "react-icons/pi";
import { minutesToHours } from "date-fns";

function Home() {
  const [time, setTime] = useState("");
  const [currentTimeString, setCurrentTimeString] = useState(new Date());
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

  const formattedTime = currentTimeString.toLocaleTimeString('en-US', timeOptions)
  const formattedDate = currentTimeString.toLocaleDateString('en-US', dateOptions)


  const { userName } = useContext(UserContext);
  return (
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
            {time} {userName}
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
            <Link to="/map" id="link_item">
              <MdOutlineDeliveryDining size={34} />
              <p style={{ fontSize: 12 }}>Delivery</p>{" "}
            </Link>
          </TouchableOpacity>

          <TouchableOpacity id="service_item">
            <Link to="/map" id="link_item">
              <FaMotorcycle size={34} />
              <p style={{ fontSize: 12 }}>Order Ride</p>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity id="service_item">
            <Link to="/map" id="link_item">
              <GrFormSchedule size={34} />
              <p style={{ fontSize: 12 }}>Schedule ride</p>{" "}
            </Link>
          </TouchableOpacity>

          <TouchableOpacity id="service_item">
            <Link id="link_item">
              <MdDining size={34} />
              <p style={{ fontSize: 12 }}>Dine</p>{" "}
            </Link>
          </TouchableOpacity>

          <TouchableOpacity id="service_item">
            <Link id="link_item">
              <IoIosSend size={34} />
              <p style={{ fontSize: 12 }}>Send Money</p>{" "}
            </Link>
          </TouchableOpacity>

          <TouchableOpacity id="service_item">
            <Link id="link_item">
              <PiHandWithdraw size={34} />
              <p style={{ fontSize: 12 }}>Withdraw</p>{" "}
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
