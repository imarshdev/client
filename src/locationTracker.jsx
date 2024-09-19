/* 
This is the location tracker, for the user.
Here we collect the user location, to be sent to the database for storing
This happens every 20 seconds for as long as the app is open to keep accurate location data
The location in the database is also updated in to keep everything upto date
And I'm using database communication frankly because i have no idea how to use websockets
*/
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext"; // import usercontext because we need security for every backend operation

export default function LocationTracker() {
  const { user } = useContext(UserContext);
  const [location, setLocation] = useState(null); // location state

  useEffect(() => {
    if (!user) {
      console.error("User not found in context"); // just making sure the user is logged in, although this won't happen because somthing is setup to prevent this 
      return;
    }

    // get the user current location and save in lat & lng variables
    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        setLocation({ latitude: lat, longitude: lng }); // set the location to the lat & lng values
      });
    };

    // now lets send it to the guys at the back 
    const sendLocation = async () => {
      if (!location) return; // lol, also checking again, making sure location exist before we send dust !!!!
      try {
        const response = await axios.post(
          "https://walamin-server.onrender.com/location",
          {
            username: user.Username, // send username 
            token: user.Token, // and token to make sure location is sent to the right respective user
            latitude: location.latitude,
            longitude: location.longitude,
          }
        );
        console.log(response.data); // log response data, 
      } catch (error) {
        console.error(error); // catch any errors and log them too
      }
    };

    const intervalId = setInterval(() => { // this is for the 20 second interval, i hope this wont haunt us in the future
      getLocation();
      sendLocation();
    }, 20000); // 20 seconds

    return () => clearInterval(intervalId);
  }, [user]);

  return null;
}