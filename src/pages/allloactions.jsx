
const AllLocations = () => {
  return (
    <div style={{ width: "100vw" }}>
      <div id="mapElement" style={{ height: "50vh", width: "100%" }} />
      <div
        style={{
          width: "100%",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "20px",
        }}
      >
        <h2>Ride Details</h2>
        <label>
          <p>Origin: </p>
          <span>9J28+Q3G, Ntinda - Kisaasi Rd, Kampala, Uganda</span>
        </label>
        <label>
          <p>Destination: </p>
          <span>Kyaliwajjala Trading Center</span>
        </label>
        <label>
          <p>Cost: </p>
          <span></span>
        </label>
      </div>
    </div>
  );
};

export default AllLocations;
