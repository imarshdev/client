import { IoIosArrowBack } from "react-icons/io";
import { TouchableOpacity } from "react-native-web";
import { useNavigate } from "react-router-dom";
import "../css/schedule.css";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { BottomSheet } from "react-spring-bottom-sheet";
import { UserContext } from "../../UserContext";

export default function Schedule() {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [rideCategory, setRideCategory] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [request, setRequest] = useState("");
  const [step, setStep] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [places, setPlaces] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyLrk1KXy32iTkKpsbR1J1USZWKd4lE5oud&libraries=geometry,places`;
    document.head.appendChild(script);

    script.onload = () => {
      console.log("started");
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current
      );
      autocomplete.addListener("place_changed", () => {
        console.log("Place changed event triggered");
        const place = autocomplete.getPlace();
        console.log(place.formatted_address);
        console.log("Formatted Address:", place.formatted_address);
        console.log("Latitude:", place.geometry.location.lat());
        console.log("Longitude:", place.geometry.location.lng());
        setOpen(false);
      });
    };
  }, []);

  const bookRide = async () => {
    setUsername(user.Username);
    setToken(user.Token);
    try {
      const response = await axios.post(
        "https://walamin-server.onrender.com/ride",
        {
          username,
          token,
          rideCategory,
          pickupLocation,
          dropoffLocation,
          rideDate,
          rideTime,
        }
      );
      setMessage("Ride booked successfully!");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage(
          "An error occurred while booking the ride. Please try again."
        );
      }
    }
  };
  const back = () => {
    navigate("/");
  };
  const dismiss = () => {
    setOpen(false);
  };
  const name = () => {
    setStep("name");
    setOpen(true);
  };
  const Pickup = () => {
    setStep("pickup");
    setOpen(true);
  };
  const Destination = () => {
    setStep("destination");
    setOpen(true);
  };
  const Time = () => {
    setStep("time");
    setOpen(true);
  };
  const Schedule = () => {
    setStep("schedule");
    setOpen(true);
  };
  const Request = () => {
    setStep("request");
    setOpen(true);
  };
  return (
    <>
      {agreement === false && (
        <main
          className="home"
          style={{
            boxSizing: "border-box",
            padding: "30px 10px",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity id="back" onPress={back}>
            <IoIosArrowBack size={24} />
          </TouchableOpacity>
          <div className="warning">
            <p>Hello 👋</p>
            <span>
              Take a moment and read through the terms and conditions before you
              schedule a ride
            </span>
          </div>
          <div className="terms">
            <p style={{ fontSize: 18, textAlign: "start", width: "90%" }}>
              Terms and conditions
            </p>
            <li>
              You must provide accurate pick-up and destination locations, as
              well as desired time of pick-up and days of the week for the ride
            </li>
            <li>
              The cost of the tip is calculated based on distance and summed up
              for a whole week
            </li>
            <li>
              You must pay for atleast three rides ahead for the rides to be
              validated
            </li>
            <li>You can pay for as many future rides as you please</li>
            <li>
              If you exceed paid rides by one ride, your scheduled ride will be
              terminated for safety reasons.
            </li>
            <li>
              You have the option to cancel or extend scheduled time an upcoming
              ride ahead
            </li>
            <li>
              You will be provided a helmet and raincoat for inclement weather.
            </li>
            <li>
              You must keep to the scheduled time, as our riders have multiple
              customers to attend to
            </li>
          </div>
          <div className="acceptence">
            <TouchableOpacity
              onPress={back}
              id="button"
              style={{ backgroundColor: "lightgray", color: "black" }}
            >
              <p>Disagree</p>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAgreement(true)}
              id="button"
              style={{ backgroundColor: "limegreen", color: "#fff" }}
            >
              <p>Agree</p>
            </TouchableOpacity>
          </div>
        </main>
      )}
      {agreement === true && (
        <main
          className="home"
          style={{
            boxSizing: "border-box",
            padding: "20px 10px",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <TouchableOpacity id="back" onPress={back}>
            <IoIosArrowBack size={24} />
          </TouchableOpacity>
          <p style={{ width: "100%" }}>Schedule Ride !</p>
          <div className="content">
            <TouchableOpacity id="schedule-item" onPress={name}>
              <p>Category : </p>
              <p>{rideCategory}</p>
            </TouchableOpacity>
            <TouchableOpacity id="schedule-item" onPress={Pickup}>
              <p>Pick up :</p>
              <p>{pickupLocation}</p>
            </TouchableOpacity>
            <TouchableOpacity id="schedule-item" onPress={Destination}>
              <p>Destination :</p>
              <p>{dropoffLocation}</p>
            </TouchableOpacity>
            <TouchableOpacity id="schedule-item" onPress={Time}>
              <p>Set time :</p>
              <p>{rideTime}</p>
            </TouchableOpacity>
            <TouchableOpacity id="schedule-item" onPress={Schedule}>
              <p>Recurring :</p>
              <p>{rideDate}</p>
            </TouchableOpacity>
            <TouchableOpacity id="schedule-item" onPress={Request}>
              <p>Comment :</p>
              <p>{request}</p>
            </TouchableOpacity>
          </div>
          <div
            className="acceptence"
            style={{ flexDirection: "column", alignItems: "center" }}
          >
            <p>{message}</p>
            <TouchableOpacity
              onPress={bookRide}
              id="button"
              style={{
                backgroundColor: "limegreen",
                color: "#fff",
                width: "100%",
              }}
            >
              <p>Save Ride</p>
            </TouchableOpacity>
            <br />
            <TouchableOpacity
              onPress={back}
              id="button"
              style={{ color: "black" }}
            >
              <p>Cancel</p>
            </TouchableOpacity>
          </div>
          <BottomSheet
            onDismiss={dismiss}
            open={open}
            snapPoints={({ maxHeight }) => [maxHeight / 1]}
          >
            <div style={{ boxSizing: "border-box", padding: "20px" }}>
              {step === "name" && (
                <div className="upp">
                  <div>
                    <p>Custom: </p>
                    <div id="input-container">
                      <input
                        type="text"
                        value={rideCategory}
                        className="schedule-input"
                        onChange={(event) =>
                          setRideCategory(event.target.value)
                        }
                      />
                    </div>
                    <br />
                    <p>Category: {rideCategory}</p>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        id="category"
                        onPress={() => setRideCategory("Daily Commute")}
                      >
                        <p>Daily Commute</p>
                      </TouchableOpacity>
                      <TouchableOpacity
                        id="category"
                        onPress={() => setRideCategory("Work")}
                      >
                        <p>Work !</p>
                      </TouchableOpacity>
                      <TouchableOpacity
                        id="category"
                        onPress={() => setRideCategory("School Run")}
                      >
                        <p>School Run</p>
                      </TouchableOpacity>
                      <TouchableOpacity
                        id="category"
                        onPress={() => setRideCategory("Grocery Trip")}
                      >
                        <p>Grocery Trip</p>
                      </TouchableOpacity>
                      <TouchableOpacity
                        id="category"
                        onPress={() => setRideCategory("Medical Appointment")}
                      >
                        <p>Medical Apointment</p>
                      </TouchableOpacity>
                      <TouchableOpacity
                        id="category"
                        onPress={() => setRideCategory("Night Shift")}
                      >
                        <p>Night Shift?</p>
                      </TouchableOpacity>
                      <TouchableOpacity
                        id="category"
                        onPress={() => setRideCategory("Social Event")}
                      >
                        <p>Social Event</p>
                      </TouchableOpacity>
                    </div>
                    <br />
                  </div>
                  <br />
                  <TouchableOpacity id="set" onPress={() => setOpen(false)}>
                    <p>Set</p>
                  </TouchableOpacity>
                </div>
              )}
              {step === "pickup" && (
                <div className="upp">
                  <div>
                    <p>Pick up address</p>
                    <div id="input-container">
                      <input
                        ref={inputRef}
                        type="text"
                        value={pickupLocation}
                        onChange={(event) =>
                          setPickupLocation(event.target.value)
                        }
                        className="schedule-input"
                        id="pickup"
                      />
                    </div>
                  </div>
                  <TouchableOpacity id="set" onPress={() => setOpen(false)}>
                    <p>Set</p>
                  </TouchableOpacity>
                </div>
              )}
              {step === "destination" && (
                <div className="upp">
                  <div>
                    <p>Destination address</p>
                    <div id="input-container">
                      <input
                        type="text"
                        value={dropoffLocation}
                        onChange={(event) =>
                          setDropoffLocation(event.target.value)
                        }
                        className="schedule-input"
                      />
                    </div>
                  </div>
                  <TouchableOpacity id="set" onPress={() => setOpen(false)}>
                    <p>Set</p>
                  </TouchableOpacity>
                </div>
              )}
              {step === "time" && (
                <div className="upp">
                  <div>
                    <p>Set Ride Time: </p>
                    <div id="input-container">
                      <input
                        type="time"
                        value={rideTime}
                        onChange={(event) => setRideTime(event.target.value)}
                        className="schedule-input"
                      />
                    </div>
                  </div>
                  <TouchableOpacity id="set" onPress={() => setOpen(false)}>
                    <p>Set</p>
                  </TouchableOpacity>
                </div>
              )}
              {step === "schedule" && (
                <div className="upp">
                  <div>
                    <p>Set Date: </p>
                    <div id="input-container">
                      <input
                        type="date"
                        value={rideDate}
                        onChange={(event) => setRideDate(event.target.value)}
                        className="schedule-input"
                      />
                    </div>
                  </div>
                  <TouchableOpacity id="set" onPress={() => setOpen(false)}>
                    <p>Set</p>
                  </TouchableOpacity>
                </div>
              )}
              {step === "request" && (
                <div className="upp">
                  <div>
                    <p>Describe special request</p>
                    <div id="input-container">
                      <input
                        type="text"
                        value={request}
                        onChange={(event) => setRequest(event.target.value)}
                        className="schedule-input"
                        id="pickup"
                      />
                    </div>
                  </div>
                  <TouchableOpacity id="set" onPress={() => setOpen(false)}>
                    <p>Set</p>
                  </TouchableOpacity>
                </div>
              )}
            </div>
          </BottomSheet>
        </main>
      )}
    </>
  );
}
