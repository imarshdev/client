import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LocationTracker() {
  const { user } = useContext(UserContext);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  useEffect(() => {
    if (!user) {
      console.error("User not found in context");
      return;
    }

    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        setLongitude(lng);
        setLatitude(lat);

        const sendLocations = async () => {
          try {
            const response = await axios.post("(link unavailable)", {
              username: user.Username,
              token: user.Token,
              latitude: lat,
              longitude: lng,
            });
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };

        sendLocations();
      });
    };

    getLocation();
  }, [user]);

  return null;
}
