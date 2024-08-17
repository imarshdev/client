import React, { useState } from "react";
import { FaCloudSunRain } from "react-icons/fa";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import "../css/home.css";
import { KeyboardAvoidingView, SafeAreaView, TouchableOpacity, View, StyleSheet } from "react-native-web";

function Home() {
  return (
    <SafeAreaView>
      <div className="home">
        <div className="top">
          <div className="topper">
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
            <div className="items" id="1"></div>
            <div className="items" id="2"></div>
            <div className="items" id="3"></div>
            <div className="items" id="4"></div>
            <div className="items" id="5"></div>
            <div className="items" id="6"></div>
          </div>
          <div className="mid_details_lower">
            <div className="image">

            </div>
          </div>
        </div>

        <div className="bottom_drawer">
          <div className="navigator"></div>
        </div>
      </div>
    </SafeAreaView>
  );
}


export default Home;
