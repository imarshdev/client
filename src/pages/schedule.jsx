import { IoIosArrowBack } from "react-icons/io";
import { TouchableOpacity } from "react-native-web";
import { useNavigate } from "react-router-dom";
import "../css/schedule.css";
import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

export default function Schedule() {
  const [step, setStep] = useState("");
  const [open, setOpen] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const navigate = useNavigate();
  const back = () => {
    navigate("/home");
  };
  const dismiss = () => {
    setOpen(false);
  };
  const name = () => {
    setStep("name");
    setOpen(true);
  };
  const pickup = () => {
    setStep("pickup");
    setOpen(true);
  };
  const destination = () => {
    setStep("destination");
    setOpen(true);
  };
  const time = () => {
    setStep("time");
    setOpen(true);
  };
  const schedule = () => {
    setStep("schedule");
    setOpen(true);
  };
  return (
    <>
      {agreement === false && (
        <main className="home">
          <TouchableOpacity id="back" onPress={back}>
            <IoIosArrowBack size={24} />
          </TouchableOpacity>
          <div className="warning">
            <p>Hello 👋</p>
            <p>
              By creating a scheduled ride, you agree to the terms and
              conditions outlined in this document. You understand that you are
              commiting to a recurring ride schedule
            </p>
          </div>
          <br />
          <div className="terms">
            <p style={{ fontSize: 18 }}>Terms and conditions</p>
            <li>
              You must provide accurate pick-up and destination locations, as
              well as desired time of pick-up and days of the week for the ride
            </li>
            <br />
            <li>
              The cost of the tip is calculated based on distance and summed up
              for a whole week
            </li>
            <li>
              You must pay for atleast three rides ahead for the rides to be
              validated
            </li>
            <li>You can pay for as many future rides as you please</li>
            <br />
            <li>
              If you exceed paid rides by one ride, your scheduled ride will be
              terminated for safety reasons.
            </li>
            <li>
              You have the option to cancel or extend scheduled time an upcoming
              ride ahead
            </li>
            <br />
            <li>
              You will be provided a helmet and raincoat for inclement weather.
            </li>
            <br />
            <li>
              You must keep to the scheduled time, as our riders have multiple
              customers to attend to
            </li>
          </div>
          <br />
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
        <main className="home">
          <TouchableOpacity id="back" onPress={back}>
            <IoIosArrowBack size={24} />
          </TouchableOpacity>
          <div className="content">
            <p style={{ textAlign: "start", width: "80%" }}>SCHEDULE RIDE</p>
            <TouchableOpacity id="schedule-item" onPress={name}>
              <p>Ride Name</p>
            </TouchableOpacity>
            <p style={{ textAlign: "start", width: "80%" }}>Name:</p>
            <TouchableOpacity id="schedule-item" onPress={pickup}>
              <p>Set pick up</p>
            </TouchableOpacity>
            <p style={{ textAlign: "start", width: "80%" }}>Pick up:</p>
            <TouchableOpacity id="schedule-item" onPress={destination}>
              <p>Set destination</p>
            </TouchableOpacity>
            <p style={{ textAlign: "start", width: "80%" }}>Destination:</p>
            <TouchableOpacity id="schedule-item" onPress={time}>
              <p>Set time</p>
            </TouchableOpacity>
            <p style={{ textAlign: "start", width: "80%" }}>Time:</p>
            <TouchableOpacity id="schedule-item" onPress={schedule}>
              <p>Recurring schedule</p>
            </TouchableOpacity>
            <p style={{ textAlign: "start", width: "80%" }}>Days:</p>
          </div>
          <br />
          <br />
          <div className="acceptence">
            <TouchableOpacity
              onPress={back}
              id="button"
              style={{ backgroundColor: "lightgray", color: "black" }}
            >
              <p>Cancel</p>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAgreement(true)}
              id="button"
              style={{ backgroundColor: "limegreen", color: "#fff" }}
            >
              <p>Save Ride</p>
            </TouchableOpacity>
          </div>
          <BottomSheet onDismiss={dismiss} open={open}>
            {step === "name" && <p>Name</p>}
            {step === "pickup" && <p>Pick up</p>}
            {step === "destination" && <p>Destination</p>}
            {step === "time" && <p>Time</p>}
            {step === "schedule" && <p>Schedule</p>}
          </BottomSheet>
        </main>
      )}
    </>
  );
}
