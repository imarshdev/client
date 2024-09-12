import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native-web";
import "../css/home.css";
import { useSwipeable } from "react-swipeable";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCreditCard,
  FaHome,
  FaServicestack,
  FaStickyNote,
} from "react-icons/fa";
import { IoCaretBackSharp, IoPhonePortraitOutline } from "react-icons/io5";
import { LuHelpCircle } from "react-icons/lu";
import {
  MdAccessTime,
  MdAccountBalanceWallet,
  MdKeyboardDoubleArrowRight,
  MdOutlineEmail,
  MdTwoWheeler,
} from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { RiListSettingsLine } from "react-icons/ri";
import { CiLocationOn, CiCreditCard1, CiStar } from "react-icons/ci";
import { LiaIdCardSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { UserContext } from "../../UserContext";
import { Password } from "primereact/password";
import axios from "axios";

export default function Account() {
  const { user } = useContext(UserContext);
  const handlers = useSwipeable({
    onSwipedRight: () => setVisible(false),
  });
  const handlers2 = useSwipeable({
    onSwipedRight: () => setVisible2(false),
  });
  const handlers3 = useSwipeable({
    onSwipedRight: () => setVisible3(false),
  });
  const handlers4 = useSwipeable({
    onSwipedRight: () => setVisible4(false),
  });
  const handlers5 = useSwipeable({
    onSwipedRight: () => setVisible5(false),
  });
  const handlers6 = useSwipeable({
    onSwipedRight: () => setVisible6(false),
  });
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const secretCode = "1234";

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === secretCode) {
    navigate("/captain-dash")
    } else {
      setErrorMessage("Contact us to become a Captain");
    }
  };

  return (
    <main className="home">
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers} style={{ width: "100%", height: "100%" }}>
          <PersonalInformation />
        </div>
      </Sidebar>

      <Sidebar
        visible={visible2}
        position="right"
        onHide={() => setVisible2(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers2} style={{ width: "100%", height: "100%" }}>
          <CardsAndAccounts />
        </div>
      </Sidebar>

      <Sidebar
        visible={visible3}
        position="right"
        onHide={() => setVisible3(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers3} style={{ width: "100%", height: "100%" }}>
          <Saved />
        </div>
      </Sidebar>

      <Sidebar
        visible={visible4}
        position="right"
        onHide={() => setVisible4(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers4} style={{ width: "100%", height: "100%" }}>
          <ScheduledRides />
        </div>
      </Sidebar>

      <Sidebar
        visible={visible5}
        position="right"
        onHide={() => setVisible5(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers5} style={{ width: "100%", height: "100%" }}>
          <DeleteAccount />
        </div>
      </Sidebar>

      <Sidebar
        visible={visible6}
        position="right"
        onHide={() => setVisible6(fasle)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers6} style={{ width: "100%", height: "100%" }}>
          <div
            className="mid_details"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h2>Enter Captain's PassCode</h2>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div id="input-container" style={{ width: "80%" }}>
                <input
                  type="number"
                  inputMode="numeric"
                  className="schedule-input"
                  id="center-input"
                  value={code}
                  onChange={handleCodeChange}
                />
              </div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            <TouchableOpacity
              id="set"
              style={{ width: "60%" }}
              onPress={handleSubmit}
            >
              <p>Submit</p>
            </TouchableOpacity>
            <div
              style={{
                width: "80%",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>Don't have a code, contact us!!</p>
              <TouchableOpacity id="set" style={{ width: "60%" }}>
                <p>Contact us</p>
              </TouchableOpacity>
            </div>
          </div>
        </div>
      </Sidebar>

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
            <span>Username: {user.Username}</span>
            <br />
            <span style={{ fontSize: 12, padding: 0 }}>0767116290</span>
          </span>
          <div>
            <TouchableOpacity>
              <div onClick={() => setVisible5(true)}>
                <RiListSettingsLine size={20} />
              </div>
            </TouchableOpacity>
          </div>
        </div>
      </div>
      <div className="mid_details" style={{ height: "75vh" }}>
        <br />
        <p style={{ textAlign: "start", fontWeight: "bolder" }}>Your account</p>

        <TouchableOpacity id="account_item">
          <div id="inner_account_item" onClick={() => setVisible(true)}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FiUser size={20} style={{ marginRight: "10px" }} />
              <span>Personal Information</span>
            </div>
            <FaAngleRight />
          </div>
        </TouchableOpacity>

        <TouchableOpacity id="account_item">
          <div id="inner_account_item" onClick={() => setVisible2(true)}>
            <div id="inner_account_item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaCreditCard size={20} style={{ marginRight: "10px" }} />
                <span>Card and Accounts</span>
              </div>
            </div>
            <FaAngleRight />
          </div>
        </TouchableOpacity>

        <TouchableOpacity id="account_item">
          <div id="inner_account_item" onClick={() => setVisible3(true)}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CiLocationOn size={20} style={{ marginRight: "10px" }} />
              <span>Saved Addresses</span>
            </div>
            <FaAngleRight />
          </div>
        </TouchableOpacity>

        <TouchableOpacity id="account_item">
          <div id="inner_account_item" onClick={() => setVisible4(true)}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaStickyNote size={20} style={{ marginRight: "10px" }} />
              <span>Scheduled Rides</span>
            </div>
            <FaAngleRight />
          </div>
        </TouchableOpacity>

        <p style={{ textAlign: "start", fontWeight: "bolder" }}>Support</p>
        <TouchableOpacity id="account_item">
          <div id="inner_account_item">
            <div style={{ display: "flex", alignItems: "center" }}>
              <LuHelpCircle size={20} style={{ marginRight: "10px" }} />
              <span>Help</span>
            </div>
            <FaAngleRight />
          </div>
        </TouchableOpacity>

        <TouchableOpacity id="account_item">
          <div id="inner_account_item">
            <div style={{ display: "flex", alignItems: "center" }}>
              <CiStar size={20} style={{ marginRight: "10px" }} />
              <span>Rate this app</span>
            </div>
            <FaAngleRight />
          </div>
        </TouchableOpacity>

        <TouchableOpacity id="account_item">
          <div id="inner_account_item" onClick={() => setVisible6(true)}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdTwoWheeler size={20} style={{ marginRight: "10px" }} />
              <span>Captain Dash</span>
            </div>
            <FaAngleRight />
          </div>
        </TouchableOpacity>
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
            <span style={{ fontSize: 12 }}>Wallet</span>
          </span>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity>
        <Link to="/account">
          <span className="icon_button">
            <GiFullMotorcycleHelmet color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>Profile</span>
          </span>
        </Link>
      </TouchableOpacity>
    </div>
  );
}

function ScheduledRides() {
  const { user } = useContext(UserContext);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      setUsername(user.Username);
      setToken(user.Token);
      if (username && token) {
        axios
          .get("https://walamin-server.onrender.com/rides", {
            params: { username, token },
          })
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [user, username, token]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div
      className="mid_details"
      style={{ height: "90vh", justifyContent: "center" }}
    >
      <p style={{ textAlign: "start" }}>Scheduled Rides</p>
      {data ? (
        data.map((ride, index) => (
          <div className="scheduled_ride" key={index}>
            <span style={{ fontSize: 18 }}>{ride.rideCategory}</span>
            <span>
              <CiLocationOn style={{ marginRight: "10px" }} />
              {ride.pickupLocation} - {ride.dropoffLocation}
            </span>
            <span>
              <MdAccessTime style={{ marginRight: "10px" }} />
              {ride.rideDate} - {ride.rideTime} pm
            </span>
            <span>
              <CiCreditCard1 style={{ marginRight: "10px" }} />
              {ride.rideStatus}
            </span>
            <TouchableOpacity id="action">
              <span>Edit</span>
            </TouchableOpacity>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function PersonalInformation() {
  const { user } = useContext(UserContext);
  const [fullname, setfullname] = useState("");
  const [data, setData] = useState("");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    try {
      setUsername(user.Username);
      setToken(user.Token);
      if (username && token) {
        axios
          .get("https://walamin-server.onrender.com/user/details", {
            params: { username, token },
          })
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [user, username, token]);

  useEffect(() => {
    console.log(data);
    setfullname(data.firstName);
  }, [data]);
  return (
    <div className="mid_details" style={{ height: "90vh" }}>
      <p>Personal Information</p>
      <TouchableOpacity id="personal_item">
        <div style={{ display: "flex", alignItems: "center" }}>
          <LiaIdCardSolid size={30} style={{ marginRight: "15px" }} />
          <span style={{ padding: 0 }}>
            Name <br />
            <span style={{ fontSize: "12px", padding: 0 }}>
              {data ? (
                <p>
                  {data.firstName} {data.lastName}
                </p>
              ) : (
                <p>Loading</p>
              )}
            </span>
          </span>
        </div>
        <MdKeyboardDoubleArrowRight />
      </TouchableOpacity>

      <TouchableOpacity id="personal_item">
        <div style={{ display: "flex", alignItems: "center" }}>
          <IoPhonePortraitOutline size={30} style={{ marginRight: "15px" }} />
          <span style={{ padding: 0 }}>
            Phone number <br />
            <span style={{ fontSize: "12px", padding: 0 }}>
              {data ? <p>{data.contact}</p> : <p>Loading</p>}
            </span>
          </span>
        </div>
        <MdKeyboardDoubleArrowRight />
      </TouchableOpacity>

      <TouchableOpacity id="personal_item">
        <div style={{ display: "flex", alignItems: "center" }}>
          <MdOutlineEmail size={30} style={{ marginRight: "15px" }} />
          <span style={{ padding: 0 }}>
            Email <br />
            <span style={{ fontSize: "12px", padding: 0 }}>
              forevermarsh004@gmail.com
            </span>
          </span>
        </div>
        <MdKeyboardDoubleArrowRight />
      </TouchableOpacity>
    </div>
  );
}

function Saved() {
  return (
    <div className="mid_details" style={{ height: "90vh" }}>
      <p>Saved Locations</p>
    </div>
  );
}

function CardsAndAccounts() {
  return (
    <div className="mid_details" style={{ height: "90vh" }}>
      <p>Cards And Accounts</p>
    </div>
  );
}

function DeleteAccount() {
  return (
    <div className="mid_details">
      <p> Delete Account</p>
    </div>
  );
}
