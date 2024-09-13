import React, { useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "../css/ride.css";
import { CiHome } from "react-icons/ci";
import { MdAdd, MdWork } from "react-icons/md";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native-web";

export default function CurrentRide() {
  const [inputFocused, setInputFocused] = useState(false);
  const [autoComplete, setAutocomplete] = useState(false);
  const screenHeight = window.innerHeight;
  const verticalOffset = screenHeight * 1
  const focused = () => {
    setInputFocused(true);
    setAutocomplete(true);
  };
  const unFocused = () => {
    setInputFocused(false);
    setAutocomplete(false);
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={verticalOffset}
      behavior="height"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        boxSizing: "border-box",
        padding: "10px 10px 30px 10px",
      }}
    >
      <p>Map</p>
      <div id="map" style={{ height: "70vh", width: "100vw" }}></div>
      <BottomSheet
        header={
          <input
            type="text"
            placeholder="Where to ?"
            style={{
              width: "94%",
              height: "1.5rem",
              padding: "0 10px",
              boxSizing: "border-box",
            }}
            onFocus={focused}
            onBlur={unFocused}
          />
        }
        skipInitialTransition={true}
        expandOnContentDrag={true}
        blocking={false}
        snapPoints={({ maxHeight }) =>
          inputFocused
            ? [maxHeight - maxHeight / 10]
            : [maxHeight / 2, maxHeight / 4, maxHeight - maxHeight / 10]
        }
        open={true}
        style={{ boxSizing: "border-box", padding: "10px" }}
      >
        {autoComplete ? (
          <p></p>
        ) : (
          <>
            <div style={{ width: "100%" }}>
              <p>Saved</p>
              <div className="saved-container">
                <div
                  style={{
                    width: "20%",
                    marginRight: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity id="saved">
                    <CiHome size={20} color="darkgreen" />
                  </TouchableOpacity>
                  <span>Home</span>
                </div>

                <div
                  style={{
                    width: "20%",
                    marginRight: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity id="saved">
                    <MdWork size={20} color="darkgreen" />
                  </TouchableOpacity>
                  <span>Work</span>
                </div>

                <div
                  style={{
                    width: "20%",
                    marginRight: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity id="saved">
                    <MdAdd size={20} color="darkgreen" />
                  </TouchableOpacity>
                  <span>Add</span>
                </div>
              </div>
            </div>
            <p>Recents</p>
            <div className="locations">
              <div className="location">
                <span>Place Name</span>
                <span>formatted_address</span>
              </div>
              <div className="location">
                <span>Place Name</span>
                <span>formatted_address</span>
              </div>
            </div>
          </>
        )}
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}
