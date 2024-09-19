/* 
welcome to the first chunk of very long complex code that even i don't understand.
i'll try my best to explain this so i wont get lost when i come back
*/

// first, a bunch of to-dos, to not forget
// to do
/* 
  ~ add a logout button
  ~ edit user details
  ~ animations and sounds 
*/


import React, { useState, useContext, useEffect, useLayoutEffect } from "react"; // importing stuff
import { TouchableOpacity } from "react-native-web";
import "../css/home.css"; // importing css
import { useSwipeable } from "react-swipeable";
// a bunch of icons imported from react-icons and i really wish i could use these without all these import statemants
import {
  FaAngleRight,
  FaCreditCard,
  FaHome,
  FaStickyNote,
} from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
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
import axios from "axios"; // axios for backend calls
import { Dialog } from "primereact/dialog"; // idk what this is but i think its for confirming deleting the account.

export default function Account() {
  const { user } = useContext(UserContext); // import user for authentication

  // oh god, all these handlers, bear with me.... im new and im figuring myself out
  // also, i literally don't know any other way to do it
  const handlers = useSwipeable({
    onSwipedRight: () => setVisible(false), // personal information hander
  });
  const handlers2 = useSwipeable({
    onSwipedRight: () => setVisible2(false), // Cards And Accounts handler
  });
  const handlers3 = useSwipeable({
    onSwipedRight: () => setVisible3(false), // Saved locations handler
  });
  const handlers4 = useSwipeable({
    onSwipedRight: () => setVisible4(false), // scheduled rides handler
  });
  const handlers5 = useSwipeable({
    onSwipedRight: () => setVisible5(false), // delete account handler
  });
  const handlers6 = useSwipeable({
    onSwipedRight: () => setVisible6(false), // captain's dash signin page handler
  });
  const [visible, setVisible] = useState(false); // personal information
  const [visible2, setVisible2] = useState(false); // Cards And Accounts
  const [visible3, setVisible3] = useState(false); // Saved locations
  const [visible4, setVisible4] = useState(false); // scheduled rides
  const [visible5, setVisible5] = useState(false); // delete account
  const [visible6, setVisible6] = useState(false); // this one is the captain's dash signin page

  // this is the erroe code thing, not sure what error though
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState(""); // this is a code, kind of like an entry pin
  const navigate = useNavigate();
  const secretCode = "123456789"; // pin value....

  const handleCodeChange = (event) => {
    setCode(event.target.value); // setting code
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === secretCode) {
      navigate("/captain-dash"); // allow captain through to captains page if code matches
    } else {
      setErrorMessage("Contact us to become a Captain"); // you aint a capt yet !!!!
    }
  };

  // vualla, the main component-ish
  return (
    // i use classname for all containers, but it gives shiity issues sometimes
    <main className="home">
      {/* first side-bar for personal information */}
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers} style={{ width: "100%", height: "100%" }}>
          <PersonalInformation />{" "}
          {/* personal information component that is defined somewhere down there */}
        </div>
      </Sidebar>

      {/* second side-bar for cards and accounts, I'm most definately gonna remove this, but i fear removing stuff */}
      <Sidebar
        visible={visible2}
        position="right"
        onHide={() => setVisible2(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers2} style={{ width: "100%", height: "100%" }}>
          <CardsAndAccounts />{" "}
          {/* cards and accounts container which is also defined somewhere down there */}
        </div>
      </Sidebar>

      {/* thirs side-bar for saved locations, this one is just a completely unnecessary page honestly, we wil save locations on the map page */}
      <Sidebar
        visible={visible3}
        position="right"
        onHide={() => setVisible3(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers3} style={{ width: "100%", height: "100%" }}>
          <Saved /> {/* yes, also down there*/}
        </div>
      </Sidebar>

      {/* as you might tell, im tired so, scheduled rides here.... */}
      <Sidebar
        visible={visible4}
        position="right"
        onHide={() => setVisible4(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers4} style={{ width: "100%", height: "100%" }}>
          <ScheduledRides /> {/* go down, go to town... doja cat */}
        </div>
      </Sidebar>

      {/* delete your account */}
      <Sidebar
        visible={visible5}
        position="right"
        onHide={() => setVisible5(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <div {...handlers5} style={{ width: "100%", height: "100%" }}>
          <DeleteAccount /> {/* ....! */}
        </div>
      </Sidebar>

      {/* oh, this one is a become a captain sign in */}
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
            {/* enter code */}
            <h2>Enter Captain's PassCode</h2>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* code input thing */}
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
              {/* ohhh, so this is the error state, for when someone thinks they are a captain and they aren't */}
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

      {/* now that the side-bars are done, welcome to the account page */}

      <div className="top" style={{ height: "15vh" }}>
        {" "}
        {/* top is is a global container too*/}
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
            {/* display the current user name and details and stuff */}
            <span>Username: {user.Username}</span>
            <br />
            <span style={{ fontSize: 12, padding: 0 }}>0767116290</span>
          </span>
          <div>
            <TouchableOpacity>
              <div onClick={() => setVisible5(true)}>
                <RiListSettingsLine size={20} /> {/* this is for those leaving us, it opens delete account side-bar */}
              </div>
            </TouchableOpacity>
          </div>
        </div>
      </div>
      {/* mid-details */}
      <div className="mid_details" style={{ height: "75vh" }}>
        <br />
        <p style={{ textAlign: "start", fontWeight: "bolder" }}>Your account</p>

        {/* these are just touchables to open respective side-bars */}
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


      {/* this bottom drawer is for the navigator */}
      <div className="bottom_drawer">
        <Navigator />
      </div>
    </main>
  );
}



// and this is the navigator, nothing much to it accept navigation...
export function Navigator() {
  return (
    <div className="navigator">
      {/* go home */}
      <TouchableOpacity>
        <Link to="/">
          <span className="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>Home</span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* go to wallet */}
      <TouchableOpacity>
        <Link to="/wallet">
          <span className="icon_button">
            <MdAccountBalanceWallet color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>Wallet</span>
          </span>
        </Link>
      </TouchableOpacity>

      {/* go to profile */}
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


// then the scheduled rides component.. this one fetches the current user's rides from the database and displays them
// it does this every time the side-bar is opened, meaning any new rides in the database will come too.....
// it uses the username and token to ensure the right user......
function ScheduledRides() {
  const { user } = useContext(UserContext);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);

  // using useEffect so that it can atleast re-fetch incase of new data
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

  // and now we render that data into components......
  return (
    <div
      className="mid_details"
      style={{ height: "90vh", justifyContent: "center" }}
    >
      {/* map the data to create respective scheduled rides */}
      <p style={{ textAlign: "start" }}>Scheduled Rides</p>
      {data ? (
        data.map((ride, index) => (
          <div className="scheduled_ride" key={index}>
            <span style={{ fontSize: 18 }}>{ride.rideCategory}</span>
            <span>
              {/* well, yeah, self explaining */}
              <CiLocationOn style={{ marginRight: "10px" }} />
              {ride.pickupLocation} - {ride.dropoffLocation}
            </span>
            <span>
              {/* well, yeah, self explaining */}
              <MdAccessTime style={{ marginRight: "10px" }} />
              {ride.rideDate} - {ride.rideTime} pm
            </span>
            <span>
              {/* well, yeah, self explaining */}
              <CiCreditCard1 style={{ marginRight: "10px" }} />
              {ride.rideStatus}
            </span>
            <TouchableOpacity id="action">
              {/* well, yeah, self explaining.... also, i need to work on this functionality asap */}
              <span>Edit</span>
            </TouchableOpacity>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
    // and that's it.......
  );
}


// aarrrghhh personal information.....

function PersonalInformation() {
  // same thing use the user state for safetly and stuff....
  // this time we use the username and token to fetch all other user information from the database userSchema
  const { user } = useContext(UserContext);
  const [fullname, setfullname] = useState(""); // setting full name, although clearly i haven't even used this anywhere... lol
  const [data, setData] = useState("");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");


  useEffect(() => {
    // getting all the user details
    try {
      setUsername(user.Username);
      setToken(user.Token);
      if (username && token) {
        axios
          .get("https://walamin-server.onrender.com/user/details", {
            params: { username, token }, // pass the username and token for obvous reasons
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
    // display the user info
    <div className="mid_details" style={{ height: "90vh" }}>
      <p>Personal Information</p>
      {/* this is the name, user will have the ability to perform edits */}
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

      {/* phone number */}
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

      {/* and email, we dont have email in userSchema so we have to work on this, turn it into contact or something, or just remove it */}
      <TouchableOpacity id="personal_item">
        <div style={{ display: "flex", alignItems: "center" }}>
          <MdOutlineEmail size={30} style={{ marginRight: "15px" }} />
          <span style={{ padding: 0 }}>
            Email <br />
            <span style={{ fontSize: "12px", padding: 0 }}>
              example@gmail.com
            </span>
          </span>
        </div>
        <MdKeyboardDoubleArrowRight />
      </TouchableOpacity>
    </div>
  );
}

// saved locations, and like we said, we'll remove this insha-allah
function Saved() {
  return (
    <div className="mid_details" style={{ height: "90vh" }}>
      <p>Saved Locations</p>
    </div>
  );
}

// cards and accounts are very not necessary yet
function CardsAndAccounts() {
  return (
    <div className="mid_details" style={{ height: "90vh" }}>
      <p>Cards And Accounts</p>
    </div>
  );
}

// delete account side-bar 
function DeleteAccount() {
  const [isVisible, setIsVisivle] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const deleteAccount = () => {
    setUser({ isLoggedIn: false }); // when the user logs out, the isLoggedIn state is turned false, meaning the only page that'll be working is signin
    navigate("/signin"); // indeed go to signin
    setIsVisivle(false);
  };
  // component 
  return (
    <div
      className="mid_details"
      style={{
        height: "90vh",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2> Delete Account</h2>
      {/* display username to be deleted */}
      <p>Username: {user.Username}</p>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* first, user might want to change details only */}
        <TouchableOpacity
          style={{
            width: "45%",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "limegreen",
            borderRadius: "5px",
          }}
        >
          <span style={{ color: "#fff" }}>Edit Account</span>
        </TouchableOpacity>
        {/* this is for when user for sure wants to delete their account */}
        <TouchableOpacity
          style={{
            width: "45%",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "5px",
            border: "solid 0.1px red",
          }}
          onPress={() => setIsVisivle(true)}
        >
          Delete Account
        </TouchableOpacity>
      </div>
      {/* i should probably add a logout button too */}
      {/* anyway this is the dialog box, its for them to comfirm because, you might have second thoughts */}
      <Dialog
        visible={isVisible}
        modal
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        style={{
          width: "90%",
          height: "25vh",
          backgroundColor: "#fff",
          boxShadow: "0 5px 10px rgba(160, 163, 189, 0.801)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "30px",
        }}
      >
        <br />
        <TouchableOpacity
          style={{
            width: "60vw",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "limegreen",
            borderRadius: "5px",
            padding: "10px 20px",
          }}
          onPress={() => setIsVisivle(false)}
        >
          {/* hopefully they keep the account */}
          <p style={{ margin: "10px", color: "#fff" }}>Keep account</p>
        </TouchableOpacity>
        <br />
        {/* bye then..... */}
        <TouchableOpacity
          style={{
            width: "60vw",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "orange",
            borderRadius: "5px",
            padding: "10px 20px",
          }}
          onPress={deleteAccount}
        >
          <p style={{ margin: "10px", color: "#fff" }}>Delete Account</p>
        </TouchableOpacity>
      </Dialog>
    </div>
  );
}


// alright, that's a wrap for the account page.... for now