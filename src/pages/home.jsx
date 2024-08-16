import React, { useState } from "react";
import { ImMenu4 } from "react-icons/im";
import { FaMotorcycle } from "react-icons/fa";
import { MdSportsMotorsports } from "react-icons/md";
import { FaCloudSunRain } from "react-icons/fa";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import ride from "../assets/ride.png";
import scheduled from "../assets/scheduled.png";
import delivery from "../assets/delivery.png";
import "../css/home.css";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native-web";

function Home() {
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [visibleBottom2, setVisibleBottom2] = useState(false);
  const [visibleBottom3, setVisibleBottom3] = useState(false);
  const [visibleBottom4, setVisibleBottom4] = useState(false);
  return (
    <div className="home">
      <KeyboardAvoidingView>
        <Sidebar
          className="details"
          visible={visibleBottom}
          position="bottom"
          onHide={() => setVisibleBottom(false)}
        >
          <h2>Schedule Ride</h2>
          <Wizard />
        </Sidebar>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView>
        <Sidebar
          className="details"
          visible={visibleBottom2}
          position="bottom"
          onHide={() => setVisibleBottom2(false)}
        >
          <h2>Order Ride</h2>
          <p class="form-label">Destination</p>
          <InputText style={{ width: "100%" }} />
          <p class="form-label">Pickup Location</p>
          <InputText style={{ width: "100%" }} />
          <br />
          <br />
          <button>Order</button>
        </Sidebar>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView>
        <Sidebar
          className="details"
          visible={visibleBottom3}
          position="bottom"
          onHide={() => setVisibleBottom3(false)}
        >
          <h2>Deliver Item(s)</h2>
          <p class="form-label">Destination</p>
          <InputText style={{ width: "100%" }} />
          <p class="form-label">Pickup Location</p>
          <InputText style={{ width: "100%" }} />
          <p class="form-label">Bulk (Describe items, discreetly)</p>
          <InputText style={{ width: "100%" }} />
          <br />
          <br />
          <button>Order</button>
        </Sidebar>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView>
        <Sidebar
          className="details"
          visible={visibleBottom4}
          position="bottom"
          onHide={() => setVisibleBottom4(false)}
        >
          <TouchableOpacity>
            <form
              style={{ padding: "10px 10px", marginTop: "20px" }}
              onClick={() => setVisibleBottom(true)}
            >
              <img src={scheduled} style={{ width: "4rem" }} />
              <br />
              <span style={{ padding: 0 }} class="form-label">
                Plan a daily Commute / Scheduled rides
              </span>
            </form>
          </TouchableOpacity>
          <br />
          <br />
          <TouchableOpacity>
            <form
              style={{ padding: "10px 10px" }}
              onClick={() => setVisibleBottom2(true)}
            >
              <img src={ride} style={{ width: "4rem" }} />
              <br />
              <span style={{ padding: 0 }} class="form-label">
                Order single ride
              </span>
            </form>
          </TouchableOpacity>
          <br />
          <br />
          <TouchableOpacity>
            <form
              style={{ padding: "10px 10px" }}
              onClick={() => setVisibleBottom3(true)}
            >
              <img src={delivery} style={{ width: "4rem" }} />
              <br />
              <span style={{ padding: 0 }} class="form-label">
                Delivery Services
              </span>
            </form>
          </TouchableOpacity>
        </Sidebar>
      </KeyboardAvoidingView>

      <div className="top">
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

      <div className="mid_details"></div>

      <div className="bottom_drawer">
        <span
          className="bottom_button"
          id="one"
          onClick={() => setVisibleBottom4(true)}
        >
          <span>
            <FaMotorcycle size={25} />
          </span>
          <span>Open Services</span>
        </span>

        <span
          className="bottom_button"
          id="two"
        >
          <span>
            <ImMenu4 size={25} />
          </span>
          <span>Open Services</span>
        </span>

        <span
          className="bottom_button"
          id="three"
        >
          <span>
            <MdSportsMotorsports size={25} />
          </span>
          <span>My Account</span>
        </span>
      </div>
    </div>
  );
}

export default Home;

export function Wizard() {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <>
      {step === 1 && (
        <>
          <p class="form-label">Pick-up location</p>
          <InputText style={{ width: "100%" }} />
          <br />
          <br />
          <button onClick={nextStep}>Next</button>
        </>
      )}
      {step === 2 && (
        <>
          <p class="form-label">Destination</p>
          <InputText style={{ width: "100%" }} />
          <br />
          <br />
          <button onClick={nextStep}>Next</button>
          <br />
          <br />
          <button onClick={prevStep}>Back</button>
        </>
      )}
      {step === 3 && (
        <>
          <p class="form-label">Time of pick-up</p>
          <InputText style={{ width: "100%" }} />
          <br />
          <br />
          <button onClick={nextStep}>Next</button>
          <br />
          <br />
          <button onClick={prevStep}>Back</button>
        </>
      )}
      {step === 4 && (
        <>
          <p class="form-label">Stops, if any</p>
          <InputText style={{ width: "100%" }} />
          <br />
          <br />
          <button>Submit</button>
          <br />
          <br />
          <button onClick={prevStep}>Submit</button>
        </>
      )}
    </>
  );
}
