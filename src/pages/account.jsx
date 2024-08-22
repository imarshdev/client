import React, { useState } from "react";
import { TouchableOpacity } from "react-native-web";
import "../css/home.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCreditCard,
  FaHome,
  FaServicestack,
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
import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

export default function Account() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  return (
    <main className="home">
      <Sidebar
        visible={visible}
        position="left"
        onHide={() => setVisible(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <PersonalInformation />
      </Sidebar>
      <Sidebar
        visible={visible2}
        position="left"
        onHide={() => setVisible2(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <CardsAndAccounts />
      </Sidebar>
      <Sidebar
        visible={visible3}
        position="left"
        onHide={() => setVisible3(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <Saved />
      </Sidebar>
      <Sidebar
        visible={visible4}
        position="left"
        onHide={() => setVisible4(false)}
        className="home"
        style={{ backgroundColor: "#fff" }}
      >
        <ScheduledRides />
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
            <span>Mansur, Chelangat</span>
            <br />
            <span style={{ fontSize: 12, padding: 0 }}>0767116290</span>
          </span>
          <div>
            <TouchableOpacity>
              <RiListSettingsLine size={20} />
            </TouchableOpacity>
          </div>
        </div>
      </div>
      <div className="mid_details" style={{ height: "75vh" }}>
        <br />
        <p style={{ textAlign: "start", fontWeight: "bolder" }}>Your account</p>
        <TouchableOpacity id="account_item">
          <div
            onClick={() => setVisible(true)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FiUser size={20} style={{ marginRight: "10px" }} />
            <span>Personal Information</span>
          </div>
          <FaAngleRight onClick={() => setVisible(true)} />
        </TouchableOpacity>

        <TouchableOpacity id="account_item">
          <div
            onClick={() => setVisible2(true)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaCreditCard size={20} style={{ marginRight: "10px" }} />
            <span>Card and Accounts</span>
          </div>
          <FaAngleRight onClick={() => setVisible2(true)} />
        </TouchableOpacity>

        <TouchableOpacity id="account_item">
          <div
            onClick={() => setVisible3(true)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <CiLocationOn size={20} style={{ marginRight: "10px" }} />
            <span>Saved Addresses</span>
          </div>
          <FaAngleRight onClick={() => setVisible3(true)} />
        </TouchableOpacity>

        <TouchableOpacity id="account_item">
          <div
            onClick={() => setVisible4(true)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaStickyNote size={20} style={{ marginRight: "10px" }} />
            <span>Scheduled Rides</span>
          </div>
          <FaAngleRight onClick={() => setVisible4(true)} />
        </TouchableOpacity>

        <p style={{ textAlign: "start", fontWeight: "bolder" }}>Support</p>
        <TouchableOpacity id="account_item">
          <div style={{ display: "flex", alignItems: "center" }}>
            <LuHelpCircle size={20} style={{ marginRight: "10px" }} />
            <span>Help</span>
          </div>
          <FaAngleRight />
        </TouchableOpacity>

        <TouchableOpacity id="account_item">
          <div style={{ display: "flex", alignItems: "center" }}>
            <CiStar size={20} style={{ marginRight: "10px" }} />
            <span>Rate this app</span>
          </div>
          <FaAngleRight />
        </TouchableOpacity>

        <TouchableOpacity id="account_item">
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdTwoWheeler size={20} style={{ marginRight: "10px" }} />
            <span>Become a Captain</span>
          </div>
          <FaAngleRight />
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
        <Link to="/home">
          <span class="icon_button">
            <FaHome color="#fff" size={24} />
            <span style={{ fontSize: 12 }}>home</span>
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
            <span style={{ fontSize: 12, color: "#fff" }}>account</span>
          </span>
        </Link>
      </TouchableOpacity>
    </div>
  );
}

function ScheduledRides() {
  return (
    <div className="mid_details" style={{ height: "90vh", justifyContent: "center" }}>
      <p style={{ textAlign: "start" }}>Scheduled Rides</p>
      <div className="scheduled_ride">
        <span style={{ fontSize: 18 }}>School</span>
        <span>
          <CiLocationOn style={{ marginRight: "10px" }} />
          Ntinda Stretcher - UICT
        </span>
        <span>
          <MdAccessTime style={{ marginRight: "10px" }} />
          Mon - Fri 8 am
        </span>
        <span>
          <CiCreditCard1 style={{ marginRight: "10px" }} />
          Card - $5
        </span>
        <TouchableOpacity id="action">
          <span>Edit</span>
        </TouchableOpacity>
      </div>
      <div className="scheduled_ride">
        <span style={{ fontSize: 18 }}>Work</span>
        <span>
          <CiLocationOn style={{ marginRight: "10px" }} />
          UICT - Mapeera House
        </span>
        <span>
          <MdAccessTime style={{ marginRight: "10px" }} />
          Mon - Fri 2 pm
        </span>
        <span>
          <CiCreditCard1 style={{ marginRight: "10px" }} />
          Card - $5
        </span>
        <TouchableOpacity id="action">
          <span>Edit</span>
        </TouchableOpacity>
      </div>
    </div>
  );
}

function PersonalInformation() {
  return (
    <div className="mid_details" style={{ height: "90vh" }}>
      <p>Personal Information</p>
      <TouchableOpacity id="personal_item">
        <div style={{ display: "flex", alignItems: "center" }}>
          <LiaIdCardSolid size={30} style={{ marginRight: "15px" }} />
          <span style={{ padding: 0 }}>
            Name <br />
            <span style={{ fontSize: "12px", padding: 0 }}>
              Mansur Chelangat
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
            <span style={{ fontSize: "12px", padding: 0 }}>+256767116290</span>
          </span>
        </div>
        <MdKeyboardDoubleArrowRight />
      </TouchableOpacity>

      <TouchableOpacity id="personal_item">
        <div style={{ display: "flex", alignItems: "center" }}>
          <MdOutlineEmail size={30} style={{ marginRight: "15px" }} />
          <span style={{ padding: 0 }}>
            Email <br />
            <span style={{ fontSize: "12px", padding: 0 }}>forevermarsh004@gmail.com</span>
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
