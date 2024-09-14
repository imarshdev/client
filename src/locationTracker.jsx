import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";

export default function LocationTracker() {
  const { user } = useContext(UserContext);
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setUsername(user.Username);
      setToken(user.Token);
      setLatitude(lat);
      setLongitude(lng);
      console.log(username);
      console.log(token);
      console.log(latitude);
      console.log(longitude);
    });
    const sendLocations = async () => {
      try {
        const response = await axios.post(
          "https://walamin-server.onrender.com/location",
          {
            username,
            token,
            latitude,
            longitude,
          }
        );
        console.log("success");
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setResult(3);
          setMessage(
            "An error occurred, Please try again."
          );
        }
      }
    };
    sendLocations()
  });
  return null;
}
