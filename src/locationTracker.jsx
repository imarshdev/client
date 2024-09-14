import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LocationTracker() {
  const { user } = useContext(UserContext);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!user) {
      console.error("User not found in context");
      return;
    }

    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        setLocation({ latitude: lat, longitude: lng });
      });
    };

    const sendLocation = async () => {
      if (!location) return;
      try {
        const response = await axios.post(
          "https://walamin-server.onrender.com/location",
          {
            username: user.Username,
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

    const intervalId = setInterval(() => {
      getLocation();
      sendLocation();
    }, 20000); // 20 seconds

    return () => clearInterval(intervalId);
  }, [user]);

  return null;
}