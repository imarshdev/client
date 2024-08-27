import React, { useContext } from "react";
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

function Home() {
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
          <p>Good Morning {userName}</p>
          <div>
            <span>11:29</span>
            <br />
            <span>Fri Aug 16</span>
            <br />
            <span>
              23 <FaCloudSunRain />
            </span>
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
