import { useState, useEffect } from "react";
import axios from "axios";

const AllLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const response = await axios.get(
          "https://walamin-server.onrender.com/all-locations"
        );
        setLocations(response.data);
        setLoading(false);
        console.log(response.data);
        
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAllLocations(); // Initial fetch
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>All Locations</h1>
      {locations.map((location) => (
        <div key={location.username}>
          {location.location && (
            <>
              <p>Username: {location.username}</p>
              <p>Latitude: {location.location.latitude}</p>
              <p>Longitude: {location.location.longitude}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllLocations;
