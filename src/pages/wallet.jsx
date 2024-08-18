import React from "react";
import { SafeAreaView } from "react-native-web";
import "../css/home.css";
import { Navigator } from "./home";

export default function Wallet() {
  return (
    <SafeAreaView>
      <div className="home">
        <div className="top">
          <div className="topper"></div>
        </div>
        <div className="mid_details"></div>
        <div className="bottom_drawer">
          <Navigator />
        </div>
      </div>
    </SafeAreaView>
  );
}
