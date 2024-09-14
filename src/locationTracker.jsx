import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

const sendLocationToBackend = async (location) => {
  const { user } = useContext(UserContext);

  try {
    const response = await axios.post(
      "https://walamin-server.onrender.com/location",
      {
        username: user.Username, // Replace with the actual username
        token: user.Token,
        latitude: location.latitude,
        longitude: location.longitude,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};


const LocationTracker = () => {
  useEffect(() => {
    const getLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            sendLocationToBackend(location);
          },
          (error) => {
            console.error(error);
          },
          { timeout: 10000 }
        );
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(getLocation, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default LocationTracker;
