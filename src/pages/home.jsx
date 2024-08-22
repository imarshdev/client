import React, { useRef, useState } from "react";
import { FaCloudSunRain, FaMotorcycle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GrFormSchedule, GrSchedule } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaServicestack } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import "../css/home.css";
import { TouchableOpacity } from "react-native-web";
import { Link } from "react-router-dom";
import { TimePicker } from "@vaadin/react-components";
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { RiCalendarScheduleFill } from "react-icons/ri";


function Home() {
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
          <p>Good Morning Mansur</p>
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
          <TouchableOpacity id="items_wrapper">
            <Link to="/map">
              <div className="items">
                <MdOutlineDeliveryDining color="#0a542e" size={30} />
                <span style={{ color: "#0a542e", paddingTop: "5px" }}>
                  Delivery
                </span>
              </div>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity id="items_wrapper">
            <Link to="/ride">
              <div className="items">
                <FaMotorcycle color="#0a542e" size={30} />
                <span style={{ color: "#0a542e", paddingTop: "5px" }}>
                  OrderRide
                </span>
              </div>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity id="items_wrapper">
            <Link to="/schedule">
              <div className="items">
                <GrFormSchedule color="#0a542e" size={30} />
                <span style={{ color: "#0a542e", paddingTop: "5px" }}>
                  Schedule
                </span>
              </div>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity id="items_wrapper">
            <div className="items">???</div>
          </TouchableOpacity>
          <TouchableOpacity id="items_wrapper">
            <div className="items">???</div>
          </TouchableOpacity>
          <TouchableOpacity id="items_wrapper">
            <div className="items">???</div>
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
          <span class="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12, color: "#fff" }}>home</span>
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
            <span style={{ fontSize: 12 }}>account</span>
          </span>
        </Link>
      </TouchableOpacity>
    </div>
  );
}

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
export function Delivery() {
  const mapRef = useRef(null);
  const latitude = 51.505;
  const longitude = -0.09;
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  return (
    <div className="home order">
      <div className="map">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          ref={mapRef}
          style={{ height: "70vh", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
      {step === 1 && (
        <div className="ride_details">
          <p>Enter Destination</p>
          <InputText className="input_area"></InputText>
          <br />
          <br />
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="ride_details">
          <p>Confirm Pickup Location</p>
          <InputText className="input_area"></InputText>
          <br />
          <br />
          <button style={{ width: "45%", margin: "0 2.5%" }} onClick={prevStep}>
            Back
          </button>
          <button style={{ width: "45%", margin: "0 2.5%" }}>Confirm</button>
        </div>
      )}
    </div>
  );
}

export function OrderRide() {
    const mapRef = useRef(null);
    const latitude = 51.505;
    const longitude = -0.09;
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  return (
    <div className="home order">
      <div className="map">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          ref={mapRef}
          style={{ height: "70vh", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
      {step === 1 && (
        <div className="ride_details">
          <p>Enter Destination</p>
          <InputText className="input_area"></InputText>
          <br />
          <br />
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="ride_details">
          <p>Confirm Pickup Location</p>
          <InputText className="input_area"></InputText>
          <br />
          <br />
          <button style={{ width: "45%", margin: "0 2.5%" }} onClick={prevStep}>
            Back
          </button>
          <button style={{ width: "45%", margin: "0 2.5%" }}>Confirm</button>
        </div>
      )}
    </div>
  );
}

export function Schedule() {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const [time, setTime] = useState("10:00 AM");
  const handleChange = (timeValue) => {
    setTime(timeValue);
  };
  return (
    <div className="home order">
      {step === 1 && (
        <div className="ride_details schedule">
          <h2>Schedule Ride</h2>
          <p>Name: </p>
          <InputText
            placeholder="work / school / fun?"
            className="input_area"
          ></InputText>
          <br />
          <div style={{ width: "100%" }}>
            <Link to="/home">
              {" "}
              <button style={{ width: "45%", margin: "0 2.5%" }}>Cancel</button>
            </Link>
            <button
              style={{ width: "45%", margin: "0 2.5%" }}
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="ride_details schedule">
          <p>Destination: </p>
          <InputText className="input_area"></InputText>
          <br />
          <div style={{ width: "100%" }}>
            <button
              style={{ width: "25%", margin: "0 2.5%" }}
              onClick={prevStep}
            >
              <IoIosArrowRoundBack />
            </button>
            <button
              style={{ width: "65%", margin: "0 2.5%" }}
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="ride_details schedule">
          <p>Preffered Pickup Location: </p>
          <InputText className="input_area"></InputText>
          <br />
          <div style={{ width: "100%" }}>
            <button
              style={{ width: "25%", margin: "0 2.5%" }}
              onClick={prevStep}
            >
              <IoIosArrowRoundBack />
            </button>
            <button
              style={{ width: "65%", margin: "0 2.5%" }}
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="ride_details schedule">
          <p>Preffered Days for Ride: </p>
          <InputText className="input_area"></InputText>
          <br />
          <div style={{ width: "100%" }}>
            <button
              style={{ width: "25%", margin: "0 2.5%" }}
              onClick={prevStep}
            >
              <IoIosArrowRoundBack />
            </button>
            <button
              style={{ width: "65%", margin: "0 2.5%" }}
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 5 && (
        <div className="ride_details schedule">
          <p>Time of Pickup:</p>
          <TimePicker color="black" value="07:00" />
          <br />
          <div style={{ width: "100%" }}>
            <button
              style={{ width: "25%", margin: "0 2.5%" }}
              onClick={prevStep}
            >
              <IoIosArrowRoundBack />
            </button>
            <button
              style={{ width: "65%", margin: "0 2.5%" }}
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 6 && (
        <div className="ride_details schedule">
          <span>Name:</span>
          <span>Destination:</span>
          <span>Pick-Up Location:</span>
          <span>Repeate:</span>
          <span>Time:</span>
          <br />
          <div style={{ width: "100%" }}>
            <button
              style={{ width: "25%", margin: "0 2.5%" }}
              onClick={prevStep}
            >
              <IoIosArrowRoundBack />
            </button>
            <button style={{ width: "65%", margin: "0 2.5%" }}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}



